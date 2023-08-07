import { setNotification } from "../provider/features/notifySlice";
import { CircularProgress, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { initialLoad, register, status, user } from "../provider/features/userClice";
import { useRouter } from "next/router";

function SignUpForm() {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [about, setabout] = useState();
  const [password, setpassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const dispatch = useDispatch();
  const me = useSelector(user)
  console.log(me);
  const st = useSelector(status)
const router = useRouter()
  const [pic, setpic] = useState();
  async function imageToBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => await setpic(reader.result);
    reader.onerror = (error) => console.log(error);
  }
  useEffect(() => {
    async function loader(params) {
      await dispatch(initialLoad())
      if (me !== null ) router.push("/");
    }
    loader()
  }, [me]);
  function submitter() {
    if (!name || !email || !password || !about) {
      dispatch(
        setNotification({
          msg: "All reqired field must be field up",
          icon: <CancelPresentationIcon />,
          open: true,
        })
      );
      return;
    }
    if (password !== confirmPassword) {
      dispatch(
        setNotification({
          msg: "Password doesent match",
          icon: <CancelPresentationIcon />,
          open: true,
        })
      );
      return;
    }
    dispatch(
      register({
        name: name,
        baio: about,
        email: email,
        name: name,
        password: password,
        img: pic,
      })
    );
  }
  return (
    <div className="  space-y-2  sm:space-y-5 text-center">
      <div className="flex flex-col  space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
        <TextField
          onChange={(e) => setname(e.target.value)}
          id="outlined-basic"
          label="Name (Required)"
          focused
          fullWidth
          variant="outlined"
          size="small"
        />
        <TextField
          onChange={(e) => setemail(e.target.value)}
          id="outlined-basic"
          label="E-mail (Required)"
          focused
          fullWidth
          variant="outlined"
          size="small"
        />
      </div>
      <div className="flex flex-col  space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
        <TextField
          onChange={(e) => setpassword(e.target.value)}
          id="outlined-basic"
          label="Password (Required)"
          focused
          fullWidth
          variant="outlined"
          type="password"
          size="small"
        />
        <TextField
          onChange={(e) => setconfirmPassword(e.target.value)}
          id="outlined-basic"
          label="Conferm Password"
          focused
          fullWidth
          variant="outlined"
          type="password"
          size="small"
        />
      </div>
      <TextField
        onChange={(e) => setabout(e.target.value)}
        id="outlined-basic"
        label="About (Required)"
        focused
        fullWidth
        variant="outlined"
        type="text"
        size="small"
      />
      <div className="flex flex-col  space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
        <TextField
          onChange={(e) => setpic(e.target.value)}
          id="outlined-basic"
          label="Profile Pic link (For Now)"
          focused
          fullWidth
          variant="outlined"
          type="text"
          size="small"
          
        />
        <TextField
          onChange={async (e) => await imageToBase64(e.target.files[0])}
          id="outlined-basic"
          label="Upload s pic"
          focused
          fullWidth
          variant="outlined"
          type="file"
          size="small"
        />
      </div>
      <button
        onClick={submitter}
        className="bg-blue-800 rounded-md px-3 py-1 text-slate-300 font-sans font-medium text-xl"
      >
               {st === "pending" ? <CircularProgress /> : "Signup"}
               
      </button>
    </div>
  );
}

export default SignUpForm;
