"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Squircle } from '@squircle-js/react';

interface ContextMenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode; // Optional icon component
    action: () => void;
    danger?: boolean; // For delete/remove options
}

interface ContextMenuProps {
    isOpen: boolean;
    onClose: () => void;
    position: { x: number; y: number };
    appName: string;
    menuItems: ContextMenuItem[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({
    isOpen,
    onClose,
    position,
    appName,
    menuItems
}) => {
    const [focusedIndex, setFocusedIndex] = useState(0);
    const menuRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Reset focused index when menu opens
    useEffect(() => {
        if (isOpen) {
            setFocusedIndex(0);
            // Initialize refs array
            itemRefs.current = itemRefs.current.slice(0, menuItems.length);
        }
    }, [isOpen, menuItems.length]);

    // Handle keyboard navigation within the context menu
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    e.preventDefault();
                    setFocusedIndex(prev => (prev > 0 ? prev - 1 : prev));
                    break;
                case 'ArrowDown':
                case 's':
                    e.preventDefault();
                    setFocusedIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : prev));
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    if (menuItems[focusedIndex]) {
                        menuItems[focusedIndex].action();
                        onClose();
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    onClose();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, menuItems, focusedIndex, onClose]);

    // Focus the selected item
    useEffect(() => {
        if (isOpen && itemRefs.current[focusedIndex]) {
            itemRefs.current[focusedIndex]?.focus();
        }
    }, [focusedIndex, isOpen]);

    // Close menu when clicking outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    // Adjust position to make sure menu stays in viewport
    const adjustedPosition = {
        x: Math.min(position.x, window.innerWidth - 320), // 320px is approximate menu width
        y: Math.min(position.y, window.innerHeight - (menuItems.length * 60 + 80)) // Rough height calculation
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    {/* Semi-transparent backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                    {/* Context menu */}
                    <Squircle
                        asChild
                        cornerRadius={24}
                        cornerSmoothing={1}
                        className="bg-black/80 backdrop-blur-xl"
                    >
                        <motion.div
                            ref={menuRef}
                            className="absolute z-50 p-4 min-w-80 shadow-2xl apple-active-item-shadow"
                            style={{
                                top: adjustedPosition.y,
                                left: adjustedPosition.x
                            }}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* App title */}
                            <div className="mb-4 pb-3 border-b border-white/10">
                                <h3 className="text-white text-xl font-medium">{appName}</h3>
                            </div>

                            {/* Menu items */}
                            <div className="space-y-2">
                                {menuItems.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        ref={(el:any) => (itemRefs.current[index] = el)}
                                        className={`w-full text-left py-3 px-4 rounded-xl flex items-center gap-4 transition-all duration-200 outline-none ${focusedIndex === index
                                                ? 'bg-white text-black apple-active-item-shadow'
                                                : 'text-white hover:bg-white/10'
                                            } ${item.danger ? (focusedIndex === index ? 'text-black' : 'text-red-500') : ''}`}
                                        onClick={() => {
                                            item.action();
                                            onClose();
                                        }}
                                        onMouseEnter={() => setFocusedIndex(index)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {item.icon && <span className="text-2xl">{item.icon}</span>}
                                        <span className="text-lg">{item.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </Squircle>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ContextMenu;