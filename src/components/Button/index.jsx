import { Button as MUIButton } from "@mui/material";
import {
  buttonRoot,
  buttonPrimary,
  buttonSecondary,
  buttonDanger,
} from "./styles";

const Button = ({ children, onClick, color = "primary", ...props }) => {
  const colorStyles = {
    primary: buttonPrimary,
    secondary: buttonSecondary,
    danger: buttonDanger,
  };

  const style = { ...buttonRoot, ...colorStyles[color] };

  return (
    <MUIButton sx={style} onClick={onClick} {...props} variant="contained">
      {children}
    </MUIButton>
  );
};

export default Button;
