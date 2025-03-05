"use client"

import { useState, useEffect } from "react"
import { apps } from "@/data"
import ActivityBar from "@/components/activity-bar"
import TVOSGrid from "@/components/TVOSGrid"
import useEnhancedNavigation from "@/hooks/useEnhancedNavigation"


export default function Home() {
    const [scrolled, setScrolled] = useState(false)
    const rowCount = 3;
    const colCount = 6;
    const activityItemCount = 4; // 3 tabs + profile button

    // Use enhanced navigation hook
    const {
        isFocused,
        getFocusRef,
        navigateToGrid,
        focusedPosition
    } = useEnhancedNavigation(
        rowCount,
        colCount,
        activityItemCount
    );

    // Debug: log the current focused position
    useEffect(() => {
        console.log('Focus position:', focusedPosition);
    }, [focusedPosition]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <div
                className={`fixed inset-0 transition-all duration-500 ${scrolled ? "blur-xl" : ""}`}
                style={{
                    backgroundImage: `url(${"/os-bg.jpg"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Activity Bar Component */}
            <ActivityBar
                getFocusRef={(index) => getFocusRef(0, index, 'activityBar')}
                isFocused={(index) => isFocused(0, index, 'activityBar')}
                onNavigateToGrid={navigateToGrid}
            />

            <TVOSGrid
                apps={apps}
                rowCount={3}
                colCount={6}
                scrolled={scrolled}
                isFocused={(row, col) => isFocused(row, col, 'grid')}
                getFocusRef={(row, col) => getFocusRef(row, col, 'grid')}
            />
        </div>
    )
}

