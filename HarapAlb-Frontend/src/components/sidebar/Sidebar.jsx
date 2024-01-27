import KeyboardIcon from "@mui/icons-material/Keyboard";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetLeaderboardSetter } from "../../store/leaderboard/LeaderboardSlice";
import { resetUserSetter } from "../../store/user/UserSlice";
import {
  longWarningToast,
  successToast,
  warningToast,
} from "../../utilities/notifications/Notifications";
import CustomButton from "../buttons/CustomButton";
import { ControlsModal } from "../modal/ControlsModal";
import "./sidebar.scss";

export default function Sidebar(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [state, setState] = useState({
    right: false,
  });
  const [open, setOpen] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleMusicToggle = () => {
    if (localStorage.getItem("PovesteaLuiHarapAlb-music") === "true") {
      props.stopMusic();
      localStorage.setItem("PovesteaLuiHarapAlb-music", false);
    } else {
      localStorage.setItem("PovesteaLuiHarapAlb-music", true);
      longWarningToast(
        "Muzica va începe când se va încărca următoarea scenă. 🎵"
      );
    }
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer("right", false)}
      onKeyDown={toggleDrawer("right", false)}
      className="sidebar"
    >
      <img
        style={{ width: "200px", height: "200px", borderRadius: "100px" }}
        src="/background/sidebar/dummy.png"
        alt="Profile"
      />
      <Divider />
      <div className="nameContainer">
        <h1>{user.lastName ?? "Vizitator"}</h1>
      </div>
      <div className="emailContainer">
        <Typography className="email" id="title" variant="h6" component="h2">
          {user.email ?? ""}
        </Typography>
      </div>

      <Divider />
      <div className="sidebarActions">
        <div className="actions">
          <Link
            to={user.lastName == undefined ? "" : "/leaderboard"}
            className="link"
            style={{ textDecoration: "none" }}
            onClick={() => {
              if (user.lastName == undefined) {
                warningToast(
                  "Pentru a viziona clasamentele, este necesar să ai un cont activ!"
                );
              }
            }}
          >
            <LeaderboardIcon />
            <CustomButton
              variant="outline"
              style={{ color: "black" }}
              text="Clasamente"
            />
          </Link>
          <div className="link" onClick={() => setOpen(true)}>
            <KeyboardIcon />
            <CustomButton
              variant="outline"
              style={{ color: "black" }}
              text="Cum se joacă"
            />
          </div>
          <div className="link" onClick={handleMusicToggle}>
            {localStorage.getItem("PovesteaLuiHarapAlb-music") === "true" ? (
              <MusicOffIcon />
            ) : (
              <MusicNoteIcon />
            )}
            <CustomButton
              variant="outline"
              style={{ color: "black" }}
              text={
                localStorage.getItem("PovesteaLuiHarapAlb-music") === "true"
                  ? "Oprește muzica"
                  : "Pornește Muzica"
              }
            />
          </div>
        </div>
        <Link
          to={"/"}
          className="link"
          style={{ textDecoration: "none" }}
          onClick={() => {
            dispatch(resetUserSetter()),
              dispatch(resetLeaderboardSetter()),
              Cookies.remove("HarapAlb_Access_Token");
            successToast("O zi frumoasă! 👋");
          }}
        >
          <LogoutIcon />
          <CustomButton
            variant="outline"
            style={{ color: "black" }}
            text="Ieși din cont"
          />
        </Link>
      </div>
    </Box>
  );

  return (
    <div>
      <Button
        className="playButton"
        variant="contained"
        onClick={toggleDrawer("right", true)}
        color={props.play ? "success" : "primary"}
        disabled={!props.ready}
      >
        Meniu
      </Button>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {list()}
      </Drawer>
      <ControlsModal open={open} setOpen={setOpen} />
    </div>
  );
}
