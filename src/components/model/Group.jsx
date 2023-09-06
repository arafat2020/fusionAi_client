import { Checkbox, InputLabel, TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import Trash from "../../icon/Trash";
import { useDispatch, useSelector } from "react-redux";
import { token } from "../../provider/features/userClice";
import {
  addToGroup,
  deleteGroup,
  removeFromGroup,
} from "../../provider/features/groupslice";

function Group({ name, id, obj, imgID, imgUrl }) {
  const tk = useSelector(token);
  const dispatch = useDispatch();
  const [chacked, setchacked] = useState();
  console.log(obj);

  return (
    <div className="flex space-x-4 p-2 items-center space-y-2">
      <div className="border border-blue-500 rounded-md">
        <Checkbox
          size="medium"
          color="primary"
          defaultChecked={obj.Group ? obj.Group[0]?.artId === imgID : false}
          onChange={(e) => {
            if (e.target.checked) {
              dispatch(
                addToGroup({
                  artGroupID: obj.id,
                  artID: imgID,
                  imgUrl,
                  tk,
                })
              );
            } else {
              dispatch(
                removeFromGroup({
                  artGroupID: obj.id,
                  id: obj.Group[0].id,
                  tk: tk,
                })
              );
            }
          }}
        />
      </div>
      <InputLabel
        style={{
          color: "whitesmoke",
        }}
      >
        {name}
      </InputLabel>
      <div
        onClick={async () => {
          if (id && tk) dispatch(deleteGroup({ id: id, tk: tk }));
        }}
        className="p-2 w-[40px] h-[40px] rounded-full border border-blue-600 text-blue-600 cursor-pointer hover:bg-red-600 hover:text-white hover:border-0 transition"
      >
        <Trash />
      </div>
    </div>
  );
}

export default Group;
