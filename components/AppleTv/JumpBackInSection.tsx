// components/JumpBackInSection.tsx
import React from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { NavigationItem } from './NavigationItem';
import { TimerIndicator } from './TimerIndicator';
import { useNavigation } from '@/providers/appletv-provider';

export const JumpBackInSection: React.FC = () => {
    const { selectedIndex, setSelectedIndex, items, timerProgress } = useNavigation();

    return (
        <div className="relative md:fixed md:bottom-0 md:left-0 md:right-0 z-20 py-4 md:py-6 bg-gradient-to-t from-black/80 to-transparent mt-8 md:mt-0">
            <div className="md:px-10">
                {/* Jump Back In Header with Indicators */}
                <div className="flex items-center mb-4">
                    <h2 className="text-white text-lg font-semibold mr-4">Jump back in</h2>

                    {/* Timer Indicators */}
                    <div className="mx-auto relative right-10 flex items-center space-x-1">
                        {items.map((_, i) => (
                            <TimerIndicator
                                key={i}
                                isActive={i === selectedIndex}
                                progress={i === selectedIndex ? timerProgress : 0}
                                index={i}
                                total={items.length}
                            />
                        ))}
                    </div>
                </div>

                {/* Navigation Items */}
                <LayoutGroup>
                    <motion.div
                        className="flex items-start space-x-2 md:space-x-5 overflow-x-auto pb-2 md:pb-0 apple-tv-nav-items"
                        layout
                    >
                        {items.map((item, index) => (
                            <NavigationItem
                                key={item.id}
                                item={item}
                                isSelected={index === selectedIndex}
                                onClick={() => setSelectedIndex(index)}
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