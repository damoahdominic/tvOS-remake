"use client"
import { createContext, useContext, useEffect, ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from 'next-view-transitions'
import BootSequence from "@/components/boot-sequence";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { AnimatePresence } from "framer-motion";
import { AppItemType } from "@/data";

interface AppContextType {
    isLoaded: boolean;
    loadingProgress: number;
    isFullscreen: boolean;
    setIsFullscreen: (isFullscreen: boolean) => void;
}

const AppContext = createContext<AppContextType>({
    isLoaded: false,
    loadingProgress: 0,
    isFullscreen: false,
    setIsFullscreen: () => {},
});

export function AppProvider({
    children,
    appData
}: {
    children: ReactNode;
    appData: AppItemType[];
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [minBootTimeElapsed, setMinBootTimeElapsed] = useState(false);
    const preloaderStatus = useImagePreloader(appData, 6); // Preload first 6 apps
    const [isFullscreen, setIsFullscreen] = useState(false);

    const pathname = usePathname();
    const router = useTransitionRouter();

    // Minimum boot time effect - ensures boot screen shows for at least 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setMinBootTimeElapsed(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    // Set app as loaded when both conditions are met:
    // 1. Minimum boot time has elapsed
    // 2. Images are preloaded
    useEffect(() => {
        if (minBootTimeElapsed && preloaderStatus.isComplete) {
            setIsLoaded(true);
        }
    }, [minBootTimeElapsed, preloaderStatus.isComplete]);

    // User interaction handling
    useEffect(() => {
        // Disable mouse movement
        const preventMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
        };
        document.addEventListener("mousemove", preventMouseMove);

        // Handle keyboard navigation
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    console.log("Escape");
                    if (pathname !== "/" && pathname !== "/settings") {
                        router.back();
                    }
                    break;
                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousemove", preventMouseMove);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [router, pathname]);

    return (
        <AppContext.Provider value={{
            isLoaded,
            isFullscreen,
            setIsFullscreen,
            loadingProgress: preloaderStatus.progress
        }}>
            <AnimatePresence>
                {!isLoaded && (
                    <BootSequence
                        progress={preloaderStatus.progress}
                    />
                )}
            </AnimatePresence>

            <div className={`${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
                {children}
            </div>
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}