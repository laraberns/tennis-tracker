import { TextField } from "@mui/material";
import { inputStyles } from "./styles";

const Input = ({ label, name, value, onChange, type = "text", error }) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      error={!!error}
      helperText={error}
      sx={inputStyles.input}
      fullWidth
      InputLabelProps={type === "date" ? { shrink: true } : undefined}
    />
  );
};

export default Input;
