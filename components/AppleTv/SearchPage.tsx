import React from 'react'
import AppleTvSideToggler from './AppleTvSideToggler'
import Image from 'next/image'
import { searchItems } from '@/data/apple-tv'


interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}



const SearchPage = ({ open, setOpen }: Props) => {
    return (
        <div className='px-5 space-y-8'>
            <AppleTvSideToggler open={open} setOpen={setOpen} page='search' />

            <div className='flex-1 flex flex-col justify-center items-center gap-4'>


                {/* Search Items */}
                <div className='grid grid-cols-3 gap-8'>
                    {
                        searchItems.map((item, index) => {
                            return (
                                <Image key={index} src={item.image} width={1160} height={660} alt={item.name} className='aspect-video object-cover rounded-3xl hover:scale-[1.02] focus:scale-105 transition-all duration-300' />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchPage