import Navbar from "../components/Navbar";
import "../css/misreportes.css";

function MisReportes() {
  const reportes = [
    ["TKT-0481", "Infraestructura", "Edificio A — Piso 3", "Aula 304", "Alta", "Pendiente", "Carlos Mendoza", "27 jun 2026"],
    ["TKT-0479", "Tecnología", "Laboratorio de Cómputo 2", "Bloque C", "Alta", "En Proceso", "Luisa Fernández", "26 jun 2026"],
    ["TKT-0476", "Equipamiento", "Biblioteca Central", "Sala de lectura", "Media", "En Proceso", "Roberto Salas", "25 jun 2026"],
    ["TKT-0474", "Mantenimiento", "Edificio B — Planta baja", "Pasillo norte", "Media", "En Espera", "Ana Torres", "24 jun 2026"],
    ["TKT-0471", "Tecnología", "Sala de juntas", "Rectoría", "Alta", "Pendiente", "Jorge Villanueva", "23 jun 2026"],
    ["TKT-0468", "Infraestructura", "Cafetería", "Planta baja", "Baja", "En Espera", "María García", "21 jun 2026"],
    ["TKT-0465", "Equipamiento", "Aula Magna", "Auditorio", "Media", "En Proceso", "Sandra Ríos", "20 jun 2026"],
  ];

  return (
    <div className="layout">
      <Navbar />

      <main className="misreportes-container">
        <header className="top-header">
          <div>
            <h1>Tickets Asignados</h1>
            <p>Viernes, 27 de junio de 2026</p>
          </div>

          <div className="user-actions">
            <span className="bell">♧</span>
            <div className="avatar">RP</div>
          </div>
        </header>

        <section className="stats">
          <div className="stat-card">
            <h2>8</h2>
            <p>Asignados hoy</p>
            <span>↝ Actualizado ahora</span>
          </div>

          <div className="stat-card">
            <h2 className="blue">3</h2>
            <p>En Proceso</p>
            <span>↝ Actualizado ahora</span>
          </div>

          <div className="stat-card">
            <h2 className="orange">3</h2>
            <p>Pendientes</p>
            <span>↝ Actualizado ahora</span>
          </div>

          <div className="stat-card">
            <h2 className="green">14</h2>
            <p>Resueltos esta semana</p>
            <span>↝ Actualizado ahora</span>
          </div>
        </section>

        <section className="tabla-card">
          <div className="tabla-tools">
            <div className="search-box">
              <span>⌕</span>
              <input placeholder="Buscar folio, tipo, ubicación..." />
            </div>

            <button className="filter">♡</button>

            <button className="tab active">Todos</button>
            <button className="tab">Pendiente</button>
            <button className="tab">En Proceso</button>
            <button className="tab">En Espera</button>
            <button className="tab">Resuelto</button>

            <select>
              <option>Prioridad: Todas</option>
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>

            <button className="refresh">↻</button>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Folio ↕</th>
                  <th>Tipo</th>
                  <th>Ubicación</th>
                  <th>Prioridad ↕</th>
                  <th>Estado</th>
                  <th>Reportante</th>
                  <th>Fecha ↕</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {reportes.map((r) => (
                  <tr key={r[0]}>
                    <td className="folio">{r[0]}</td>
                    <td>{r[1]}</td>

                    <td>
                      <div className="location">
                        <span>⌾</span>
                        <div>
                          <p>{r[2]}</p>
                          <small>{r[3]}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`priority ${r[4].toLowerCase()}`}>
                        {r[4]}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status ${
                          r[5] === "Pendiente"
                            ? "pendiente"
                            : r[5] === "En Proceso"
                            ? "proceso"
                            : "espera"
                        }`}
                      >
                        {r[5]}
                      </span>
                    </td>

                    <td>
                      <div className="reporter">
                        <p>{r[6]}</p>
                        <small>{r[7]}</small>
                      </div>
                    </td>

                    <td className="date">{r[7]}</td>

                    <td>
                      <div className="actions">
                        <button>⊙</button>
                        <button>□</button>
                        <button className="update">Actualizar⌄</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MisReportes;