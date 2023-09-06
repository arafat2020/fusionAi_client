import { Skeleton } from "@mui/material";
import React from "react";

function Loader({ limit = 6 }) {
  return (
    <>
      {Array(limit)
        .fill(0)
        .map((i) => {
          return (
            <div
              key={i}
              className="grid_wide glassBg flex justify-around items-center"
            >
              <Skeleton
                className="w-[35%] h-[90%]"
                variant="rounded"
                sx={{
                  bgcolor: "rgba(43, 26, 135, 0.2)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(5px)",
                  WebkitBackdropFilter: "blur(5px)",
                }}
              />
              <div className="w-[60%]">
                <Skeleton
                  variant="text"
                  sx={{
                    bgcolor: "rgba(43, 26, 135, 0.2)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                  }}
                  width={100}
                  height={30}
                />
                <Skeleton
                  variant="text"
                  sx={{
                    bgcolor: "rgba(43, 26, 135, 0.2)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                  }}
                  width={100}
                  height={10}
                />
                <div className="flex pt-1 items-center space-x-2">
                  <Skeleton
                    variant="circular"
                    sx={{
                      bgcolor: "rgba(43, 26, 135, 0.2)",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(5px)",
                      WebkitBackdropFilter: "blur(5px)",
                    }}
                    width={50}
                    height={50}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      bgcolor: "rgba(43, 26, 135, 0.2)",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(5px)",
                      WebkitBackdropFilter: "blur(5px)",
                    }}
                    width={100}
                    height={10}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Loader;
