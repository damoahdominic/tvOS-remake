"use client"
import React, { useEffect, useState, forwardRef } from "react";
import { motion, MotionConfig, Transition, AnimatePresence } from "framer-motion";
import moment from "moment";
import Image from "next/image";
import { Plus } from "lucide-react";
import MusicPlayer from "./activity-bar-apps/music-player";
import AlertLarge from "./alerts/alert-large";
import { useLockScreen } from "@/providers/lock-screen-provider";
import Restrictions from "./activity-bar-apps/restrictions";
import Game from "./activity-bar-apps/game";
import Accessibility from "./activity-bar-apps/accessibility";
import AudioCast from "./activity-bar-apps/audio-cast";
import SleepTimer from "./activity-bar-apps/sleep-timer";
import { useAudio } from "@/providers/audio-provider";
import waveAnimation from "@/public/lottie/wave.json";
import waveLightAnimation from "@/public/lottie/wave-light.json";
import dynamic from "next/dynamic";
import { useTransitionRouter } from "next-view-transitions";
import { ActivityItemsWrapper } from "./activity-items-wrapper";
import Users from "./activity-bar-items/users";
import Settings from "./activity-bar-items/settings";
// import ParallaxWrapper from "./parallax-wrapper";
// import Lottie from "lottie-react";

const Lottie = dynamic(() => import("lottie-react"), {})

const transition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30
};


// Move Tabs definition and create a type

type Tab = {
  name: string;
  image: string | React.ReactNode;
  index: number;
};


export default function ActivityBar({
  getFocusRef,
  isExpanded,
  isFocused = () => false,
  onNavigateToGrid,
}: EnhancedActivityBarProps) {
  const [currentTab, setCurrentTab] = useState<ActivityTabs>("");
  const [time, setTime] = useState<Date>(new Date());
  const [onOpenModal, setOnOpenModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { lock } = useLockScreen();
  const { isPlaying } = useAudio();
  const router = useTransitionRouter();
  const [isReady, setIsReady] = useState(false);


  // Effect hook to run on component mount
  useEffect(() => {
    setIsReady(true); // Set the component as ready
    const interval = setInterval(() => {
      setTime(new Date()); // Update the time every second
    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Handle S key press in activity bar to return to grid
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "s" && onNavigateToGrid) {
        onNavigateToGrid();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onNavigateToGrid]);

  // Function to open the power off modal
  const handlePowerOff = () => {
    setOnOpenModal(true);
  };

  const gotoSettings = () => {
    router.push("/settings");
  }

  if (!isReady) return null


  const settingsActionMap: Record<string, () => void> = {
    handlePowerOff: handlePowerOff,
    gotoSettings: gotoSettings,
    setAudioCast: () => setCurrentTab("audio-cast"),
    setSleepTimer: () => setCurrentTab("sleep-timer"),
    setGame: () => setCurrentTab("game"),
    setAccessibility: () => setCurrentTab("accessibility"),
    setRestrictions: () => setCurrentTab("restrictions"),
  };


  const Tabs: Tab[] = [
    {
      name: "music",
      image: <div className="w-[40px]">
        <Lottie autoplay={false} animationData={waveAnimation} />
      </div>,
      index: 0,
    },
    {
      name: "switch",
      image: "switch.svg",
      index: 1,
    },
    // Profile is special, but we need it in the same list for navigation
    {
      name: "profile",
      image: "", // Will use user image instead
      index: 2,
    },
  ];
  // Determine if bar should be expanded
  const shouldShowExpanded = isHovered || isFocused(0) || isFocused(1) || isFocused(2);

  return (
    <MotionConfig transition={transition}>
      <motion.div
        variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 } }}
        initial="closed"
        animate={isExpanded ? "closed" : "open"}
        exit="closed"
        transition={{ delay: isExpanded ? 0 : 1 }}
        className="z-[100] position absolute top-10 right-5 flex flex-col items-end gap-2 text-[#1E1E1E]/85 dark:text-white/50"
      >

        <motion.div
          className="bg-white/50 dark:bg-[#1E1E1E]/50 rounded-full backdrop-blur-[50px] cursor-pointer h-[68px] border-[0.2px] border-white/10 flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ width: "auto" }}
          animate={{
            width: shouldShowExpanded ? "auto" : "auto",
            transition: {
              duration: 0.3,
              ease: "easeInOut"
            }
          }}
        >
          <div className="flex items-center pr-2 gap-2">
            <p className="text-xl font-bold pl-4">
              {moment(time).format("LT")}
            </p>

            {/* Audio button with wave animation (special case) - always visible when music is playing */}
            {isPlaying && <NavigationButton
              tab={Tabs[0]}
              currentTab={currentTab}
              ref={getFocusRef ? getFocusRef(0) : null}
              isFocused={isFocused(0)}
              isProfile={false}
              onClick={() => {
                if (currentTab === "music") {
                  setCurrentTab("");
                } else {
                  setCurrentTab("music");
                }
              }}
            >
              {currentTab ? <div className="w-[40px]">
                <div className="visualizer-wrapper">
                  <Lottie animationData={waveAnimation} />
                </div>
              </div>
                :
                <>
                  <div className="w-[40px] block dark:hidden group-hover:block">
                    <Lottie animationData={waveAnimation} />
                  </div>
                  <div className="w-[40px] hidden dark:block group-hover:hidden">
                    <Lottie animationData={waveLightAnimation} />
                  </div>
                </>}
            </NavigationButton>}

            {/* Animated container for the tabs */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ width: 0, overflow: "hidden", opacity: 0 }}
              animate={{
                width: (shouldShowExpanded || currentTab !== "") ? "auto" : 0,
                opacity: (shouldShowExpanded || currentTab !== "") ? 1 : 0,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut"
                }
              }}
            >

              {/* Navigation-enabled tabs - updated to only show music and switch */}
              {Tabs.slice(isPlaying ? 1 : 0, 2).map((tab) => (
                <NavigationButton
                  key={tab.name}
                  tab={tab}
                  currentTab={currentTab}
                  ref={getFocusRef ? getFocusRef(tab.index) : null}
                  isFocused={isFocused(tab.index)}
                  onClick={() => {
                    if (currentTab === tab.name) {
                      setCurrentTab("");
                    } else {
                      setCurrentTab(tab.name as ActivityTabs);
                    }
                  }}
                />
              ))}
            </motion.div>

            {/* Profile button (special case) - always visible */}
            <NavigationButton
              tab={Tabs[2]}
              currentTab={currentTab}
              ref={getFocusRef ? getFocusRef(2) : null}
              isFocused={isFocused(2)}
              isProfile={true}
              onClick={() => {
                if (currentTab === "profile") {
                  setCurrentTab("");
                } else {
                  setCurrentTab("profile");
                }
              }}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
  {currentTab !== "" && (
    <motion.div
      key={currentTab}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1}}
      exit={{ opacity: 0, scale: 0.95}}
      transition={{ duration: 0.25 }}
      className="w-full h-full sticky top-0"
      layout
    >
      {currentTab === "profile" && <Users />}
      {currentTab === "switch" && <Settings settingsActionMap={settingsActionMap} />}
      {currentTab === "music" && <MusicPlayer />}
      {currentTab === "restrictions" && <Restrictions onClick={() => setCurrentTab("switch")} />}
      {currentTab === "game" && <Game onClick={() => setCurrentTab("switch")} />}
      {currentTab === "accessibility" && <Accessibility onClick={() => setCurrentTab("switch")} />}
      {currentTab === "audio-cast" && <AudioCast onClick={() => setCurrentTab("switch")} />}
      {currentTab === "sleep-timer" && <SleepTimer onClick={() => setCurrentTab("switch")} />}
    </motion.div>
  )}
