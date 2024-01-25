import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CustomButton from "../../components/buttons/CustomButton";

export const GuestModal = (props) => {
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
          <Typography className="text" id="title" variant="h6" component="h2">
            Stai ! Sigur ?
          </Typography>
          <Typography className="text" id="description" sx={{ mt: 2 }}>
            Fara a crea un cont, nu vei putea sa-ti salvezi progresul in joc
            dupa inchiderea browser-ului, iar scorul tau nu va fi pastrat deloc.
            Va trebui sa incepi de la inceput de fiecare data cand incepi jocul.
          </Typography>
          <div className="modalContainer">
            <CustomButton
              className="text"
              text="Nu! du-ma inapoi"
              size="large"
              color="warning"
              setOpen={setOpen} />
            <Link to="/phaser">
              <CustomButton
                text="Da! Sa incepem"
                size="large"
                color="success"
                className="text" />
            </Link>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};
