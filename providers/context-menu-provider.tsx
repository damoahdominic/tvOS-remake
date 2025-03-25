"use client"
import React, { createContext, ReactNode, useCallback, useState } from 'react';
import ContextMenu from '@/components/context-menu';

// Define context type
interface AppContextMenuContextType {
    openContextMenu: (e: React.MouseEvent | MouseEvent, appName: string, appId: string | number) => void;
    closeContextMenu: () => void;
}

// Create context with default values
export const AppContextMenuContext = createContext<AppContextMenuContextType>({
    openContextMenu: () => { },
    closeContextMenu: () => { }
});

interface AppContextMenuProviderProps {
    children: ReactNode;
}

// Different menu types
type MenuType = 'regular' | 'folder';

export const AppContextMenuProvider: React.FC<AppContextMenuProviderProps> = ({ children }) => {
    const [menuState, setMenuState] = useState({
        isOpen: false,
        position: { x: 0, y: 0 },
        appName: '',
        appId: null as string | number | null,
        menuType: 'regular' as MenuType
    });

    // Open context menu
    const openContextMenu = useCallback((
        e: React.MouseEvent | MouseEvent,
        appName: string,
        appId: string | number,
        menuType: MenuType = 'regular'
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
            appId,
            menuType
        });
    }, []);

    // Close context menu
    const closeContextMenu = useCallback(() => {
        setMenuState(prev => ({
            ...prev,
            isOpen: false
        }));
    }, []);

    // Generate menu items based on the app and menu type
    const getMenuItems = useCallback(() => {
        if (!menuState.appId) return [];

        // Regular app context menu
        if (menuState.menuType === 'regular') {
            return [
                {
                    id: 'edit-home-screen',
                    label: 'Edit Home Screen',
                    action: () => {
                        console.log(`Editing home screen for ${menuState.appName}`);
                        // Handle edit home screen action
                    }
                },
                {
                    id: 'move-to',
                    label: 'Move to...',
                    action: () => {
                        console.log(`Moving ${menuState.appName} to another location`);
                        // Handle moving app
                    },
                    rightArrow: true
                }
            ];
        }
        // Folder context menu
        else if (menuState.menuType === 'folder') {
            return [
                {
                    id: 'new-folder',
                    label: 'New Folder',
                    action: () => {
                        console.log(`Creating new folder`);
                        // Handle new folder creation
                    }
                },
                {
                    id: 'move-to',
                    label: 'Move to...',
                    action: () => {
                        console.log(`Moving to another location`);
                        // Handle moving
                    },
                    rightArrow: true
                }
            ];
        }

        return [];
    }, [menuState.appId, menuState.appName, menuState.menuType]);

    return (
        <AppContextMenuContext.Provider value={{
            openContextMenu: (e, appName, appId) => openContextMenu(e, appName, appId),
            closeContextMenu
        }}>
            {children}

            {/* Global context menu component */}
            <ContextMenu
                isOpen={menuState.isOpen}
                onClose={closeContextMenu}
                position={menuState.position}
                menuItems={getMenuItems()}
            />
        </AppContextMenuContext.Provider>
    );
};