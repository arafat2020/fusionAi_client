import { CircularProgress } from '@mui/material'
import React from 'react'

function Loader2({absulate=false}) {
  return (
    <div className={`flex justify-around items-center ${absulate ? 'w-screen h-screen absolute z-50':'w-full h-full'}`}>
        <CircularProgress size={100}/>
    </div>
  )
}

export default Loader2