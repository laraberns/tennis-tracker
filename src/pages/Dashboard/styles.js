export const dashboardContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  padding: "1rem",
};

export const welcomeText = {
  fontSize: "1.8rem",
  fontWeight: "700",
  color: "var(--color-text-primary)",
};

export const cardsContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "1rem",
};

export const chartContainer = {
  background: "var(--color-surface)",
  borderRadius: "var(--radius)",
  padding: "1rem",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

export const loadingContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  border: "1px dashed",
  borderColor: "grey.300",
  borderRadius: 2,
  backgroundColor: "grey.50",
  minHeight: "200px",
};
