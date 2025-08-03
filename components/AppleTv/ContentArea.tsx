// components/ContentArea.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useNavigation } from '@/providers/appletv-provider';
import { useDirectionAwareAnimation } from '@/hooks/useDirectionAwareAnimation';

export const ContentArea: React.FC = () => {
    const { selectedIndex, items, direction } = useNavigation();
    const { contentVariant } = useDirectionAwareAnimation({ direction });
    const currentItem = items[selectedIndex];

    return (
        <div className="fixed top-1/3 transform -translate-y-1/2">
            <div className="max-w-lg">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentItem.id}
                        className="flex flex-col"
                        initial={contentVariant.initial}
                        animate={contentVariant.animate}
                        exit={contentVariant.exit}
                    >
                        {/* Logo */}
                        <div className="w-[150px] h-[80px] relative -left-4 mb-6">
                            <Image
                                src={currentItem.contentLogo}
                                alt={`${currentItem.title} logo`}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-[510] text-white/50 mb-3">
                            Case Study
                        </h1>

                        {/* Description */}
                        <p className="text-xl font-[510] text-white/50 mb-6 max-w-md">
                            {currentItem.description}
                        </p>

                        {/* Button/Link */}
                        <a
                            href={"http://domlarry.com/"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:bg-white bg-white/50 text-black pmx-cta-btn secondary hover:text-[#1e1e1e] py-2 px-6 rounded-md w-max hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <span className='font-bold'>{currentItem.linkText}</span>
                        </a>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};