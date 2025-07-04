"use client";
import Image from "next/image";
// import { motion } from "framer-motion";
export interface AppItemType {
  appIconUrl: string;
  appName: string;
  href: string;
  splash?: {
    background: string;
    foreground: string;
  };
  hasSplashScreen?: boolean;
  shouldShowAppName: boolean;
  backgrounds?: {
    image: string;
    content?: React.ReactNode;
  }[];
}

export const lockScreenImages: LockScreenImage[] = [
  {
    id: "2",
    background: "/lockscreen/lock2background.png",
    foreground: "/lockscreen/lock2foreground.png",
    timeDisplay: {
      position: "left-center",
      layout: "horizontal",
      color: "rgba(8, 8, 8, 0.5)",
      margin: {
        left: -13,
      },
      font: "font-compact",
    },
  },
  {
    id: "5",
    background: "/lockscreen/lock5background.png",
    timeDisplay: {
      position: "center",
      layout: "horizontal",
      color: "rgba(255, 255, 255, 0.5)",
      font: "font-new-york",
    },
  },
];

// types/lockscreen.ts
export interface LockScreenImage {
  id: string;
  background: string; // URL to background image
  foreground?: string; // Optional URL to foreground image (for layering effects)
  title?: string; // Optional title or description of the image
  category?: string; // Optional category for grouping (Nature, Cities, Animals, etc.)
  timeDisplay: {
    // Optional time display settings specific to this image
    position?: TimePosition;
    layout?: TimeLayout; // Horizontal or stacked
    size?: number;
    color?: string;
    opacity?: number;
    margin?: TimeMargin; // Fine-tune positioning with margins
    font: string;
  };
}

// Time positioning options
export type TimePosition =
  | "center"
  | "top-center"
  | "bottom-center"
  | "left-center"
  | "right-center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

// Time format options
export type TimeFormat = "12h" | "24h";

// Time layout options
export type TimeLayout = "horizontal" | "stacked";

// Time margin adjustments (percentage values)
export interface TimeMargin {
  top?: number; // % from top
  bottom?: number; // % from bottom
  left?: number; // % from left
  right?: number; // % from right
}

// Configuration options for the lock screen slideshow
export interface LockScreenConfig {
  slideDuration: number; // How long each slide is shown (in ms)
  fadeDuration: number; // Duration of crossfade effect (in ms)
  timeFormat: TimeFormat; // Time format to display (12h or 24h)
  timePosition: TimePosition; // Position of the time on screen
  timeLayout: TimeLayout; // Horizontal (01:30) or stacked (01 above 30)
  timeSize: number; // Size multiplier for the time (1 = default, 2 = double)
  timeOpacity: number; // Opacity for the time (0-1)
  timeColor: string; // Color for the time display
  timeMargin?: TimeMargin; // Default margin adjustments
  randomize: boolean; // Whether to randomize the slideshow order
}

// Default configuration
export const defaultLockScreenConfig: LockScreenConfig = {
  slideDuration: 30000, // 30 seconds per slide
  fadeDuration: 1500, // 1.5 second crossfade
  timeFormat: "12h",
  timePosition: "center",
  timeLayout: "horizontal",
  timeSize: 1.5, // 1.5x default size
  timeOpacity: 0.8,
  timeColor: "rgba(255, 255, 255, 0.5)",
  timeMargin: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  randomize: true,
};

export const ALERT_DIALOG_ID = "tvos-dialog";

// const titleTransition = { duration: 0.45, delay: 1 };
// const subtitleTransition = { duration: 0.45, delay: 1.35 };
// const animate = { opacity: 1, x: 0 };
// const initial = { opacity: 0, x: -20 };

