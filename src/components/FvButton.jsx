import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CircularProgress } from "@mui/joy";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtofavorite,
  fevorite,
  removeFromFavorite,
} from "../provider/features/feedslice";
import { token, user } from "../provider/features/userClice";
import { setNotification } from "../provider/features/notifySlice";
import SecurityIcon from "@mui/icons-material/Security";
import { axiosInstance } from "../lib/deplument";

function FvButton({ id }) {
  const [ld, setld] = useState(false);
  const fv = useSelector(fevorite);
  const tk = useSelector(token);
  const me = useSelector(user);
  const dispatch = useDispatch();
  const [userFv, setUserFv] = useState();
  useEffect(() => {
    setUserFv(
      fv?.find((e) => {
        return e.artistId === me?.user.id;
      })
    );
  }, [fv]);
  console.log(fv);
  async function action() {
    setld(fv);
    if (tk) {
      if (userFv?.artId !== id) {
        await axiosInstance
          .post(
            "/addToFavorite",
            {
              artId: id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearar ${tk}`,
              },
            }
          )
          .then((res) => dispatch(addtofavorite(res.data)))
          .catch((err) => console.log(err))
          .finally(() => setld(false));
      } else {
        await axiosInstance
          .post(
            "/deleteFavorite",
            {
              artId: id,
              id: userFv.id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearar ${tk}`,
              },
            }
          )
          .then(() => dispatch(removeFromFavorite(userFv.id)))
          .catch((err) => console.log(err))
          .finally(() => setld(false));
      }
    } else {
      setld(false)
      function notice() {
        dispatch(
          setNotification({
            msg: "Authentication required. Please login or signup",
            icon: <SecurityIcon />,
            open: true,
          })
        );
      }
      notice();
    }
  }

  return (
    <Button
      disabled={ld ? true : false}
      onClick={() => action()}
      endIcon={<FavoriteIcon />}
      variant="outlined"
    >
      {ld ? (
        <CircularProgress size="sm" />
      ) : (
        `${userFv?.artId === id ? "Remove from Favorite" : "Add to favorite"}`
      )}
    </Button>
  );
}

export default FvButton;
