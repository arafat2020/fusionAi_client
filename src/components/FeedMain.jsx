import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feedOverview, fetchFeed } from "../provider/features/feedslice";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material//ThumbUpAltOutlined";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { CircularProgress, Tooltip } from "@mui/joy";
import Loader2 from "./loder/Loader2";
import Cmt from "../components/Cmt";
import useCmt from "../hooks/useCmt";
import { token, user } from "../provider/features/userClice";
import { setNotification } from "../provider/features/notifySlice";
import SecurityIcon from "@mui/icons-material/Security";
import { httptoHttps } from "../lib/commons";
import usePostReact from "../hooks/useReactPost";
import FvButton from "../components/FvButton";

function FeedMain({ id }) {
  const dispatch = useDispatch();
  const feed = useSelector(feedOverview);
  const tk = useSelector(token);
  const me = useSelector(user);
  const [cmt, setcmt] = useState();
  const [likes, setlikes] = useState();
  const [loves, setloves] = useState();
  const [dislikes, setdislikes] = useState();
  const [imgLoad, setimgLoad] = useState(true);
  useEffect(() => {
    if (id) dispatch(fetchFeed(id));
  }, [id]);
  useEffect(() => {
    async function loader() {
      await setlikes(() =>
        feed.react?.filter((e) => {
          return e.type === "like";
        })
      );
      await setloves(() =>
        feed.react?.filter((e) => {
          return e.type === "love";
        })
      );
      await setdislikes(() =>
        feed.react?.filter((e) => {
          return e.type === "dislike";
        })
      );
    }
    loader();
  }, [feed]);
  const { postCmt, ld, err } = useCmt();
  const { reactAction, loading, err: postreactErr, res } = usePostReact();
  console.log(res);
  function notice() {
    dispatch(
      setNotification({
        msg: "Authentication required. Please login or signup",
        icon: <SecurityIcon />,
        open: true,
      })
    );
  }
  return (
    <div className="w-full h-full  flex flex-col items-center md:flex-row md:justify-around ">
      {feed.loading ? (
        <Loader2 />
      ) : (
        <>
          <div className="w-[95%] md:w-[47%] h-[80%] md:h-full relative mb-3 sm:mb-0">
            <div className="w-full h-[90%] flex justify-between items-center  overflow-scroll scrollbar-hide rounded-md">
              {imgLoad && (
                <div className="absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <CircularProgress size="lg" color="neutral" />
                </div>
              )}
              <img
                onLoad={() => setimgLoad(false)}
                className={`rounded-md ${imgLoad ? "blur-md" : "blur-0"}`}
                src={httptoHttps(feed.post.img)}
                alt=""
                srcset=""
              />
              <div className="absolute z-10 left-2 bottom-[4.5rem]">
                <Typography variant="h4" color="InfoBackground">
                  {feed.post.tag}
                </Typography>
                <Typography variant="caption" color="InfoBackground">
                  Loved by {feed.loveCount}, likes {feed.likeCount}
                </Typography>
              </div>
            </div>
            <div className="w-full h-[10%] flex flex-col sm:flex-row justify-between p-2 sm:items-center">
              <div>
                <Tooltip title="Like">
                  <IconButton
                    disabled={loading ? true : false}
                    onClick={() => {
                      if (tk) {
                        reactAction({
                          artId: feed.post.id,
                          token: tk,
                          type: "like",
                        });
                      } else {
                        notice();
                      }
                    }}
                  >
                    {likes?.find((e) => e.artistId === me?.user.id) ? (
                      <ThumbUpAltRoundedIcon
                        color="primary"
                        fontSize="medium"
                      />
                    ) : (
                      <ThumbUpAltOutlinedIcon
                        color="primary"
                        fontSize="medium"
                      />
                    )}
                  </IconButton>
                </Tooltip>
                <Typography variant="caption" color="InfoBackground">
                  {feed.likeCount}
                </Typography>
                <Tooltip title="Love">
                  <IconButton
                    disabled={loading ? true : false}
                    onClick={() => {
                      if (tk) {
                        reactAction({
                          artId: feed.post.id,
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
                      <FavoriteBorderOutlinedIcon
                        color="primary"
                        fontSize="medium"
                      />
                    )}
                  </IconButton>
                </Tooltip>
                <Typography variant="caption" color="InfoBackground">
                  {feed.loveCount}
                </Typography>
                <Tooltip title="Dislike">
                  <IconButton
                    disabled={loading ? true : false}
                    onClick={() => {
                      if (tk) {
                        reactAction({
                          artId: feed.post.id,
                          token: tk,
                          type: "dislike",
                        });
                      } else {
                        notice();
                      }
                    }}
                  >
                    {dislikes?.find((e) => e.artistId === me?.user.id) ? (
                      <ThumbDownAltRoundedIcon
                        color="primary"
                        fontSize="medium"
                      />
                    ) : (
                      <ThumbDownAltOutlinedIcon
                        color="primary"
                        fontSize="medium"
                      />
                    )}
                  </IconButton>
                </Tooltip>
                <Typography variant="caption" color="InfoBackground">
                  {feed.dislikeCount}
                </Typography>
              </div>
              <FvButton id={feed.post.id} />
            </div>
          </div>
          <div className="w-[90%] mt-10 sm:mt-0  md:w-[47%] h-full flex flex-col justify-around">
            <div className="w-full h-[80%] overflow-scroll scrollbar-hide flex flex-col space-y-2">
              {feed.cmt?.map((e) => {
                return (
                  <div key={e.id}>
                    <Cmt
                      cmt={e.commet}
                      img={e.Artist.profilePic}
                      date={e.date}
                      userid={e.Artist.id}
                      cmtId={e.id}
                      name={e.Artist.name}
                    />
                  </div>
                );
              })}
            </div>
            <div
              className={`w-full max-h-[15%] min-h-[70px] flex space-x-2  items-center glassBg p-2 rounded-md`}
            >
              <TextField
                type="text"
                id="outlined-basic"
                label="Post a comment"
                focused
                fullWidth
                variant="outlined"
                onChange={(e) => setcmt(e.target.value)}
              />
              <Button
                onClick={() => {
                  if (tk) {
                    postCmt({
                      token: tk,
                      artId: feed.post.id,
                      cmt: cmt,
                    });
                  } else {
                    notice();
                  }
                }}
                variant="outlined"
                endIcon={
                  <AddCommentOutlinedIcon color="primary" fontSize="large" />
                }
                sx={{
                  height: "40px",
                }}
                disabled={ld || !cmt ? true : false}
              >
                {ld ? <CircularProgress /> : "Post"}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FeedMain;
