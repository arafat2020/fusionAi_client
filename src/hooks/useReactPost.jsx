import { axiosInstance } from "../lib/deplument";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { upDateCount } from "../provider/features/feedslice";

function useReact() {
  const [loading, setloading] = useState(false);
  const [res, setres] = useState(null);
  const [err, seterr] = useState(null);
  const dispacth = useDispatch()
  function reactAction({ artId, token, type = "like" }) {
    setloading(true);
    seterr(null)
    setres(null)
    axiosInstance
      .post("/postReact", {
        artId,
        type,
      },{
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearar ${token}`,
        }
      })
      .then(async(data) => {
        await dispacth(upDateCount(data.data))
        setres(data.data)
        console.log(data);
      })
      .catch((err) => seterr(err))
      .finally(() => setloading(false));
  }
  return {
    reactAction,
    loading,
    res,
    err
  }
}

export default useReact;
