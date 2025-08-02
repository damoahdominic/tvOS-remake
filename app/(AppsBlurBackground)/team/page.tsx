"use client";
import { engineeringTeam, designTeam } from "@/data/team";
import Image from "next/image";
import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { useSearchParams, useRouter } from "next/navigation";

import MouseFollower from "@/components/MouseFollower";

const tabs = [
  { id: "home", label: "Home" },
  { id: "team", label: "Team" },
  { id: "credits", label: "Credits" },
];

const resources = [
  {
    image: "/github.png",
    title: "Open Source Code",
    subtitle: "Github",
    link: "https://github.com/damoahdominic/tvOS-remake",
  },
  {
    image: "/figma.png",
    title: "Design File (Community)",
    subtitle: "Figma File",
    link: "https://www.figma.com/design/KmvT8YhqhqDXjdza2Q9ae5/tvOS-18-UI-Kit",
  },
  {
    image: "/dstudios-circular.png",
    title: "DStudios",
    subtitle: "Diamond Sponsor",
    link: "https://ddamoah.com",
  },
];

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function TeamPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const router = useRouter();
  
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabs.some(tab => tab.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);
  interface MousePosition {
    x: number;
    y: number;
  }
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isHoveredIndex, setIsHoveredIndex] = useState<number>(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = (index: number) => {
    setIsHovered(true);
    setIsHoveredIndex(index);
  };
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <div className={`overflow-auto h-full`}>
      <h1 className="hidden sm:block absolute top-5 left-5 z-50 font-medium text-sm text-white/60">
        Press{" "}
        <span
          className="border-2 border-white/60 px-2 py-1.5 text-xs rounded-lg cursor-pointer"
          onClick={() => router.push("/")}
        >
          esc
        </span>{" "}
        to go back
      </h1>
      <div className="absolute top-5 z-40 w-full flex justify-center">
        <motion.div className="flex space-x-1 bg-[#090909CC] rounded-full">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id ? "" : "hover:text-white/60"
              } relative rounded-full px-7 py-3 text-lg font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {activeTab === tab.id && (
                <motion.div
                  // layoutId="bubble"
                  className="absolute inset-0 z-50 py-7 px-10 bg-white -translate-y-0.5 mix-blend-difference rounded-full"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
              {tab.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <div className="pt-20 h-full text-white">
        {activeTab === "home" && (
          <div className="h-full w-full relative text-white">
            <Image
              src="/team/home-bg.png"
              alt="team"
              fill
              className="object-contain"
            />
            <motion.div className="fixed bottom-0 left-0 right-0 z-20 py-6 h-1/2 flex items-end bg-gradient-to-t from-black/80 to-transparent px-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-md space-y-2 relative left-10 bottom-16 text-2xl"
              >
                <div className="flex items-center gap-2">
                  <h2>Meet the Team </h2>
                  <div className="border border-white rounded-md text-base py-[0.1rem] px-[0.5rem]">
                    Extraordinary Individuals
                  </div>
                </div>
                <p>
                  From flop to funded — Dom and Larry turn startup chaos into
                  gold.
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}

        {activeTab === "team" && (
          <motion.div className="flex flex-col space-y-12 h-full px-10 mt-10">
            <div className="space-y-6">
              <h1 className="text-xl md:text-3xl font-bold">
                Engineering Team
              </h1>
              {/* Stagger items bellow */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 lg:grid-cols-3 gap-10"
              >
                {/* Stagger items */}
                {engineeringTeam.map((member, index) => (
                  <motion.div key={index} variants={staggerChild}>
                    <Link href={`/team/${member.id}`}>
                      <div className="tilting-card-wrapper cursor-pointer mb-5 lg:h-[32vw] h-[80vw]">
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div
                          className="tilting-card-body rounded-3xl"
                          style={{
                            backgroundImage: `url(${member.image}), linear-gradient(135deg, #101010 0%, #454545 100%)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="card-overlay"></div>
                        </div>
                      </div>
                      <h2 className="text-xl font-bold mt-4">{member.name}</h2>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div className="space-y-6 pb-12">
              <h1 className="text-xl md:text-3xl font-bold">Design Team</h1>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 lg:grid-cols-3 gap-10"
              >
                {designTeam.map((member, index) => (
                  <motion.div key={index} variants={staggerChild}>
                    <Link href={`/team/${member.id}`}>
                      <div className="tilting-card-wrapper cursor-pointer mb-5 lg:h-[32vw] h-[80vw]">
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div className="mouse-position-tracker"></div>
                        <div
                          className="tilting-card-body rounded-3xl"
                          style={{
                            backgroundImage: `url(${member.image}), linear-gradient(135deg, #101010 0%, #454545 100%)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="card-overlay"></div>
                        </div>
                      </div>
                      <h2 className="text-xl font-bold mt-4">{member.name}</h2>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === "credits" && (
          <div className="flex flex-col space-y-8 h-full text-white">
            <div className="px-10 w-full flex flex-col items-center">
              <div className="flex flex-wrap gap-8 mt-10 mx-auto">
                {resources.map((resource, index) => (
                  // <Link target="_blank" href={resource.link}>
                  <Link
                    target="_blank"
                    href={resource.link}
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    style={
                      {
                        "--stagger-index": index + 1,
                        "--cursor-x": "175px",
                        "--cursor-y": "90.36248779296875px",
                        "--x": "175px",
                        "--y": "90.36248779296875px",
                      } as React.CSSProperties
                    }
                    className="relative overflow-hidden flex flex-col gap-6 w-full md:w-[450px] font-medium text-xl bg-black/30 rounded-3xl px-[3.75svh] py-[7.5svh]"
                  >
                    {isHovered && isHoveredIndex === index && (
                      <MouseFollower
                        circleSize={400}
                        circleColor={"#ffffff03"}
                        mousePosition={mousePosition}
                      />
                    )}
                    <Image
                      src={resource.image}
                      width={145}
                      height={145}
                      alt="platform"
                    />
                    <div className="">
                      <h1>{resource.title}</h1>
                      <h1>{resource.subtitle}</h1>
                    </div>
                  </Link>
                  // </Link>
                ))}
              </div>
            </div>
            <div className="h-full bg-black text-white font-medium pt-10 px-10">
              {/* Donate Button Section */}
              <div className="flex w-full flex-col items-center justify-center space-y-6 mb-24">
                <h2 className="text-2xl font-bold">Support the Project</h2>
                <Link
                  href="https://buymeacoffee.com/damoahdominic"
                  target="_blank"
                >
                  <button
                    // whileHover={{ scale: 1.05 }}
                    // whileTap={{ scale: 0.95 }}
                    className="pmx-cta-btn secondary relative overflow-hidden  text-black font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 flex items-center space-x-3"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Donate & Support</span>
                  </button>
                </Link>
                <p className="text-sm text-white/60 text-center max-w-md">
                  Help us continue building amazing tvOS experiences. Your
                  support means the world to us!
                </p>
              </div>

              <div className="flex w-full flex-col items-center justify-center space-y-4 text-xl">
                <div className="flex items-center justify-center space-x-2">
                  <h1>Honorable Mentions</h1>
                  <p className="border border-white p-1 text-xs font-bold rounded-md ml-2">
                    In the Journey
                  </p>
                </div>
                <div className="">
                  <p>• Collins Abrusu</p>
                  <p>• Gideon Asare </p>
                </div>
              </div>

              {/* Responsive Footer */}
              <div className="mt-16 mb-8 px-4 sm:px-8 lg:px-16">
                <p className="max-w-4xl mx-auto text-center text-xs sm:text-sm text-white/60 leading-relaxed">
                  This Project is not affiliated with, endorsed by, or sponsored
                  by Apple Inc. All Apple trademarks, including product names
                  and logos, are the property of Apple Inc. and are used here
                  strictly for informational and creative purposes. Our goal is
                  to provide a unique and enjoyable experience that is entirely
                  our own. Everything you see has been thoughtfully crafted to
                  inspire and entertain — with full respect to the original
                  rights holders.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="h-full w-full flex items-center justify-center text-white">Loading...</div>}>
      <TeamPageContent />
    </Suspense>
  );
}
