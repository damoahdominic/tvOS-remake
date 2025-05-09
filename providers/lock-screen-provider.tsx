'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import LockScreen from '@/components/lock-screen';
import { LockScreenConfig, LockScreenImage } from '@/data';
import VolumeControl from '@/components/VolumeControl';

// Define context types
interface LockScreenContextType {
    isLocked: boolean;
    lock: () => void;
    unlock: () => void;
    toggleLock: () => void;
}

// Create the context with default values
const LockScreenContext = createContext<LockScreenContextType>({
    isLocked: true,
    lock: () => { },
    unlock: () => { },
    toggleLock: () => { }
});

// Hook to use the lock screen context
export const useLockScreen = () => useContext(LockScreenContext);

interface LockScreenProviderProps {
    children: ReactNode;
    images: LockScreenImage[];
    config?: Partial<LockScreenConfig>;
    autoLockAfter?: number; // Time in ms before auto-locking (0 or undefined to disable)
    initialLocked?: boolean; // Whether to start in locked state
}

export const LockScreenProvider: React.FC<LockScreenProviderProps> = ({
    children,
    images,
    config,
    autoLockAfter = 0,
    initialLocked = true
}) => {
    const [isLocked, setIsLocked] = useState(initialLocked);
    const [userActivity, setUserActivity] = useState(Date.now());

    // Lock and unlock methods
    const lock = () => setIsLocked(true);
    const unlock = () => setIsLocked(false);
    const toggleLock = () => setIsLocked(prev => !prev);

    // Track user activity to reset auto-lock timer
    useEffect(() => {
        if (!autoLockAfter) return; // Skip if auto-lock is disabled

        const handleActivity = () => {
            setUserActivity(Date.now());
        };

        // Track various user activities
        const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'click'];
        events.forEach(event => {
            window.addEventListener(event, handleActivity);
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [autoLockAfter]);

    // Auto-lock after period of inactivity
    useEffect(() => {
        if (!autoLockAfter || isLocked) return; // Skip if disabled or already locked

        const autoLockTimer = setTimeout(() => {
            const timeSinceLastActivity = Date.now() - userActivity;
            if (timeSinceLastActivity >= autoLockAfter) {
                lock();
            }
        }, autoLockAfter);

        return () => clearTimeout(autoLockTimer);
    }, [autoLockAfter, userActivity, isLocked]);

    return (
        <LockScreenContext.Provider value={{ isLocked, lock, unlock, toggleLock }}>
            <div className="relative">
                {/* Your main app content */}
                {children}

                {/* Lock screen overlay */}
                <AnimatePresence>
                    {isLocked && (
                        <LockScreen
                            images={images}
                            config={config}
                            isLocked={isLocked}
                            onUnlock={unlock}
                        />
                    )}
                </AnimatePresence>

                <VolumeControl />

            </div>
        </LockScreenContext.Provider>
    );
};