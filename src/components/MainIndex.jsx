import {
  clearErr,
  err,
  fetchPost,
  loading,
  reasult,
  searchPost,
  status,
  term,
  limit,
  reFetchPost,
} from "../provider/features/termslice";
import dynamic from "next/dynamic";
import React, { useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader2 from "./loder/Loader2";
import Card2 from "./Card2";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { setNotification } from "../provider/features/notifySlice";
import { InputLabel, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
const FeedCard = dynamic(() => import("./FeedCard"), {
  loading: () => (
    <h6 className="text-white font-sans w-full text-center p-3">
      Loading........
    </h6>
  ),
});
import Users from "./Users";
const FeedCardDsiplay = dynamic(() => import("./FeedCardDsiplay"), {
  loading: () => <h6 className="text-white font-sans">Loading........</h6>,
});
import Loader from "./loder/Loader";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

function MainIndex() {
  const res = useSelector(reasult);
  const lm = useSelector(limit);
  const ld = useSelector(loading);
  const error = useSelector(err);
  const q = useSelector(term);
  const st = useSelector(status);
  const [view, setview] = useState("card");
  const tr = useSelector(term);
  const [trload, startTrnsition] = useTransition();
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(0)
  useEffect(() => {
    if (res.length > 0) return;
    dispatch(fetchPost());
  }, [res]);
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (q) {
        dispatch(searchPost({ term: q }));
      }
    }, 400);
    return () => clearTimeout(debounce);
  }, [q]);
  useEffect(() => {
    async function loader(params) {
      await dispatch(
        setNotification({
          msg: error,
          icon: <LockPersonIcon />,
          open: true,
        })
      );
      dispatch(clearErr());
    }
    if (error) loader();
  }, [error]);
console.log(res);
  return (
    <div className="w-full h-full overflow-scroll scrollbar-hide p-5">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <h4 className="text-xl sm:text-2xl text-gray-200 font-medium font-sans mt-2  ml-2">
          Explore and React New Creation
        </h4>
        <div className=" min-w-[150px]  p-2">
          <FormControl fullWidth variant="outlined">
            <InputLabel focused id="demo-simple-select-label">
              {" "}
              View Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select View Type"
              style={{
                color: "steelblue",
                height: "40px",
                fontSize: "15px",
              }}
              value={view}
              onChange={(e) => setview(e.target.value)}
            >
              <MenuItem
                style={{
                  color: "steelblue",
                  fontSize: "15px",
                }}
                value={"card"}
              >
                <PaymentRoundedIcon /> Card View
              </MenuItem>
              <MenuItem
                style={{
                  color: "steelblue",
                  fontSize: "15px",
                }}
                value={"group"}
              >
                <WorkspacesIcon /> Group View
              </MenuItem>
              <MenuItem
                style={{
                  color: "steelblue",
                  fontSize: "15px",
                }}
                value={"feed"}
              >
                <FeedRoundedIcon /> Feed View
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Users />
      <div
        className={`   ${
          view !== "feed" ? "gallery w-full" : "max-w-[1000px] m-auto "
        } p-1 sm:p-5`}
      >
        {/* {view === "card" && !tr ? <FeedCardDsiplay /> : null} */}

        {/* {ld && st === "pending" ? (
          <Loader limit={3} />
        ) : view == "card" ? (
          res.map((e) => {
            return <Card2 obj={e} key={e.id} />;
          })
        ) : (
          res.map((e) => {
            return <FeedCard obj={e} key={e.id} />;
          })
        )} */}
        {ld && st === "pending" ? (
          view === "feed" ? (
            <Loader2 />
          ) : (
            <Loader limit={3} />
          )
        ) : (
          <React.Fragment>
            {view === "group" ? <FeedCardDsiplay /> : null}
            {view === "feed"
              ? res.map((e) => {
                  return <FeedCard obj={e} key={e.id} />;
                })
              : null}
            {view === "card"
              ? res.map((e) => {
                  return <Card2 obj={e} key={e.id} />;
                })
              : null}
          </React.Fragment>
        )}
      </div>
      {ld && st === "pending" ? null : (
        <div className="w-full flex justify-around items-center mb-5">
          <button
            onClick={async() => {
              await dispatch(reFetchPost({
                skip:skip+10
              }));
              setSkip(skip=>skip+=10)
            }}
            className=" text-white py-2 px-3 font-sans font-bold border border-blue-700 rounded-md"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default MainIndex;
