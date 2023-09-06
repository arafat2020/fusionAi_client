import React from "react";
import useUsers from "../hooks/getUsers";
import { Avatar, Skeleton, Tooltip, Typography } from "@mui/material";

function Users() {
  const { loading, res, err } = useUsers();
  // console.log(loading, res);
  const Res = () => {
    return (
      <>
        {res.map((e) => {
          return (
            <div
              key={e.id}
              className="cursor-pointer p-2 rounded-full border border-blue-600"
            >
              <Tooltip  title={e.name}>
                <Avatar src={e.profilePic} alt="user" />
              </Tooltip>
            </div>
          );
        })}
      </>
    );
  };
  const Loader = () => {
    const arr = new Array();
    for (let i = 0; i < 10; i++) {
      arr[i] = 0;
    }
    return (
      <>
        {arr.map((a,b) => {
          return (
            <div key={b} className=" p-2 rounded-full border border-slate-400">
              <Skeleton
                variant="circular"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgb(148 163 184)",
                }}
              />
            </div>
          );
        })}
      </>
    );
  };
  return (
    <div className="ml-2">
      
      <Typography variant="caption" color="whitesmoke" >
        Artist You May Like
      </Typography>
      <div className="flex min-w-[300px] max-w-[1000px] mt-2 mb-3 sm:mb-0 space-x-3 overflow-scroll scrollbar-hide">
        {loading ? <Loader /> : <Res />}
      </div>
    </div>
  );
}

export default Users;
