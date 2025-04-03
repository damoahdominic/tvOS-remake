import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';

interface Props {
    onClick?: () => void;
}
const Accessibility = ({ onClick }: Props) => {
    return (
        <div className='grid gap-2 p-3'>
            <h1 className='text-xl font-bold text-[#1E1E1E]/85 dark:text-white/85'>Accessibility</h1>

            <div className='h-[1px] w-full bg-black/40 dark:bg-white/40' />
            
            <div className='flex flex-col items-center text-center my-6 gap-3'>
                <>
                    <Image src="/icons/light/accessibility.svg" alt="Accessibility" width={100} height={100} className="block dark:hidden" />
                    <Image src="/icons/dark/accessibility.svg" alt="Accessibility" width={80} height={80} className="dark:block hidden" />
                </>

                <p className='font-medium text-base max-w-[220px] text-[#1E1E1E]/85 dark:text-white/85'>
                    Settings you enable in your
                    Accessibility Shortcut will appear here.
                </p>
            </div>

            <motion.button
                className={`transition-all bg-white/85 hover:bg-white text-xl font-[510] text-[#1E1E1E]/85 rounded-xl duration-300 h-[45px] w-[260px]`}
                onClick={onClick}
            >
                Settings
            </motion.button>
        </div>
    )
}

export default Accessibility