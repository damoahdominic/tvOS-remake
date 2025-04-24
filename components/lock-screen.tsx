'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockScreenImage, LockScreenConfig, defaultLockScreenConfig, TimePosition, TimeMargin } from '@/data';
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
    const [currentTime, setCurrentTime] = useState({ hour: '', minute: '' });
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
            let hour, minute;

            if (config.timeFormat === '12h') {
                const hours = now.getHours() % 12;
                hour = (hours === 0 ? 12 : hours).toString();
                minute = now.getMinutes().toString().padStart(2, '0');
            } else {
                hour = now.getHours().toString().padStart(2, '0');
                minute = now.getMinutes().toString().padStart(2, '0');
            }

            setCurrentTime({ hour, minute });
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

    // Apply margin adjustments to position
    const applyMarginAdjustments = (
        basePosition: React.CSSProperties,
        margin?: TimeMargin
    ): React.CSSProperties => {
        if (!margin) return basePosition;

        const adjustedPosition = { ...basePosition };

        // Get the current position values (remove '%' and convert to number)
        const currentTop = typeof adjustedPosition.top === 'string'
            ? parseFloat(adjustedPosition.top)
            : 50; // Default to center if not set

        const currentLeft = typeof adjustedPosition.left === 'string'
            ? parseFloat(adjustedPosition.left)
            : 50; // Default to center if not set

        // Apply margins as offsets from current position
        if (margin.top !== undefined) {
            // Reduce the top position by the margin percentage
            adjustedPosition.top = `${currentTop - margin.top}%`;
        }

        if (margin.bottom !== undefined) {
            // If bottom is specified, we need to handle it differently
            // We'll keep using top positioning but adjust the value
            const bottomOffset = margin.bottom;
            adjustedPosition.top = `${currentTop + bottomOffset}%`;
        }

        if (margin.left !== undefined) {
            // Reduce the left position by the margin percentage
            adjustedPosition.left = `${currentLeft - margin.left}%`;
        }

        if (margin.right !== undefined) {
            // If right is specified, we need to handle it differently
            // We'll keep using left positioning but adjust the value
            const rightOffset = margin.right;
            adjustedPosition.left = `${currentLeft + rightOffset}%`;
        }

        return adjustedPosition;
    };

    // Get position styles based on time position setting
    const getPositionStyles = (position: TimePosition, margin?: TimeMargin): React.CSSProperties => {
        // Start with centered by default
        const baseStyles: React.CSSProperties = {
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            zIndex: 10 // Set time to be above background but below foreground
        };

        let positionStyles: React.CSSProperties;

        switch (position) {
            case 'center':
                positionStyles = {
                    ...baseStyles,
                    top: '50%',
                    left: '50%',
                };
                break;
            case 'top-center':
                positionStyles = {
                    ...baseStyles,
                    top: '20%',
                    left: '50%',
                };
                break;
            case 'bottom-center':
                positionStyles = {
                    ...baseStyles,
                    top: '80%',
                    left: '50%',
                };
                break;
            case 'left-center':
                positionStyles = {
                    ...baseStyles,
                    top: '50%',
                    left: '25%',
                };
                break;
            case 'right-center':
                positionStyles = {
                    ...baseStyles,
                    top: '50%',
                    left: '75%',
                };
                break;
            case 'top-left':
                positionStyles = {
                    ...baseStyles,
                    top: '20%',
                    left: '25%',
                };
                break;
            case 'top-right':
                positionStyles = {
                    ...baseStyles,
                    top: '20%',
                    left: '75%',
                };
                break;
            case 'bottom-left':
                positionStyles = {
                    ...baseStyles,
                    top: '80%',
                    left: '25%',
                };
                break;
            case 'bottom-right':
                positionStyles = {
                    ...baseStyles,
                    top: '80%',
                    left: '75%',
                };
                break;
            default:
                positionStyles = {
                    ...baseStyles,
                    top: '50%',
                    left: '50%',
                };
        }

        // Apply margin adjustments if provided
        return applyMarginAdjustments(positionStyles, margin);
    };

    // Get current time display config
    const getTimeDisplayConfig = () => {
        // Check if current image has custom time settings
        const currentImage = slideshow[activeIndex];

        const timeConfig = {
            position: currentImage?.timeDisplay?.position || config.timePosition,
            layout: currentImage?.timeDisplay?.layout || config.timeLayout,
            size: currentImage?.timeDisplay?.size || config.timeSize,
            color: currentImage?.timeDisplay?.color || config.timeColor,
            opacity: currentImage?.timeDisplay?.opacity || config.timeOpacity,
            margin: currentImage?.timeDisplay?.margin || config.timeMargin
        };

        return timeConfig;
    };

    // If not locked or no images, don't render anything
    if (!isLocked || slideshow.length === 0) return null;

    // Get current time display settings
    const timeDisplay = getTimeDisplayConfig();
    const positionStyles = getPositionStyles(timeDisplay.position, timeDisplay.margin);

    return (
        <motion.div
            className="fixed inset-0 z-[999999999999] bg-black"
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
                    {/* Background Image - z-index 1 */}
                    <div className="absolute inset-0 z-[1]">
                        <Image
                            src={slideshow[activeIndex].background}
                            alt={slideshow[activeIndex].title || 'Lock screen background'}
                            className="object-cover object-top"
                            fill
                            priority
                        />
                    </div>

                    {/* Time Display - z-index 10 (set in positionStyles) */}
                    {showTime && (
                        <motion.div
                            className="absolute pointer-events-none"
                            style={positionStyles}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {timeDisplay.layout === 'horizontal' ? (
                                // Horizontal layout (01:30)
                                <motion.h1
                                    className={`text-center tracking-tight font-medium ${slideshow[activeIndex].timeDisplay?.font}`}
                                    style={{
                                        color: timeDisplay.color,
                                        opacity: timeDisplay.opacity,
                                        textShadow: '0 0 15px rgba(0, 0, 0, 0.25)',
                                        fontSize: `25vw`,
                                        lineHeight: 1
                                    }}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: timeDisplay.opacity }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                >
                                    {`${currentTime.hour}:${currentTime.minute}`}
                                </motion.h1>
                            ) : (
                                // Stacked layout (01 above 30)
                                <motion.div
                                    className={`text-center tracking-tight font-medium ${slideshow[activeIndex].timeDisplay?.font}`}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: timeDisplay.opacity }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                >
                                    <h1
                                        className="text-center tracking-tight"
                                        style={{
                                            color: timeDisplay.color,
                                            fontSize: `25vw`,
                                            lineHeight: 0.8
                                        }}
                                    >
                                        {currentTime.hour.padStart(2, '0')}
                                    </h1>
                                    <h1
                                        className="text-center tracking-tight"
                                        style={{
                                            color: timeDisplay.color,
                                            textShadow: '0 0 15px rgba(0, 0, 0, 0.25)',
                                            fontSize: `25vw`,
                                            lineHeight: 0.8
                                        }}
                                    >
                                        {currentTime.minute}
                                    </h1>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* Foreground Image (if available) - z-index 20 (highest) */}
                    {slideshow[activeIndex].foreground && (
                        <div className="absolute inset-0 z-[20]">
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

            {/* Unlock Instruction - Swipe Up - z-index 30 (above everything) */}
            <motion.div
                className="absolute bottom-16 left-0 right-0 flex justify-center items-center z-[30] h-14 bg-gradient-to-r w-1/3 mx-auto from-transparent via-black/70 to-transparent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div className="flex flex-col items-center">
                    <p className="text-white text-xl font-medium">Tap here to unlock</p>
                </div>
            </motion.div>

            {/* Swipe Area for Touch Interactions - z-index 40 (interactive) */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1/4 cursor-pointer z-[40]"
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