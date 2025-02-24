"use client"
import { useTransitionRouter } from 'next-view-transitions'
import Image from 'next/image'
import React, { useEffect } from 'react'

const Page = () => {
    const router = useTransitionRouter()

    // Adds a keyboard shortcut to take you back to home.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault()
                router.back()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [router])

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div
                className={`fixed inset-0 transition-all duration-500 blur-2xl`}
                style={{
                    backgroundImage: `url(${"/os-bg.jpg"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className='fixed inset-0 bg-black opacity-30' />

            <div className='h-screen w-full z-10 my-10'>
                {/* Title */}
                <h1 className='text-4xl font-bold text-center'>Settings</h1>

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
        </div>
    )
}

export default Page