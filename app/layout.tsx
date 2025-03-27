import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/providers/theme-provider";
import { AppProvider } from "@/providers/app-provider";
import { DialogProvider } from "@/providers/dialog-provider";
import { apps, LockScreenConfig, lockScreenImages, TimeLayout, TimePosition } from "@/data";
import { AppContextMenuProvider } from "@/providers/context-menu-provider";
import { GridNavigationProvider } from "@/providers/grid-navigation-provider";
import { LockScreenProvider } from "@/providers/lock-screen-provider";

// LockScreen configuration
const lockScreenConfig: LockScreenConfig = {
  slideDuration: 20000,     // 20 seconds per slide
  fadeDuration: 1200,       // 1.2 second crossfade
  timeFormat: '12h',
  timePosition: 'center' as TimePosition,
  timeLayout: 'horizontal' as TimeLayout,
  timeSize: 1.5,
  timeOpacity: 0.9,
  timeColor: 'rgba(255, 255, 255, 0.9)',
  randomize: true
};

export const metadata: Metadata = {
  title: "Apple tvOS",
  description: "The Best Apple tvOS Remake",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ViewTransitions>
        <body className={`antialiased`}>
          <main className="relative min-h-screen overflow-hidden">
            <AppProvider appData={apps}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <DialogProvider>
                  <AppContextMenuProvider>
                    <LockScreenProvider
                      images={lockScreenImages}
                      config={lockScreenConfig}
                      autoLockAfter={300000} // Auto-lock after 5 minutes of inactivity
                      initialLocked={true}   // Start with lock screen shown
                    >
                      <GridNavigationProvider>{children}</GridNavigationProvider>
                    </LockScreenProvider>
                  </AppContextMenuProvider>
                </DialogProvider>
              </ThemeProvider>
            </AppProvider>
          </main>
        </body>
      </ViewTransitions>
    </html>
  );
}
