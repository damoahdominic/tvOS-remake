/* eslint-disable react-hooks/exhaustive-deps */
// components/JumpBackInSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { NavigationItem } from './NavigationItem';
import { useNavigation } from '@/providers/appletv-provider';
import { TimerIndicator } from './TimerIndicator';

export const JumpBackInSection: React.FC = () => {
    const { selectedIndex, setSelectedIndex, items } = useNavigation();
    const [timerProgress, setTimerProgress] = useState<number>(0);
    const timerDuration = 8; // 8 seconds per item
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
        setSelectedIndex(nextIndex);
        resetTimer();
    };

    // Set up the timer effect
    useEffect(() => {
        // Clear any existing interval
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }

        // Create a new interval to update the progress
        timerIntervalRef.current = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = (currentTime - lastInteractionTimeRef.current) / 1000;

            if (elapsedTime >= timerDuration) {
                // Time to move to the next item
                goToNextItem();
            } else {
                // Update progress
                setTimerProgress(elapsedTime / timerDuration);
            }
        }, 50); // Update frequently for smooth progress bar

        // Clean up the interval on unmount
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        };
    }, [selectedIndex, items.length]);

    // Effect to reset timer when selected index changes
    useEffect(() => {
        resetTimer();
    }, [selectedIndex]);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-20 py-6">
            <div className="pl-10">
                {/* Jump Back In Header */}
                <div className="flex items-center mb-4">
                    <h2 className="text-white text-lg font-semibold">Jump back in</h2>
                    <div className="mx-auto relative right-10 flex items-center space-x-2">
                        {items.map((_, i) => (
                            <TimerIndicator
                                key={i}
                                isActive={i === selectedIndex}
                                total={items.length}
                                progress={i === selectedIndex ? timerProgress : 0}
                                index={i}
                            />
                        ))}
                    </div>
                </div>

                {/* Navigation Items */}
                <LayoutGroup>
                    <motion.div
                        className="flex items-center space-x-5"
                        layout
                    >
                        {items.map((item, index) => (
                            <NavigationItem
                                key={item.id}
                                item={item}
                                isSelected={index === selectedIndex}
                                onClick={() => {
                                    setSelectedIndex(index);
                                    resetTimer();
                                }}
                                setSelectedIndex={setSelectedIndex}
                                index={index}
                            />
                        ))}
                    </motion.div>
                </LayoutGroup>
            </div>
        </div>
    );
};