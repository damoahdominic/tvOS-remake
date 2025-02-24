import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { ViewTransitions } from 'next-view-transitions'

// Font files can be colocated inside of `pages`
const sfPro = localFont({ src: './SF-Pro.ttf' })

export const metadata: Metadata = {
  title: "Apple tvOS",
  description: "The Best Apple tvOS Remake",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${sfPro.className} antialiased`}
        >
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
