import React, { useState } from "react";
import useImageLoad from "../hooks/useImageLoad";
import { Avatar, Skeleton, Tooltip } from "@mui/material";

function LzyAvater({ i, index, e }) {
  const { imgLoad } = useImageLoad({ url: e.Art?.cmp });
  const [on, seton] = useState(false);
  return (
    <div
      className={`p-1 rounded-full border ${
        index === i ? "border-blue-500 opacity-100" : "border-none opacity-40"
      }  hover:opacity-100 transition`}
    >
      <Tooltip title={e.Art?.tag}>
        {imgLoad ? (
          <Skeleton
            variant="circular"
            sx={{
              bgcolor: "rgba(43, 26, 135, 0.2)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
            }}
            width={40}
            height={40}
          />
        ) : (
          <Avatar src={e.Art?.cmp} />
        )}
      </Tooltip>
    </div>
  );
}

export default LzyAvater;
