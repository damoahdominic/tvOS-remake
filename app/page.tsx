"use client"

import { useState, useEffect } from "react"
import { apps } from "@/data"
import ActivityBar from "@/components/activity-bar"
import TVOSGrid from "@/components/TVOSGrid"
import useGridNavigation from "@/hooks/useGridNavigation"
import BackgroundCarousel from "@/components/BackgroundCarousel"
import { ModeToggle } from "@/components/mode-toggle"

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
    const [isExpanded, setIsExpanded] = useState(false);


    // Direct grid navigation - no activity bar integration for simplicity
    const { isFocused, getFocusRef, focusedPosition } = useGridNavigation(3, 6, 0, 0);
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

    // User interaction handling
    useEffect(() => {
        // Handle keyboard navigation
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    console.log("Escape");
                    if (isExpanded) {
                        toggleExpansion();
                    }
                    break;
                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (focusedPosition.row === 1) {
            setFocusedApp(apps[focusedPosition.col - 1]);
        }
    }, [focusedPosition]);


    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <BackgroundCarousel scrolled={scrolled} focusedApp={focusedApp} isExpanded={isExpanded} />

            {/* Activity Bar Component */}
            <ActivityBar isExpanded={isExpanded} />


            {/* TVOSGrid with direct grid navigation for simplicity */}
            <TVOSGrid
                apps={apps}
                rowCount={3}
                toggleExpansion={toggleExpansion}
                colCount={6}
                isExpanded={isExpanded}
                scrolled={scrolled}
                isFocused={isFocused}
                getFocusRef={getFocusRef}
            />



            <ModeToggle />
            {/* Debug focus position */}
            <FocusDebugger position={focusedPosition} />
        </div>
    )
}