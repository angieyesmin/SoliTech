import {
  FormEvent,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import "../css/usuarios.css";

import {
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleX,
  Download,
  LogOut,
  MoreVertical,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  User,
  UserRound,
  Users,
  Wrench,
  X,
} from "lucide-react";

type RolUsuario =
  | "Administrador"
  | "Técnico"
  | "Usuario";

type Usuario = {
  id: number;
  nombre: string;
  correo: string;
  rol: RolUsuario;
  activo: boolean;
  fechaRegistro: string;
};

const usuariosIniciales: Usuario[] = [
  {
    id: 1,
    nombre: "Carlos Mendoza",
    correo: "c.mendoza@solitech.com",
    rol: "Administrador",
    activo: true,
    fechaRegistro: "12/01/2023",
  },
  {
    id: 2,
    nombre: "Elena Rodríguez",
    correo: "e.rodriguez@solitech.com",
    rol: "Técnico",
    activo: true,
    fechaRegistro: "15/02/2023",
  },
  {
    id: 3,
    nombre: "Roberto Gómez",
    correo: "r.gomez@solitech.com",
    rol: "Usuario",
    activo: true,
    fechaRegistro: "03/03/2023",
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    correo: "a.martinez@solitech.com",
    rol: "Técnico",
    activo: false,
    fechaRegistro: "22/04/2023",
  },
  {
    id: 5,
    nombre: "Lucía Fernández",
    correo: "l.fernandez@solitech.com",
    rol: "Usuario",
    activo: true,
    fechaRegistro: "10/05/2023",
  },
  {
    id: 6,
    nombre: "Marcos Soto",
    correo: "m.soto@solitech.com",
    rol: "Técnico",
    activo: true,
    fechaRegistro: "18/06/2023",
  },
  {
    id: 7,
    nombre: "Sofía Villa",
    correo: "s.villa@solitech.com",
    rol: "Usuario",
    activo: true,
    fechaRegistro: "05/07/2023",
  },
  {
    id: 8,
    nombre: "Daniel Ortega",
    correo: "d.ortega@solitech.com",
    rol: "Administrador",
    activo: true,
    fechaRegistro: "20/08/2023",
  },
];

function Usuarios() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] =
    useState<Usuario[]>(usuariosIniciales);

  const [busqueda, setBusqueda] = useState("");

  const [rolSeleccionado, setRolSeleccionado] =
    useState<"Todos" | RolUsuario>("Todos");

  const [mostrarModal, setMostrarModal] =
    useState(false);

  const [mostrarNotificaciones, setMostrarNotificaciones] =
    useState(false);

  const [mostrarPerfil, setMostrarPerfil] =
    useState(false);

  const [nombreNuevo, setNombreNuevo] = useState("");
  const [correoNuevo, setCorreoNuevo] = useState("");

  const [rolNuevo, setRolNuevo] =
    useState<RolUsuario>("Usuario");

  const [fechaNuevo, setFechaNuevo] = useState(
    new Date().toLocaleDateString("es-MX")
  );

  const [usuarioEditando, setUsuarioEditando] =
    useState<Usuario | null>(null);

  const [menuUsuario, setMenuUsuario] =
    useState<number | null>(null);

  const [paginaActual, setPaginaActual] = useState(1);

  const usuariosPorPagina = 8;

  const usuariosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return usuarios.filter((usuario) => {
      const coincideBusqueda =
        usuario.nombre.toLowerCase().includes(texto) ||
        usuario.correo.toLowerCase().includes(texto);

      const coincideRol =
        rolSeleccionado === "Todos" ||
        usuario.rol === rolSeleccionado;

      return coincideBusqueda && coincideRol;
    });
  }, [usuarios, busqueda, rolSeleccionado]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(
      usuariosFiltrados.length / usuariosPorPagina
    )
  );

  const indiceInicial =
    (paginaActual - 1) * usuariosPorPagina;

  const usuariosPagina = usuariosFiltrados.slice(
    indiceInicial,
    indiceInicial + usuariosPorPagina
  );

  const usuariosActivos = usuarios.filter(
    (usuario) => usuario.activo
  ).length;

  const administradores = usuarios.filter(
    (usuario) => usuario.rol === "Administrador"
  ).length;

  const cuentasInactivas = usuarios.filter(
    (usuario) => !usuario.activo
  ).length;

  const obtenerIniciales = (nombre: string) => {
    return nombre
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((palabra) => palabra.charAt(0))
      .join("")
      .toUpperCase();
  };

  const obtenerClaseRol = (rol: RolUsuario) => {
    return rol
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const obtenerIconoRol = (rol: RolUsuario) => {
    if (rol === "Administrador") {
      return <ShieldCheck size={13} />;
    }

    if (rol === "Técnico") {
      return <Wrench size={13} />;
    }

    return <UserRound size={13} />;
  };

  const abrirNuevoUsuario = () => {
    setUsuarioEditando(null);
    setNombreNuevo("");
    setCorreoNuevo("");
    setRolNuevo("Usuario");
    setFechaNuevo(
      new Date().toLocaleDateString("es-MX")
    );
    setMostrarModal(true);
  };

  const abrirEditarUsuario = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
    setNombreNuevo(usuario.nombre);
    setCorreoNuevo(usuario.correo);
    setRolNuevo(usuario.rol);
    setFechaNuevo(usuario.fechaRegistro);
    setMostrarModal(true);
    setMenuUsuario(null);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setUsuarioEditando(null);
    setNombreNuevo("");
    setCorreoNuevo("");
    setRolNuevo("Usuario");
  };

  const guardarUsuario = (
    evento: FormEvent<HTMLFormElement>
  ) => {
    evento.preventDefault();

    if (
      !nombreNuevo.trim() ||
      !correoNuevo.trim()
    ) {
      alert("Completa el nombre y el correo.");
      return;
    }

    const correoExiste = usuarios.some(
      (usuario) =>
        usuario.correo.toLowerCase() ===
          correoNuevo.trim().toLowerCase() &&
        usuario.id !== usuarioEditando?.id
    );

    if (correoExiste) {
      alert("Ya existe un usuario con ese correo.");
      return;
    }

    if (usuarioEditando) {
      setUsuarios((usuariosActuales) =>
        usuariosActuales.map((usuario) =>
          usuario.id === usuarioEditando.id
            ? {
                ...usuario,
                nombre: nombreNuevo.trim(),
                correo: correoNuevo.trim(),
                rol: rolNuevo,
                fechaRegistro: fechaNuevo,
              }
            : usuario
        )
      );

      alert("Usuario actualizado correctamente.");
    } else {
      const nuevoUsuario: Usuario = {
        id:
          usuarios.length > 0
            ? Math.max(
                ...usuarios.map(
                  (usuario) => usuario.id
                )
              ) + 1
            : 1,
        nombre: nombreNuevo.trim(),
        correo: correoNuevo.trim(),
        rol: rolNuevo,
        activo: true,
        fechaRegistro: fechaNuevo,
      };

      setUsuarios((usuariosActuales) => [
        ...usuariosActuales,
        nuevoUsuario,
      ]);

      alert("Usuario agregado correctamente.");
    }

    cerrarModal();
  };

  const cambiarEstadoUsuario = (id: number) => {
    setUsuarios((usuariosActuales) =>
      usuariosActuales.map((usuario) =>
        usuario.id === id
          ? {
              ...usuario,
              activo: !usuario.activo,
            }
          : usuario
      )
    );
  };

  const eliminarUsuario = (usuario: Usuario) => {
    const confirmar = window.confirm(
      `¿Deseas eliminar a ${usuario.nombre}?`
    );

    if (!confirmar) {
      return;
    }

    setUsuarios((usuariosActuales) =>
      usuariosActuales.filter(
        (usuarioActual) =>
          usuarioActual.id !== usuario.id
      )
    );

    setMenuUsuario(null);

    if (
      usuariosPagina.length === 1 &&
      paginaActual > 1
    ) {
      setPaginaActual((pagina) => pagina - 1);
    }
  };

  const exportarUsuarios = () => {
    const encabezados = [
      "ID",
      "Nombre",
      "Correo",
      "Rol",
      "Fecha de registro",
      "Estado",
    ];

    const filas = usuariosFiltrados.map(
      (usuario) => [
        usuario.id,
        usuario.nombre,
        usuario.correo,
        usuario.rol,
        usuario.fechaRegistro,
        usuario.activo
          ? "Activo"
          : "Inactivo",
      ]
    );

    const contenido = [
      encabezados,
      ...filas,
    ]
      .map((fila) =>
        fila
          .map((dato) => `"${dato}"`)
          .join(",")
      )
      .join("\n");

    const archivo = new Blob(
      ["\uFEFF" + contenido],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement("a");

    enlace.href = url;
    enlace.download = "usuarios-solitech.csv";

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    URL.revokeObjectURL(url);
  };

  const cerrarMenus = () => {
    setMostrarNotificaciones(false);
    setMostrarPerfil(false);
    setMenuUsuario(null);
  };

  return (
    <div className="layout">
      <AdminNavbar />

      <main
        className="usuarios-container"
        onClick={cerrarMenus}
      >
        <header className="usuarios-topbar">
          <div className="usuarios-breadcrumb">
            <span>SoliTech</span>
            <b>›</b>
            <span>Administración</span>
            <b>›</b>
            <strong>Gestión de Usuarios</strong>
          </div>

          <div className="usuarios-top-actions">
            <div className="usuarios-top-search">
              <Search size={15} />

              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(evento) => {
                  setBusqueda(evento.target.value);
                  setPaginaActual(1);
                }}
              />
            </div>

            <div className="usuarios-notification-wrapper">
              <button
                type="button"
                className="usuarios-notification-btn"
                onClick={(evento) => {
                  evento.stopPropagation();

                  setMostrarNotificaciones(
                    (actual) => !actual
                  );

                  setMostrarPerfil(false);
                  setMenuUsuario(null);
                }}
                aria-label="Abrir notificaciones"
              >
                <Bell size={19} />
                <span>2</span>
              </button>

              {mostrarNotificaciones && (
                <div
                  className="usuarios-notifications-menu"
                  onClick={(evento) =>
                    evento.stopPropagation()
                  }
                >
                  <div className="usuarios-menu-title">
                    <h3>Notificaciones</h3>

                    <button
                      type="button"
                      onClick={() =>
                        setMostrarNotificaciones(false)
                      }
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="usuarios-notification-item">
                    <span className="notification-green"></span>

                    <div>
                      <strong>Nuevo usuario</strong>
                      <p>
                        Se registró una nueva cuenta.
                      </p>
                    </div>
                  </div>

                  <div className="usuarios-notification-item">
                    <span className="notification-orange"></span>

                    <div>
                      <strong>Cuenta inactiva</strong>
                      <p>
                        Hay una cuenta que requiere revisión.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="usuarios-profile-wrapper">
              <button
                type="button"
                className="usuarios-profile-btn"
                onClick={(evento) => {
                  evento.stopPropagation();

                  setMostrarPerfil(
                    (actual) => !actual
                  );

                  setMostrarNotificaciones(false);
                  setMenuUsuario(null);
                }}
              >
                <span className="usuarios-admin-avatar">
                  AR
                </span>

                <span className="usuarios-admin-info">
                  <strong>Alex Rivera</strong>
                  <small>Administrador</small>
                </span>

                <ChevronDown size={15} />
              </button>

              {mostrarPerfil && (
                <div
                  className="usuarios-profile-menu"
                  onClick={(evento) =>
                    evento.stopPropagation()
                  }
                >
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/perfil")
                    }
                  >
                    <User size={15} />
                    Mi perfil
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/configuracion")
                    }
                  >
                    <Settings size={15} />
                    Configuración
                  </button>

                  <button
                    type="button"
                    className="logout"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                    }}
                  >
                    <LogOut size={15} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="usuarios-content">
          <div className="usuarios-heading">
            <div>
              <h1>Gestión de Usuarios</h1>

              <p>
                Administra los permisos y accesos de los
                usuarios del sistema SoliTech.
              </p>
            </div>

            <div className="usuarios-heading-buttons">
              <button
                type="button"
                className="usuarios-export-btn"
                onClick={exportarUsuarios}
              >
                <Download size={16} />
                Exportar
              </button>

              <button
                type="button"
                className="usuarios-new-btn"
                onClick={abrirNuevoUsuario}
              >
                <Plus size={17} />
                Nuevo Usuario
              </button>
            </div>
          </div>

          <section className="usuarios-filter-panel">
            <div className="usuarios-main-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Buscar por nombre o correo..."
                value={busqueda}
                onChange={(evento) => {
                  setBusqueda(evento.target.value);
                  setPaginaActual(1);
                }}
              />
            </div>

            <div className="usuarios-role-filter">
              <label htmlFor="rol">
                Filtrar por Rol:
              </label>

              <select
                id="rol"
                value={rolSeleccionado}
                onChange={(evento) => {
                  setRolSeleccionado(
                    evento.target.value as
                      | "Todos"
                      | RolUsuario
                  );

                  setPaginaActual(1);
                }}
              >
                <option value="Todos">
                  Todos los roles
                </option>

                <option value="Administrador">
                  Administrador
                </option>

                <option value="Técnico">
                  Técnico
                </option>

                <option value="Usuario">
                  Usuario
                </option>
              </select>
            </div>

            <div className="usuarios-count">
              <Users size={17} />

              <span>
                Mostrando {usuariosFiltrados.length} usuarios
              </span>
            </div>
          </section>

          <section className="usuarios-management-table-card">
            <div className="usuarios-table-scroll">
              <table className="usuarios-management-table">
                <thead>
                  <tr>
                    <th>Nombre completo</th>
                    <th>Correo electrónico</th>
                    <th>Rol</th>
                    <th>Fecha de registro</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {usuariosPagina.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>
                        <div className="usuarios-table-name">
                          <span className="usuarios-table-avatar">
                            {obtenerIniciales(
                              usuario.nombre
                            )}
                          </span>

                          <div>
                            <strong>
                              {usuario.nombre}
                            </strong>

                            <small>
                              USR-
                              {String(
                                usuario.id
                              ).padStart(3, "0")}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td className="usuarios-table-email">
                        {usuario.correo}
                      </td>

                      <td>
                        <span
                          className={`usuarios-table-role ${obtenerClaseRol(
                            usuario.rol
                          )}`}
                        >
                          {obtenerIconoRol(usuario.rol)}

                          {usuario.rol ===
                          "Administrador"
                            ? "Admin"
                            : usuario.rol}
                        </span>
                      </td>

                      <td className="usuarios-table-date">
                        {usuario.fechaRegistro}
                      </td>

                      <td>
                        <div className="usuarios-table-status">
                          <button
                            type="button"
                            className={`usuarios-status-switch ${
                              usuario.activo
                                ? "active"
                                : ""
                            }`}
                            onClick={(evento) => {
                              evento.stopPropagation();

                              cambiarEstadoUsuario(
                                usuario.id
                              );
                            }}
                            aria-label={
                              usuario.activo
                                ? "Desactivar usuario"
                                : "Activar usuario"
                            }
                          >
                            <span></span>
                          </button>

                          <strong
                            className={
                              usuario.activo
                                ? "usuarios-status-active"
                                : "usuarios-status-inactive"
                            }
                          >
                            {usuario.activo
                              ? "ACTIVO"
                              : "INACTIVO"}
                          </strong>
                        </div>
                      </td>

                      <td>
                        <div className="usuarios-table-actions">
                          <button
                            type="button"
                            className="usuarios-more-button"
                            onClick={(evento) => {
                              evento.stopPropagation();

                              setMenuUsuario(
                                menuUsuario === usuario.id
                                  ? null
                                  : usuario.id
                              );

                              setMostrarNotificaciones(
                                false
                              );

                              setMostrarPerfil(false);
                            }}
                            aria-label="Abrir acciones"
                          >
                            <MoreVertical size={17} />
                          </button>

                          {menuUsuario === usuario.id && (
                            <div
                              className="usuarios-actions-menu"
                              onClick={(evento) =>
                                evento.stopPropagation()
                              }
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  abrirEditarUsuario(
                                    usuario
                                  )
                                }
                              >
                                Editar usuario
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  cambiarEstadoUsuario(
                                    usuario.id
                                  );

                                  setMenuUsuario(null);
                                }}
                              >
                                {usuario.activo
                                  ? "Desactivar cuenta"
                                  : "Activar cuenta"}
                              </button>

                              <button
                                type="button"
                                className="usuarios-delete-option"
                                onClick={() =>
                                  eliminarUsuario(usuario)
                                }
                              >
                                Eliminar usuario
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {usuariosPagina.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="usuarios-table-empty"
                      >
                        No se encontraron usuarios.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <footer className="usuarios-management-footer">
              <p>
                Página {paginaActual} de {totalPaginas}
              </p>

              <div className="usuarios-table-pagination">
                <button
                  type="button"
                  disabled={paginaActual === 1}
                  onClick={() =>
                    setPaginaActual((pagina) =>
                      Math.max(1, pagina - 1)
                    )
                  }
                >
                  <ChevronLeft size={15} />
                  Anterior
                </button>

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
                  Siguiente
                  <ChevronRight size={15} />
                </button>
              </div>
            </footer>
          </section>

          <section className="usuarios-summary-cards">
            <article className="usuarios-summary-item summary-active">
              <span className="usuarios-summary-icon">
                <CheckCircle2 size={19} />
              </span>

              <div>
                <p>Usuarios Activos</p>
                <h2>{usuariosActivos}</h2>
              </div>
            </article>

            <article className="usuarios-summary-item summary-admin">
              <span className="usuarios-summary-icon">
                <ShieldCheck size={19} />
              </span>

              <div>
                <p>Administradores</p>
                <h2>{administradores}</h2>
              </div>
            </article>

            <article className="usuarios-summary-item summary-inactive">
              <span className="usuarios-summary-icon">
                <CircleX size={19} />
              </span>

              <div>
                <p>Cuentas Inactivas</p>
                <h2>{cuentasInactivas}</h2>
              </div>
            </article>
          </section>
        </section>

        <footer className="usuarios-system-footer">
          © 2026 SoliTech Admin · Panel de Gestión de
          Identidades · Soporte: ayuda@solitech.com
        </footer>
      </main>

      {mostrarModal && (
        <div
          className="usuarios-modal-overlay"
          onClick={cerrarModal}
        >
          <form
            className="usuarios-modal"
            onSubmit={guardarUsuario}
            onClick={(evento) =>
              evento.stopPropagation()
            }
          >
            <div className="usuarios-modal-header">
              <div>
                <h2>
                  {usuarioEditando
                    ? "Editar Usuario"
                    : "Nuevo Usuario"}
                </h2>

                <p>
                  {usuarioEditando
                    ? "Modifica la información de la cuenta."
                    : "Registra una nueva cuenta en SoliTech."}
                </p>
              </div>

              <button
                type="button"
                onClick={cerrarModal}
              >
                <X size={18} />
              </button>
            </div>

            <div className="usuarios-modal-body">
              <div className="usuarios-form-group">
                <label htmlFor="nombre">
                  Nombre completo
                </label>

                <input
                  id="nombre"
                  type="text"
                  placeholder="Ej. Andrea López"
                  value={nombreNuevo}
                  onChange={(evento) =>
                    setNombreNuevo(
                      evento.target.value
                    )
                  }
                  required
                />
              </div>

              <div className="usuarios-form-group">
                <label htmlFor="correo">
                  Correo electrónico
                </label>

                <input
                  id="correo"
                  type="email"
                  placeholder="usuario@solitech.com"
                  value={correoNuevo}
                  onChange={(evento) =>
                    setCorreoNuevo(
                      evento.target.value
                    )
                  }
                  required
                />
              </div>

              <div className="usuarios-form-group">
                <label htmlFor="nuevo-rol">
                  Rol
                </label>

                <select
                  id="nuevo-rol"
                  value={rolNuevo}
                  onChange={(evento) =>
                    setRolNuevo(
                      evento.target
                        .value as RolUsuario
                    )
                  }
                >
                  <option value="Administrador">
                    Administrador
                  </option>

                  <option value="Técnico">
                    Técnico
                  </option>

                  <option value="Usuario">
                    Usuario
                  </option>
                </select>
              </div>

              <div className="usuarios-form-group">
                <label htmlFor="fecha-registro">
                  Fecha de registro
                </label>

                <input
                  id="fecha-registro"
                  type="text"
                  value={fechaNuevo}
                  onChange={(evento) =>
                    setFechaNuevo(
                      evento.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="usuarios-modal-footer">
              <button
                type="button"
                className="usuarios-cancel-modal"
                onClick={cerrarModal}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="usuarios-save-modal"
              >
                {usuarioEditando ? (
                  <>
                    <Settings size={16} />
                    Guardar cambios
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Crear usuario
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Usuarios;