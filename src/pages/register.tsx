import { Link } from "react-router-dom";
import "../css/Register.css";
import logo from "../assets/logo.jpeg"; 

function Register() {
  return (
    <div className="container">

     
      <div className="left">
        <div className="left-content">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h2>SoliTech</h2>
          </div>

          <h1>Plataforma de gestión institucional</h1>

          <p>
            Crea tu cuenta para acceder a herramientas de administración,
            reportes y recursos institucionales desde un solo lugar.
          </p>

          <div className="features">
            <div className="feature">
              <span>🔒</span>
              <div>
                <h4>Acceso seguro</h4>
                <p>Autenticación de dos factores disponible</p>
              </div>
            </div>

            <div className="feature">
              <span>👥</span>
              <div>
                <h4>Gestión de usuarios</h4>
                <p>Administra roles y permisos fácilmente</p>
              </div>
            </div>

            <div className="feature">
              <span>📊</span>
              <div>
                <h4>Reportes en tiempo real</h4>
                <p>Visualiza métricas y estadísticas al instante</p>
              </div>
            </div>
          </div>

          <p className="footer">© 2026 SoliTech</p>
        </div>
      </div>

      
      <div className="right">
        <div className="form-container">

          <div className="form-header">
            <img src={logo} alt="logo" />
            <h2>SoliTech</h2>
            <p>Sistema de Gestión Institucional</p>
          </div>

          <h3>Crear cuenta nueva</h3>
          <p className="subtitle">
            Ingresa los siguientes datos para registrarte
          </p>

          <form>
            <label>Nombre completo</label>
            <input type="text" placeholder="Nombre completo" />

            <label>Correo electrónico</label>
            <input type="email" placeholder="usuario@institucion.edu" />

            <div className="row">
              <div>
                <label>Contraseña</label>
                <input type="password" placeholder="********" />
              </div>

              <div>
                <label>Confirmar contraseña</label>
                <input type="password" placeholder="********" />
              </div>
            </div>

            <div className="checkbox">
              <input type="checkbox" />
              <span>
                Acepto los <a href="#">términos</a> y{" "}
                <a href="#">política de privacidad</a>
              </span>
            </div>

            <button type="submit">Crear cuenta</button>
          </form>

          <p className="login-link">
            ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Register;