import {
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  ClipboardCheck,
  Clock3,
  Filter,
  Grid2X2,
  Monitor,
  Sofa,
  Star,
  Wrench,
} from "lucide-react";

import TecnicoNavbar from "../components/TecnicoNavbar";
import "../css/ticketsasignado.css";

/* ================= TIPOS ================= */

type TipoIncidencia =
  | "Infraestructura"
  | "Tecnología"
  | "Equipamiento"
  | "Mantenimiento";

type TicketAtendido = {
  folio: string;
  tipo: TipoIncidencia;
  ubicacion: string;
  fechaResolucion: string;
  tiempoAtencion: string;
};

/* ================= DATOS ================= */

const ticketsAtendidos: TicketAtendido[] = [
  {
    folio: "TKT-0428",
    tipo: "Infraestructura",
    ubicacion: "Edificio A – Piso 3, Aula 304",
    fechaResolucion: "27 jun 2026, 02:35 PM",
    tiempoAtencion: "8h 45m",
  },
  {
    folio: "TKT-0425",
    tipo: "Tecnología",
    ubicacion: "Laboratorio de Cómputo 2, Bloque C",
    fechaResolucion: "26 jun 2026, 11:20 AM",
    tiempoAtencion: "5h 20m",
  },
  {
    folio: "TKT-0419",
    tipo: "Equipamiento",
    ubicacion: "Biblioteca Central, Sala de lectura",
    fechaResolucion: "25 jun 2026, 04:45 PM",
    tiempoAtencion: "12h 10m",
  },
  {
    folio: "TKT-0416",
    tipo: "Mantenimiento",
    ubicacion: "Edificio B – Planta baja, Pasillo norte",
    fechaResolucion: "24 jun 2026, 09:10 AM",
    tiempoAtencion: "6h 05m",
  },
  {
    folio: "TKT-0412",
    tipo: "Infraestructura",
    ubicacion: "Cafetería, Planta baja",
    fechaResolucion: "22 jun 2026, 03:15 PM",
    tiempoAtencion: "4h 30m",
  },
  {
    folio: "TKT-0407",
    tipo: "Tecnología",
    ubicacion: "Sala de juntas, Rectoría",
    fechaResolucion: "21 jun 2026, 10:50 AM",
    tiempoAtencion: "7h 40m",
  },
  {
    folio: "TKT-0403",
    tipo: "Equipamiento",
    ubicacion: "Aula 101, Edificio A",
    fechaResolucion: "19 jun 2026, 05:30 PM",
    tiempoAtencion: "9h 15m",
  },
  {
    folio: "TKT-0398",
    tipo: "Mantenimiento",
    ubicacion: "Auditorio Principal",
    fechaResolucion: "18 jun 2026, 01:25 PM",
    tiempoAtencion: "10h 55m",
  },
];

