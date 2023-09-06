import { CircularProgress } from '@mui/joy'
import { Button, InputLabel, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { token } from '../../provider/features/userClice'
import { createGroup as crtgr }  from '../../provider/features/groupslice'

function CreateGroup({loading,tk,action}) {
  const [name, setname] = useState()
  const dispatch = useDispatch()
  // function createGroup() {
    
  // }
  // console.log(tk)
  return (
    <div className='w-[200px] p-2 space-y-2 flex flex-col items-center'>
      <InputLabel style={{
        color:'whitesmoke'
      }}>
      Create Group
      </InputLabel>
        <TextField size='small' 
        title='Create Group'
        focused
       onChange={e=>setname(e.target.value)}
        style={{
            background:'blue',
            borderRadius:'5px',
            color:'whitesmoke'
        }}
        />
        <Button disabled={loading} variant='outlined' onClick={async()=>{
          if (name && tk) {
           await dispatch(crtgr({name:name,tk:tk}))
           action('group')
          }
        }}>
            {loading?<CircularProgress/>:"Create Group"}
        </Button>
    </div>
  )
}

export default CreateGroup