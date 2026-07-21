import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import "../css/dashboardadmin.css";

import {
  Activity,
  AlertTriangle,
  Bell,
  Clock3,
  Monitor,
  RefreshCw,
  Server,
  Ticket,
  UserRound,
  Wrench,
} from "lucide-react";

type Tecnico = {
  nombre: string;
  estado: "Disponible" | "Ocupado";
  asignados: number;
  total: number;
};

type TicketReciente = {
  folio: string;
  tipo: string;
  prioridad: "Alta" | "Media";
  estado: "Pendiente" | "En Proceso" | "En Espera";
  tecnico: string;
};

type CargaMensual = {
  mes: string;
  tickets: number;
};

function DashboardAdmin() {
  const navigate = useNavigate();

  const [tecnicoSeleccionado, setTecnicoSeleccionado] =
    useState<string>("");

  const ticketsRecientes: TicketReciente[] = [
    {
      folio: "TKT-0481",
      tipo: "Infraestructura",
      prioridad: "Alta",
      estado: "Pendiente",
      tecnico: "Sin asignar",
    },
    {
      folio: "TKT-0479",
      tipo: "Tecnología",
      prioridad: "Alta",
      estado: "En Proceso",
      tecnico: "R. Pacheco",
    },
    {
      folio: "TKT-0476",
      tipo: "Equipamiento",
      prioridad: "Media",
      estado: "En Proceso",
      tecnico: "S. Morales",
    },
    {
      folio: "TKT-0474",
      tipo: "Mantenimiento",
      prioridad: "Media",
      estado: "En Espera",
      tecnico: "R. Pacheco",
    },
    {
      folio: "TKT-0471",
      tipo: "Tecnología",
      prioridad: "Alta",
      estado: "Pendiente",
      tecnico: "Sin asignar",
    },
  ];

  const tecnicos: Tecnico[] = [
    {
      nombre: "Ricardo Pacheco",
      estado: "Disponible",
      asignados: 4,
      total: 8,
    },
    {
      nombre: "Sandra Morales",
      estado: "Ocupado",
      asignados: 7,
      total: 8,
    },
    {
      nombre: "Diego Herrera",
      estado: "Disponible",
      asignados: 2,
      total: 8,
    },
    {
      nombre: "Carla Núñez",
      estado: "Ocupado",
      asignados: 6,
      total: 8,
    },
  ];

  const cargaMensual: CargaMensual[] = [
    {
      mes: "Feb",
      tickets: 42,
    },
    {
      mes: "Mar",
      tickets: 59,
    },
    {
      mes: "Abr",
      tickets: 51,
    },
    {
      mes: "May",
      tickets: 69,
    },
    {
      mes: "Jun",
      tickets: 75,
    },
  ];

  const totalCargaMensual = cargaMensual.reduce(
    (total, item) => total + item.tickets,
    0
  );

  const valorMaximoCarga = 80;

  const asignarTicket = () => {
    if (!tecnicoSeleccionado) {
      alert("Selecciona un técnico disponible.");
      return;
    }

    const tecnico = tecnicos.find(
      (item) => item.nombre === tecnicoSeleccionado
    );

    if (!tecnico) {
      alert("No se encontró el técnico seleccionado.");
      return;
    }

    if (tecnico.estado === "Ocupado") {
      alert("El técnico seleccionado no está disponible.");
      return;
    }

    alert(
      `Ticket asignado correctamente a ${tecnico.nombre}.`
    );
  };

  const actualizarDashboard = () => {
    window.location.reload();
  };

  const mostrarNotificaciones = () => {
    alert("Tienes 4 notificaciones pendientes.");
  };

  return (
    <div className="layout">
      <AdminNavbar />

      <main className="dashboard-admin-container">
        <header className="dashboard-admin-header">
          <div className="dashboard-admin-title">
            <div className="dashboard-title-icon">
              <Activity size={20} />
            </div>

            <div>
              <h1>Dashboard Administrativo</h1>

              <p>
                Viernes 27 de junio de 2026 · Semana 26
              </p>
            </div>
          </div>

          <div className="dashboard-header-actions">
            <button
              type="button"
              className="dashboard-refresh-button"
              onClick={actualizarDashboard}
            >
              <RefreshCw size={16} />
              Actualizar
            </button>

            <button
              type="button"
              className="dashboard-notification-button"
              aria-label="Abrir notificaciones"
              onClick={mostrarNotificaciones}
            >
              <Bell size={18} />
              <span>4</span>
            </button>

            <div className="dashboard-admin-avatar">
              AD
            </div>
          </div>
        </header>

        <section className="dashboard-admin-content">
          {/* TARJETAS PRINCIPALES */}

          <div className="dashboard-stats-grid">
            <article className="dashboard-stat-card">
              <div className="dashboard-stat-top">
                <div className="dashboard-stat-icon blue-stat-icon">
                  <Ticket size={19} />
                </div>

                <span className="dashboard-stat-badge blue-stat-badge">
                  +4 hoy
                </span>
              </div>

              <h2>28</h2>
              <h3>Tickets Activos</h3>
              <p>8 sin asignar</p>

              <div className="dashboard-progress">
                <span className="blue-progress"></span>
              </div>
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-top">
                <div className="dashboard-stat-icon green-stat-icon">
                  <Monitor size={19} />
                </div>

                <span className="dashboard-stat-badge green-stat-badge">
                  +2%
                </span>
              </div>

              <h2>87%</h2>
              <h3>Equipos Operativos</h3>
              <p>10 con falla reportada</p>

              <div className="dashboard-progress">
                <span className="green-progress"></span>
              </div>
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-top">
                <div className="dashboard-stat-icon green-stat-icon">
                  <Activity size={19} />
                </div>

                <span className="dashboard-stat-badge green-stat-badge">
                  +9%
                </span>
              </div>

              <h2>74%</h2>
              <h3>Tasa de Resolución</h3>
              <p>Meta: 80% semanal</p>

              <div className="dashboard-progress">
                <span className="resolution-progress"></span>
              </div>
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-top">
                <div className="dashboard-stat-icon orange-stat-icon">
                  <Clock3 size={19} />
                </div>

                <span className="dashboard-stat-badge orange-stat-badge">
                  -3h
                </span>
              </div>

              <h2>18h</h2>
              <h3>Tiempo Prom. Resolución</h3>
              <p>Meta: menos de 24h</p>

              <div className="dashboard-progress">
                <span className="orange-progress"></span>
              </div>
            </article>
          </div>

          {/* GRÁFICAS PRINCIPALES */}

          <section className="dashboard-charts-grid">
            <article className="weekly-chart-card">
              <div className="chart-card-header">
                <div>
                  <h2>Tickets esta semana</h2>
                  <p>Lun — Dom · Semana 26</p>
                </div>

                <div className="chart-legend">
                  <span>
                    <i className="legend-line orange-line"></i>
                    Abiertos
                  </span>

                  <span>
                    <i className="legend-line green-line"></i>
                    Resueltos
                  </span>
                </div>
              </div>

              <div className="weekly-chart">
                <div className="chart-y-axis">
                  <span>12</span>
                  <span>9</span>
                  <span>6</span>
                  <span>3</span>
                  <span>0</span>
                </div>

                <div className="chart-main-area">
                  <div className="horizontal-grid-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <svg
                    className="weekly-chart-svg"
                    viewBox="0 0 760 190"
                    preserveAspectRatio="none"
                  >
                    <path
                      className="resolved-line"
                      d="
                        M10 95
                        C80 78, 110 70, 145 72
                        C195 76, 220 112, 275 110
                        C330 105, 355 62, 410 58
                        C465 58, 510 82, 555 88
                        C615 103, 650 138, 695 142
                        C720 145, 740 150, 750 150
                      "
                    />

                    <circle cx="10" cy="95" r="4" />
                    <circle cx="145" cy="72" r="4" />
                    <circle cx="275" cy="110" r="4" />
                    <circle cx="410" cy="58" r="4" />
                    <circle cx="555" cy="88" r="4" />
                    <circle cx="695" cy="142" r="4" />
                    <circle cx="750" cy="150" r="4" />
                  </svg>

                  <div className="chart-days">
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mié</span>
                    <span>Jue</span>
                    <span>Vie</span>
                    <span>Sáb</span>
                    <span>Dom</span>
                  </div>
                </div>
              </div>
            </article>

            <article className="distribution-card">
              <div className="distribution-header">
                <h2>Distribución por estado</h2>
                <p>128 tickets totales</p>
              </div>

              <div className="donut-container">
                <div className="dashboard-donut">
                  <div className="donut-center"></div>
                </div>
              </div>

              <div className="distribution-list">
                <div className="distribution-item">
                  <span>
                    <i className="distribution-dot resolved-dot"></i>
                    Resueltos
                  </span>

                  <b>58%</b>
                </div>

                <div className="distribution-item">
                  <span>
                    <i className="distribution-dot process-dot"></i>
                    En Proceso
                  </span>

                  <b>22%</b>
                </div>

                <div className="distribution-item">
                  <span>
                    <i className="distribution-dot pending-dot"></i>
                    Pendientes
                  </span>

                  <b>13%</b>
                </div>

                <div className="distribution-item">
                  <span>
                    <i className="distribution-dot waiting-dot"></i>
                    En Espera
                  </span>

                  <b>7%</b>
                </div>
              </div>
            </article>
          </section>

          {/* TICKETS, ASIGNACIÓN Y ALERTAS */}

          <section className="dashboard-lower-grid">
            <article className="recent-tickets-card">
              <div className="recent-tickets-header">
                <h2>Tickets recientes</h2>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/gestion-tickets")
                  }
                >
                  Ver todos
                  <span>›</span>
                </button>
              </div>

              <div className="recent-table-scroll">
                <table className="recent-tickets-table">
                  <thead>
                    <tr>
                      <th>Folio</th>
                      <th>Tipo</th>
                      <th>Prioridad</th>
                      <th>Estado</th>
                      <th>Técnico</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ticketsRecientes.map(
                      (ticketItem) => (
                        <tr key={ticketItem.folio}>
                          <td className="recent-folio">
                            {ticketItem.folio}
                          </td>

                          <td>
                            {ticketItem.tipo}
                          </td>

                          <td>
                            <span
                              className={`recent-priority ${ticketItem.prioridad.toLowerCase()}`}
                            >
                              {
                                ticketItem.prioridad
                              }
                            </span>
                          </td>

                          <td>
                            <span
                              className={`recent-status ${
                                ticketItem.estado ===
                                "Pendiente"
                                  ? "pending-status"
                                  : ticketItem.estado ===
                                    "En Proceso"
                                  ? "process-status"
                                  : "waiting-status"
                              }`}
                            >
                              {ticketItem.estado}
                            </span>
                          </td>

                          <td
                            className={
                              ticketItem.tecnico ===
                              "Sin asignar"
                                ? "unassigned-technician"
                                : ""
                            }
                          >
                            {ticketItem.tecnico}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </article>

            <aside className="dashboard-right-column">
              <article className="quick-assignment-card">
                <h2>Asignación rápida</h2>

                <div className="technicians-list">
                  {tecnicos.map((tecnico) => {
                    const porcentaje =
                      (tecnico.asignados /
                        tecnico.total) *
                      100;

                    const seleccionado =
                      tecnicoSeleccionado ===
                      tecnico.nombre;

                    return (
                      <button
                        type="button"
                        key={tecnico.nombre}
                        className={`technician-row ${
                          seleccionado
                            ? "technician-selected"
                            : ""
                        }`}
                        onClick={() =>
                          setTecnicoSeleccionado(
                            tecnico.nombre
                          )
                        }
                      >
                        <div
                          className={`technician-point ${
                            tecnico.estado ===
                            "Disponible"
                              ? "available-point"
                              : "busy-point"
                          }`}
                        ></div>

                        <div className="technician-information">
                          <div className="technician-name-row">
                            <strong>
                              {tecnico.nombre}
                            </strong>

                            <span
                              className={
                                tecnico.estado ===
                                "Disponible"
                                  ? "available-text"
                                  : "busy-text"
                              }
                            >
                              {tecnico.estado}
                            </span>
                          </div>

                          <div className="technician-progress">
                            <span
                              className={
                                tecnico.estado ===
                                "Disponible"
                                  ? "available-progress"
                                  : "busy-progress"
                              }
                              style={{
                                width: `${porcentaje}%`,
                              }}
                            ></span>
                          </div>

                          <small>
                            {tecnico.asignados}/
                            {tecnico.total} tickets
                            asignados
                          </small>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="assign-ticket-button"
                  onClick={asignarTicket}
                >
                  Asignar Ticket
                </button>
              </article>

              <article className="system-alerts-card">
                <h2>Alertas del sistema</h2>

                <div className="system-alert danger-system-alert">
                  <Server size={16} />

                  <span>
                    Servidor de archivos al 94% de
                    capacidad
                  </span>
                </div>

                <div className="system-alert danger-system-alert">
                  <AlertTriangle size={16} />

                  <span>
                    3 tickets de alta prioridad sin
                    asignar
                  </span>
                </div>

                <div className="system-alert warning-system-alert">
                  <UserRound size={16} />

                  <span>
                    Técnico S. Morales alcanzó límite
                    de carga
                  </span>
                </div>

                <div className="system-alert information-system-alert">
                  <Wrench size={16} />

                  <span>
                    Mantenimiento preventivo
                    programado mañana
                  </span>
                </div>
              </article>
            </aside>
          </section>

          {/* CARGA MENSUAL: SIN JULIO */}

          <section className="monthly-load-card">
            <div className="monthly-load-header">
              <div>
                <h2>Carga mensual</h2>

                <p>
                  Tickets atendidos · Feb — Jun 2026
                </p>
              </div>

              <span className="monthly-total">
                Total: {totalCargaMensual} tickets
              </span>
            </div>

            <div className="monthly-chart-content">
              <div className="monthly-y-axis">
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
                <span>0</span>
              </div>

              <div className="monthly-chart-area">
                <div className="monthly-grid-lines">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="monthly-bars">
                  {cargaMensual.map((item) => {
                    const altura =
                      (item.tickets /
                        valorMaximoCarga) *
                      100;

                    return (
                      <div
                        className="monthly-bar-column"
                        key={item.mes}
                      >
                        <div className="monthly-bar-wrapper">
                          <div
                            className="monthly-bar"
                            style={{
                              height: `${altura}%`,
                            }}
                          >
                            <div className="monthly-tooltip">
                              <strong>
                                {item.mes}
                              </strong>

                              <span>
                                Tickets:{" "}
                                {item.tickets}
                              </span>
                            </div>
                          </div>
                        </div>

                        <span className="monthly-month">
                          {item.mes}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default DashboardAdmin;