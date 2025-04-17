import React from 'react'
import AppleTvSideToggler from './AppleTvSideToggler'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const HomePage = ({ open, setOpen }: Props) => {
    return (
        <div className='px-10 space-y-8'>
            <AppleTvSideToggler open={open} setOpen={setOpen} page='home' />
            HomePage
        </div>
    )
}

export default HomePage