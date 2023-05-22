import Trash from "@/icon/Trash";
import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import LazyLoad from "react-lazy-load";
import ImageIcon from "@mui/icons-material/Image";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { useDispatch, useSelector } from "react-redux";
import { token } from "@/provider/features/userClice";
import { deleteArt, status } from "@/provider/features/myartSlice";
import { useRouter } from "next/router";


function Card({ obj }) {
  const dispatch = useDispatch();
  const tk = useSelector(token);
  const st = useSelector(status);
  const router = useRouter()
  const fr = obj.width / obj.height;
  console.log(obj);
  return (
    <div
      aria-disabled={st === "pending" ? true : false}
      className={`card w-auto h-auto overflow-hidden relative rounded-md ${
        fr > 1 ? "grid_wide" : "grid_tall"
      } ${st === "pending" ? "opacity-50" : "opacity-[1]"}`}
      style={{
        backgroundImage: `url(${obj?.img})`,
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
        <div className="overlay  scale-0 glassBg w-full h-full rounded-md transition relative flex justify-around items-center">
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
            className="absolute cursor-pointer w-[40px] h-[40px] top-2 right-2 rounded-full p-2 bg-red-600  text-white"
          >
            <Trash />
          </div>
          <div className="flex  space-x-3">
            <Tooltip title="View Image" className="w-[50px] h-[50px]">
              <IconButton
              onClick={() => {
                router.push(`/myart?id=${obj?.id}`)
               }}
                disabled={st === "pending" ? true : false}
              >
                <ImageIcon color="primary" fontSize="large" />
              </IconButton>
            </Tooltip>

            <Tooltip title="View Image as Post" className="w-[50px] h-[50px]">
              <IconButton
                disabled={st === "pending" ? true : false}
              >
                <NewspaperIcon color="primary" fontSize="large" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
