import { initialLoad, status, user } from "../provider/features/userClice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader2 from "./loder/Loader2";

function Main({ incert }) {
  const me = useSelector(user);
  const dispatch = useDispatch();
  const st = useSelector(status);
  console.log();
  useEffect(() => {
    if (me !== null) return;
    dispatch(initialLoad());
  }, [me]);
  return (
    <main className="w-[100%] h-[100%] bg-black">
      {st === "pending" ? <Loader2 /> : incert}
    </main>
  );
}

export default Main;