export const apps: AppItemType[] = [
  {
    appIconUrl: "/apps/apple-tv.svg",
    appName: "Apple TV",
    href: "/apple-tv",
    shouldShowAppName: false,
    hasSplashScreen: true,
    splash: {
      background: "apple-tv-bg",
      // background: "/app-bg/apple-tv/splash-bg.png",
      foreground: "/app-bg/apple-tv/splash-fg.svg",
    },
    backgrounds: [
      // {
      //   image: "/app-bg/apple-tv/2.png",
      //   content: (
      //     <div className="relative px-10 size-full flex items-center justify-center">
      //       <Image
      //         src={"/apps/foreground/apple-tv.svg"}
      //         className="absolute top-[3%] left-[4%]"
      //         width={200}
      //         height={61}
      //         alt={"severance"}
      //       />
      //       <div className="size-full flex items-center justify-center">
      //         <Image
      //           src={"/dom_larry_new.svg"}
      //           className="pb-20"
      //           width={400}
      //           height={61}
      //           alt={"severance"}
      //         />
      //       </div>
      //     </div>
      //   ),
      // },
      {
        image: "/app-bg/apple-tv/3.png",
        content: null,
      },
    ],
  },
  {
    appIconUrl: "/d-card.svg",
    appName: "D Studios",
    href: "/team",
    shouldShowAppName: false,
    hasSplashScreen: true,
    splash: {
      background: "team-bg",
      // background: "/app-bg/d-studios/splash-bg.png",
      foreground: "/app-bg/d-studios/splash-fg.svg",
    },
    backgrounds: [
      {
        image: "/app-bg/d-studios/1.png",
        content: null,
      },
    ],
  },
  // {
  //   appIconUrl: "/apps/arcade.svg",
  //   appName: "Arcade",
  //   href: "/arcade",
  //   shouldShowAppName: false,
  //   hasSplashScreen: true,
  //   splash: {
  //     background: "/app-bg/arcade/splash-bg.png",
  //     foreground: "/app-bg/arcade/splash-fg.svg",
  //   },
  //   // backgrounds: [
  //   //   {
  //   //     image: "/app-bg/arcade/1.jpg",
  //   //   },
  //   // ],
  // },
  {
    appIconUrl: "/apps/settings.svg",
    appName: "Settings",
    href: "/settings",
    hasSplashScreen: true,
    splash: {
      background: "settings-bg",
      // background: "/app-bg/settings/splash-bg.png",
      foreground: "/app-bg/settings/splash-fg.svg",
    },
    shouldShowAppName: false,
  },
  {
    appIconUrl: "/apps/photos.svg",
    appName: "Photos",
    href: "/photos",
    hasSplashScreen: true,
    splash: {
      background: "photos-bg",
      // background: "/app-bg/photos/splash-bg.png",
      foreground: "/app-bg/photos/splash-fg.svg",
    },
    shouldShowAppName: false,
    // backgrounds: [
    //   {
    //     image: "/app-bg/photos/1.png",
    //     content: (
    //       <div className="relative px-10 top-[5%] gap-5 font-semibold text-white">
    //         <motion.h2 initial={initial} animate={animate} transition={titleTransition} exit={initial} className="text-4xl">Trip to the Hamptons</motion.h2>
    //         <motion.p initial={initial} animate={animate} transition={subtitleTransition} exit={initial} className="text-xl">August 2022</motion.p>
    //       </div>
    //     ),
    //   },
    //   {
    //     image: "/app-bg/photos/2.png",
    //     content: (
    //       <div className="relative px-10 top-[5%] gap-5 size-full flex-col flex items-center justify-center font-semibold text-white">
    //         <motion.h2 initial={initial} animate={animate} transition={titleTransition} exit={initial} className="text-4xl">Trip to the Hamptons</motion.h2>
    //         <motion.p initial={initial} animate={animate} transition={subtitleTransition} exit={initial} className="text-xl">March 2024</motion.p>
    //       </div>
    //     ),
    //   },
    //   {
    //     image: "/app-bg/photos/3.png",
    //     content: (
    //       <div className="relative px-10 h-full flex-col gap-5 flex justify-center font-semibold text-white">
    //         <motion.h2 initial={initial} animate={animate} transition={titleTransition} exit={initial} className="text-4xl">Trip to the Hamptons</motion.h2>
    //         <motion.p initial={initial} animate={animate} transition={subtitleTransition} exit={initial} className="text-xl">March 2024</motion.p>
    //       </div>
    //     ),
    //   },
    //   {
    //     image: "/app-bg/photos/4.png",
    //     content: (
    //       <div className="relative px-10 top-[5%] gap-5 font-semibold text-white">
    //         <motion.h2 initial={initial} animate={animate} transition={titleTransition} exit={initial} className="text-4xl">Weekend Trip</motion.h2>
    //         <motion.p initial={initial} animate={animate} transition={subtitleTransition} exit={initial} className="text-xl">Trip to the Hamptons</motion.p>
    //       </div>
    //     ),
    //   },
    //   {
    //     image: "/app-bg/photos/5.png",
    //     content: (
    //       <div className="relative px-10 top-[5%] gap-5 size-full flex-col flex items-center justify-center font-semibold text-white">
    //         <motion.h2 initial={initial} animate={animate} transition={titleTransition} exit={initial} className="text-4xl">Landscape Shots</motion.h2>
    //         <motion.p initial={initial} animate={animate} transition={subtitleTransition} exit={initial} className="text-xl">July 2023</motion.p>
    //       </div>
    //     ),
    //   },
    //   {
    //     image: "/app-bg/photos/6.png",
    //     content: (
    //       <div className="relative px-10 h-full flex-col gap-5 flex justify-center font-semibold text-white">
    //         <motion.h2 initial={initial} animate={animate} transition={titleTransition} exit={initial} className="text-4xl">Accra Ghana</motion.h2>
    //         <motion.p initial={initial} animate={animate} transition={subtitleTransition} exit={initial} className="text-xl">December 2024</motion.p>
    //       </div>
    //     ),
    //   },
    // ],
  },
  {
    appIconUrl: "/apps/apple-music.svg",
    appName: "Apple Music",
    href: "/apple-music",
    hasSplashScreen: true,
    splash: {
      // background: "/app-bg/apple-music/splash-bg.png",
      background: "apple-music-bg",
      foreground: "/app-bg/apple-music/splash-fg.svg",
    },
    shouldShowAppName: false,
  },
  {
    appIconUrl: "/apps/app-store.svg",
    appName: "App Store",
    href: "/app-store",
    hasSplashScreen: true,
    splash: {
      background: "app-store-bg",
      // background: "/app-bg/store/splash-bg.png",
      foreground: "/app-bg/store/splash-fg.svg",
    },
    // backgrounds: [
    //   {
    //     image: "/app-bg/fitness/1.png",
    //     content: (
    //       <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
    //         <p className="text-4xl">
    //           Play 200+ Games. No in-App Purchases. No Ads.
    //         </p>
    //       </div>
    //     ),
    //   },
    // ],
    shouldShowAppName: false,
  },

  {
    appIconUrl: "/apps/apple-podcast.svg",
    appName: "Apple Podcast",
    href: "/apple-podcast",
    shouldShowAppName: true,
    hasSplashScreen: true,
    splash: {
      background: "/app-bg/podcast/splash-bg.png",
      foreground: "/app-bg/podcast/splash-fg.svg",
    },
    backgrounds: [
      {
        image: "/app-bg/podcast/main-bg.png",
        content: (
          <div className="relative px-10 flex gap-8 size-full items-center justify-center font-semibold text-white overflow-hidden">
            <div className="">
              <p className="text-4xl">Continue Listening</p>
              <div className="flex mt-4 gap-8">
                <Image
                  src="/app-bg/podcast/cover-imgs/Track1.png"
                  className="pb-20"
                  width={300}
                  height={61}
                  alt="track"
                />
                <Image
                  src="/app-bg/podcast/cover-imgs/Track7.png"
                  className="pb-20"
                  width={300}
                  height={61}
                  alt="track"
                />
              </div>
            </div>

            <div className="">
              <p className="text-4xl">Recently Added</p>
              <div className="flex mt-4 gap-8">
                <Image
                  src="/app-bg/podcast/cover-imgs/Track6.png"
                  className="pb-20"
                  width={300}
                  height={61}
                  alt="track"
                />
                <Image
                  src="/app-bg/podcast/cover-imgs/Track6.png"
                  className="pb-20"
                  width={300}
                  height={61}
                  alt="track"
                />
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    appIconUrl: "/apps/fitness.svg",
    appName: "Fitness",
    href: "/fitness",
    shouldShowAppName: true,
    hasSplashScreen: false,
    backgrounds: [
      {
        image: "/app-bg/fitness/1.png",
        content: (
          <div className="relative top-[2%] gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
            <Image
              src={"/apps/foreground/fitness.svg"}
              width={168}
              height={61}
              alt={"fitness"}
            />
            <p className="text-7xl">
              Fitness for all.
              <br />
              Fitness for you.
            </p>
          </div>
        ),
      },
      {
        image: "/app-bg/fitness/2.png",
        content: (
          <div className="relative top-[5%] gap-5 size-full flex-col flex items-center justify-center font-semibold text-white">
            <Image
              src={"/apps/foreground/fitness.svg"}
              width={168}
              height={61}
              alt={"fitness"}
            />
            <p className="text-7xl">Yoga with Tim</p>
          </div>
        ),
      },
      {
        image: "/app-bg/fitness/3.png",
        content: (
          <div className="relative top-[5%] gap-5 size-full flex-col flex items-center justify-center font-semibold text-white">
            <Image
              src={"/apps/foreground/fitness.svg"}
              width={168}
              height={61}
              alt={"fitness"}
            />
            <p className="text-6xl">
              Fitness for all.
              <br />
              Fitness for you.
            </p>
          </div>
        ),
      },
      {
        image: "/app-bg/fitness/4.png",
        content: (
          <div className="relative left-[3%] h-full flex-col gap-3 flex justify-center font-semibold text-white">
            <Image
              src={"/apps/foreground/fitness.svg"}
              width={168}
              height={61}
              alt={"fitness"}
            />
            <p className="text-6xl">Make your move</p>
          </div>
        ),
      },
      {
        image: "/app-bg/fitness/5.png",
        content: (
          <div className="absolute top-[5%] left-[3%]">
            <Image
              src={"/apps/foreground/fitness.svg"}
              width={268}
              height={61}
              alt={"fitness"}
            />
          </div>
        ),
      },
    ],
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
        content: (
          <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
            <p className="text-4xl">
              Play 200+ Games. No in-App Purchases. No Ads.
            </p>
          </div>
        ),
      },
    ],
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
        content: (
          <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
            <p className="text-4xl">
              Play 200+ Games. No in-App Purchases. No Ads.
            </p>
          </div>
        ),
      },
    ],
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
        content: (
          <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
            <p className="text-4xl">
              Play 200+ Games. No in-App Purchases. No Ads.
            </p>
          </div>
        ),
      },
    ],
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
        content: (
          <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
            <p className="text-4xl">
              Play 200+ Games. No in-App Purchases. No Ads.
            </p>
          </div>
        ),
      },
    ],
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
        content: (
          <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
            <p className="text-4xl">
              Play 200+ Games. No in-App Purchases. No Ads.
            </p>
          </div>
        ),
      },
    ],
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
        content: (
          <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
            <p className="text-4xl">
              Play 200+ Games. No in-App Purchases. No Ads.
            </p>
          </div>
        ),
      },
    ],
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
        content: (
          <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
            <p className="text-4xl">
              Play 200+ Games. No in-App Purchases. No Ads.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    appIconUrl: "/apps/movies-itune.svg",
    appName: "Movies Itune",
    href: "/movies-itune",
    hasSplashScreen: false,
    shouldShowAppName: true,
    backgrounds: [
      {
        image: "/app-bg/fitness/1.png",
        content: (
          <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
            <p className="text-4xl">
              Play 200+ Games. No in-App Purchases. No Ads.
            </p>
          </div>
        ),
      },
    ],
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
        content: (
          <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
            <p className="text-4xl">
              Play 200+ Games. No in-App Purchases. No Ads.
            </p>
          </div>
        ),
      },
    ],
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
        content: (
          <div className="relative px-10 bg-black  gap-3 size-full flex-col flex items-center justify-center font-semibold text-white">
            <p className="text-4xl">
              Play 200+ Games. No in-App Purchases. No Ads.
            </p>
          </div>
        ),
      },
    ],
  },
];
