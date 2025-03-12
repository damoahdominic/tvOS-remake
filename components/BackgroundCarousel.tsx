import { AppItemType } from '@/data';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const imageTransition = 8000 // 8 seconds

const BackgroundCarousel = ({ focusedApp, scrolled }: { focusedApp: AppItemType, scrolled: boolean }) => {
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Effect for auto-playing through background images of the focused app
    useEffect(() => {
        if (!focusedApp) return;

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
    }, [focusedApp]);

    // If no app is focused or the focused app has no backgrounds, show a default
    if (!focusedApp || !focusedApp.backgrounds || focusedApp.backgrounds.length === 0) {
        return (
            <div className="absolute inset-0 w-full h-full bg-black opacity-60 z-0" />
        );
    }

    const currentBackgrounds = focusedApp.backgrounds;
    const currentBackground = currentBackgrounds[currentBackgroundIndex];

    return (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            {/* Background overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90 z-10" />

            {/* The actual background image */}
            <Image
                width={1000}
                height={1000}
                src={currentBackground}
                alt={`${focusedApp.appName} background`}
                className={`fixed inset-0 transition-all ${scrolled ? "blur-xl" : ""} w-full h-svh object-cover duration-1000 z-0 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
            />

            {/* App information overlay */}
            {/* <div className="absolute bottom-20 left-20 z-20 transition-opacity duration-500">
                <h2 className="text-4xl text-white font-bold mb-2">{focusedApp.appName}</h2>
                <p className="text-xl text-white opacity-80 max-w-md">
                    {focusedApp?.description || `Explore ${focusedApp.appName} content`}
                </p>
            </div> */}
        </div>
    );
};

export default BackgroundCarousel;