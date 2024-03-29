import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../provider/features/notifySlice";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import GppBadIcon from '@mui/icons-material/GppBad';
import { cleareUserErr, initialLoad, login, status, user, userError } from "../provider/features/userClice";
import { useRouter } from "next/router";

function LoginForm() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const dispatch = useDispatch();
  const me = useSelector(user);
  const st = useSelector(status);
  const usererror = useSelector(userError);
  const router = useRouter();
  useEffect(() => {
    async function loader(params) {
      await dispatch(initialLoad())
      if (me !== null ) router.push("/");
    }
    loader()
  }, [me]);
  console.log(me);
  const subMitt = async () => {
    if (!email || !password) {
      dispatch(
        setNotification({
          msg: "All field must be field up",
          icon: <CancelPresentationIcon />,
          open: true,
        })
      );
    }
    await dispatch(
      login({
        email,
        password,
      })
    );
  };
  useEffect(()=>{
    if (st !== "failed") return
     async function load(){
      await dispatch(
        setNotification({
          msg: usererror,
          icon: <GppBadIcon />,
          open: true,
        })
      );
      dispatch(cleareUserErr())
    }
    load()
  },[st])
  return (
    <div className="space-y-5 flex flex-col items-center">
      <TextField
        onChange={(e) => setemail(e.target.value)}
        id="outlined-basic"
        label="E-mail"
        focused
        fullWidth
        variant="outlined"
        style={{
          color:'whitesmoke'
        }}
        size="small"
      />
      <TextField
        onChange={(e) => setpassword(e.target.value)}
        id="outlined-basic"
        label="Password"
        focused
        fullWidth
        variant="outlined"
        type="password"
        
        size="small"
      />
      <button
        onClick={subMitt}
        disabled={st === "pending" ? true : false}
        className="bg-blue-800 rounded-md px-3 py-1 text-slate-300 font-sans font-medium text-xl"
      >
        {st === "pending" ? <CircularProgress /> : "Login"}
      </button>
    </div>
  );
}

export default LoginForm;
