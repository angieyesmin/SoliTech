import { useMemo, useState } from "react";

import {
  Bell,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Eye,
  Filter,
  Layers3,
  MessageSquare,
  Monitor,
  RefreshCcw,
  Search,
  Sofa,
  Wrench,
} from "lucide-react";

import "../css/historial.css";
import TecnicoNavbar from "../../tecnico/components/TecnicoNavbar";

/* ================= TIPOS ================= */

type EstadoFiltro =
  | "Todos"
  | "Pendiente"
  | "En Proceso"
  | "En Espera"
  | "Resuelto";

type PrioridadTicket =
  | "Alta"
  | "Media"
  | "Baja";

type TipoTicket =
  | "Infraestructura"
  | "Tecnología"
  | "Equipamiento"
  | "Mantenimiento";

type Ticket = {
  folio: string;
  tipo: TipoTicket;
  ubicacion: string;
  prioridad: PrioridadTicket;
  estado: Exclude<EstadoFiltro, "Todos">;
  iniciales: string;
  reportante: string;
  fecha: string;
};

/* ================= DATOS ================= */

const ticketsIniciales: Ticket[] = [
  {
    folio: "TKT-0481",
    tipo: "Infraestructura",
    ubicacion: "Edificio A – Piso 3, Aula 304",
    prioridad: "Alta",
    estado: "Pendiente",
    iniciales: "CM",
    reportante: "Carlos Mendoza",
    fecha: "27 jun 2026",
  },
  {
    folio: "TKT-0479",
    tipo: "Tecnología",
    ubicacion: "Laboratorio de Cómputo 2, Bloque C",
    prioridad: "Alta",
    estado: "En Proceso",
    iniciales: "LF",
    reportante: "Luisa Fernández",
    fecha: "26 jun 2026",
  },
  {
    folio: "TKT-0476",
    tipo: "Equipamiento",
    ubicacion: "Biblioteca Central, Sala de lectura",
    prioridad: "Media",
    estado: "En Proceso",
    iniciales: "RS",
    reportante: "Roberto Salas",
    fecha: "25 jun 2026",
  },
  {
    folio: "TKT-0474",
    tipo: "Mantenimiento",
    ubicacion: "Edificio B – Planta baja, Pasillo norte",
    prioridad: "Media",
    estado: "En Espera",
    iniciales: "AT",
    reportante: "Ana Torres",
    fecha: "24 jun 2026",
  },
  {
    folio: "TKT-0471",
    tipo: "Tecnología",
    ubicacion: "Sala de juntas, Rectoría",
    prioridad: "Alta",
    estado: "Pendiente",
    iniciales: "JV",
    reportante: "Jorge Villanueva",
    fecha: "23 jun 2026",
  },
  {
    folio: "TKT-0468",
    tipo: "Infraestructura",
    ubicacion: "Cafetería, Planta baja",
    prioridad: "Baja",
    estado: "En Espera",
    iniciales: "MG",
    reportante: "María García",
    fecha: "21 jun 2026",
  },
  {
    folio: "TKT-0465",
    tipo: "Equipamiento",
    ubicacion: "Aula Magna, Auditorio",
    prioridad: "Media",
    estado: "En Proceso",
    iniciales: "SR",
    reportante: "Sandra Ríos",
    fecha: "20 jun 2026",
  },
  {
    folio: "TKT-0462",
    tipo: "Mantenimiento",
    ubicacion: "Edificio C – Piso 2, Oficinas admin",
    prioridad: "Baja",
    estado: "Pendiente",
    iniciales: "HL",
    reportante: "Héctor López",
    fecha: "18 jun 2026",
  },
];

/* ================= COMPONENTE ================= */

