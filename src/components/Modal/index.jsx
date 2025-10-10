import { Box, Typography, Modal as MUIModal } from "@mui/material";
import { modalContainer, modalTitle, modalContent } from "./styles";

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <MUIModal open={isOpen} onClose={onClose}>
      <Box sx={modalContainer}>
        {title && <Typography sx={modalTitle}>{title}</Typography>}
        <Box sx={modalContent}>{children}</Box>
      </Box>
    </MUIModal>
  );
};

export default Modal;
