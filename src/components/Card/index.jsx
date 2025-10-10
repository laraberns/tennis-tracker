import { Paper, Typography } from "@mui/material";
import { cardRoot, cardTitle, cardContent } from "./styles";

const Card = ({ title, children }) => {
  return (
    <Paper sx={cardRoot} elevation={0}>
      {title && <Typography sx={cardTitle}>{title}</Typography>}
      <Typography sx={cardContent}>{children}</Typography>
    </Paper>
  );
};

export default Card;
