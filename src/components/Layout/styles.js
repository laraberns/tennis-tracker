export const layoutRoot = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "var(--color-background)",
};

export const layoutAppBar = {
  backgroundColor: "var(--color-primary)",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  transition: "all 0.3s ease",
};

export const layoutToolbar = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  px: 2,
  py: 1,
};

export const layoutLogo = (width = 40) => ({
  height: width,
  width: "auto",
  maxHeight: "60px",
  objectFit: "contain",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export const layoutMain = (isMobile = false) => ({
  display: "flex",
  flexDirection: "column",
  minWidth: "100%",
  padding: 0,
  margin: "initial",
  flexGrow: 1,
  paddingBottom: isMobile ? "70px" : "0",
});

export const layoutFooter = {
  backgroundColor: "var(--color-surface)",
  textAlign: "center",
  p: 1,
  fontSize: "0.9rem",
  color: "var(--color-muted)",
  borderTop: "1px solid #ddd",
};

export const swipeIndicator = {
  position: "fixed",
  bottom: 80,
  left: "50%",
  transform: "translateX(-50%)",
  background: "rgba(0,0,0,0.8)",
  color: "white",
  padding: "12px 20px",
  borderRadius: "25px",
  fontSize: "14px",
  fontWeight: "500",
  zIndex: 1000,
  animation: "fadeInOut 5s forwards",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.2)",
};
