import Image from "next/image";

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
    backgrounds?: {
        image: string
        content?: React.ReactNode
    }[]
}

export const lockScreenImages: LockScreenImage[] = [
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
            font: "font-compact"
        }
    },
    {
        id: "3",
        background: "/lockscreen/lock3background.png",
        foreground: "/lockscreen/lock3foreground.png",
        timeDisplay: {
            position: "left-center",
            layout: "horizontal",
            color: "rgba(8, 8, 8, 0.5)",
            margin: {
                left: -13
            },
            font: "font-compact"
        }
    },
    {
        id: "4",
        background: "/lockscreen/lock4background.png",
        foreground: "/lockscreen/lock4foreground.png", // Example with foreground element
        timeDisplay: {
            position: "top-center",
            layout: "horizontal",
            color: "rgba(255, 255, 255, 0.9)",
            margin: {
                top: -15

            },
            font: "font-compact"
        }
    },
    {
        id: "5",
        background: "/lockscreen/lock5background.png",
        foreground: "/lockscreen/lock5foreground.png",
        timeDisplay: {
            position: "top-center",
            layout: "horizontal",
            color: "rgba(255, 255, 255, 0.5)",
            margin: {
                top: -10
            },
            font: "font-new-york"
        }
    },
    {
        id: "6",
        background: "/lockscreen/lock6background.png",
        foreground: "/lockscreen/lock6foreground.png",
        timeDisplay: {
            position: "top-center",
            layout: "horizontal",
            color: "rgba(255, 255, 255, 0.5)",
            margin: {
                top: -10
            },
            font: "font-new-york"
        }
    },
    {
        id: "7",
        background: "/lockscreen/lock7background.png",
        foreground: "/lockscreen/lock7foreground.png",
        timeDisplay: {
            position: "top-center",
            layout: "horizontal",
            color: "rgba(8, 8, 8, 0.5)",
            margin: {
                top: -20
            },
            font: "font-new-york"
        }
    },
    {
        id: "8",
        background: "/lockscreen/lock8background.png",
        foreground: "/lockscreen/lock8foreground.png",
        timeDisplay: {
            position: "top-right",
            layout: "horizontal",
            color: "rgba(8, 8, 8, 0.5)",
            font: "font-new-york"
        }
    },
    {
        id: "9",
        background: "/lockscreen/lock9background.png",
        timeDisplay: {
            position: "center",
            layout: "horizontal",
            color: "rgba(255, 255, 255, 0.5)",
            font: "font-new-york"
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
    timeDisplay: {       // Optional time display settings specific to this image
        position?: TimePosition;
        layout?: TimeLayout;  // Horizontal or stacked
        size?: number;
        color?: string;
        opacity?: number;
        margin?: TimeMargin;  // Fine-tune positioning with margins
        font: string
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
    timeColor: 'rgba(255, 255, 255, 0.5)',
    timeMargin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    randomize: true
};

export const ALERT_DIALOG_ID = "tvos-dialog";

export const apps: AppItemType[] = [
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
            {
                image: "/app-bg/apple-tv/1.png",
                content: <div className="relative px-10 top-[7%] left-[3%]">
                    <Image src={"/apps/foreground/severance.svg"} width={368} height={61} alt={"severance"} />
                </div>
            },
            {
                image: "/app-bg/apple-tv/2.png",
                content: <div className="relative px-10 size-full flex items-center justify-center">
                    <Image src={"/apps/foreground/apple-tv.svg"} className="absolute top-[3%] left-[4%]" width={200} height={61} alt={"severance"} />
                    <div className="size-full flex items-center justify-center">
                        <Image src={"/apps/foreground/dom-n-larry.svg"} className="pb-20" width={400} height={61} alt={"severance"} />
                    </div>
                </div>
            }
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
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
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
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ]
    },
    {
        appIconUrl: "/apps/fitness.svg",
        appName: "Fitness",
        href: "/fitness",
        shouldShowAppName: false,
        hasSplashScreen: false,
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative top-[2%] gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <Image src={"/apps/foreground/fitness.svg"} width={168} height={61} alt={"fitness"} />
                    <p className="text-7xl">Fitness for all.<br />Fitness for you.</p>
                </div>
            },
            {
                image: "/app-bg/fitness/2.png",
                content: <div className="relative top-[5%] gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <Image src={"/apps/foreground/fitness.svg"} width={168} height={61} alt={"fitness"} />
                    <p className="text-7xl">Yoga with Tim</p>
                </div>
            },
            {
                image: "/app-bg/fitness/3.png",
                content: <div className="relative top-[5%] gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <Image src={"/apps/foreground/fitness.svg"} width={168} height={61} alt={"fitness"} />
                    <p className="text-6xl">Fitness for all.<br />Fitness for you.</p>
                </div>
            },
            {
                image: "/app-bg/fitness/4.png",
                content: <div className="relative left-[3%] h-full flex-col gap-3 flex justify-center font-semibold text-white">
                    <Image src={"/apps/foreground/fitness.svg"} width={168} height={61} alt={"fitness"} />
                    <p className="text-6xl">Make your move</p>
                </div>
            },
            {
                image: "/app-bg/fitness/5.png",
                content: <div className="absolute top-[5%] left-[3%]">
                    <Image src={"/apps/foreground/fitness.svg"} width={268} height={61} alt={"fitness"} />
                </div>
            },
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
            {
                image: "/app-bg/photos/1.png",
                content: <div className="relative px-10 top-[5%] gap-3 font-semibold text-white">
                    <h2 className="text-4xl">Trip to the Hamptons</h2>
                    <p className="text-xl">August 2022</p>
                </div>
            },
            {
                image: "/app-bg/photos/2.png",
                content: <div className="relative px-10 top-[5%] gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <h2 className="text-4xl">Trip to the Hamptons</h2>
                    <p className="text-xl">March 2024</p>
                </div>
            },
            {
                image: "/app-bg/photos/3.png",
                content: <div className="relative px-10 h-full flex-col gap-3 flex justify-center font-semibold text-white">
                    <h2 className="text-4xl">Trip to the Hamptons</h2>
                    <p className="text-xl">March 2024</p>
                </div>
            },
            {
                image: "/app-bg/photos/4.png",
                content: <div className="relative px-10 top-[5%] gap-3 font-semibold text-white">
                    <h2 className="text-4xl">Weekend Trip</h2>
                    <p className="text-xl">Trip to the Hamptons</p>
                </div>
            },
            {
                image: "/app-bg/photos/5.png",
                content: <div className="relative px-10 top-[5%] gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <h2 className="text-4xl">Landscape Shots</h2>
                    <p className="text-xl">July 2023</p>
                </div>
            },
            {
                image: "/app-bg/photos/6.png",
                content: <div className="relative px-10 h-full flex-col gap-3 flex justify-center font-semibold text-white">
                    <h2 className="text-4xl">Accra Ghana</h2>
                    <p className="text-xl">December 2024</p>
                </div>
            },
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
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ],
        shouldShowAppName: false,
    },
    {
        appIconUrl: "/apps/netflix.svg",
        appName: "Netflix",
        href: "/netflix",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ]
    },
    {
        appIconUrl: "/apps/youtube.svg",
        appName: "Youtube",
        href: "/youtube",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ]
    },
    {
        appIconUrl: "/apps/hulu.svg",
        appName: "Hulu",
        href: "/hulu",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ]
    },
    {
        appIconUrl: "/apps/cbs.svg",
        appName: "CBS",
        href: "/cbs",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ]
    },
    {
        appIconUrl: "/apps/espn.svg",
        appName: "ESPN",
        href: "/espn",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ]
    },
    {
        appIconUrl: "/apps/facetime.svg",
        appName: "Facetime",
        href: "/facetime",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ]
    },
    {
        appIconUrl: "/apps/showmax.svg",
        appName: "ShowMax",
        href: "/showmax",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ]
    },
    {
        appIconUrl: "/apps/settings.svg",
        appName: "Settings",
        href: "/settings",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ]
    },
    {
        appIconUrl: "/apps/movies-itune.svg",
        appName: "Movies Itune",
        href: "/moview-itune",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ]
    },
    {
        appIconUrl: "/apps/abc.svg",
        appName: "ABC",
        href: "/abc",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ]
    },
    {
        appIconUrl: "/apps/fox-sports.svg",
        appName: "Fox Sports",
        href: "/fox-sports",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ]
    },
    {
        appIconUrl: "/apps/apple-music.svg",
        appName: "Apple Music",
        href: "/apple-music",
        hasSplashScreen: false,
        shouldShowAppName: true,
        backgrounds: [
            {
                image: "/app-bg/fitness/1.png",
                content: <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
                    <p className="text-4xl">Play 200+ Games. No in-App Purchases. No Ads.</p>
                </div>
            },
        ]
    },
]
