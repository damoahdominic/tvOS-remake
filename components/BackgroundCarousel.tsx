import { AppItemType } from '@/data';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const imageTransition = 8000 // 8 seconds

const BackgroundCarousel = ({ focusedApp, scrolled }: { focusedApp: AppItemType, scrolled: boolean }) => {
    const [hasFinishedSplash, setHasFinishedSplash] = useState(false);
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        setHasFinishedSplash(false);
    }, [focusedApp]);

    // Effect for auto-playing through background images of the focused app
    useEffect(() => {
        if (!focusedApp) return;

        if (!focusedApp?.backgrounds) return

        if (focusedApp.hasSplashScreen) {
            setHasFinishedSplash(false);
        }
        else {
            setHasFinishedSplash(true);
            return
        }

        // Show splash for 2 seconds after app launch
        const timeout = setTimeout(() => {
            setHasFinishedSplash(true);
        }, 4000);

        return () => clearTimeout(timeout);
    }, [focusedApp]);

    // Effect for auto-playing through background images of the focused app
    useEffect(() => {
        if (!focusedApp || !hasFinishedSplash) return;

        // Reset index when focused app changes
        setCurrentBackgroundIndex(0);

        const appBackgrounds = focusedApp.backgrounds || [];
        if (appBackgrounds.length <= 1) return;

        const intervalId = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentBackgroundIndex(prev => (prev + 1) % appBackgrounds.length);
                setIsTransitioning(false);
            }, 500); // Half a second for fade-out before changing image
        }, imageTransition); // Change every 8 seconds

        return () => clearInterval(intervalId);
    }, [focusedApp, hasFinishedSplash]);

    // If no app is focused or the focused app has no backgrounds, show a default
    if (!focusedApp || !focusedApp.backgrounds || focusedApp.backgrounds.length === 0) {
        return (
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                {/* Background overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90 z-10" />
                <div className='fixed inset-0 w-full h-full bg-pink-600'>
                    <Image
                        width={1000}
                        height={1000}
                        src={focusedApp?.splash?.background || ""}
                        alt={`${focusedApp.appName} background`}
                        className={`fixed inset-0 transition-all ${scrolled ? "blur-xl" : ""} w-full h-svh object-cover duration-1000 z-0 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                            }`}
                    />

                    <div className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 ${scrolled ? "blur-xl" : ""}`}>
                        <Image src={focusedApp?.splash?.foreground || ""} alt={`${focusedApp.appName} foreground`} width={500} height={500} />
                    </div>
                </div>
            </div>
        );
    }

    const currentBackgrounds = focusedApp.backgrounds;
    const currentBackground = currentBackgrounds[currentBackgroundIndex];

    return (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            {/* Background overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90 z-10" />

            <AnimatePresence mode="wait">
                {/* The actual background image */}
                {(hasFinishedSplash && currentBackground) ? <Image
                    width={1000}
                    height={1000}
                    src={currentBackground}
                    alt={`${focusedApp.appName} background`}
                    className={`fixed inset-0 transition-all ${scrolled ? "blur-xl" : ""} w-full h-svh object-cover duration-1000 z-0 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                        }`}
                />
                    :
                    focusedApp?.splash &&
                    <div className='fixed inset-0 w-full h-full bg-pink-600'>
                        <Image
                            width={1000}
                            height={1000}
                            src={focusedApp?.splash?.background}
                            alt={`${focusedApp.appName} background`}
                            className={`fixed inset-0 transition-all ${scrolled ? "blur-xl" : ""} w-full h-svh object-cover duration-1000 z-0 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                                }`}
                            />
                            
                        <div className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 ${scrolled ? "blur-xl" : ""}`}>
                            <Image src={focusedApp?.splash?.foreground} alt={`${focusedApp.appName} foreground`} width={500} height={500} />
                        </div>
                    </div>
                }
            </AnimatePresence>
        </div>
    );
};

export default BackgroundCarousel;