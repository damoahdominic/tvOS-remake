// hooks/useAppleTVKeyboardNavigation.ts
import { useEffect, useState } from 'react';
import { Direction } from '../types';

interface UseKeyboardNavigationProps {
    itemCount: number;
    initialIndex?: number;
}

export const useAppleTVKeyboardNavigation = ({
    itemCount,
    initialIndex = 0
}: UseKeyboardNavigationProps) => {
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const [direction, setDirection] = useState<Direction>('static');

    const handleKeyDown = (e: KeyboardEvent) => {
        // Only handle A and D keys for horizontal navigation
        switch (e.key.toLowerCase()) {
            case 'a':
                if (selectedIndex > 0) {
                    setDirection('left');
                    setSelectedIndex(prev => prev - 1);
                }
                break;
            case 'd':
                if (selectedIndex < itemCount - 1) {
                    setDirection('right');
                    setSelectedIndex(prev => prev + 1);
                }
                break;
            // We can add W and S for vertical navigation if needed
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex, itemCount]);

    // Reset direction to static after animation completes
    useEffect(() => {
        if (direction !== 'static') {
            const timer = setTimeout(() => {
                setDirection('static');
            }, 300); // Duration should match animation duration
            return () => clearTimeout(timer);
        }
    }, [direction]);

    return { selectedIndex, setSelectedIndex, direction };
};