import React from 'react'
import AppleTvSideToggler from './AppleTvSideToggler'


interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const LibraryPage = ({ open, setOpen }: Props) => {
  return (
    <div className='px-10 space-y-8'>
      <AppleTvSideToggler open={open} setOpen={setOpen} page='library' />
      LibraryPage
    </div>
  )
}

export default LibraryPage