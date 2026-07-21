import {
  useState,
  type ReactNode,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  History,
  Hourglass,
  LogOut,
  Monitor,
  Printer,
  Router,
  Settings,
  Snowflake,
  UserRound,
  Wrench,
  X,
} from "lucide-react";

import TecnicoNavbar from "../components/TecnicoNavbar";
import "../css/dashoardtecnico.css";

/* =========================================
   TIPOS
========================================= */

type PrioridadTicket = "Alta" | "Media";

type EstadoTicket =
  | "Pendiente"
  | "En Proceso";

type TicketPendiente = {
  folio: string;
  tipo: string;
  prioridad: PrioridadTicket;
  estado: EstadoTicket;
  icono: ReactNode;
};

type ProductividadDia = {
  dia: string;
  tickets: number;
};

/* =========================================
   DATOS INICIALES
========================================= */

const ticketsIniciales: TicketPendiente[] = [
  {
    folio: "SOL-2026-0105",
    tipo: "Internet",
    prioridad: "Alta",
    estado: "Pendiente",
    icono: <Router size={22} />,
  },
  {
    folio: "SOL-2026-0102",
    tipo: "Proyector",
    prioridad: "Media",
    estado: "Pendiente",
    icono: <Monitor size={22} />,
  },
  {
    folio: "SOL-2026-0098",
    tipo: "Computadora",
    prioridad: "Media",
    estado: "Pendiente",
    icono: <Printer size={22} />,
  },
  {
    folio: "SOL-2026-0093",
    tipo: "Aire Acondicionado",
    prioridad: "Alta",
    estado: "Pendiente",
    icono: <Snowflake size={22} />,
  },
];

const productividadSemanal: ProductividadDia[] = [
  {
    dia: "Lun",
    tickets: 2,
  },
  {
    dia: "Mar",
    tickets: 4,
  },
  {
    dia: "Mié",
    tickets: 3,
  },
  {
    dia: "Jue",
    tickets: 3,
  },
  {
    dia: "Vie",
    tickets: 2,
  },
];

/* =========================================
   COMPONENTE
========================================= */

