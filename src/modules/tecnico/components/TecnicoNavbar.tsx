import { NavLink } from "react-router-dom";
import { Home, Ticket, History } from "lucide-react";
import logo from "../assets/logo.jpeg";
import "../css/TecnicoNavbar.css";

const TecnicoNavbar: React.FC = () => {
  return (
    <aside className="tecnico-sidebar">
      {/* Logo */}

      <div className="tecnico-header">
        <img src={logo} alt="Logo" className="logo" />

        <div>
          <h2>SoliTech</h2>
          <span>TÉCNICO</span>
        </div>
      </div>

      <div className="tecnico-divider"></div>

      <p className="tecnico-menu-title">NAVEGACIÓN</p>

      <nav className="tecnico-menu">
        <NavLink
          to="/Dashboardtecnico"
          className={({ isActive }) =>
            isActive ? "tecnico-item active" : "tecnico-item"
          }
        >
          <Home size={18} />

          <span>Inicio</span>
        </NavLink>

        <NavLink
          to="/Ticketsasignado"
          className={({ isActive }) =>
            isActive ? "tecnico-item active" : "tecnico-item"
          }
        >
          <Ticket size={18} />

          <span>Tickets Asignados</span>

          <div className="ticket-count">8</div>
        </NavLink>

        <NavLink
          to="/HistorialEstados"
          className={({ isActive }) =>
            isActive ? "tecnico-item active" : "tecnico-item"
          }
        >
          <History size={18} />

          <span>Historial</span>
        </NavLink>
      </nav>

      <div className="tecnico-footer">
        <div className="perfil-avatar">RP</div>

        <div>
          <h4>Ricardo Pacheco</h4>
          <p>Técnico de Soporte</p>
        </div>
      </div>
    </aside>
  );
};

export default TecnicoNavbar;
