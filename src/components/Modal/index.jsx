import { Modal as MUIModal, Box, Typography } from "@mui/material";
import { modalStyles } from "./styles";

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <MUIModal open={isOpen} onClose={onClose}>
      <Box sx={modalStyles.container}>
        {title && <Typography sx={modalStyles.title}>{title}</Typography>}
        <Box sx={modalStyles.content}>{children}</Box>
      </Box>
    </MUIModal>
  );
};

export default Modal;
