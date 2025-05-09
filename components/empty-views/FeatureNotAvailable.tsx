"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useTransitionRouter } from 'next-view-transitions'

export default function FeatureNotAvailable() {
    const router = useTransitionRouter()
    return (
        <div className='h-svh w-full flex items-center justify-center gap-2 flex-col bg-[#333333]'>
            <h1 className='text-3xl font-bold'>Feature not available</h1>
            <p className='max-w-xs mb-5'>This feature is not available to you yet.</p>
            
            <motion.button onClick={() => router.back()} className='bg-white text-[#1E1E1E] px-3 py-2 rounded-lg w-full max-w-md'>
                Okay
            </motion.button>
        </div>
    )
}