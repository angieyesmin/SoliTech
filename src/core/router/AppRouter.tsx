import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTH
import Inicio from "../../modules/auth/pages/inicio";
import Login from "../../modules/auth/pages/login";
import Register from "../../modules/auth/pages/register";

// USUARIO
import Home from "../../modules/usuario/pages/Home";
import Perfil from "../../modules/usuario/pages/Perfil";

// INCIDENCIAS
import ReportarIncidencia from "../../modules/incidencias/pages/ReportarIncidencia";
import MisReportes from "../../modules/incidencias/pages/MisReportes";
import GestionTickets from "../../modules/incidencias/pages/GestionTickets";
import HistorialEstados from "../../modules/incidencias/pages/HistorialEstados";

// ADMIN
import DashboardAdmin from "../../modules/admin/pages/DashboardAdmin";
import Usuarios from "../../modules/admin/pages/Usuarios";
import Equipamiento from "../../modules/admin/pages/Equipamiento";
import Configuracion from "../../modules/admin/pages/Configuracion";

// TÉCNICO
import DashboardTecnico from "../../modules/tecnico/pages/DashboardTecnico";
import Ticketsasignado from "../../modules/tecnico/pages/Ticketsasignado";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USUARIO */}
        <Route path="/home" element={<Home />} />
        <Route path="/reportarincidencia" element={<ReportarIncidencia />} />
        <Route path="/misreportes" element={<MisReportes />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* TÉCNICO */}
        <Route path="/dashboardtecnico" element={<DashboardTecnico />} />
        <Route path="/ticketsasignado" element={<Ticketsasignado />} />
        <Route path="/historialestados" element={<HistorialEstados />} />

        {/* ADMIN */}
        <Route path="/dashboardadmin" element={<DashboardAdmin />} />
        <Route path="/gestiontickets" element={<GestionTickets />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/equipamiento" element={<Equipamiento />} />
        <Route path="/configuracion" element={<Configuracion />} />

      </Routes>
    </BrowserRouter>
  );
}