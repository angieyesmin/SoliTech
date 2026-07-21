import { useMemo, useState } from "react";
import AdminNavbar from "../../admin/components/AdminNavbar";
import "../css/gestiondetickets.css";
import {
  Bell,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Laptop,
  LogOut,
  MoreVertical,
  RefreshCw,
  Search,
  Settings,
  User,
  Wrench,
  X,
} from "lucide-react";

type Estado =
  | "Todos"
  | "Pendiente"
  | "En Proceso"
  | "En Espera"
  | "Resuelto";

type EstadoTicket = Exclude<Estado, "Todos">;

type Prioridad = "Todas" | "Alta" | "Media" | "Baja";

type PrioridadTicket = Exclude<Prioridad, "Todas">;

type Tecnico = {
  nombre: string;
  iniciales: string;
  asignados: number;
  total: number;
};

type Ticket = {
  folio: string;
  tipo: string;
  ubicacion: string;
  detalleUbicacion: string;
  estado: EstadoTicket;
  prioridad: PrioridadTicket;
  tecnico: string;
  tecnicoIniciales: string;
  cargaTecnico: string;
  reportante: string;
  reportanteIniciales: string;
  fecha: string;
  hora: string;
};

const tecnicosDisponibles: Tecnico[] = [
  {
    nombre: "Ricardo Pacheco",
    iniciales: "RP",
    asignados: 3,
    total: 8,
  },
  {
    nombre: "Roberto Salas",
    iniciales: "RS",
    asignados: 5,
    total: 8,
  },
  {
    nombre: "Ana Torres",
    iniciales: "AT",
    asignados: 4,
    total: 8,
  },
  {
    nombre: "María García",
    iniciales: "MG",
    asignados: 2,
    total: 8,
  },
  {
    nombre: "Jorge Villanueva",
    iniciales: "JV",
    asignados: 6,
    total: 8,
  },
  {
    nombre: "Héctor López",
    iniciales: "HL",
    asignados: 1,
    total: 8,
  },
  {
    nombre: "Sandra Ríos",
    iniciales: "SR",
    asignados: 3,
    total: 8,
  },
];

