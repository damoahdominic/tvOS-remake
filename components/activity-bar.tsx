// File: components/ActivityBar.tsx (Enhanced with navigation)
import React, { useEffect, useState, forwardRef } from "react";
import { motion, MotionConfig, Transition } from "framer-motion";
import { Squircle } from "@squircle-js/react";
import moment from "moment";
import Image from "next/image";
import { Plus } from "lucide-react";
import MusicPlayer from "./music-player";
import AlertLarge from "./alerts/alert-large";

const transition: Transition = {
  type: "scale",
  duration: 0.4,
};

const Users = [
  {
    name: "Dominic",
    image: "/users/dominic.png",
    isActive: true,
  },
  {
    name: "Larry",
    image: "/users/larry.png",
    isActive: false,
  },
];

const Settings = [
  {
    icon: "/icons/power.svg",
    title: "Power Off",
    subTitle: "",
    iconOnly: false,
    alignment: "vertical",
  },
  {
    icon: "/icons/wifi.svg",
    title: "Wifi",
    subTitle: "StarLink",
    alignment: "horizontal",
  },
  {
    icon: "/icons/dnd.svg",
    title: "Do Not Disturb",
    subTitle: "",
    iconOnly: false,
    alignment: "horizontal",
  },
  {
    icon: "/icons/audio.svg",
    title: "Audio",
    subTitle: "",
    iconOnly: false,
    alignment: "horizontal",
  },
  {
    icon: "/icons/timer.svg",
    title: "Sleep Timer",
    subTitle: "",
    iconOnly: false,
    alignment: "horizontal",
  },
  {
    icon: "/icons/pad.svg",
    title: "Game",
    subTitle: "",
    iconOnly: true,
    alignment: "vertical",
  },
  {
    icon: "/icons/accessibility.svg",
    title: "Accessibility",
    subTitle: "",
    iconOnly: true,
    alignment: "vertical",
  },
  {
    icon: "/icons/lock.svg",
    title: "Lock",
    subTitle: "",
    iconOnly: true,
    alignment: "vertical",
  },
  {
    icon: "/icons/search.svg",
    title: "Search",
    subTitle: "",
    iconOnly: true,
    alignment: "vertical",
  },
];

// Define Tabs with an index for navigation - removed home tab
const Tabs = [
  {
    name: "music",
    image: "audio.svg",
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

// Updated type definition - removed "home"
type ActivityTabs = "" | "profile" | "music" | "switch";

// Enhanced NavigationButton with ref forwarding
const NavigationButton = forwardRef<
  HTMLButtonElement,
  {
    tab: (typeof Tabs)[0];
    currentTab: ActivityTabs;
    onClick: () => void;
    isProfile?: boolean;
    isFocused?: boolean;
  }
>(({ tab, currentTab, onClick, isProfile = false, isFocused = false }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={`transition-all duration-500 ${
        currentTab === tab.name ? "bg-white rounded-full" : ""
      } ${isFocused ? "ring-2 ring-white ring-opacity-80" : ""}`}
      onClick={onClick}
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
        <>
          <Image
            src={`/icons/light/${tab.image}`}
            alt={tab.name}
            width={56}
            height={56}
            className={`block ${"dark:hidden"}`}
          />
          <Image
            src={`/icons/${currentTab === tab.name ? "light" : "dark"}/${
              tab.image
            }`}
            alt={tab.name}
            width={56}
            height={56}
            className="hidden dark:block"
          />
        </>
      )}
    </motion.button>
  );
});

NavigationButton.displayName = "NavigationButton";

interface EnhancedActivityBarProps {
  getFocusRef?: (index: number) => React.RefObject<HTMLButtonElement> | null;
  isFocused?: (index: number) => boolean;
  onNavigateToGrid?: () => void;
}

