import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Shield, Users, BarChart3 } from 'lucide-react';
import '../css/login.css';
import logo from '../assets/logo.jpeg'; // Cambia esta ruta por la de tu logo

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  const handleRegisterClick = () => {
    window.location.href = '/register';
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="left-content">
          <div className="brand">
            <div className="brand-logo">
              <img src={logo} alt="Logo" />
            </div>
            <span className="brand-name">SoliTech</span>
          </div>

          <div className="hero-text">
            <h1>Plataforma de gestión institucional</h1>
            <p>
              Accede a tus herramientas de administración, reportes y recursos 
              institucionales desde un solo lugar.
            </p>
          </div>

          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">
                <Shield size={20} />
              </div>
              <div>
                <h3>Acceso seguro</h3>
                <p>Autenticación de dos factores disponible</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <Users size={20} />
              </div>
              <div>
                <h3>Gestión de usuarios</h3>
                <p>Administra roles y permisos fácilmente</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <BarChart3 size={20} />
              </div>
              <div>
                <h3>Reportes en tiempo real</h3>
                <p>Visualiza métricas y estadísticas al instante</p>
              </div>
            </div>
          </div>

          <footer className="left-footer">
            © 2026 SoliTech · Todos los derechos reservados
          </footer>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card-wrapper">
          <div className="login-header">
            <div className="logo-box">
              <img src={logo} alt="Logo" />
            </div>
            <h2>SoliTech</h2>
            <p>Sistema de Gestión Institucional</p>
          </div>

          <div className="login-card">
            <div className="card-header">
              <h3>Iniciar sesión</h3>
              <p>Ingresa tus credenciales para continuar</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  placeholder="usuario@institucion.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <div className="password-label">
                  <label htmlFor="password">Contraseña</label>
                  <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
                </div>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span>Recordar sesión</span>
                </label>
              </div>

              <button type="submit" className="btn-primary">
                <Lock size={18} />
                Iniciar Sesión
              </button>
            </form>

            <button 
              type="button"
             className="btn-secondary"
             onClick={handleRegisterClick}>
             Crear una cuenta nueva 
            </button>
          </div>

          <p className="terms">
            Al ingresar, aceptas los <a href="#">términos de uso</a> y la <a href="#">política de privacidad</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;