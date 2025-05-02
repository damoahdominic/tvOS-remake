import React from 'react'
import AppleTvSideToggler from './AppleTvSideToggler'
import { searchItems } from '@/data/apple-tv'
import Image from 'next/image'

const LibraryPage = () => {
  return (
    <div className='px-10 space-y-8'>
      <AppleTvSideToggler page='library' />

      <div className='grid grid-cols-4 gap-8'>
        {
          searchItems.map((item, index) => {
            return (
              <Image key={index} src={item.image} width={1160} height={660} alt={item.name} className='aspect-video object-cover rounded-3xl hover:scale-[1.02] focus:scale-105 transition-all duration-300' />
            )
          })
        }
      </div>
    </div>
  )
}

export default LibraryPage