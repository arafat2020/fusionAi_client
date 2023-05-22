import { Snackbar,Button, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification, notify } from "../provider/features/notifySlice";

function Notice() {
  const nt = useSelector(notify);
  const dispatch = useDispatch()
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(clearNotification())
  };
  return (
    <div>
      {" "}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={nt.open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={nt.msg && nt.msg}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              {nt.icon && nt.icon}
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default Notice;
