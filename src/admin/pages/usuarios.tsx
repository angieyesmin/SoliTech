import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "../css/usuarios.css";
import {
  Briefcase,
  Plus,
  User,
  Shield,
  Users,
  Lock,
  Trash2,
  KeyRound,
  Settings,
  X,
} from "lucide-react";

function Usuarios() {
  const usuariosIniciales = [
    ["👩🏻", "María Ángela Torres", "m.torres@solitech.mx", "Admn. Técnico", "Activo", "Hoy, 10:15 AM"],
    ["👨🏼", "Rafael Pacheco", "r.pacheco@solitech.mx", "Técnico", "Activo", "26 jun 2026"],
    ["👩🏽", "Laura Gómez", "l.gomez@solitech.mx", "Usuario", "Inactivo", "15 jun 2026"],
    ["👨🏻", "Carlos Méndez", "c.mendez@solitech.mx", "Admn. General", "Activo", "14 jun 2026"],
    ["👩🏼", "Ana Villalobos", "a.villalobos@solitech.mx", "Usuario", "Activo", "12 jun 2026"],
  ];

  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [modal, setModal] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(usuariosIniciales[0]);

  const exportarCSV = () => {
    const encabezado = "Nombre,Correo,Rol,Estado,Último Acceso\n";
    const filas = usuarios.map((u) => `"${u[1]}","${u[2]}","${u[3]}","${u[4]}","${u[5]}"`).join("\n");
    const blob = new Blob([encabezado + filas], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "usuarios.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const filtrarUsuarios = () => {
    const texto = busqueda.toLowerCase();

    setUsuarios(
      usuariosIniciales.filter(
        (u) =>
          u[1].toLowerCase().includes(texto) ||
          u[2].toLowerCase().includes(texto) ||
          u[3].toLowerCase().includes(texto)
      )
    );
  };

  const restablecer = () => {
    setBusqueda("");
    setUsuarios(usuariosIniciales);
  };

  return (
    <div className="layout">
      <AdminNavbar />

      <main className="gestion-container">
        <header className="gestion-header">
          <div className="gestion-title">
            <h1>Gestión de Usuarios</h1>
            <p>Viernes, 27 de junio de 2026 — Semana 26</p>
          </div>

          <div className="gestion-actions">
            <button className="btn-exportar" onClick={exportarCSV}>
              <Briefcase size={17} />
              Exportar
            </button>

            <button className="btn-nuevo" onClick={() => setModal("nuevo")}>
              <Plus size={18} />
              Nuevo Usuario
            </button>

            <div className="admin-box">
              <div className="admin-avatar">
                <User size={17} />
              </div>
              <span>Admin</span>
            </div>
          </div>
        </header>

        <section className="usuarios-content">
          <div className="usuarios-main">
            <div className="stats-users">
              <div className="stat-user blue">
                <h2>120</h2>
                <p>Usuarios Totales</p>
                <span>Registro administración</span>
              </div>

              <div className="stat-user green">
                <h2>15</h2>
                <p>Administradores</p>
                <span>Rol usuarios</span>
              </div>

              <div className="stat-user red">
                <h2>85</h2>
                <p>Activos</p>
              </div>

              <div className="stat-user purple">
                <h2>20</h2>
                <p>Inactivos</p>
              </div>
            </div>

            <div className="filters">
              <select>
                <option>Rol</option>
                <option>Admn. Técnico</option>
                <option>Técnico</option>
                <option>Usuario</option>
              </select>

              <select>
                <option>Estado</option>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>

              <select>
                <option>Departamento</option>
                <option>Sistemas</option>
                <option>Mantenimiento</option>
                <option>Administración</option>
              </select>

              <input
                type="text"
                placeholder="Buscar usuario..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <button className="filter-btn" onClick={filtrarUsuarios}>
                Filtrar
              </button>

              <button className="reset-btn" onClick={restablecer}>
                Restablecer
              </button>
            </div>

            <div className="users-table-card">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Último Access</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((u) => (
                    <tr
                      key={u[1]}
                      onClick={() => setUsuarioSeleccionado(u)}
                      className={usuarioSeleccionado[1] === u[1] ? "selected-row" : ""}
                    >
                      <td className="user-name">
                        <span className="photo">{u[0]}</span>
                        {u[1]}
                      </td>
                      <td>{u[2]}</td>
                      <td>{u[3]}</td>
                      <td>
                        <span className={u[4] === "Activo" ? "activo" : "inactivo"}>
                          {u[4]}
                        </span>
                      </td>
                      <td>{u[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                <span>‹</span>
                <b>1</b>
                <p> - {usuarios.length} de 120</p>
                <span>4</span>
                <span>3</span>
                <span>6</span>
                <button onClick={() => alert("Mostrando la siguiente página")}>
                  Siguiente
                </button>
              </div>
            </div>

            <div className="roles-bottom">
              <h3>Roles del sistema</h3>

              <div className="role-row">
                <Settings size={22} />
                <b>Administrador Técnicos</b>
                <span className="pill green-pill">Personalizados</span>
                <span className="pill yellow-pill">Activo</span>
                <span className="pill red-pill">Activa</span>
              </div>

              <div className="role-row">
                <Users size={22} />
                <b>Administrador General</b>
                <span className="pill green-pill">Activos</span>
                <span className="pill green-pill">Activa</span>
                <span className="pill blue-pill">Histórico</span>
              </div>
            </div>
          </div>

          <aside className="usuarios-sidebar">
            <div className="side-card">
              <h3>Roles del Sistema</h3>

              <div className="side-role">
                <Shield size={18} />
                Administrador Técnico (8)
              </div>

              <div className="side-role">
                <User size={18} />
                Administrador General (7)
              </div>

              <div className="side-role">
                <Users size={18} />
                Usuario Estándar (105)
              </div>

              <button onClick={() => setModal("roles")}>Configurar Roles</button>
            </div>

            <div className="side-card">
              <h3>Acciones Rápidas</h3>

              <button className="quick blue-btn" onClick={() => setModal("password")}>
                <KeyRound size={16} />
                Restablecer Contraseña
              </button>

              <button className="quick gray-btn" onClick={() => setModal("desactivar")}>
                <Lock size={16} />
                Desactivar Usuario
              </button>

              <button className="quick red-btn" onClick={() => setModal("eliminar")}>
                <Trash2 size={16} />
                Eliminar Usuario
              </button>
            </div>

            <div className="side-card">
              <h3>Actividad Reciente</h3>

              <p className="activity">● Nuevo usuario agregado: Luis Martínez</p>
              <p className="activity">● Rol modificado para Laura Gómez</p>
              <p className="activity">● Usuario desactivado: Manuel Díaz</p>

              <button onClick={() => setModal("historial")}>
                Ver historial completo
              </button>
            </div>
          </aside>
        </section>
      </main>

      {modal && (
        <div className="modal-overlay">
          <div className="user-modal">
            <div className="modal-header">
              <h2>
                {modal === "nuevo" && "Nuevo Usuario"}
                {modal === "roles" && "Configurar Roles"}
                {modal === "password" && "Restablecer Contraseña"}
                {modal === "desactivar" && "Desactivar Usuario"}
                {modal === "eliminar" && "Eliminar Usuario"}
                {modal === "historial" && "Historial de Actividad"}
              </h2>

              <button onClick={() => setModal("")}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {modal === "nuevo" && (
                <>
                  <label>Nombre completo</label>
                  <input type="text" placeholder="Ej. Luis Martínez" />

                  <label>Correo electrónico</label>
                  <input type="email" placeholder="correo@solitech.mx" />

                  <label>Rol</label>
                  <select>
                    <option>Usuario</option>
                    <option>Técnico</option>
                    <option>Admn. Técnico</option>
                    <option>Admn. General</option>
                  </select>
                </>
              )}

              {modal !== "nuevo" && modal !== "historial" && (
                <p>
                  Usuario seleccionado: <b>{usuarioSeleccionado[1]}</b>
                </p>
              )}

              {modal === "roles" && (
                <p>Desde aquí puedes modificar permisos y roles del sistema.</p>
              )}

              {modal === "password" && (
                <p>Se enviará un enlace para restablecer la contraseña al correo del usuario.</p>
              )}

              {modal === "desactivar" && (
                <p>El usuario quedará inactivo y no podrá acceder al sistema.</p>
              )}

              {modal === "eliminar" && (
                <p>Esta acción eliminará el usuario seleccionado del sistema.</p>
              )}

              {modal === "historial" && (
                <>
                  <p>● Luis Martínez fue agregado hoy.</p>
                  <p>● Laura Gómez cambió de rol.</p>
                  <p>● Manuel Díaz fue desactivado.</p>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setModal("")}>
                Cancelar
              </button>

              <button
                className="save-btn"
                onClick={() => {
                  alert("Acción realizada correctamente");
                  setModal("");
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Usuarios;