import React, { useRef, useState } from "react";
import useImageLoad from "../hooks/useImageLoad";
import { Avatar, Checkbox, CircularProgress } from "@mui/joy";
import useObserver from "../hooks/useObserver";
import { Typography } from "@mui/material";
import { truncateString } from "../lib/truncate";
import dynamic from "next/dynamic";
import Loader2 from "./loder/Loader2";

const Card4Overlay = dynamic(() => import("./Card4Overlay"), {
  loading: () => <Loader2 />,
});

function Card4({ obj }) {
  const ref = useRef();
  const { isInviewport } = useObserver({ componentRef: ref });
  const [index, setindex] = useState(0);
  const { imgLoad } = useImageLoad({
    url: isInviewport
      ? obj.Group[0]
        ? obj.Group[0].Art.cmp
        : "./logo.jpg"
      : null,
  });
  const [open, setopen] = useState(false);
  return (
    <div className="grid_wide relative">
      {imgLoad && (
        <div className="absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
          <CircularProgress size="md" color="primary" />
        </div>
      )}
      <div
        ref={ref}
        style={{
          backgroundImage: `url(${
            isInviewport
              ? obj.Group[index]
                ? obj.Group[index].Art.cmp
                : "/logo.jpg"
              : ""
          })`,
        }}
        className={`w-full h-full rounded-md relative overflow-hidden bg-no-repeat bg-center  ${
          imgLoad ? "blur-md" : "blur-0"
        }`}
        onMouseOver={() => {
          if (imgLoad) return;
          setopen(true);
        }}
        onMouseOut={() => {
          if (imgLoad) return;
          setopen(false);
        }}
      >
        <div className="w-full h-full glassBg rounded-md">
          {open && (
            <Card4Overlay
              open={open}
              obj={obj}
              index={index}
              setindex={setindex}
            />
          )}
          <div className="flex w-full h-full justify-around items-center">
            <div
              style={{
                backgroundImage: `url(${
                  isInviewport
                    ? obj.Group[index]
                      ? obj.Group[index].Art.cmp
                      : "/logo.jpg"
                    : ""
                })`,
              }}
              className="w-[35%] h-[90%] bg-no-repeat bg-center rounded-md glassBg"
            ></div>
            <div className="w-[60%]">
              <Typography variant="h6">
                <span className="capitalize text-white">
                  {" "}
                  {truncateString(obj.name, 25)}
                </span>
              </Typography>
              <Typography variant="caption">
                <span className="capitalize text-white">
                  Total Image: {obj.Group?.length}
                </span>
              </Typography>
              <div className="flex items-center space-x-2">
                <Avatar src={isInviewport ? obj.Artist.profilePic : ""} />
                <Typography variant="caption">
                  <span className="capitalize text-white">
                    {obj.Artist.name}
                  </span>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card4;
