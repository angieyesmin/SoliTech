import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../shared/components/Navbar";
import "../css/misreportes.css";

import {
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Laptop,
  LogOut,
  Search,
  Settings,
  Sofa,
  User,
  Wrench,
  X,
} from "lucide-react";

type EstadoReporte =
  | "Pendiente"
  | "En Proceso"
  | "Resuelto";

type PrioridadReporte = "Alta" | "Media" | "Baja";

type CategoriaReporte =
  | "Infraestructura"
  | "Tecnología"
  | "Equipamiento"
  | "Mantenimiento";

type Pestana =
  | "Pendientes"
  | "En Proceso"
  | "Finalizadas"
  | "Todas";

type HistorialReporte = {
  estado: EstadoReporte;
  fecha: string;
  descripcion: string;
  comentario?: string;
};

type Reporte = {
  folio: string;
  titulo: string;
  categoria: CategoriaReporte;
  prioridad: PrioridadReporte;
  estado: EstadoReporte;
  fecha: string;
  hora: string;
  descripcion: string;
  historial: HistorialReporte[];
};

const reportesIniciales: Reporte[] = [
  {
    folio: "TKT-0481",
    titulo: "Falla en el proyector del aula 304",
    categoria: "Infraestructura",
    prioridad: "Alta",
    estado: "En Proceso",
    fecha: "27 jun 2026",
    hora: "09:14 AM",
    descripcion:
      "El proyector del aula 304 no enciende, la luz indicadora parpadea en color rojo al intentar encenderlo. Ya se verificó el cable de alimentación y la conexión HDMI, pero el problema persiste.",
    historial: [
      {
        estado: "Pendiente",
        fecha: "27 jun 2026, 09:14 AM",
        descripcion: "Reporte creado por el usuario.",
      },
      {
        estado: "En Proceso",
        fecha: "27 jun 2026, 11:02 AM",
        descripcion: "Asignado a Carlos Mendoza.",
        comentario: "Se revisará el equipo esta tarde.",
      },
      {
        estado: "Resuelto",
        fecha: "27 jun 2026, 04:35 PM",
        descripcion: "Equipo reparado correctamente.",
        comentario:
          "Se reemplazó la lámpara del proyector y se realizaron pruebas.",
      },
    ],
  },
  {
    folio: "TKT-0479",
    titulo: "No hay conexión a internet en laboratorio 2",
    categoria: "Tecnología",
    prioridad: "Alta",
    estado: "Pendiente",
    fecha: "26 jun 2026",
    hora: "04:32 PM",
    descripcion:
      "El laboratorio de cómputo 2 no tiene acceso a internet desde ninguna computadora.",
    historial: [
      {
        estado: "Pendiente",
        fecha: "26 jun 2026, 04:32 PM",
        descripcion: "Reporte creado por el usuario.",
      },
    ],
  },
  {
    folio: "TKT-0476",
    titulo: "Silla dañada en sala de lectura",
    categoria: "Equipamiento",
    prioridad: "Media",
    estado: "En Proceso",
    fecha: "25 jun 2026",
    hora: "11:20 AM",
    descripcion:
      "Una de las sillas de la sala de lectura tiene una pata floja y representa riesgo para los usuarios.",
    historial: [
      {
        estado: "Pendiente",
        fecha: "25 jun 2026, 11:20 AM",
        descripcion: "Reporte registrado.",
      },
      {
        estado: "En Proceso",
        fecha: "25 jun 2026, 01:05 PM",
        descripcion: "Asignado al área de equipamiento.",
      },
    ],
  },
  {
    folio: "TKT-0474",
    titulo: "Filtro de aire no funciona",
    categoria: "Mantenimiento",
    prioridad: "Media",
    estado: "Resuelto",
    fecha: "24 jun 2026",
    hora: "03:45 PM",
    descripcion:
      "El filtro de aire del pasillo norte no enciende y produce ruido.",
    historial: [
      {
        estado: "Pendiente",
        fecha: "24 jun 2026, 03:45 PM",
        descripcion: "Reporte creado.",
      },
      {
        estado: "Resuelto",
        fecha: "25 jun 2026, 10:20 AM",
        descripcion: "Filtro reparado.",
      },
    ],
  },
  {
    folio: "TKT-0471",
    titulo: "Computadora no enciende en aula 101",
    categoria: "Tecnología",
    prioridad: "Alta",
    estado: "Pendiente",
    fecha: "23 jun 2026",
    hora: "08:10 AM",
    descripcion:
      "La computadora principal del aula 101 no enciende al presionar el botón.",
    historial: [
      {
        estado: "Pendiente",
        fecha: "23 jun 2026, 08:10 AM",
        descripcion: "Reporte registrado.",
      },
    ],
  },
  {
    folio: "TKT-0468",
    titulo: "Luz parpadea en pasillo norte",
    categoria: "Infraestructura",
    prioridad: "Baja",
    estado: "Resuelto",
    fecha: "21 jun 2026",
    hora: "02:05 PM",
    descripcion:
      "La lámpara del pasillo norte parpadea constantemente.",
    historial: [
      {
        estado: "Pendiente",
        fecha: "21 jun 2026, 02:05 PM",
        descripcion: "Reporte registrado.",
      },
      {
        estado: "Resuelto",
        fecha: "21 jun 2026, 05:00 PM",
        descripcion: "Lámpara reemplazada.",
      },
    ],
  },
  {
    folio: "TKT-0465",
    titulo: "Aire acondicionado hace ruido",
    categoria: "Mantenimiento",
    prioridad: "Media",
    estado: "En Proceso",
    fecha: "20 jun 2026",
    hora: "09:48 AM",
    descripcion:
      "El aire acondicionado del aula Magna produce un ruido fuerte.",
    historial: [
      {
        estado: "Pendiente",
        fecha: "20 jun 2026, 09:48 AM",
        descripcion: "Reporte creado.",
      },
      {
        estado: "En Proceso",
        fecha: "20 jun 2026, 12:30 PM",
        descripcion: "Asignado a mantenimiento.",
      },
    ],
  },
  {
    folio: "TKT-0462",
    titulo: "Impresora de biblioteca no imprime",
    categoria: "Equipamiento",
    prioridad: "Baja",
    estado: "Resuelto",
    fecha: "18 jun 2026",
    hora: "01:30 PM",
    descripcion:
      "La impresora de la biblioteca recibe los documentos pero no inicia la impresión.",
    historial: [
      {
        estado: "Pendiente",
        fecha: "18 jun 2026, 01:30 PM",
        descripcion: "Reporte creado.",
      },
      {
        estado: "Resuelto",
        fecha: "18 jun 2026, 04:10 PM",
        descripcion: "Se corrigió el atasco de papel.",
      },
    ],
  },
];

