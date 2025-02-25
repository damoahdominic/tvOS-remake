import React from 'react'
import { motion } from "framer-motion"
import { useTransitionRouter } from "next-view-transitions"
import Image from 'next/image'

interface Props{
    shouldShowAppName: boolean
    appIconUrl: string
    appName: string
    href: string
}

const AppItem = ({shouldShowAppName = true, appIconUrl,appName, href}:Props) => {
    const router = useTransitionRouter()

    return (
        <motion.button
            whileHover={{ scale: 1.07 }}
            whileFocus={{ scale: 1.07 }}
            onClick={() => router.push(href)}
            // onFocus={() => setFocusedApp(app.id)}
            // onBlur={() => setFocusedApp(null)}
            className={`relative group group-hover:shadow-2xl group-focus:shadow-lg`}
        // transition={{ delay: i * 0.1 }}
        >
            <motion.div
                className={`aspect-video w-full rounded-2xl bg-item-bg item-bg-shadow`}>
                <Image
                src={appIconUrl}
                alt={`${appName}`}
                className="w-full h-full object-cover rounded-2xl"
                width={1000}
                height={1000}
              />
            </motion.div>

            {shouldShowAppName && <motion.span
                className="mt-2 text-base text-white text-wrap opacity-0 group-hover:opacity-100 group-focus:opacity-100"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
            >
                {appName}
            </motion.span>}
        </motion.button>
    )
}

export default AppItem