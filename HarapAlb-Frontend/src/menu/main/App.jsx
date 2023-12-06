import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
            <Button className="button" variant="contained" size="large">
              Conecteaza-te si continua aventura!
            </Button>
          </Link>
          <h2>sau</h2>
          <Link to="/signup">
            <Button className="button" variant="contained" size="large">
              Creeaza un cont si traieste aventura!
            </Button>
          </Link>
          <div className="guestPassContainer">
            <img
              className="campfire"
              src="/public/background/campfire.gif"
              alt="campfire"
              style={{ width: "200px", height: "200px" }}
            ></img>
            <Button
              className="button guestPassButton"
              style={{ backgroundColor: "orange", color: "black" }}
              variant="contained"
              size="small"
              onClick={() => setOpen(true)} // Corrected from handleOpen to onClick
            >
              Incepe direct aventura, fara sa ai nevoie de cont!
            </Button>
          </div>
        </div>
        <Modal
          className="modal"
          aria-labelledby="title"
          aria-describedby="description"
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                className="text"
                id="title"
                variant="h6"
                component="h2"
              >
                Stai ! Sigur ?
              </Typography>
              <Typography className="text" id="description" sx={{ mt: 2 }}>
                Fara a crea un cont, nu vei putea sa-ti salvezi progresul in joc
                dupa inchiderea browser-ului, iar scorul tau nu va fi pastrat
                deloc. Va trebui sa incepi de la inceput de fiecare data cand
                incepi jocul.
              </Typography>
              <div className="text modalContainer">
                <Button
                  className="text"
                  onClick={() => setOpen(false)}
                  variant="contained"
                  size="large"
                >
                  Nu! du-ma inapoi
                </Button>
                <Link to="/phaser">
                  <Button className="text" variant="contained" size="large">
                    Da! Sa incepem
                  </Button>
                </Link>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
