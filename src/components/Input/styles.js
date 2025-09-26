export const inputStyles = {
  input: {
    backgroundColor: "var(--color-surface)",
    borderRadius: "var(--radius)",
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "var(--color-muted)" },
      "&:hover fieldset": { borderColor: "var(--color-primary)" },
      "&.Mui-focused fieldset": { borderColor: "var(--color-primary)" },
    },
    "& .MuiInputLabel-root": { color: "var(--color-text-primary)" },
  },
};
