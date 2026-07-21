import { useNavigate } from "react-router-dom";

import {
  AirVent,
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  Hourglass,
  Monitor,
  Printer,
  Wifi,
} from "lucide-react";

import TecnicoNavbar from "../components/TecnicoNavbar";
import "../css/dashoardtecnico.css";

/* ================= TIPOS ================= */

type PrioridadTicket = "Alta" | "Media";

type TicketPendiente = {
  folio: string;
  categoria: string;
  prioridad: PrioridadTicket;
  icono: React.ReactNode;
};

type ProductividadDia = {
  dia: string;
  cantidad: number;
};

/* ================= DATOS DE EJEMPLO ================= */

const ticketsPendientes: TicketPendiente[] = [
  {
    folio: "SOL-2026-0105",
    categoria: "Internet",
    prioridad: "Alta",
    icono: <Wifi size={24} strokeWidth={1.8} />,
  },
  {
    folio: "SOL-2026-0102",
    categoria: "Proyector",
    prioridad: "Media",
    icono: <Monitor size={24} strokeWidth={1.8} />,
  },
  {
    folio: "SOL-2026-0098",
    categoria: "Computadora",
    prioridad: "Media",
    icono: <Printer size={24} strokeWidth={1.8} />,
  },
  {
    folio: "SOL-2026-0093",
    categoria: "Aire Acondicionado",
    prioridad: "Alta",
    icono: <AirVent size={24} strokeWidth={1.8} />,
  },
];

const productividadSemanal: ProductividadDia[] = [
  {
    dia: "Lun",
    cantidad: 2,
  },
  {
    dia: "Mar",
    cantidad: 4,
  },
  {
    dia: "Mié",
    cantidad: 3,
  },
  {
    dia: "Jue",
    cantidad: 3,
  },
  {
    dia: "Vie",
    cantidad: 2,
  },
];

/* ================= COMPONENTE ================= */

