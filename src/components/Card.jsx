import Trash from "../icon/Trash";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import LazyLoad from "react-lazy-load";
import ImageIcon from "@mui/icons-material/Image";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { useDispatch, useSelector } from "react-redux";
import { token } from "../provider/features/userClice";
import { deleteArt, status } from "../provider/features/myartSlice";
import { useRouter } from "next/router";
import useObserver from "../hooks/useObserver";

function Card({ obj }) {
  const dispatch = useDispatch();
  const tk = useSelector(token);
  const st = useSelector(status);
  const ref = useRef();
  const [imgload, setimgload] = useState(true);
  const { isInviewport } = useObserver({ componentRef: ref });
  const router = useRouter();
  const fr = obj.width / obj.height;
  const imgInstance = new Image();
  imgInstance.src = isInviewport && obj?.img;
  imgInstance.onload = () => {
    if (isInviewport) setimgload(false);
  };
  return (
    <div
      ref={ref}
      aria-disabled={st === "pending" ? true : false}
      className={`card w-auto h-auto overflow-hidden relative rounded-md 
      ${fr > 1 ? "grid_wide" : "grid_tall"} 
      ${st === "pending" ? "opacity-50" : "opacity-[1]"} 
      ${imgload ? "blur-md" : "blur-0"}
      `}
      style={{
        backgroundImage: `url(${isInviewport ? obj?.img : ""})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <LazyLoad >
        <img
          className={`rounded-md object-center w-full h-full `}
          src={obj?.img}
          alt="art"
        />
      </LazyLoad> */}
      <div className=" top-0 left-0 w-full h-full absolute rounded-md  ">
        <div className="overlay  scale-0 linierBg w-full h-full rounded-md relative flex justify-around items-center">
          <Tooltip title="Delete">
            <div
              onClick={() =>
                dispatch(
                  deleteArt({
                    token: tk,
                    img: obj.img,
                    id: obj.id,
                  })
                )
              }
              className="absolute cursor-pointer w-[40px] h-[40px] top-2 right-2 rounded-full p-2 border border-blue-700  text-blue-700 hover:border-none hover:bg-red-600 hover:text-white transition"
            >
              <Trash />
            </div>
          </Tooltip>
          <div className="flex  space-x-3">
            <Tooltip title="View Image" className="w-[50px] h-[50px]">
              <IconButton
                onClick={() => {
                  router.push(`/myart?id=${obj?.id}`);
                }}
                disabled={st === "pending" ? true : false}
              >
                <ImageIcon color="primary" fontSize="large" />
              </IconButton>
            </Tooltip>

            <Tooltip title="View Image as Post" className="w-[50px] h-[50px]">
              <IconButton
                onClick={() => router.push(`/feed?id=${obj?.id}`)}
                disabled={st === "pending" ? true : false}
              >
                <NewspaperIcon color="primary" fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="absolute left-2 bottom-1 capitalize text-white">
          <Typography variant="h6">{obj.tag}</Typography>
          <Typography variant="caption">
            {obj.react?.length > 0 && obj.react?.length}{" "}
            {obj.react?.length > 0 && "people reacted to your post"}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Card;
