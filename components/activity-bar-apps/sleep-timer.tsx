import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';
import { ActivityItemsWrapper } from '../activity-items-wrapper';

interface Props {
    onClick?: () => void;
}
const SleepTimer = ({ onClick }: Props) => {
    return (
        <ActivityItemsWrapper layoutId='sleep-timer'>
            <div className='grid gap-2 p-3'>
                <h1 className='text-xl font-bold text-[#1E1E1E]/85 dark:text-white/85'>Sleep Timer</h1>

                <div className='h-[1px] w-full bg-black/40 dark:bg-white/40' />

                <div className='grid gap-2 w-[260px]'>
                    <motion.button
                        className={`group transition-all bg-white/85 dark:bg-[#1E1E1E]/85 text-[#1E1E1E]/85 dark:text-white/85 hover:bg-white hover:text-[#1E1E1E] hover:dark:text-[#1E1E1E] hover:dark:bg-white px-3 text-xl font-[510] rounded-xl duration-300 h-[50px] flex items-center gap-3`}
                        onClick={onClick}
                    >
                        <Image src={"/icons/light/timer.svg"} alt="timer" width={35} height={35} className='dark:hidden block group-hover:block transition-all duration-300' />
                        <Image src={"/icons/dark/timer.svg"} alt="timer" width={35} height={35} className='hidden dark:block group-hover:hidden transition-all duration-300' />
                        2 Hours
                    </motion.button>
                    <motion.button
                        className={`group transition-all bg-white/85 dark:bg-[#1E1E1E]/85 text-[#1E1E1E]/85 dark:text-white/85 hover:bg-white hover:text-[#1E1E1E] hover:dark:text-[#1E1E1E] hover:dark:bg-white px-3 text-xl font-[510] rounded-xl duration-300 h-[50px] flex items-center gap-3`}
                        onClick={onClick}
                    >
                        <Image src={"/icons/light/timer.svg"} alt="timer" width={35} height={35} className='dark:hidden block group-hover:block transition-all duration-300' />
                        <Image src={"/icons/dark/timer.svg"} alt="timer" width={35} height={35} className='hidden dark:block group-hover:hidden transition-all duration-300' />
                        1 Hours
                    </motion.button>
                    <motion.button
                        className={`group transition-all bg-white/85 dark:bg-[#1E1E1E]/85 text-[#1E1E1E]/85 dark:text-white/85 hover:bg-white hover:text-[#1E1E1E] hover:dark:text-[#1E1E1E] hover:dark:bg-white px-3 text-xl font-[510] rounded-xl duration-300 h-[50px] flex items-center gap-3`}
                        onClick={onClick}
                    >
                        <Image src={"/icons/light/timer.svg"} alt="timer" width={35} height={35} className='dark:hidden block group-hover:block transition-all duration-300' />
                        <Image src={"/icons/dark/timer.svg"} alt="timer" width={35} height={35} className='hidden dark:block group-hover:hidden transition-all duration-300' />
                        30 Minutes
                    </motion.button>
                    <motion.button
                        className={`group transition-all bg-white/85 dark:bg-[#1E1E1E]/85 text-[#1E1E1E]/85 dark:text-white/85 hover:bg-white hover:text-[#1E1E1E] hover:dark:text-[#1E1E1E] hover:dark:bg-white px-3 text-xl font-[510] rounded-xl duration-300 h-[50px] flex items-center gap-3`}
                        onClick={onClick}
                    >
                        <Image src={"/icons/light/timer.svg"} alt="timer" width={35} height={35} className='dark:hidden block group-hover:block transition-all duration-300' />
                        <Image src={"/icons/dark/timer.svg"} alt="timer" width={35} height={35} className='hidden dark:block group-hover:hidden transition-all duration-300' />
                        15 Minutes
                    </motion.button>
                </div>
            </div>
        </ActivityItemsWrapper>
    )
}

export default SleepTimer