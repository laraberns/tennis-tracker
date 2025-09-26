export const layoutStyles = {
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  appBar: {
    backgroundColor: "var(--color-primary)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
  },

  toolbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    px: 2,
    py: 1,
  },

  logo: (width = 40) => ({
    height: width,
    width: "auto",
    maxHeight: "60px",
    objectFit: "contain",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": { transform: "scale(1.05)" },
  }),

  main: {
    flex: 1,
    px: 2,
    py: 2,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  footer: {
    backgroundColor: "var(--color-surface)",
    textAlign: "center",
    p: 1,
    fontSize: "0.9rem",
    color: "var(--color-muted)",
    borderTop: "1px solid #ddd",
  },
};
