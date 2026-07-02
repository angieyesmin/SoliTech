import React, { useState } from 'react';
import '../css/login.css';

// Iconos lado izquierdo
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const LogoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

// Iconos formulario
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-wrapper">
      {/* Panel izquierdo - Info */}
      <div className="solitech-container">
        <div className="background-shapes">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>

        <div className="content">
          <header className="header">
            <div className="logo">
              <div className="logo-icon">
                <LogoIcon />
              </div>
              <span className="logo-text">SoliTech</span>
            </div>
          </header>

          <main className="main-content">
            <h1 className="title">
              Plataforma de gestión <br /> institucional
            </h1>
            <p className="subtitle">
              Accede a tus herramientas de administración, reportes y recursos institucionales desde un solo lugar.
            </p>
          </main>

          <section className="features">
            <div className="feature-item">
              <div className="feature-icon">
                <ShieldIcon />
              </div>
              <div className="feature-text">
                <h3 className="feature-title">Acceso seguro</h3>
                <p className="feature-desc">Autenticación de dos factores disponible</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <UsersIcon />
              </div>
              <div className="feature-text">
                <h3 className="feature-title">Gestión de usuarios</h3>
                <p className="feature-desc">Administra roles y permisos fácilmente</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <ChartIcon />
              </div>
              <div className="feature-text">
                <h3 className="feature-title">Reportes en tiempo real</h3>
                <p className="feature-desc">Visualiza métricas y estadísticas al instante</p>
              </div>
            </div>
          </section>

          <footer className="footer">
            <p>© 2026 SoliTech · Todos los derechos reservados</p>
          </footer>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <div className="login-logo">
              <LogoIcon />
            </div>
            <h2 className="login-brand">SoliTech</h2>
            <p className="login-system">Sistema de Gestión Institucional</p>
          </div>

          <div className="login-card">
            <h3 className="login-title">Iniciar sesión</h3>
            <p className="login-subtitle">Ingresa tus credenciales para continuar</p>

            <form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="usuario@institucion.edu" 
                />
              </div>

              <div className="form-group">
                <div className="password-label-row">
                  <label htmlFor="password">Contraseña</label>
                  <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
                </div>
                <div className="password-input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Mostrar contraseña"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div className="form-group checkbox-group">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Recordar sesión</label>
              </div>

              <button type="submit" className="btn-login">
                <LockIcon />
                Iniciar Sesión
              </button>

              <div className="divider">
                <span>¿Primera vez aquí?</span>
              </div>

              <button type="button" className="btn-register">
                Crear una cuenta nueva
              </button>
            </form>
          </div>

          <p className="terms">
            Al ingresar, aceptas los <a href="#">términos de uso</a> y la <a href="#">política de privacidad</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;