"use client"
import React from 'react'

export default function AppleTvLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div
                className={`fixed inset-0 transition-all duration-500 backdrop-blur-3xl`}
            />
            <div className='fixed inset-0 bg-black opacity-30' />

            <div className='h-screen w-full z-10 my-10'>
                {children}
            </div>
        </div>
    )
}