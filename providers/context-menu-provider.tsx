"use client"

import React, { createContext, ReactNode, useCallback, useState } from 'react';
import ContextMenu from '@/components/context-menu';
import { Play, Info, PlusCircle, Trash2, Settings } from 'lucide-react';

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

export const AppContextMenuProvider: React.FC<AppContextMenuProviderProps> = ({ children }) => {
    const [menuState, setMenuState] = useState({
        isOpen: false,
        position: { x: 0, y: 0 },
        appName: '',
        appId: null as string | number | null
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

    // Generate menu items based on the app
    const getMenuItems = useCallback(() => {
        if (!menuState.appId) return [];

        // Default menu items that appear for all apps
        const defaultItems = [
            {
                id: 'open',
                label: 'Open',
                icon: <Play size={20} />,
                action: () => {
                    console.log(`Opening ${menuState.appName}`);
                    // Handle opening the app here
                },
                danger: false
            },
            {
                id: 'info',
                label: 'Information',
                icon: <Info size={20} />,
                action: () => {
                    console.log(`Showing info for ${menuState.appName}`);
                    // Handle showing app info
                },
                danger: false
            },
            {
                id: 'add-to-favorites',
                label: 'Add to Favorites',
                icon: <PlusCircle size={20} />,
                action: () => {
                    console.log(`Adding ${menuState.appName} to favorites`);
                    // Handle adding to favorites
                },
                danger: false
            }
        ];

        // App-specific items or conditional items could be added here
        // For example, only show "Remove" for certain apps

        // Add app settings
        defaultItems.push({
            id: 'settings',
            label: 'Settings',
            icon: <Settings size={20} />,
            action: () => {
                console.log(`Opening settings for ${menuState.appName}`);
                // Handle app settings
            },
            danger: false
        });

        // Add delete option at the end
        defaultItems.push({
            id: 'delete',
            label: 'Remove',
            icon: <Trash2 size={20} />,
            danger: true, // Mark as danger for red styling
            action: () => {
                console.log(`Removing ${menuState.appName}`);
                // Handle app removal
                if (confirm(`Are you sure you want to remove ${menuState.appName}?`)) {
                    // Perform removal actions
                }
            }
        });

        return defaultItems;
    }, [menuState.appId, menuState.appName]);

    return (
        <AppContextMenuContext.Provider value={{ openContextMenu, closeContextMenu }}>
            {children}

            {/* Global context menu component */}
            <ContextMenu
                isOpen={menuState.isOpen}
                onClose={closeContextMenu}
                position={menuState.position}
                appName={menuState.appName}
                menuItems={getMenuItems()}
            />
        </AppContextMenuContext.Provider>
    );
};