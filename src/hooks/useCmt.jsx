import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../lib/deplument";
import { incertCmt, findAndReplaceCmt,removeCmt } from "../provider/features/feedslice";

function useCmt() {
  const [ld, setld] = useState(false);
  const [err, seterr] = useState();
  const dispatch = useDispatch();
  async function postCmt({ cmt, artId, token }) {
    setld(true);
    axiosInstance
      .post(
        "/postCmt",
        {
          comment: cmt,
          artId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearar ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(incertCmt(res.data));
      })
      .catch((err) => {
        seterr(err);
      })
      .finally(() => {
        setld(false);
      });
  }
  function updateCmt({ cmt, cmtId, token }) {
    setld(true);
    axiosInstance
      .post(
        "/updateCmt",
        {
          comment: cmt,
          cmtId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearar ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(findAndReplaceCmt(res.data));
      })
      .catch((err) => {
        seterr(err);
      })
      .finally(() => {
        setld(false);
      });
  }
  function deleteCmt({ cmtID ,token}) {
    setld(true);
    axiosInstance
      .post(
        "/deleteCmt",
        {
          cmtID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearar ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(removeCmt(cmtID));
      })
      .catch((err) => {
        seterr(err);
      })
      .finally(() => {
        setld(false);
      });
  }
  return {
    ld,
    err,
    postCmt,
    updateCmt,
    deleteCmt,
  };
}

export default useCmt;
