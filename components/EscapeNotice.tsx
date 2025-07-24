import { useRouter } from 'next/navigation'
import React from 'react'

const EscapeNotice = ({className}: {className?: string}) => {
  const router = useRouter()
  return (
    <h1 className={`font-medium text-sm text-white/60 ${className}`}>Press <span className='border-2 border-white/60 px-2 py-1.5 text-xs rounded-lg cursor-pointer' onClick={() => router.back()}>esc</span> to go back</h1>
  )
}

export default EscapeNotice