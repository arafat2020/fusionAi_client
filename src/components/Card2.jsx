import React, { useEffect, useRef, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LazyLoad from "react-lazy-load";
import useReact from "../hooks/useReact";
import { useDispatch, useSelector } from "react-redux";
import { token, user } from "../provider/features/userClice";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import WidgetsIcon from "@mui/icons-material/Widgets";
import SecurityIcon from "@mui/icons-material/Security";
import { setNotification } from "../provider/features/notifySlice";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/joy";
import useObserver from "../hooks/useObserver";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import { setModel } from "../provider/features/modelSlice";
import GroupModel from "./model/GroupModel";

function Card2({ obj }) {
  const fr = obj.width / obj.height;
  const [Onmous, setOnmous] = useState(false);
  const [likes, setlikes] = useState();
  const [loves, setloves] = useState();
  const [dislikes, setdislikes] = useState();
  const { loading, reactAction } = useReact();
  const tk = useSelector(token);
  const me = useSelector(user);
  const dispatch = useDispatch();
  const router = useRouter();
  const componentRef = useRef(null);
  const { isInviewport } = useObserver({ componentRef: componentRef });
  const [imgLoad, setImgLoad] = useState(true);
  const imgImstance = new Image();
  if (isInviewport) {
    imgImstance.src = obj?.img;
    imgImstance.onload = () => {
      console.log("load end");
      setImgLoad(false);
    };
    imgImstance.onerror = () => {
      console.log("error loading img");
    };
  }
  // console.log(imgLoad);
  useEffect(() => {
    async function loader() {
      await setlikes(() =>
        obj.react?.filter((e) => {
          return e.type === "like";
        })
      );
      await setloves(() =>
        obj.react?.filter((e) => {
          return e.type === "love";
        })
      );
      await setdislikes(() =>
        obj.react?.filter((e) => {
          return e.type === "dislike";
        })
      );
    }
    loader();
  }, [obj]);

  //   console.log(likes, loves, dislikes, res);
  function notice(params) {
    dispatch(
      setNotification({
        msg: "Authentication required",
        icon: <SecurityIcon />,
        open: true,
      })
    );
  }
  // console.log(Onmous);

  return (
    <div
      className={`${fr > 1 ? "grid_wide" : "grid_tall"} relative rounded-md `}
    >
      {imgLoad && (
        <div className="absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
          <CircularProgress size="md" color="primary" />
        </div>
      )}
      <div
        onMouseOver={() => setOnmous(true)}
        onMouseOut={() => setOnmous(false)}
        ref={componentRef}
        style={{
          backgroundImage: `url(${isInviewport ? obj?.img : ""})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className={`rounded-md relative w-full h-full ${
          loading ? "opacity-60" : "opacity-100"
        }  ${imgLoad ? "blur-md" : "blur-0"}`}
      >
        <div className="top-0 left-0 absolute rounded-md w-full h-full  transition ">
          <div
            className={`absolute top-2 sm:top-5 left-3 flex flex-col space-y-8  items-center transition
        ${Onmous ? "scale-100" : "scale-0"}
        `}
          >
            <button
              disabled={loading}
              onClick={() => {
                if (tk) {
                  reactAction({
                    token: tk,
                    artId: obj.id,
                  });
                } else {
                  notice();
                }
              }}
              className="transition hover:scale-125"
            >
              <ThumbUpIcon
                fontSize="large"
                color={`${
                  likes?.find((e) => e.artistId === me?.user.id)
                    ? "primary"
                    : "action"
                }`}
              />
            </button>
            <button
              disabled={loading}
              onClick={() => {
                if (tk) {
                  reactAction({
                    token: tk,
                    artId: obj.id,
                    type: "love",
                  });
                } else {
                  notice();
                }
              }}
              className="transition hover:scale-125"
            >
              <FavoriteIcon
                fontSize="large"
                color={`${
                  loves?.find((e) => e.artistId === me?.user.id)
                    ? "primary"
                    : "action"
                }`}
              />
            </button>
            <button
              disabled={loading}
              onClick={() => {
                if (tk) {
                  reactAction({
                    token: tk,
                    artId: obj.id,
                    type: "dislike",
                  });
                } else {
                  notice();
                }
              }}
              className="transition hover:scale-125"
            >
              <ThumbDownIcon
                fontSize="large"
                color={`${
                  dislikes?.find((e) => e.artistId === me?.user.id)
                    ? "primary"
                    : "action"
                }`}
              />
            </button>
          </div>
          <div className="absolute bottom-2 right-2 glassBg p-1 rounded-full cursor-pointer">
            <LazyLoad>
              <img
                src={obj.Artist?.profilePic}
                alt="profilePic"
                className="w-[35px] h-[35px] rounded-full"
              />
            </LazyLoad>
          </div>
        </div>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          icon={
            <WidgetsIcon
              sx={{
                color: "rgb(36, 60, 128)",
              }}
              fontSize="large"
            />
          }
          sx={{ position: "absolute", top: 5, right: 5 }}
          direction="left"
        >
          <SpeedDialAction
            onClick={() => {
              router.push(`/gallery?id=${obj.id}`);
            }}
            icon={<ImageIcon color="primary" />}
            tooltipTitle="View image"
          />
          <SpeedDialAction
            icon={<NewspaperIcon color="primary" />}
            tooltipTitle="Go to Post"
            onClick={() => router.push(`/feed?id=${obj.id}`)}
          />
          {tk && (
            <SpeedDialAction
              icon={<WorkspacesIcon color="primary" />}
              onClick={() =>
                dispatch(
                  setModel({
                    component: <GroupModel artID={obj.id} imgUrl={obj.img} />,
                    title: "Add to a Group",
                  })
                )
              }
              tooltipTitle="Add to Group"
            />
          )}
        </SpeedDial>
      </div>
    </div>
  );
}

export default Card2;