const DashboardTecnico: React.FC = () => {
  const navigate = useNavigate();

  const [
    mostrarNotificaciones,
    setMostrarNotificaciones,
  ] = useState(false);

  const [
    mostrarPerfil,
    setMostrarPerfil,
  ] = useState(false);

  const [tickets, setTickets] =
    useState<TicketPendiente[]>(
      ticketsIniciales
    );

  /* =========================================
     TICKETS FILTRADOS
  ========================================= */

  const ticketsPendientes = tickets.filter(
    (ticket) =>
      ticket.estado === "Pendiente"
  );

  const ticketsEnProceso = tickets.filter(
    (ticket) =>
      ticket.estado === "En Proceso"
  );

  /* =========================================
     FUNCIONES
  ========================================= */

  const atenderTicket = (
    folio: string
  ) => {
    const confirmar = window.confirm(
      `¿Deseas comenzar a atender el ticket ${folio}?`
    );

    if (!confirmar) {
      return;
    }

    setTickets((ticketsActuales) =>
      ticketsActuales.map((ticket) =>
        ticket.folio === folio
          ? {
              ...ticket,
              estado: "En Proceso",
            }
          : ticket
      )
    );

    alert(
      `El ticket ${folio} ahora se encuentra En Proceso.`
    );
  };

  const cerrarMenus = () => {
    setMostrarNotificaciones(false);
    setMostrarPerfil(false);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem(
      "recordarSesion"
    );

    navigate("/login");
  };

  return (
    <div className="layout">
      <TecnicoNavbar />

      <main
        className="dashboard-tecnico-container"
        onClick={cerrarMenus}
      >
        {/* =================================
            ENCABEZADO
        ================================= */}

        <header className="dashboard-tecnico-header">
          <div className="dashboard-tecnico-header-information">
            <h1>
              Historial de Incidencias Atendidas
            </h1>

            <p>
              Viernes 27 de junio de 2026
            </p>
          </div>

          <div className="dashboard-tecnico-actions">
            {/* NOTIFICACIONES */}

            <div className="dashboard-tecnico-notification-wrapper">
              <button
                type="button"
                className="dashboard-tecnico-notification-button"
                onClick={(event) => {
                  event.stopPropagation();

                  setMostrarNotificaciones(
                    (estadoActual) =>
                      !estadoActual
                  );

                  setMostrarPerfil(false);
                }}
                aria-label="Abrir notificaciones"
              >
                <Bell
                  size={20}
                  strokeWidth={1.8}
                />

                <span>3</span>
              </button>

              {mostrarNotificaciones && (
                <div
                  className="dashboard-tecnico-notification-menu"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >
                  <div className="dashboard-tecnico-menu-header">
                    <h3>
                      Notificaciones
                    </h3>

                    <button
                      type="button"
                      onClick={() =>
                        setMostrarNotificaciones(
                          false
                        )
                      }
                      aria-label="Cerrar notificaciones"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="dashboard-tecnico-notification-item">
                    <span className="notification-green"></span>

                    <div>
                      <strong>
                        Nuevo ticket asignado
                      </strong>

                      <p>
                        Se te asignó el ticket
                        SOL-2026-0105.
                      </p>
                    </div>
                  </div>

                  <div className="dashboard-tecnico-notification-item">
                    <span className="notification-orange"></span>

                    <div>
                      <strong>
                        Ticket pendiente
                      </strong>

                      <p>
                        El ticket SOL-2026-0093
                        requiere atención.
                      </p>
                    </div>
                  </div>

                  <div className="dashboard-tecnico-notification-item">
                    <span className="notification-blue"></span>

                    <div>
                      <strong>
                        Ticket actualizado
                      </strong>

                      <p>
                        El administrador actualizó
                        una incidencia.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PERFIL */}

            <div className="dashboard-tecnico-profile-wrapper">
              <button
                type="button"
                className={`dashboard-tecnico-profile-button ${
                  mostrarPerfil
                    ? "active"
                    : ""
                }`}
                onClick={(event) => {
                  event.stopPropagation();

                  setMostrarPerfil(
                    (estadoActual) =>
                      !estadoActual
                  );

                  setMostrarNotificaciones(
                    false
                  );
                }}
                aria-expanded={
                  mostrarPerfil
                }
                aria-label="Abrir menú de perfil"
              >
                <span className="dashboard-tecnico-avatar">
                  RP
                </span>

                <span className="dashboard-tecnico-user-information">
                  <strong>
                    Ricardo Pacheco
                  </strong>

                  <small>
                    Técnico de Soporte
                  </small>
                </span>

                <ChevronDown
                  size={18}
                  className={`dashboard-tecnico-profile-arrow ${
                    mostrarPerfil
                      ? "open"
                      : ""
                  }`}
                />
              </button>

              {mostrarPerfil && (
                <div
                  className="dashboard-tecnico-profile-menu"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarPerfil(
                        false
                      );

                      navigate(
                        "/perfiltecnico"
                      );
                    }}
                  >
                    <UserRound
                      size={18}
                    />

                    <span>
                      Mi perfil
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMostrarPerfil(
                        false
                      );

                      navigate(
                        "/configuraciontecnico"
                      );
                    }}
                  >
                    <Settings
                      size={18}
                    />

                    <span>
                      Configuración
                    </span>
                  </button>

                  <div className="dashboard-tecnico-profile-divider"></div>

                  <button
                    type="button"
                    className="dashboard-tecnico-logout-button"
                    onClick={
                      cerrarSesion
                    }
                  >
                    <LogOut
                      size={18}
                    />

                    <span>
                      Cerrar sesión
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* =================================
            CONTENIDO
        ================================= */}

        <section className="dashboard-tecnico-content">
          <div className="dashboard-tecnico-welcome">
            <h2>
              Bienvenido, Ricardo
            </h2>

            <p>
              Aquí tienes un resumen de tu
              actividad y tus tickets pendientes.
            </p>
          </div>

          {/* =================================
              TARJETAS DE RESUMEN
          ================================= */}

          <section className="dashboard-tecnico-stats">
            <article className="dashboard-tecnico-stat-card">
              <div className="dashboard-tecnico-stat-icon">
                <ClipboardList
                  size={28}
                />
              </div>

              <div>
                <strong>8</strong>
                <p>Asignados hoy</p>
              </div>

              <span className="dashboard-tecnico-stat-line"></span>
            </article>

            <article className="dashboard-tecnico-stat-card">
              <div className="dashboard-tecnico-stat-icon">
                <History
                  size={28}
                />
              </div>

              <div>
                <strong>
                  {3 +
                    ticketsEnProceso.length}
                </strong>

                <p>
                  En Proceso
                </p>
              </div>

              <span className="dashboard-tecnico-stat-line"></span>
            </article>

            <article className="dashboard-tecnico-stat-card">
              <div className="dashboard-tecnico-stat-icon">
                <Hourglass
                  size={28}
                />
              </div>

              <div>
                <strong>
                  {
                    ticketsPendientes.length
                  }
                </strong>

                <p>
                  Pendientes
                </p>
              </div>

              <span className="dashboard-tecnico-stat-line"></span>
            </article>

            <article className="dashboard-tecnico-stat-card">
              <div className="dashboard-tecnico-stat-icon">
                <CheckCircle2
                  size={28}
                />
              </div>

              <div>
                <strong>
                  14
                </strong>

                <p>
                  Resueltos esta semana
                </p>
              </div>

              <span className="dashboard-tecnico-stat-line"></span>
            </article>
          </section>

          {/* =================================
              TICKETS ASIGNADOS
          ================================= */}

          <section className="dashboard-tecnico-tickets-grid">
            <article className="dashboard-tecnico-banner">
              <div className="dashboard-banner-illustration">
                <div className="dashboard-banner-clipboard">
                  <ClipboardCheck
                    size={88}
                  />
                </div>

                <span className="dashboard-banner-wrench">
                  <Wrench
                    size={38}
                  />
                </span>
              </div>

              <div className="dashboard-banner-information">
                <h2>
                  Ir a Tickets
                  <br />
                  Asignados
                </h2>

                <p>
                  Revisa y actualiza el estado
                  de tus incidencias asignadas.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/Ticketsasignado"
                    )
                  }
                >
                  Ver mis tickets

                  <ChevronRight
                    size={20}
                  />
                </button>
              </div>
            </article>

            {/* PRÓXIMOS POR ATENDER */}

            <article className="dashboard-upcoming-card">
              <div className="dashboard-upcoming-header">
                <h2>
                  Próximos por atender
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/Ticketsasignado"
                    )
                  }
                >
                  Ver todos

                  <ChevronRight
                    size={16}
                  />
                </button>
              </div>

              <div className="dashboard-upcoming-list">
                {ticketsPendientes.length >
                0 ? (
                  ticketsPendientes.map(
                    (ticket) => (
                      <div
                        className="dashboard-upcoming-row"
                        key={
                          ticket.folio
                        }
                      >
                        <span className="dashboard-upcoming-icon">
                          {
                            ticket.icono
                          }
                        </span>

                        <div className="dashboard-upcoming-info">
                          <strong>
                            {
                              ticket.folio
                            }
                          </strong>

                          <p>
                            {
                              ticket.tipo
                            }
                          </p>
                        </div>

                        <span
                          className={`dashboard-ticket-priority ${
                            ticket.prioridad ===
                            "Alta"
                              ? "high"
                              : "medium"
                          }`}
                        >
                          {
                            ticket.prioridad
                          }
                        </span>

                        <button
                          type="button"
                          className="dashboard-attend-button"
                          onClick={() =>
                            atenderTicket(
                              ticket.folio
                            )
                          }
                        >
                          Atender
                        </button>
                      </div>
                    )
                  )
                ) : (
                  <div className="dashboard-empty-tickets">
                    <CheckCircle2
                      size={42}
                    />

                    <h3>
                      Todo está atendido
                    </h3>

                    <p>
                      No tienes tickets
                      pendientes por atender.
                    </p>
                  </div>
                )}
              </div>
            </article>
          </section>

          {/* =================================
              PRODUCTIVIDAD SEMANAL
          ================================= */}

          <section className="dashboard-productivity-card">
            <div className="dashboard-productivity-header">
              <div>
                <h2>
                  Tu productividad esta semana
                </h2>

                <p>
                  Tickets resueltos por día
                </p>
              </div>

              <div className="dashboard-productivity-icon">
                <BarChart3
                  size={25}
                />
              </div>
            </div>

            <div className="dashboard-productivity-chart">
              <div className="productivity-y-axis">
                <span>6</span>
                <span>3</span>
                <span>0</span>
              </div>

              <div className="productivity-chart-area">
                <div className="productivity-grid-lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="productivity-bars">
                  {productividadSemanal.map(
                    (registro) => (
                      <div
                        className="productivity-bar-column"
                        key={
                          registro.dia
                        }
                      >
                        <strong>
                          {
                            registro.tickets
                          }
                        </strong>

                        <div
                          className="productivity-bar"
                          style={{
                            height: `${
                              registro.tickets *
                              19
                            }px`,
                          }}
                        ></div>

                        <span>
                          {
                            registro.dia
                          }
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default DashboardTecnico;