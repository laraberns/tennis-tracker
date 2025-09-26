import { Box, Typography } from "@mui/material";
import { listStyles } from "./styles";

const List = ({ items, renderItem }) => {
  return (
    <Box sx={listStyles.container}>
      {items.map((item, index) => (
        <Box key={index} sx={listStyles.item}>
          {renderItem ? renderItem(item) : <Typography>{item}</Typography>}
        </Box>
      ))}
    </Box>
  );
};

export default List;
