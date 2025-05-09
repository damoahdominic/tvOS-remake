import { AppItemType, apps } from '@/data';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

const imageTransition = 8000; // 8 seconds
const fadeTransitionDuration = 0.5; // 0.5 seconds fade transition (slower but still snappy)

const titleTransition = { duration: 0.45, delay: 0.5 };
const subtitleTransition = { duration: 0.45, delay: 0.85 };
const animate = { opacity: 1, x: 0 };
const initial = { opacity: 0, x: -20 };

const BackgroundCarousel = ({ focusedApp, scrolled, isExpanded }: { focusedApp: AppItemType, scrolled: boolean, isExpanded: boolean }) => {
    const [hasFinishedSplash, setHasFinishedSplash] = useState(false);
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');

    // Track the previous app and position for transitions
    const previousAppRef = useRef<AppItemType | null>(null);
    const [previousApp, setPreviousApp] = useState<AppItemType | null>(null);
    const previousPositionRef = useRef<{ row: number; col: number } | null>(null);

    // Add a key to force re-render when needed
    const [forceRenderKey, setForceRenderKey] = useState(0);

    // When focused app changes, store the previous one for crossfade
    useEffect(() => {
        if (!focusedApp) return;

        // Get current position from the app index
        const currentPosition = {
            row: 1, // Always row 1 for apps
            col: apps.findIndex(app => app.appName === focusedApp.appName) + 1
        };

        // Only treat as a change if the app ID is different
        if (!previousAppRef.current || previousAppRef.current.appName !== focusedApp.appName) {
            setPreviousApp(previousAppRef.current);
            previousAppRef.current = focusedApp;

            // Determine transition direction based on position changes
            if (previousPositionRef.current) {
                const prevPos = previousPositionRef.current;
                const newPos = currentPosition;

                // If rows are different, use row comparison
                if (prevPos.row !== newPos.row) {
                    setTransitionDirection(newPos.row > prevPos.row ? 'right' : 'left');
                }
                // If rows are same, use column comparison
                else {
                    setTransitionDirection(newPos.col > prevPos.col ? 'right' : 'left');
                }
            }

            // Update previous position
            previousPositionRef.current = currentPosition;

            // Reset splash state for the new app
            setHasFinishedSplash(false);
            setCurrentBackgroundIndex(0);

            // Force a re-render to ensure splash screens show correctly
            setForceRenderKey(prev => prev + 1);

            // Start transition
            setIsTransitioning(true);

            // Clear transition state after animation completes
            const transitionTimer = setTimeout(() => {
                setIsTransitioning(false);
            }, fadeTransitionDuration * 1000);

            return () => clearTimeout(transitionTimer);
        }
    }, [focusedApp]);

    // Effect for splash screen
    useEffect(() => {
        if (!focusedApp) return;

        // Handle apps with only splash screens
        if (focusedApp.hasSplashScreen) {
            setHasFinishedSplash(false);

            // Show splash for specified time
            const timeout = setTimeout(() => {
                // Only transition to backgrounds if the app has backgrounds
                if (focusedApp.backgrounds && focusedApp.backgrounds.length > 0) {
                    setHasFinishedSplash(true);
                }
            }, 4000);

            return () => clearTimeout(timeout);
        } else {
            // No splash screen, show backgrounds immediately
            setHasFinishedSplash(true);
        }
    }, [focusedApp]);

    // Effect for auto-playing through background images of the focused app
    useEffect(() => {
        if (!focusedApp || !hasFinishedSplash) return;

        const appBackgrounds = focusedApp.backgrounds || [];
        if (appBackgrounds.length <= 1) return;

        const intervalId = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentBackgroundIndex(prev => (prev + 1) % appBackgrounds.length);
                setIsTransitioning(false);
            }, fadeTransitionDuration * 1000); // Time for fade-out before changing image
        }, imageTransition); // Change every 8 seconds

        return () => clearInterval(intervalId);
    }, [focusedApp, hasFinishedSplash]);


    // Helper function to determine what image source to use
    const getImageSource = (app: AppItemType, isCurrent: boolean = true): {
        background: string | { image: string, content?: React.ReactNode } | undefined,
        foregroundSrc: string | undefined,
        isSplash: boolean
    } => {
        // Check if we should show splash
        const showSplash = app.hasSplashScreen &&
            ((!hasFinishedSplash && isCurrent) ||
                // Special case: if app has only splash but no backgrounds, always show splash
                (!app.backgrounds || app.backgrounds.length === 0));

        const background = showSplash
            ? app.splash?.background
            : (app.backgrounds && app.backgrounds.length > 0
                ? app.backgrounds[isCurrent ? currentBackgroundIndex : 0]
                : undefined);

        const foregroundSrc = showSplash ? app.splash?.foreground : undefined;

        return {
            background,
            foregroundSrc,
            isSplash: showSplash || false
        };
    };

    // Helper function to render a background image with motion
    const renderBackground = (app: AppItemType, isCurrent: boolean = true) => {
        const { background, foregroundSrc, isSplash } = getImageSource(app, isCurrent);

        if (!background) {
            // If no background image found, render a fallback black background
            return (
                <motion.div
                    key={`${app.appName}-fallback-${isCurrent ? 'current' : 'previous'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isCurrent ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: fadeTransitionDuration, ease: "easeInOut" }}
                    className="fixed inset-0 w-full h-full bg-black"
                />
            );
        }

        const initialX = transitionDirection === 'right' ? -15 : 15;
        const exitX = transitionDirection === 'right' ? 15 : -15;

        return (
            <motion.div
                key={`${app.appName}-${isSplash ? 'splash' : 'bg'}-${isCurrent ? 'current' : 'previous'}-${forceRenderKey}`}
                initial={{ opacity: 0, x: isCurrent ? -initialX : initialX }}
                animate={{ opacity: isCurrent ? 1 : 0, x: 0 }}
                exit={{ opacity: 0, x: isCurrent ? -exitX : exitX }}
                transition={{
                    duration: fadeTransitionDuration,
                    ease: [0.4, 0, 0.2, 1],
                    opacity: {
                        duration: fadeTransitionDuration * 0.8,
                        delay: isCurrent ? fadeTransitionDuration * 0.2 : 0 // Delay the entering animation
                    }
                }}
                className="fixed inset-0 w-full h-full"
            >
                <Image
                    width={1000}
                    height={1000}
                    src={typeof background === "string" ? background : background.image}
                    alt={`${app.appName} background`}
                    className={`fixed inset-0 w-full h-svh object-cover ${scrolled ? "blur-xl" : ""}`}
                />

                {/* Render splash foreground if showing splash */}
                {foregroundSrc && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, delay: 0.5, type: "tween" }} className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 ${scrolled ? "blur-xl" : ""}`}>
                        <Image
                            src={foregroundSrc}
                            alt={`${app.appName} foreground`}
                            width={500}
                            height={500}
                        />
                    </motion.div>
                )}

                {typeof background === "object" && background.content && <div className={`relative !size-full text-7xl ${scrolled ? "blur-xl" : ""}`}>
                    {background.content}
                    <div className="relative px-10 top-[7%] left-[3%] hidden">
                        <Image src={"/apps/foreground/severance.svg"} width={368} height={61} alt={"severance"} />
                    </div>
                    <div className="relative px-10 size-full items-center hidden justify-center">
                        <Image src={"/apps/foreground/apple-tv.svg"} className="absolute top-[3%] left-[4%]" width={200} height={61} alt={"severance"} />
                        <div className="size-full flex items-center justify-center">
                            <Image src={"/apps/foreground/dom-n-larry.svg"} className="pb-20" width={400} height={61} alt={"severance"} />
                        </div>
                    </div>
                    <div className="hidden relative top-[2%] gap-3 size-full flex-col items-center justify-center font-semibold text-white">
                        <Image src={"/apps/foreground/fitness.svg"} width={168} height={61} alt={"fitness"} />
                        <p className="text-7xl">Fitness for all.<br />Fitness for you.</p>
                    </div>
                    <div className="relative hidden px-10 top-[5%] gap-3 font-semibold text-white">
                        <motion.h2 initial={initial} animate={animate} transition={titleTransition} exit={initial} whileInView={animate} className="text-4xl">Trip to the Hamptons</motion.h2>
                        <motion.p initial={initial} animate={animate} transition={subtitleTransition} exit={initial} whileInView={animate} className="text-xl">August 2022</motion.p>
                    </div>
                </div>}
            </motion.div>
        );
    };


    // If no focused app, show a default background
    if (!focusedApp) {
        return (
            <div className="absolute inset-0 w-full h-full bg-black opacity-60 z-0" />
        );
    }

    return (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            {/* Background overlay with gradient */}
            {!isExpanded && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90 z-10" />}

            {/* Background images with crossfade */}
            <AnimatePresence mode="sync">
                {/* Previous app background (for crossfade) */}
                {previousApp && isTransitioning && renderBackground(previousApp, false)}

                {/* Current app background */}
                {renderBackground(focusedApp, true)}
            </AnimatePresence>

            {/* Bottom Indicator - Only visible when expanded */}
            {(isExpanded && focusedApp?.backgrounds && focusedApp?.backgrounds?.length > 1) && <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 z-50 ${isExpanded ? 'opacity-100' : 'opacity-0'
                }`}>
                <div className="px-4 py-2 rounded-full backdrop-blur-md bg-black bg-opacity-30 border border-white border-opacity-20 flex items-center space-x-3">
                    {[...Array(focusedApp?.backgrounds?.length)].map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${currentBackgroundIndex === index
                                ? 'bg-white'
                                : 'bg-white opacity-40'
                                } cursor-pointer`}
                            onClick={() => setCurrentBackgroundIndex(index)}
                        />
                    ))}
                </div>
            </div>}
            {/* App information overlay could be added here */}
        </div>
    );
};

export default BackgroundCarousel;