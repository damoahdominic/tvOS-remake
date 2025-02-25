"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from 'next-view-transitions'

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const pathname = usePathname()
    const router = useTransitionRouter()

    // Adds a keyboard shortcut to take you back to home.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault()
                if (pathname !== "/") {
                    router.back()
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [router, pathname])
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
