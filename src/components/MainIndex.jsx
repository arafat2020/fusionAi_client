import {
  clearErr,
  err,
  fetchPost,
  loading,
  reasult,
  searchPost,
  status,
  term,
} from "../provider/features/termslice";
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
import FeedCard from "./FeedCard";
import Users from "./Users";
import FeedCardDsiplay from "./FeedCardDsiplay";
import Loader from "./loder/Loader";

function MainIndex() {
  const res = useSelector(reasult);
  const ld = useSelector(loading);
  const error = useSelector(err);
  const q = useSelector(term);
  const st = useSelector(status);
  const [view, setview] = useState("card");
  const tr = useSelector(term);
  const [trload,startTrnsition]= useTransition()
  const dispatch = useDispatch();
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

  return (
    <div className="w-full h-full overflow-scroll scrollbar-hide p-5">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <h4 className="text-2xl text-gray-200 font-medium font-sans mt-2  ml-2">
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
          view === "card" ? "gallery w-full" : "max-w-[1000px] m-auto "
        } p-1 sm:p-5`}
      >
        {view === "card" && !tr ? <FeedCardDsiplay /> : null}
        {ld && st === "pending" ? (
          <Loader limit={3} />
        ) : view == "card" ? (
          res.map((e) => {
            return <Card2 obj={e} key={e.id} />;
          })
        ) : (
          res.map((e) => {
            return <FeedCard obj={e} key={e.id} />;
          })
        )}
      </div>
    </div>
  );
}

export default MainIndex;
