import { useState, useEffect } from "react";
import { Box, AppBar, Toolbar } from "@mui/material";
import { layoutStyles } from "./styles";
import logoImg from "../../assets/logo.png";

const Layout = ({ children }) => {
  const [logoSize, setLogoSize] = useState(40);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setLogoSize(60);
      else if (window.innerWidth >= 768) setLogoSize(50);
      else setLogoSize(40);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box sx={layoutStyles.root}>
      <AppBar position="static" sx={layoutStyles.appBar}>
        <Toolbar sx={layoutStyles.toolbar}>
          <Box
            component="img"
            src={logoImg}
            alt="Tennis Tracker Logo"
            sx={layoutStyles.logo(logoSize)}
          />
        </Toolbar>
      </AppBar>

      <Box component="main" sx={layoutStyles.main}>
        {children}
      </Box>

      <Box component="footer" sx={layoutStyles.footer}>
        &copy; {new Date().getFullYear()} Tennis Tracker. Todos os direitos
        reservados.
      </Box>
    </Box>
  );
};

export default Layout;
