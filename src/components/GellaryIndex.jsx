import React from 'react'
import LazyLoad from 'react-lazy-load'

function GellaryIndex({obj}) {
  return (
    <div className='w-full h-full flex justify-around items-center overflow-scroll scrollbar-hide'>
        <LazyLoad>
            <img src={obj?.img} alt="image" className='w-full h-full' />
        </LazyLoad>
    </div>
  )
}

export default GellaryIndex