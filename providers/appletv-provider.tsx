// providers/appletv-provider.tsx
import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Direction, JumpBackItem } from '@/types';

interface NavigationContextProps {
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    items: JumpBackItem[];
    direction: Direction;
    timerProgress: number;
    resetTimer: () => void;
    pauseAutoChange: () => void;
    resumeAutoChange: () => void;
    isAutoPaused: boolean;
}

// Create context with default values
const NavigationContext = createContext<NavigationContextProps>({
    selectedIndex: 0,
    setSelectedIndex: () => { },
    items: [],
    direction: 'static',
    timerProgress: 0,
    resetTimer: () => { },
    pauseAutoChange: () => { },
    resumeAutoChange: () => { },
    isAutoPaused: false
});

interface NavigationProviderProps {
    children: ReactNode;
    items: JumpBackItem[];
    autoChangeDuration?: number; // in seconds
}

export const AppleTVProvider: React.FC<NavigationProviderProps> = ({
    children,
    items,
    autoChangeDuration = 8 // Default to 8 seconds
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [direction, setDirection] = useState<Direction>('static');
    const [timerProgress, setTimerProgress] = useState(0);
    const [isAutoPaused, setIsAutoPaused] = useState(false);

    // Refs for timer management
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastInteractionTimeRef = useRef<number>(Date.now());

    // Function to reset timer when user interacts
    const resetTimer = () => {
        setTimerProgress(0);
        lastInteractionTimeRef.current = Date.now();
    };

    // Function to move to the next item
    const goToNextItem = () => {
        const nextIndex = (selectedIndex + 1) % items.length;
        setDirection('right');
        setSelectedIndex(nextIndex);
        resetTimer();
    };

    // Set up the timer effect
    useEffect(() => {
        // Clear any existing interval
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }

        // Only start the timer if auto-changing is not paused
        if (!isAutoPaused) {
            // Create a new interval to update the progress
            timerIntervalRef.current = setInterval(() => {
                const currentTime = Date.now();
                const elapsedTime = (currentTime - lastInteractionTimeRef.current) / 1000;

                if (elapsedTime >= autoChangeDuration) {
                    // Time to move to the next item
                    goToNextItem();
                } else {
                    // Update progress
                    setTimerProgress(elapsedTime / autoChangeDuration);
                }
            }, 50); // Update frequently for smooth progress bar
        }

        // Clean up the interval on unmount
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
        };
    }, [selectedIndex, items.length, autoChangeDuration, isAutoPaused]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key.toLowerCase()) {
                case 'a':
                    if (selectedIndex > 0) {
                        setDirection('left');
                        setSelectedIndex(prev => prev - 1);
                        resetTimer();
                    }
                    break;
                case 'd':
                    if (selectedIndex < items.length - 1) {
                        setDirection('right');
                        setSelectedIndex(prev => prev + 1);
                        resetTimer();
                    }
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex, items.length]);

    // Reset direction to static after animation completes
    useEffect(() => {
        if (direction !== 'static') {
            const timer = setTimeout(() => {
                setDirection('static');
            }, 300); // Duration should match animation duration
            return () => clearTimeout(timer);
        }
    }, [direction]);

    const pauseAutoChange = () => setIsAutoPaused(true);
    const resumeAutoChange = () => {
        setIsAutoPaused(false);
        resetTimer(); // Reset timer when resuming
    };

    return (
        <NavigationContext.Provider
            value={{
                selectedIndex,
                setSelectedIndex: (index) => {
                    // Set direction based on the current and new index
                    if (index > selectedIndex) {
                        setDirection('right');
                    } else if (index < selectedIndex) {
                        setDirection('left');
                    }
                    setSelectedIndex(index);
                    resetTimer(); // Reset timer when changing items
                },
                items,
                direction,
                timerProgress,
                resetTimer,
                pauseAutoChange,
                resumeAutoChange,
                isAutoPaused
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

// Hook to use the navigation context
export const useNavigation = () => useContext(NavigationContext);