import "../css/Navbar.css";
import logo from "../assets/logo.jpeg";

import { Home, PlusCircle, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="logo" />
        <h2>SoliTech</h2>
      </div>

      <div className="divider"></div>

      <div className="menu-title">
        MENÚ PRINCIPAL05
      </div>

      <nav className="menu">

        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <Home size={18} />
          <span>Inicio</span>
          <div className="active-bar"></div>
        </NavLink>

        <NavLink
          to="/reportar"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <PlusCircle size={18} />
          <span>Reportar Incidencia</span>
          <div className="active-bar"></div>
        </NavLink>

        <NavLink
          to="/misreportes"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FileText size={18} />
          <span>Mis Reportes</span>
          <div className="active-bar"></div>
        </NavLink>

      </nav>
    </aside>
  );
}

export default Header;