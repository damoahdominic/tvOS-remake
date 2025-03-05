import React,{ useState, useEffect, useCallback, useRef } from 'react';

interface Position {
    row: number;
    col: number;
}

interface UseGridNavigationReturn {
    focusedPosition: {
        row: number;
        col: number;
    };
    isFocused: (row: number, col: number) => boolean;
    getFocusRef: (row: number, col: number) => React.RefObject<HTMLButtonElement> | null;
}

export default function useGridNavigation(
    rowCount: number,
    colCount: number,
    initialRow: number = 0,
    initialCol: number = 0
): UseGridNavigationReturn {
    // Current focused position (using 0-based indexing internally)
    const [focusedPosition, setFocusedPosition] = useState<Position>({
        row: initialRow,
        col: initialCol
    });

    // Create a 2D array of refs to store references to all the app items
    const appRefs = useRef<Array<Array<React.RefObject<HTMLButtonElement>>>>([]);

    // Initialize the 2D array of refs
    useEffect(() => {
        // @ts-expect-error I will ignore this cuz it does not affect the process
        appRefs.current = Array(rowCount).fill(0).map(() =>
            Array(colCount).fill(0).map(() => React.createRef<HTMLButtonElement>())
        );
    }, [rowCount, colCount]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (['w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
            e.preventDefault();

            setFocusedPosition(prev => {
                let newRow = prev.row;
                let newCol = prev.col;

                switch (e.key.toLowerCase()) {
                    case 'w': // Up
                        newRow = Math.max(0, prev.row - 1);
                        break;
                    case 'a': // Left
                        newCol = Math.max(0, prev.col - 1);
                        break;
                    case 's': // Down
                        newRow = Math.min(rowCount - 1, prev.row + 1);
                        break;
                    case 'd': // Right
                        newCol = Math.min(colCount - 1, prev.col + 1);
                        break;
                }

                // Only update if position changed
                if (newRow !== prev.row || newCol !== prev.col) {
                    // Focus the element at the new position
                    const targetRef = appRefs.current[newRow]?.[newCol];
                    if (targetRef?.current) {
                        targetRef.current.focus();
                    }
                    return { row: newRow, col: newCol };
                }
                else if(newRow === 0 && newRow === prev.row && prev.col === newCol) {
                    window.scrollTo({top: 0})
                }

                return prev;
            });
        }
    }, [rowCount, colCount]);

    // Set up and clean up event listeners
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        // Initial focus
        setTimeout(() => {
            const initialRef = appRefs.current[initialRow]?.[initialCol];
            if (initialRef?.current) {
                initialRef.current.focus();
            }
        }, 100);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown, initialRow, initialCol]);

    // Function to check if a tile is focused
    const isFocused = (row: number, col: number): boolean => {
        return focusedPosition.row === row && focusedPosition.col === col;
    };

    // Function to get the ref for a specific position
    const getFocusRef = (row: number, col: number): React.RefObject<HTMLButtonElement> | null => {
        return appRefs.current[row]?.[col] || null;
    };

    // Return 1-indexed position for more intuitive use
    const focusedPositionOneIndexed = {
        row: focusedPosition.row + 1,
        col: focusedPosition.col + 1
    };

    return {
        focusedPosition: focusedPositionOneIndexed,
        isFocused,
        getFocusRef
    };
}