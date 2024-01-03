import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GuestModal } from "../../components/modal/GuestModal";
import "./App.scss";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container">
      <div className="contentContainer">
        <div className="title">
          <h1>Povestea lui Harap-Alb</h1>
          <h2>- Ion Creanga</h2>
        </div>
        <div className="buttonsContainer">
          <Link to="/login  ">
            <Button
              className="button"
              variant="contained"
              color="success"
              size="large"
            >
              Conecteaza-te si continua aventura!
            </Button>
          </Link>
          <h2>sau</h2>
          <Link to="/signup">
            <Button
              className="button"
              variant="contained"
              color="success"
              size="large"
            >
              Creeaza un cont si traieste aventura!
            </Button>
          </Link>
          <div className="guestPassContainer">
            <img
              className="campfire"
              src="/background/campfire.gif"
              alt="campfire"
              style={{ width: "200px", height: "200px" }}
            />
            <Button
              className="button guestPassButton"
              style={{ backgroundColor: "orange", color: "black" }}
              variant="contained"
              size="small"
              onClick={() => setOpen(true)}
            >
              Incepe direct aventura, fara sa ai nevoie de cont!
            </Button>
          </div>
        </div>
        <GuestModal open={open} setOpen={setOpen} />
      </div>
      <h6>Demo v1.8.3</h6>
    </div>
  );
}
