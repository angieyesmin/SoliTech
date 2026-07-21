import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import "../css/Register.css";
import logo from "../assets/logo.jpeg";

function Register() {
  const navigate = useNavigate();

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!aceptaTerminos) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const datos = nombreCompleto.trim().split(" ");

    const nombre = datos[0];
    const apellido = datos.slice(1).join(" ");

    try {
      await axios.post(
        "http://localhost:3000/api/usuarios/registro",
        {
          nombre,
          apellido,
          correo,
          password,
        }
      );

      alert("Usuario registrado correctamente");

      navigate("/login");
    } catch (error: any) {
      alert(
        error.response?.data?.mensaje ||
          "Error al registrar el usuario"
      );
    }
  };

  return (
    <div className="container">
      {/* Lado izquierdo */}
      <div className="left">
        <div className="left-content">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h2>SoliTech</h2>
          </div>

          <h1>Plataforma de gestión institucional</h1>

          <p>
            Crea tu cuenta para acceder a herramientas de
            administración, reportes y recursos institucionales
            desde un solo lugar.
          </p>

          <div className="features">
            <div className="feature">
              <span>🔒</span>

              <div>
                <h4>Acceso seguro</h4>

                <p>
                  Autenticación de dos factores disponible
                </p>
              </div>
            </div>

            <div className="feature">
              <span>👥</span>

              <div>
                <h4>Gestión de usuarios</h4>

                <p>
                  Administra roles y permisos fácilmente
                </p>
              </div>
            </div>

            <div className="feature">
              <span>📊</span>

              <div>
                <h4>Reportes en tiempo real</h4>

                <p>
                  Visualiza métricas y estadísticas al instante
                </p>
              </div>
            </div>
          </div>

          <p className="footer">© 2026 SoliTech</p>
        </div>
      </div>

      {/* Lado derecho */}
      <div className="right">
        <div className="form-container">
          <div className="form-header">
            <img src={logo} alt="logo" />

            <h2>SoliTech</h2>

            <p>Sistema de Gestión Institucional</p>
          </div>

          <h3>Crear cuenta nueva</h3>

          <p className="subtitle">
            Ingresa los siguientes datos para registrarte
          </p>

          <form onSubmit={handleSubmit}>
            <label>Nombre completo</label>

            <input
              type="text"
              placeholder="Nombre completo"
              value={nombreCompleto}
              onChange={(e) =>
                setNombreCompleto(e.target.value)
              }
              required
            />

            <label>Correo electrónico</label>

            <input
              type="email"
              placeholder="usuario@institucion.edu"
              value={correo}
              onChange={(e) =>
                setCorreo(e.target.value)
              }
              required
            />

            <div className="row">
              <div>
                <label>Contraseña</label>

                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label>Confirmar contraseña</label>

                <input
                  type="password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  required
                />
              </div>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                checked={aceptaTerminos}
                onChange={(e) =>
                  setAceptaTerminos(
                    e.target.checked
                  )
                }
              />

              <span>
                Acepto los{" "}
                <a href="#">términos</a> y la{" "}
                <a href="#">
                  política de privacidad
                </a>
              </span>
            </div>

            <button type="submit">
              Crear cuenta
            </button>
          </form>

          <p className="login-link">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;