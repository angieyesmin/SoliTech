import Navbar from "../components/Navbar";
import "../css/misreportes.css";

function MisReportes() {
  return (
    <div className="layout">
     
      <Navbar />

    
      <div className="misreportes-container">

       
        <div className="misreportes-header">
          <div>
            <h1>Mis Reportes</h1>
            <p>Aquí puedes visualizar tus reportes y revisar su estado.</p>
          </div>

          <div className="misreportes-user">
            <span className="campana">🔔</span>
            <div className="avatar">MA</div>
          </div>
        </div>

        <div className="misreportes-cards">
          <div className="card">
            <h2 className="green">12</h2>
            <p>Total reportados</p>
            <span>↗ 2 este mes</span>
          </div>

          <div className="card">
            <h2 className="purple">3</h2>
            <p>En Proceso</p>
            <span>↗ Activos ahora</span>
          </div>

          <div className="card">
            <h2 className="yellow">2</h2>
            <p>Pendientes</p>
            <span>↗ Sin atender</span>
          </div>

          <div className="card">
            <h2 className="green">7</h2>
            <p>Resueltos</p>
            <span>↗ Este semestre</span>
          </div>
        </div>

        
        <div className="reportes-tabla">

          <div className="tabla-header">
            <h2>Mis Reportes</h2>

            <div className="buscador">
              🔍
              <input type="text" placeholder="Buscar reporte..." />
            </div>
          </div>

         
          <div className="fila">
            <div className="fila-left">
              <span className="punto azul"></span>
              <div>
                <h3>Falla en sistema de acceso Edificio B</h3>
                <div className="fila-info">
                  <span className="badge azul">En Proceso</span>
                  <span className="badge gris">Infraestructura</span>
                  <span>24 jun 2026</span>
                </div>
              </div>
            </div>
            <span className="folio">INC-2824</span>
          </div>

       
          <div className="fila">
            <div className="fila-left">
              <span className="punto amarillo"></span>
              <div>
                <h3>Conexión a internet inestable en laboratorio 3</h3>
                <div className="fila-info">
                  <span className="badge amarillo">Pendiente</span>
                  <span className="badge gris">Tecnología</span>
                  <span>23 jun 2026</span>
                </div>
              </div>
            </div>
            <span className="folio">INC-2823</span>
          </div>

       
          <div className="fila">
            <div className="fila-left">
              <span className="punto verde"></span>
              <div>
                <h3>Proyector dañado en aula 204</h3>
                <div className="fila-info">
                  <span className="badge verde">Resuelto</span>
                  <span className="badge gris">Equipamiento</span>
                  <span>18 jun 2026</span>
                </div>
              </div>
            </div>
            <span className="folio">INC-2821</span>
          </div>

          <div className="fila">
            <div className="fila-left">
              <span className="punto verde"></span>
              <div>
                <h3>Filtración de agua en pasillo norte</h3>
                <div className="fila-info">
                  <span className="badge verde">Resuelto</span>
                  <span className="badge gris">Mantenimiento</span>
                  <span>12 jun 2026</span>
                </div>
              </div>
            </div>
            <span className="folio">INC-2819</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default MisReportes;