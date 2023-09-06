import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/deplument";
import Card4 from "./Card4";
import { CircularProgress } from "@mui/joy";

function FeedCardDsiplay() {
  const [ld, setld] = useState(true);
  const [group, setgroup] = useState([]);
  useEffect(() => {
    setld(true);
    axiosInstance
      .get("/getFeedGroup")
      .then((data) => setgroup(data.data))
      .catch((err) => console.log(err))
      .finally(() => setld(false));
  }, []);
  console.log(group);
  return (
    <>
      {ld === false &&
        group.map((e) => {
          return <Card4 key={e.id} obj={e} />;
        })}
    </>
  );
}

export default FeedCardDsiplay;
