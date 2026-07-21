import "../css/AdminNavbar.css";
import logo from "../assets/logo.jpeg";

import { Home, PlusCircle, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";

function AdminNavbar() {
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
          to="/DashboardAdmin"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <Home size={18} />
          <span>Dashboard</span>
          <div className="active-bar"></div>
        </NavLink>

        <NavLink
          to="/GestionTickets"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <PlusCircle size={18} />
          <span>Gestion de Tickets</span>
          <div className="active-bar"></div>
        </NavLink>

        <NavLink
          to="/Usuarios"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FileText size={18} />
          <span>Usuario</span>
          <div className="active-bar"></div>
        </NavLink>

           <NavLink
          to="/Equipamiento"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FileText size={18} />
          <span>Equipamiento</span>
          <div className="active-bar"></div>
        </NavLink>

           <NavLink
          to="/configuracion"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FileText size={18} />
          <span>Configuración</span>
          <div className="active-bar"></div>
        </NavLink>

      </nav>
    </aside>
  );
}

export default AdminNavbar;