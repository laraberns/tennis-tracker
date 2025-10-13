export const containerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  padding: "2rem",
  width: "-webkit-fill-available",
};

export const title = {
  fontSize: "1.6rem",
  fontWeight: 700,
  marginBottom: "1rem",
  color: "var(--color-text-primary)",
};

export const videoGridStyle = {
  alignItems: "stretch",
};

export const videoCardStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  height: "100%",
  padding: "0.9rem",
  gap: "0.6rem",
  boxSizing: "border-box",
};

export const videoFrameStyle = {
  position: "relative",
  height: 180,
  width: 180 * (16 / 9),
  borderRadius: 3,
  overflow: "hidden",
  backgroundColor: "#000",
  mb: 1,
};

export const descriptionText = {
  minHeight: 48,
  color: "var(--color-text-secondary)",
};
