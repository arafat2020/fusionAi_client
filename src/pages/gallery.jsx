import GellaryIndex from "../components/GellaryIndex";
import Main from "../components/Main";
import Loader2 from "../components/loder/Loader2";
import usePost from "../hooks/usePost";
import { useRouter } from "next/router";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

function Gallery() {
  const router = useRouter();
  const { id } = router.query;
  const { Post, Loading, Start, End, increment, decrement } = usePost({
    id: id,
  });

  console.log();

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
    </div>
  );
}

export default Gallery;
