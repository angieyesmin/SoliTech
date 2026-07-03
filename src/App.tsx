import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Reportar from "./pages/reportar";
import MisReportes from "./pages/misreportes";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
