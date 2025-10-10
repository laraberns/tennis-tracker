export const cardRoot = {
  backgroundColor: "var(--color-surface)",
  borderRadius: "var(--radius)",
  padding: "var(--spacing)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.75rem",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
  },
};

export const cardTitle = {
  fontWeight: 600,
  fontSize: "1.25rem",
  color: "var(--color-text-primary)",
};

export const cardContent = {
  fontSize: "1rem",
  color: "var(--color-text-secondary, var(--color-muted))",
  lineHeight: 1.5,
};
