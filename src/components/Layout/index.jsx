import { useState, useEffect } from "react";
import { Box, AppBar, Toolbar } from "@mui/material";
import {
  layoutRoot,
  layoutAppBar,
  layoutToolbar,
  layoutLogo,
  layoutMain,
  layoutFooter,
} from "./styles";
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
    <Box sx={layoutRoot}>
      <AppBar position="static" sx={layoutAppBar}>
        <Toolbar sx={layoutToolbar}>
          <Box
            component="img"
            src={logoImg}
            alt="Tennis Tracker Logo"
            sx={layoutLogo(logoSize)}
          />
        </Toolbar>
      </AppBar>

      <Box component="main" sx={layoutMain}>
        {children}
      </Box>

      <Box component="footer" sx={layoutFooter}>
        &copy; {new Date().getFullYear()} Tennis Tracker. Todos os direitos
        reservados.
      </Box>
    </Box>
  );
};

export default Layout;
