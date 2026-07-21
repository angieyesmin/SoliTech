import { useState } from "react";
import type { ChangeEvent, FormEvent, JSX } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../shared/components/Navbar";

import "../css/reportar.css";

import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Building2,
  Check,
  ChevronDown,
  FileImage,
  Lightbulb,
  Monitor,
  Paperclip,
  Sofa,
  Upload,
  User,
  Wrench,
  X,
} from "lucide-react";

type TipoIncidencia =
  | "Infraestructura"
  | "Tecnología"
  | "Equipamiento"
  | "Mantenimiento"
  | "";

type Prioridad = "Baja" | "Media" | "Alta";

type FormularioReporte = {
  titulo: string;
  descripcion: string;
  ubicacion: string;
  referencia: string;
  prioridad: Prioridad;
};

type Categoria = {
  nombre: Exclude<TipoIncidencia, "">;
  descripcion: string;
  clase: string;
  icono: JSX.Element;
};

const categorias: Categoria[] = [
  {
    nombre: "Infraestructura",
    descripcion:
      "Problemas en instalaciones físicas, edificios, aulas, baños, iluminación, etc.",
    clase: "infraestructura",
    icono: <Building2 size={38} />,
  },
  {
    nombre: "Tecnología",
    descripcion:
      "Problemas de red, internet, sistemas, computadoras, proyectores, software, etc.",
    clase: "tecnologia",
    icono: <Monitor size={38} />,
  },
  {
    nombre: "Equipamiento",
    descripcion:
      "Problemas con mobiliario, equipos, herramientas o recursos institucionales.",
    clase: "equipamiento",
    icono: <Sofa size={38} />,
  },
  {
    nombre: "Mantenimiento",
    descripcion:
      "Solicitudes de mantenimiento preventivo o correctivo en instalaciones o equipos.",
    clase: "mantenimiento",
    icono: <Wrench size={38} />,
  },
];

