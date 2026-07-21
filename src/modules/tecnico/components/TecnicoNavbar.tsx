import { NavLink } from "react-router-dom";
import {
  Home,
  Ticket,
  History,
} from "lucide-react";

import logo from "../assets/logo.jpeg";
import "../css/TecnicoNavbar.css";

function TecnicoNavbar() {
  return (
    <aside className="tecnico-sidebar">
      {/* ================= LOGO ================= */}
      <div className="tecnico-header">
        <img
          src={logo}
          alt="Logo de SoliTech"
          className="tecnico-logo"
        />

        <h2>SoliTech</h2>
      </div>

      {/* Línea divisoria */}
      <div className="tecnico-divider" />

      {/* ================= MENÚ ================= */}
      <p className="tecnico-menu-title">
        MENÚ PRINCIPAL
      </p>

      <nav className="tecnico-menu">
        <NavLink
          to="/Dashboardtecnico"
          className={({ isActive }) =>
            isActive
              ? "tecnico-item active"
              : "tecnico-item"
          }
        >
          <Home size={19} strokeWidth={1.8} />

          <span>Inicio</span>

          <i className="tecnico-active-bar" />
        </NavLink>

        <NavLink
          to="/Ticketsasignado"
          className={({ isActive }) =>
            isActive
              ? "tecnico-item active"
              : "tecnico-item"
          }
        >
          <Ticket size={19} strokeWidth={1.8} />

          <span>Tickets Asignados</span>

          <span className="ticket-count">
            8
          </span>

          <i className="tecnico-active-bar" />
        </NavLink>

        <NavLink
          to="/HistorialEstados"
          className={({ isActive }) =>
            isActive
              ? "tecnico-item active"
              : "tecnico-item"
          }
        >
          <History size={19} strokeWidth={1.8} />

          <span>Historial</span>

          <i className="tecnico-active-bar" />
        </NavLink>
      </nav>
    </aside>
  );
}

export default TecnicoNavbar;