const Ticketsasignado: React.FC = () => {
  const obtenerIconoTipo = (tipo: TipoIncidencia) => {
    switch (tipo) {
      case "Infraestructura":
        return <Building2 size={18} strokeWidth={1.8} />;

      case "Tecnología":
        return <Monitor size={18} strokeWidth={1.8} />;

      case "Equipamiento":
        return <Sofa size={18} strokeWidth={1.8} />;

      case "Mantenimiento":
        return <Wrench size={18} strokeWidth={1.8} />;
    }
  };

  const obtenerClaseTipo = (tipo: TipoIncidencia) => {
    return tipo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  return (
    <div className="layout">
      <TecnicoNavbar />

      <main className="dashboard-tecnico">
        {/* ================= ENCABEZADO ================= */}
        <header className="dashboard-tecnico-header">
          <div className="dashboard-header-left">
            <h1>Tickets Asignados</h1>
            <p>Viernes 27 de junio de 2026</p>
          </div>

          <div className="dashboard-header-right">
            <button
              type="button"
              className="dashboard-notification-button"
              aria-label="Abrir notificaciones"
            >
              <Bell size={21} strokeWidth={1.8} />
              <span>3</span>
            </button>

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
        <section className="tickets-assigned-content">
          {/* ================= FILTROS ================= */}
          <section className="tickets-filters">
            <div className="filter-group">
              <label htmlFor="rango-fechas">
                Rango de fechas
              </label>

              <div className="filter-input">
                <CalendarDays size={18} strokeWidth={1.8} />

                <select
                  id="rango-fechas"
                  defaultValue="Este mes"
                >
                  <option value="Hoy">Hoy</option>
                  <option value="Esta semana">
                    Esta semana
                  </option>
                  <option value="Este mes">
                    Este mes
                  </option>
                  <option value="Últimos 3 meses">
                    Últimos 3 meses
                  </option>
                </select>
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="tipo-incidencia">
                Tipo de incidencia
              </label>

              <div className="filter-input">
                <Grid2X2 size={18} strokeWidth={1.8} />

                <select
                  id="tipo-incidencia"
                  defaultValue="Todos los tipos"
                >
                  <option value="Todos los tipos">
                    Todos los tipos
                  </option>
                  <option value="Infraestructura">
                    Infraestructura
                  </option>
                  <option value="Tecnología">
                    Tecnología
                  </option>
                  <option value="Equipamiento">
                    Equipamiento
                  </option>
                  <option value="Mantenimiento">
                    Mantenimiento
                  </option>
                </select>
              </div>
            </div>

            <button
              type="button"
              className="clear-filter-btn"
            >
              <Filter size={17} strokeWidth={1.8} />
              Limpiar filtros
            </button>
          </section>

          {/* ================= RESUMEN ================= */}
          <section className="tickets-summary">
            <article className="summary-card">
              <div className="summary-icon green">
                <ClipboardCheck size={33} strokeWidth={1.8} />
              </div>

              <div className="summary-information">
                <span>Total atendidos</span>
                <strong>142</strong>
                <p>Incidencias resueltas</p>
              </div>
            </article>

            <article className="summary-card">
              <div className="summary-icon blue">
                <Clock3 size={33} strokeWidth={1.8} />
              </div>

              <div className="summary-information">
                <span>Tiempo promedio</span>
                <strong>16h</strong>
                <p>Tiempo promedio de atención</p>
              </div>
            </article>

            <article className="summary-card">
              <div className="summary-icon yellow">
                <Star size={33} strokeWidth={1.8} />
              </div>

              <div className="summary-information">
                <span>Satisfacción</span>
                <strong>94%</strong>
                <p>Calificación promedio</p>
              </div>
            </article>
          </section>

          {/* ================= TABLA ================= */}
          <section className="tickets-history-card">
            <div className="tickets-table-scroll">
              <table className="tickets-history-table">
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Tipo</th>
                    <th>Ubicación</th>
                    <th>Fecha resolución ↕</th>
                    <th>Tiempo de atención</th>
                    <th>Estado final</th>
                  </tr>
                </thead>

                <tbody>
                  {ticketsAtendidos.map((ticket) => (
                    <tr key={ticket.folio}>
                      <td>
                        <strong className="ticket-table-folio">
                          {ticket.folio}
                        </strong>
                      </td>

                      <td>
                        <div
                          className={`ticket-table-type ${obtenerClaseTipo(
                            ticket.tipo
                          )}`}
                        >
                          {obtenerIconoTipo(ticket.tipo)}
                          <span>{ticket.tipo}</span>
                        </div>
                      </td>

                      <td>{ticket.ubicacion}</td>

                      <td>{ticket.fechaResolucion}</td>

                      <td>{ticket.tiempoAtencion}</td>

                      <td>
                        <span className="ticket-resolved-status">
                          <CircleCheck
                            size={13}
                            fill="currentColor"
                          />
                          Resuelto
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= PAGINACIÓN ================= */}
            <footer className="tickets-table-footer">
              <p>
                Mostrando 1 a 8 de 142 resultados
              </p>

              <div className="tickets-pagination-container">
                <select defaultValue="8">
                  <option value="8">
                    8 por página
                  </option>
                  <option value="16">
                    16 por página
                  </option>
                  <option value="24">
                    24 por página
                  </option>
                </select>

                <div className="tickets-pagination">
                  <button
                    type="button"
                    aria-label="Página anterior"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <button type="button" className="active">
                    1
                  </button>

                  <button type="button">2</button>
                  <button type="button">3</button>

                  <span>...</span>

                  <button type="button">18</button>

                  <button
                    type="button"
                    aria-label="Página siguiente"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            </footer>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Ticketsasignado;