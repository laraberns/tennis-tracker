import { Box, Typography } from "@mui/material";
import { listContainer, listItem } from "./styles";

const List = ({ items, renderItem }) => {
  return (
    <Box sx={listContainer}>
      {items.map((item, index) => (
        <Box key={index} sx={listItem}>
          {renderItem ? renderItem(item) : <Typography>{item}</Typography>}
        </Box>
      ))}
    </Box>
  );
};

export default List;
