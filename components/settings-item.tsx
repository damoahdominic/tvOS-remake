import React from 'react'
import { motion } from "framer-motion"
import { ChevronRight } from 'lucide-react'
import { useTransitionRouter } from 'next-view-transitions'

interface Props {
    text: string
    action?: () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    href?: any
}

const SettingsItem = ({ text, action, href }: Props) => {
    const router = useTransitionRouter()
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            onClick={(action && !href) ? action : () => router.push(href)}
            tabIndex={0}
            className="group focusable-settings-item rounded-xl px-2 py-1 flex items-center justify-between w-[80%] gap-4 backdrop-blur-[50px] bg-white/30 hover:bg-white hover:apple-active-item-shadow{">
            <h2 className='text-2xl text-white group-hover:text-black'>
                {text}
            </h2>

            <ChevronRight className='text-white group-hover:text-gray-400 size-10' />
        </motion.button>
    )
}

export default SettingsItem