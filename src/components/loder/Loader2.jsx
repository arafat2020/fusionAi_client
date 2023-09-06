import { CircularProgress } from '@mui/material'
import React from 'react'

function Loader2() {
  return (
    <div className='w-screen  flex justify-around '>
        <CircularProgress size={100}/>
    </div>
  )
}

export default Loader2