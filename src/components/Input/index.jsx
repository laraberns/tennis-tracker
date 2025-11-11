import { TextField } from "@mui/material";
import { inputStyles } from "./styles";

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  helperText,
  disabled,
  InputProps, 
  ...props 
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      error={!!error}
      helperText={error || helperText}
      disabled={disabled}
      sx={inputStyles.input}
      fullWidth
      InputLabelProps={type === "date" ? { shrink: true } : undefined}
      InputProps={InputProps} 
      {...props}
    />
  );
};

export default Input;
