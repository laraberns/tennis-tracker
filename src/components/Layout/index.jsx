import { useState, useEffect } from "react";
import { Box, AppBar, Toolbar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  layoutRoot,
  layoutAppBar,
  layoutToolbar,
  layoutLogo,
  layoutMain,
  layoutFooter,
  swipeIndicator,
} from "./styles";
import logoImg from "../../assets/logo.png";
import { useSwipeGesture } from "../../hooks/useSwipeGesture";

const Layout = ({ children }) => {
  const [logoSize, setLogoSize] = useState(40);
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setLogoSize(60);
      else if (window.innerWidth >= 768) setLogoSize(50);
      else setLogoSize(40);

      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const hintTimer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 5000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(hintTimer);
    };
  }, []);

  const getRouteNavigation = () => {
    const routes = [
      "/dashboard",
      "/registro-treino",
      "/historico-treinos",
      "/dicas-conteudos",
      "/perfil",
    ];

    const currentIndex = routes.indexOf(location.pathname);

    return {
      next: routes[currentIndex + 1] || null,
      prev: routes[currentIndex - 1] || null,
    };
  };

  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: () => {
      if (isMobile) {
        const { next } = getRouteNavigation();
        if (next) {
          navigate(next);
        }
      }
    },
    onSwipeRight: () => {
      if (isMobile) {
        const { prev } = getRouteNavigation();
        if (prev) {
          navigate(prev);
        }
      }
    },
    onSwipeUp: () => {
      if (isMobile) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    onSwipeDown: () => {
      if (isMobile) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    },
    threshold: 50,
  });

  return (
    <Box sx={layoutRoot} {...(isMobile ? swipeHandlers : {})}>
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

      <Box component="main" sx={layoutMain(isMobile)}>
        {children}
      </Box>

      {isMobile && showSwipeHint && (
        <Box sx={swipeIndicator}>👆 Deslize para os lados para navegar</Box>
      )}

      {!isMobile && (
        <Box component="footer" sx={layoutFooter}>
          &copy; {new Date().getFullYear()} Tennis Tracker. Todos os direitos
          reservados.
        </Box>
      )}
    </Box>
  );
};

export default Layout;
