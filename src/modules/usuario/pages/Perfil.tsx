import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../shared/components/Navbar";
import "../css/perfil.css";

import {
  Bell,
  Camera,
  ChevronDown,
  CircleUserRound,
  Eye,
  EyeOff,
  Info,
  LockKeyhole,
  LogOut,
  Save,
  User,
  X,
} from "lucide-react";

type UsuarioGuardado = {
  nombre?: string;
  apellido?: string;
  correo?: string;
  rol?: string;
  foto?: string;
};

function Perfil() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("Ricardo");
  const [apellido, setApellido] = useState("Pacheco");
  const [correo, setCorreo] = useState(
    "ricardo.pacheco@solitech.edu.mx"
  );

  const [fotoPerfil, setFotoPerfil] = useState<string | null>(
    null
  );

  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [confirmarPassword, setConfirmarPassword] =
    useState("");

  const [mostrarActual, setMostrarActual] = useState(false);
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] =
    useState(false);

  const [mostrarNotificaciones, setMostrarNotificaciones] =
    useState(false);

  const [mostrarPerfilMenu, setMostrarPerfilMenu] =
    useState(false);

  const [guardandoPerfil, setGuardandoPerfil] =
    useState(false);

  const [actualizandoPassword, setActualizandoPassword] =
    useState(false);

  const [mensajePerfil, setMensajePerfil] = useState("");
  const [mensajePassword, setMensajePassword] = useState("");

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) return;

    try {
      const usuario: UsuarioGuardado =
        JSON.parse(usuarioGuardado);

      if (usuario.nombre) {
        setNombre(usuario.nombre);
      }

      if (usuario.apellido) {
        setApellido(usuario.apellido);
      }

      if (usuario.correo) {
        setCorreo(usuario.correo);
      }

      if (usuario.foto) {
        setFotoPerfil(usuario.foto);
      }
    } catch (error) {
      console.error("No se pudo leer el usuario:", error);
    }
  }, []);

  const obtenerIniciales = () => {
    const inicialNombre = nombre.trim().charAt(0);
    const inicialApellido = apellido.trim().charAt(0);

    return `${inicialNombre}${inicialApellido}`.toUpperCase();
  };

  const seleccionarFoto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const archivo = event.target.files?.[0];

    if (!archivo) return;

    const tiposPermitidos = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!tiposPermitidos.includes(archivo.type)) {
      alert("Selecciona una imagen JPG, PNG o WEBP.");
      event.target.value = "";
      return;
    }

    if (archivo.size > 3 * 1024 * 1024) {
      alert("La imagen no debe pesar más de 3 MB.");
      event.target.value = "";
      return;
    }

    const lector = new FileReader();

    lector.onload = () => {
      const imagen = lector.result;

      if (typeof imagen === "string") {
        setFotoPerfil(imagen);
        setMensajePerfil(
          "Nueva fotografía seleccionada. Guarda los cambios."
        );
      }
    };

    lector.readAsDataURL(archivo);
    event.target.value = "";
  };

  const guardarCambios = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!nombre.trim() || !apellido.trim()) {
      setMensajePerfil(
        "El nombre y el apellido son obligatorios."
      );
      return;
    }

    setGuardandoPerfil(true);
    setMensajePerfil("");

    try {
      await new Promise((resolve) =>
        window.setTimeout(resolve, 700)
      );

      const usuarioAnterior =
        localStorage.getItem("usuario");

      let usuario: UsuarioGuardado = {};

      if (usuarioAnterior) {
        try {
          usuario = JSON.parse(usuarioAnterior);
        } catch {
          usuario = {};
        }
      }

      const usuarioActualizado: UsuarioGuardado = {
        ...usuario,
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        correo,
        foto: fotoPerfil ?? undefined,
      };

      localStorage.setItem(
        "usuario",
        JSON.stringify(usuarioActualizado)
      );

      setMensajePerfil(
        "Información personal guardada correctamente."
      );
    } catch (error) {
      console.error(error);

      setMensajePerfil(
        "No fue posible guardar la información."
      );
    } finally {
      setGuardandoPerfil(false);
    }
  };

  const actualizarPassword = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMensajePassword("");

    if (
      !passwordActual ||
      !passwordNueva ||
      !confirmarPassword
    ) {
      setMensajePassword(
        "Completa todos los campos de contraseña."
      );
      return;
    }

    if (passwordNueva.length < 8) {
      setMensajePassword(
        "La nueva contraseña debe tener al menos 8 caracteres."
      );
      return;
    }

    if (passwordNueva !== confirmarPassword) {
      setMensajePassword(
        "Las contraseñas nuevas no coinciden."
      );
      return;
    }

    if (passwordActual === passwordNueva) {
      setMensajePassword(
        "La nueva contraseña debe ser diferente de la actual."
      );
      return;
    }

    setActualizandoPassword(true);

    try {
      /*
      Aquí puedes conectar tu API:

      await axios.put(
        "http://localhost:3000/api/usuarios/password",
        {
          passwordActual,
          passwordNueva,
        }
      );
      */

      await new Promise((resolve) =>
        window.setTimeout(resolve, 700)
      );

      setPasswordActual("");
      setPasswordNueva("");
      setConfirmarPassword("");

      setMensajePassword(
        "Contraseña actualizada correctamente."
      );
    } catch (error) {
      console.error(error);

      setMensajePassword(
        "No fue posible actualizar la contraseña."
      );
    } finally {
      setActualizandoPassword(false);
    }
  };

  const cerrarSesion = () => {
    const confirmar = window.confirm(
      "¿Deseas cerrar tu sesión?"
    );

    if (!confirmar) return;

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("recordarSesion");

    navigate("/");
  };

  const cerrarMenus = () => {
    setMostrarNotificaciones(false);
    setMostrarPerfilMenu(false);
  };

  return (
    <div className="layout">
      <Navbar />

      <main
        className="perfil-container"
        onClick={cerrarMenus}
      >
        <header className="perfil-header">
          <div>
            <h1>Mi Perfil</h1>
            <p>Viernes 27 de junio de 2026</p>
          </div>

          <div className="perfil-header-actions">
            <div className="perfil-notification-wrapper">
              <button
                type="button"
                className="perfil-notification-button"
                onClick={(event) => {
                  event.stopPropagation();

                  setMostrarNotificaciones(
                    (actual) => !actual
                  );

                  setMostrarPerfilMenu(false);
                }}
                aria-label="Abrir notificaciones"
              >
                <Bell size={21} />
                <span>3</span>
              </button>

              {mostrarNotificaciones && (
                <div
                  className="perfil-notifications-menu"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >
                  <div className="perfil-menu-header">
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

                  <div className="perfil-notification-item">
                    <i className="blue"></i>

                    <div>
                      <strong>Reporte actualizado</strong>
                      <p>
                        El ticket TKT-0481 está en proceso.
                      </p>
                    </div>
                  </div>

                  <div className="perfil-notification-item">
                    <i className="green"></i>

                    <div>
                      <strong>Reporte resuelto</strong>
                      <p>
                        El ticket TKT-0474 fue finalizado.
                      </p>
                    </div>
                  </div>

                  <div className="perfil-notification-item">
                    <i className="orange"></i>

                    <div>
                      <strong>Reporte pendiente</strong>
                      <p>
                        El ticket TKT-0479 continúa pendiente.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="perfil-user-wrapper">
              <button
                type="button"
                className="perfil-user-button"
                onClick={(event) => {
                  event.stopPropagation();

                  setMostrarPerfilMenu(
                    (actual) => !actual
                  );

                  setMostrarNotificaciones(false);
                }}
              >
                <span className="perfil-small-avatar">
                  {fotoPerfil ? (
                    <img
                      src={fotoPerfil}
                      alt="Perfil"
                    />
                  ) : (
                    obtenerIniciales()
                  )}
                </span>

                <span className="perfil-user-information">
                  <strong>
                    {nombre} {apellido}
                  </strong>
                  <small>Usuario</small>
                </span>

                <ChevronDown size={17} />
              </button>

              {mostrarPerfilMenu && (
                <div
                  className="perfil-user-menu"
                  onClick={(event) =>
                    event.stopPropagation()
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
                    className="perfil-logout-menu-button"
                    onClick={cerrarSesion}
                  >
                    <LogOut size={16} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="perfil-content">
          <div className="perfil-card">
            <aside className="perfil-photo-column">
              <div className="perfil-photo">
                {fotoPerfil ? (
                  <img
                    src={fotoPerfil}
                    alt={`${nombre} ${apellido}`}
                  />
                ) : (
                  <span>{obtenerIniciales()}</span>
                )}
              </div>

              <label className="perfil-change-photo-button">
                <Camera size={17} />
                Cambiar foto

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={seleccionarFoto}
                />
              </label>
            </aside>

            <div className="perfil-sections">
              <form
                className="perfil-section"
                onSubmit={guardarCambios}
              >
                <div className="perfil-section-title">
                  <span>
                    <CircleUserRound size={21} />
                  </span>

                  <h2>Información personal</h2>
                </div>

                <div className="perfil-form-grid">
                  <div className="perfil-form-group">
                    <label htmlFor="perfil-nombre">
                      Nombre
                    </label>

                    <input
                      id="perfil-nombre"
                      type="text"
                      value={nombre}
                      onChange={(event) => {
                        setNombre(event.target.value);
                        setMensajePerfil("");
                      }}
                    />
                  </div>

                  <div className="perfil-form-group">
                    <label htmlFor="perfil-apellido">
                      Apellido
                    </label>

                    <input
                      id="perfil-apellido"
                      type="text"
                      value={apellido}
                      onChange={(event) => {
                        setApellido(event.target.value);
                        setMensajePerfil("");
                      }}
                    />
                  </div>

                  <div className="perfil-form-group perfil-email-group">
                    <label htmlFor="perfil-correo">
                      Correo electrónico
                    </label>

                    <div className="perfil-locked-input">
                      <input
                        id="perfil-correo"
                        type="email"
                        value={correo}
                        readOnly
                      />

                      <LockKeyhole size={16} />
                    </div>

                    <small>
                      <Info size={14} />
                      El correo no se puede modificar
                    </small>
                  </div>
                </div>

                <div className="perfil-form-action">
                  {mensajePerfil && (
                    <p
                      className={`perfil-form-message ${
                        mensajePerfil.includes(
                          "correctamente"
                        )
                          ? "success"
                          : ""
                      }`}
                    >
                      {mensajePerfil}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="perfil-primary-button"
                    disabled={guardandoPerfil}
                  >
                    <Save size={17} />

                    {guardandoPerfil
                      ? "Guardando..."
                      : "Guardar cambios"}
                  </button>
                </div>
              </form>

              <form
                className="perfil-section perfil-security-section"
                onSubmit={actualizarPassword}
              >
                <div className="perfil-section-title">
                  <span>
                    <LockKeyhole size={21} />
                  </span>

                  <h2>Seguridad</h2>
                </div>

                <div className="perfil-form-grid">
                  <div className="perfil-form-group">
                    <label htmlFor="password-actual">
                      Contraseña actual
                    </label>

                    <div className="perfil-password-input">
                      <input
                        id="password-actual"
                        type={
                          mostrarActual
                            ? "text"
                            : "password"
                        }
                        value={passwordActual}
                        onChange={(event) => {
                          setPasswordActual(
                            event.target.value
                          );
                          setMensajePassword("");
                        }}
                        placeholder="••••••••••"
                        autoComplete="current-password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setMostrarActual(
                            (actual) => !actual
                          )
                        }
                        aria-label={
                          mostrarActual
                            ? "Ocultar contraseña actual"
                            : "Mostrar contraseña actual"
                        }
                      >
                        {mostrarActual ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="perfil-form-group">
                    <label htmlFor="password-nueva">
                      Nueva contraseña
                    </label>

                    <div className="perfil-password-input">
                      <input
                        id="password-nueva"
                        type={
                          mostrarNueva
                            ? "text"
                            : "password"
                        }
                        value={passwordNueva}
                        onChange={(event) => {
                          setPasswordNueva(
                            event.target.value
                          );
                          setMensajePassword("");
                        }}
                        placeholder="••••••••••"
                        autoComplete="new-password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setMostrarNueva(
                            (actual) => !actual
                          )
                        }
                        aria-label={
                          mostrarNueva
                            ? "Ocultar nueva contraseña"
                            : "Mostrar nueva contraseña"
                        }
                      >
                        {mostrarNueva ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="perfil-form-group">
                    <label htmlFor="password-confirmar">
                      Confirmar nueva contraseña
                    </label>

                    <div className="perfil-password-input">
                      <input
                        id="password-confirmar"
                        type={
                          mostrarConfirmacion
                            ? "text"
                            : "password"
                        }
                        value={confirmarPassword}
                        onChange={(event) => {
                          setConfirmarPassword(
                            event.target.value
                          );
                          setMensajePassword("");
                        }}
                        placeholder="••••••••••"
                        autoComplete="new-password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setMostrarConfirmacion(
                            (actual) => !actual
                          )
                        }
                        aria-label={
                          mostrarConfirmacion
                            ? "Ocultar confirmación"
                            : "Mostrar confirmación"
                        }
                      >
                        {mostrarConfirmacion ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="perfil-form-action">
                  {mensajePassword && (
                    <p
                      className={`perfil-form-message ${
                        mensajePassword.includes(
                          "correctamente"
                        )
                          ? "success"
                          : ""
                      }`}
                    >
                      {mensajePassword}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="perfil-primary-button"
                    disabled={actualizandoPassword}
                  >
                    <LockKeyhole size={17} />

                    {actualizandoPassword
                      ? "Actualizando..."
                      : "Actualizar contraseña"}
                  </button>
                </div>
              </form>

              <div className="perfil-logout-section">
                <button
                  type="button"
                  onClick={cerrarSesion}
                >
                  <LogOut size={18} />
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Perfil;