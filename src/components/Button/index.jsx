import { Button as MUIButton } from "@mui/material";
import { buttonStyles } from "./styles";

const Button = ({ children, onClick, ...props }) => {
  return (
    <MUIButton
      style={buttonStyles.root}
      onClick={onClick}
      {...props}
      variant="contained"
    >
      {children}
    </MUIButton>
  );
};

export default Button;
