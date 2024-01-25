import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../components/buttons/CustomButton";
import { GuestModal } from "../../components/modal/GuestModal";
import { InfoModal } from "../../components/modal/InfoModal";
import "./App.scss";

export default function App() {
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768 && /Mobi/i.test(navigator.userAgent)) {
      setInfoOpen(true);
    }
  }, []);

  return (
    <div className="container">
      <div className="contentContainer">
        <div className="title">
          <h1>Povestea lui Harap-Alb</h1>
          <h2>- Ion Creanga</h2>
        </div>
        <div className="buttonsContainer">
          <Link to="/login  ">
            <CustomButton
              className="button"
              text="Conecteaza-te si continua aventura!"
              color="success" />
          </Link>
          <h2>sau</h2>
          <Link to="/signup">
            <CustomButton
              className="button"
              text="Creeaza un cont si traieste aventura!"
              color="success" />
          </Link>
          <div className="guestPassContainer">
            <img
              className="campfire"
              src="/background/campfire.gif"
              alt="campfire"
              style={{ width: "200px", height: "200px" }}
            />
            <CustomButton
              setOpen={setOpen}
              size="small"
              text="Incepe direct aventura, fara sa ai nevoie de cont!"
              style={{ backgroundColor: "orange", color: "black" }}
              className="button guestPassButton"
              guest={true}
            />
          </div>
        </div>
        <GuestModal open={open} setOpen={setOpen} />
        <InfoModal open={infoOpen} setOpen={setInfoOpen} />
      </div>
      <h6>Demo v1.8.3</h6>
    </div>
  );
}
