import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/historial.css";
import TecnicoNavbar from "../../tecnico/components/TecnicoNavbar";


import {
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Filter,
  Grid2X2,
  Laptop,
  LogOut,
  Settings,
  Sofa,
  Star,
  Timer,
  User,
  Wrench,
  X,
} from "lucide-react";

type TipoIncidencia =
  | "Infraestructura"
  | "Tecnología"
  | "Equipamiento"
  | "Mantenimiento";

type RangoFecha =
  | "Este mes"
  | "Últimos 7 días"
  | "Últimos 30 días"
  | "Este año";

type HistorialTicket = {
  folio: string;
  tipo: TipoIncidencia;
  ubicacion: string;
  fechaResolucion: string;
  fechaOrden: string;
  tiempoAtencion: string;
  estado: "Resuelto";
};

const historialInicial: HistorialTicket[] = [
  {
    folio: "TKT-0428",
    tipo: "Infraestructura",
    ubicacion: "Edificio A – Piso 3, Aula 304",
    fechaResolucion: "27 jun 2026, 02:35 PM",
    fechaOrden: "2026-06-27T14:35:00",
    tiempoAtencion: "8h 45m",
    estado: "Resuelto",
  },
  {
    folio: "TKT-0425",
    tipo: "Tecnología",
    ubicacion: "Laboratorio de Cómputo 2, Bloque C",
    fechaResolucion: "26 jun 2026, 11:20 AM",
    fechaOrden: "2026-06-26T11:20:00",
    tiempoAtencion: "5h 20m",
    estado: "Resuelto",
  },
  {
    folio: "TKT-0419",
    tipo: "Equipamiento",
    ubicacion: "Biblioteca Central, Sala de lectura",
    fechaResolucion: "25 jun 2026, 04:45 PM",
    fechaOrden: "2026-06-25T16:45:00",
    tiempoAtencion: "12h 10m",
    estado: "Resuelto",
  },
  {
    folio: "TKT-0416",
    tipo: "Mantenimiento",
    ubicacion: "Edificio B – Planta baja, Pasillo norte",
    fechaResolucion: "24 jun 2026, 09:10 AM",
    fechaOrden: "2026-06-24T09:10:00",
    tiempoAtencion: "6h 05m",
    estado: "Resuelto",
  },
  {
    folio: "TKT-0412",
    tipo: "Infraestructura",
    ubicacion: "Cafetería, Planta baja",
    fechaResolucion: "22 jun 2026, 03:15 PM",
    fechaOrden: "2026-06-22T15:15:00",
    tiempoAtencion: "4h 30m",
    estado: "Resuelto",
  },
  {
    folio: "TKT-0407",
    tipo: "Tecnología",
    ubicacion: "Sala de juntas, Rectoría",
    fechaResolucion: "21 jun 2026, 10:50 AM",
    fechaOrden: "2026-06-21T10:50:00",
    tiempoAtencion: "7h 40m",
    estado: "Resuelto",
  },
  {
    folio: "TKT-0403",
    tipo: "Equipamiento",
    ubicacion: "Aula 101, Edificio A",
    fechaResolucion: "19 jun 2026, 05:30 PM",
    fechaOrden: "2026-06-19T17:30:00",
    tiempoAtencion: "9h 15m",
    estado: "Resuelto",
  },
  {
    folio: "TKT-0398",
    tipo: "Mantenimiento",
    ubicacion: "Auditorio Principal",
    fechaResolucion: "18 jun 2026, 01:25 PM",
    fechaOrden: "2026-06-18T13:25:00",
    tiempoAtencion: "10h 55m",
    estado: "Resuelto",
  },
  {
    folio: "TKT-0394",
    tipo: "Infraestructura",
    ubicacion: "Edificio C, Pasillo central",
    fechaResolucion: "16 jun 2026, 09:40 AM",
    fechaOrden: "2026-06-16T09:40:00",
    tiempoAtencion: "6h 50m",
    estado: "Resuelto",
  },
  {
    folio: "TKT-0390",
    tipo: "Tecnología",
    ubicacion: "Laboratorio de Física, Bloque D",
    fechaResolucion: "14 jun 2026, 12:15 PM",
    fechaOrden: "2026-06-14T12:15:00",
    tiempoAtencion: "7h 15m",
    estado: "Resuelto",
  },
  {
    folio: "TKT-0387",
    tipo: "Equipamiento",
    ubicacion: "Sala audiovisual",
    fechaResolucion: "10 jun 2026, 03:45 PM",
    fechaOrden: "2026-06-10T15:45:00",
    tiempoAtencion: "8h 20m",
    estado: "Resuelto",
  },
  {
    folio: "TKT-0381",
    tipo: "Mantenimiento",
    ubicacion: "Área administrativa",
    fechaResolucion: "05 jun 2026, 08:50 AM",
    fechaOrden: "2026-06-05T08:50:00",
    tiempoAtencion: "5h 35m",
    estado: "Resuelto",
  },
];

