export interface AppItemType {
    appIconUrl: string;
    appName: string;
    href: string;
    splash?: {
        background: string;
        foreground: string;
    }
    hasSplashScreen?: boolean;
    shouldShowAppName: boolean;
    // backgrounds?: {
    //     background: string
    //     foreground: React.ReactNode
    //     position: "center" | "top-left" | "left-center"
    // }[];
    backgrounds?: string[]
    description?: string
}

export const ALERT_DIALOG_ID = "tvos-dialog";

export const apps = [
    {
        appIconUrl: "/apps/apple-tv.svg",
        appName: "Apple TV",
        href: "/apple-tv",
        shouldShowAppName: false,
        hasSplashScreen: true,
        splash: {
            background: "/app-bg/apple-tv/splash-bg.png",
            foreground: "/app-bg/apple-tv/splash-fg.svg",
        },
        backgrounds: [
            "/temp1.jpg",
            "/temp2.jpg",
        ]
    },
    {
        appIconUrl: "/apps/apple-podcast.svg",
        appName: "Apple Podcast",
        href: "/apple-podcast",
        shouldShowAppName: false,
        hasSplashScreen: true,
        splash: {
            background: "/app-bg/podcast/splash-bg.png",
            foreground: "/app-bg/podcast/splash-fg.svg",
        },
        backgrounds: [
            "/app-bg/apple-tv/1.png",
            "/app-bg/apple-tv/2.png",
        ]
    },
    {
        appIconUrl: "/apps/arcade.svg",
        appName: "Arcade",
        href: "/arcade",
        shouldShowAppName: false,
        hasSplashScreen: true,
        splash: {
            background: "/app-bg/arcade/splash-bg.png",
            foreground: "/app-bg/arcade/splash-fg.svg",
        },
    },
    {
        appIconUrl: "/apps/fitness.svg",
        appName: "Fitness",
        href: "/fitness",
        shouldShowAppName: false,
        hasSplashScreen: false,
        backgrounds: [
            "/app-bg/fitness/1.png",
            "/app-bg/fitness/2.png",
            "/app-bg/fitness/3.png",
            "/app-bg/fitness/4.png",
            "/app-bg/fitness/5.png",
        ]
    },
    {
        appIconUrl: "/apps/photos.svg",
        appName: "Photos",
        href: "/photos",
        hasSplashScreen: true,
        splash: {
            background: "/app-bg/photos/splash-bg.png",
            foreground: "/app-bg/photos/splash-fg.svg",
        },
        shouldShowAppName: false,
        backgrounds: [
            "/app-bg/photos/1.png",
            "/app-bg/photos/2.png",
            "/app-bg/photos/3.png",
            "/app-bg/photos/4.png",
            "/app-bg/photos/5.png",
            "/app-bg/photos/6.png",
        ]
    },
    {
        appIconUrl: "/apps/app-store.svg",
        appName: "App Store",
        href: "/app-store",
        hasSplashScreen: true,
        splash: {
            background: "/app-bg/store/splash-bg.png",
            foreground: "/app-bg/store/splash-fg.svg",
        },
        shouldShowAppName: false,
    },
    {
        appIconUrl: "/apps/netflix.svg",
        appName: "Netflix",
        href: "/netflix",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            "/temp1.jpg",
            "/temp2.jpg",
        ]
    },
    {
        appIconUrl: "/apps/youtube.svg",
        appName: "Youtube",
        href: "/youtube",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            "/temp1.jpg",
            "/temp2.jpg",
        ]
    },
    {
        appIconUrl: "/apps/hulu.svg",
        appName: "Hulu",
        href: "/hulu",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            "/temp1.jpg",
            "/temp2.jpg",
        ]
    },
    {
        appIconUrl: "/apps/cbs.svg",
        appName: "CBS",
        href: "/cbs",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            "/temp1.jpg",
            "/temp2.jpg",
        ]
    },
    {
        appIconUrl: "/apps/espn.svg",
        appName: "ESPN",
        href: "/espn",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            "/temp1.jpg",
            "/temp2.jpg",
        ]
    },
    {
        appIconUrl: "/apps/facetime.svg",
        appName: "Facetime",
        href: "/facetime",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            "/temp1.jpg",
            "/temp2.jpg",
        ]
    },
    {
        appIconUrl: "/apps/showmax.svg",
        appName: "ShowMax",
        href: "/showmax",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            "/temp1.jpg",
            "/temp2.jpg",
        ]
    },
    {
        appIconUrl: "/apps/settings.svg",
        appName: "Settings",
        href: "/settings",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            "/temp1.jpg",
            "/temp2.jpg",
        ]
    },
    {
        appIconUrl: "/apps/movies-itune.svg",
        appName: "Movies Itune",
        href: "/moview-itune",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            "/temp1.jpg",
            "/temp2.jpg",
        ]
    },
    {
        appIconUrl: "/apps/abc.svg",
        appName: "ABC",
        href: "/abc",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            "/temp1.jpg",
            "/temp2.jpg",
        ]
    },
    {
        appIconUrl: "/apps/fox-sports.svg",
        appName: "Fox Sports",
        href: "/fox-sports",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            "/temp1.jpg",
            "/temp2.jpg",
        ]
    },
    {
        appIconUrl: "/apps/apple-music.svg",
        appName: "Apple Music",
        href: "/apple-music",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            "/temp1.jpg",
            "/temp2.jpg",
        ]
    },
]