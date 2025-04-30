// components/TimerIndicator.tsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface TimerIndicatorProps {
    isActive: boolean;
    progress: number; // 0 to 1
    index: number;
    total: number;
}

export const TimerIndicator: React.FC<TimerIndicatorProps> = ({
    isActive,
    progress,
    index,
    total
}) => {
    // Calculate width based on whether it's active or not
    const baseWidth = 60; // Base width of the active indicator in pixels
    const inactiveWidth = 8; // Width of inactive indicators
    const gap = 4; // Gap between indicators

    // Use Framer Motion's animation controls for smoother animations
    const controls = useAnimation();

    // Update the animation whenever progress changes
    useEffect(() => {
        if (isActive) {
            // Animate the width smoothly
            controls.start({
                width: `${progress * 100}%`,
                transition: {
                    duration: 0.1, // Short duration for frequent updates
                    ease: "linear" // Linear easing for constant speed
                }
            });
        } else {
            // Reset when not active
            controls.set({ width: 0 });
        }
    }, [isActive, progress, controls]);

    return (
        <div
            className={`relative rounded-full overflow-hidden transition-all duration-300 ease-in-out`}
            style={{
                width: isActive ? baseWidth : inactiveWidth,
                height: inactiveWidth,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                marginRight: index < total - 1 ? gap : 0
            }}
        >
            {isActive && (
                <motion.div
                    className="absolute top-0 left-0 h-full bg-white"
                    initial={{ width: 0 }}
                    animate={controls}
                    style={{
                        boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)'
                    }}
                />
            )}
        </div>
    );
};