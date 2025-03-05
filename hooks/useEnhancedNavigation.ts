// File: hooks/useEnhancedNavigation.ts
import React,{ useState, useEffect, useCallback, useRef } from 'react';

interface Position {
    row: number;
    col: number;
    zone: 'grid' | 'activityBar';
}

interface UseEnhancedNavigationReturn {
    focusedPosition: Position;
    isFocused: (row: number, col: number, zone: 'grid' | 'activityBar') => boolean;
    getFocusRef: (row: number, col: number, zone: 'grid' | 'activityBar') => React.RefObject<HTMLButtonElement> | null;
    navigateToGrid: () => void;
    navigateToActivityBar: (col?: number) => void;
}

export default function useEnhancedNavigation(
    gridRowCount: number,
    gridColCount: number,
    activityBarItemCount: number,
    initialRow: number = 0,
    initialCol: number = 0
): UseEnhancedNavigationReturn {
    // Current focused position (using 0-based indexing internally)
    const [focusedPosition, setFocusedPosition] = useState<Position>({
        row: initialRow,
        col: initialCol,
        zone: 'grid'
    });

    // Create a 2D array of refs for grid items
    const gridRefs = useRef<Array<Array<React.RefObject<HTMLButtonElement>>>>([]);

    // Create array of refs for activity bar items
    const activityBarRefs = useRef<Array<React.RefObject<HTMLButtonElement>>>([]);

    // Initialize the refs
    useEffect(() => {
        // Initialize grid refs
        // @ts-expect-error forget it
        gridRefs.current = Array(gridRowCount).fill(0).map(() =>
            Array(gridColCount).fill(0).map(() => React.createRef<HTMLButtonElement>())
        );

        // Initialize activity bar refs
        // @ts-expect-error forget it
        activityBarRefs.current = Array(activityBarItemCount).fill(0).map(() =>
            React.createRef<HTMLButtonElement>()
        );
    }, [gridRowCount, gridColCount, activityBarItemCount]);

    // Navigation helper functions
    const navigateToGrid = useCallback(() => {
        const newPosition = {
            row: 0,
            col: Math.min(focusedPosition.col, gridColCount - 1),
            zone: 'grid' as const
        };

        setFocusedPosition(newPosition);

        // Focus the element at the new position
        setTimeout(() => {
            const targetRef = gridRefs.current[newPosition.row]?.[newPosition.col];
            if (targetRef?.current) {
                targetRef.current.focus();
            }
        }, 0);
    }, [focusedPosition.col, gridColCount]);

    const navigateToActivityBar = useCallback((col?: number) => {
        const newCol = col !== undefined ? col : Math.min(focusedPosition.col, activityBarItemCount - 1);

        const newPosition = {
            row: 0,
            col: newCol,
            zone: 'activityBar' as const
        };

        setFocusedPosition(newPosition);

        // Focus the element at the new position
        setTimeout(() => {
            const targetRef = activityBarRefs.current[newPosition.col];
            if (targetRef?.current) {
                targetRef.current.focus();
            }
        }, 0);
    }, [focusedPosition.col, activityBarItemCount]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (['w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
            e.preventDefault();

            setFocusedPosition(prev => {
                const { row, col, zone } = prev;
                let newRow = row;
                let newCol = col;
                let newZone = zone;

                // Navigation logic based on current zone
                if (zone === 'grid') {
                    switch (e.key.toLowerCase()) {
                        case 'w': // Up
                            if (row === 0) {
                                // When in the first row and pressing W, move to activity bar
                                newZone = 'activityBar';
                                newCol = Math.min(col, activityBarItemCount - 1); // Match column or use last available
                                newRow = 0; // Activity bar is single row
                            } else {
                                // Normal grid up navigation
                                newRow = Math.max(0, row - 1);
                            }
                            break;
                        case 'a': // Left
                            newCol = Math.max(0, col - 1);
                            break;
                        case 's': // Down
                            newRow = Math.min(gridRowCount - 1, row + 1);
                            break;
                        case 'd': // Right
                            newCol = Math.min(gridColCount - 1, col + 1);
                            break;
                    }
                } else if (zone === 'activityBar') {
                    switch (e.key.toLowerCase()) {
                        case 'w': // Up - no action in activity bar (already at top)
                            break;
                        case 'a': // Left
                            newCol = Math.max(0, col - 1);
                            break;
                        case 's': // Down - move back to grid
                            newZone = 'grid';
                            newRow = 0; // Go to first row
                            break;
                        case 'd': // Right
                            newCol = Math.min(activityBarItemCount - 1, col + 1);
                            break;
                    }
                }

                // Only update if position changed
                if (newRow !== row || newCol !== col || newZone !== zone) {
                    // Focus the element at the new position
                    if (newZone === 'grid') {
                        const targetRef = gridRefs.current[newRow]?.[newCol];
                        if (targetRef?.current) {
                            targetRef.current.focus();
                        }
                    } else if (newZone === 'activityBar') {
                        const targetRef = activityBarRefs.current[newCol];
                        if (targetRef?.current) {
                            targetRef.current.focus();
                        }
                    }

                    return { row: newRow, col: newCol, zone: newZone };
                }

                return prev;
            });
        }
    }, [gridRowCount, gridColCount, activityBarItemCount]);

    // Set up and clean up event listeners
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        // Initial focus
        setTimeout(() => {
            const initialRef = gridRefs.current[initialRow]?.[initialCol];
            if (initialRef?.current) {
                initialRef.current.focus();
            }
        }, 100);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown, initialRow, initialCol]);

    // Function to check if a position is focused
    const isFocused = (row: number, col: number, zone: 'grid' | 'activityBar'): boolean => {
        return focusedPosition.row === row && focusedPosition.col === col && focusedPosition.zone === zone;
    };

    // Function to get the ref for a specific position
    const getFocusRef = (row: number, col: number, zone: 'grid' | 'activityBar'): React.RefObject<HTMLButtonElement> | null => {
        if (zone === 'grid') {
            return gridRefs.current[row]?.[col] || null;
        } else if (zone === 'activityBar') {
            return activityBarRefs.current[col] || null;
        }
        return null;
    };

    return {
        focusedPosition,
        isFocused,
        getFocusRef,
        navigateToGrid,
        navigateToActivityBar
    };
}