const HistorialEstados: React.FC = () => {
  const [busqueda, setBusqueda] =
    useState("");

  const [
    estadoSeleccionado,
    setEstadoSeleccionado,
  ] = useState<EstadoFiltro>("Todos");

  const [
    prioridadSeleccionada,
    setPrioridadSeleccionada,
  ] = useState<"Todas" | PrioridadTicket>(
    "Todas"
  );

  const [paginaActual, setPaginaActual] =
    useState(1);

  const ticketsFiltrados = useMemo(() => {
    const texto =
      busqueda.trim().toLowerCase();

    return ticketsIniciales.filter(
      (ticket) => {
        const coincideBusqueda =
          ticket.folio
            .toLowerCase()
            .includes(texto) ||
          ticket.tipo
            .toLowerCase()
            .includes(texto) ||
          ticket.ubicacion
            .toLowerCase()
            .includes(texto) ||
          ticket.reportante
            .toLowerCase()
            .includes(texto);

        const coincideEstado =
          estadoSeleccionado ===
            "Todos" ||
          ticket.estado ===
            estadoSeleccionado;

        const coincidePrioridad =
          prioridadSeleccionada ===
            "Todas" ||
          ticket.prioridad ===
            prioridadSeleccionada;

        return (
          coincideBusqueda &&
          coincideEstado &&
          coincidePrioridad
        );
      }
    );
  }, [
    busqueda,
    estadoSeleccionado,
    prioridadSeleccionada,
  ]);

  const obtenerIconoTipo = (
    tipo: TipoTicket
  ) => {
    if (tipo === "Infraestructura") {
      return (
        <Building2
          size={16}
          strokeWidth={1.8}
        />
      );
    }

    if (tipo === "Tecnología") {
      return (
        <Monitor
          size={16}
          strokeWidth={1.8}
        />
      );
    }

    if (tipo === "Equipamiento") {
      return (
        <Sofa
          size={16}
          strokeWidth={1.8}
        />
      );
    }

    return (
      <Wrench
        size={16}
        strokeWidth={1.8}
      />
    );
  };

  const obtenerClase = (
    texto: string
  ) =>
    texto
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .replace(/\s+/g, "-");

  return (
    <div className="layout">
      <TecnicoNavbar />

      <main className="dashboard-tecnico">
        {/* ================= ENCABEZADO ================= */}

        <header className="dashboard-tecnico-header">
          <div className="dashboard-header-left">
            <h1>
              Historial de Incidencias
              Atendidas
            </h1>

            <p>
              Viernes 27 de junio de 2026
            </p>
          </div>

          <div className="dashboard-header-right">
            <button
              type="button"
              className="dashboard-notification-button"
              aria-label="Abrir notificaciones"
            >
              <Bell
                size={21}
                strokeWidth={1.8}
              />

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
                <strong>
                  Ricardo Pacheco
                </strong>

                <small>
                  Técnico de Soporte
                </small>
              </span>

              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        {/* ================= CONTENIDO ================= */}

        <section className="historial-content">
          {/* TARJETAS */}

          <section className="historial-stats-grid">
            <article className="historial-stat-card">
              <div className="historial-stat-icon blue">
                <Layers3
                  size={20}
                  strokeWidth={1.8}
                />
              </div>

              <div className="historial-stat-info">
                <strong>8</strong>
                <span>
                  Asignados hoy
                </span>
              </div>
            </article>

            <article className="historial-stat-card">
              <div className="historial-stat-icon green">
                <RefreshCcw
                  size={20}
                  strokeWidth={1.8}
                />
              </div>

              <div className="historial-stat-info">
                <strong>3</strong>
                <span>
                  En Proceso
                </span>
              </div>
            </article>

            <article className="historial-stat-card">
              <div className="historial-stat-icon yellow">
                <CircleAlert
                  size={20}
                  strokeWidth={1.8}
                />
              </div>

              <div className="historial-stat-info">
                <strong>3</strong>
                <span>Pendientes</span>
              </div>
            </article>

            <article className="historial-stat-card">
              <div className="historial-stat-icon teal">
                <CircleCheck
                  size={20}
                  strokeWidth={1.8}
                />
              </div>

              <div className="historial-stat-info">
                <strong>14</strong>
                <span>
                  Resueltos esta semana
                </span>
              </div>
            </article>
          </section>

          {/* FILTROS */}

          <section className="historial-filter-card">
            <div className="historial-search">
              <Search
                size={17}
                strokeWidth={1.8}
              />

              <input
                type="text"
                value={busqueda}
                placeholder="Buscar por folio, tipo, ubicación..."
                onChange={(evento) => {
                  setBusqueda(
                    evento.target.value
                  );

                  setPaginaActual(1);
                }}
              />
            </div>

            <div className="historial-status-filters">
              {(
                [
                  "Todos",
                  "Pendiente",
                  "En Proceso",
                  "En Espera",
                  "Resuelto",
                ] as EstadoFiltro[]
              ).map((estado) => (
                <button
                  type="button"
                  key={estado}
                  className={`historial-status-button ${obtenerClase(
                    estado
                  )} ${
                    estadoSeleccionado ===
                    estado
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    setEstadoSeleccionado(
                      estado
                    );

                    setPaginaActual(1);
                  }}
                >
                  {estado !== "Todos" && (
                    <span className="historial-status-dot" />
                  )}

                  {estado}
                </button>
              ))}
            </div>

            <div className="historial-priority-select">
              <Filter
                size={15}
                strokeWidth={1.8}
              />

              <select
                value={
                  prioridadSeleccionada
                }
                onChange={(evento) => {
                  setPrioridadSeleccionada(
                    evento.target
                      .value as
                      | "Todas"
                      | PrioridadTicket
                  );

                  setPaginaActual(1);
                }}
              >
                <option value="Todas">
                  Prioridad
                </option>

                <option value="Alta">
                  Alta
                </option>

                <option value="Media">
                  Media
                </option>

                <option value="Baja">
                  Baja
                </option>
              </select>
            </div>

            <span className="historial-total">
              {ticketsFiltrados.length} de{" "}
              {ticketsIniciales.length}{" "}
              tickets
            </span>
          </section>

          {/* ================= TABLA ================= */}

          <section className="historial-table-card">
            <header className="historial-table-header">
              <h2>
                Tickets Asignados
              </h2>

              <span>
                Actualizado: 27 jun 2026,
                09:14 AM
              </span>
            </header>

            <div className="historial-table-scroll">
              <table className="historial-table">
                <thead>
                  <tr>
                    <th>Folio ↕</th>
                    <th>Tipo ↕</th>
                    <th>Ubicación ↕</th>
                    <th>Prioridad ↕</th>
                    <th>Estado ↕</th>
                    <th>Reportante ↕</th>
                    <th>Fecha ↕</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {ticketsFiltrados.map(
                    (ticket) => (
                      <tr key={ticket.folio}>
                        <td>
                          <strong className="historial-folio">
                            {ticket.folio}
                          </strong>
                        </td>

                        <td>
                          <div
                            className={`historial-ticket-type ${obtenerClase(
                              ticket.tipo
                            )}`}
                          >
                            {obtenerIconoTipo(
                              ticket.tipo
                            )}

                            <span>
                              {ticket.tipo}
                            </span>
                          </div>
                        </td>

                        <td>
                          {ticket.ubicacion}
                        </td>

                        <td>
                          <span
                            className={`historial-priority ${obtenerClase(
                              ticket.prioridad
                            )}`}
                          >
                            <i />

                            {
                              ticket.prioridad
                            }
                          </span>
                        </td>

                        <td>
                          <span
                            className={`historial-state ${obtenerClase(
                              ticket.estado
                            )}`}
                          >
                            <i />

                            {ticket.estado}
                          </span>
                        </td>

                        <td>
                          <div className="historial-reporter">
                            <span>
                              {
                                ticket.iniciales
                              }
                            </span>

                            <strong>
                              {
                                ticket.reportante
                              }
                            </strong>
                          </div>
                        </td>

                        <td>
                          {ticket.fecha}
                        </td>

                        <td>
                          <div className="historial-actions">
                            <button
                              type="button"
                              className="view"
                              aria-label="Ver ticket"
                            >
                              <Eye size={14} />
                            </button>

                            <button
                              type="button"
                              className="comment"
                              aria-label="Agregar comentario"
                            >
                              <MessageSquare
                                size={14}
                              />
                            </button>

                            <button
                              type="button"
                              className="update"
                            >
                              <RefreshCcw
                                size={14}
                              />

                              Actualizar
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}

                  {ticketsFiltrados.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="historial-empty"
                      >
                        No se encontraron
                        tickets.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <footer className="historial-table-footer">
              <span>
                Mostrando{" "}
                {ticketsFiltrados.length}{" "}
                tickets
              </span>

              <div className="historial-pagination">
                <button
                  type="button"
                  disabled={
                    paginaActual === 1
                  }
                  onClick={() =>
                    setPaginaActual(
                      (actual) =>
                        Math.max(
                          1,
                          actual - 1
                        )
                    )
                  }
                >
                  <ChevronLeft
                    size={15}
                  />
                </button>

                <button
                  type="button"
                  className={
                    paginaActual === 1
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setPaginaActual(1)
                  }
                >
                  1
                </button>

                <button
                  type="button"
                  className={
                    paginaActual === 2
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setPaginaActual(2)
                  }
                >
                  2
                </button>

                <button
                  type="button"
                  className={
                    paginaActual === 3
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setPaginaActual(3)
                  }
                >
                  3
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setPaginaActual(
                      (actual) =>
                        Math.min(
                          3,
                          actual + 1
                        )
                    )
                  }
                >
                  <ChevronRight
                    size={15}
                  />
                </button>
              </div>
            </footer>
          </section>
        </section>
      </main>
    </div>
  );
};

export default HistorialEstados;