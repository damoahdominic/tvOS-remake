import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image';

interface Props {
    onClick?: () => void;
}
const AudioCast = ({ onClick }: Props) => {
    return (
        <AnimatePresence>
            <motion.div className='grid gap-2 p-3'
                layoutId="audio-cast"
            >
                <h1 className='text-xl font-bold text-[#1E1E1E]/85 dark:text-white/85'>Audio</h1>

                <div className='h-[1px] w-full bg-black/40 dark:bg-white/40' />

                <motion.button
                    className={`transition-all bg-white/50 text-[#1E1E1E]/85 dark:bg-black/50 dark:text-white/85 px-3 hover:bg-white text-xl font-[510] group rounded-xl duration-300 h-[50px] flex items-center justify-between gap-3`}
                    onClick={onClick}
                >
                    <Image src={"/icons/light/system-speakers.svg"} alt="Speakers" width={35} height={35} className='dark:hidden block' />
                    <Image src={"/icons/dark/system-speakers.svg"} alt="Speakers" width={35} height={35} className='hidden dark:block' />
                    System Speakers
                    <Image src={"/icons/light/checkmark.svg"} alt="checkmark" width={15} height={15} className='dark:hidden block ml-3' />
                    <Image src={"/icons/dark/checkmark.svg"} alt="checkmark" width={15} height={15} className='hidden dark:block ml-3' />
                </motion.button>
            </motion.div>
        </AnimatePresence>
    )
}

export default AudioCast

