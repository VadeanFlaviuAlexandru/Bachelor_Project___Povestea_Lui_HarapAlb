import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

export const ControlsModal = (props) => {
  const { open, setOpen } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "#D1FFBD",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      className="modal"
      aria-labelledby="title"
      aria-describedby="description"
      open={props.open}
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
            className="typography"
            id="title"
            variant="h6"
            component="h2"
          >
            Cum se joaca ?
          </Typography>
          <div className="text">
            <div className="keyInstruction">
              <img
                style={{
                  width: "30px",
                  height: "30px",
                }}
                src="/buttons/sus.png"
              />
              <h6>tasta 'săgeată în sus' pentru a te deplasa în sus.</h6>
            </div>
            <div className="keyInstruction">
              <img
                style={{
                  width: "30px",
                  height: "30px",
                }}
                src="/buttons/jos.png"
              />
              <h6>tasta 'săgeată în jos' pentru a te deplasa în jos.</h6>
            </div>
            <div className="keyInstruction">
              <img
                style={{
                  width: "30px",
                  height: "30px",
                }}
                src="/buttons/staga.png"
              />
              <h6>tasta 'săgeată în stânga' pentru a te deplasa în stânga.</h6>
            </div>
            <div className="keyInstruction">
              <img
                style={{
                  width: "30px",
                  height: "30px",
                }}
                src="/buttons/dreapta.png"
              />
              <h6>
                Tasta 'săgeată în dreapta' pentru a te deplasa în dreapta.
              </h6>
            </div>
            <div className="keyInstruction">
              <img
                style={{
                  width: "100px",
                  height: "30px",
                }}
                src="/buttons/space.png"
              />
              <h6>
                tasta 'space bar' pentru a continua dialogul sau povestea.
              </h6>
            </div>
          </div>
          <Button
            className="text"
            onClick={() => setOpen(false)}
            variant="contained"
            color="warning"
            size="large"
            style={{ color: "black", marginTop: "20px" }}
          >
            Am inteles!
          </Button>
          <Typography
            className="typography tip"
            id="title"
            variant="h6"
            component="h2"
          >
            Dacă tastele nu funcționează, încearcă să dai clic în afara jocului
            și apoi să revii la joc cu încă un clic.{" "}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};
