import React from 'react'
import Main from '../../components/Main'
import Codeindex from '../../components/Codeindex'

function index() {
  return (
    <div className='w-full h-full'>
      <Main incert={<Codeindex/>}/>
    </div>
  )
}

export default index