import { truncateString } from "../lib/truncate";
import { removeUser, token, user } from "../provider/features/userClice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import time from "time-ago";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UserOnly from "./protected/UserOnly";
import { fetchMyPost, loading, myart } from "../provider/features/myartSlice";
import Card from "./Card";
import Loader from "./loder/Loader";
import Loader2 from "./loder/Loader2";
import LazyLoad from "react-lazy-load";

function MeIndex() {
  const me = useSelector(user);
  const tk = useSelector(token);
  const ld = useSelector(loading);
  const dispath = useDispatch();
  const art = useSelector(myart);
  useEffect(() => {
    if (!tk || art.length !== 0) return;
    dispath(fetchMyPost({ token: tk }));
  }, [tk]);
  return (
    <UserOnly>
      <div className="w-full h-full overflow-scroll scrollbar-hide">
        <div className="w-full h-1/3 glassBg2 relative">
          <div className="absolute top-0 left-0 glassBg w-full h-full rounded-none flex justify-around items-center">
            <div>
              <LazyLoad>
                <img
                  src={me?.user.profilePic}
                  alt="pic"
                  className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full border-[3px] sm:border-[10px]  border-black m-5"
                />
              </LazyLoad>
            </div>
            <div className="w-3/5 sm:w-4/5 h-full space-y-3 ml-7">
              <h2 className="text-6xl gcolor font-sans font-semibold capitalize mt-3">
                {truncateString(me?.user.name, 15)}
              </h2>
              <p className="text-sm text-slate-900 font-medium">
                {truncateString(me?.user.baio, 50)}
              </p>
              <p className="text-slate-900 font-sans text-sm font-medium">
                Joined at {time.ago(me?.user.jonedAt)}
              </p>
            </div>
            <Button
              onClick={() => dispath(removeUser())}
              className="m-6 font-bold hidden sm:inline-flex"
              variant="outlined"
              color="primary"
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="w-full h-2/3 ">
          <div className="w-full max-h-full ">
            <div className="flex w-full justify-around items-center">
              <h4 className="text-2xl text-gray-200 font-medium font-sans mt-2 mb-2 ml-2">
                My Creation
              </h4>
              <div className="flex glassBg items-center h-[60%] w-[50%] rounded-md text-slate-500 space-x-3">
                <SearchIcon color="inherit" className="ml-2" />
                <input
                  type="text"
                  placeholder="Search my Art"
                  className=" flex-grow bg-transparent outline-none py-1"
                />
              </div>
            </div>
            <div className="w-full mt-8 gallery p-5">
              {ld ? (
                <Loader2 />
              ) : (
                art?.map((e) => {
                  return <Card obj={e} key={e.id} />;
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </UserOnly>
  );
}

export default MeIndex;
