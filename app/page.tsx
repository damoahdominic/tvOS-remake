"use client"

import { useState, useEffect } from "react"
import { apps } from "@/data"
import ActivityBar from "@/components/activity-bar"
import TVOSGrid from "@/components/TVOSGrid"
import useGridNavigation from "@/hooks/useGridNavigation"
import BackgroundCarousel from "@/components/BackgroundCarousel"

// Simple focus position debugger component
function FocusDebugger({ position }: { position: { row: number; col: number } }) {
    if (process.env.NODE_ENV !== 'development') return null;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '10px',
                left: '10px',
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                zIndex: 1000,
                fontFamily: 'monospace',
                fontSize: '12px',
            }}
        >
            <div>Row: {position.row}</div>
            <div>Col: {position.col}</div>
        </div>
    );
}

export default function Home() {
    const [scrolled, setScrolled] = useState(false)

    // Direct grid navigation - no activity bar integration for simplicity
    const { isFocused, getFocusRef, focusedPosition } = useGridNavigation(3, 6, 0, 0);
    const [focusedApp, setFocusedApp] = useState(apps[0]);

    // Handle scroll events with debounce
    useEffect(() => {
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
        if (focusedPosition.row === 1) {
            setFocusedApp(apps[focusedPosition.col - 1]);
        }
    }, [focusedPosition]);


    return (
        <div className="relative min-h-screen overflow-hidden">
            <BackgroundCarousel scrolled={scrolled} focusedApp={focusedApp} />

            {/* Activity Bar Component */}
            <ActivityBar />

            {/* TVOSGrid with direct grid navigation for simplicity */}
            <TVOSGrid
                apps={apps}
                rowCount={3}
                colCount={6}
                scrolled={scrolled}
                isFocused={isFocused}
                getFocusRef={getFocusRef}
            />

            {/* Debug focus position */}
            <FocusDebugger position={focusedPosition} />
        </div>
    )
}