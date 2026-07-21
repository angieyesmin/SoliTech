import { useState,  useMemo } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";
import "../css/Equipamiento.css";

import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Download,
  Edit3,
  Eye,
  Filter,
  Grid2X2,
  Laptop,
  List,
  LogOut,
  Monitor,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Server,
  Trash2,
  TriangleAlert,
  Wifi,
  Wrench,
  X,
} from "lucide-react";

type TipoEquipo =
  | "Cómputo"
  | "Red"
  | "Proyector"
  | "Infraestructura"
  | "Otro";

type EstadoEquipo =
  | "Operativo"
  | "En mantenimiento"
  | "Con falla"
  | "Dado de baja";

type VistaInventario = "tabla" | "tarjetas";

type Equipo = {
  id: string;
  nombre: string;
  numeroSerie: string;
  tipo: TipoEquipo;
  ubicacion: string;
  detalleUbicacion: string;
  estado: EstadoEquipo;
  ultimoMantenimiento: string;
};

type FormularioEquipo = {
  nombre: string;
  numeroSerie: string;
  tipo: TipoEquipo;
  ubicacion: string;
  detalleUbicacion: string;
  estado: EstadoEquipo;
  ultimoMantenimiento: string;
};

const equiposIniciales: Equipo[] = [
  {
    id: "EQ-0041",
    nombre: "Servidor de Archivos Principal",
    numeroSerie: "SRV-X220-A1",
    tipo: "Red",
    ubicacion: "Edificio A",
    detalleUbicacion: "Centro de datos",
    estado: "Operativo",
    ultimoMantenimiento: "15 may 2026",
  },
  {
    id: "EQ-0040",
    nombre: "Proyector Aula Magna",
    numeroSerie: "PRJ-EP785Z",
    tipo: "Proyector",
    ubicacion: "Auditorio",
    detalleUbicacion: "Planta baja",
    estado: "En mantenimiento",
    ultimoMantenimiento: "10 may 2026",
  },
  {
    id: "EQ-0039",
    nombre: "Switch Core Bloque C",
    numeroSerie: "SW-C3750G",
    tipo: "Red",
    ubicacion: "Edificio C",
    detalleUbicacion: "Piso 2",
    estado: "Operativo",
    ultimoMantenimiento: "1 jun 2026",
  },
  {
    id: "EQ-0038",
    nombre: "Aire Acondicionado Lab. Cómputo",
    numeroSerie: "AC-MH18VK",
    tipo: "Infraestructura",
    ubicacion: "Edificio B",
    detalleUbicacion: "Piso 1",
    estado: "Con falla",
    ultimoMantenimiento: "20 abr 2026",
  },
  {
    id: "EQ-0037",
    nombre: "Cámara IP Estacionamiento Norte",
    numeroSerie: "CAM-IP4MP",
    tipo: "Infraestructura",
    ubicacion: "Exterior",
    detalleUbicacion: "Estacionamiento",
    estado: "Con falla",
    ultimoMantenimiento: "3 mar 2026",
  },
  {
    id: "EQ-0036",
    nombre: "PC Escritorio Secretaría",
    numeroSerie: "PC-HP800G6",
    tipo: "Cómputo",
    ubicacion: "Edificio A",
    detalleUbicacion: "Planta baja",
    estado: "Operativo",
    ultimoMantenimiento: "12 jun 2026",
  },
  {
    id: "EQ-0035",
    nombre: "Impresora Multifuncional Bib.",
    numeroSerie: "IMP-MFC895",
    tipo: "Otro",
    ubicacion: "Biblioteca",
    detalleUbicacion: "Sala principal",
    estado: "Con falla",
    ultimoMantenimiento: "5 jun 2026",
  },
  {
    id: "EQ-0034",
    nombre: "Laptop Coordinación Académica",
    numeroSerie: "LTP-LNV2026",
    tipo: "Cómputo",
    ubicacion: "Rectoría",
    detalleUbicacion: "Segundo piso",
    estado: "Dado de baja",
    ultimoMantenimiento: "8 ene 2026",
  },
];

const formularioInicial: FormularioEquipo = {
  nombre: "",
  numeroSerie: "",
  tipo: "Cómputo",
  ubicacion: "",
  detalleUbicacion: "",
  estado: "Operativo",
  ultimoMantenimiento: "",
};

