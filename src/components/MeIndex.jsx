import { truncateString } from "../lib/truncate";
import { removeUser, token, user } from "../provider/features/userClice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import time from "time-ago";
import LogoutIcon from "@mui/icons-material/Logout";
import dynamic from "next/dynamic";
import {
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UserOnly from "./protected/UserOnly";
import {
  clearMyArt,
  fetchMyPost,
  loading,
  myart,
} from "../provider/features/myartSlice";
const Card = dynamic(()=>import('./Card'),{
  loading:()=><h6 className="text-white font-sans">Loading........</h6>
});
import Loader2 from "./loder/Loader2";
import LazyLoad from "react-lazy-load";
import {
  clearMyFb,
  fetchMyFovarite,
  myFv,
  myFvLd,
} from "../provider/features/myfovarite";
const Card3 = dynamic(()=>import('./Card3'),{
  loading:()=><h6 className="text-white font-sans">Loading........</h6>
});;
import {
  fetchMyGroup,
  myGroup,
  loading as myGrLoad,
} from "../provider/features/myGroup";
const Card4 = dynamic(()=>import('./Card4'),{
  loading:()=><h6 className="text-white font-sans">Loading........</h6>
});;
import { useTransition } from "react";

function MeIndex() {
  const me = useSelector(user);
  const tk = useSelector(token);
  const ld = useSelector(loading);
  const dispath = useDispatch();
  const art = useSelector(myart);
  const FvLd = useSelector(myFvLd);
  const myGrLD = useSelector(myGrLoad);
  const myfovarite = useSelector(myFv);
  const myGr = useSelector(myGroup);
  const [view, setview] = useState("Showcase");
  const [trload, startTrnsition] = useTransition();

  useEffect(() => {
    if (!tk ) return;
    dispath(fetchMyPost({ token: tk }));
    dispath(fetchMyFovarite(tk));
    dispath(fetchMyGroup({ tk }));
  }, [tk]);
  // console.log(myGr);
  return (
    <UserOnly>
      <div className="w-full h-full overflow-scroll scrollbar-hide">
        <div className="w-full h-1/3  relative">
          <div className="absolute top-0 left-0  w-full h-full rounded-none flex justify-around items-center">
            <div>
              <LazyLoad>
                <img
                  src={me?.user.profilePic}
                  alt="pic"
                  className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full  sm:border-[2px] border-blue-700  m-5"
                />
              </LazyLoad>
            </div>
            <div className="w-3/5 sm:w-4/5 h-full space-y-1 flex flex-col ml-7 mt-5">
              <Typography variant="h3" color="gainsboro">
                {truncateString(me?.user.name, 15)}
              </Typography>
              <Typography variant="subtitle1" color="GrayText">
                {truncateString(me?.user.baio, 50)}
              </Typography>
              <Typography variant="caption" color="GrayText">
                Joined {time.ago(me?.user.jonedAt)}
              </Typography>

              <Button
                onClick={() => {
                  dispath(removeUser());
                  dispath(clearMyArt());
                  dispath(clearMyFb());
                }}
                disabled={ld && FvLd}
                className=" font-bold w-[200px] !hidden sm:!inline-flex"
                variant="outlined"
                color="primary"
                startIcon={<LogoutIcon />}
              >
                {ld && FvLd ? <CircularProgress /> : "Logout"}
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full h-2/3 ">
          <div className="w-full max-h-full ">/
            <div className="flex flex-col sm:flex-row space-y-2  w-full justify-around items-center sm:mt-2">
              <FormControl
                className="glassBg !py-2 !px-2 rounded-md flex-[.5] "
                variant="outlined"
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select View Type"
                  variant="standard"
                  style={{
                    color: "whitesmoke",
                    height: "40px",
                    fontSize: "25px",
                  }}
                  value={view}
                  onChange={(e) =>
                   setview(e.target.value)
                  }
                >
                  <MenuItem
                    style={{
                      color: "whitesmoke",
                      fontSize: "15px",
                    }}
                    value={"Showcase"}
                  >
                    Your Showcase
                  </MenuItem>
                  <MenuItem
                    style={{
                      color: "whitesmoke",
                      fontSize: "15px",
                    }}
                    value={"Favourite"}
                  >
                    Your Favourite
                  </MenuItem>
                  <MenuItem
                    style={{
                      color: "whitesmoke",
                      fontSize: "15px",
                    }}
                    value={"Group"}
                  >
                    Your Group
                  </MenuItem>
                </Select>
              </FormControl>
              <div className="flex glassBg items-center w-[80%] sm:h-[60%] sm:w-[50%] rounded-md text-slate-500 space-x-3">
                <SearchIcon color="inherit" className="ml-2" />
                <input
                  type="text"
                  placeholder="Search my Art"
                  className=" flex-grow bg-transparent outline-none py-1"
                />
              </div>
            </div>
            <div className="w-full mt-2 sm:mt-8 gallery p-5">
              {view === "Showcase" && (
                <React.Fragment>
                  {ld ? (
                    <Loader2 />
                  ) : (
                    art?.map((e) => {
                      return <Card obj={e} key={e.id} />;
                    })
                  )}
                </React.Fragment>
              )}
              {view === "Favourite" &&
                (FvLd ? (
                  <Loader2 />
                ) : (
                  myfovarite.map((e) => {
                    return <Card3 key={e.id} obj={e} />;
                  })
                ))}
              {view === "Group" &&
                (myGrLD ? (
                  <Loader2 />
                ) : (
                  myGr?.map((e) => {
                    return <Card4 key={e.id} obj={e} />;
                  })
                ))}
            </div>
          </div>
        </div>
      </div>
    </UserOnly>
  );
}

export default MeIndex;
