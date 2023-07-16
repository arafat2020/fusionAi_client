import Main from "../components/Main";
import MeIndex from "../components/MeIndex";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button, CircularProgress, TextField } from "@mui/material";
import Input from "@mui/joy/Input";
import GppBadIcon from "@mui/icons-material/GppBad";

import React, { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { token } from "../provider/features/userClice";
import {
  clearErr,
  createMyArt,
  err,
  loading,
  status,
} from "../provider/features/myartSlice";
import { notify, setNotification } from "../provider/features/notifySlice";

function Me() {
  const [open, setopen] = useState(false);
  const [url, seturl] = useState(false);
  const tkn = useSelector(token);
  const st = useSelector(status);
  const [form, setform] = useState({
    img: "",
    tag: "",
    prompt: "",
    negetivePrompt: "",
    chackPoint: "",
    lora: "",
    CFGscale: 0,
    Clip_skip: 0,
    hide: false,
    nsfw: false,
    Seed: 0,
    Sampler: "",
    Steps: 0,
    token: tkn,
  });
  const ld = useSelector(loading);
  const error = useSelector(err);
  const dispatch = useDispatch();
  useEffect(() => {
    async function loader() {
      if (!error) return;
      await dispatch(
        setNotification({
          msg: error,
          icon: <GppBadIcon />,
          open: true,
        })
      );
      dispatch(clearErr());
    }
    loader();
  }, [error]);
  useEffect(() => {
    if (ld) return;
    if (st === "ok")
      setform({
        img: "",
        tag: "",
        prompt: "",
        negetivePrompt: "",
        chackPoint: "",
        lora: "",
        CFGscale: 0,
        Clip_skip: 0,
        hide: false,
        nsfw: false,
        Seed: 0,
        Sampler: "",
        Steps: 0,
        token: tkn,
      });
    document.getElementById("frm").reset();
  }, [st, ld]);
  async function imageToBase64(file) {
    const reader = new FileReader();
    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    }
    reader.onload = async () => await setform({ ...form, img: reader.result });
    reader.onerror = (error) => console.log(error);
  }
  return (
    <div className="w-full h-full relative">
      <Main incert={<MeIndex />} />
      {open === false && (
        <Button
          onClick={() => setopen(() => !open)}
          variant="outlined"
          className="!absolute right-4 bottom-4"
          endIcon={<AddAPhotoIcon />}
        >
          Add Art
        </Button>
      )}
      <form
        id="frm"
        className={` w-4/5 sm:w-1/3  h-full glassBg3 absolute right-4 bottom-4 transition ${
          open ? "scale-[1]" : "scale-0"
        }`}
      >
        <div className="flex space-x-3 m-2 mt-6 ">
          {url ? (
            <Input
              id="outlined-basic"
              placeholder="Past url"
              size="sm"
              fullWidth
              variant="solid"
              type="text"
              color="primary"
              onChange={async (e) => {
                setform({
                  ...form,
                  img: e.target.value,
                });
              }}
            />
          ) : (
            <Input
              id="outlined-basic"
              placeholder="Image (Required)"
              size="sm"
              fullWidth
              variant="solid"
              type="file"
              color="primary"
              onChange={async (e) => {
                await imageToBase64(e.target.files[0]);
              }}
            />
          )}
          <Input
            id="outlined-basic"
            placeholder="Tag"
            size="sm"
            fullWidth
            variant="solid"
            type="text"
            color="primary"
            onChange={(e) => {
              setform({
                ...form,
                tag: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex space-x-3 m-2 mt-6">
          <TextField
            id="outlined-basic"
            label="is NSFW"
            focused
            fullWidth
            variant="outlined"
            type="checkbox"
            onChange={(e) => {
              setform({
                ...form,
                nsfw: e.target.checked,
              });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Hide for Now"
            focused
            fullWidth
            variant="outlined"
            type="checkbox"
            onChange={(e) => {
              setform({
                ...form,
                hide: e.target.checked,
              });
            }}
          />
        </div>
        <div className="flex space-x-3 m-2 mt-6">
          <Input
            id="outlined-basic"
            placeholder="Prompt (Required)"
            focused
            fullWidth
            variant="solid"
            color="primary"
            size="sm"
            type="text"
            onChange={(e) => {
              setform({
                ...form,
                prompt: e.target.value,
              });
            }}
          />
          <Input
            id="outlined-basic"
            placeholder="Nagative Prompt"
            focused
            fullWidth
            variant="solid"
            color="primary"
            size="sm"
            type="text"
            onChange={(e) => {
              setform({
                ...form,
                negetivePrompt: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex space-x-3 m-2 mt-6">
          <Input
            id="outlined-basic"
            placeholder="Sampler"
            focused
            fullWidth
            variant="solid"
            color="primary"
            size="sm"
            type="text"
            onChange={(e) => {
              setform({
                ...form,
                Sampler: e.target.value,
              });
            }}
          />
          <Input
            id="outlined-basic"
            placeholder="CFGscale"
            focused
            fullWidth
            v
            variant="solid"
            color="primary"
            size="sm"
            type="number"
            onChange={(e) => {
              setform({
                ...form,
                CFGscale: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex space-x-3 m-2 mt-6">
          <Input
            id="outlined-basic"
            placeholder="Steps"
            focused
            fullWidth
            variant="solid"
            color="primary"
            size="sm"
            type="number"
            onChange={(e) => {
              setform({
                ...form,
                Steps: e.target.value,
              });
            }}
          />
          <Input
            id="outlined-basic"
            placeholder="Seed"
            focused
            fullWidth
            variant="solid"
            color="primary"
            size="sm"
            type="number"
            onChange={(e) => {
              setform({
                ...form,
                Seed: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex space-x-3 m-2 mt-6">
          <Input
            id="outlined-basic"
            placeholder="Clip_scip"
            focused
            fullWidth
            variant="solid"
            color="primary"
            size="sm"
            type="number"
            onChange={(e) => {
              setform({
                ...form,
                Clip_skip: e.target.value,
              });
            }}
          />
          <Input
            id="outlined-basic"
            placeholder="Lora"
            focused
            fullWidth
            variant="solid"
            color="primary"
            size="sm"
            type="text"
            onChange={(e) => {
              setform({
                ...form,
                lora: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex space-x-3 m-2 mt-6">
          <Input
            id="outlined-basic"
            placeholder="chackPoint"
            focused
            fullWidth
            variant="solid"
            color="primary"
            size="sm"
            type="text"
            onChange={(e) => {
              setform({
                ...form,
                chackPoint: e.target.value,
              });
            }}
          />
          <TextField
            id="outlined-basic"
            label="is URL"
            focused
            fullWidth
            value={url}
            variant="outlined"
            type="checkbox"
            onChange={(e) => {
              seturl(e.target.checked);
            }}
          />
        </div>
        <div className=" w-full flex justify-around ">
          <Button
            variant="outlined"
            className="font-bold"
            endIcon={<AddCircleIcon />}
            disabled={ld ? true : false}
            onClick={() => {
              dispatch(createMyArt(form));
            }}
          >
            {st === "pending" ? <CircularProgress /> : "Add"}
          </Button>
          <Button
            onClick={() => setopen(() => !open)}
            variant="outlined"
            className="font-bold"
            endIcon={<HighlightOffIcon />}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Me;
