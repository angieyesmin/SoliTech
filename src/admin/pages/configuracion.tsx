import AdminNavbar from "../components/AdminNavbar";
import "../css/configuracion.css";
import {
  Bell,
  Globe,
  Save,
  Shield,
  Eye,
  Database,
  Wifi,
  HardDrive,
  Clock,
  Archive,
  RefreshCw,
  Trash2,
} from "lucide-react";

function Configuracion() {
  return (
    <div className="layout">
      <AdminNavbar />

      <main className="config-container">
        <header className="config-header">
          <div>
            <h1>Configuración</h1>
            <p>Viernes, 27 de junio de 2026 · Parámetros del sistema</p>
          </div>

          <div className="config-user">
            <Bell size={20} />
            <span className="notification-dot"></span>
            <div className="config-avatar">AD</div>
          </div>
        </header>

        <section className="config-content">

          {/* CONFIGURACIÓN GENERAL */}
          <div className="config-card">
            <div className="config-card-header">
              <div className="config-icon">
                <Globe size={22} />
              </div>

              <div>
                <h2>Configuración General</h2>
                <p>Nombre del sistema, región e idioma</p>
              </div>
            </div>

            <div className="config-body">
              <div className="form-group">
                <div className="label-row">
                  <label>Nombre del sistema</label>
                  <span>Visible en la interfaz y notificaciones</span>
                </div>

                <input
                  type="text"
                  value="SoliTech — Sistema de Gestión Institucional"
                  readOnly
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Zona horaria</label>
                  <select>
                    <option>Ciudad de México (GMT-6)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Idioma del sistema</label>
                  <select>
                    <option>Español</option>
                  </select>
                </div>
              </div>

              <div className="date-section">
                <div>
                  <label>Formato de fecha</label>

                  <div className="date-options">
                    <button className="date-active">DD/MM/YYYY</button>
                    <button>MM/DD/YYYY</button>
                    <button>YYYY-MM-DD</button>
                  </div>
                </div>

                <span>Afecta reportes y registros</span>
              </div>
            </div>

            <div className="config-footer">
              <span>Sin cambios pendientes</span>
              <button>
                <Save size={16} />
                Guardar cambios
              </button>
            </div>
          </div>

          {/* NOTIFICACIONES */}
          <div className="config-card">
            <div className="config-card-header">
              <div className="config-icon bell-icon">
                <Bell size={22} />
              </div>

              <div>
                <h2>Notificaciones</h2>
                <p>Configura qué alertas recibir y por qué canal</p>
              </div>
            </div>

            <div className="config-body">
              <div className="settings-box">
                <div className="settings-title">CANALES</div>

                <div className="notification-row">
                  <div>
                    <h3>Alertas por correo electrónico</h3>
                    <p>Recibir notificaciones de tickets y reportes al email del administrador</p>
                  </div>

                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span></span>
                  </label>
                </div>

                <div className="notification-row">
                  <div>
                    <h3>Alertas del sistema</h3>
                    <p>Notificaciones en pantalla sobre eventos críticos del sistema</p>
                  </div>

                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span></span>
                  </label>
                </div>

                <div className="notification-row">
                  <div>
                    <h3>Notificaciones por SMS</h3>
                    <p>Enviar alertas urgentes al número registrado del administrador</p>
                  </div>

                  <label className="switch">
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
              </div>

              <div className="settings-box">
                <div className="settings-title">TIPOS DE EVENTO</div>

                <div className="notification-row">
                  <div>
                    <h3>Reporte semanal de actividad</h3>
                    <p>Resumen automático de tickets, equipos y técnicos cada lunes a las 7 AM</p>
                  </div>

                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span></span>
                  </label>
                </div>

                <div className="notification-row">
                  <div>
                    <h3>Alertas de mantenimiento</h3>
                    <p>Avisos cuando equipos estén próximos o vencidos en su mantenimiento</p>
                  </div>

                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span></span>
                  </label>
                </div>

                <div className="notification-row">
                  <div>
                    <h3>Notificaciones de baja prioridad</h3>
                    <p>Incluir tickets de prioridad baja en las notificaciones diarias</p>
                  </div>

                  <label className="switch">
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
              </div>

              <div className="form-group correo-destino">
                <div className="label-row">
                  <label>Correo de destino</label>
                  <span>Para alertas del sistema</span>
                </div>

                <input type="text" value="admin@institucion.edu.mx" readOnly />
              </div>
            </div>

            <div className="config-footer">
              <span>Sin cambios pendientes</span>
              <button>
                <Save size={16} />
                Guardar cambios
              </button>
            </div>
          </div>

          {/* SEGURIDAD */}
          <div className="config-card">
            <div className="config-card-header">
              <div className="config-icon security-icon">
                <Shield size={22} />
              </div>

              <div>
                <h2>Seguridad</h2>
                <p>Políticas de acceso y autenticación</p>
              </div>
            </div>

            <div className="config-body">
              <div className="security-grid">
                <div className="form-group">
                  <div className="label-row">
                    <label>Tiempo de sesión inactiva</label>
                    <span>En minutos</span>
                  </div>

                  <div className="input-unit">
                    <input type="text" value="30" readOnly />
                    <span>min</span>
                  </div>
                </div>

                <div className="form-group">
                  <div className="label-row">
                    <label>Máx. intentos de login</label>
                    <span>Antes de bloquear cuenta</span>
                  </div>

                  <div className="input-unit">
                    <input type="text" value="5" readOnly />
                    <span>intentos</span>
                  </div>
                </div>
              </div>

              <div className="security-box">
                <div className="notification-row">
                  <div>
                    <h3>Autenticación de dos factores (2FA)</h3>
                    <p>Solicitar código de verificación al iniciar sesión</p>
                  </div>

                  <label className="switch">
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>

                <div className="notification-row">
                  <div>
                    <h3>Cierre de sesión automático</h3>
                    <p>Cerrar sesión automáticamente al cumplirse el tiempo de inactividad</p>
                  </div>

                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span></span>
                  </label>
                </div>
              </div>

              <div className="form-group password-group">
                <label>Cambiar contraseña de administrador</label>

                <div className="password-input">
                  <input type="password" placeholder="Nueva contraseña" />
                  <Eye size={17} />
                </div>
              </div>

              <div className="security-alert">
                <span>ⓘ</span>
                <p>
                  Las cuentas bloqueadas por intentos fallidos pueden desbloquearse desde
                  la sección <b>Usuarios</b>. El tiempo de bloqueo predeterminado es 15 minutos.
                </p>
              </div>
            </div>

            <div className="config-footer">
              <span>Sin cambios pendientes</span>
              <button>
                <Save size={16} />
                Guardar cambios
              </button>
            </div>
          </div>

          {/* BASE DE DATOS */}
          <div className="config-card">
            <div className="config-card-header">
              <div className="config-icon database-icon">
                <Database size={22} />
              </div>

              <div>
                <h2>Base de Datos</h2>
                <p>Estado de conexión, respaldos y retención</p>
              </div>
            </div>

            <div className="config-body">
              <div className="db-status">
                <div className="db-left">
                  <Wifi size={18} />
                  <div>
                    <h3>Conexión activa</h3>
                    <p>PostgreSQL 15.4 · Host: db.solitech.internal · Puerto: 5432</p>
                  </div>
                </div>

                <div className="db-check">
                  <span></span>
                  <RefreshCw size={15} />
                  Verificar
                </div>
              </div>

              <div className="db-stats">
                <div className="db-stat-card">
                  <Clock size={16} />
                  <p>Último respaldo</p>
                  <h3>Hoy, 03:00 AM</h3>
                </div>

                <div className="db-stat-card">
                  <HardDrive size={16} />
                  <p>Tamaño del respaldo</p>
                  <h3>2.4 GB</h3>
                </div>

                <div className="db-stat-card">
                  <Archive size={16} />
                  <p>Respaldos guardados</p>
                  <h3>30 archivos</h3>
                </div>
              </div>

              <div className="db-auto">
                <div>
                  <h3>Respaldo automático</h3>
                  <p>Ejecutar respaldo automático según la frecuencia configurada</p>
                </div>

                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span></span>
                </label>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Frecuencia de respaldo</label>
                  <select>
                    <option>Diario (03:00 AM)</option>
                  </select>
                </div>

                <div className="form-group">
                  <div className="label-row">
                    <label>Retención de respaldos</label>
                    <span>En días</span>
                  </div>

                  <div className="input-unit">
                    <input type="text" value="30" readOnly />
                    <span>días</span>
                  </div>
                </div>
              </div>

              <div className="db-actions">
                <button className="backup-btn">
                  <Archive size={15} />
                  Generar respaldo ahora
                </button>

                <button className="history-btn">
                  <RefreshCw size={15} />
                  Ver historial de respaldos
                </button>

                <button className="clean-btn">
                  <Trash2 size={15} />
                  Limpiar respaldos antiguos
                </button>
              </div>
            </div>

            <div className="config-footer">
              <span>Sin cambios pendientes</span>
              <button>
                <Save size={16} />
                Guardar cambios
              </button>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}

export default Configuracion;