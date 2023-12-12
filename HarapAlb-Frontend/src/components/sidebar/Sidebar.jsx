import KeyboardIcon from "@mui/icons-material/Keyboard";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  longWarningToast,
  successToast
} from "../../utilities/notifications/Notifications";
import { ControlsModal } from "../modal/ControlsModal";
import "./sidebar.scss";

export default function Sidebar(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="sidebar"
    >
      <img
        style={{ width: "200px", height: "200px", borderRadius: "100px" }}
        src="/background/sidebar/dummy.png"
      />
      <Divider />
      <h1>Alex</h1>
      <Divider />
      <div className="sidebarActions">
        <div className="actions">
          <Link
            to="/leaderboard"
            className="link"
            style={{ textDecoration: "none" }}
          >
            <LeaderboardIcon />
            <Button style={{ color: "black" }}>Clasamente</Button>
          </Link>
          <div className="link" onClick={() => setOpen(true)}>
            <KeyboardIcon />
            <Button style={{ color: "black" }}>Cum se joaca</Button>
          </div>
          <div
            className="link"
            onClick={() => {
              if (
                localStorage.getItem("PovesteaLuiHarapAlb-music") === "true"
              ) {
                localStorage.setItem("PovesteaLuiHarapAlb-music", false);
              } else {
                localStorage.setItem("PovesteaLuiHarapAlb-music", true);
                longWarningToast(
                  "Muzica va începe când se va încărca următoarea scenă. 🎵"
                );
              }
            }}
          >
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
        <Link
          to="/"
          onClick={() => successToast("O zi frumoasa! 👋")}
          className="link"
          style={{ textDecoration: "none" }}
        >
          <LogoutIcon />
          <Button style={{ color: "black" }}>Iesi din cont</Button>
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
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
      <ControlsModal open={open} setOpen={setOpen} />
    </div>
  );
}