function MisReportes() {
  // Permite cambiar de página desde el menú del usuario.
  const navigate = useNavigate();

  const [reportes] = useState<Reporte[]>(reportesIniciales);

  const [pestanaActiva, setPestanaActiva] =
    useState<Pestana>("Todas");

  const [busqueda, setBusqueda] = useState("");

  const [mostrarFiltros, setMostrarFiltros] =
    useState(false);

  const [filtroPrioridad, setFiltroPrioridad] =
    useState<"Todas" | PrioridadReporte>("Todas");

  const [filtroCategoria, setFiltroCategoria] =
    useState<"Todas" | CategoriaReporte>("Todas");

  const [reporteSeleccionado, setReporteSeleccionado] =
    useState<Reporte | null>(reportesIniciales[0]);

  const [mostrarNotificaciones, setMostrarNotificaciones] =
    useState(false);

  const [mostrarPerfil, setMostrarPerfil] =
    useState(false);

  const [paginaActual, setPaginaActual] = useState(1);

  const [porPagina, setPorPagina] = useState(8);

  const reportesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return reportes.filter((reporte) => {
      const coincidePestana =
        pestanaActiva === "Todas" ||
        (pestanaActiva === "Pendientes" &&
          reporte.estado === "Pendiente") ||
        (pestanaActiva === "En Proceso" &&
          reporte.estado === "En Proceso") ||
        (pestanaActiva === "Finalizadas" &&
          reporte.estado === "Resuelto");

      const coincideBusqueda =
        reporte.folio.toLowerCase().includes(texto) ||
        reporte.titulo.toLowerCase().includes(texto);

      const coincidePrioridad =
        filtroPrioridad === "Todas" ||
        reporte.prioridad === filtroPrioridad;

      const coincideCategoria =
        filtroCategoria === "Todas" ||
        reporte.categoria === filtroCategoria;

      return (
        coincidePestana &&
        coincideBusqueda &&
        coincidePrioridad &&
        coincideCategoria
      );
    });
  }, [
    reportes,
    pestanaActiva,
    busqueda,
    filtroPrioridad,
    filtroCategoria,
  ]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(reportesFiltrados.length / porPagina)
  );

  const inicio = (paginaActual - 1) * porPagina;

  const reportesPagina = reportesFiltrados.slice(
    inicio,
    inicio + porPagina
  );

  const obtenerIconoCategoria = (
    categoria: CategoriaReporte
  ) => {
    if (categoria === "Infraestructura") {
      return <Building2 size={16} />;
    }

    if (categoria === "Tecnología") {
      return <Laptop size={16} />;
    }

    if (categoria === "Equipamiento") {
      return <Sofa size={16} />;
    }

    return <Wrench size={16} />;
  };

  const obtenerClaseEstado = (
    estado: EstadoReporte
  ) => {
    if (estado === "Pendiente") {
      return "pending";
    }

    if (estado === "En Proceso") {
      return "process";
    }

    return "resolved";
  };

  const cerrarMenus = () => {
    setMostrarNotificaciones(false);
    setMostrarPerfil(false);
  };

  // Elimina los datos de sesión y regresa al inicio de sesión.
  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("recordarSesion");
    navigate("/login");
  };

  const cambiarPestana = (pestana: Pestana) => {
    setPestanaActiva(pestana);
    setPaginaActual(1);
  };

  const limpiarFiltros = () => {
    setFiltroPrioridad("Todas");
    setFiltroCategoria("Todas");
    setBusqueda("");
    setPaginaActual(1);
  };

  return (
    <div className="layout">
      <Navbar />

      <main
        className={`my-reports-container ${
          reporteSeleccionado
            ? "with-detail-panel"
            : ""
        }`}
        onClick={cerrarMenus}
      >
        <header className="my-reports-header">
          {/* Título de la página y fecha actual. */}
          <div className="my-reports-header-information">
            <h1>Mis Reportes</h1>
            <p>Viernes 27 de junio de 2026</p>
          </div>

          {/* Acciones del usuario: notificaciones y perfil. */}
          <div className="my-reports-user-actions">
            {/* Botón y menú de notificaciones. */}
            <div className="my-reports-notification-wrapper">
              <button
                type="button"
                className="my-reports-notification-button"
                onClick={(evento) => {
                  evento.stopPropagation();
                  setMostrarNotificaciones((actual) => !actual);
                  setMostrarPerfil(false);
                }}
                aria-label="Abrir notificaciones"
                aria-expanded={mostrarNotificaciones}
              >
                <Bell size={20} strokeWidth={1.8} />
                <span>3</span>
              </button>

              {mostrarNotificaciones && (
                <div
                  className="my-reports-notifications"
                  onClick={(evento) => evento.stopPropagation()}
                >
                  <div className="my-reports-menu-header">
                    <h3>Notificaciones</h3>
                    <button
                      type="button"
                      onClick={() => setMostrarNotificaciones(false)}
                      aria-label="Cerrar notificaciones"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="my-reports-notification-item">
                    <i className="blue"></i>
                    <div>
                      <strong>Reporte en proceso</strong>
                      <p>TKT-0481 fue asignado a un técnico.</p>
                    </div>
                  </div>

                  <div className="my-reports-notification-item">
                    <i className="green"></i>
                    <div>
                      <strong>Reporte resuelto</strong>
                      <p>TKT-0474 fue marcado como resuelto.</p>
                    </div>
                  </div>

                  <div className="my-reports-notification-item">
                    <i className="orange"></i>
                    <div>
                      <strong>Reporte pendiente</strong>
                      <p>TKT-0479 continúa sin atender.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Perfil del usuario y menú desplegable. */}
            <div className="my-reports-profile-wrapper">
              <button
                type="button"
                className={`my-reports-profile-button ${
                  mostrarPerfil ? "active" : ""
                }`}
                onClick={(evento) => {
                  evento.stopPropagation();
                  setMostrarPerfil((actual) => !actual);
                  setMostrarNotificaciones(false);
                }}
                aria-label="Abrir menú del usuario"
                aria-expanded={mostrarPerfil}
              >
                <span className="my-reports-avatar">RP</span>

                <span className="my-reports-user-info">
                  <strong>Ricardo Pacheco</strong>
                  <small>Usuario</small>
                </span>

                <ChevronDown
                  size={15}
                  className={`my-reports-profile-arrow ${
                    mostrarPerfil ? "open" : ""
                  }`}
                />
              </button>

              {mostrarPerfil && (
                <div
                  className="my-reports-profile-menu"
                  onClick={(evento) => evento.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarPerfil(false);
                      navigate("/perfil");
                    }}
                  >
                    <User size={17} />
                    <span>Mi perfil</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMostrarPerfil(false);
                      navigate("/configuracion");
                    }}
                  >
                    <Settings size={17} />
                    <span>Configuración</span>
                  </button>

                  <div className="my-reports-profile-divider"></div>

                  <button
                    type="button"
                    className="my-reports-logout-button"
                    onClick={cerrarSesion}
                  >
                    <LogOut size={17} />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="my-reports-content">
          <div className="my-reports-tabs">
            {(
              [
                "Pendientes",
                "En Proceso",
                "Finalizadas",
                "Todas",
              ] as Pestana[]
            ).map((pestana) => (
              <button
                type="button"
                key={pestana}
                className={
                  pestanaActiva === pestana
                    ? "active"
                    : ""
                }
                onClick={() =>
                  cambiarPestana(pestana)
                }
              >
                {pestana}
              </button>
            ))}
          </div>

          <section className="my-reports-table-card">
            <div className="my-reports-tools">
              <div className="my-reports-search">
                <Search size={17} />

                <input
                  type="text"
                  placeholder="Buscar por folio o título..."
                  value={busqueda}
                  onChange={(evento) => {
                    setBusqueda(evento.target.value);
                    setPaginaActual(1);
                  }}
                />
              </div>

              <div className="my-reports-filter-wrapper">
                <button
                  type="button"
                  className={`my-reports-filter-button ${
                    mostrarFiltros ? "active" : ""
                  }`}
                  onClick={(evento) => {
                    evento.stopPropagation();

                    setMostrarFiltros(
                      (actual) => !actual
                    );
                  }}
                >
                  <Filter size={16} />
                  Filtros
                </button>

                {mostrarFiltros && (
                  <div
                    className="my-reports-filter-menu"
                    onClick={(evento) =>
                      evento.stopPropagation()
                    }
                  >
                    <label htmlFor="report-priority">
                      Prioridad
                    </label>

                    <select
                      id="report-priority"
                      value={filtroPrioridad}
                      onChange={(evento) => {
                        setFiltroPrioridad(
                          evento.target
                            .value as
                            | "Todas"
                            | PrioridadReporte
                        );

                        setPaginaActual(1);
                      }}
                    >
                      <option value="Todas">
                        Todas
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

                    <label htmlFor="report-category">
                      Categoría
                    </label>

                    <select
                      id="report-category"
                      value={filtroCategoria}
                      onChange={(evento) => {
                        setFiltroCategoria(
                          evento.target
                            .value as
                            | "Todas"
                            | CategoriaReporte
                        );

                        setPaginaActual(1);
                      }}
                    >
                      <option value="Todas">
                        Todas
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

                    <button
                      type="button"
                      onClick={limpiarFiltros}
                    >
                      Limpiar filtros
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="my-reports-table-scroll">
              <table className="my-reports-table">
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Título</th>
                    <th>Categoría</th>
                    <th>Prioridad</th>
                    <th>Estado</th>
                    <th>Fecha de reporte</th>
                    <th>Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {reportesPagina.map((reporte) => (
                    <tr key={reporte.folio}>
                      <td className="my-report-folio">
                        {reporte.folio}
                      </td>

                      <td className="my-report-title">
                        {reporte.titulo}
                      </td>

                      <td>
                        <div
                          className={`my-report-category ${reporte.categoria
                            .toLowerCase()
                            .replace("í", "i")}`}
                        >
                          {obtenerIconoCategoria(
                            reporte.categoria
                          )}

                          <span>
                            {reporte.categoria}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`my-report-priority ${reporte.prioridad.toLowerCase()}`}
                        >
                          <i></i>
                          {reporte.prioridad}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`my-report-state ${obtenerClaseEstado(
                            reporte.estado
                          )}`}
                        >
                          <i></i>
                          {reporte.estado}
                        </span>
                      </td>

                      <td>
                        <div className="my-report-date">
                          <strong>
                            {reporte.fecha}
                          </strong>

                          <small>
                            {reporte.hora}
                          </small>
                        </div>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="my-report-detail-button"
                          onClick={() =>
                            setReporteSeleccionado(
                              reporte
                            )
                          }
                        >
                          <Eye size={15} />
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}

                  {reportesPagina.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="my-reports-empty"
                      >
                        No se encontraron reportes.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <footer className="my-reports-table-footer">
              <p>
                Mostrando{" "}
                {reportesFiltrados.length === 0
                  ? 0
                  : inicio + 1}{" "}
                a{" "}
                {Math.min(
                  inicio + porPagina,
                  reportesFiltrados.length
                )}{" "}
                de {reportesFiltrados.length} reportes
              </p>

              <div className="my-reports-pagination-area">
                <select
                  value={porPagina}
                  onChange={(evento) => {
                    setPorPagina(
                      Number(evento.target.value)
                    );

                    setPaginaActual(1);
                  }}
                >
                  <option value={4}>
                    4 por página
                  </option>
                  <option value={8}>
                    8 por página
                  </option>
                  <option value={12}>
                    12 por página
                  </option>
                </select>

                <div className="my-reports-pagination">
                  <button
                    type="button"
                    disabled={paginaActual === 1}
                    onClick={() =>
                      setPaginaActual((actual) =>
                        Math.max(1, actual - 1)
                      )
                    }
                  >
                    <ChevronLeft size={17} />
                  </button>

                  {Array.from(
                    { length: totalPaginas },
                    (_, indice) => indice + 1
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
                      setPaginaActual((actual) =>
                        Math.min(
                          totalPaginas,
                          actual + 1
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

        {reporteSeleccionado && (
          <aside
            className="my-report-detail-panel"
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >
            <div className="detail-panel-header">
              <div>
                <h2>Detalle del reporte</h2>
                <strong>
                  {reporteSeleccionado.folio}
                </strong>
              </div>

              <button
                type="button"
                onClick={() =>
                  setReporteSeleccionado(null)
                }
                aria-label="Cerrar detalle"
              >
                <X size={20} />
              </button>
            </div>

            <div className="detail-panel-body">
              <div className="detail-main-field">
                <span>Título</span>

                <strong>
                  {reporteSeleccionado.titulo}
                </strong>
              </div>

              <div className="detail-two-columns">
                <div>
                  <span>Categoría</span>

                  <div className="detail-category">
                    {obtenerIconoCategoria(
                      reporteSeleccionado.categoria
                    )}

                    <strong>
                      {
                        reporteSeleccionado.categoria
                      }
                    </strong>
                  </div>
                </div>

                <div>
                  <span>Prioridad</span>

                  <div>
                    <span
                      className={`my-report-priority ${reporteSeleccionado.prioridad.toLowerCase()}`}
                    >
                      <i></i>

                      {
                        reporteSeleccionado.prioridad
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-main-field">
                <span>Estado actual</span>

                <div>
                  <span
                    className={`my-report-state ${obtenerClaseEstado(
                      reporteSeleccionado.estado
                    )}`}
                  >
                    <i></i>

                    {reporteSeleccionado.estado}
                  </span>
                </div>
              </div>

              <div className="detail-main-field">
                <span>Fecha de reporte</span>

                <div className="detail-date">
                  <CalendarDays size={16} />

                  <strong>
                    {reporteSeleccionado.fecha},{" "}
                    {reporteSeleccionado.hora}
                  </strong>
                </div>
              </div>

              <div className="detail-description">
                <span>Descripción</span>

                <p>
                  {reporteSeleccionado.descripcion}
                </p>
              </div>

              <div className="detail-history">
                <h3>Historial del reporte</h3>

                <div className="history-timeline">
                  {reporteSeleccionado.historial.map(
                    (item, indice) => (
                      <div
                        className={`history-item ${obtenerClaseEstado(
                          item.estado
                        )}`}
                        key={`${item.estado}-${indice}`}
                      >
                        <span className="history-dot">
                          {indice + 1}
                        </span>

                        <div className="history-card">
                          <strong>{item.estado}</strong>

                          <small>{item.fecha}</small>

                          <p>{item.descripcion}</p>

                          {item.comentario && (
                            <p>
                              Comentario:{" "}
                              {item.comentario}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <footer className="detail-panel-footer">
              <button
                type="button"
                onClick={() =>
                  setReporteSeleccionado(null)
                }
              >
                <X size={16} />
                Cerrar
              </button>
            </footer>
          </aside>
        )}
      </main>
    </div>
  );
}

export default MisReportes;