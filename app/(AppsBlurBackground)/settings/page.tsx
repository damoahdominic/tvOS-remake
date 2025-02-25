"use client"
import Image from 'next/image'
import React from 'react'

const Page = () => {
    return (
        <div className='h-full'>
            {/* Title */}
            <h1 className='text-4xl font-bold text-center text-white'>Settings</h1>

            {/* Main Content */}
            <div className='grid grid-cols-2 w-full h-full'>
                {/* Logo with App Details */}
                <div className='flex flex-col items-center justify-center text-center gap-8'>
                    {/* Apple logo */}
                    <Image
                        src="/apple-logo-blur.svg"
                        alt="Apple Logo"
                        width={1080}
                        height={1080}
                        className='w-1/2 aspect-square'
                    />

                    {/* App Details */}
                    <div>
                        {/* <h1 className='text-2xl font-bold'>Apple TV</h1>
                            <p className='text-sm'>Version 1.0.0</p> */}
                    </div>
                </div>

                {/* Menu Items */}
                <div>
                    {/* TODO: Add menu items @Frank */}
                    {/* The Settings item will go here */}
                </div>

            </div>
        </div>
    )
}

export default Page