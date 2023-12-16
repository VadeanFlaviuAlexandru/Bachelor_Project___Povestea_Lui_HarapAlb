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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetUserSetter } from "../../store/user/UserSlice";
import {
  longWarningToast,
  successToast,
} from "../../utilities/notifications/Notifications";
import { ControlsModal } from "../modal/ControlsModal";
import "./sidebar.scss";

export default function Sidebar(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
  console.log("-----------0---000000000000000000-----------", user);
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

  const renderLinkButton = (to, icon, buttonText, onClick = null) => (
    <Link
      to={to}
      className="link"
      style={{ textDecoration: "none" }}
      onClick={onClick}
    >
      {icon}
      <Button style={{ color: "black" }}>{buttonText}</Button>
    </Link>
  );

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
        <h1>{user.user.lastName ?? "Vizitator"}</h1>
      </div>
      <div className="emailContainer">
        <Typography className="email" id="title" variant="h6" component="h2">
          {user.user.email ?? ""}
        </Typography>
      </div>

      <Divider />
      <div className="sidebarActions">
        <div className="actions">
          {renderLinkButton("/leaderboard", <LeaderboardIcon />, "Clasamente")}
          <div className="link" onClick={() => setOpen(true)}>
            <KeyboardIcon />
            <Button style={{ color: "black" }}>Cum se joaca</Button>
          </div>
          <div className="link" onClick={handleMusicToggle}>
            {localStorage.getItem("PovesteaLuiHarapAlb-music") === "true" ? (
              <MusicOffIcon />
            ) : (
              <MusicNoteIcon />
            )}
            <Button style={{ color: "black" }}>
              {localStorage.getItem("PovesteaLuiHarapAlb-music") === "true"
                ? "Opreste muzica"
                : "Porneste Muzica"}
            </Button>
          </div>
        </div>
        {renderLinkButton("/", <LogoutIcon />, "Iesi din cont", () => {
          dispatch(resetUserSetter()), successToast("O zi frumoasa! 👋");
        })}
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
