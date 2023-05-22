import { CircularProgress } from '@mui/material'
import React from 'react'

function Loader2() {
  return (
    <div className='w-full h-full flex justify-around items-center'>
        <CircularProgress size={100}/>
    </div>
  )
}

export default Loader2