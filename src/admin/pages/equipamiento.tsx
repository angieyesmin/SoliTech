import AdminNavbar from "../components/AdminNavbar";
import "../css/gestiondetickets.css";
import {
  Bell,
  Download,
  Plus,
  Clock,
  RefreshCw,
  CheckCircle,
  XCircle,
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  MoreHorizontal,
  UserPlus,
  AlertTriangle,
  FileDown,
  Activity,
} from "lucide-react";

function Gestiondetickets() {
  const tickets = [
    ["TKT-0481", "Infraestructura", "Falla en sistema de acceso Edificio A piso 3", "Alta", "Pendiente", "Sin asignar", "27 jun 2026"],
    ["TKT-0479", "Tecnología", "Conexión a internet inestable en Laboratorio C2", "Alta", "En Proceso", "R. Pacheco", "26 jun 2026"],
    ["TKT-0478", "Equipamiento", "Proyector dañado en aula 204, sin imagen al en...", "Media", "En Proceso", "S. Morales", "26 jun 2026"],
    ["TKT-0476", "Equipamiento", "Impresora sin tóner en biblioteca central sala 1", "Media", "Resuelto", "D. Herrera", "25 jun 2026"],
    ["TKT-0474", "Mantenimiento", "Filtración de agua en pasillo norte Edificio B", "Media", "En Proceso", "R. Pacheco", "24 jun 2026"],
    ["TKT-0471", "Tecnología", "Proyector de sala de juntas sin señal HDMI", "Alta", "Pendiente", "Sin asignar", "23 jun 2026"],
    ["TKT-0469", "Infraestructura", "Cerradura electromagnética fuera de servicio ...", "Alta", "Resuelto", "C. Núñez", "22 jun 2026"],
    ["TKT-0467", "Mantenimiento", "Foco fundido en estacionamiento sector norte", "Baja", "Resuelto", "D. Herrera", "21 jun 2026"],
  ];

  return (
    <div className="layout">
      <AdminNavbar />

      <main className="tickets-container">
        <header className="tickets-header">
          <div>
            <h1>Gestión de Tickets</h1>
            <p>Viernes, 27 de junio de 2026 · Semana 26</p>
          </div>

          <div className="tickets-actions">
            <button className="btn-export">
              <Download size={16} />
              Exportar
            </button>

            <button className="btn-new">
              <Plus size={18} />
              Nuevo Ticket
            </button>

            <div className="bell-box">
              <Bell size={19} />
              <span></span>
            </div>

            <div className="admin-avatar">AD</div>
          </div>
        </header>

        <section className="tickets-content">
          <div className="tickets-main">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon yellow">
                  <Clock size={18} />
                </div>
                <h2 className="yellow-text">3</h2>
                <p>Pendientes</p>
              </div>

              <div className="stat-card">
                <div className="stat-icon blue">
                  <RefreshCw size={18} />
                </div>
                <h2 className="blue-text">4</h2>
                <p>En Proceso</p>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">
                  <CheckCircle size={18} />
                </div>
                <h2 className="green-text">4</h2>
                <p>Resueltos</p>
              </div>

              <div className="stat-card">
                <div className="stat-icon gray">
                  <XCircle size={18} />
                </div>
                <h2 className="gray-text">1</h2>
                <p>Cancelados</p>
              </div>
            </div>

            <div className="ticket-filters">
              <div className="search-box">
                <Search size={17} />
                <input placeholder="Folio, tipo o descripción..." />
              </div>

              <SlidersHorizontal size={18} className="filter-icon" />

              <select>
                <option>Estado: Todos</option>
              </select>

              <select>
                <option>Prioridad: Todas</option>
              </select>

              <select>
                <option>Técnico: Todos</option>
              </select>
            </div>

            <div className="tickets-table-card">
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>Folio ↕</th>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Prioridad ↕</th>
                    <th>Estado</th>
                    <th>Técnico Asignado</th>
                    <th>Fecha ↕</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket[0]}>
                      <td className="folio">{ticket[0]}</td>
                      <td>{ticket[1]}</td>
                      <td className="descripcion">{ticket[2]}</td>

                      <td>
                        <span
                          className={`priority ${
                            ticket[3] === "Alta"
                              ? "alta"
                              : ticket[3] === "Media"
                              ? "media"
                              : "baja"
                          }`}
                        >
                          {ticket[3]}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`status ${
                            ticket[4] === "Pendiente"
                              ? "pendiente"
                              : ticket[4] === "En Proceso"
                              ? "proceso"
                              : "resuelto"
                          }`}
                        >
                          {ticket[4]}
                        </span>
                      </td>

                      <td>
                        {ticket[5] === "Sin asignar" ? (
                          <span className="sin-asignar">Sin asignar</span>
                        ) : (
                          <div className="tech-cell">
                            <span>{ticket[5].split(" ")[0].replace(".", "")}</span>
                            <p>{ticket[5]}</p>
                          </div>
                        )}
                      </td>

                      <td>{ticket[6]}</td>

                      <td>
                        <div className="table-actions">
                          <button>
                            <Eye size={15} />
                          </button>
                          <button>
                            <Pencil size={15} />
                          </button>
                          <button>
                            <MoreHorizontal size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="table-footer">
                <p>Mostrando 1–8 de 12 tickets</p>

                <div className="pagination">
                  <button>‹</button>
                  <button className="active-page">1</button>
                  <button>2</button>
                  <button>›</button>
                </div>
              </div>
            </div>
          </div>

          <aside className="tickets-sidebar">
            <div className="side-card">
              <h3>Acciones rápidas</h3>

              <div className="quick-action">
                <div className="quick-icon blue">
                  <UserPlus size={16} />
                </div>
                <p>Asignar tickets sin técnico</p>
                <span>3</span>
              </div>

              <div className="quick-action">
                <div className="quick-icon red">
                  <AlertTriangle size={16} />
                </div>
                <p>Ver tickets de alta prioridad</p>
                <span className="red-badge">4</span>
              </div>

              <div className="quick-action">
                <div className="quick-icon green">
                  <FileDown size={16} />
                </div>
                <p>Exportar reporte CSV</p>
              </div>

              <div className="quick-action">
                <div className="quick-icon purple">
                  <Plus size={16} />
                </div>
                <p>Crear nuevo ticket</p>
              </div>
            </div>

            <div className="side-card">
              <h3>Resumen de estado</h3>

              <div className="summary-row">
                <p>Pendientes <b>3</b></p>
                <div><span className="bar-yellow"></span></div>
              </div>

              <div className="summary-row">
                <p>En Proceso <b>4</b></p>
                <div><span className="bar-blue"></span></div>
              </div>

              <div className="summary-row">
                <p>Resueltos <b>4</b></p>
                <div><span className="bar-green"></span></div>
              </div>

              <div className="summary-row">
                <p>Cancelados <b>1</b></p>
                <div><span className="bar-gray"></span></div>
              </div>
            </div>

            <div className="side-card">
              <div className="activity-title">
                <h3>Actividad reciente</h3>
                <Activity size={16} />
              </div>

              <div className="activity-item blue-dot">
                <b>TKT-0479</b>
                <p>Estado actualizado a En Proceso</p>
                <span>R. Pacheco · Hace 18 min</span>
              </div>

              <div className="activity-item yellow-dot">
                <b>TKT-0481</b>
                <p>Ticket creado sin asignar</p>
                <span>Sistema · Hace 32 min</span>
              </div>

              <div className="activity-item green-dot">
                <b>TKT-0476</b>
                <p>Marcado como Resuelto</p>
                <span>D. Herrera · Hace 2 horas</span>
              </div>

              <div className="activity-item purple-dot">
                <b>TKT-0469</b>
                <p>Comentario agregado por técnico</p>
                <span>C. Núñez · Hace 3 horas</span>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Gestiondetickets;