const DashboardTecnico: React.FC = () => {
  const navigate = useNavigate();

  const irATickets = () => {
    navigate("/Ticketsasignado");
  };

  return (
    <div className="layout">
      {/* ================= NAVBAR ================= */}
      <TecnicoNavbar />

      <main className="dashboard-tecnico">
        {/* ================= ENCABEZADO ================= */}
        <header className="dashboard-tecnico-header">
          <div className="dashboard-header-left">
            <h1>Inicio</h1>

            <p>Viernes 27 de junio de 2026</p>
          </div>

          <div className="dashboard-header-right">
            {/* NOTIFICACIONES */}
            <button
              type="button"
              className="dashboard-notification-button"
              aria-label="Abrir notificaciones"
            >
              <Bell size={21} strokeWidth={1.8} />

              <span>3</span>
            </button>

            {/* PERFIL */}
            <button
              type="button"
              className="dashboard-profile-button"
              aria-label="Abrir perfil"
            >
              <span className="dashboard-profile-avatar">
                RP
              </span>

              <span className="dashboard-profile-info">
                <strong>Ricardo Pacheco</strong>
                <small>Técnico de Soporte</small>
              </span>

              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        {/* ================= CONTENIDO ================= */}
        <section className="dashboard-tecnico-content">
          {/* BIENVENIDA */}
          <div className="dashboard-welcome">
            <h2>Bienvenido, Ricardo</h2>

            <p>
              Aquí tienes un resumen de tu actividad y tus tickets
              pendientes.
            </p>
          </div>

          {/* ================= ESTADÍSTICAS ================= */}
          <section className="dashboard-stats-grid">
            <article className="dashboard-stat-card">
              <div className="dashboard-stat-main">
                <div className="dashboard-stat-icon">
                  <ClipboardList
                    size={33}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="dashboard-stat-information">
                  <strong>8</strong>
                  <span>Asignados hoy</span>
                </div>
              </div>

              <div className="dashboard-stat-line" />
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-main">
                <div className="dashboard-stat-icon">
                  <Clock3
                    size={34}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="dashboard-stat-information">
                  <strong>3</strong>
                  <span>En Proceso</span>
                </div>
              </div>

              <div className="dashboard-stat-line" />
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-main">
                <div className="dashboard-stat-icon">
                  <Hourglass
                    size={33}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="dashboard-stat-information">
                  <strong>3</strong>
                  <span>Pendientes</span>
                </div>
              </div>

              <div className="dashboard-stat-line" />
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-main">
                <div className="dashboard-stat-icon">
                  <CheckCircle2
                    size={34}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="dashboard-stat-information">
                  <strong>14</strong>
                  <span>Resueltos esta semana</span>
                </div>
              </div>

              <div className="dashboard-stat-line" />
            </article>
          </section>

          {/* ================= SECCIÓN INFERIOR ================= */}
          <section className="dashboard-bottom">
            {/* TARJETA DE ACCESO A TICKETS */}
            <article className="tickets-card">
              <div className="tickets-image">
                <ClipboardList
                  size={118}
                  strokeWidth={1.35}
                />
              </div>

              <div className="tickets-info">
                <h2>
                  Ir a Tickets
                  <br />
                  Asignados
                </h2>

                <p>
                  Revisa y actualiza el estado de tus incidencias
                  asignadas.
                </p>

                <button
                  type="button"
                  className="tickets-btn"
                  onClick={irATickets}
                >
                  Ver mis tickets

                  <ArrowRight size={20} />
                </button>
              </div>
            </article>

            {/* LISTA DE PRÓXIMOS TICKETS */}
            <article className="next-tickets">
              <div className="next-header">
                <h2>Próximos por atender</h2>

                <button
                  type="button"
                  onClick={irATickets}
                >
                  Ver todos

                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="next-tickets-list">
                {ticketsPendientes.map((ticket) => (
                  <div
                    className="ticket-row"
                    key={ticket.folio}
                  >
                    <div className="ticket-left">
                      <span className="ticket-icon">
                        {ticket.icono}
                      </span>

                      <div>
                        <strong>{ticket.folio}</strong>
                        <span>{ticket.categoria}</span>
                      </div>
                    </div>

                    <span
                      className={`priority ${ticket.prioridad.toLowerCase()}`}
                    >
                      {ticket.prioridad}
                    </span>

                    <button
                      type="button"
                      className="attend-btn"
                      onClick={irATickets}
                    >
                      Atender
                    </button>
                  </div>
                ))}
              </div>
            </article>
          </section>

          {/* ================= PRODUCTIVIDAD SEMANAL ================= */}
          <section className="productivity-card">
            <div className="productivity-header">
              <div>
                <h2>Tu productividad esta semana</h2>

                <p>Tickets resueltos por día</p>
              </div>

              <div className="productivity-header-icon">
                <BarChart3
                  size={27}
                  strokeWidth={2.2}
                />
              </div>
            </div>

            <div className="productivity-chart">
              {/* ESCALA LATERAL */}
              <div className="productivity-scale">
                <span>6</span>
                <span>3</span>
                <span>0</span>
              </div>

              {/* ÁREA DE LA GRÁFICA */}
              <div className="productivity-chart-area">
                <div className="productivity-grid-line line-top" />
                <div className="productivity-grid-line line-middle" />
                <div className="productivity-grid-line line-bottom" />

                <div className="productivity-bars">
                  {productividadSemanal.map((elemento) => (
                    <div
                      className="productivity-column"
                      key={elemento.dia}
                    >
                      <div className="productivity-bar-area">
                        <strong>{elemento.cantidad}</strong>

                        <div
                          className="productivity-bar"
                          style={{
                            height: `${
                              (elemento.cantidad / 6) * 100
                            }%`,
                          }}
                        />
                      </div>

                      <span className="productivity-day">
                        {elemento.dia}
                      </span>
                    </div>
                  ))}
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