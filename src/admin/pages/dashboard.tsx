import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "../css/dashboardadmin.css";
import {
  Bell,
  RefreshCw,
  ClipboardList,
  Cpu,
  Activity,
  Zap,
  X,
} from "lucide-react";

function DashboardAdmin() {
  const [actualizado, setActualizado] = useState("Actualizado ahora");
  const [notificaciones, setNotificaciones] = useState(false);

  const tickets = [
    ["TKT-0481", "Infraestructura", "Alta", "Pendiente", "Sin asignar"],
    ["TKT-0479", "Tecnología", "Alta", "En Proceso", "R. Pacheco"],
    ["TKT-0476", "Equipamiento", "Media", "En Proceso", "S. Morales"],
    ["TKT-0474", "Mantenimiento", "Media", "En Espera", "R. Pacheco"],
    ["TKT-0471", "Tecnología", "Alta", "Pendiente", "Sin asignar"],
  ];

  const actualizarDashboard = () => {
    const hora = new Date().toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setActualizado(`Actualizado a las ${hora}`);
  };

  return (
    <div className="layout">
      <AdminNavbar />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h2>Dashboard Administrativo</h2>
            <p>Viernes, 27 de junio de 2026 · Semana 26</p>
          </div>

          <div className="header-actions">
            <button className="btn-refresh" onClick={actualizarDashboard}>
              <RefreshCw size={16} />
              Actualizar
            </button>

            <div className="notification-wrapper">
              <button
                className="notification-btn"
                onClick={() => setNotificaciones(!notificaciones)}
              >
                <Bell size={20} />
                <span></span>
              </button>

              {notificaciones && (
                <div className="notifications-menu">
                  <div className="notifications-header">
                    <h4>Notificaciones</h4>

                    <button onClick={() => setNotificaciones(false)}>
                      <X size={16} />
                    </button>
                  </div>

                  <div className="notification-item">
                    <b>Servidor casi lleno</b>
                    <p>Servidor de archivos al 94% de capacidad.</p>
                    <span>Hace 12 min</span>
                  </div>

                  <div className="notification-item">
                    <b>Tickets sin asignar</b>
                    <p>Hay 3 tickets de alta prioridad sin técnico.</p>
                    <span>Hace 28 min</span>
                  </div>

                  <div className="notification-item">
                    <b>Mantenimiento</b>
                    <p>Mantenimiento preventivo programado mañana.</p>
                    <span>Hace 2 horas</span>
                  </div>
                </div>
              )}
            </div>

            <div className="avatar">AD</div>
          </div>
        </div>

        <div className="update-message">{actualizado}</div>
                <div className="cards">
          <div className="card">
            <div className="card-top">
              <div className="icon orange-icon">
                <ClipboardList size={20} />
              </div>
              <span className="badge red">↘ +4 hoy</span>
            </div>

            <h2>28</h2>
            <h3>Tickets Activos</h3>
            <p>6 sin asignar</p>
          </div>

          <div className="card">
            <div className="card-top">
              <div className="icon green-icon">
                <Cpu size={20} />
              </div>
              <span className="badge green">↗ +2%</span>
            </div>

            <h2>
              87<span>%</span>
            </h2>
            <h3>Equipos Operativos</h3>
            <p>14 con falla reportada</p>
          </div>

          <div className="card">
            <div className="card-top">
              <div className="icon blue-icon">
                <Activity size={20} />
              </div>
              <span className="badge green">↗ 6%</span>
            </div>

            <h2>
              74<span>%</span>
            </h2>
            <h3>Tasa de Resolución</h3>
            <p>Meta: 80% semanal</p>
          </div>

          <div className="card">
            <div className="card-top">
              <div className="icon purple-icon">
                <Zap size={20} />
              </div>
              <span className="badge green">↗ -3h</span>
            </div>

            <h2>
              18<span>h</span>
            </h2>
            <h3>Tiempo Prom. Resolución</h3>
            <p>Meta: menos de 24h</p>
          </div>
        </div>

        <div className="analytics">
          <div className="chart-card large">
            <div className="chart-header">
              <div>
                <h3>Tickets esta semana</h3>
                <p>Abiertos vs. resueltos por día</p>
              </div>

              <div className="legend">
                <span>
                  <i className="dot orange"></i>
                  Abiertos
                </span>

                <span>
                  <i className="dot green"></i>
                  Resueltos
                </span>
              </div>
            </div>

            <div className="line-chart">
              <div className="chart-area">
                <span className="y y12">12</span>
                <span className="y y9">9</span>
                <span className="y y6">6</span>
                <span className="y y3">3</span>
                <span className="y y0">0</span>

                <svg viewBox="0 0 700 220" preserveAspectRatio="none">
                  <path
                    d="M20 150 C90 95 150 80 220 110 S330 60 410 90 S520 170 610 155 S670 150 690 155"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                  />

                  <path
                    d="M20 180 C100 135 170 115 250 120 S360 170 430 125 S520 95 580 150 S650 170 690 175"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="2.5"
                  />
                </svg>

                <div className="days">
                  <span>L</span>
                  <span>M</span>
                  <span>X</span>
                  <span>J</span>
                  <span>V</span>
                  <span>S</span>
                  <span>D</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-card small">
            <h3>Distribución por estado</h3>
            <p>Total de tickets activos</p>

            <div className="donut-chart">
              <div className="donut"></div>
            </div>

            <div className="chart-info">
              <div>
                <span>
                  <i className="dot green"></i>
                  Resueltos
                </span>
                <b>58%</b>
              </div>

              <div>
                <span>
                  <i className="dot blue"></i>
                  En Proceso
                </span>
                <b>22%</b>
              </div>

              <div>
                <span>
                  <i className="dot orange"></i>
                  Pendientes
                </span>
                <b>13%</b>
              </div>

              <div>
                <span>
                  <i className="dot purple"></i>
                  En Espera
                </span>
                <b>7%</b>
              </div>
            </div>
          </div>
        </div>
                <div className="dashboard-bottom">
          <div className="tickets-recientes-card">
            <div className="tickets-header">
              <div>
                <h3>Tickets recientes</h3>
                <p>Últimas 5 incidencias registradas</p>
              </div>

              <button>Ver todos →</button>
            </div>

            <table className="tickets-table">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Tipo</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                  <th>Técnico</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket[0]}>
                    <td className="folio">{ticket[0]}</td>
                    <td>{ticket[1]}</td>

                    <td>
                      <span className={`priority ${ticket[2].toLowerCase()}`}>
                        {ticket[2]}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status ${
                          ticket[3] === "Pendiente"
                            ? "pendiente"
                            : ticket[3] === "En Proceso"
                            ? "proceso"
                            : "espera"
                        }`}
                      >
                        {ticket[3]}
                      </span>
                    </td>

                    <td>
                      {ticket[4] === "Sin asignar" ? (
                        <span className="sin-asignar">{ticket[4]}</span>
                      ) : (
                        ticket[4]
                      )}
                    </td>

                    <td className="dots">...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="side-panel">
            <div className="quick-card">
              <h3>Asignación rápida</h3>
              <p>Tickets sin técnico asignado</p>

              <div className="quick-ticket active">
                <span className="red-dot"></span>
                <div>
                  <h4>TKT-0481</h4>
                  <small>Infraestructura · 27 jun</small>
                </div>
                <b>Alta</b>
              </div>

              <div className="quick-ticket">
                <span className="red-dot"></span>
                <div>
                  <h4>TKT-0471</h4>
                  <small>Tecnología · 23 jun</small>
                </div>
                <b>Alta</b>
              </div>

              <h5>Seleccionar técnico</h5>

              <div className="tech">
                <div className="tech-avatar blue-user">RP</div>
                <div className="tech-info">
                  <p>
                    Ricardo Pacheco <span>Disponible</span>
                  </p>
                  <div className="bar">
                    <i style={{ width: "60%" }}></i>
                  </div>
                </div>
                <small>5/8</small>
              </div>

              <div className="tech">
                <div className="tech-avatar green-user">SM</div>
                <div className="tech-info">
                  <p>
                    Sandra Morales <span className="busy">Ocupada</span>
                  </p>
                  <div className="bar orange-bar">
                    <i style={{ width: "85%" }}></i>
                  </div>
                </div>
                <small>7/8</small>
              </div>

              <div className="tech">
                <div className="tech-avatar purple-user">DH</div>
                <div className="tech-info">
                  <p>
                    Diego Herrera <span>Disponible</span>
                  </p>
                  <div className="bar purple-bar">
                    <i style={{ width: "35%" }}></i>
                  </div>
                </div>
                <small>2/8</small>
              </div>

              <div className="tech">
                <div className="tech-avatar yellow-user">CN</div>
                <div className="tech-info">
                  <p>
                    Carla Núñez <span className="busy">Ocupada</span>
                  </p>
                  <div className="bar orange-bar">
                    <i style={{ width: "75%" }}></i>
                  </div>
                </div>
                <small>6/8</small>
              </div>

              <button className="assign-btn">Asignar ticket</button>
            </div>

            <div className="mini-card">
              <h3>Carga mensual</h3>
              <p>Tickets por mes — 2026</p>

              <div className="mini-bars">
                <div>
                  <span style={{ height: "45px" }}></span>
                  <small>Ene</small>
                </div>

                <div>
                  <span style={{ height: "65px" }}></span>
                  <small>Feb</small>
                </div>

                <div>
                  <span style={{ height: "55px" }}></span>
                  <small>Mar</small>
                </div>

                <div>
                  <span style={{ height: "75px" }}></span>
                  <small>Abr</small>
                </div>

                <div>
                  <span style={{ height: "60px" }}></span>
                  <small>May</small>
                </div>

                <div>
                  <span className="active" style={{ height: "40px" }}></span>
                  <small>Jun</small>
                </div>
              </div>
            </div>

            <div className="alerts-card">
              <div className="alerts-title">
                <h3>Alertas del sistema</h3>
                <span>1 crítica</span>
              </div>

              <div className="alert red-alert">
                <b>Servidor de archivos al 94% de capacidad</b>
                <p>Hace 12 min</p>
              </div>

              <div className="alert yellow-alert">
                <b>3 tickets de Alta prioridad sin asignar</b>
                <p>Hace 28 min</p>
              </div>

              <div className="alert yellow-alert">
                <b>Técnico S. Morales alcanzó límite de carga</b>
                <p>Hace 1 hora</p>
              </div>

              <div className="alert blue-alert">
                <b>Mantenimiento preventivo programado mañana</b>
                <p>Hace 2 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;