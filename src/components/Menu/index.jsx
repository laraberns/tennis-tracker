import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  navStyles,
  menuItemStyles,
  activeItemStyles,
  breakpoints,
} from "./styles";

const Menu = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoints.sm);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoints.sm);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Registrar Treino", path: "/registro-treino" },
    { label: "Histórico", path: "/historico-treinos" },
    { label: "Dicas & Vídeos", path: "/dicas" },
    { label: "Perfil", path: "/perfil" },
  ];

  return (
    <nav style={navStyles(isMobile)}>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            style={
              isActive
                ? { ...menuItemStyles(isMobile), ...activeItemStyles }
                : menuItemStyles(isMobile)
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Menu;
