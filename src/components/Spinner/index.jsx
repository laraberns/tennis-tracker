import { CircularProgress, Box } from "@mui/material";
import { spinnerContainer } from "./styles";

const Spinner = ({ size = 40 }) => {
  return (
    <Box sx={spinnerContainer}>
      <CircularProgress size={size} />
    </Box>
  );
};

export default Spinner;
