import { alertStyles } from "./styles";
import { Typography } from "@mui/material";

const Alert = ({ type = "info", children }) => {
  const style = { ...alertStyles.base, ...alertStyles[type] };
  return <Typography style={style}>{children}</Typography>;
};

export default Alert;
