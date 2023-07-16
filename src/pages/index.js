import Main from "../components/Main";
import { status } from "../provider/features/userClice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import {  setNotification } from "../provider/features/notifySlice";
import { useRouter } from "next/router";
import MainIndex from "../components/MainIndex";
import { clearErr, err } from "../provider/features/termslice";
import GppBadIcon from "@mui/icons-material/GppBad";


export default function Home() {
  const st = useSelector(status)
  const errPost = useSelector(err)
  const dispatch = useDispatch()
  useEffect(() => {
  if (st==='Unathenticated') {
     dispatch(setNotification({
      msg: "User unathenticated",
      icon: <LockPersonIcon />,
      open: true,
    }))
  }
  }, [st])
  useEffect(() => {
    if (errPost) {
      async function loader() {
       await dispatch(setNotification({
          msg: errPost,
          icon: <GppBadIcon />,
          open: true,
        }))
        dispatch(clearErr())
      }
      loader()
    }
    
  }, [err])
  
  return <div className="w-full h-full">
    <Main incert={<MainIndex/>}/>
  </div>;
}
