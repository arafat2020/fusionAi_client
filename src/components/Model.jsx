import { clearModel, modelComponent, openModel, title } from '../provider/features/modelSlice'
import { Dialog, DialogTitle } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Model() {
    const open = useSelector(openModel)
    const modeltitle = useSelector(title)
    const component = useSelector(modelComponent)
    const dispatch = useDispatch()
  return (
    <Dialog open={open} onClose={()=>dispatch(clearModel())}>
        <DialogTitle style={{
          background:'black',
          color:'whitesmoke'
        }}>
            {modeltitle}
        </DialogTitle>
        {component}
    </Dialog>
  )
}

export default Model