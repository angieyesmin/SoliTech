import { useMemo, useState } from "react";
import "../css/ticketsasignado.css";
import TecnicoNavbar from "../components/TecnicoNavbar";

import {
  Bell,
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  Filter,
  Laptop,
  Layers3,
  MessageSquare,
  RefreshCw,
  Search,
  Sofa,
  Wrench,
  X,
} from "lucide-react";

type EstadoTicket =
  | "Pendiente"
  | "En Proceso"
  | "En Espera"
  | "Resuelto";

type PrioridadTicket = "Alta" | "Media" | "Baja";

type FiltroEstado = "Todos" | EstadoTicket;

type FiltroPrioridad = "Todas" | PrioridadTicket;

type Ticket = {
  folio: string;
  tipo: string;
  ubicacion: string;
  estado: EstadoTicket;
  prioridad: PrioridadTicket;
  reportante: string;
  iniciales: string;
  fecha: string;
  descripcion: string;
  comentarios: string[];
};

const ticketsIniciales: Ticket[] = [
  {
    folio: "TKT-0481",
    tipo: "Infraestructura",
    ubicacion: "Edificio A – Piso 3, Aula 304",
    estado: "Pendiente",
    prioridad: "Alta",
    reportante: "Carlos Mendoza",
    iniciales: "CM",
    fecha: "27 jun 2026",
    descripcion:
      "El proyector del aula 304 no enciende y la luz indicadora parpadea en color rojo.",
    comentarios: [],
  },
  {
    folio: "TKT-0479",
    tipo: "Tecnología",
    ubicacion: "Laboratorio de Cómputo 2, Bloque C",
    estado: "En Proceso",
    prioridad: "Alta",
    reportante: "Luisa Fernández",
    iniciales: "LF",
    fecha: "26 jun 2026",
    descripcion:
      "No hay conexión estable a internet en las computadoras del laboratorio.",
    comentarios: [],
  },
  {
    folio: "TKT-0476",
    tipo: "Equipamiento",
    ubicacion: "Biblioteca Central, Sala de lectura",
    estado: "En Proceso",
    prioridad: "Media",
    reportante: "Roberto Salas",
    iniciales: "RS",
    fecha: "25 jun 2026",
    descripcion:
      "Una silla de la sala de lectura se encuentra dañada.",
    comentarios: [],
  },
  {
    folio: "TKT-0474",
    tipo: "Mantenimiento",
    ubicacion: "Edificio B – Planta baja, Pasillo norte",
    estado: "En Espera",
    prioridad: "Media",
    reportante: "Ana Torres",
    iniciales: "AT",
    fecha: "24 jun 2026",
    descripcion:
      "El filtro de aire del pasillo norte no funciona correctamente.",
    comentarios: [],
  },
  {
    folio: "TKT-0471",
    tipo: "Tecnología",
    ubicacion: "Sala de juntas, Rectoría",
    estado: "Pendiente",
    prioridad: "Alta",
    reportante: "Jorge Villanueva",
    iniciales: "JV",
    fecha: "23 jun 2026",
    descripcion:
      "La computadora de la sala de juntas no enciende.",
    comentarios: [],
  },
  {
    folio: "TKT-0468",
    tipo: "Infraestructura",
    ubicacion: "Cafetería, Planta baja",
    estado: "En Espera",
    prioridad: "Baja",
    reportante: "María García",
    iniciales: "MG",
    fecha: "21 jun 2026",
    descripcion:
      "Una lámpara de la cafetería parpadea constantemente.",
    comentarios: [],
  },
  {
    folio: "TKT-0465",
    tipo: "Equipamiento",
    ubicacion: "Aula Magna, Auditorio",
    estado: "En Proceso",
    prioridad: "Media",
    reportante: "Sandra Ríos",
    iniciales: "SR",
    fecha: "20 jun 2026",
    descripcion:
      "El aire acondicionado del auditorio produce demasiado ruido.",
    comentarios: [],
  },
  {
    folio: "TKT-0462",
    tipo: "Mantenimiento",
    ubicacion: "Edificio C – Piso 2, Oficinas admin",
    estado: "Pendiente",
    prioridad: "Baja",
    reportante: "Héctor López",
    iniciales: "HL",
    fecha: "18 jun 2026",
    descripcion:
      "La impresora del área administrativa no imprime.",
    comentarios: [],
  },
];

