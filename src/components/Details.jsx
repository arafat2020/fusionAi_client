import React, { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function Details() {
  const [Open, setOpen] = useState(false);
  return (
    <div
      className={`absolute glassBg3 bottom-3 p-2 flex flex-col  transition right-3 ${
        Open && "w-[90%] sm:w-1/3 h-full space-y-4" 
      }`}
    >
      <div className={`w-full h-auto p-1 felx space-x-5 ${Open ?"inline-flex" : "hidden"}`}>
        <div
          className={`rounded-full p-1 border-[2px] border-blue-500 cursor-pointer transition `}
        >
          <ModeEditIcon color="primary" sx={{ fontSize: 30 }} />
        </div>
        <div
        onClick={()=>setOpen(false)}
          className={`rounded-full p-1 border-[2px] border-blue-500 cursor-pointer transition `}
        >
          <CloseIcon color="primary" sx={{ fontSize: 30 }} />
        </div>
      </div>
      <div className="w-full flex-grow overflow-y-scroll scrollbar-hide ">

      </div>
      <div
        onClick={() => setOpen(true)}
        className={`rounded-full p-1 border-[2px] border-blue-500 cursor-pointer transition ${
          Open ? "scale-0" : "scale-100"
        }`}
      >
        <InfoIcon color="primary" sx={{ fontSize: 30 }} />
      </div>
    </div>
  );
}

export default Details;
