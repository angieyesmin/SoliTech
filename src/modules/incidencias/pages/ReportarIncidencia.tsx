import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Building2,
  Check,
  ChevronDown,
  Lightbulb,
  LogOut,
  Monitor,
  Settings,
  Sofa,
  User,
  Wrench,
} from "lucide-react";

import Navbar from "../../../shared/components/Navbar";
import "../css/reportar.css";

type TipoIncidencia =
  | "Infraestructura"
  | "Tecnología"
  | "Equipamiento"
  | "Mantenimiento";

type Categoria = {
  nombre: TipoIncidencia;
  descripcion: string;
  clase: string;
  icono: React.ReactNode;
};

const categorias: Categoria[] = [
  {
    nombre: "Infraestructura",
    descripcion:
      "Problemas en instalaciones físicas, edificios, aulas, baños, iluminación, etc.",
    clase: "infraestructura",
    icono: <Building2 size={38} strokeWidth={1.7} />,
  },
  {
    nombre: "Tecnología",
    descripcion:
      "Problemas de red, internet, sistemas, computadoras, proyectores, software, etc.",
    clase: "tecnologia",
    icono: <Monitor size={38} strokeWidth={1.7} />,
  },
  {
    nombre: "Equipamiento",
    descripcion:
      "Problemas con mobiliario, equipos, herramientas o recursos institucionales.",
    clase: "equipamiento",
    icono: <Sofa size={38} strokeWidth={1.7} />,
  },
  {
    nombre: "Mantenimiento",
    descripcion:
      "Solicitudes de mantenimiento preventivo o correctivo en instalaciones o equipos.",
    clase: "mantenimiento",
    icono: <Wrench size={38} strokeWidth={1.7} />,
  },
];

