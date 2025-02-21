"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tv, Gamepad2, ImageIcon, Music, Activity } from "lucide-react"
// import Image from "next/image"

const apps = [
  { id: "appletv", icon: Tv, color: "bg-black", name: "Apple TV" },
  { id: "games", icon: Gamepad2, color: "bg-pink-500", name: "Games" },
  { id: "photos", icon: ImageIcon, color: "bg-purple-500", name: "Photos" },
  { id: "music", icon: Music, color: "bg-red-500", name: "Music" },
  { id: "fitness", icon: Activity, color: "bg-black", name: "Fitness" },
]

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
  const [scrolled, setScrolled] = useState(false)
  const [focusedApp, setFocusedApp] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col justify-end px-4">
        {/* Dock */}
        <motion.div
          className="w-full px-6 py-4 rounded-2xl relative bottom-8 backdrop-blur-xl bg-black/30"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-5 gap-12">
            {apps.map((app) => (
              <motion.button
                key={app.id}
                className={`relative group flex flex-col items-center`}
                onFocus={() => setFocusedApp(app.id)}
                onBlur={() => setFocusedApp(null)}
                whileHover={{ scale: 1.07 }}
                whileFocus={{ scale: 1.07 }}
              >
                <motion.div
                  className={`aspect-video w-full rounded-2xl flex items-center justify-center ${app.color} shadow-lg`}
                  animate={{
                    scale: focusedApp === app.id ? 1.07 : 1,
                  }}
                >
                  <app.icon size={62} className="text-white" />
                </motion.div>
                {/* <motion.span
                  className="mt-2 text-white text-sm opacity-0 group-hover:opacity-100 group-focus:opacity-100"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                >
                  {app.name}
                </motion.span> */}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Additional Content (for scrolling) */}
      <motion.div animate={{ bottom: scrolled ? "3rem" : "3.9rem" }} className="relative min-h-screen px-8 py-12 cursor-pointer">
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-5 gap-12 relative">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.07 }}
              whileFocus={{ scale: 1.07 }}
              className={`relative group flex flex-col items-center group-hover:shadow-lg group-focus:shadow-lg`}
            // transition={{ delay: i * 0.1 }}
            >
              <motion.div
                className={`aspect-video w-full rounded-2xl flex items-center justify-center bg-item-bg item-bg-shadow`}>
                {/* <Image
                src="/os-bg.jpg"
                alt={`Content ${i + 1}`}
                className="w-full h-full object-cover"
                width={1000}
                height={1000}
              /> */}
              </motion.div>

              <motion.span
                  className="mt-2 text-base text-white text-wrap opacity-0 group-hover:opacity-100 group-focus:opacity-100"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                >
                  {i + 1}
                </motion.span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