const ticketsIniciales: Ticket[] = [
  {
    folio: "TKT-0481",
    tipo: "Infraestructura",
    ubicacion: "Edificio A — Piso 3",
    detalleUbicacion: "Aula 304",
    prioridad: "Alta",
    estado: "En Proceso",
    tecnico: "Ricardo Pacheco",
    tecnicoIniciales: "RP",
    cargaTecnico: "3/8 tickets",
    reportante: "Carlos Mendoza",
    reportanteIniciales: "CM",
    fecha: "27 jun 2026",
    hora: "09:14 AM",
  },
  {
    folio: "TKT-0479",
    tipo: "Tecnología",
    ubicacion: "Laboratorio de Cómputo 2",
    detalleUbicacion: "Bloque C",
    prioridad: "Alta",
    estado: "Pendiente",
    tecnico: "Sin asignar",
    tecnicoIniciales: "",
    cargaTecnico: "",
    reportante: "Luisa Fernández",
    reportanteIniciales: "LF",
    fecha: "26 jun 2026",
    hora: "04:32 PM",
  },
  {
    folio: "TKT-0476",
    tipo: "Equipamiento",
    ubicacion: "Biblioteca Central",
    detalleUbicacion: "Sala de lectura",
    prioridad: "Media",
    estado: "En Proceso",
    tecnico: "Roberto Salas",
    tecnicoIniciales: "RS",
    cargaTecnico: "5/8 tickets",
    reportante: "Luisa Fernández",
    reportanteIniciales: "LF",
    fecha: "25 jun 2026",
    hora: "11:20 AM",
  },
  {
    folio: "TKT-0474",
    tipo: "Mantenimiento",
    ubicacion: "Edificio B — Planta baja",
    detalleUbicacion: "Pasillo norte",
    prioridad: "Media",
    estado: "En Espera",
    tecnico: "Ana Torres",
    tecnicoIniciales: "AT",
    cargaTecnico: "4/8 tickets",
    reportante: "Carlos Mendoza",
    reportanteIniciales: "CM",
    fecha: "24 jun 2026",
    hora: "03:45 PM",
  },
  {
    folio: "TKT-0471",
    tipo: "Tecnología",
    ubicacion: "Sala de juntas",
    detalleUbicacion: "Rectoría",
    prioridad: "Alta",
    estado: "Pendiente",
    tecnico: "Sin asignar",
    tecnicoIniciales: "",
    cargaTecnico: "",
    reportante: "Sandra Ríos",
    reportanteIniciales: "SR",
    fecha: "23 jun 2026",
    hora: "08:10 AM",
  },
  {
    folio: "TKT-0468",
    tipo: "Infraestructura",
    ubicacion: "Cafetería",
    detalleUbicacion: "Planta baja",
    prioridad: "Baja",
    estado: "Resuelto",
    tecnico: "María García",
    tecnicoIniciales: "MG",
    cargaTecnico: "2/8 tickets",
    reportante: "Sandra Ríos",
    reportanteIniciales: "SR",
    fecha: "21 jun 2026",
    hora: "02:05 PM",
  },
  {
    folio: "TKT-0465",
    tipo: "Equipamiento",
    ubicacion: "Aula Magna",
    detalleUbicacion: "Auditorio",
    prioridad: "Media",
    estado: "En Proceso",
    tecnico: "Ricardo Pacheco",
    tecnicoIniciales: "RP",
    cargaTecnico: "3/8 tickets",
    reportante: "Sandra Ríos",
    reportanteIniciales: "SR",
    fecha: "20 jun 2026",
    hora: "09:48 AM",
  },
  {
    folio: "TKT-0462",
    tipo: "Mantenimiento",
    ubicacion: "Edificio C — Piso 2",
    detalleUbicacion: "Oficinas admin",
    prioridad: "Baja",
    estado: "Pendiente",
    tecnico: "Sin asignar",
    tecnicoIniciales: "",
    cargaTecnico: "",
    reportante: "Héctor López",
    reportanteIniciales: "HL",
    fecha: "18 jun 2026",
    hora: "01:30 PM",
  },
  {
    folio: "TKT-0459",
    tipo: "Tecnología",
    ubicacion: "Laboratorio de Física",
    detalleUbicacion: "Bloque D",
    prioridad: "Alta",
    estado: "En Espera",
    tecnico: "Ana Torres",
    tecnicoIniciales: "AT",
    cargaTecnico: "4/8 tickets",
    reportante: "Paola Canto",
    reportanteIniciales: "PC",
    fecha: "17 jun 2026",
    hora: "10:15 AM",
  },
  {
    folio: "TKT-0456",
    tipo: "Infraestructura",
    ubicacion: "Estacionamiento",
    detalleUbicacion: "Acceso principal",
    prioridad: "Media",
    estado: "Resuelto",
    tecnico: "Roberto Salas",
    tecnicoIniciales: "RS",
    cargaTecnico: "5/8 tickets",
    reportante: "José Martínez",
    reportanteIniciales: "JM",
    fecha: "15 jun 2026",
    hora: "04:50 PM",
  },
];

