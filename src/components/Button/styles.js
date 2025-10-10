export const buttonRoot = {
  borderRadius: "var(--radius)",
  padding: "0.6rem 1rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "background 0.25s ease, transform 0.15s ease",
  textTransform: "none",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "translateY(-2px)",
  },
};

export const buttonPrimary = {
  backgroundColor: "var(--color-primary)",
  color: "white",
  "&:hover": {
    backgroundColor: "var(--color-primary-dark)",
  },
};

export const buttonSecondary = {
  backgroundColor: "var(--color-secondary)",
  color: "white",
  "&:hover": {
    backgroundColor: "var(--color-secondary-dark)",
  },
};

export const buttonDanger = {
  backgroundColor: "var(--color-error)",
  color: "white",
  "&:hover": {
    backgroundColor: "var(--color-error-dark)",
  },
};
