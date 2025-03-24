import { useState, useCallback } from 'react';

interface ContextMenuState {
    isOpen: boolean;
    position: { x: number; y: number };
    appName: string;
    appId: string | number | null;
}

export const useContextMenu = () => {
    const [menuState, setMenuState] = useState<ContextMenuState>({
        isOpen: false,
        position: { x: 0, y: 0 },
        appName: '',
        appId: null
    });

    // Open context menu
    const openContextMenu = useCallback((
        e: React.MouseEvent | MouseEvent,
        appName: string,
        appId: string | number
    ) => {
        e.preventDefault(); // Prevent default right-click menu

        // Get position from event
        const position = {
            x: e.clientX,
            y: e.clientY
        };

        // Update menu state
        setMenuState({
            isOpen: true,
            position,
            appName,
            appId
        });
    }, []);

    // Close context menu
    const closeContextMenu = useCallback(() => {
        setMenuState(prev => ({
            ...prev,
            isOpen: false
        }));
    }, []);

    return {
        contextMenuState: menuState,
        openContextMenu,
        closeContextMenu
    };
};