function ReportarIncidencia() {
  const navigate = useNavigate();

  const [mostrarNotificaciones, setMostrarNotificaciones] =
    useState(false);

  const [mostrarPerfil, setMostrarPerfil] =
    useState(false);

  const [pasoActual, setPasoActual] =
    useState(1);

  const [tipoSeleccionado, setTipoSeleccionado] =
    useState<TipoIncidencia>("Infraestructura");

  const [titulo, setTitulo] =
    useState("");

  const [descripcion, setDescripcion] =
    useState("");

  const [ubicacion, setUbicacion] =
    useState("");

  const [evidencia, setEvidencia] =
    useState<File | null>(null);

  const irSiguiente = () => {
    if (pasoActual < 3) {
      setPasoActual((actual) => actual + 1);
    }
  };

  const irAtras = () => {
    if (pasoActual > 1) {
      setPasoActual((actual) => actual - 1);
    }
  };

  const cerrarMenus = () => {
    setMostrarNotificaciones(false);
    setMostrarPerfil(false);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("recordarSesion");
    localStorage.removeItem("token");

    setMostrarPerfil(false);

    navigate("/login");
  };

  const enviarReporte = () => {
    if (!titulo.trim()) {
      alert("Escribe el título de la incidencia.");
      setPasoActual(2);
      return;
    }

    if (!descripcion.trim()) {
      alert("Escribe la descripción de la incidencia.");
      setPasoActual(2);
      return;
    }

    if (!ubicacion.trim()) {
      alert("Escribe la ubicación de la incidencia.");
      setPasoActual(2);
      return;
    }

    const nuevoReporte = {
      tipo: tipoSeleccionado,
      titulo,
      descripcion,
      ubicacion,
      evidencia: evidencia?.name ?? null,
    };

    console.log(
      "Reporte enviado:",
      nuevoReporte
    );

    alert(
      "Reporte enviado correctamente"
    );

    navigate("/misreportes");
  };

  return (
    <div className="layout">
      <Navbar />

      <main
        className="home-content"
        onClick={cerrarMenus}
      >
        {/* ================= TOPBAR ================= */}

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
                  className="home-notifications-menu"
                  onClick={(evento) =>
                    evento.stopPropagation()
                  }
                >
                  <div className="home-notifications-header">
                    <h4>
                      Notificaciones
                    </h4>

                    <button
                      type="button"
                      aria-label="Cerrar notificaciones"
                      onClick={() =>
                        setMostrarNotificaciones(
                          false
                        )
                      }
                    >
                      ×
                    </button>
                  </div>

                  <div className="home-notification-item">
                    <div className="notification-color blue-notification" />

                    <div>
                      <b>
                        Reporte en proceso
                      </b>

                      <p>
                        La incidencia INC-2024
                        fue asignada a un
                        técnico.
                      </p>

                      <span>
                        Hace 18 minutos
                      </span>
                    </div>
                  </div>

                  <div className="home-notification-item">
                    <div className="notification-color orange-notification" />

                    <div>
                      <b>
                        Reporte pendiente
                      </b>

                      <p>
                        La incidencia INC-2023
                        todavía no ha sido
                        atendida.
                      </p>

                      <span>
                        Hace 1 hora
                      </span>
                    </div>
                  </div>

                  <div className="home-notification-item">
                    <div className="notification-color green-notification" />

                    <div>
                      <b>
                        Reporte resuelto
                      </b>

                      <p>
                        La incidencia INC-2021
                        fue marcada como
                        resuelta.
                      </p>

                      <span>
                        Hace 3 horas
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="home-view-notifications"
                    onClick={() => {
                      setMostrarNotificaciones(
                        false
                      );

                      navigate(
                        "/misreportes"
                      );
                    }}
                  >
                    Ver todos mis reportes
                  </button>
                </div>
              )}
            </div>

            {/* ================= PERFIL ================= */}

            <div className="profile-wrapper">
              <button
                type="button"
                className={`user-box ${
                  mostrarPerfil
                    ? "active"
                    : ""
                }`}
                aria-label="Abrir menú del perfil"
                aria-expanded={
                  mostrarPerfil
                }
                onClick={(evento) => {
                  evento.stopPropagation();

                  setMostrarPerfil(
                    (estadoActual) =>
                      !estadoActual
                  );

                  setMostrarNotificaciones(
                    false
                  );
                }}
              >
                <span className="user-avatar">
                  RP
                </span>

                <span className="user-info">
                  <span className="user-name">
                    Ricardo Pacheco
                  </span>

                  <span className="user-role">
                    Usuario
                  </span>
                </span>

                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`user-arrow ${
                    mostrarPerfil
                      ? "open"
                      : ""
                  }`}
                />
              </button>

              {mostrarPerfil && (
                <div
                  className="profile-menu"
                  onClick={(evento) =>
                    evento.stopPropagation()
                  }
                >
                  <button
                    type="button"
                    className="profile-menu-option"
                    onClick={() => {
                      setMostrarPerfil(false);

                      navigate("/perfil");
                    }}
                  >
                    <User
                      size={17}
                      strokeWidth={1.8}
                    />

                    <span>
                      Mi perfil
                    </span>
                  </button>

                  <button
                    type="button"
                    className="profile-menu-option profile-settings"
                    onClick={() => {
                      setMostrarPerfil(false);

                      navigate(
                        "/configuracion"
                      );
                    }}
                  >
                    <Settings
                      size={17}
                      strokeWidth={1.8}
                    />

                    <span>
                      Configuración
                    </span>
                  </button>

                  <div className="profile-divider" />

                  <button
                    type="button"
                    className="profile-menu-option profile-logout"
                    onClick={cerrarSesion}
                  >
                    <LogOut
                      size={17}
                      strokeWidth={1.8}
                    />

                    <span>
                      Cerrar sesión
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ================= FORMULARIO ================= */}

        <section className="report-page-content">
          <article className="report-form-card">
            {/* ================= PASOS ================= */}

            <div className="report-steps-container">
              <div className="report-steps">
                <div
                  className={`report-step ${
                    pasoActual >= 1
                      ? "active"
                      : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setPasoActual(1)
                    }
                  >
                    {pasoActual > 1 ? (
                      <Check size={18} />
                    ) : (
                      "1"
                    )}
                  </button>

                  <span>
                    Tipo de incidencia
                  </span>
                </div>

                <div
                  className={`report-step-line ${
                    pasoActual >= 2
                      ? "active"
                      : ""
                  }`}
                />

                <div
                  className={`report-step ${
                    pasoActual >= 2
                      ? "active"
                      : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setPasoActual(2)
                    }
                  >
                    {pasoActual > 2 ? (
                      <Check size={18} />
                    ) : (
                      "2"
                    )}
                  </button>

                  <span>
                    Detalles
                  </span>
                </div>

                <div
                  className={`report-step-line ${
                    pasoActual >= 3
                      ? "active"
                      : ""
                  }`}
                />

                <div
                  className={`report-step ${
                    pasoActual >= 3
                      ? "active"
                      : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setPasoActual(3)
                    }
                  >
                    3
                  </button>

                  <span>
                    Evidencia y envío
                  </span>
                </div>
              </div>

              <p className="report-step-counter">
                Paso {pasoActual} de 3
              </p>
            </div>

            {/* ================= CUERPO ================= */}

            <div className="report-form-body">
              {/* PASO 1 */}

              {pasoActual === 1 && (
                <div className="report-step-content">
                  <div className="report-section-title">
                    <h2>
                      Selecciona el tipo de
                      incidencia
                    </h2>

                    <p>
                      Elige la categoría que
                      mejor describa el problema
                      que estás reportando.
                    </p>
                  </div>

                  <div className="report-category-layout">
                    <div className="report-category-grid">
                      {categorias.map(
                        (categoria) => {
                          const seleccionada =
                            tipoSeleccionado ===
                            categoria.nombre;

                          return (
                            <button
                              type="button"
                              key={
                                categoria.nombre
                              }
                              className={`report-category-card ${
                                categoria.clase
                              } ${
                                seleccionada
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                setTipoSeleccionado(
                                  categoria.nombre
                                )
                              }
                            >
                              <span className="report-category-check">
                                {seleccionada && (
                                  <Check
                                    size={16}
                                  />
                                )}
                              </span>

                              <span className="report-category-icon">
                                {
                                  categoria.icono
                                }
                              </span>

                              <strong>
                                {
                                  categoria.nombre
                                }
                              </strong>

                              <p>
                                {
                                  categoria.descripcion
                                }
                              </p>
                            </button>
                          );
                        }
                      )}
                    </div>

                    <aside className="report-help-card">
                      <span className="report-help-icon">
                        <Lightbulb
                          size={28}
                          strokeWidth={1.7}
                        />
                      </span>

                      <div>
                        <h3>
                          ¿No estás seguro?
                        </h3>

                        <p>
                          Selecciona la opción
                          que más se acerque a tu
                          problema. Esto nos
                          ayudará a asignarlo al
                          equipo correcto.
                        </p>
                      </div>
                    </aside>
                  </div>
                </div>
              )}

              {/* PASO 2 */}

              {pasoActual === 2 && (
                <div className="report-step-content">
                  <div className="report-section-title">
                    <h2>
                      Describe la incidencia
                    </h2>

                    <p>
                      Proporciona los detalles
                      necesarios para atender el
                      problema.
                    </p>
                  </div>

                  <div className="report-details-form">
                    <div className="report-form-group full">
                      <label htmlFor="titulo">
                        Título de la incidencia
                      </label>

                      <input
                        id="titulo"
                        type="text"
                        value={titulo}
                        placeholder="Ej. Falla de internet en laboratorio"
                        onChange={(evento) =>
                          setTitulo(
                            evento.target.value
                          )
                        }
                      />
                    </div>

                    <div className="report-form-group full">
                      <label htmlFor="descripcion">
                        Descripción del problema
                      </label>

                      <textarea
                        id="descripcion"
                        value={descripcion}
                        placeholder="Describe detalladamente el problema..."
                        onChange={(evento) =>
                          setDescripcion(
                            evento.target.value
                          )
                        }
                      />
                    </div>

                    <div className="report-form-group full">
                      <label htmlFor="ubicacion">
                        Ubicación
                      </label>

                      <input
                        id="ubicacion"
                        type="text"
                        value={ubicacion}
                        placeholder="Ej. Edificio A, aula 304"
                        onChange={(evento) =>
                          setUbicacion(
                            evento.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 3 */}

              {pasoActual === 3 && (
                <div className="report-step-content">
                  <div className="report-section-title">
                    <h2>
                      Agrega evidencia y
                      confirma
                    </h2>

                    <p>
                      Adjunta una fotografía
                      para ayudar al equipo
                      técnico a comprender el
                      problema.
                    </p>
                  </div>

                  <label className="report-upload-area">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(evento) =>
                        setEvidencia(
                          evento.target.files?.[0] ??
                            null
                        )
                      }
                    />

                    <strong>
                      Seleccionar evidencia
                    </strong>

                    <span>
                      {evidencia
                        ? evidencia.name
                        : "JPG, PNG o WEBP"}
                    </span>
                  </label>

                  <div className="report-summary">
                    <h3>
                      Resumen del reporte
                    </h3>

                    <p>
                      <span>Tipo:</span>

                      <strong>
                        {tipoSeleccionado}
                      </strong>
                    </p>

                    <p>
                      <span>Título:</span>

                      <strong>
                        {titulo ||
                          "Sin especificar"}
                      </strong>
                    </p>

                    <p>
                      <span>
                        Descripción:
                      </span>

                      <strong>
                        {descripcion ||
                          "Sin especificar"}
                      </strong>
                    </p>

                    <p>
                      <span>
                        Ubicación:
                      </span>

                      <strong>
                        {ubicacion ||
                          "Sin especificar"}
                      </strong>
                    </p>

                    <p>
                      <span>
                        Evidencia:
                      </span>

                      <strong>
                        {evidencia
                          ? evidencia.name
                          : "Sin archivo"}
                      </strong>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ================= PIE ================= */}

            <footer className="report-form-footer">
              <button
                type="button"
                className="report-cancel-button"
                onClick={() =>
                  navigate("/home")
                }
              >
                Cancelar
              </button>

              <div className="report-navigation-buttons">
                <button
                  type="button"
                  className="report-back-button"
                  disabled={
                    pasoActual === 1
                  }
                  onClick={irAtras}
                >
                  <ArrowLeft size={17} />

                  Atrás
                </button>

                {pasoActual < 3 ? (
                  <button
                    type="button"
                    className="report-next-button"
                    onClick={irSiguiente}
                  >
                    Siguiente

                    <ArrowRight
                      size={18}
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="report-next-button"
                    onClick={enviarReporte}
                  >
                    Enviar reporte

                    <ArrowRight
                      size={18}
                    />
                  </button>
                )}
              </div>
            </footer>
          </article>
        </section>
      </main>
    </div>
  );
}

export default ReportarIncidencia;