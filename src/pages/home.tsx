import { useNavigate } from "react-router-dom";
import "../css/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">SoliTech</h2>

        <nav>
          <button className="active">Inicio</button>

          <button onClick={() => navigate("/reportar")}>
            Reportar Incidencia
          </button>

          <button onClick={() => navigate("/mis-reportes")}>
            Mis Reportes
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* HEADER */}
        <header className="header">
          <h3>Inicio</h3>
          <div className="user">MA</div>
        </header>

        {/* BIENVENIDA */}
        <section className="welcome">
          <h1>Bienvenida, María</h1>
          <p>
            Aquí puedes reportar incidencias y hacer seguimiento a tus solicitudes.
          </p>
        </section>

        {/* CARDS */}
        <section className="cards">
          <div className="card">
            <h2>12</h2>
            <p>Total reportados</p>
          </div>

          <div className="card">
            <h2>3</h2>
            <p>En Proceso</p>
          </div>

          <div className="card">
            <h2>2</h2>
            <p>Pendientes</p>
          </div>

          <div className="card">
            <h2>7</h2>
            <p>Resueltos</p>
          </div>
        </section>

        {/* CONTENIDO */}
        <section className="content">

          {/* REPORTAR */}
          <div className="report-box">
            <h3>Reportar una incidencia</h3>
            <p>
              Informa un problema técnico, de infraestructura o equipamiento.
            </p>

            <button onClick={() => navigate("/ReportarIncidentes")}>
              Nuevo Reporte
            </button>
          </div>

          {/* LISTA */}
          <div className="list">
            <h3>Mis Incidencias</h3>

            <div className="item">Falla en sistema de acceso</div>
            <div className="item">Internet inestable</div>
            <div className="item">Proyector dañado</div>
            <div className="item">Filtración de agua</div>
            <div className="item">Impresora sin tóner</div>

            <button
              className="ver-todo"
              onClick={() => navigate("/mis-reportes")}
            >
              Ver todas →
            </button>
          </div>

        </section>

      </main>
    </div>
  );
}

export default Home;