function Gestiondetickets() {
  const [tickets, setTickets] =
    useState<Ticket[]>(ticketsIniciales);

  const [estadoActivo, setEstadoActivo] =
    useState<Estado>("Todos");

  const [prioridad, setPrioridad] =
    useState<Prioridad>("Todas");

  const [tecnico, setTecnico] =
    useState("Todos los técnicos");

  const [busqueda, setBusqueda] = useState("");

  const [mostrarNotificaciones, setMostrarNotificaciones] =
    useState(false);

  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  const [actualizando, setActualizando] = useState(false);

  const [ultimaActualizacion, setUltimaActualizacion] =
    useState("Actualizado ahora");

  const [ticketAsignando, setTicketAsignando] =
    useState<string | null>(null);

  const [buscarTecnico, setBuscarTecnico] = useState("");

  const [menuAcciones, setMenuAcciones] =
    useState<string | null>(null);

  const [ticketDetalle, setTicketDetalle] =
    useState<Ticket | null>(null);

  const [paginaActual, setPaginaActual] = useState(1);

  const [porPagina, setPorPagina] = useState(10);

  const ticketsFiltrados = useMemo(() => {
    return tickets.filter((ticket) => {
      const coincideEstado =
        estadoActivo === "Todos" ||
        ticket.estado === estadoActivo;

      const coincidePrioridad =
        prioridad === "Todas" ||
        ticket.prioridad === prioridad;

      const coincideTecnico =
        tecnico === "Todos los técnicos" ||
        ticket.tecnico === tecnico;

      const textoBusqueda = busqueda
        .trim()
        .toLowerCase();

      const coincideBusqueda =
        ticket.folio.toLowerCase().includes(textoBusqueda) ||
        ticket.tipo.toLowerCase().includes(textoBusqueda) ||
        ticket.ubicacion.toLowerCase().includes(textoBusqueda) ||
        ticket.reportante.toLowerCase().includes(textoBusqueda);

      return (
        coincideEstado &&
        coincidePrioridad &&
        coincideTecnico &&
        coincideBusqueda
      );
    });
  }, [
    tickets,
    estadoActivo,
    prioridad,
    tecnico,
    busqueda,
  ]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(ticketsFiltrados.length / porPagina)
  );

  const inicioPagina = (paginaActual - 1) * porPagina;

  const ticketsPagina = ticketsFiltrados.slice(
    inicioPagina,
    inicioPagina + porPagina
  );

  const tecnicosFiltrados = tecnicosDisponibles.filter(
    (item) =>
      item.nombre
        .toLowerCase()
        .includes(buscarTecnico.toLowerCase())
  );

  const actualizarTickets = () => {
    if (actualizando) return;

    setActualizando(true);

    window.setTimeout(() => {
      const hora = new Date().toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
      });

      setBusqueda("");
      setEstadoActivo("Todos");
      setPrioridad("Todas");
      setTecnico("Todos los técnicos");
      setPaginaActual(1);
      setUltimaActualizacion(`Actualizado a las ${hora}`);
      setActualizando(false);
    }, 800);
  };

  const asignarTecnico = (
    folio: string,
    tecnicoSeleccionado: Tecnico
  ) => {
    setTickets((ticketsActuales) =>
      ticketsActuales.map((ticket) =>
        ticket.folio === folio
          ? {
              ...ticket,
              tecnico: tecnicoSeleccionado.nombre,
              tecnicoIniciales:
                tecnicoSeleccionado.iniciales,
              cargaTecnico: `${tecnicoSeleccionado.asignados}/${tecnicoSeleccionado.total} tickets`,
              estado:
                ticket.estado === "Pendiente"
                  ? "En Proceso"
                  : ticket.estado,
            }
          : ticket
      )
    );

    setTicketAsignando(null);
    setBuscarTecnico("");
  };

  const obtenerIconoTipo = (tipo: string) => {
    if (tipo === "Infraestructura") {
      return <Building2 size={15} />;
    }

    if (tipo === "Tecnología") {
      return <Laptop size={15} />;
    }

    return <Wrench size={15} />;
  };

  const cerrarMenus = () => {
    setMostrarNotificaciones(false);
    setMostrarPerfil(false);
    setMenuAcciones(null);
  };

  return (
    <div className="layout">
      <AdminNavbar />

      <main
        className="gestion-tickets-container"
        onClick={cerrarMenus}
      >
        <header className="gestion-tickets-header">
          <div className="gestion-tickets-title">
            <h1>Gestión de Tickets</h1>
            <p>Viernes 27 de junio de 2026</p>
          </div>

          <div className="gestion-header-actions">
            <button
              type="button"
              className={`gestion-update-btn ${
                actualizando ? "is-updating" : ""
              }`}
              onClick={(event) => {
                event.stopPropagation();
                actualizarTickets();
              }}
              disabled={actualizando}
            >
              <RefreshCw size={17} />

              {actualizando
                ? "Actualizando..."
                : "Actualizar"}
            </button>

            <div className="gestion-notification-wrapper">
              <button
                type="button"
                className="gestion-notification-btn"
                onClick={(event) => {
                  event.stopPropagation();

                  setMostrarNotificaciones(
                    (estadoActual) => !estadoActual
                  );

                  setMostrarPerfil(false);
                }}
              >
                <Bell size={20} />

                <span className="gestion-notification-count">
                  3
                </span>
              </button>

              {mostrarNotificaciones && (
                <div
                  className="gestion-notifications-menu"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >
                  <div className="gestion-menu-header">
                    <div>
                      <h3>Notificaciones</h3>
                      <p>3 notificaciones nuevas</p>
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

                  <div className="gestion-notification-item">
                    <span className="notification-indicator red"></span>

                    <div>
                      <strong>
                        Ticket de alta prioridad
                      </strong>

                      <p>
                        TKT-0481 requiere seguimiento.
                      </p>

                      <small>Hace 8 minutos</small>
                    </div>
                  </div>

                  <div className="gestion-notification-item">
                    <span className="notification-indicator blue"></span>

                    <div>
                      <strong>Ticket actualizado</strong>
                      <p>TKT-0479 continúa pendiente.</p>
                      <small>Hace 20 minutos</small>
                    </div>
                  </div>

                  <div className="gestion-notification-item">
                    <span className="notification-indicator green"></span>

                    <div>
                      <strong>Ticket resuelto</strong>
                      <p>TKT-0468 fue marcado como resuelto.</p>
                      <small>Hace 1 hora</small>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="gestion-profile-wrapper">
              <button
                type="button"
                className="gestion-profile-btn"
                onClick={(event) => {
                  event.stopPropagation();

                  setMostrarPerfil(
                    (estadoActual) => !estadoActual
                  );

                  setMostrarNotificaciones(false);
                }}
              >
                <span className="gestion-profile-avatar">
                  RP
                </span>

                <span className="gestion-profile-info">
                  <strong>Ricardo Pacheco</strong>
                  <small>Administrador</small>
                </span>

                <ChevronDown size={17} />
              </button>

              {mostrarPerfil && (
                <div
                  className="gestion-profile-menu"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >
                  <button type="button">
                    <User size={16} />
                    Mi perfil
                  </button>

                  <button type="button">
                    <Settings size={16} />
                    Configuración
                  </button>

                  <button
                    type="button"
                    className="logout-option"
                  >
                    <LogOut size={16} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="gestion-filters-card">
          <div className="gestion-filter-group estado-filter-group">
            <label>Estado</label>

            <div className="gestion-status-buttons">
              {(
                [
                  "Todos",
                  "Pendiente",
                  "En Proceso",
                  "En Espera",
                  "Resuelto",
                ] as Estado[]
              ).map((estado) => (
                <button
                  type="button"
                  key={estado}
                  className={
                    estadoActivo === estado
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setEstadoActivo(estado);
                    setPaginaActual(1);
                  }}
                >
                  {estado !== "Todos" && (
                    <span
                      className={`status-dot ${
                        estado === "Pendiente"
                          ? "pending"
                          : estado === "En Proceso"
                          ? "process"
                          : estado === "En Espera"
                          ? "waiting"
                          : "resolved"
                      }`}
                    ></span>
                  )}

                  {estado}
                </button>
              ))}
            </div>
          </div>

          <div className="gestion-filter-group">
            <label htmlFor="prioridad">
              Prioridad
            </label>

            <select
              id="prioridad"
              value={prioridad}
              onChange={(event) => {
                setPrioridad(
                  event.target.value as Prioridad
                );

                setPaginaActual(1);
              }}
            >
              <option value="Todas">Todas</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <div className="gestion-filter-group">
            <label htmlFor="tecnico">
              Técnico asignado
            </label>

            <select
              id="tecnico"
              value={tecnico}
              onChange={(event) => {
                setTecnico(event.target.value);
                setPaginaActual(1);
              }}
            >
              <option>Todos los técnicos</option>
              <option>Ricardo Pacheco</option>
              <option>Roberto Salas</option>
              <option>Ana Torres</option>
              <option>María García</option>
              <option>Sin asignar</option>
            </select>
          </div>

          <div className="gestion-filter-group">
            <label htmlFor="buscar-folio">
              Buscar por folio
            </label>

            <div className="gestion-search-box">
              <input
                id="buscar-folio"
                type="text"
                placeholder="Buscar folio..."
                value={busqueda}
                onChange={(event) => {
                  setBusqueda(event.target.value);
                  setPaginaActual(1);
                }}
              />

              <Search size={18} />
            </div>
          </div>
        </section>

        <div className="gestion-filter-result">
          <span>
            {ticketsFiltrados.length} tickets encontrados
          </span>

          <small>{ultimaActualizacion}</small>
        </div>

        {/* TABLA */}

        <section className="gestion-table-card">
          <div className="gestion-table-scroll">
            <table className="gestion-tickets-table">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Tipo</th>
                  <th>Ubicación</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                  <th>Técnico asignado</th>
                  <th>Reportante</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {ticketsPagina.map((ticket) => (
                  <tr key={ticket.folio}>
                    <td className="gestion-folio">
                      {ticket.folio}
                    </td>

                    <td>
                      <div className="gestion-type-cell">
                        <span
                          className={`gestion-type-icon ${ticket.tipo
                            .toLowerCase()
                            .replace(/\s/g, "-")}`}
                        >
                          {obtenerIconoTipo(ticket.tipo)}
                        </span>

                        <span>{ticket.tipo}</span>
                      </div>
                    </td>

                    <td>
                      <div className="gestion-location-cell">
                        <strong>{ticket.ubicacion}</strong>
                        <small>
                          {ticket.detalleUbicacion}
                        </small>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`gestion-priority-badge ${ticket.prioridad.toLowerCase()}`}
                      >
                        <i></i>
                        {ticket.prioridad}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`gestion-state-badge ${
                          ticket.estado === "Pendiente"
                            ? "pending"
                            : ticket.estado ===
                              "En Proceso"
                            ? "process"
                            : ticket.estado === "En Espera"
                            ? "waiting"
                            : "resolved"
                        }`}
                      >
                        <i></i>
                        {ticket.estado}
                      </span>
                    </td>

                    <td>
                      {ticket.tecnico === "Sin asignar" ? (
                        <div className="gestion-unassigned-cell">
                          <span>Sin asignar</span>

                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();

                              setTicketAsignando(
                                ticketAsignando === ticket.folio
                                  ? null
                                  : ticket.folio
                              );

                              setBuscarTecnico("");
                            }}
                          >
                            Asignar
                          </button>

                          {ticketAsignando === ticket.folio && (
                            <div
                              className="gestion-assign-menu"
                              onClick={(event) =>
                                event.stopPropagation()
                              }
                            >
                              <h3>Asignar a técnico</h3>

                              <div className="gestion-technician-search">
                                <Search size={15} />

                                <input
                                  type="text"
                                  placeholder="Buscar técnico..."
                                  value={buscarTecnico}
                                  onChange={(event) =>
                                    setBuscarTecnico(
                                      event.target.value
                                    )
                                  }
                                />
                              </div>

                              <div className="gestion-technician-list">
                                {tecnicosFiltrados.map(
                                  (tecnicoItem) => (
                                    <button
                                      type="button"
                                      key={
                                        tecnicoItem.nombre
                                      }
                                      onClick={() =>
                                        asignarTecnico(
                                          ticket.folio,
                                          tecnicoItem
                                        )
                                      }
                                    >
                                      <span className="gestion-small-avatar">
                                        {
                                          tecnicoItem.iniciales
                                        }
                                      </span>

                                      <strong>
                                        {tecnicoItem.nombre}
                                      </strong>

                                      <small>
                                        {
                                          tecnicoItem.asignados
                                        }
                                        /
                                        {tecnicoItem.total}{" "}
                                        tickets
                                      </small>
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="gestion-technician-cell">
                          <span className="gestion-tech-avatar">
                            {ticket.tecnicoIniciales}
                          </span>

                          <div>
                            <strong>
                              {ticket.tecnico}
                            </strong>

                            <small>
                              {ticket.cargaTecnico}
                            </small>
                          </div>
                        </div>
                      )}
                    </td>

                    <td>
                      <div className="gestion-reporter-cell">
                        <span>
                          {ticket.reportanteIniciales}
                        </span>

                        <strong>
                          {ticket.reportante}
                        </strong>
                      </div>
                    </td>

                    <td>
                      <div className="gestion-date-cell">
                        <strong>{ticket.fecha}</strong>
                        <small>{ticket.hora}</small>
                      </div>
                    </td>

                    <td>
                      <div className="gestion-row-actions">
                        <button
                          type="button"
                          title="Ver ticket"
                          onClick={() =>
                            setTicketDetalle(ticket)
                          }
                        >
                          <Eye size={16} />
                        </button>

                        <div className="gestion-more-wrapper">
                          <button
                            type="button"
                            title="Más acciones"
                            onClick={(event) => {
                              event.stopPropagation();

                              setMenuAcciones(
                                menuAcciones === ticket.folio
                                  ? null
                                  : ticket.folio
                              );
                            }}
                          >
                            <MoreVertical size={16} />
                          </button>

                          {menuAcciones === ticket.folio && (
                            <div
                              className="gestion-row-menu"
                              onClick={(event) =>
                                event.stopPropagation()
                              }
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setTicketDetalle(ticket)
                                }
                              >
                                Ver detalles
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  alert(
                                    `Editando ${ticket.folio}`
                                  );

                                  setMenuAcciones(null);
                                }}
                              >
                                Editar ticket
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setTickets((actuales) =>
                                    actuales.filter(
                                      (item) =>
                                        item.folio !==
                                        ticket.folio
                                    )
                                  );

                                  setMenuAcciones(null);
                                }}
                              >
                                Eliminar ticket
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

                {ticketsPagina.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="gestion-empty-table"
                    >
                      No se encontraron tickets con los
                      filtros seleccionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="gestion-table-footer">
            <p>
              Mostrando{" "}
              {ticketsFiltrados.length === 0
                ? 0
                : inicioPagina + 1}{" "}
              a{" "}
              {Math.min(
                inicioPagina + porPagina,
                ticketsFiltrados.length
              )}{" "}
              de {ticketsFiltrados.length} tickets
            </p>

            <div className="gestion-pagination-area">
              <select
                value={porPagina}
                onChange={(event) => {
                  setPorPagina(
                    Number(event.target.value)
                  );

                  setPaginaActual(1);
                }}
              >
                <option value={5}>5 por página</option>
                <option value={10}>10 por página</option>
                <option value={20}>20 por página</option>
              </select>

              <div className="gestion-pagination">
                <button
                  type="button"
                  disabled={paginaActual === 1}
                  onClick={() =>
                    setPaginaActual((pagina) =>
                      Math.max(1, pagina - 1)
                    )
                  }
                >
                  <ChevronLeft size={17} />
                </button>

                {Array.from(
                  { length: totalPaginas },
                  (_, index) => index + 1
                ).map((pagina) => (
                  <button
                    type="button"
                    key={pagina}
                    className={
                      paginaActual === pagina
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setPaginaActual(pagina)
                    }
                  >
                    {pagina}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={
                    paginaActual === totalPaginas
                  }
                  onClick={() =>
                    setPaginaActual((pagina) =>
                      Math.min(
                        totalPaginas,
                        pagina + 1
                      )
                    )
                  }
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {ticketDetalle && (
        <div
          className="gestion-ticket-modal-overlay"
          onClick={() => setTicketDetalle(null)}
        >
          <div
            className="gestion-ticket-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="gestion-ticket-modal-header">
              <div>
                <h2>{ticketDetalle.folio}</h2>
                <p>Detalle del ticket</p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setTicketDetalle(null)
                }
              >
                <X size={18} />
              </button>
            </div>

            <div className="gestion-ticket-modal-body">
              <p>
                <strong>Tipo:</strong>{" "}
                {ticketDetalle.tipo}
              </p>

              <p>
                <strong>Ubicación:</strong>{" "}
                {ticketDetalle.ubicacion},{" "}
                {ticketDetalle.detalleUbicacion}
              </p>

              <p>
                <strong>Prioridad:</strong>{" "}
                {ticketDetalle.prioridad}
              </p>

              <p>
                <strong>Estado:</strong>{" "}
                {ticketDetalle.estado}
              </p>

              <p>
                <strong>Técnico:</strong>{" "}
                {ticketDetalle.tecnico}
              </p>

              <p>
                <strong>Reportante:</strong>{" "}
                {ticketDetalle.reportante}
              </p>

              <p>
                <strong>Fecha:</strong>{" "}
                {ticketDetalle.fecha},{" "}
                {ticketDetalle.hora}
              </p>
            </div>

            <div className="gestion-ticket-modal-footer">
              <button
                type="button"
                onClick={() =>
                  setTicketDetalle(null)
                }
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gestiondetickets;