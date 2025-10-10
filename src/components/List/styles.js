export const listContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  width: "100%",
};

export const listItem = {
  backgroundColor: "var(--color-surface)",
  borderRadius: "var(--radius)",
  padding: "0.75rem 1rem",
  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
};
