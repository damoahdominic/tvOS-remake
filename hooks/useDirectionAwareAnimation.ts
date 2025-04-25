// hooks/useDirectionAwareAnimation.ts
import { Direction } from '../types';

interface AnimationProps {
    direction: Direction;
    duration?: number;
}

export const useDirectionAwareAnimation = ({
    direction,
    duration = 300
}: AnimationProps) => {
    // Animation variants for different elements
    const backgroundVariants = {
        left: {
            initial: { opacity: 0, x: -50 },
            animate: { opacity: 1, x: 0, transition: { duration: duration / 1000 } },
            exit: { opacity: 0, x: 50, transition: { duration: duration / 1000 } }
        },
        right: {
            initial: { opacity: 0, x: 50 },
            animate: { opacity: 1, x: 0, transition: { duration: duration / 1000 } },
            exit: { opacity: 0, x: -50, transition: { duration: duration / 1000 } }
        },
        static: {
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { duration: duration / 1000 } },
            exit: { opacity: 0, transition: { duration: duration / 1000 } }
        }
    };

    const contentVariants = {
        left: {
            initial: { opacity: 0, x: -30 },
            animate: { opacity: 1, x: 0, transition: { duration: duration / 1000 } },
            exit: { opacity: 0, x: 30, transition: { duration: duration / 1000 } }
        },
        right: {
            initial: { opacity: 0, x: 30 },
            animate: { opacity: 1, x: 0, transition: { duration: duration / 1000 } },
            exit: { opacity: 0, x: -30, transition: { duration: duration / 1000 } }
        },
        static: {
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { duration: duration / 1000 } },
            exit: { opacity: 0, transition: { duration: duration / 1000 } }
        }
    };

    // Return the appropriate animation variant based on direction
    return {
        backgroundVariant: backgroundVariants[direction],
        contentVariant: contentVariants[direction]
    };
};