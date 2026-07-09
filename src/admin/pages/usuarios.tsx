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
} from "lucide-react";

function Usuarios() {
  const usuarios = [
    ["👩🏻", "María Ángela Torres", "m.torres@solitech.mx", "Admn. Técnico", "Activo", "Hoy, 10:15 AM"],
    ["👨🏼", "Rafael Pacheco", "r.pacheco@solitech.mx", "Técnico", "Activo", "26 jun 2026"],
    ["👩🏽", "Laura Gómez", "l.gomez@solitech.mx", "Usuario", "Inactivo", "15 jun 2026"],
    ["👨🏻", "Carlos Méndez", "c.mendez@solitech.mx", "Admn. General", "Activo", "14 jun 2026"],
    ["👩🏼", "Ana Villalobos", "a.villalobos@solitech.mx", "Usuario", "Activo", "12 jun 2026"],
  ];

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
            <button className="btn-exportar">
              <Briefcase size={17} />
              Exportar
            </button>

            <button className="btn-nuevo">
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
              </select>

              <select>
                <option>Estado</option>
              </select>

              <select>
                <option>Departamento</option>
              </select>

              <input type="text" placeholder="Buscar usuario..." />

              <button className="filter-btn">Filtrar</button>
              <button className="reset-btn">Restablecer</button>
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
                    <tr key={u[1]}>
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
                <p> - 5 de 120</p>
                <span>4</span>
                <span>3</span>
                <span>6</span>
                <button>Siguiente</button>
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

              <button>Configurar Roles</button>
            </div>

            <div className="side-card">
              <h3>Acciones Rápidas</h3>

              <button className="quick blue-btn">
                <KeyRound size={16} />
                Restablecer Contraseña
              </button>

              <button className="quick gray-btn">
                <Lock size={16} />
                Desactivar Usuario
              </button>

              <button className="quick red-btn">
                <Trash2 size={16} />
                Eliminar Usuario
              </button>
            </div>

            <div className="side-card">
              <h3>Actividad Reciente</h3>

              <p className="activity">● Nuevo usuario agregado: Luis Martínez</p>
              <p className="activity">● Rol modificado para Laura Gómez</p>
              <p className="activity">● Usuario desactivado: Manuel Díaz</p>

              <button>Ver historial completo</button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Usuarios;