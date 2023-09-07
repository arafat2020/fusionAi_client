import React, { useEffect, useMemo, useState, useTransition } from "react";
import Logo from "./Logo";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, status, user } from "../provider/features/userClice";
import { truncateString } from "../lib/truncate";
import { Button, IconButton, Menu, MenuItem, Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import {
  clearTerm,
  fetchPost,
  setTerm,
  term,
  termStatus,
} from "../provider/features/termslice";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { CircularProgress } from "@mui/material";

function Nav() {
  const st = useSelector(status);
  const srst = useSelector(termStatus);
  const me = useSelector(user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState();
  const open = useMemo(() => {
    return Boolean(anchorEl);
  }, [anchorEl]);
  const [isPending, startTransition] = useTransition();
  // const [isPending2, startTransition2] = useTransition();

  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log(anchorEl);

  return (
    <nav
      id="nav"
      className="w-[100%] h-[10%] bg-black flex items-center justify-around"
    >
      <div
        onClick={() => {
          router.push("/");
          startTransition(() =>{
            dispatch(clearTerm())
            dispatch(fetchPost())
          });
        }}
        className="flex space-x-2 items-center cursor-pointer"
      >
        <Logo size={50} />
        <h1 className=" text-2xl uppercase font-bold">
          <span className="text-white">fusion</span>
          <span className="text-blue-800 font-extrabold">ai</span>
        </h1>
      </div>
      <div className="hidden sm:flex glassBg items-center h-[60%] w-[50%] rounded-full p-1 text-slate-500 space-x-3">
        <div
          className="cursor-pointer rounded-full animate-pulse"
          onClick={() => router.push("/")}
        >
          <SearchIcon
            color="inherit"
            className="ml-2 hover:scale-125 transition"
          />
        </div>
        <input
          onChange={(e) => dispatch(setTerm(e.target.value))}
          type="text"
          placeholder="Search Image Art"
          className=" flex-grow bg-transparent outline-none"
        />
        {srst === "searching" && <CircularProgress size={30} />}
      </div>
      {st === "Unathenticated" || (st === "ok" && me === null) ? (
        <div className="!hidden sm:inline-flex">
          <Button
            variant="outlined"
            className="!font-bold"
            endIcon={<LoginIcon />}
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </div>
      ) : (
        <div
          onClick={async () => {
            router.push("/me");
            startTransition(() => dispatch(clearTerm()));
          }}
          className="hidden glassBg p-1 text-slate-500 sm:flex items-center space-x-2 font-bold rounded-full cursor-pointer"
        >
          {st === "pending" ? (
            <Skeleton variant="circular" width={30} height={30} />
          ) : (
            <img
              src={me?.user.profilePic}
              alt="pic"
              className="rounded-full w-[30px] h-[30px]"
              loading="lazy"
            />
          )}
          {st === "pending" ? (
            <Skeleton variant="rounded" width={50} height={15} />
          ) : (
            <p>{truncateString(me?.user.name, 10)}</p>
          )}
        </div>
      )}
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        className="inline-flex sm:!hidden"
      >
        <MenuIcon
          className="inline-flex sm:!hidden"
          fontSize="large"
          color="primary"
        />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{
          backgroundColor: "rgba(24, 25, 26, .4)",
        }}
      >
        <MenuItem>
          <div className="flex glassBg items-center h-[60%] w-[1000%] rounded-md text-slate-500 space-x-3">
            <div
              className="cursor-pointer"
              onClick={() => {
                router.push("/");
                setAnchorEl(false);
              }}
            >
              <SearchIcon color="inherit" className="ml-2" />
            </div>
            <input
              onChange={(e) => {
                dispatch(setTerm(e.target.value));
              }}
              type="text"
              placeholder="Search Image Art"
              className=" flex-grow bg-transparent outline-none"
            />
          </div>
        </MenuItem>
        <MenuItem>
          {st === "Unathenticated" || (st === "ok" && me === null) ? (
            <div>
              <Button
                variant="outlined"
                className="!font-bold"
                endIcon={<LoginIcon />}
                onClick={() => {
                  router.push("/login");
                  setAnchorEl(null);
                }}
              >
                Login
              </Button>
            </div>
          ) : (
            <div
              onClick={() => {
                router.push("/me");
                setAnchorEl(null);
                startTransition(() => dispatch(clearTerm()));
              }}
              className=" glassBg p-1 text-slate-500 flex items-center space-x-2 font-bold rounded-full cursor-pointer"
            >
              {st === "pending" ? (
                <Skeleton variant="circular" width={30} height={30} />
              ) : (
                <img
                  src={me?.user.profilePic}
                  alt="pic"
                  className="rounded-full w-[30px] h-[30px]"
                  loading="lazy"
                />
              )}
              {st === "pending" ? (
                <Skeleton variant="rounded" width={50} height={15} />
              ) : (
                <p>{truncateString(me?.user.name, 10)}</p>
              )}
            </div>
          )}
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => {
              setAnchorEl(null);
              dispatch(removeUser());
            }}
            className={`font-bold ${me === null && "!hidden"}`}
            variant="outlined"
            color="primary"
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </MenuItem>
      </Menu>
    </nav>
  );
}

export default Nav;
