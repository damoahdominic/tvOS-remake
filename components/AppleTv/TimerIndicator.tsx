// components/TimerIndicator.tsx
import React from 'react';
import { motion } from 'framer-motion';

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
    // The active indicator is wider and all indicators together should take a reasonable space
    const baseWidth = 60; // Base width of the active indicator in pixels
    const inactiveWidth = 8; // Width of inactive indicators
    const gap = 4; // Gap between indicators

    // Adjust layout to center all indicators properly
    // const containerWidth = (baseWidth - inactiveWidth) * (1 / total) + inactiveWidth;

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
                    style={{
                        width: `${progress * 100}%`,
                        // Add slight glow effect for active indicator
                        boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)'
                    }}
                    transition={{
                        duration: 0.1,
                        ease: "linear"
                    }}
                />
            )}
        </div>
    );
};