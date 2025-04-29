import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image';

interface Props {
    onClick?: () => void;
}
const SleepTimer = ({ onClick }: Props) => {
    return (
        <AnimatePresence>
            <motion.div className='grid gap-2 p-3'
                layoutId="sleep-timer"
            >
                <h1 className='text-xl font-bold text-[#1E1E1E]/85 dark:text-white/85'>Sleep Timer</h1>

                <div className='h-[1px] w-full bg-black/40 dark:bg-white/40' />

                <div className='grid gap-2 w-[260px]'>
                    <motion.button
                        className={`transition-all bg-white/85 px-3 hover:bg-white text-xl font-[510] text-[#1E1E1E]/85 rounded-xl duration-300 h-[50px] flex items-center gap-3`}
                        onClick={onClick}
                    >
                        <Image src={"/icons/light/timer.svg"} alt="timer" width={35} height={35} className='dark:hidden block' />
                        <Image src={"/icons/dark/timer.svg"} alt="timer" width={35} height={35} className='hidden dark:block' />
                        2 Hours
                    </motion.button>
                    <motion.button
                        className={`transition-all bg-white/85 px-3 hover:bg-white text-xl font-[510] text-[#1E1E1E]/85 rounded-xl duration-300 h-[50px] flex items-center gap-3`}
                        onClick={onClick}
                    >
                        <Image src={"/icons/light/timer.svg"} alt="timer" width={35} height={35} className='dark:hidden block' />
                        <Image src={"/icons/dark/timer.svg"} alt="timer" width={35} height={35} className='hidden dark:block' />
                        1 Hours
                    </motion.button>
                    <motion.button
                        className={`transition-all bg-white/85 px-3 hover:bg-white text-xl font-[510] text-[#1E1E1E]/85 rounded-xl duration-300 h-[50px] flex items-center gap-3`}
                        onClick={onClick}
                    >
                        <Image src={"/icons/light/timer.svg"} alt="timer" width={35} height={35} className='dark:hidden block' />
                        <Image src={"/icons/dark/timer.svg"} alt="timer" width={35} height={35} className='hidden dark:block' />
                        30 Minutes
                    </motion.button>
                    <motion.button
                        className={`transition-all bg-white/85 px-3 hover:bg-white text-xl font-[510] text-[#1E1E1E]/85 rounded-xl duration-300 h-[50px] flex items-center gap-3`}
                        onClick={onClick}
                    >
                        <Image src={"/icons/light/timer.svg"} alt="timer" width={35} height={35} className='dark:hidden block' />
                        <Image src={"/icons/dark/timer.svg"} alt="timer" width={35} height={35} className='hidden dark:block' />
                        15 Minutes
                    </motion.button>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default SleepTimer