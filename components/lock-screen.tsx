'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockScreenImage, LockScreenConfig, defaultLockScreenConfig } from '@/data';
import Image from 'next/image';

interface LockScreenProps {
    images: LockScreenImage[];
    config?: Partial<LockScreenConfig>;
    isLocked: boolean;
    onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({
    images,
    config: userConfig,
    isLocked,
    onUnlock
}) => {
    // Merge user config with default config
    const config = { ...defaultLockScreenConfig, ...userConfig };

    // State for the slideshow
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState('');
    const [slideshow, setSlideshow] = useState<LockScreenImage[]>([]);
    const [showTime, setShowTime] = useState(false);

    // Use refs to track the current slide and timer
    const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);
    const slideTransitioningRef = useRef(false);

    // Initialize and potentially randomize the slideshow
    useEffect(() => {
        if (images.length === 0) return;

        const orderedImages = [...images];
        if (config.randomize) {
            // Fisher-Yates shuffle algorithm
            for (let i = orderedImages.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [orderedImages[i], orderedImages[j]] = [orderedImages[j], orderedImages[i]];
            }
        }

        setSlideshow(orderedImages);
        setActiveIndex(0);
    }, [images, config.randomize]);

    // Update the current time
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let timeString;

            if (config.timeFormat === '12h') {
                let hours = now.getHours() % 12;
                hours = hours === 0 ? 12 : hours; // Convert 0 to 12 for 12h format
                const minutes = now.getMinutes().toString().padStart(2, '0');
                timeString = `${hours}:${minutes}`;
            } else {
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                timeString = `${hours}:${minutes}`;
            }

            setCurrentTime(timeString);
        };

        // Update time immediately and then every minute
        updateTime();
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, [config.timeFormat]);

    // Show time with delay after component mounts or lock state changes
    useEffect(() => {
        if (isLocked) {
            // Delay showing the time to allow background to load first
            const timeoutId = setTimeout(() => {
                setShowTime(true);
            }, 500);

            return () => clearTimeout(timeoutId);
        } else {
            setShowTime(false);
        }
    }, [isLocked]);

    // Handle the slideshow transitions
    useEffect(() => {
        if (!isLocked || slideshow.length <= 1) return;

        // Clear any existing timer
        if (slideshowTimerRef.current) {
            clearInterval(slideshowTimerRef.current);
        }

        // Set up the slideshow timer
        slideshowTimerRef.current = setInterval(() => {
            if (!slideTransitioningRef.current) {
                slideTransitioningRef.current = true;

                // Move to next slide after current slide duration
                setTimeout(() => {
                    setActiveIndex((prevIndex) => (prevIndex + 1) % slideshow.length);
                    slideTransitioningRef.current = false;
                }, config.fadeDuration);
            }
        }, config.slideDuration);

        // Clean up on unmount
        return () => {
            if (slideshowTimerRef.current) {
                clearInterval(slideshowTimerRef.current);
            }
        };
    }, [isLocked, slideshow.length, config.slideDuration, config.fadeDuration]);

    // Handle unlock gestures (swipe up)
    const handleUnlock = useCallback(() => {
        onUnlock();
    }, [onUnlock]);

    // If not locked or no images, don't render anything
    if (!isLocked || slideshow.length === 0) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[999999999] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background and foreground images with crossfade */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={`slide-${activeIndex}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: config.fadeDuration / 1000,
                        ease: "easeInOut"
                    }}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={slideshow[activeIndex].background}
                            alt={slideshow[activeIndex].title || 'Lock screen background'}
                            className="object-cover object-top"
                            fill
                            priority
                        />
                    </div>

                    {/* Foreground Image (if available) */}
                    {slideshow[activeIndex].foreground && (
                        <div className="absolute inset-0">
                            <Image
                                src={slideshow[activeIndex].foreground}
                                alt={`${slideshow[activeIndex].title || 'Lock screen'} foreground`}
                                className="object-cover object-top"
                                fill
                                priority
                            />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Time Display */}
            <AnimatePresence>
                {showTime && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.h1
                            className="text-9xl font-light tracking-tight"
                            style={{
                                color: config.timeColor,
                                opacity: config.timeOpacity,
                                textShadow: '0 0 15px rgba(0, 0, 0, 0.25)',
                            }}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: config.timeOpacity }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            {currentTime}
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Unlock Instruction - Swipe Up */}
            <motion.div
                className="absolute bottom-16 left-0 right-0 flex justify-center items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div className="flex flex-col items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mb-2"
                    >
                        <path d="M12 5v14M5 12l7-7 7 7" />
                    </svg>
                    <p className="text-white/70 text-sm">Swipe up to unlock</p>
                </div>
            </motion.div>

            {/* Swipe Area for Touch Interactions */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1/4 cursor-pointer"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.1}
                onDragEnd={(event, info) => {
                    if (info.offset.y < -50) {
                        handleUnlock();
                    }
                }}
                onClick={handleUnlock}
            />
        </motion.div>
    );
};

export default LockScreen;