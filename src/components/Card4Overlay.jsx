import { Checkbox } from "@mui/joy";
import { Avatar, Typography } from "@mui/material";
import React, { useRef } from "react";
import LzyAvater from "./LzyAvater";

function Card4Overlay({ open = false, obj, index, setindex }) {
  return (
    <div
      className={` w-full h-full glassBg rounded-md absolute top-0 transition-[.7s] left-0 z-10 ${
        open ? "translate-x-0" : "translate-x-[-105%]"
      }`}
    >
      <div className="flex items-center space-x-2 glassBg top-1 right-1 p-1 rounded-lg   absolute ">
        <Typography>
          <span className="capitalize font-sans text-white">Publised</span>
        </Typography>
        <Checkbox defaultChecked={obj.published} />
      </div>
      <div
        className="w-full h-full bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${
            obj.Group[index] ? obj.Group[index].Art.cmp : "/logo.jpg"
          })`,
        }}
      ></div>
      <div className="absolute top-2 left-2">
        <div className="flex capitalize text-white space-x-2 items-center">
          <Avatar
            src={obj?.Group[index]?.Art.Artist.profilePic}
            alt="profile pic"
          />
          <div>
            <Typography variant="h6">{obj?.Group[index]?.Art.tag}</Typography>
            <Typography variant="subtitle2">
              Posted By {obj?.Group[index]?.Art.Artist.name}
            </Typography>
            <Typography variant="caption">
              {obj?.Group[index]?.Art.react?.length > 0 &&
                obj?.Group[index]?.Art.react?.length}{" "}
              {obj?.Group[index]?.Art.react?.length > 0 &&
                "people reacted to this post"}
            </Typography>
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="w-full overflow-x-scroll scrollbar-hide absolute z-20 flex left-0 bottom-0 space-x-2 p-1">
          {open &&
            obj.Group.map((e, i) => {
              return (
                <div
                  className="cursor-pointer"
                  key={e.id}
                  onClick={() => setindex(parseInt(i))}
                >
                  <LzyAvater i={i} index={index} e={e} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Card4Overlay;
