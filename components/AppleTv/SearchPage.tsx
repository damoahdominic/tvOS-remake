import React from 'react'
import AppleTvSideToggler from './AppleTvSideToggler'
import Image from 'next/image'
import { searchItems } from '@/data/apple-tv'
import { Separator } from '../ui/separator'


interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}



const SearchPage = ({ open, setOpen }: Props) => {
    return (
        <div className='px-10 space-y-8'>
            <AppleTvSideToggler open={open} setOpen={setOpen} page='search' />

            <div className='flex-1 flex flex-col justify-center gap-10'>
                {/* Header */}
                <div className='space-y-10'>
                    <div className='flex items-center gap-4'>
                        <Image src={"/apple-tv/search.svg"} width={32} height={32} alt={"search"} />
                        <h1 className='text-4xl text-white/50 font-medium'>Movies, Shows, Cast and More</h1>
                    </div>

                    <div>
                        
                    </div>

                    <Separator className='w-full h-[0.5px] bg-white/30'/>
                </div>

                {/* Search Items */}
                <div className='space-y-5'>
                    <h1 className='text-2xl font-medium'>Browse</h1>
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
        </div>
    )
}

export default SearchPage