const TicketsAsignado: React.FC = () => {
  const [tickets, setTickets] =
    useState<Ticket[]>(ticketsIniciales);

  const [mostrarNotificaciones, setMostrarNotificaciones] =
    useState(false);

  const [notificacionesLeidas, setNotificacionesLeidas] =
    useState(false);

  const [busqueda, setBusqueda] = useState("");

  const [estadoActivo, setEstadoActivo] =
    useState<FiltroEstado>("Todos");

  const [prioridadSeleccionada, setPrioridadSeleccionada] =
    useState<FiltroPrioridad>("Todas");

  const [ticketDetalle, setTicketDetalle] =
    useState<Ticket | null>(null);

  const [ticketComentario, setTicketComentario] =
    useState<Ticket | null>(null);

  const [ticketActualizar, setTicketActualizar] =
    useState<Ticket | null>(null);

  const [comentario, setComentario] = useState("");

  const [nuevoEstado, setNuevoEstado] =
    useState<EstadoTicket>("En Proceso");

  const [ultimaActualizacion, setUltimaActualizacion] =
    useState("27 jun 2026, 09:14 AM");

  const filtrosEstado: FiltroEstado[] = [
    "Todos",
    "Pendiente",
    "En Proceso",
    "En Espera",
    "Resuelto",
  ];

  const ticketsFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const coincideBusqueda =
        ticket.folio.toLowerCase().includes(texto) ||
        ticket.tipo.toLowerCase().includes(texto) ||
        ticket.ubicacion.toLowerCase().includes(texto) ||
        ticket.reportante.toLowerCase().includes(texto);

      const coincideEstado =
        estadoActivo === "Todos" ||
        ticket.estado === estadoActivo;

      const coincidePrioridad =
        prioridadSeleccionada === "Todas" ||
        ticket.prioridad === prioridadSeleccionada;

      return (
        coincideBusqueda &&
        coincideEstado &&
        coincidePrioridad
      );
    });
  }, [
    tickets,
    busqueda,
    estadoActivo,
    prioridadSeleccionada,
  ]);

  const totalAsignados = tickets.length;

  const totalProceso = tickets.filter(
    (ticket) => ticket.estado === "En Proceso"
  ).length;

  const totalPendientes = tickets.filter(
    (ticket) => ticket.estado === "Pendiente"
  ).length;

  const obtenerClaseEstado = (
    estado: FiltroEstado
  ) => {
    if (estado === "Pendiente") return "pending";
    if (estado === "En Proceso") return "process";
    if (estado === "En Espera") return "waiting";
    if (estado === "Resuelto") return "resolved";

    return "";
  };

  const obtenerClaseTipo = (tipo: string) => {
    return tipo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const obtenerIconoTipo = (tipo: string) => {
    if (tipo === "Infraestructura") {
      return <Building2 size={16} />;
    }

    if (tipo === "Tecnología") {
      return <Laptop size={16} />;
    }

    if (tipo === "Equipamiento") {
      return <Sofa size={16} />;
    }

    return <Wrench size={16} />;
  };

  const marcarComoLeidas = () => {
    setNotificacionesLeidas(true);
    setMostrarNotificaciones(false);
  };

  const abrirActualizar = (ticket: Ticket) => {
    setTicketActualizar(ticket);
    setNuevoEstado(ticket.estado);
  };

  const guardarActualizacion = () => {
    if (!ticketActualizar) return;

    setTickets((ticketsActuales) =>
      ticketsActuales.map((ticket) =>
        ticket.folio === ticketActualizar.folio
          ? {
              ...ticket,
              estado: nuevoEstado,
            }
          : ticket
      )
    );

    const ahora = new Date().toLocaleString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    setUltimaActualizacion(ahora);
    setTicketActualizar(null);
  };

  const guardarComentario = () => {
    if (!ticketComentario) return;

    if (!comentario.trim()) {
      alert("Escribe un comentario.");
      return;
    }

    setTickets((ticketsActuales) =>
      ticketsActuales.map((ticket) =>
        ticket.folio === ticketComentario.folio
          ? {
              ...ticket,
              comentarios: [
                ...ticket.comentarios,
                comentario.trim(),
              ],
            }
          : ticket
      )
    );

    setComentario("");
    setTicketComentario(null);

    alert("Comentario guardado correctamente.");
  };

  const cerrarModal = () => {
    setTicketDetalle(null);
    setTicketComentario(null);
    setTicketActualizar(null);
    setComentario("");
  };

  return (
    <div className="layout">
      <TecnicoNavbar />

      <main className="tickets-assigned-container">
        <header className="tickets-assigned-header">
          <div className="tickets-assigned-heading">
            <h1>Tickets Asignados</h1>
            <p>Viernes 27 de junio de 2026</p>
          </div>

          <div className="tickets-assigned-actions">
            <div className="assigned-notification-wrapper">
              <button
                type="button"
                className="assigned-notification-button"
                onClick={() =>
                  setMostrarNotificaciones(
                    (estadoActual) => !estadoActual
                  )
                }
                aria-label="Abrir notificaciones"
              >
                <Bell size={18} />

                {!notificacionesLeidas && (
                  <span className="assigned-notification-count">
                    3
                  </span>
                )}
              </button>

              {mostrarNotificaciones && (
                <div className="assigned-notifications-menu">
                  <div className="assigned-notifications-header">
                    <div>
                      <h3>Notificaciones</h3>
                      <p>3 novedades recientes</p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setMostrarNotificaciones(false)
                      }
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="assigned-notification-item">
                    <div className="notification-icon blue">
                      <Bell size={15} />
                    </div>

                    <div>
                      <strong>Nuevo ticket asignado</strong>
                      <p>Se te asignó el ticket TKT-0481.</p>
                      <span>Hace 5 minutos</span>
                    </div>
                  </div>

                  <div className="assigned-notification-item">
                    <div className="notification-icon orange">
                      <Clock3 size={15} />
                    </div>

                    <div>
                      <strong>Ticket pendiente</strong>
                      <p>TKT-0479 requiere revisión.</p>
                      <span>Hace 30 minutos</span>
                    </div>
                  </div>

                  <div className="assigned-notification-item">
                    <div className="notification-icon green">
                      <CheckCircle2 size={15} />
                    </div>

                    <div>
                      <strong>Ticket actualizado</strong>
                      <p>TKT-0468 fue resuelto.</p>
                      <span>Hace 1 hora</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mark-read-button"
                    onClick={marcarComoLeidas}
                  >
                    Marcar todas como leídas
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              className="assigned-user-avatar"
              onClick={() =>
                alert("Perfil de Ricardo Pacheco")
              }
            >
              RP
            </button>
          </div>
        </header>

        <section className="tickets-assigned-content">
          <section className="assigned-stats-grid">
            <article className="assigned-stat-card">
              <div className="assigned-stat-icon blue">
                <Layers3 size={21} />
              </div>

              <div>
                <h2>{totalAsignados}</h2>
                <p>Asignados hoy</p>
              </div>
            </article>

            <article className="assigned-stat-card">
              <div className="assigned-stat-icon green">
                <RefreshCw size={21} />
              </div>

              <div>
                <h2>{totalProceso}</h2>
                <p>En Proceso</p>
              </div>
            </article>

            <article className="assigned-stat-card">
              <div className="assigned-stat-icon orange">
                <Clock3 size={21} />
              </div>

              <div>
                <h2>{totalPendientes}</h2>
                <p>Pendientes</p>
              </div>
            </article>

            <article className="assigned-stat-card">
              <div className="assigned-stat-icon teal">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <h2>14</h2>
                <p>Resueltos esta semana</p>
              </div>
            </article>
          </section>

          <section className="assigned-filters-card">
            <div className="assigned-search-box">
              <Search size={17} />

              <input
                type="text"
                placeholder="Buscar por folio, tipo, ubicación..."
                value={busqueda}
                onChange={(evento) =>
                  setBusqueda(evento.target.value)
                }
              />
            </div>

            <div className="assigned-state-buttons">
              {filtrosEstado.map((estado) => (
                <button
                  type="button"
                  key={estado}
                  className={`assigned-state-button ${
                    estadoActivo === estado
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setEstadoActivo(estado)
                  }
                >
                  {estado !== "Todos" && (
                    <span
                      className={`assigned-state-dot ${obtenerClaseEstado(
                        estado
                      )}`}
                    ></span>
                  )}

                  {estado}
                </button>
              ))}
            </div>

            <div className="assigned-priority-filter">
              <Filter size={15} />

              <select
                value={prioridadSeleccionada}
                onChange={(evento) =>
                  setPrioridadSeleccionada(
                    evento.target
                      .value as FiltroPrioridad
                  )
                }
              >
                <option value="Todas">Prioridad</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            <div className="assigned-result-count">
              {ticketsFiltrados.length} de {tickets.length} tickets
            </div>
          </section>

          {/* TABLA DE TICKETS */}

          <section className="assigned-table-card">
            <div className="assigned-table-title">
              <h2>Tickets Asignados</h2>

              <span>
                Actualizado: {ultimaActualizacion}
              </span>
            </div>

            <div className="assigned-table-scroll">
              <table className="assigned-table">
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
                  {ticketsFiltrados.map((ticket) => (
                    <tr key={ticket.folio}>
                      <td className="assigned-ticket-folio">
                        {ticket.folio}
                      </td>

                      <td>
                        <div className="assigned-ticket-type">
                          <span
                            className={`assigned-type-icon ${obtenerClaseTipo(
                              ticket.tipo
                            )}`}
                          >
                            {obtenerIconoTipo(ticket.tipo)}
                          </span>

                          <span>{ticket.tipo}</span>
                        </div>
                      </td>

                      <td className="assigned-ticket-location">
                        {ticket.ubicacion}
                      </td>

                      <td>
                        <span
                          className={`assigned-priority-badge ${ticket.prioridad.toLowerCase()}`}
                        >
                          <i></i>
                          {ticket.prioridad}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`assigned-status-badge ${obtenerClaseEstado(
                            ticket.estado
                          )}`}
                        >
                          <i></i>
                          {ticket.estado}
                        </span>
                      </td>

                      <td>
                        <div className="assigned-reporter">
                          <span>{ticket.iniciales}</span>
                          <strong>{ticket.reportante}</strong>
                        </div>
                      </td>

                      <td className="assigned-ticket-date">
                        {ticket.fecha}
                      </td>

                      <td>
                        <div className="assigned-row-actions">
                          <button
                            type="button"
                            className="assigned-view-button"
                            title="Ver detalle"
                            onClick={() =>
                              setTicketDetalle(ticket)
                            }
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            type="button"
                            className="assigned-comment-button"
                            title="Agregar comentario"
                            onClick={() =>
                              setTicketComentario(ticket)
                            }
                          >
                            <MessageSquare size={15} />
                          </button>

                          <button
                            type="button"
                            className="assigned-update-button"
                            onClick={() =>
                              abrirActualizar(ticket)
                            }
                          >
                            <RefreshCw size={14} />
                            Actualizar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {ticketsFiltrados.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="assigned-table-empty"
                      >
                        No se encontraron tickets con los
                        filtros seleccionados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>

      {/* MODAL: VER DETALLE */}

      {ticketDetalle && (
        <div
          className="assigned-modal-overlay"
          onClick={cerrarModal}
        >
          <div
            className="assigned-modal"
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >
            <header className="assigned-modal-header">
              <div>
                <h2>{ticketDetalle.folio}</h2>
                <p>Detalle del ticket asignado</p>
              </div>

              <button
                type="button"
                onClick={cerrarModal}
              >
                <X size={18} />
              </button>
            </header>

            <div className="assigned-modal-body">
              <div className="assigned-detail-row">
                <span>Tipo</span>
                <strong>{ticketDetalle.tipo}</strong>
              </div>

              <div className="assigned-detail-row">
                <span>Ubicación</span>
                <strong>{ticketDetalle.ubicacion}</strong>
              </div>

              <div className="assigned-detail-row">
                <span>Prioridad</span>
                <strong>{ticketDetalle.prioridad}</strong>
              </div>

              <div className="assigned-detail-row">
                <span>Estado</span>
                <strong>{ticketDetalle.estado}</strong>
              </div>

              <div className="assigned-detail-row">
                <span>Reportante</span>
                <strong>{ticketDetalle.reportante}</strong>
              </div>

              <div className="assigned-detail-description">
                <span>Descripción</span>
                <p>{ticketDetalle.descripcion}</p>
              </div>

              {ticketDetalle.comentarios.length > 0 && (
                <div className="assigned-comments">
                  <h3>Comentarios</h3>

                  {ticketDetalle.comentarios.map(
                    (texto, indice) => (
                      <p key={`${texto}-${indice}`}>
                        {texto}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>

            <footer className="assigned-modal-footer">
              <button
                type="button"
                onClick={cerrarModal}
              >
                Cerrar
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* MODAL: AGREGAR COMENTARIO */}

      {ticketComentario && (
        <div
          className="assigned-modal-overlay"
          onClick={cerrarModal}
        >
          <div
            className="assigned-modal assigned-small-modal"
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >
            <header className="assigned-modal-header">
              <div>
                <h2>Agregar comentario</h2>
                <p>{ticketComentario.folio}</p>
              </div>

              <button
                type="button"
                onClick={cerrarModal}
              >
                <X size={18} />
              </button>
            </header>

            <div className="assigned-modal-body">
              <label htmlFor="comentario">
                Comentario
              </label>

              <textarea
                id="comentario"
                placeholder="Describe el seguimiento realizado..."
                value={comentario}
                onChange={(evento) =>
                  setComentario(evento.target.value)
                }
              ></textarea>
            </div>

            <footer className="assigned-modal-footer">
              <button
                type="button"
                className="assigned-cancel-button"
                onClick={cerrarModal}
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={guardarComentario}
              >
                Guardar comentario
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* MODAL: ACTUALIZAR ESTADO */}

      {ticketActualizar && (
        <div
          className="assigned-modal-overlay"
          onClick={cerrarModal}
        >
          <div
            className="assigned-modal assigned-small-modal"
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >
            <header className="assigned-modal-header">
              <div>
                <h2>Actualizar ticket</h2>
                <p>{ticketActualizar.folio}</p>
              </div>

              <button
                type="button"
                onClick={cerrarModal}
              >
                <X size={18} />
              </button>
            </header>

            <div className="assigned-modal-body">
              <label htmlFor="nuevo-estado">
                Nuevo estado
              </label>

              <select
                id="nuevo-estado"
                value={nuevoEstado}
                onChange={(evento) =>
                  setNuevoEstado(
                    evento.target.value as EstadoTicket
                  )
                }
              >
                <option value="Pendiente">
                  Pendiente
                </option>

                <option value="En Proceso">
                  En Proceso
                </option>

                <option value="En Espera">
                  En Espera
                </option>

                <option value="Resuelto">
                  Resuelto
                </option>
              </select>
            </div>

            <footer className="assigned-modal-footer">
              <button
                type="button"
                className="assigned-cancel-button"
                onClick={cerrarModal}
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={guardarActualizacion}
              >
                Actualizar estado
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsAsignado;