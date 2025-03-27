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

// Sample data structure
export const lockScreenImages: LockScreenImage[] = [
    {
        id: "1",
        background: "/lockscreen/lock1background.png",
        foreground: "/lockscreen/lock1foreground.png",
        timeDisplay: {
            position: "right-center",
            layout: "stacked",
            color: "white",
            opacity: 0.4
        }
    },
    {
        id: "2",
        background: "/lockscreen/lock2background.png",
        timeDisplay: {
            margin: {
              top: 10  
            },
            position: "center",
            layout: "horizontal",
            color: "rgba(8, 8, 8, 0.4)",
        }
    },
    {
        id: "3",
        background: "/lockscreen/lock3background.png",
        foreground: "/lockscreen/lock3foreground.png",
        timeDisplay: {
            position: "left-center",
            layout: "horizontal",
            color: "rgba(8, 8, 8, 0.4)",
            margin: {
                left: -7
            }
        }
    },
    {
        id: "4",
        background: "/lockscreen/lock4background.png",
        foreground: "/lockscreen/lock4foreground.png", // Example with foreground element
        timeDisplay: {
            position: "top-center",
            layout: "horizontal",
            color: "rgba(255, 255, 255, 0.4)",
            margin: {
                top: -15
  
            }
        }
    },
    {
        id: "5",
        background: "/lockscreen/lock5background.png",
        foreground: "/lockscreen/lock5foreground.png",
        timeDisplay: {
            position: "top-center",
            layout: "horizontal",
            color: "rgba(255, 255, 255, 0.4)",
        }
    },
    {
        id: "6",
        background: "/lockscreen/lock6background.png",
        foreground: "/lockscreen/lock6foreground.png",
        timeDisplay: {
            position: "top-center",
            layout: "horizontal",
            color: "rgba(255, 255, 255, 0.4)",
        }
    },
    {
        id: "7",
        background: "/lockscreen/lock7background.png",
        foreground: "/lockscreen/lock7foreground.png",
        timeDisplay: {
            position: "top-center",
            layout: "horizontal",
            color: "rgba(8, 8, 8, 0.4)",
        }
    },
    {
        id: "8",
        background: "/lockscreen/lock8background.png",
        foreground: "/lockscreen/lock8foreground.png",
        timeDisplay: {
            position: "top-right",
            layout: "horizontal",
            color: "rgba(8, 8, 8, 0.4)",
        }
    },
    {
        id: "9",
        background: "/lockscreen/lock9background.png",
        timeDisplay: {
            position: "center",
            layout: "horizontal",
            color: "rgba(255, 255, 255, 0.4)",
        }
    }
];

// types/lockscreen.ts
export interface LockScreenImage {
    id: string;
    background: string;   // URL to background image
    foreground?: string;  // Optional URL to foreground image (for layering effects)
    title?: string;       // Optional title or description of the image
    category?: string;    // Optional category for grouping (Nature, Cities, Animals, etc.)
    timeDisplay?: {       // Optional time display settings specific to this image
        position?: TimePosition;
        layout?: TimeLayout;  // Horizontal or stacked
        size?: number;
        color?: string;
        opacity?: number;
        margin?: TimeMargin;  // Fine-tune positioning with margins
    };
}

// Time positioning options
export type TimePosition =
    'center' |
    'top-center' |
    'bottom-center' |
    'left-center' |
    'right-center' |
    'top-left' |
    'top-right' |
    'bottom-left' |
    'bottom-right';

// Time format options
export type TimeFormat = '12h' | '24h';

// Time layout options
export type TimeLayout = 'horizontal' | 'stacked';

// Time margin adjustments (percentage values)
export interface TimeMargin {
    top?: number;    // % from top
    bottom?: number; // % from bottom
    left?: number;   // % from left
    right?: number;  // % from right
}

// Configuration options for the lock screen slideshow
export interface LockScreenConfig {
    slideDuration: number;    // How long each slide is shown (in ms)
    fadeDuration: number;     // Duration of crossfade effect (in ms)
    timeFormat: TimeFormat;   // Time format to display (12h or 24h)
    timePosition: TimePosition; // Position of the time on screen
    timeLayout: TimeLayout;   // Horizontal (01:30) or stacked (01 above 30)
    timeSize: number;         // Size multiplier for the time (1 = default, 2 = double)
    timeOpacity: number;      // Opacity for the time (0-1)
    timeColor: string;        // Color for the time display
    timeMargin?: TimeMargin;  // Default margin adjustments
    randomize: boolean;       // Whether to randomize the slideshow order
}

// Default configuration
export const defaultLockScreenConfig: LockScreenConfig = {
    slideDuration: 30000,     // 30 seconds per slide
    fadeDuration: 1500,       // 1.5 second crossfade
    timeFormat: '12h',
    timePosition: 'center',
    timeLayout: 'horizontal',
    timeSize: 1.5,            // 1.5x default size
    timeOpacity: 0.8,
    timeColor: 'rgba(255, 255, 255, 0.9)',
    timeMargin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    randomize: true
};

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