function Equipamiento() {
  const navigate = useNavigate();

  const [equipos, setEquipos] =
    useState<Equipo[]>(equiposIniciales);

  const [busqueda, setBusqueda] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] =
    useState<"Todos" | TipoEquipo>("Todos");

  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState<"Todos" | EstadoEquipo>("Todos");

  const [vista, setVista] =
    useState<VistaInventario>("tabla");

  const [mostrarNotificaciones, setMostrarNotificaciones] =
    useState(false);

  const [mostrarPerfil, setMostrarPerfil] =
    useState(false);

  const [modalEquipo, setModalEquipo] = useState(false);

  const [equipoDetalle, setEquipoDetalle] =
    useState<Equipo | null>(null);

  const [equipoEditando, setEquipoEditando] =
    useState<Equipo | null>(null);

  const [menuEquipo, setMenuEquipo] =
    useState<string | null>(null);

  const [formulario, setFormulario] =
    useState<FormularioEquipo>(formularioInicial);

  const tipos: Array<"Todos" | TipoEquipo> = [
    "Todos",
    "Cómputo",
    "Red",
    "Proyector",
    "Infraestructura",
    "Otro",
  ];

  const equiposFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return equipos.filter((equipo) => {
      const coincideBusqueda =
        equipo.nombre.toLowerCase().includes(texto) ||
        equipo.id.toLowerCase().includes(texto) ||
        equipo.numeroSerie.toLowerCase().includes(texto) ||
        equipo.ubicacion.toLowerCase().includes(texto) ||
        equipo.detalleUbicacion
          .toLowerCase()
          .includes(texto);

      const coincideTipo =
        tipoSeleccionado === "Todos" ||
        equipo.tipo === tipoSeleccionado;

      const coincideEstado =
        estadoSeleccionado === "Todos" ||
        equipo.estado === estadoSeleccionado;

      return (
        coincideBusqueda &&
        coincideTipo &&
        coincideEstado
      );
    });
  }, [
    equipos,
    busqueda,
    tipoSeleccionado,
    estadoSeleccionado,
  ]);

  const operativos = equipos.filter(
    (equipo) => equipo.estado === "Operativo"
  ).length;

  const conFalla = equipos.filter(
    (equipo) => equipo.estado === "Con falla"
  ).length;

  const dadosDeBaja = equipos.filter(
    (equipo) => equipo.estado === "Dado de baja"
  ).length;

  const porcentajeOperativos =
    equipos.length === 0
      ? 0
      : Math.round((operativos / equipos.length) * 100);

  const obtenerClase = (texto: string) =>
    texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

  const obtenerIconoTipo = (tipo: TipoEquipo) => {
    if (tipo === "Cómputo") {
      return <Laptop size={14} />;
    }

    if (tipo === "Red") {
      return <Wifi size={14} />;
    }

    if (tipo === "Proyector") {
      return <Monitor size={14} />;
    }

    if (tipo === "Infraestructura") {
      return <Server size={14} />;
    }

    return <Wrench size={14} />;
  };

  const actualizarInventario = () => {
    window.location.reload();
  };

  const cerrarMenusHeader = () => {
    setMostrarNotificaciones(false);
    setMostrarPerfil(false);
    setMenuEquipo(null);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("recordarSesion");
    localStorage.removeItem("token");

    setMostrarPerfil(false);
    navigate("/login");
  };

  const abrirNuevoEquipo = () => {
    setEquipoEditando(null);
    setFormulario(formularioInicial);
    setModalEquipo(true);
  };

  const abrirEditarEquipo = (equipo: Equipo) => {
    setEquipoEditando(equipo);

    setFormulario({
      nombre: equipo.nombre,
      numeroSerie: equipo.numeroSerie,
      tipo: equipo.tipo,
      ubicacion: equipo.ubicacion,
      detalleUbicacion: equipo.detalleUbicacion,
      estado: equipo.estado,
      ultimoMantenimiento:
        equipo.ultimoMantenimiento,
    });

    setMenuEquipo(null);
    setModalEquipo(true);
  };

  const cerrarModalEquipo = () => {
    setModalEquipo(false);
    setEquipoEditando(null);
    setFormulario(formularioInicial);
  };

  const manejarCampo = (
    evento:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }));
  };

  const guardarEquipo = (
    evento: FormEvent<HTMLFormElement>
  ) => {
    evento.preventDefault();

    if (
      !formulario.nombre.trim() ||
      !formulario.numeroSerie.trim() ||
      !formulario.ubicacion.trim()
    ) {
      alert(
        "Completa el nombre, número de serie y ubicación."
      );
      return;
    }

    const serieRepetida = equipos.some(
      (equipo) =>
        equipo.numeroSerie.toLowerCase() ===
          formulario.numeroSerie.trim().toLowerCase() &&
        equipo.id !== equipoEditando?.id
    );

    if (serieRepetida) {
      alert(
        "Ya existe un equipo con ese número de serie."
      );
      return;
    }

    if (equipoEditando) {
      setEquipos((actuales) =>
        actuales.map((equipo) =>
          equipo.id === equipoEditando.id
            ? {
                ...equipo,
                nombre: formulario.nombre.trim(),
                numeroSerie:
                  formulario.numeroSerie.trim(),
                tipo: formulario.tipo,
                ubicacion:
                  formulario.ubicacion.trim(),
                detalleUbicacion:
                  formulario.detalleUbicacion.trim(),
                estado: formulario.estado,
                ultimoMantenimiento:
                  formulario.ultimoMantenimiento.trim() ||
                  "Sin registro",
              }
            : equipo
        )
      );

      alert("Equipo actualizado correctamente.");
    } else {
      const numeros = equipos.map((equipo) =>
        Number(equipo.id.replace("EQ-", ""))
      );

      const siguienteNumero =
        numeros.length > 0
          ? Math.max(...numeros) + 1
          : 1;

      const nuevoEquipo: Equipo = {
        id: `EQ-${String(siguienteNumero).padStart(
          4,
          "0"
        )}`,
        nombre: formulario.nombre.trim(),
        numeroSerie:
          formulario.numeroSerie.trim(),
        tipo: formulario.tipo,
        ubicacion: formulario.ubicacion.trim(),
        detalleUbicacion:
          formulario.detalleUbicacion.trim(),
        estado: formulario.estado,
        ultimoMantenimiento:
          formulario.ultimoMantenimiento.trim() ||
          "Sin registro",
      };

      setEquipos((actuales) => [
        nuevoEquipo,
        ...actuales,
      ]);

      alert("Equipo registrado correctamente.");
    }

    cerrarModalEquipo();
  };

  const eliminarEquipo = (equipo: Equipo) => {
    const confirmar = window.confirm(
      `¿Deseas eliminar "${equipo.nombre}" del inventario?`
    );

    if (!confirmar) {
      return;
    }

    setEquipos((actuales) =>
      actuales.filter(
        (elemento) => elemento.id !== equipo.id
      )
    );

    setMenuEquipo(null);
  };

  const exportarEquipos = () => {
    const encabezados = [
      "ID",
      "Equipo",
      "Número de serie",
      "Tipo",
      "Ubicación",
      "Detalle de ubicación",
      "Estado",
      "Último mantenimiento",
    ];

    const filas = equiposFiltrados.map((equipo) => [
      equipo.id,
      equipo.nombre,
      equipo.numeroSerie,
      equipo.tipo,
      equipo.ubicacion,
      equipo.detalleUbicacion,
      equipo.estado,
      equipo.ultimoMantenimiento,
    ]);

    const contenidoCSV = [
      encabezados,
      ...filas,
    ]
      .map((fila) =>
        fila
          .map(
            (campo) =>
              `"${String(campo).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const archivo = new Blob(
      ["\uFEFF" + contenidoCSV],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement("a");

    enlace.href = url;
    enlace.download = "inventario-equipamiento.csv";

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    URL.revokeObjectURL(url);
  };

  const limpiarFiltros = () => {
    setBusqueda("");
    setTipoSeleccionado("Todos");
    setEstadoSeleccionado("Todos");
  };

  return (
    <div className="layout">
      <AdminNavbar />

      <main
        className="inventario-container"
        onClick={cerrarMenusHeader}
      >
        <header className="inventario-header">
          <div className="inventario-header-title">
            <h1>Inventario de Equipamiento</h1>

            <p>Viernes 27 de junio de 2026</p>
          </div>

          <div className="inventario-header-actions">
            {/* ACTUALIZAR */}
            <button
              type="button"
              className="inventario-refresh-button"
              onClick={(evento) => {
                evento.stopPropagation();
                actualizarInventario();
              }}
            >
              <RefreshCw size={17} strokeWidth={1.9} />
              Actualizar
            </button>

            {/* EXPORTAR */}
            <button
              type="button"
              className="inventario-export-button"
              onClick={(evento) => {
                evento.stopPropagation();
                exportarEquipos();
              }}
            >
              <Download size={16} />
              Exportar
            </button>

            {/* NUEVO EQUIPO */}
            <button
              type="button"
              className="inventario-new-button"
              onClick={(evento) => {
                evento.stopPropagation();
                abrirNuevoEquipo();
              }}
            >
              <Plus size={17} />
              Nuevo Equipo
            </button>

            {/* NOTIFICACIONES */}
            <div className="inventario-notification-wrapper">
              <button
                type="button"
                className="inventario-notification-button"
                onClick={(evento) => {
                  evento.stopPropagation();

                  setMostrarNotificaciones(
                    (actual) => !actual
                  );

                  setMostrarPerfil(false);
                }}
                aria-label="Abrir notificaciones"
                aria-expanded={mostrarNotificaciones}
              >
                <Bell size={19} strokeWidth={1.8} />
                <span>3</span>
              </button>

              {mostrarNotificaciones && (
                <div
                  className="inventario-notifications"
                  onClick={(evento) =>
                    evento.stopPropagation()
                  }
                >
                  <div className="inventario-notifications-header">
                    <h3>Notificaciones</h3>

                    <button
                      type="button"
                      onClick={() =>
                        setMostrarNotificaciones(false)
                      }
                      aria-label="Cerrar notificaciones"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="inventario-notification-item">
                    <TriangleAlert size={16} />

                    <div>
                      <strong>Equipos con fallas</strong>
                      <p>
                        {conFalla} equipos requieren atención.
                      </p>
                    </div>
                  </div>

                  <div className="inventario-notification-item">
                    <Wrench size={16} />

                    <div>
                      <strong>Mantenimiento pendiente</strong>
                      <p>
                        Revisa el calendario de mantenimiento.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PERFIL */}
            <div className="inventario-profile-wrapper">
              <button
                type="button"
                className={`inventario-profile-button ${
                  mostrarPerfil ? "active" : ""
                }`}
                onClick={(evento) => {
                  evento.stopPropagation();

                  setMostrarPerfil(
                    (actual) => !actual
                  );

                  setMostrarNotificaciones(false);
                }}
                aria-label="Abrir menú del perfil"
                aria-expanded={mostrarPerfil}
              >
                <span className="inventario-profile-avatar">
                  RP
                </span>

                <span className="inventario-profile-info">
                  <strong>Ricardo Pacheco</strong>
                  <small>Administrador</small>
                </span>

                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className={`inventario-profile-arrow ${
                    mostrarPerfil ? "open" : ""
                  }`}
                />
              </button>

              {mostrarPerfil && (
                <div
                  className="inventario-profile-menu"
                  onClick={(evento) =>
                    evento.stopPropagation()
                  }
                >
                  <button
                    type="button"
                    className="inventario-profile-option inventario-logout-option"
                    onClick={cerrarSesion}
                  >
                    <LogOut size={17} strokeWidth={1.8} />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="inventario-content">
          <section className="inventario-stats-grid">
            <article className="inventario-stat-card">
              <h2>{equipos.length}</h2>
              <h3>Equipos totales</h3>
              <p>Inventario completo</p>

              <div className="inventario-progress">
                <span className="total-progress"></span>
              </div>
            </article>

            <article className="inventario-stat-card">
              <h2 className="stat-green">
                {operativos}
              </h2>

              <h3>Operativos</h3>
              <p>{porcentajeOperativos}% del inventario</p>

              <div className="inventario-progress">
                <span
                  className="operative-progress"
                  style={{
                    width: `${porcentajeOperativos}%`,
                  }}
                ></span>
              </div>
            </article>

            <article className="inventario-stat-card">
              <h2 className="stat-red">
                {conFalla}
              </h2>

              <h3>Con falla reportada</h3>
              <p>Requieren atención</p>

              <div className="inventario-progress">
                <span
                  className="failure-progress"
                  style={{
                    width: `${
                      equipos.length
                        ? (conFalla / equipos.length) * 100
                        : 0
                    }%`,
                  }}
                ></span>
              </div>
            </article>

            <article className="inventario-stat-card">
              <h2 className="stat-gray">
                {dadosDeBaja}
              </h2>

              <h3>Dados de baja</h3>
              <p>Fuera de servicio</p>

              <div className="inventario-progress">
                <span
                  className="disabled-progress"
                  style={{
                    width: `${
                      equipos.length
                        ? (dadosDeBaja /
                            equipos.length) *
                          100
                        : 0
                    }%`,
                  }}
                ></span>
              </div>
            </article>
          </section>

          <section className="inventario-filters">
            <div className="inventario-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Nombre, ID o ubicación..."
                value={busqueda}
                onChange={(evento) =>
                  setBusqueda(evento.target.value)
                }
              />
            </div>

            <button
              type="button"
              className="inventario-filter-icon"
              onClick={limpiarFiltros}
              title="Limpiar filtros"
            >
              <Filter size={16} />
            </button>

            <div className="inventario-type-filters">
              {tipos.map((tipo) => (
                <button
                  type="button"
                  key={tipo}
                  className={`inventario-type-button ${
                    tipoSeleccionado === tipo
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setTipoSeleccionado(tipo)
                  }
                >
                  {tipo !== "Todos" &&
                    obtenerIconoTipo(tipo)}

                  {tipo}
                </button>
              ))}
            </div>

            <select
              className="inventario-status-filter"
              value={estadoSeleccionado}
              onChange={(evento) =>
                setEstadoSeleccionado(
                  evento.target.value as
                    | "Todos"
                    | EstadoEquipo
                )
              }
            >
              <option value="Todos">
                Estado: Todos
              </option>
              <option value="Operativo">
                Operativo
              </option>
              <option value="En mantenimiento">
                En mantenimiento
              </option>
              <option value="Con falla">
                Con falla
              </option>
              <option value="Dado de baja">
                Dado de baja
              </option>
            </select>

            <div className="inventario-view-buttons">
              <button
                type="button"
                className={
                  vista === "tabla" ? "active" : ""
                }
                onClick={() => setVista("tabla")}
                aria-label="Vista de tabla"
              >
                <List size={17} />
              </button>

              <button
                type="button"
                className={
                  vista === "tarjetas" ? "active" : ""
                }
                onClick={() => setVista("tarjetas")}
                aria-label="Vista de tarjetas"
              >
                <Grid2X2 size={16} />
              </button>
            </div>
          </section>

          {vista === "tabla" ? (
            <section className="inventario-table-card">
              <div className="inventario-table-scroll">
                <table className="inventario-table">
                  <thead>
                    <tr>
                      <th>Equipo ↕</th>
                      <th>Tipo</th>
                      <th>Ubicación</th>
                      <th>Estado operativo</th>
                      <th>Último mantenimiento ↕</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {equiposFiltrados.map((equipo) => (
                      <tr key={equipo.id}>
                        <td>
                          <div className="inventario-equipment-name">
                            <strong>
                              {equipo.nombre}
                            </strong>

                            <span>
                              {equipo.id} · S/N:{" "}
                              {equipo.numeroSerie}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`inventario-type-badge ${obtenerClase(
                              equipo.tipo
                            )}`}
                          >
                            {obtenerIconoTipo(
                              equipo.tipo
                            )}

                            {equipo.tipo}
                          </span>
                        </td>

                        <td>
                          <div className="inventario-location">
                            <strong>
                              {equipo.ubicacion}
                            </strong>

                            <span>
                              {equipo.detalleUbicacion}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`inventario-status-badge ${obtenerClase(
                              equipo.estado
                            )}`}
                          >
                            {equipo.estado ===
                            "Operativo" ? (
                              <CheckCircle2 size={13} />
                            ) : equipo.estado ===
                              "Con falla" ? (
                              <TriangleAlert size={13} />
                            ) : (
                              <Wrench size={13} />
                            )}

                            {equipo.estado}
                          </span>
                        </td>

                        <td className="inventario-maintenance-date">
                          {equipo.ultimoMantenimiento}
                        </td>

                        <td>
                          <div className="inventario-row-actions">
                            <button
                              type="button"
                              title="Ver detalles"
                              onClick={() =>
                                setEquipoDetalle(equipo)
                              }
                            >
                              <Eye size={15} />
                            </button>

                            <button
                              type="button"
                              title="Editar equipo"
                              onClick={() =>
                                abrirEditarEquipo(equipo)
                              }
                            >
                              <Edit3 size={15} />
                            </button>

                            <div className="inventario-more-wrapper">
                              <button
                                type="button"
                                title="Más opciones"
                                onClick={(evento) => {
                                  evento.stopPropagation();

                                  setMenuEquipo(
                                    menuEquipo ===
                                      equipo.id
                                      ? null
                                      : equipo.id
                                  );
                                }}
                              >
                                <MoreHorizontal
                                  size={16}
                                />
                              </button>

                              {menuEquipo ===
                                equipo.id && (
                                <div
                                  className="inventario-row-menu"
                                  onClick={(evento) =>
                                    evento.stopPropagation()
                                  }
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      abrirEditarEquipo(
                                        equipo
                                      )
                                    }
                                  >
                                    <Edit3 size={14} />
                                    Editar
                                  </button>

                                  <button
                                    type="button"
                                    className="delete"
                                    onClick={() =>
                                      eliminarEquipo(equipo)
                                    }
                                  >
                                    <Trash2 size={14} />
                                    Eliminar
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {equiposFiltrados.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="inventario-empty"
                        >
                          No se encontraron equipos.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            <section className="inventario-cards-grid">
              {equiposFiltrados.map((equipo) => (
                <article
                  className="inventario-equipment-card"
                  key={equipo.id}
                >
                  <div className="equipment-card-header">
                    <span
                      className={`equipment-card-icon ${obtenerClase(
                        equipo.tipo
                      )}`}
                    >
                      {obtenerIconoTipo(equipo.tipo)}
                    </span>

                    <span
                      className={`inventario-status-badge ${obtenerClase(
                        equipo.estado
                      )}`}
                    >
                      {equipo.estado}
                    </span>
                  </div>

                  <h3>{equipo.nombre}</h3>
                  <p>
                    {equipo.id} · {equipo.numeroSerie}
                  </p>

                  <div className="equipment-card-info">
                    <span>
                      <b>Ubicación:</b>{" "}
                      {equipo.ubicacion}
                    </span>

                    <span>
                      <b>Área:</b>{" "}
                      {equipo.detalleUbicacion}
                    </span>

                    <span>
                      <b>Mantenimiento:</b>{" "}
                      {equipo.ultimoMantenimiento}
                    </span>
                  </div>

                  <div className="equipment-card-actions">
                    <button
                      type="button"
                      onClick={() =>
                        setEquipoDetalle(equipo)
                      }
                    >
                      <Eye size={15} />
                      Ver
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        abrirEditarEquipo(equipo)
                      }
                    >
                      <Edit3 size={15} />
                      Editar
                    </button>
                  </div>
                </article>
              ))}
            </section>
          )}
        </section>
      </main>

      {modalEquipo && (
        <div
          className="inventario-modal-overlay"
          onClick={cerrarModalEquipo}
        >
          <form
            className="inventario-modal"
            onSubmit={guardarEquipo}
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >
            <header className="inventario-modal-header">
              <div>
                <h2>
                  {equipoEditando
                    ? "Editar equipo"
                    : "Nuevo equipo"}
                </h2>

                <p>
                  Completa la información del
                  equipamiento.
                </p>
              </div>

              <button
                type="button"
                onClick={cerrarModalEquipo}
              >
                <X size={18} />
              </button>
            </header>

            <div className="inventario-modal-body">
              <div className="inventario-form-group full">
                <label htmlFor="nombre">
                  Nombre del equipo
                </label>

                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formulario.nombre}
                  onChange={manejarCampo}
                  required
                />
              </div>

              <div className="inventario-form-group">
                <label htmlFor="numeroSerie">
                  Número de serie
                </label>

                <input
                  id="numeroSerie"
                  name="numeroSerie"
                  type="text"
                  value={formulario.numeroSerie}
                  onChange={manejarCampo}
                  required
                />
              </div>

              <div className="inventario-form-group">
                <label htmlFor="tipo">Tipo</label>

                <select
                  id="tipo"
                  name="tipo"
                  value={formulario.tipo}
                  onChange={manejarCampo}
                >
                  <option value="Cómputo">
                    Cómputo
                  </option>
                  <option value="Red">Red</option>
                  <option value="Proyector">
                    Proyector
                  </option>
                  <option value="Infraestructura">
                    Infraestructura
                  </option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="inventario-form-group">
                <label htmlFor="ubicacion">
                  Ubicación
                </label>

                <input
                  id="ubicacion"
                  name="ubicacion"
                  type="text"
                  value={formulario.ubicacion}
                  onChange={manejarCampo}
                  required
                />
              </div>

              <div className="inventario-form-group">
                <label htmlFor="detalleUbicacion">
                  Área o detalle
                </label>

                <input
                  id="detalleUbicacion"
                  name="detalleUbicacion"
                  type="text"
                  value={
                    formulario.detalleUbicacion
                  }
                  onChange={manejarCampo}
                />
              </div>

              <div className="inventario-form-group">
                <label htmlFor="estado">
                  Estado
                </label>

                <select
                  id="estado"
                  name="estado"
                  value={formulario.estado}
                  onChange={manejarCampo}
                >
                  <option value="Operativo">
                    Operativo
                  </option>
                  <option value="En mantenimiento">
                    En mantenimiento
                  </option>
                  <option value="Con falla">
                    Con falla
                  </option>
                  <option value="Dado de baja">
                    Dado de baja
                  </option>
                </select>
              </div>

              <div className="inventario-form-group">
                <label htmlFor="ultimoMantenimiento">
                  Último mantenimiento
                </label>

                <input
                  id="ultimoMantenimiento"
                  name="ultimoMantenimiento"
                  type="text"
                  placeholder="Ej. 27 jun 2026"
                  value={
                    formulario.ultimoMantenimiento
                  }
                  onChange={manejarCampo}
                />
              </div>
            </div>

            <footer className="inventario-modal-footer">
              <button
                type="button"
                className="cancel"
                onClick={cerrarModalEquipo}
              >
                Cancelar
              </button>

              <button type="submit" className="save">
                {equipoEditando
                  ? "Guardar cambios"
                  : "Registrar equipo"}
              </button>
            </footer>
          </form>
        </div>
      )}

      {equipoDetalle && (
        <div
          className="inventario-modal-overlay"
          onClick={() => setEquipoDetalle(null)}
        >
          <div
            className="inventario-detail-modal"
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >
            <header className="inventario-modal-header">
              <div>
                <h2>{equipoDetalle.nombre}</h2>
                <p>{equipoDetalle.id}</p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEquipoDetalle(null)
                }
              >
                <X size={18} />
              </button>
            </header>

            <div className="inventario-detail-body">
              <div>
                <span>Número de serie</span>
                <strong>
                  {equipoDetalle.numeroSerie}
                </strong>
              </div>

              <div>
                <span>Tipo</span>
                <strong>{equipoDetalle.tipo}</strong>
              </div>

              <div>
                <span>Ubicación</span>
                <strong>
                  {equipoDetalle.ubicacion}
                </strong>
              </div>

              <div>
                <span>Área</span>
                <strong>
                  {equipoDetalle.detalleUbicacion}
                </strong>
              </div>

              <div>
                <span>Estado</span>
                <strong>{equipoDetalle.estado}</strong>
              </div>

              <div>
                <span>Último mantenimiento</span>
                <strong>
                  {
                    equipoDetalle.ultimoMantenimiento
                  }
                </strong>
              </div>
            </div>

            <footer className="inventario-modal-footer">
              <button
                type="button"
                className="cancel"
                onClick={() =>
                  setEquipoDetalle(null)
                }
              >
                Cerrar
              </button>

              <button
                type="button"
                className="save"
                onClick={() => {
                  setEquipoDetalle(null);
                  abrirEditarEquipo(equipoDetalle);
                }}
              >
                Editar equipo
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default Equipamiento;