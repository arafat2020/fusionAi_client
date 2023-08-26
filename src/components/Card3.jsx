import React, { useEffect, useState } from "react";
import "intersection-observer";
import { useRef } from "react";
import { CircularProgress } from "@mui/joy";
import ImageIcon from "@mui/icons-material/Image";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";

function Card3({ obj }) {
  const [isInviewport, setisInviewport] = useState(false);
  const componentRef = useRef();
  const [imgLoad, setimgLoad] = useState(true);
  const router = useRouter();
const [onMouseOut, setonMouseOut] = useState(false)
  console.log(obj);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setisInviewport(true);
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "0px", // No margin
        threshold: 0.5, // Trigger at 50% visibility
      }
    );
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }
    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);
  const imageInstance = new Image();
  imageInstance.src = obj?.Art.img;
  imageInstance.onload = () => {
    setimgLoad(false);
  };
  imageInstance.onerror = () => {
    console.log("Image Load failed");
  };
  console.log(isInviewport);
  return (
   <div className="grid_wide relative">
    {imgLoad && (
        <div className="absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
          <CircularProgress size="md" color="primary" />
        </div>
      )}
     <div
      onMouseOver={() => setonMouseOut(true)}
      onMouseOut={() => setonMouseOut(false)}
      ref={componentRef}
      style={{
        backgroundImage: `url(${isInviewport ? obj?.Art.img : ""})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className={`w-ful h-full rounded-md relative linierBg2 ${imgLoad?'blur-md':'blur-0'}`}
    >
      
      <div
        className={`absolute w-full h-full top-0 left-0 flex justify-around items-center
        transition linierBg2  ${onMouseOut?'scale-x-100':'scale-x-0'}`}
      >
        <div className="flex  space-x-3 ">
          <Tooltip title="View Image" className="w-[50px] h-[50px]">
            <IconButton
              onClick={() => {
                router.push(`/gallery?id=${obj?.Art.id}`);
              }}
              // disabled={st === "pending" ? true : false}
            >
              <ImageIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="View Image as Post" className="w-[50px] h-[50px]">
            <IconButton
              onClick={() => router.push(`/feed?id=${obj?.Art.id}`)}
              //  disabled={st === "pending" ? true : false}
            >
              <NewspaperIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove From favorite">
            <IconButton>
              <DeleteIcon color="primary" fontSize="large"/>
            </IconButton>
          </Tooltip>
        </div>
        
      </div>
      <div className="absolute bottom-2 left-2 flex text-white items-center space-x-3">
          <Avatar src={obj?.Art.Artist.profilePic} alt="profile pic"/>
          <div>
            <Typography variant="subtitle2">Posted By {obj?.Art.Artist.name}</Typography>
            <Typography variant="caption">
            {obj?.Art.react?.length > 0 && obj?.Art.react?.length}{" "}
            {obj?.Art.react?.length > 0 && "people reacted to this post"}
            </Typography>
          </div>
        </div>
    </div>
   </div>
  );
}

export default Card3;
