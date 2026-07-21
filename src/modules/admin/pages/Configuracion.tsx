import {
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";

import AdminNavbar from "../components/AdminNavbar";
import "../css/Configuracion.css";

import {
  Bell,
  Check,
  ChevronDown,
  Clock3,
  Globe2,
  Image as ImageIcon,
  Info,
  LogOut,
  Mail,
  RefreshCw,
  RotateCcw,
  Save,
  Settings,
  ShieldCheck,
  Upload,
  User,
  Users,
  X,
} from "lucide-react";

/* =====================================================
   TIPOS
===================================================== */

type SeccionConfiguracion =
  | "general"
  | "notificaciones"
  | "prioridades"
  | "roles";

type FormatoFecha =
  | "DD/MM/YYYY"
  | "MM/DD/YYYY"
  | "YY-MM-DD";

type ConfiguracionGeneral = {
  institucion: string;
  siglas: string;
  correoAdministrador: string;
  zonaHoraria: string;
  idioma: string;
  formatoFecha: FormatoFecha;
};

type CanalesNotificacion = {
  nuevoTicket: boolean;
  ticketAsignado: boolean;
  ticketResuelto: boolean;
  mantenimientoProximo: boolean;
  reporteSemanal: boolean;
  sms: boolean;
  ticketsBajaPrioridad: boolean;
};

type PrioridadesSLA = {
  alta: string;
  media: string;
  baja: string;
  escalacionAlta: string;
};

type PermisosRol = {
  administrador: boolean;
  tecnico: boolean;
  usuario: boolean;
};

/* =====================================================
   VALORES INICIALES
===================================================== */

const configuracionInicial: ConfiguracionGeneral = {
  institucion: "Universidad Tecnológica Nacional",
  siglas: "UTN",
  correoAdministrador: "admin@utn.edu.mx",
  zonaHoraria: "CDMX (GMT-6)",
  idioma: "Español",
  formatoFecha: "DD/MM/YYYY",
};

const notificacionesIniciales: CanalesNotificacion = {
  nuevoTicket: true,
  ticketAsignado: true,
  ticketResuelto: true,
  mantenimientoProximo: true,
  reporteSemanal: true,
  sms: false,
  ticketsBajaPrioridad: false,
};

const prioridadesIniciales: PrioridadesSLA = {
  alta: "24",
  media: "48",
  baja: "72",
  escalacionAlta: "8",
};

const permisosIniciales: PermisosRol = {
  administrador: true,
  tecnico: true,
  usuario: true,
};

/* =====================================================
   COMPONENTE
===================================================== */

function Configuracion() {
  const navigate = useNavigate();

  const archivoLogoRef =
    useRef<HTMLInputElement | null>(null);

  const [seccionActiva, setSeccionActiva] =
    useState<SeccionConfiguracion>("general");

  const [configuracion, setConfiguracion] =
    useState<ConfiguracionGeneral>(
      configuracionInicial
    );

  const [notificaciones, setNotificaciones] =
    useState<CanalesNotificacion>(
      notificacionesIniciales
    );

  const [prioridades, setPrioridades] =
    useState<PrioridadesSLA>(
      prioridadesIniciales
    );

  const [permisos, setPermisos] =
    useState<PermisosRol>(permisosIniciales);

  const [logo, setLogo] =
    useState<string | null>(null);

  const [
    mostrarNotificacionesHeader,
    setMostrarNotificacionesHeader,
  ] = useState(false);

  const [mostrarPerfil, setMostrarPerfil] =
    useState(false);

  const [
    notificacionesHeaderLeidas,
    setNotificacionesHeaderLeidas,
  ] = useState(false);

  const [mensajeGuardado, setMensajeGuardado] =
    useState("Sin cambios pendientes");

  /* =====================================================
     FUNCIONES GENERALES
  ===================================================== */

  const actualizarConfiguracion = () => {
    window.location.reload();
  };

  const cerrarMenusHeader = () => {
    setMostrarNotificacionesHeader(false);
    setMostrarPerfil(false);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("recordarSesion");
    localStorage.removeItem("token");

    setMostrarPerfil(false);
    navigate("/login");
  };

  const marcarCambiosPendientes = () => {
    setMensajeGuardado("Cambios sin guardar");
  };

  const cambiarCampoGeneral = (
    evento:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = evento.target;

    setConfiguracion((configuracionActual) => ({
      ...configuracionActual,
      [name]: value,
    }));

    marcarCambiosPendientes();
  };

  const cambiarFormatoFecha = (
    formato: FormatoFecha
  ) => {
    setConfiguracion((configuracionActual) => ({
      ...configuracionActual,
      formatoFecha: formato,
    }));

    marcarCambiosPendientes();
  };

  const cargarLogo = (
    evento: ChangeEvent<HTMLInputElement>
  ) => {
    const archivo = evento.target.files?.[0];

    if (!archivo) {
      return;
    }

    const formatosPermitidos = [
      "image/png",
      "image/jpeg",
      "image/svg+xml",
      "image/webp",
    ];

    if (!formatosPermitidos.includes(archivo.type)) {
      alert(
        "Selecciona una imagen PNG, JPG, SVG o WEBP."
      );

      evento.target.value = "";
      return;
    }

    if (archivo.size > 2 * 1024 * 1024) {
      alert(
        "El archivo no puede superar los 2 MB."
      );

      evento.target.value = "";
      return;
    }

    const lector = new FileReader();

    lector.onload = () => {
      setLogo(lector.result as string);
      marcarCambiosPendientes();
    };

    lector.onerror = () => {
      alert("No se pudo leer la imagen.");
    };

    lector.readAsDataURL(archivo);
  };

  const eliminarLogo = () => {
    setLogo(null);

    if (archivoLogoRef.current) {
      archivoLogoRef.current.value = "";
    }

    marcarCambiosPendientes();
  };

  /* =====================================================
     NOTIFICACIONES
  ===================================================== */

  const cambiarNotificacion = (
    campo: keyof CanalesNotificacion
  ) => {
    setNotificaciones((estadoActual) => ({
      ...estadoActual,
      [campo]: !estadoActual[campo],
    }));

    marcarCambiosPendientes();
  };

  /* =====================================================
     PRIORIDADES
  ===================================================== */

  const cambiarPrioridad = (
    evento: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evento.target;

    if (
      value !== "" &&
      (!/^\d+$/.test(value) ||
        Number(value) < 1 ||
        Number(value) > 999)
    ) {
      return;
    }

    setPrioridades((prioridadesActuales) => ({
      ...prioridadesActuales,
      [name]: value,
    }));

    marcarCambiosPendientes();
  };

  const obtenerPorcentaje = (
    valor: string,
    maximo: number
  ) => {
    const numero = Number(valor);

    if (!numero || numero < 0) {
      return 0;
    }

    return Math.min(
      (numero / maximo) * 100,
      100
    );
  };

  /* =====================================================
     ROLES Y PERMISOS
  ===================================================== */

  const cambiarPermiso = (
    campo: keyof PermisosRol
  ) => {
    setPermisos((permisosActuales) => ({
      ...permisosActuales,
      [campo]: !permisosActuales[campo],
    }));

    marcarCambiosPendientes();
  };

  /* =====================================================
     GUARDAR
  ===================================================== */

  const guardarCambios = () => {
    if (!configuracion.institucion.trim()) {
      alert(
        "Escribe el nombre de la institución."
      );
      return;
    }

    if (!configuracion.siglas.trim()) {
      alert(
        "Escribe las siglas de la institución."
      );
      return;
    }

    const correoValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        configuracion.correoAdministrador
      );

    if (!correoValido) {
      alert(
        "Escribe un correo de administrador válido."
      );
      return;
    }

    if (
      !prioridades.alta ||
      !prioridades.media ||
      !prioridades.baja ||
      !prioridades.escalacionAlta
    ) {
      alert(
        "Completa los tiempos de atención y el umbral de escalación."
      );
      return;
    }

    if (
      Number(prioridades.escalacionAlta) >=
      Number(prioridades.alta)
    ) {
      alert(
        "El umbral de escalación debe ser menor al tiempo máximo de prioridad alta."
      );
      return;
    }

    setMensajeGuardado(
      "Cambios guardados correctamente"
    );

    alert(
      "Configuración guardada correctamente."
    );
  };

  /* =====================================================
     RESTABLECER
  ===================================================== */

  const restablecerConfiguracion = () => {
    const confirmar = window.confirm(
      "¿Deseas restablecer toda la configuración?"
    );

    if (!confirmar) {
      return;
    }

    setConfiguracion(configuracionInicial);
    setNotificaciones(notificacionesIniciales);
    setPrioridades(prioridadesIniciales);
    setPermisos(permisosIniciales);
    setLogo(null);

    if (archivoLogoRef.current) {
      archivoLogoRef.current.value = "";
    }

    setMensajeGuardado(
      "Configuración restablecida"
    );
  };

  /* =====================================================
     SECCIÓN GENERAL
  ===================================================== */

  const renderizarGeneral = () => (
    <>
      <div className="config-section-heading">
        <span className="config-section-heading-icon">
          <Globe2 size={20} />
        </span>

        <div>
          <h2>General</h2>

          <p>
            Nombre, logo y configuración regional
          </p>
        </div>
      </div>

      <section className="system-config-card">
        <div className="system-card-title">
          <Globe2 size={17} />

          <h3>Identidad institucional</h3>
        </div>

        <div className="system-form-group">
          <label htmlFor="institucion">
            Nombre de la institución
          </label>

          <input
            id="institucion"
            name="institucion"
            type="text"
            value={configuracion.institucion}
            onChange={cambiarCampoGeneral}
          />
        </div>

        <div className="system-form-grid">
          <div className="system-form-group">
            <div className="system-label-row">
              <label htmlFor="siglas">
                Nombre corto / Siglas
              </label>

              <span>Aparece en reportes</span>
            </div>

            <input
              id="siglas"
              name="siglas"
              type="text"
              maxLength={12}
              value={configuracion.siglas}
              onChange={cambiarCampoGeneral}
            />
          </div>

          <div className="system-form-group">
            <div className="system-label-row">
              <label htmlFor="correoAdministrador">
                Correo administrador
              </label>

              <span>
                Para notificaciones del sistema
              </span>
            </div>

            <input
              id="correoAdministrador"
              name="correoAdministrador"
              type="email"
              value={
                configuracion.correoAdministrador
              }
              onChange={cambiarCampoGeneral}
            />
          </div>
        </div>
      </section>

      <section className="system-config-card">
        <div className="system-card-title">
          <ImageIcon size={17} />

          <h3>Logotipo institucional</h3>
        </div>

        <div className="system-logo-area">
          <div className="system-logo-preview">
            {logo ? (
              <img
                src={logo}
                alt="Vista previa del logotipo"
              />
            ) : (
              <ImageIcon size={28} />
            )}
          </div>

          <button
            type="button"
            className="system-upload-area"
            onClick={() =>
              archivoLogoRef.current?.click()
            }
          >
            <Upload size={19} />

            <strong>
              Arrastra tu logo o haz clic para
              seleccionar
            </strong>

            <span>
              PNG, JPG, SVG o WEBP · Máx. 2 MB
            </span>
          </button>

          <input
            ref={archivoLogoRef}
            type="file"
            accept=".png,.jpg,.jpeg,.svg,.webp"
            onChange={cargarLogo}
            hidden
          />
        </div>

        {logo && (
          <button
            type="button"
            className="system-remove-logo-button"
            onClick={eliminarLogo}
          >
            <X size={15} />
            Eliminar logotipo
          </button>
        )}
      </section>

      <section className="system-config-card">
        <div className="system-card-title">
          <Globe2 size={17} />

          <h3>Región e idioma</h3>
        </div>

        <div className="system-region-grid">
          <div className="system-form-group">
            <label htmlFor="zonaHoraria">
              Zona horaria
            </label>

            <select
              id="zonaHoraria"
              name="zonaHoraria"
              value={configuracion.zonaHoraria}
              onChange={cambiarCampoGeneral}
            >
              <option value="CDMX (GMT-6)">
                CDMX (GMT-6)
              </option>

              <option value="Cancún (GMT-5)">
                Cancún (GMT-5)
              </option>

              <option value="Tijuana (GMT-8)">
                Tijuana (GMT-8)
              </option>

              <option value="UTC">
                UTC
              </option>
            </select>
          </div>

          <div className="system-form-group">
            <label htmlFor="idioma">
              Idioma del sistema
            </label>

            <select
              id="idioma"
              name="idioma"
              value={configuracion.idioma}
              onChange={cambiarCampoGeneral}
            >
              <option value="Español">
                Español
              </option>

              <option value="Inglés">
                Inglés
              </option>
            </select>
          </div>

          <div className="system-date-format">
            <div className="system-label-row">
              <label>Formato de fecha</label>

              <span>En reportes</span>
            </div>

            <div className="system-date-buttons">
              {(
                [
                  "DD/MM/YYYY",
                  "MM/DD/YYYY",
                  "YY-MM-DD",
                ] as FormatoFecha[]
              ).map((formato) => (
                <button
                  type="button"
                  key={formato}
                  className={
                    configuracion.formatoFecha ===
                    formato
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    cambiarFormatoFecha(formato)
                  }
                >
                  {formato}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );

  /* =====================================================
     SECCIÓN NOTIFICACIONES
  ===================================================== */

  const renderizarNotificaciones = () => {
    const interruptor = (
      campo: keyof CanalesNotificacion,
      etiqueta: string
    ) => (
      <button
        type="button"
        className={`notification-setting-switch ${
          notificaciones[campo] ? "active" : ""
        }`}
        onClick={() => cambiarNotificacion(campo)}
        role="switch"
        aria-checked={notificaciones[campo]}
        aria-label={etiqueta}
      >
        <span></span>
      </button>
    );

    return (
      <>
        <div className="config-section-heading notification-page-heading">
          <span className="config-section-heading-icon notification-heading-icon">
            <Mail size={20} />
          </span>

          <div>
            <h2>Notificaciones</h2>

            <p>
              Gestiona qué alertas enviar y cuándo
            </p>
          </div>
        </div>

        <div className="notification-info-banner">
          <Info size={16} />

          <p>
            Los correos se envían al administrador
            registrado en la sección{" "}
            <button
              type="button"
              onClick={() =>
                setSeccionActiva("general")
              }
            >
              General
            </button>
            . Asegúrate de que el servidor SMTP esté
            configurado correctamente antes de activar
            alertas.
          </p>
        </div>

        <section className="notification-settings-card">
          <header className="notification-card-header">
            EVENTOS DE TICKETS
          </header>

          <div className="notification-card-body">
            <div className="notification-setting-row">
              <div>
                <h3>Nuevo ticket creado</h3>

                <p>
                  Notificar al administrador cuando se
                  registre una nueva incidencia.
                </p>
              </div>

              {interruptor(
                "nuevoTicket",
                "Notificaciones de tickets nuevos"
              )}
            </div>

            <div className="notification-setting-row">
              <div>
                <h3>
                  Ticket asignado a técnico
                </h3>

                <p>
                  Alerta cuando un ticket es asignado o
                  reasignado.
                </p>
              </div>

              {interruptor(
                "ticketAsignado",
                "Notificaciones de tickets asignados"
              )}
            </div>

            <div className="notification-setting-row">
              <div>
                <h3>
                  Ticket marcado como resuelto
                </h3>

                <p>
                  Confirmación cuando un técnico cierra
                  una incidencia.
                </p>
              </div>

              {interruptor(
                "ticketResuelto",
                "Notificaciones de tickets resueltos"
              )}
            </div>
          </div>
        </section>

        <section className="notification-settings-card">
          <header className="notification-card-header">
            MANTENIMIENTO Y EQUIPOS
          </header>

          <div className="notification-card-body">
            <div className="notification-setting-row">
              <div>
                <h3>
                  Alerta de mantenimiento próximo
                </h3>

                <p>
                  Aviso cuando un equipo esté a 7 días
                  o menos de su próximo mantenimiento.
                </p>
              </div>

              {interruptor(
                "mantenimientoProximo",
                "Alertas de mantenimiento próximo"
              )}
            </div>
          </div>
        </section>

        <section className="notification-settings-card">
          <header className="notification-card-header">
            REPORTES AUTOMÁTICOS
          </header>

          <div className="notification-card-body">
            <div className="notification-setting-row">
              <div>
                <h3>
                  Reporte semanal de actividad
                </h3>

                <p>
                  Resumen automático cada lunes a las
                  7 AM con métricas clave.
                </p>
              </div>

              {interruptor(
                "reporteSemanal",
                "Reporte semanal de actividad"
              )}
            </div>

            <div className="notification-setting-row">
              <div>
                <h3>Notificaciones por SMS</h3>

                <p>
                  Enviar alertas críticas al número del
                  administrador registrado.
                </p>
              </div>

              {interruptor(
                "sms",
                "Notificaciones por SMS"
              )}
            </div>

            <div className="notification-setting-row">
              <div>
                <h3>
                  Tickets de baja prioridad
                </h3>

                <p>
                  Incluir incidencias de prioridad baja
                  en los resúmenes diarios.
                </p>
              </div>

              {interruptor(
                "ticketsBajaPrioridad",
                "Tickets de baja prioridad"
              )}
            </div>
          </div>
        </section>
      </>
    );
  };

  /* =====================================================
     SECCIÓN PRIORIDADES Y SLA
  ===================================================== */

  const renderizarPrioridades = () => (
    <>
      <div className="config-section-heading priorities-page-heading">
        <span className="config-section-heading-icon priorities-heading-icon">
          <Clock3 size={20} />
        </span>

        <div>
          <h2>Prioridades y SLA</h2>

          <p>
            Define tiempos de respuesta por nivel de
            urgencia
          </p>
        </div>
      </div>

      <section className="sla-main-card">
        <div className="sla-main-header">
          <h3>
            Tiempo máximo de resolución por prioridad
          </h3>

          <p>
            Define el SLA (Service Level Agreement) en
            horas hábiles para cada nivel de prioridad.
          </p>
        </div>

        <div className="sla-priority-list">
          <article className="sla-priority-card priority-high">
            <div className="sla-priority-content">
              <div className="sla-priority-heading">
                <span className="sla-priority-label">
                  Prioridad Alta
                </span>

                <strong>
                  {prioridades.alta || "0"}h
                </strong>

                <small>máximo</small>
              </div>

              <p>
                Incidencias que afectan la operación
                inmediata del sistema o servicios
                críticos.
              </p>

              <div className="sla-progress-track">
                <span
                  style={{
                    width: `${obtenerPorcentaje(
                      prioridades.alta,
                      96
                    )}%`,
                  }}
                ></span>
              </div>
            </div>

            <label className="sla-hours-input">
              <input
                type="text"
                name="alta"
                inputMode="numeric"
                maxLength={3}
                value={prioridades.alta}
                onChange={cambiarPrioridad}
                aria-label="Horas máximas para prioridad alta"
              />

              <span>horas</span>
            </label>
          </article>

          <article className="sla-priority-card priority-medium">
            <div className="sla-priority-content">
              <div className="sla-priority-heading">
                <span className="sla-priority-label">
                  Prioridad Media
                </span>

                <strong>
                  {prioridades.media || "0"}h
                </strong>

                <small>máximo</small>
              </div>

              <p>
                Problemas que impactan parcialmente el
                trabajo, pero tienen una solución
                temporal.
              </p>

              <div className="sla-progress-track">
                <span
                  style={{
                    width: `${obtenerPorcentaje(
                      prioridades.media,
                      96
                    )}%`,
                  }}
                ></span>
              </div>
            </div>

            <label className="sla-hours-input">
              <input
                type="text"
                name="media"
                inputMode="numeric"
                maxLength={3}
                value={prioridades.media}
                onChange={cambiarPrioridad}
                aria-label="Horas máximas para prioridad media"
              />

              <span>horas</span>
            </label>
          </article>

          <article className="sla-priority-card priority-low">
            <div className="sla-priority-content">
              <div className="sla-priority-heading">
                <span className="sla-priority-label">
                  Prioridad Baja
                </span>

                <strong>
                  {prioridades.baja || "0"}h
                </strong>

                <small>máximo</small>
              </div>

              <p>
                Solicitudes de mantenimiento preventivo
                o mejoras que no afectan la operación.
              </p>

              <div className="sla-progress-track">
                <span
                  style={{
                    width: `${obtenerPorcentaje(
                      prioridades.baja,
                      96
                    )}%`,
                  }}
                ></span>
              </div>
            </div>

            <label className="sla-hours-input">
              <input
                type="text"
                name="baja"
                inputMode="numeric"
                maxLength={3}
                value={prioridades.baja}
                onChange={cambiarPrioridad}
                aria-label="Horas máximas para prioridad baja"
              />

              <span>horas</span>
            </label>
          </article>
        </div>
      </section>

      <section className="sla-escalation-card">
        <div className="sla-escalation-header">
          <h3>Escalación automática</h3>

          <p>
            Si un ticket de alta prioridad no es
            atendido en el tiempo definido, se
            notificará automáticamente al
            administrador.
          </p>
        </div>

        <div className="sla-escalation-grid">
          <div className="sla-escalation-field">
            <div className="sla-escalation-label">
              <label htmlFor="escalacionAlta">
                Umbral de escalación — Prioridad Alta
              </label>

              <span>Horas sin atención</span>
            </div>

            <div className="sla-escalation-input">
              <input
                id="escalacionAlta"
                type="text"
                name="escalacionAlta"
                inputMode="numeric"
                maxLength={3}
                value={prioridades.escalacionAlta}
                onChange={cambiarPrioridad}
                aria-label="Umbral de escalación de prioridad alta"
              />

              <span>horas</span>
            </div>
          </div>

          <div className="sla-current-behavior">
            <h4>Comportamiento actual</h4>

            <p>
              Tickets de prioridad Alta sin respuesta
              en{" "}
              <strong>
                {prioridades.escalacionAlta || "0"}h
              </strong>{" "}
              → notificación inmediata al
              administrador y cambio al estado{" "}
              <b>En Espera</b>.
            </p>
          </div>
        </div>
      </section>
    </>
  );

  /* =====================================================
     SECCIÓN ROLES Y PERMISOS
  ===================================================== */
const renderizarRoles = () => (
  <>
    {/* HEADER */}
    <div className="roles-header">
      <div className="roles-title">
        <ShieldCheck size={22} />
        <div>
          <h2>Roles y permisos</h2>
          <p>Permisos por rol — solo lectura</p>
        </div>
      </div>

      <div className="roles-banner">
        <Info size={16} />
        <p>
          Esta sección es de <b>solo lectura</b>. La modificación de permisos
          avanzados requiere acceso al sistema de control de roles.
        </p>
      </div>
    </div>

    {/* GRID */}
    <div className="roles-grid">

      {/* ADMIN */}
      <div className="role-pro-card admin">
        <div className="role-pro-header">
          <ShieldCheck size={18} />
          <div>
            <h3>Administrador</h3>
            <span>8 permisos activos</span>
          </div>
        </div>

        <ul>
          <li><Check size={14}/> Ver todos los tickets</li>
          <li><Check size={14}/> Crear y editar tickets</li>
          <li><Check size={14}/> Asignar técnicos</li>
          <li><Check size={14}/> Gestionar usuarios y roles</li>
          <li><Check size={14}/> Ver reportes y estadísticas</li>
          <li><Check size={14}/> Exportar datos</li>
          <li><Check size={14}/> Configurar el sistema</li>
          <li><Check size={14}/> Gestionar inventario</li>
        </ul>
      </div>

      {/* TECNICO */}
      <div className="role-pro-card tech">
        <div className="role-pro-header">
          <Users size={18} />
          <div>
            <h3>Técnico</h3>
            <span>4 permisos activos</span>
          </div>
        </div>

        <ul>
          <li><Check size={14}/> Ver tickets asignados</li>
          <li><Check size={14}/> Actualizar estado</li>
          <li><Check size={14}/> Agregar comentarios</li>
          <li><Check size={14}/> Ver historial</li>
          <li className="disabled"><X size={14}/> Asignar técnicos</li>
          <li className="disabled"><X size={14}/> Ver reportes</li>
        </ul>
      </div>

      {/* USUARIO */}
      <div className="role-pro-card user">
        <div className="role-pro-header">
          <Users size={18} />
          <div>
            <h3>Usuario</h3>
            <span>3 permisos activos</span>
          </div>
        </div>

        <ul>
          <li><Check size={14}/> Crear tickets</li>
          <li><Check size={14}/> Ver estado</li>
          <li><Check size={14}/> Adjuntar evidencia</li>
          <li className="disabled"><X size={14}/> Ver tickets de otros</li>
          <li className="disabled"><X size={14}/> Asignar técnicos</li>
        </ul>
      </div>

    </div>
  </>
);
  /* =====================================================
     CONTENIDO ACTIVO
  ===================================================== */

  const renderizarContenido = () => {
    if (seccionActiva === "notificaciones") {
      return renderizarNotificaciones();
    }

    if (seccionActiva === "prioridades") {
      return renderizarPrioridades();
    }

    if (seccionActiva === "roles") {
      return renderizarRoles();
    }

    return renderizarGeneral();
  };

  /* =====================================================
     RETURN PRINCIPAL
  ===================================================== */

  return (
    <div className="layout">
      <AdminNavbar />

      <main
        className="system-config-container"
        onClick={cerrarMenusHeader}
      >
        <header className="system-config-header">
          <div className="system-config-header-title">
            <h1>Configuración del Sistema</h1>

            <p>Viernes 27 de junio de 2026</p>
          </div>

          <div className="system-config-header-actions">
            {/* ACTUALIZAR */}
            <button
              type="button"
              className="system-refresh-button"
              onClick={(evento) => {
                evento.stopPropagation();
                actualizarConfiguracion();
              }}
            >
              <RefreshCw size={17} strokeWidth={1.9} />
              Actualizar
            </button>

            {/* NOTIFICACIONES */}
            <div className="system-notification-wrapper">
              <button
                type="button"
                className="system-notification-button"
                aria-label="Abrir notificaciones"
                aria-expanded={mostrarNotificacionesHeader}
                onClick={(evento) => {
                  evento.stopPropagation();

                  setMostrarNotificacionesHeader(
                    (estadoActual) => !estadoActual
                  );

                  setMostrarPerfil(false);
                }}
              >
                <Bell size={19} strokeWidth={1.8} />

                <span>3</span>
              </button>

              {mostrarNotificacionesHeader && (
                <div
                  className="system-notification-menu"
                  onClick={(evento) =>
                    evento.stopPropagation()
                  }
                >
                  <div className="system-notification-header">
                    <h3>Notificaciones</h3>

                    <button
                      type="button"
                      onClick={() =>
                        setMostrarNotificacionesHeader(false)
                      }
                      aria-label="Cerrar notificaciones"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="system-notification-entry">
                    <span className="green" />

                    <div>
                      <strong>Configuración actualizada</strong>

                      <p>
                        Los parámetros generales fueron modificados recientemente.
                      </p>
                    </div>
                  </div>

                  <div className="system-notification-entry">
                    <span className="orange" />

                    <div>
                      <strong>Revisión recomendada</strong>

                      <p>
                        Verifica los tiempos SLA de atención.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PERFIL */}
            <div className="system-profile-wrapper">
              <button
                type="button"
                className={`system-profile-button ${
                  mostrarPerfil ? "active" : ""
                }`}
                aria-label="Abrir menú del perfil"
                aria-expanded={mostrarPerfil}
                onClick={(evento) => {
                  evento.stopPropagation();

                  setMostrarPerfil(
                    (estadoActual) => !estadoActual
                  );

                  setMostrarNotificacionesHeader(false);
                }}
              >
                <span className="system-admin-avatar">
                  RP
                </span>

                <span className="system-profile-info">
                  <strong>Ricardo Pacheco</strong>
                  <small>Administrador</small>
                </span>

                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className={`system-profile-arrow ${
                    mostrarPerfil ? "open" : ""
                  }`}
                />
              </button>

              {mostrarPerfil && (
                <div
                  className="system-profile-menu"
                  onClick={(evento) =>
                    evento.stopPropagation()
                  }
                >
                  
                

                  <div className="system-profile-divider" />

                  <button
                    type="button"
                    className="system-profile-option system-logout-option"
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

        <section className="system-config-layout">
          <aside className="system-config-sidebar">
            <p>SECCIONES</p>

            <button
              type="button"
              className={
                seccionActiva === "general"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSeccionActiva("general")
              }
            >
              <Globe2 size={17} />
              General
              <span></span>
            </button>

            <button
              type="button"
              className={
                seccionActiva === "notificaciones"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSeccionActiva("notificaciones")
              }
            >
              <Mail size={17} />
              Notificaciones
              <span></span>
            </button>

            <button
              type="button"
              className={
                seccionActiva === "prioridades"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSeccionActiva("prioridades")
              }
            >
              <Clock3 size={17} />
              Prioridades y SLA
              <span></span>
            </button>

            <button
              type="button"
              className={
                seccionActiva === "roles"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSeccionActiva("roles")
              }
            >
              <ShieldCheck size={17} />
              Roles y permisos
              <span></span>
            </button>
          </aside>

          <section className="system-config-content">
            {renderizarContenido()}

            <footer className="system-config-actions">
              <span
                className={
                  mensajeGuardado.includes(
                    "correctamente"
                  )
                    ? "saved"
                    : ""
                }
              >
                {mensajeGuardado}
              </span>

              <div>
                <button
                  type="button"
                  className="system-reset-button"
                  onClick={
                    restablecerConfiguracion
                  }
                >
                  <RotateCcw size={16} />
                  Restablecer
                </button>

                <button
                  type="button"
                  className="system-save-button"
                  onClick={guardarCambios}
                >
                  {mensajeGuardado.includes(
                    "correctamente"
                  ) ? (
                    <Check size={16} />
                  ) : (
                    <Save size={16} />
                  )}

                  Guardar cambios
                </button>
              </div>
            </footer>
          </section>
        </section>
      </main>
    </div>
  );
}

export default Configuracion;