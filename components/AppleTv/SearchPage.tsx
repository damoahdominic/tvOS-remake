import React from 'react'
import AppleTvSideToggler from './AppleTvSideToggler'


interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const SearchPage = ({ open, setOpen }: Props) => {
    return (
        <div className='px-5'>
            <AppleTvSideToggler open={open} setOpen={setOpen} page='search' />
          SearchPage
      </div>
  )
}

export default SearchPage