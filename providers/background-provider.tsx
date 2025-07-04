"use client"
import BackgroundCarousel from '@/components/BackgroundCarousel';
import { apps } from '@/data';
import React, { useEffect, useState } from 'react'
import { useAppContext } from './app-provider';

const BackgroundProvider = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    const [scrolled, setScrolled] = useState(false)
    const { isFullscreen } = useAppContext()


    // Direct grid navigation - no activity bar integration for simplicity
    const { lastFocusedPosition } = useAppContext()
    const [focusedApp, setFocusedApp] = useState(apps[0]);

    // Handle scroll events with debounce
    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;

        let timeout: NodeJS.Timeout;

        const handleScroll = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setScrolled(window.scrollY > 50);
            }, 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (lastFocusedPosition.row === 0) {
            setFocusedApp(apps[lastFocusedPosition.col]);
        }
    }, [lastFocusedPosition]);

    return (
        <>
            <BackgroundCarousel scrolled={scrolled} focusedApp={focusedApp} isExpanded={isFullscreen} />
            {children}
        </>
    )
}

export default BackgroundProvider