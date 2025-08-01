"use client"

import HomePage from '@/components/AppleTv/HomePage'
// import LibraryPage from '@/components/AppleTv/LibraryPage'
import SearchPage from '@/components/AppleTv/SearchPage'
import EscapeNotice from '@/components/EscapeNotice'
import React from 'react'

type AppleTvPageTypes = "search" | "home" | "library"

export default function Page() {
    const [currentPage, setCurrentPage] = React.useState<AppleTvPageTypes>('home')

    // get the value with # in the url say #search show be return search
    React.useEffect(() => {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1)
            if (hash) {
                setCurrentPage(hash as AppleTvPageTypes)
            } else {
                setCurrentPage('home')
            }
        })

        return () => {
            window.removeEventListener('hashchange', () => {
                const hash = window.location.hash.substring(1)
                if (hash) {
                    setCurrentPage(hash as AppleTvPageTypes)
                } else {
                    setCurrentPage('home')
                }
            })
        }
    }, [])

    return (
        <section className='h-full'>
            <EscapeNotice className='absolute top-5 right-5 z-50' />
            {
                currentPage === "home" ? <HomePage />
                    // :
                    // currentPage === "library" ? <LibraryPage />
                    :
                    <SearchPage />
            }
        </section>
    )
}