</AnimatePresence>


        <AlertLarge
          title="Sleep Now?"
          description="Are you sure you want to sleep?"
          open={onOpenModal}
          actions={[
            {
              text: "Sleep",
              onClick: () => {
                lock()
                setOnOpenModal(false);
              },
              variant: "primary",
            },
            {
              text: "Cancel",
              onClick: () => {
                setOnOpenModal(false);
              },
              variant: "primary",
            },
          ]}
          onOpenChange={setOnOpenModal}
        />
      </motion.div>
    </MotionConfig>
  );
}

// Updated type definition - removed "home"
type ActivityTabs = "" | "profile" | "music" | "switch" | "restrictions" | "game" | "accessibility" | "audio-cast" | "sleep-timer";

// Enhanced NavigationButton with ref forwarding
const NavigationButton = forwardRef<
  HTMLButtonElement,
  {
    tab: Tab;
    currentTab: ActivityTabs;
    onClick: () => void;
    isProfile?: boolean;
    isFocused?: boolean;
    children?: React.ReactNode;
  }
>(({ tab, currentTab, onClick, isProfile = false, isFocused = false, children }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={`transition-all hover:bg-white rounded-full duration-300 ${currentTab === tab.name ? "bg-white rounded-full" : ""
        } ${isFocused ? "ring-2 ring-white ring-opacity-80" : ""}`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {isProfile ? (
        <Image
          src={"/users/dominic.png"}
          alt="user"
          width={56}
          height={56}
          className="rounded-full"
        />
      ) : (
        <div className="flex items-center group justify-center w-[56px] h-[56px]">
          {children ? children :
            typeof tab.image === "string" ?
              <>
                <Image
                  src={`/icons/light/${tab.image}`}
                  alt={tab.name}
                  width={20}
                  height={20}
                  className={`block dark:hidden group-hover:block`}
                />
                <Image
                  src={`/icons/${currentTab === tab.name ? "light" : "dark"}/${tab.image
                    }`}
                  alt={tab.name}
                  width={20}
                  height={20}
                  className="hidden dark:block group-hover:hidden"
                />
              </>
              :
              tab.image
          }
        </div>
      )}
    </motion.button>
  );
});

NavigationButton.displayName = "NavigationButton";

interface EnhancedActivityBarProps {
  getFocusRef?: (index: number) => React.RefObject<HTMLButtonElement> | null;
  isFocused?: (index: number) => boolean;
  isExpanded?: boolean;
  onNavigateToGrid?: () => void;
}





// import { Tilt } from "react-tilt";

// interface TilterProps {
//   children: React.ReactNode;
// }

// const defaultOptions = {
//   reverse: false, // reverse the tilt direction
//   max: 50, // max tilt rotation (degrees)
//   perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
//   scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
//   speed: 1000, // Speed of the enter/exit transition
//   transition: true, // Set a transition on enter/exit.
//   axis: null, // What axis should be disabled. Can be X or Y.
//   reset: true, // If the tilt effect has to be reset on exit.
//   easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
// };

// const Tilter: React.FC<TilterProps> = ({ children }) => {
//   return (
//     <Tilt options={defaultOptions}>
//       {children}
//     </Tilt>
//   );
// };

// export default Tilter;
