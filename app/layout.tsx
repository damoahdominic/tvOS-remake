import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { ViewTransitions } from 'next-view-transitions'
import { ThemeProvider } from "@/providers/theme-provider";
import { AppProvider } from "@/providers/app-provider";
import { DialogProvider } from "@/providers/dialog-provider";
import { apps } from "@/data"
import { AppContextMenuProvider } from "@/providers/context-menu-provider";


// Font files can be colocated inside of `pages`
const sfPro = localFont({ src: './SF-Pro.ttf' })

export const metadata: Metadata = {
  title: "Apple tvOS",
  description: "The Best Apple tvOS Remake",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <ViewTransitions>
        <body
          className={`${sfPro.className} antialiased`}
        >
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
                    {children}
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
