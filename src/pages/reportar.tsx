import { useState } from "react";
import Navbar from "../components/Navbar";
import "../css/reportar.css";

function Reportar() {
  const [prioridad, setPrioridad] = useState("media");
  const [paso, setPaso] = useState(1);

  const siguientePaso = () => {
    if (paso < 3) {
      setPaso(paso + 1);
    }
  };

  const anteriorPaso = () => {
    if (paso > 1) {
      setPaso(paso - 1);
    }
  };

  return (
    <div className="layout">
      <Navbar />

      <div className="reportar-container">
        <div className="reportar-header">
          <div>
            <h2>Reportar Incidencia</h2>
            <p>Completa el formulario para registrar tu solicitud</p>
          </div>

          <div className="usuario">
            <span>MA</span>
          </div>
        </div>

        <div className="steps">
          <div className={`step ${paso >= 1 ? "active" : ""}`}>
            <div className="circle">1</div>
            <span>Detalles</span>
          </div>

          <div className={`line ${paso >= 2 ? "active-line" : ""}`}></div>

          <div className={`step ${paso >= 2 ? "active" : ""}`}>
            <div className="circle">2</div>
            <span>Ubicación</span>
          </div>

          <div className={`line ${paso >= 3 ? "active-line" : ""}`}></div>

          <div className={`step ${paso >= 3 ? "active" : ""}`}>
            <div className="circle">3</div>
            <span>Evidencia</span>
          </div>
        </div>

        <div className="contenido-formulario">
          <div className="card-incidencia">
            <div className="card-header">
              <div className="icono-card">
                {paso === 1 && "📝"}
                {paso === 2 && "📍"}
                {paso === 3 && "📎"}
              </div>

              <div>
                <h3>
                  {paso === 1 && "Detalles de la incidencia"}
                  {paso === 2 && "Ubicación de la incidencia"}
                  {paso === 3 && "Evidencia de la incidencia"}
                </h3>
                <p>Todos los campos marcados con * son obligatorios</p>
              </div>
            </div>

            {paso === 1 && (
              <>
                <div className="form-grid">
                  <div className="grupo">
                    <label>
                      Tipo de recurso <span>*</span>
                    </label>

                    <select>
                      <option>Selecciona una opción</option>
                      <option>Computadora</option>
                      <option>Laptop</option>
                      <option>Impresora</option>
                      <option>Proyector</option>
                      <option>Internet</option>
                      <option>Otro</option>
                    </select>
                  </div>

                  <div className="grupo">
                    <label>Nivel de prioridad</label>

                    <div className="prioridades">
                      <button
                        type="button"
                        className={`prioridad ${
                          prioridad === "alta" ? "alta" : ""
                        }`}
                        onClick={() => setPrioridad("alta")}
                      >
                        🔴 Alta
                      </button>

                      <button
                        type="button"
                        className={`prioridad ${
                          prioridad === "media" ? "media" : ""
                        }`}
                        onClick={() => setPrioridad("media")}
                      >
                        🟡 Media
                      </button>

                      <button
                        type="button"
                        className={`prioridad ${
                          prioridad === "baja" ? "baja" : ""
                        }`}
                        onClick={() => setPrioridad("baja")}
                      >
                        🟢 Baja
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grupo">
                  <label>
                    Descripción de la incidencia <span>*</span>
                  </label>

                  <textarea
                    rows={6}
                    placeholder="Describe con detalle qué ocurrió, cuándo comenzó y cómo afecta las actividades..."
                  ></textarea>

                  <div className="contador">0 / 500</div>
                </div>
              </>
            )}

            {paso === 2 && (
              <div className="grupo">
                <label>
                  Ubicación física <span>*</span>
                </label>

                <div className="ubicacion">
                  <input
                    type="text"
                    placeholder="Ej. Edificio A, Laboratorio 3"
                  />

                  <input
                    type="text"
                    placeholder="Referencia adicional, aula, piso o área"
                  />
                </div>
              </div>
            )}

            {paso === 3 && (
              <div className="grupo">
                <label>
                  Adjuntar evidencia
                  <small> Opcional · máx. 4 archivos</small>
                </label>

                <div className="upload">
                  <div className="upload-icon">⬆</div>

                  <h4>Arrastrar archivos aquí</h4>

                  <p>o selecciona desde tu dispositivo</p>

                  <span>PNG, JPG, PDF. Máx. 10 MB por archivo</span>

                  <br />

                  <input className="file-input" type="file" multiple />
                </div>
              </div>
            )}

            <div className="acciones">
              {paso > 1 && (
                <button className="btn-cancelar" onClick={anteriorPaso}>
                  Regresar
                </button>
              )}

              {paso < 3 ? (
                <button className="btn-continuar" onClick={siguientePaso}>
                  Continuar
                </button>
              ) : (
                <button className="btn-continuar">
                  Enviar reporte
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reportar;