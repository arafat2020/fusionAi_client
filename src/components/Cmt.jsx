import { CircularProgress, IconButton, Input } from "@mui/joy";
import { Avatar, Typography } from "@mui/material";
import React from "react";
import time from "time-ago";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useSelector } from "react-redux";
import { token, user } from "../provider/features/userClice";
import { useState } from "react";
import useCmt from "../hooks/useCmt";

function Cmt({
  img = "https://res.cloudinary.com/dpsr1klam/image/upload/v1682272041/biy4cm8w9mq8zarscdyf.jpg",
  cmt = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum quas id quasi. Nihil, id provident! Modi non illum ad!",
  date = Date.now(),
  userid,
  cmtId,
  name,
}) {
  const person = useSelector(user);
  const tk = useSelector(token);
  const [edit, setedit] = useState(false);
  const [newcmt, setnewcmt] = useState(cmt);
  const { ld, err, updateCmt, deleteCmt } = useCmt();
  return (
    <div className="w-[90] flex justify-between glassBg p-2 rounded-lg">
      <div className="flex space-x-2 w-full">
        <Avatar alt="avater" src={img} />
        <div>
          {edit ? (
            <Input
              title="Edit Comment"
              defaultValue={cmt}
              type="text"
              onChange={(e) => setnewcmt(e.target.value)}
            />
          ) : (
            <>
              <Typography variant="caption" color="GrayText">
                {name}
              </Typography>
              <Typography variant="subtitle1" color="InfoBackground">
                {cmt}
              </Typography>
            </>
          )}
          <Typography variant="caption" color="GrayText">
            {time.ago(date)}
          </Typography>
        </div>
      </div>

      {person?.user.id === userid && (
        <div className="flex space-x-2">
          {ld ? (
            <CircularProgress />
          ) : (
            <>
              <IconButton
                onClick={() => {
                  setedit((state) => !state);
                  if (cmt !== newcmt) {
                    updateCmt({
                      token: tk,
                      cmt: newcmt,
                      cmtId,
                    });
                  }
                }}
                sx={{
                  height: "50px",
                }}
              >
                <BorderColorRoundedIcon fontSize="medium" />
              </IconButton>
              <IconButton
                sx={{
                  height: "50px",
                }}
                onClick={() =>
                  deleteCmt({
                    token: tk,
                    cmtID: cmtId,
                  })
                }
              >
                <DeleteRoundedIcon fontSize="medium" color="error" />
              </IconButton>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Cmt;
