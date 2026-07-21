import { useNavigate } from "react-router-dom";
import "../css/inicio.css";

const Inicio: React.FC = () => {
  const navigate = useNavigate();

  const irAlLogin = () => {
    navigate("/login");
  };

  const irAlRegistro = () => {
    navigate("/register");
  };

  return (
    <main className="inicio-page">
      {/* Círculos decorativos */}
      <div className="inicio-circle inicio-circle-left"></div>
      <div className="inicio-circle inicio-circle-right"></div>

      <section className="inicio-content">

        {/* LOGO */}
        <div className="inicio-logo-container">
          <div className="inicio-logo-border">
            <div className="inicio-logo">
              <span>ST</span>
            </div>
          </div>
        </div>

        {/* NOMBRE */}
        <div className="inicio-brand">
          <h1>SoliTech</h1>
          <span className="inicio-year">2026</span>
        </div>

        {/* TITULO */}
        <section className="inicio-hero">
          <h2>
            Plataforma de gestión
            <br />
            institucional
          </h2>

          <p>
            Centraliza el reporte y seguimiento de incidencias
            <br />
            tecnológicas y físicas de tu institución
          </p>
        </section>

        {/* BOTONES */}
        <div className="inicio-actions">
          <button
            type="button"
            className="inicio-login-button"
            onClick={irAlLogin}
          >
            Iniciar Sesión
          </button>

          <button
            type="button"
            className="inicio-register-button"
            onClick={irAlRegistro}
          >
            Crear cuenta
          </button>
        </div>

        {/* LÍNEA */}
        <div className="inicio-divider"></div>

        {/* CARACTERÍSTICAS */}
        <section className="inicio-features">

          <article className="inicio-feature">
            <div className="feature-icon">
              ⚡
            </div>

            <h3>Reporta en segundos</h3>

            <p>
              Abre un ticket con un solo formulario
            </p>
          </article>

          <article className="inicio-feature">
            <div className="feature-icon">
              📡
            </div>

            <h3>Seguimiento en tiempo real</h3>

            <p>
              Estado actualizado en cada etapa
            </p>
          </article>

          <article className="inicio-feature">
            <div className="feature-icon">
              📋
            </div>

            <h3>Soporte organizado</h3>

            <p>
              Asignación inteligente por técnico
            </p>
          </article>

        </section>

        {/* PIE */}
        <footer className="inicio-footer">
          © 2026 SoliTech · Todos los derechos reservados
        </footer>

      </section>
    </main>
  );
};

export default Inicio;