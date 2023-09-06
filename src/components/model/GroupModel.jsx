import React, { useEffect, useState } from "react";
import Group from "./Group";
import CreateGroup from "./CreateGroup";
import { CircularProgress } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { token } from "../../provider/features/userClice";
import { getGroups, groups, loading } from "../../provider/features/groupslice";

function GroupModel({ artID,imgUrl }) {
  const tk = useSelector(token);
  const ld = useSelector(loading);
  const gr = useSelector(groups);
  const [type, settype] = useState("group");
  const dispatch = useDispatch();
  useEffect(() => {
    if (artID && tk) dispatch(getGroups({ artID, tk }));
  }, [artID]);
  // console.log();
  return (
    <div className="max-h-[50%] overflow-scroll scrollbar-hide">
      <div className="flex justify-around bg-black ">
        <button
          className="p-1 bg-blue-700 text-white rounded-md font-sans font-normal"
          onClick={() => {
            settype("group");
          }}
        >
          Groups
        </button>
        <button
          className="p-1 bg-blue-700 text-white rounded-md font-sans font-normal"
          onClick={() => {
            settype("create");
          }}
        >
          Create Group
        </button>
      </div>
      <div className="p-2 bg-black ">
        {type === "group" &&
          (ld ? (
            <CircularProgress />
          ) : (
            gr?.map((e) => {
              return (
                <Group
                  key={e.id}
                  name={e.name}
                  id={e.id}
                  obj={e}
                  imgID={artID}
                  imgUrl={imgUrl}
                />
              );
            })
          ))}
        {type === "create" && (
          <CreateGroup action={settype} loading={ld} tk={tk} />
        )}
      </div>
    </div>
  );
}

export default GroupModel;
