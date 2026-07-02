import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/Home";
import Reportar from "./pages/reportar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* HOME (DASHBOARD) */}
        <Route path="/home" element={<Home />} />

        {/* SECCIONES */}
        {<Route path="/reportar" element={<Reportar />} /> }

      </Routes>
    </BrowserRouter>
  );
}

export default App;
