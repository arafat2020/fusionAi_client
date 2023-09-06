import React, { useState } from 'react'
import useImageLoad from '../hooks/useImageLoad';
import { Avatar, Skeleton, Tooltip } from '@mui/material';

function LzyAvater({i,index, e}) {
    const { imgLoad } = useImageLoad({ url: e.Art?.cmp });
    const [on, seton] = useState(false)
  return (
    <div
    
    className={`p-1 rounded-full border ${
      index === i ? "border-blue-500 opacity-100" : "border-none opacity-40"
    }  hover:opacity-100`}
  >
    <Tooltip title={e.Art?.tag}>
      {imgLoad ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <Avatar  src={e.Art?.cmp} />
      )}
    </Tooltip>
  </div>
  )
}

export default LzyAvater