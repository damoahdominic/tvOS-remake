"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import AppItem from "@/components/app-item"
import { apps } from "@/data"
import { Squircle } from "@squircle-js/react"
import ActivityBar from "@/components/activity-bar"

const container = {
  hidden: { y: 100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5
    }
  }
};

export default function Home() {
  const focusableElements = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const [scrolled, setScrolled] = useState(false)
  // const [focusedApp, setFocusedApp] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  useEffect(() => {
    focusableElements.current = document.querySelectorAll(".focusable-apps");
    focusElement(0);
    window.scrollTo({ top: 0 })

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!focusableElements.current) return;

      let newIndex = focusedIndex;
      if (e.key === "ArrowDown" || e.key === "s") {
        newIndex = Math.min(focusedIndex + 1, focusableElements.current.length - 1);
      } else if (e.key === "ArrowUp" || e.key === "w") {
        newIndex = Math.max(focusedIndex - 1, 0);
      }

      if (newIndex !== focusedIndex) {
        focusElement(newIndex);
        setFocusedIndex(newIndex);
      }
    };


    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex]);

  const focusElement = (index: number) => {
    if (focusableElements.current) {
      focusableElements.current[index]?.focus();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className={`fixed inset-0 transition-all duration-500 ${scrolled ? "blur-xl" : ""}`}
        style={{
          backgroundImage: `url(${"/os-bg.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <ActivityBar />

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col justify-end px-4">
        {/* Dock */}
        <Squircle
          asChild
          cornerRadius={30}
          cornerSmoothing={1}
          className="bg-black/30"
        >
          <motion.div
            className="w-full px-6 py-4 relative bottom-8 backdrop-blur-xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-6 gap-7">
              {apps.slice(0, 6).map((app, i) => (
                <AppItem key={i} {...app} />
              ))}
            </div>
          </motion.div>
        </Squircle>
      </div>

      {/* Additional Content (for scrolling) */}
      <motion.div animate={{ bottom: scrolled ? "3rem" : "3.9rem" }} className="relative px-8 py-12 cursor-pointer">
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-6 gap-7 relative">
          {apps.slice(6).map((app, i) => (
            <AppItem key={i} {...app} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

