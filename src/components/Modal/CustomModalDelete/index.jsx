import Stack from "@mui/material/Stack";
import Button from "../../Button";
import Typography from "@mui/material/Typography";
import Modal from "..";

const CustomModalDelete = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Exclusão">
      <Typography sx={{ mb: 3 }}>
        {message || "Deseja realmente excluir este item?"}
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button color="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          color="danger"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Excluir
        </Button>
      </Stack>
    </Modal>
  );
};

export default CustomModalDelete;