function ReportarIncidencia() {
  const navigate = useNavigate();

  const [paso, setPaso] = useState(1);
  const [tipoSeleccionado, setTipoSeleccionado] =
    useState<TipoIncidencia>("Infraestructura");

  const [mostrarNotificaciones, setMostrarNotificaciones] =
    useState(false);

  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [evidencias, setEvidencias] = useState<File[]>([]);
  const [mensajeError, setMensajeError] = useState("");

  const [formulario, setFormulario] = useState<FormularioReporte>({
    titulo: "",
    descripcion: "",
    ubicacion: "",
    referencia: "",
    prioridad: "Media",
  });

  const actualizarCampo = (
    campo: keyof FormularioReporte,
    valor: string
  ) => {
    setFormulario((actual) => ({
      ...actual,
      [campo]: valor,
    }));

    setMensajeError("");
  };

  const validarPasoActual = () => {
    if (paso === 1 && !tipoSeleccionado) {
      setMensajeError("Selecciona un tipo de incidencia.");
      return false;
    }

    if (paso === 2) {
      if (!formulario.titulo.trim()) {
        setMensajeError("Escribe el título de la incidencia.");
        return false;
      }

      if (!formulario.descripcion.trim()) {
        setMensajeError("Describe el problema.");
        return false;
      }

      if (!formulario.ubicacion.trim()) {
        setMensajeError("Indica la ubicación de la incidencia.");
        return false;
      }
    }

    return true;
  };

  const siguientePaso = () => {
    if (!validarPasoActual()) return;

    setMensajeError("");

    if (paso < 3) {
      setPaso((actual) => actual + 1);
    }
  };

  const pasoAnterior = () => {
    setMensajeError("");

    if (paso > 1) {
      setPaso((actual) => actual - 1);
    }
  };

  const cancelarReporte = () => {
    const confirmar = window.confirm(
      "¿Deseas cancelar el reporte? Se perderán los datos capturados."
    );

    if (confirmar) {
      navigate("/home");
    }
  };

  const seleccionarArchivos = (
    evento: ChangeEvent<HTMLInputElement>
  ) => {
    const archivos = Array.from(evento.target.files ?? []);

    const imagenesValidas = archivos.filter((archivo) =>
      archivo.type.startsWith("image/")
    );

    if (imagenesValidas.length !== archivos.length) {
      setMensajeError("Solo puedes seleccionar archivos de imagen.");
      return;
    }

    setEvidencias((actuales) => [
      ...actuales,
      ...imagenesValidas,
    ]);

    setMensajeError("");
    evento.target.value = "";
  };

  const eliminarEvidencia = (indice: number) => {
    setEvidencias((actuales) =>
      actuales.filter((_, posicion) => posicion !== indice)
    );
  };

  const enviarReporte = async (
    evento: FormEvent<HTMLFormElement>
  ) => {
    evento.preventDefault();

    if (!validarPasoActual()) return;

    setEnviando(true);
    setMensajeError("");

    try {
      const datosReporte = {
        tipo: tipoSeleccionado,
        ...formulario,
        evidencias: evidencias.map((archivo) => archivo.name),
        fecha: new Date().toISOString(),
      };

      console.log("Reporte enviado:", datosReporte);

      await new Promise((resolve) =>
        window.setTimeout(resolve, 900)
      );

      alert("Incidencia reportada correctamente.");

      navigate("/misreportes");
    } catch (error) {
      console.error(error);
      setMensajeError(
        "No fue posible enviar el reporte. Inténtalo nuevamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  const cerrarMenus = () => {
    setMostrarNotificaciones(false);
    setMostrarPerfil(false);
  };

  return (
    <div className="layout">
      <Navbar />

      <main
        className="reportar-container"
        onClick={cerrarMenus}
      >
        <header className="reportar-header">
          <div>
            <h1>Reportar Incidencia</h1>
            <p>Viernes 27 de junio de 2026</p>
          </div>

          <div className="reportar-user-actions">
            <div className="reportar-notification-wrapper">
              <button
                type="button"
                className="reportar-notification-button"
                onClick={(evento) => {
                  evento.stopPropagation();
                  setMostrarNotificaciones(
                    (actual) => !actual
                  );
                  setMostrarPerfil(false);
                }}
                aria-label="Abrir notificaciones"
              >
                <Bell size={22} />
                <span>3</span>
              </button>

              {mostrarNotificaciones && (
                <div
                  className="reportar-notification-menu"
                  onClick={(evento) =>
                    evento.stopPropagation()
                  }
                >
                  <div className="reportar-menu-title">
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

                  <div className="reportar-notification-item">
                    <i className="notification-blue"></i>

                    <div>
                      <strong>Reporte en proceso</strong>
                      <p>
                        La incidencia TKT-0481 fue asignada.
                      </p>
                    </div>
                  </div>

                  <div className="reportar-notification-item">
                    <i className="notification-orange"></i>

                    <div>
                      <strong>Reporte pendiente</strong>
                      <p>
                        La incidencia TKT-0479 sigue sin atender.
                      </p>
                    </div>
                  </div>

                  <div className="reportar-notification-item">
                    <i className="notification-green"></i>

                    <div>
                      <strong>Reporte resuelto</strong>
                      <p>
                        La incidencia TKT-0468 fue resuelta.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="reportar-profile-wrapper">
              <button
                type="button"
                className="reportar-profile-button"
                onClick={(evento) => {
                  evento.stopPropagation();
                  setMostrarPerfil((actual) => !actual);
                  setMostrarNotificaciones(false);
                }}
              >
                <span className="reportar-avatar">RP</span>

                <span className="reportar-user-information">
                  <strong>Ricardo Pacheco</strong>
                  <small>Usuario</small>
                </span>

                <ChevronDown size={18} />
              </button>

              {mostrarPerfil && (
                <div
                  className="reportar-profile-menu"
                  onClick={(evento) =>
                    evento.stopPropagation()
                  }
                >
                  <button
                    type="button"
                    onClick={() => navigate("/perfil")}
                  >
                    <User size={16} />
                    Mi perfil
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/")}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="reportar-content">
          <form
            className="reportar-card"
            onSubmit={enviarReporte}
          >
            <div className="reportar-steps-section">
              <div className="reportar-steps">
                <div
                  className={`reportar-step ${
                    paso >= 1 ? "active" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setPaso(1)}
                  >
                    {paso > 1 ? <Check size={19} /> : "1"}
                  </button>

                  <span>Tipo de incidencia</span>
                </div>

                <div
                  className={`reportar-step-line ${
                    paso >= 2 ? "active" : ""
                  }`}
                ></div>

                <div
                  className={`reportar-step ${
                    paso >= 2 ? "active" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (tipoSeleccionado) {
                        setPaso(2);
                      }
                    }}
                  >
                    {paso > 2 ? <Check size={19} /> : "2"}
                  </button>

                  <span>Detalles</span>
                </div>

                <div
                  className={`reportar-step-line ${
                    paso >= 3 ? "active" : ""
                  }`}
                ></div>

                <div
                  className={`reportar-step ${
                    paso >= 3 ? "active" : ""
                  }`}
                >
                  <button type="button">3</button>
                  <span>Evidencia y envío</span>
                </div>
              </div>

              <p className="reportar-step-text">
                Paso {paso} de 3
              </p>
            </div>

            <div className="reportar-form-content">
              {mensajeError && (
                <div className="reportar-error">
                  {mensajeError}
                </div>
              )}

              {paso === 1 && (
                <div className="reportar-step-content">
                  <div className="reportar-section-heading">
                    <h2>Selecciona el tipo de incidencia</h2>

                    <p>
                      Elige la categoría que mejor describa el
                      problema que estás reportando.
                    </p>
                  </div>

                  <div className="reportar-category-layout">
                    <div className="reportar-categories-grid">
                      {categorias.map((categoria) => {
                        const seleccionada =
                          tipoSeleccionado ===
                          categoria.nombre;

                        return (
                          <button
                            type="button"
                            key={categoria.nombre}
                            className={`reportar-category-card ${
                              categoria.clase
                            } ${
                              seleccionada ? "selected" : ""
                            }`}
                            onClick={() => {
                              setTipoSeleccionado(
                                categoria.nombre
                              );
                              setMensajeError("");
                            }}
                          >
                            <span className="category-check">
                              {seleccionada && (
                                <Check size={17} />
                              )}
                            </span>

                            <span className="category-icon">
                              {categoria.icono}
                            </span>

                            <strong>{categoria.nombre}</strong>

                            <p>{categoria.descripcion}</p>
                          </button>
                        );
                      })}
                    </div>

                    <aside className="reportar-help-card">
                      <div className="reportar-help-icon">
                        <Lightbulb size={30} />
                      </div>

                      <div>
                        <h3>¿No estás seguro?</h3>

                        <p>
                          Selecciona la opción que más se acerque
                          a tu problema. Esto nos ayudará a
                          asignarlo al equipo correcto.
                        </p>
                      </div>
                    </aside>
                  </div>
                </div>
              )}

              {paso === 2 && (
                <div className="reportar-step-content">
                  <div className="reportar-section-heading">
                    <h2>Describe la incidencia</h2>

                    <p>
                      Proporciona la información necesaria para
                      que el equipo pueda atender el problema.
                    </p>
                  </div>

                  <div className="reportar-details-grid">
                    <div className="reportar-form-group full">
                      <label htmlFor="titulo">
                        Título de la incidencia
                      </label>

                      <input
                        id="titulo"
                        type="text"
                        placeholder="Ej. Falla de internet en laboratorio"
                        value={formulario.titulo}
                        onChange={(evento) =>
                          actualizarCampo(
                            "titulo",
                            evento.target.value
                          )
                        }
                      />
                    </div>

                    <div className="reportar-form-group full">
                      <label htmlFor="descripcion">
                        Descripción del problema
                      </label>

                      <textarea
                        id="descripcion"
                        placeholder="Describe qué ocurrió, desde cuándo sucede y cómo afecta el servicio..."
                        value={formulario.descripcion}
                        onChange={(evento) =>
                          actualizarCampo(
                            "descripcion",
                            evento.target.value
                          )
                        }
                      ></textarea>
                    </div>

                    <div className="reportar-form-group">
                      <label htmlFor="ubicacion">
                        Ubicación
                      </label>

                      <input
                        id="ubicacion"
                        type="text"
                        placeholder="Ej. Edificio A"
                        value={formulario.ubicacion}
                        onChange={(evento) =>
                          actualizarCampo(
                            "ubicacion",
                            evento.target.value
                          )
                        }
                      />
                    </div>

                    <div className="reportar-form-group">
                      <label htmlFor="referencia">
                        Referencia adicional
                      </label>

                      <input
                        id="referencia"
                        type="text"
                        placeholder="Ej. Piso 2, aula 204"
                        value={formulario.referencia}
                        onChange={(evento) =>
                          actualizarCampo(
                            "referencia",
                            evento.target.value
                          )
                        }
                      />
                    </div>

                    <div className="reportar-form-group full">
                      <label htmlFor="prioridad">
                        Prioridad estimada
                      </label>

                      <select
                        id="prioridad"
                        value={formulario.prioridad}
                        onChange={(evento) =>
                          actualizarCampo(
                            "prioridad",
                            evento.target.value
                          )
                        }
                      >
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {paso === 3 && (
                <div className="reportar-step-content">
                  <div className="reportar-section-heading">
                    <h2>Agrega evidencia y confirma</h2>

                    <p>
                      Adjunta fotografías que ayuden a comprender
                      mejor el problema antes de enviar.
                    </p>
                  </div>

                  <div className="reportar-evidence-layout">
                    <label className="reportar-upload-area">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={seleccionarArchivos}
                      />

                      <span className="upload-icon">
                        <Upload size={28} />
                      </span>

                      <strong>
                        Haz clic para seleccionar imágenes
                      </strong>

                      <p>
                        Formatos JPG, PNG o WEBP. Puedes seleccionar
                        varios archivos.
                      </p>
                    </label>

                    {evidencias.length > 0 && (
                      <div className="reportar-files-list">
                        {evidencias.map((archivo, indice) => (
                          <div
                            className="reportar-file-item"
                            key={`${archivo.name}-${indice}`}
                          >
                            <div>
                              <FileImage size={19} />

                              <span>
                                <strong>{archivo.name}</strong>
                                <small>
                                  {(
                                    archivo.size /
                                    1024 /
                                    1024
                                  ).toFixed(2)}{" "}
                                  MB
                                </small>
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                eliminarEvidencia(indice)
                              }
                            >
                              <X size={17} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="reportar-summary-card">
                      <h3>Resumen del reporte</h3>

                      <div>
                        <span>Tipo</span>
                        <strong>{tipoSeleccionado}</strong>
                      </div>

                      <div>
                        <span>Título</span>
                        <strong>
                          {formulario.titulo ||
                            "Sin especificar"}
                        </strong>
                      </div>

                      <div>
                        <span>Ubicación</span>
                        <strong>
                          {formulario.ubicacion ||
                            "Sin especificar"}
                        </strong>
                      </div>

                      <div>
                        <span>Prioridad</span>
                        <strong>{formulario.prioridad}</strong>
                      </div>

                      <div>
                        <span>Evidencias</span>
                        <strong>
                          {evidencias.length} archivo(s)
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <footer className="reportar-footer">
              <button
                type="button"
                className="reportar-cancel-button"
                onClick={cancelarReporte}
              >
                Cancelar
              </button>

              <div className="reportar-navigation-buttons">
                <button
                  type="button"
                  className="reportar-back-button"
                  onClick={pasoAnterior}
                  disabled={paso === 1}
                >
                  <ArrowLeft size={17} />
                  Atrás
                </button>

                {paso < 3 ? (
                  <button
                    type="button"
                    className="reportar-next-button"
                    onClick={siguientePaso}
                  >
                    Siguiente
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="reportar-next-button"
                    disabled={enviando}
                  >
                    {enviando ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Paperclip size={17} />
                        Enviar reporte
                      </>
                    )}
                  </button>
                )}
              </div>
            </footer>
          </form>
        </section>
      </main>
    </div>
  );
}

export default ReportarIncidencia;