import Navbar from "../components/Navbar";
import "../css/home.css";

function Home() {
  return (
    <div className="layout">
      {/* SIDEBAR */}
      <Navbar />

      {/* CONTENIDO */}
      <main className="home-content">

        {/* Barra superior */}
        <header className="topbar">
          <div className="topbar-left">
            <h3>Inicio</h3>
            <p>Viernes, 27 de junio de 2026</p>
          </div>

          <div className="topbar-right">
            <button className="notification-btn">
              🔔
            </button>

            <div className="user-avatar">
              MA
            </div>
          </div>
        </header>

        {/* Bienvenida */}
        <section className="welcome-card">
          <h1>Bienvenida, María</h1>
          <p>
            Aquí puedes reportar incidencias y hacer seguimiento a tus
            solicitudes.
          </p>
        </section>

        {/* Tarjetas */}
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

        {/* Panel inferior */}
        <section className="dashboard-grid">

          {/* Panel izquierdo */}
          <div className="report-card">

            <div className="report-icon">
              +
            </div>

            <h2>Reportar una incidencia</h2>

            <p>
              Informa un problema técnico, de infraestructura
              o equipamiento a tu institución.
            </p>

            <button className="new-report-btn">
              ⊕ Nuevo Reporte
            </button>

          </div>

          {/* Panel derecho */}
          <div className="incidents-card">

            <div className="incidents-header">

              <div>
                <h2>Mis Incidencias</h2>
                <p>Últimas 5 solicitudes registradas</p>
              </div>

              <button className="view-all-btn">
                Ver todas →
              </button>

            </div>

            <div className="incident-item">

              <div className="incident-left">

                <span className="dot blue-dot"></span>

                <div>

                  <h4>Falla en sistema de acceso Edificio B</h4>

                  <div className="incident-tags">

                    <span className="status process">
                      En Proceso
                    </span>

                    <span className="category">
                      Infraestructura
                    </span>

                    <span className="date">
                      24 jun 2026
                    </span>

                  </div>

                </div>

              </div>

              <span className="incident-id">
                INC-2024
              </span>

            </div>

            <div className="incident-item">

              <div className="incident-left">

                <span className="dot orange-dot"></span>

                <div>

                  <h4>Conexión a internet inestable laboratorio 3</h4>

                  <div className="incident-tags">

                    <span className="status pending">
                      Pendiente
                    </span>

                    <span className="category">
                      Tecnología
                    </span>

                    <span className="date">
                      22 jun 2026
                    </span>

                  </div>

                </div>

              </div>

              <span className="incident-id">
                INC-2023
              </span>

            </div>

            <div className="incident-item">

              <div className="incident-left">

                <span className="dot green-dot"></span>

                <div>

                  <h4>Proyector dañado en aula 204</h4>

                  <div className="incident-tags">

                    <span className="status resolved">
                      Resuelto
                    </span>

                    <span className="category">
                      Equipamiento
                    </span>

                    <span className="date">
                      18 jun 2026
                    </span>

                  </div>

                </div>

              </div>

              <span className="incident-id">
                INC-2021
              </span>

            </div>

            <div className="incident-item">

              <div className="incident-left">

                <span className="dot green-dot"></span>

                <div>

                  <h4>Filtración de agua en pasillo norte</h4>

                  <div className="incident-tags">

                    <span className="status resolved">
                      Resuelto
                    </span>

                    <span className="category">
                      Mantenimiento
                    </span>

                    <span className="date">
                      12 jun 2026
                    </span>

                  </div>

                </div>

              </div>

              <span className="incident-id">
                INC-2019
              </span>

            </div>

            <div className="incident-item">

              <div className="incident-left">

                <span className="dot blue-dot"></span>

                <div>

                  <h4>Impresora de secretaría sin tóner</h4>

                  <div className="incident-tags">

                    <span className="status process">
                      En Proceso
                    </span>

                    <span className="category">
                      Equipamiento
                    </span>

                    <span className="date">
                      8 jun 2026
                    </span>

                  </div>

                </div>

              </div>

              <span className="incident-id">
                INC-2017
              </span>

            </div>

            <div className="legend">

              <span><i className="legend-dot orange-dot"></i> Pendiente</span>

              <span><i className="legend-dot blue-dot"></i> En Proceso</span>

              <span><i className="legend-dot green-dot"></i> Resuelto</span>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Home;