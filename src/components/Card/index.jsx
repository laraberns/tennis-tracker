import { cardStyles } from "./styles";
import { Paper, Typography } from "@mui/material";

const Card = ({ title, children }) => {
  return (
    <Paper style={cardStyles.card} elevation={0}>
      {title && <Typography style={cardStyles.title}>{title}</Typography>}
      <Typography style={cardStyles.content}>{children}</Typography>
    </Paper>
  );
};

export default Card;
