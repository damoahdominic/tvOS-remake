"use client"
import { createContext, useContext, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from 'next-view-transitions'

const AppContext = createContext({});

export function AppProvider({ children }: { children: ReactNode }) {

    const pathname = usePathname()
    const router = useTransitionRouter()

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
                case "ArrowUp":
                case "w":
                    console.log("Move Up");
                    break;
                case "ArrowDown":
                case "s":
                    console.log("Move Down");
                    break;
                case "ArrowLeft":
                case "a":
                    console.log("Move Left");
                    break;
                case "ArrowRight":
                case "d":
                    console.log("Move Right");
                    break;
                case "Enter":
                    console.log("Select");
                    break;
                case "Escape":
                    console.log("Escape");
                    if (pathname !== "/") {
                        router.back()
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
        <AppContext.Provider value={{ }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}