const HistorialEstados: React.FC = () => {
  const navigate = useNavigate();

  const [rangoFecha, setRangoFecha] =
    useState<RangoFecha>("Este mes");

  const [tipoSeleccionado, setTipoSeleccionado] =
    useState<"Todos" | TipoIncidencia>("Todos");

  const [paginaActual, setPaginaActual] = useState(1);
  const [resultadosPorPagina, setResultadosPorPagina] =
    useState(8);

  const [ordenAscendente, setOrdenAscendente] =
    useState(false);

  const [mostrarNotificaciones, setMostrarNotificaciones] =
    useState(false);

  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  const [notificacionesLeidas, setNotificacionesLeidas] =
    useState(false);

  const historialFiltrado = useMemo(() => {
    const fechaActualReferencia = new Date("2026-06-27T23:59:59");

    const filtrados = historialInicial.filter((ticket) => {
      const fechaTicket = new Date(ticket.fechaOrden);

      let coincideFecha = true;

      if (rangoFecha === "Últimos 7 días") {
        const limite = new Date(fechaActualReferencia);
        limite.setDate(limite.getDate() - 7);

        coincideFecha = fechaTicket >= limite;
      }

      if (rangoFecha === "Últimos 30 días") {
        const limite = new Date(fechaActualReferencia);
        limite.setDate(limite.getDate() - 30);

        coincideFecha = fechaTicket >= limite;
      }

      if (rangoFecha === "Este mes") {
        coincideFecha =
          fechaTicket.getMonth() === 5 &&
          fechaTicket.getFullYear() === 2026;
      }

      if (rangoFecha === "Este año") {
        coincideFecha = fechaTicket.getFullYear() === 2026;
      }

      const coincideTipo =
        tipoSeleccionado === "Todos" ||
        ticket.tipo === tipoSeleccionado;

      return coincideFecha && coincideTipo;
    });

    return [...filtrados].sort((a, b) => {
      const fechaA = new Date(a.fechaOrden).getTime();
      const fechaB = new Date(b.fechaOrden).getTime();

      return ordenAscendente
        ? fechaA - fechaB
        : fechaB - fechaA;
    });
  }, [rangoFecha, tipoSeleccionado, ordenAscendente]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(
      historialFiltrado.length / resultadosPorPagina
    )
  );

  const indiceInicial =
    (paginaActual - 1) * resultadosPorPagina;

  const historialPagina = historialFiltrado.slice(
    indiceInicial,
    indiceInicial + resultadosPorPagina
  );

  const limpiarFiltros = () => {
    setRangoFecha("Este mes");
    setTipoSeleccionado("Todos");
    setPaginaActual(1);
    setOrdenAscendente(false);
  };

  const cambiarResultadosPorPagina = (
    cantidad: number
  ) => {
    setResultadosPorPagina(cantidad);
    setPaginaActual(1);
  };

  const obtenerIconoTipo = (tipo: TipoIncidencia) => {
    if (tipo === "Infraestructura") {
      return <Building2 size={17} />;
    }

    if (tipo === "Tecnología") {
      return <Laptop size={17} />;
    }

    if (tipo === "Equipamiento") {
      return <Sofa size={17} />;
    }

    return <Wrench size={17} />;
  };

  const obtenerClaseTipo = (tipo: TipoIncidencia) => {
    return tipo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const cerrarMenus = () => {
    setMostrarNotificaciones(false);
    setMostrarPerfil(false);
  };

  const obtenerPaginasVisibles = () => {
    const paginas: number[] = [];

    for (
      let pagina = 1;
      pagina <= totalPaginas;
      pagina += 1
    ) {
      paginas.push(pagina);
    }

    return paginas.slice(0, 3);
  };

  return (
    <div className="layout">
      <TecnicoNavbar />

      <main
        className="historial-container"
        onClick={cerrarMenus}
      >
        <header className="historial-header">
          <div>
            <h1>Historial de Incidencias Atendidas</h1>
            <p>Viernes 27 de junio de 2026</p>
          </div>

          <div className="historial-user-area">
            <div className="historial-notification-wrapper">
              <button
                type="button"
                className="historial-notification-button"
                onClick={(evento) => {
                  evento.stopPropagation();

                  setMostrarNotificaciones(
                    (estado) => !estado
                  );

                  setMostrarPerfil(false);
                }}
                aria-label="Abrir notificaciones"
              >
                <Bell size={20} />

                {!notificacionesLeidas && (
                  <span>3</span>
                )}
              </button>

              {mostrarNotificaciones && (
                <div
                  className="historial-notifications-menu"
                  onClick={(evento) =>
                    evento.stopPropagation()
                  }
                >
                  <div className="historial-menu-header">
                    <div>
                      <h3>Notificaciones</h3>
                      <p>Actividad reciente</p>
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

                  <div className="historial-notification-item">
                    <i className="green"></i>

                    <div>
                      <strong>Incidencia resuelta</strong>
                      <p>
                        TKT-0428 fue marcada como resuelta.
                      </p>
                    </div>
                  </div>

                  <div className="historial-notification-item">
                    <i className="blue"></i>

                    <div>
                      <strong>Nuevo comentario</strong>
                      <p>
                        Se agregó seguimiento a TKT-0425.
                      </p>
                    </div>
                  </div>

                  <div className="historial-notification-item">
                    <i className="orange"></i>

                    <div>
                      <strong>Calificación recibida</strong>
                      <p>
                        Un usuario calificó la atención con
                        5 estrellas.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="historial-read-button"
                    onClick={() => {
                      setNotificacionesLeidas(true);
                      setMostrarNotificaciones(false);
                    }}
                  >
                    Marcar como leídas
                  </button>
                </div>
              )}
            </div>

            <div className="historial-profile-wrapper">
              <button
                type="button"
                className="historial-profile-button"
                onClick={(evento) => {
                  evento.stopPropagation();

                  setMostrarPerfil(
                    (estado) => !estado
                  );

                  setMostrarNotificaciones(false);
                }}
              >
                <span className="historial-avatar">RP</span>

                <span className="historial-profile-data">
                  <strong>Ricardo Pacheco</strong>
                  <small>Técnico de Soporte</small>
                </span>

                <ChevronDown size={17} />
              </button>

              {mostrarPerfil && (
                <div
                  className="historial-profile-menu"
                  onClick={(evento) =>
                    evento.stopPropagation()
                  }
                >
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/tecnico/perfil")
                    }
                  >
                    <User size={16} />
                    Mi perfil
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/tecnico/configuracion")
                    }
                  >
                    <Settings size={16} />
                    Configuración
                  </button>

                  <button
                    type="button"
                    className="logout"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                  >
                    <LogOut size={16} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="historial-content">
          <section className="historial-filters-card">
            <div className="historial-filter-group">
              <label htmlFor="rango-fecha">
                Rango de fechas
              </label>

              <div className="historial-select-wrapper">
                <CalendarDays size={18} />

                <select
                  id="rango-fecha"
                  value={rangoFecha}
                  onChange={(evento) => {
                    setRangoFecha(
                      evento.target.value as RangoFecha
                    );

                    setPaginaActual(1);
                  }}
                >
                  <option value="Este mes">
                    Este mes
                  </option>

                  <option value="Últimos 7 días">
                    Últimos 7 días
                  </option>

                  <option value="Últimos 30 días">
                    Últimos 30 días
                  </option>

                  <option value="Este año">
                    Este año
                  </option>
                </select>
              </div>
            </div>

            <div className="historial-filter-group">
              <label htmlFor="tipo-incidencia">
                Tipo de incidencia
              </label>

              <div className="historial-select-wrapper">
                <Grid2X2 size={18} />

                <select
                  id="tipo-incidencia"
                  value={tipoSeleccionado}
                  onChange={(evento) => {
                    setTipoSeleccionado(
                      evento.target.value as
                        | "Todos"
                        | TipoIncidencia
                    );

                    setPaginaActual(1);
                  }}
                >
                  <option value="Todos">
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
              className="historial-clear-button"
              onClick={limpiarFiltros}
            >
              <Filter size={17} />
              Limpiar filtros
            </button>
          </section>

          <section className="historial-stats-grid">
            <article className="historial-stat-card">
              <div className="historial-stat-icon green">
                <ClipboardCheck size={30} />
              </div>

              <div>
                <p>Total atendidos</p>
                <h2>142</h2>
                <span>Incidencias resueltas</span>
              </div>
            </article>

            <article className="historial-stat-card">
              <div className="historial-stat-icon blue">
                <Timer size={31} />
              </div>

              <div>
                <p>Tiempo promedio</p>
                <h2>16h</h2>
                <span>Tiempo promedio de atención</span>
              </div>
            </article>

            <article className="historial-stat-card">
              <div className="historial-stat-icon orange">
                <Star size={31} />
              </div>

              <div>
                <p>Satisfacción</p>
                <h2>94%</h2>
                <span>Calificación promedio</span>
              </div>
            </article>
          </section>

          <section className="historial-table-card">
            <div className="historial-table-scroll">
              <table className="historial-table">
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Tipo</th>
                    <th>Ubicación</th>

                    <th>
                      <button
                        type="button"
                        className="historial-sort-button"
                        onClick={() =>
                          setOrdenAscendente(
                            (estado) => !estado
                          )
                        }
                      >
                        Fecha resolución
                        <span>
                          {ordenAscendente ? "↑" : "↓"}
                        </span>
                      </button>
                    </th>

                    <th>Tiempo de atención</th>
                    <th>Estado final</th>
                  </tr>
                </thead>

                <tbody>
                  {historialPagina.map((ticket) => (
                    <tr key={ticket.folio}>
                      <td className="historial-folio">
                        {ticket.folio}
                      </td>

                      <td>
                        <div className="historial-type-cell">
                          <span
                            className={`historial-type-icon ${obtenerClaseTipo(
                              ticket.tipo
                            )}`}
                          >
                            {obtenerIconoTipo(ticket.tipo)}
                          </span>

                          <span>{ticket.tipo}</span>
                        </div>
                      </td>

                      <td className="historial-location">
                        {ticket.ubicacion}
                      </td>

                      <td className="historial-date">
                        {ticket.fechaResolucion}
                      </td>

                      <td className="historial-time">
                        {ticket.tiempoAtencion}
                      </td>

                      <td>
                        <span className="historial-resolved-badge">
                          <CheckCircle2 size={13} />
                          {ticket.estado}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {historialPagina.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="historial-empty"
                      >
                        No se encontraron incidencias con los
                        filtros seleccionados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <footer className="historial-table-footer">
              <p>
                Mostrando{" "}
                {historialFiltrado.length === 0
                  ? 0
                  : indiceInicial + 1}{" "}
                a{" "}
                {Math.min(
                  indiceInicial + resultadosPorPagina,
                  historialFiltrado.length
                )}{" "}
                de {historialFiltrado.length} resultados
              </p>

              <div className="historial-pagination-area">
                <select
                  value={resultadosPorPagina}
                  onChange={(evento) =>
                    cambiarResultadosPorPagina(
                      Number(evento.target.value)
                    )
                  }
                >
                  <option value={5}>5 por página</option>
                  <option value={8}>8 por página</option>
                  <option value={10}>10 por página</option>
                </select>

                <div className="historial-pagination">
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

                  {obtenerPaginasVisibles().map(
                    (pagina) => (
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
                    )
                  )}

                  {totalPaginas > 4 && (
                    <span>...</span>
                  )}

                  {totalPaginas > 3 && (
                    <button
                      type="button"
                      className={
                        paginaActual === totalPaginas
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setPaginaActual(totalPaginas)
                      }
                    >
                      {totalPaginas}
                    </button>
                  )}

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
            </footer>
          </section>
        </section>
      </main>
    </div>
  );
};

export default HistorialEstados;