import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CustomButton from "../buttons/CustomButton";

export const InfoModal = (props) => {
  const { open, setOpen } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
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
            Hei !
          </Typography>
          <Typography className="text" id="description" sx={{ mt: 2 }}>
            Observ că accesezi site-ul folosind un telefon sau un dispozitiv
            similar. Atât site-ul cât și jocul nu sunt încă optimizate și nu pot
            fi jucate cu telefonul.
          </Typography>
          <div className="modalContainer">
            <CustomButton
              text="Ok :("
              size="large"
              color="warning"
              className="text"
              setOpen={setOpen} />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};
