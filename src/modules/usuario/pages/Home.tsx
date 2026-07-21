import { useState } from "react";
import Navbar from "../../../shared/components/Navbar";
import "../css/home.css";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
function Home() {
  const navigate = useNavigate();

  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  return (
    <div className="layout">
      <Navbar />

      <main className="home-content">

        {/* ================= TOPBAR ================= */}
             <header className="my-reports-header">
          {/* Título de la página y fecha actual. */}
          <div className="my-reports-header-information">
            <h1>Mis Reportes</h1>
            <p>Viernes 27 de junio de 2026</p>
          </div>

          {/* Acciones del usuario: notificaciones y perfil. */}
          <div className="my-reports-user-actions">
            {/* Botón y menú de notificaciones. */}
            <div className="my-reports-notification-wrapper">
              <button
                type="button"
                className="my-reports-notification-button"
                onClick={(evento) => {
                  evento.stopPropagation();
                  setMostrarNotificaciones((actual) => !actual);
                  setMostrarPerfil(false);
                }}
                aria-label="Abrir notificaciones"
                aria-expanded={mostrarNotificaciones}
              >
                <Bell size={20} strokeWidth={1.8} />
                <span>3</span>
              </button>

              {mostrarNotificaciones && (
                <div className="home-notifications-menu">
                  <div className="home-notifications-header">
                    <h4>Notificaciones</h4>

                    <button
                      onClick={() =>
                        setMostrarNotificaciones(false)
                      }
                    >
                      ×
                    </button>
                  </div>

                  <div className="home-notification-item">
                    <div className="notification-color blue-notification"></div>

                    <div>
                      <b>Reporte en proceso</b>

                      <p>
                        La incidencia INC-2024 fue asignada a un técnico.
                      </p>

                      <span>Hace 18 minutos</span>
                    </div>
                  </div>

                  <div className="home-notification-item">
                    <div className="notification-color orange-notification"></div>

                    <div>
                      <b>Reporte pendiente</b>

                      <p>
                        La incidencia INC-2023 todavía no ha sido atendida.
                      </p>

                      <span>Hace 1 hora</span>
                    </div>
                  </div>

                  <div className="home-notification-item">
                    <div className="notification-color green-notification"></div>

                    <div>
                      <b>Reporte resuelto</b>

                      <p>
                        La incidencia INC-2021 fue marcada como resuelta.
                      </p>

                      <span>Hace 3 horas</span>
                    </div>
                  </div>

                  <button
                    className="home-view-notifications"
                    onClick={() => {
                      setMostrarNotificaciones(false);
                      navigate("/misreportes");
                    }}
                  >
                    Ver todos mis reportes
                  </button>
                </div>
              )}
            </div>

            {/* 👤 PERFIL */}
            <div className="user-box-container">

              <div
                className="user-box"
                onClick={() =>
                  setMostrarPerfil(!mostrarPerfil)
                }
              >
                <div className="user-avatar">RP</div>

                <div className="user-info">
                  <span className="user-name">
                    Ricardo Pacheco
                  </span>

                  <span className="user-role">
                    Usuario
                  </span>
                </div>

                <span className="user-arrow">▾</span>
              </div>

              {mostrarPerfil && (
                <div className="profile-menu">

                  <button
                    className="profile-item"
                    onClick={() => navigate("/perfil")}
                  >
                    👤 Mi perfil
                  </button>

                  <button
                    className="profile-item active"
                    onClick={() =>
                      navigate("/configuracion")
                    }
                  >
                    ⚙️ Configuración
                  </button>

                  <hr />

                  <button
                    className="profile-item logout"
                    onClick={() => navigate("/login")}
                  >
                    ↩ Cerrar sesión
                  </button>

                </div>
              )}

            </div>

          </div>
        </header>

        {/* ================= BIENVENIDA ================= */}
        <section className="welcome-card">
          <h1>Bienvenido</h1>

          <p>
            Aquí puedes reportar incidencias y hacer seguimiento a
            tus solicitudes.
          </p>
        </section>

        {/* ================= STATS ================= */}
        <section className="stats-container">
          <div className="stat-card">
            <h2 className="green">12</h2>
            <h4>Total reportados</h4>
            <span>↗ +2 este mes</span>
          </div>

          <div className="stat-card">
            <h2 className="blue">3</h2>
            <h4>En Proceso</h4>
            <span>↗ Activos ahora</span>
          </div>

          <div className="stat-card">
            <h2 className="orange">2</h2>
            <h4>Pendientes</h4>
            <span>↗ Sin atender</span>
          </div>

          <div className="stat-card">
            <h2 className="darkgreen">7</h2>
            <h4>Resueltos</h4>
            <span>↗ Este semestre</span>
          </div>
        </section>

        {/* ================= DASHBOARD ================= */}
        <section className="dashboard-grid">

          <div className="report-card">
            <div className="report-icon">+</div>

            <h2>Reportar una incidencia</h2>

            <p>
              Informa un problema técnico, de infraestructura o equipamiento.
            </p>

            <button
              className="new-report-btn"
              onClick={() => navigate("/reportar")}
            >
              ⊕ Nuevo Reporte
            </button>
          </div>

          <div className="incidents-card">
            <div className="incidents-header">

              <div>
                <h2>Mis Incidencias</h2>
                <p>Últimas 5 solicitudes registradas</p>
              </div>

              <button
                className="view-all-btn"
                onClick={() => navigate("/misreportes")}
              >
                Ver todas →
              </button>

            </div>

            {[1, 2, 3, 4, 5].map((item, i) => (
              <div className="incident-item" key={i}>

                <div className="incident-left">
                  <span className="dot blue-dot"></span>

                  <div>
                    <h4>Incidencia de ejemplo #{item}</h4>

                    <div className="incident-tags">
                      <span className="status process">
                        En Proceso
                      </span>

                      <span className="category">
                        Tecnología
                      </span>

                      <span className="date">
                        Jun 2026
                      </span>
                    </div>
                  </div>
                </div>

                <span className="incident-id">
                  INC-20{item}
                </span>

              </div>
            ))}

            <div className="legend">

              <span>
                <i className="legend-dot orange-dot"></i>
                Pendiente
              </span>

              <span>
                <i className="legend-dot blue-dot"></i>
                En Proceso
              </span>

              <span>
                <i className="legend-dot green-dot"></i>
                Resuelto
              </span>

            </div>
          </div>

        </section>

      </main>
    </div>
  );
}

export default Home;