export const breakpoints = {
  sm: 768,
};

export const styles = {
  nav: (isMobile) => ({
    display: "flex",
    flexDirection: isMobile ? "row" : "column",
    justifyContent: isMobile ? "space-around" : "flex-start",
    alignItems: "center",
    backgroundColor: "#190933",
    color: "#fff",
    width: isMobile ? "100%" : "200px",
    height: isMobile ? "60px" : "100vh",
    padding: isMobile ? 0 : "1rem",
    position: isMobile ? "fixed" : "relative",
    bottom: isMobile ? 0 : "auto",
    left: 0,
    zIndex: 100,
  }),
  menuItem: (isMobile) => ({
    textDecoration: "none",
    color: "#fff",
    padding: isMobile ? "0.5rem 0" : "0.75rem 1rem",
    marginBottom: isMobile ? 0 : "0.5rem",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: isMobile ? "0.85rem" : "1rem",
    flex: isMobile ? 1 : "initial",
  }),
  activeItem: {
    backgroundColor: "#5DD9C1",
    color: "#190933",
  },
};
