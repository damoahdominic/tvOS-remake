import React from 'react'
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref:any
}

const AppItem = ({ shouldShowAppName = true, appIconUrl, appName, href, focused, ref }: Props) => {
    const router = useTransitionRouter()

    return (
        <motion.button
            ref={ref}
            tabIndex={focused ? 0 : -1}
            animate={{ scale: focused ? 1.07 : 1 }}
            whileHover={{ scale: 1.07 }}
            whileFocus={{ scale: 1.07 }}
            onClick={() => router.push(href)}
            className={`relative group group-hover:shadow-2xl group-focus:shadow-2xl transition-all duration-300 focusable-apps`}
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