import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 navegación
import "../css/login1.css";
import logo from "../assets/logo.jpeg";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // 👈 hook

  return (
    <div className="container">

      {/* IZQUIERDA */}
      <div className="left">

        <div className="top-brand">
          <div className="icon-box"></div>
          <span>SoliTech</span>
        </div>

        <div className="content">
          <h1>Plataforma de gestión institucional</h1>
          <p>
            Accede a tus herramientas de administración,
            reportes y recursos institucionales desde un solo lugar.
          </p>

          <div className="features">

            <div className="item">
              <div className="icon">🔒</div>
              <div>
                <h4>Acceso seguro</h4>
                <p>Autenticación de dos factores disponible</p>
              </div>
            </div>

            <div className="item">
              <div className="icon">👥</div>
              <div>
                <h4>Gestión de usuarios</h4>
                <p>Administra roles y permisos fácilmente</p>
              </div>
            </div>

            <div className="item">
              <div className="icon">📊</div>
              <div>
                <h4>Reportes en tiempo real</h4>
                <p>Visualiza métricas y estadísticas al instante</p>
              </div>
            </div>

          </div>
        </div>

        <div className="footer">
          © 2026 SoliTech · Todos los derechos reservados
        </div>

      </div>

      {/* DERECHA */}
      <div className="right">

        <div className="login-card">

          <img src={logo} alt="logo" className="logo" />

          <h2>SoliTech</h2>
          <p className="subtitle">Sistema de Gestión Institucional</p>

          <div className="form">

            <h3>Iniciar sesión</h3>
            <p className="desc">Ingresa tus credenciales para continuar</p>

            <label>Correo electrónico</label>
            <input type="email" placeholder="usuario@institucion.edu" />

            <div className="row">
              <label>Contraseña</label>
              <span className="link">¿Olvidaste tu contraseña?</span>
            </div>

            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <span onClick={() => setShowPassword(!showPassword)}>👁</span>
            </div>

            <div className="remember">
              <input type="checkbox" />
              <span>Recordar sesión</span>
            </div>

            <button className="btn-primary">
              🔒 Iniciar Sesión
            </button>

            <div className="divider">¿Primera vez aquí?</div>

            {/* 👇 BOTÓN ACTUALIZADO */}
            <button
              className="btn-secondary"
              onClick={() => navigate("/register")}
            >
              Crear una cuenta nueva
            </button>

            <p className="terms">
              Al ingresar, aceptas los términos de uso y la política de privacidad
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;