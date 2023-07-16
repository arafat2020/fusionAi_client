import {
  clearErr,
  err,
  fetchPost,
  loading,
  reasult,
} from "../provider/features/termslice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader2 from "./loder/Loader2";
import Card2 from "./Card2";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { setNotification } from "../provider/features/notifySlice";


function MainIndex() {
  const res = useSelector(reasult);
  const ld = useSelector(loading);
  const error = useSelector(err);
  const dispatch = useDispatch();
  useEffect(() => {
    if (res.length > 0) return;
    dispatch(fetchPost());
  }, [res]);
  useEffect(() => {
    async function loader(params) {
      await dispatch(
        setNotification({
          msg: error,
          icon: <LockPersonIcon />,
          open: true,
        })
      );
      dispatch(clearErr())
    }
    if (error) loader()

  }, [error]);

  return (
    <div className="w-full h-full overflow-scroll scrollbar-hide p-5">
      <h4 className="text-2xl text-gray-200 font-medium font-sans mt-2 mb-2 ml-2">
        Explore and React New Creation
      </h4>
      <div className="w-full mt-8 gallery p-5">
        {ld ? (
          <Loader2 />
        ) : (
          res.map((e) => {
            return <Card2 obj={e} key={e.id} />;
          })
        )}
      </div>
    </div>
  );
}

export default MainIndex;
