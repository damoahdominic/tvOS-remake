import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';
import { ActivityItemsWrapper } from '../activity-items-wrapper';

interface Props {
    onClick?: () => void;
}
const Restrictions = ({ onClick }: Props) => {
    return (
        <ActivityItemsWrapper layoutId='restrictions'>
            <div className='grid gap-2 p-3'>
                <h1 className='text-xl font-bold text-[#1E1E1E]/85 dark:text-white/85'>Restrictions</h1>

                <div className='h-[1px] w-full bg-black/40 dark:bg-white/40' />
                
                <div className='flex flex-col items-center text-center my-6 gap-3'>
                    <>
                        <Image src="/icons/light/restrictions.svg" alt="restrictions" width={100} height={100} className="block dark:hidden" />
                        <Image src="/icons/dark/restrictions.svg" alt="restrictions" width={80} height={80} className="dark:block hidden" />
                    </>

                    <p className='font-medium text-base max-w-[220px] text-[#1E1E1E]/85 dark:text-white/85'>
                        Set up content, purchase and other restrictions for this
                        Apple TV.
                    </p>
                </div>

                <motion.button
                    className={`transition-all bg-white/85 dark:bg-[#1E1E1E]/85 text-[#1E1E1E]/85 dark:text-white/85 hover:bg-white hover:text-[#1E1E1E] hover:dark:text-[#1E1E1E] hover:dark:bg-white text-xl font-[510] rounded-xl duration-300 h-[45px] w-[260px]`}
                    onClick={onClick}
                >
                    Settings
                </motion.button>
            </div>
        </ActivityItemsWrapper>
    )
}

export default Restrictions