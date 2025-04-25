// components/BackgroundImage.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/providers/appletv-provider';
import { useDirectionAwareAnimation } from '@/hooks/useDirectionAwareAnimation';

export const BackgroundImage: React.FC = () => {
    const { selectedIndex, items, direction } = useNavigation();
    const { backgroundVariant } = useDirectionAwareAnimation({ direction });
    const currentItem = items[selectedIndex];

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentItem.id}
                    className="w-full h-full"
                    initial={backgroundVariant.initial}
                    animate={backgroundVariant.animate}
                    exit={backgroundVariant.exit}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
                        style={{ backgroundImage: `url(${currentItem.backgroundImage})` }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent w-2/4" />
                    <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-black via-black/30 to-transparent w-full" />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};