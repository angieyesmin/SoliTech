import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/reporte.css";

function ReportarIncidentes() {
  const navigate = useNavigate();
  const [prioridad, setPrioridad] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/mis-reportes");
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="reportar-container">
      <aside className="reportar-sidebar">
        <h2 className="logo-text">SoliTech</h2>  {/* ← logo-text */}
        <ul>
          <li>Inicio</li>
          <li className="active">Reportar Incidencia</li>
          <li onClick={() => navigate("/mis-reportes")}>Mis Reportes</li>
        </ul>
      </aside>

      <header className="reportar-header">
        <div className="header-left">
          <h1>Reportar Incidencia</h1>
          <p>Completa el formulario para registrar tu solicitud</p>
        </div>
        <div className="header-right">
          <span className="bell">🔔</span>
          <div className="avatar">MA</div>
        </div>
      </header>

      <main className="reportar-main">
        <div className="container-form">
          <div className="steps">
            <div className="step active">
              <div className="circle">1</div>
              Detalles
            </div>
            <div className="step active">
              <div className="circle">2</div>
              Ubicación
            </div>
            <div className="step">
              <div className="circle">3</div>
              Evidencia
            </div>
          </div>

          <form className="reportar-card" onSubmit={handleSubmit}>  {/* ← reportar-card */}
            <h2>Nueva incidencia</h2>
            <small>Campos obligatorios *</small>

            <label>Tipo de recurso *</label>
            <select required>
              <option value="">Selecciona una opción</option>
              <option>Equipo</option>
              <option>Software</option>
              <option>Red</option>
            </select>

            <label>Nivel de prioridad</label>
            <div className="prioridad">
              <div
                className={`prioridad-card alta ${prioridad === "alta" ? "active" : ""}`}
                onClick={() => setPrioridad("alta")}
              >
                🔴 Alta
              </div>
              <div
                className={`prioridad-card media ${prioridad === "media" ? "active" : ""}`}
                onClick={() => setPrioridad("media")}
              >
                🟡 Media
              </div>
              <div
                className={`prioridad-card baja ${prioridad === "baja" ? "active" : ""}`}
                onClick={() => setPrioridad("baja")}
              >
                🟢 Baja
              </div>
            </div>

            <label>Descripción *</label>
            <textarea placeholder="Describe el problema..." required />

            <label>Ubicación *</label>
            <div className="row-fields">  {/* ← row-fields */}
              <input type="text" placeholder="Ej. Edificio A, Laboratorio 3" required />
              <input type="text" placeholder="Referencia adicional (aula, piso, área)" />
            </div>

            <label>Adjuntar evidencia</label>
            <div className="file-upload" onClick={handleClick}>
              <div className="upload-icon">📁</div>
              <p className="upload-title">Arrastra y suelta archivos aquí</p>
              <p className="upload-sub">o haz clic para seleccionar desde tu dispositivo</p>
              <button type="button" className="btn-upload">Seleccionar archivo</button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden />
              {fileName && <p className="file-name">Archivo: {fileName}</p>}
            </div>

            <button type="submit" className="btn-enviar">Enviar Reporte</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ReportarIncidentes;