import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Reportar from "./pages/reportar";
import MisReportes from "./pages/misreportes";

import Dashboard from "./admin/pages/dashboard";
import Gestiondetickets from "./admin/pages/gestiondetickets";
import Usuarios from "./admin/pages/usuarios";
import Configuracion from "./admin/pages/configuracion";
import Equipamiento from "./admin/pages/equipamiento";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reportar" element={<Reportar />} />
        <Route path="/misreportes" element={<MisReportes />} />

        {/* ADMIN */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/equipamiento" element={<Equipamiento />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/gestiondetickets" element={<Gestiondetickets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
