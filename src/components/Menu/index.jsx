import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { styles, breakpoints } from "./styles";

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
    { label: "Histórico", path: "/historico" },
    { label: "Dicas & Vídeos", path: "/dicas" },
    { label: "Perfil", path: "/perfil" },
  ];

  return (
    <nav style={styles.nav(isMobile)}>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={
            location.pathname === item.path
              ? { ...styles.menuItem(isMobile), ...styles.activeItem }
              : styles.menuItem(isMobile)
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Menu;
