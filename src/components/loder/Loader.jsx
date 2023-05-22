import { Skeleton } from "@mui/material";
import React from "react";

function Loader({ limit = 6 }) {
  return (
    <div className="w-full flex flex-wrap justify-around">
      {Array(limit)
        .fill(0)
        .map(() => {
          return <div className="mb-3">
            <Skeleton variant="rounded" sx={{
                bgcolor:'rgba(43, 26, 135, 0.2)',
                boxShadow:'0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter:'blur(5px)',
                WebkitBackdropFilter:'blur(5px)'
            }} width={300} height={500} />
          </div>;
        })}
    </div>
  );
}

export default Loader;
