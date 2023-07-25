import { useRouter } from "next/router";
import React from "react";
import Main from "../components/Main";
import FeedMain from "../components/FeedMain";

function Feed() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="w-full h-full">
      <Main incert={id && <FeedMain id={id}/>} />
    </div>
  );
}

export default Feed;