export default function ActivityBar({
  getFocusRef,
  isFocused = () => false,
  onNavigateToGrid,
}: EnhancedActivityBarProps) {
  const [currentTab, setCurrentTab] = useState<ActivityTabs>("");
  const [time, setTime] = useState<Date>(new Date());
  const [onOpenModal, setOnOpenModal] = useState(false);

  // Effect hook to run on component mount
  useEffect(() => {
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

  return (
    <MotionConfig transition={transition}>
      <motion.div
        variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 20 } }}
        initial="closed"
        animate="open"
        exit="closed"
        transition={{ delay: 1 }}
        className="z-[100] position absolute top-10 right-5 flex flex-col items-end gap-2 text-black/40 dark:text-white/50"
      >
        <Squircle
          asChild
          cornerRadius={50}
          cornerSmoothing={1}
          className=" backdrop-blur-[50px] cursor-pointer"
        >
          <motion.div className="bg-white/50 dark:bg-[#1E1E1E]/50 h-[68px] flex items-center">
            <div className="flex items-center pr-2 gap-2">
              <p onClick={() => setOnOpenModal(true)} className="text-xl font-bold pl-4">
                {moment(time).format("LT")}
              </p>

              {/* Navigation-enabled tabs - updated to only show music and switch */}
              {Tabs.slice(0, 2).map((tab) => (
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

              {/* Profile button (special case) - updated index */}
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
        </Squircle>

        {currentTab !== "" && (
          <motion.div className="rounded-[40px] bg-white/50 dark:bg-[#1E1E1E]/50 transition-[width] duration-500 text-black/40 dark:text-white/50 backdrop-blur-[50px] cursor-pointer p-5">
            {currentTab === "profile" ? (
              <motion.div
                variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
                initial="closed"
                animate="open"
                exit="closed"
                className="grid grid-cols-2 gap-4"
              >
                {Users.map((user, i) => {
                  return (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileFocus={{ scale: 1.05 }}
                      key={i}
                      className="relative"
                    >
                      <Image
                        src={user.image}
                        width={135}
                        height={135}
                        alt={user.name}
                        className="rounded-full"
                      />
                      {user.isActive && (
                        <Image
                          src={"/icons/checkmark.svg"}
                          width={28}
                          height={28}
                          alt={"active"}
                          className="absolute top-0 right-0"
                        />
                      )}

                      <p className="text-center">{user.name}</p>
                    </motion.div>
                  );
                })}

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileFocus={{ scale: 1.05 }}
                  className="size-[135px] bg-black/50 rounded-full flex items-center justify-center"
                >
                  <Plus size={40} />
                </motion.div>
              </motion.div>
            ) : currentTab === "switch" ? (
              <motion.div
                variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
                initial="closed"
                animate="open"
                exit="closed"
                className="grid grid-cols-4 grid-rows-4 gap-3"
              >
                {Settings.map((settings, i) => {
                  return (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileFocus={{ scale: 1.05 }}
                      key={i}
                      className={`rounded-[15px] px-3 flex items-center gap-2 p-2 bg-black/50 ${
                        i === 0
                          ? "col-span-2 row-span-2 aspect-square"
                          : i === 1 || i === 2 || i === 3 || i === 4
                          ? "col-span-2"
                          : "col-span-1"
                      } ${
                        settings.alignment === "horizontal"
                          ? "flex-row justify-start"
                          : "flex-col justify-center"
                      }`}
                    >
                      <Image
                        src={settings.icon}
                        width={135}
                        height={135}
                        alt={settings.title}
                        className={` ${i === 0 ? "w-[65px]" : "w-[30px]"}`}
                      />
                      {!settings.iconOnly && (
                        <p className={i > 0 ? "text-wrap w-[80px]" : ""}>
                          {settings.title}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              currentTab === "music" && <MusicPlayer />
            )}
          </motion.div>
        )}

        <AlertLarge
          title="Sleep Now?"
          description="Are you sure you want to sleep?"
          open={onOpenModal}
          actions={[
            {
              text: "Sleep",
              onClick: () => {
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
