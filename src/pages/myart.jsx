import Main from "@/components/Main";
import { useRouter } from "next/router";
import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import usePrivetpost from "@/hooks/usePrivetPost";
import GellaryIndex from "@/components/GellaryIndex";
import Loader2 from "@/components/loder/Loader2";
import Details from "@/components/Details";


function Myart() {
  const router = useRouter();
  const { id } = router.query;
  const { Post, Loading, Start, End, increment, decrement } = usePrivetpost({
    id: id,
  });
  return (
    <div className="w-full h-full relative">
      <Main incert={Loading ? <Loader2 /> : <GellaryIndex obj={Post} />} />
      {Start === false && (
        <button
          onClick={() => decrement()}
          disabled={Loading ? true : false}
          className="absolute top-[50%] left-5 translate-y-[-50%]"
        >
          <KeyboardDoubleArrowLeftIcon color="primary" sx={{ fontSize: 50 }} />
        </button>
      )}
      {End === false && (
        <button
          onClick={() => increment()}
          disabled={Loading ? true : false}
          className="absolute top-[50%] right-5 translate-y-[-50%] "
        >
          <KeyboardDoubleArrowRightIcon color="primary" sx={{ fontSize: 50 }} />
        </button>
      )}
      <Details/>
    </div>
  );
}

export default Myart;
