import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material//ThumbUpAltOutlined";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { token, user } from "../provider/features/userClice";
import useReact from "../hooks/useReact";
import Cmt from "../components/Cmt";

function FeedCard({ obj }) {
  console.log(obj);
  const [likes, setlikes] = useState([]);
  const [loves, setloves] = useState([]);
  const [dislikes, setdislikes] = useState([]);
  const me = useSelector(user);
  const tk = useSelector(token);
  const { reactAction, loading } = useReact();

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
  return (
    <div className="m-auto max-w-[700px] min-w-[300px] glassBg mb-3 p-1 sm:p-3">
      <div className="flex mb-3 space-x-2 items-center">
        <Avatar src={obj?.Artist.profilePic} />
        <Typography variant="caption" color="GrayText">
          {obj?.Artist.name}
        </Typography>
      </div>
      <div className="w-full h-auto max-h-[500px] rounded-md overflow-scroll scrollbar-hide">
        <img src={obj?.img} alt="Art Img" className="rounded-md" />
      </div>
      <div className="mt-3">
        <Tooltip title="Like">
          <IconButton
            disabled={loading ? true : false}
            onClick={() => {
              if (tk) {
                reactAction({
                  artId: obj?.id,
                  token: tk,
                  type: "like",
                });
              } else {
                notice();
              }
            }}
          >
            {likes?.find((e) => e.artistId === me?.user.id) ? (
              <ThumbUpAltRoundedIcon color="primary" fontSize="medium" />
            ) : (
              <ThumbUpAltOutlinedIcon color="primary" fontSize="medium" />
            )}
          </IconButton>
        </Tooltip>
        <Typography variant="caption" color="InfoBackground">
          {likes.length}
        </Typography>
        <Tooltip title="Love">
          <IconButton
            disabled={loading ? true : false}
            onClick={() => {
              if (tk) {
                reactAction({
                  artId: obj?.id,
                  token: tk,
                  type: "love",
                });
              } else {
                notice();
              }
            }}
          >
            {loves?.find((e) => e.artistId === me?.user.id) ? (
              <FavoriteIcon color="primary" fontSize="medium" />
            ) : (
              <FavoriteBorderOutlinedIcon color="primary" fontSize="medium" />
            )}
          </IconButton>
        </Tooltip>
        <Typography variant="caption" color="InfoBackground">
          {loves.length}
        </Typography>
        <Tooltip title="Dislike">
          <IconButton
            disabled={loading ? true : false}
            onClick={() => {
              if (tk) {
                reactAction({
                  artId: obj?.id,
                  token: tk,
                  type: "dislike",
                });
              } else {
                notice();
              }
            }}
          >
            {dislikes?.find((e) => e.artistId === me?.user.id) ? (
              <ThumbDownAltRoundedIcon color="primary" fontSize="medium" />
            ) : (
              <ThumbDownAltOutlinedIcon color="primary" fontSize="medium" />
            )}
          </IconButton>
        </Tooltip>
        <Typography variant="caption" color="InfoBackground">
          {dislikes.length}
        </Typography>
      </div>
      {obj?.comment.length > 0 && (
         <Typography variant="caption" color="GrayText">
        Leatest Comment from This Post
       </Typography>
      )}
      {obj?.comment.length > 0 && (
        <Cmt
          cmtId={obj?.comment[0].id}
          name={obj?.comment[0].Artist.name}
          userid={obj?.comment[0].Artist.id}
          cmt={obj?.comment[0].commet}
          date={obj?.comment[0].date}
          img={obj?.comment[0].Artist.profilePic}
          key={obj?.comment[0].id}
        />
      )}
    </div>
  );
}

export default FeedCard;
