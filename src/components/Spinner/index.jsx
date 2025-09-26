import { CircularProgress, Box } from "@mui/material";
import { spinnerStyles } from "./styles";

const Spinner = ({ size = 40 }) => {
  return (
    <Box sx={spinnerStyles.container}>
      <CircularProgress size={size} />
    </Box>
  );
};

export default Spinner;
