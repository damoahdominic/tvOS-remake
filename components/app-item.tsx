import React, { forwardRef, memo } from 'react'
import { motion } from "framer-motion"
import { useTransitionRouter } from "next-view-transitions"
import Image from 'next/image'
import { Squircle } from "@squircle-js/react"

interface Props {
    shouldShowAppName: boolean
    appIconUrl: string
    appName: string
    href: string
    id?: number
    focused?: boolean
}

// Use both forwardRef and memo to prevent unnecessary re-renders
const AppItem = memo(forwardRef<HTMLButtonElement, Props>(({
    shouldShowAppName = true,
    appIconUrl,
    appName,
    href,
    focused
}, ref) => {
    const router = useTransitionRouter()

    // Add debugging for focus issues
    React.useEffect(() => {
        if (focused) {
            console.log("AppItem focused:", appName);
        }
    }, [focused, appName]);

    return (
        <motion.button
            ref={ref}
            tabIndex={focused ? 0 : -1}
            animate={{ scale: focused ? 1.08 : 1 }}
            whileHover={{ scale: 1.08 }}
            whileFocus={{ scale: 1.08 }}
            onClick={() => router.push(href)}
            className="relative group group-hover:shadow-2xl group-focus:shadow-2xl transition-all duration-300 focusable-apps w-full"
        >
            <Squircle
                asChild
                cornerRadius={30}
                cornerSmoothing={1}
                className="bg-black text-white"
            >
                <motion.div className={`aspect-video w-full group-focus:shadow-2xl group-hover:shadow-2xl`}>
                    <Image
                        src={appIconUrl}
                        alt={`${appName}`}
                        className="w-full h-full object-cover"
                        width={1000}
                        height={1000}
                    />
                </motion.div>
            </Squircle>

            {shouldShowAppName && <motion.span
                className={`mt-2 text-base text-white text-wrap ${focused ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus:opacity-100'}`}
                initial={{ y: -10 }}
                animate={{ y: 0 }}
            >
                {appName}
            </motion.span>}
        </motion.button>
    )
}));

// Add display name for better debugging
AppItem.displayName = 'AppItem';

export default AppItem;