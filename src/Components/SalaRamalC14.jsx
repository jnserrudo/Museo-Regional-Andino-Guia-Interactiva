// SalaRamalC14.jsx (Quitando estilo inline y usando clases)
import { useState } from "react";
import { LineaTiempo } from "./LineaTiempo";
// import { Button } from "antd"; // Descomenta si usas Ant Design
import { ArrowLeftOutlined } from "@ant-design/icons";
import '../SalaRamalC14.css'; // <<<--- Importa el CSS principal de la sala

export const SalaRamalC14 = () => {
  const [view, setView] = useState('initial');

  const handleGoBack = () => { setView('initial'); };

  const renderContent = () => {
    switch (view) {
      case 'tren':
        return (
          // Añadimos clase específica para esta vista
          <div className="ramal-tren-vista">
            {/* Mantenemos el contenedor del botón volver */}
            <div className="ramal-back-button-container">
              <button className="ramal-back-button" onClick={handleGoBack}>
                <ArrowLeftOutlined style={{ marginRight: '8px' }} /> Volver a opciones
              </button>
            </div>

            {/* Título ahora estilizado por CSS */}
            <h3 className="ramal-tren-titulo">
              El Ramal C-14: Historia y Proeza Ingenieril
            </h3>

            <figure className="ramal-tren-image-container">
              <img
                src={`${import.meta.env.BASE_URL}tren-a-las-nubes.jfif`} // Asegúrate que esta ruta es correcta
                alt="Construcción del Ramal C-14"
                className="ramal-tren-image"
                loading="lazy"
              />
              {/* Podríamos añadir un figcaption con datos clave */}
              <figcaption className="ramal-tren-image-caption">
                Una obra monumental atravesando la geografía andina.
              </figcaption>
            </figure>

            {/* Contenedor principal para la descripción */}
            <div className="ramal-tren-description-wrapper">
              {/* Sección 1: Descripción monumental */}
              <section className="ramal-section">
                <h4 className="ramal-section-title">La Gran Obra</h4>
                {/* Usamos clases para párrafos */}
                <p className="ramal-paragraph">
                  <strong>Una monumental empresa a más de 3500 metros de altura y a pura pala, picó, barreta, carretilla, dinamita y camiones pequeños.</strong>
                </p>
                {/* Datos clave en lista o div */}
                <div className="ramal-datos-clave">
                  <p className="ramal-paragraph">El Ramal que demandó el sacrificado trabajo a pala y picó de 1000 hombres para cubrir con rieles 171 km de recorrido sobre territorio argentino hasta Socompa, con:</p>
                  <ul>
                    <li>1400 curvas</li>
                    <li>31 puentes</li>
                    <li>21 túneles</li>
                    <li>13 viaductos</li>
                    <li>2 rulos</li>
                    <li>2 zig-zag</li>
                    <li>9 cobertizos</li>
                  </ul>
                </div>
                <p className="ramal-paragraph">
                  Se convirtió en una oferta turística importante que durante las últimas décadas del S. XX se orientó crecientemente al mercado internacional con el recorrido turístico del Tren a las Nubes.
                </p>
                <div className="ramal-signature">
                  <p>Roma César, Máxima Marítima Cuentas</p>
                </div>
              </section>

              {/* Sección 2: Cronología histórica */}
              <section className="ramal-section">
                <h4 className="ramal-section-title">Línea de Tiempo del Proyecto</h4>
                 {/* Contenedor para la línea de tiempo simplificada */}
                <div className="ramal-timeline-simplified">
                    <div className="ramal-timeline-item">
                        <h5 className="ramal-timeline-year">1889</h5>
                        <p className="ramal-timeline-text">Se incluyen proyectos comunes por un segundo ferrocarril entre Salta y Antofagasta.</p>
                    </div>
                    <div className="ramal-timeline-item">
                        <h5 className="ramal-timeline-year">1905</h5>
                        <p className="ramal-timeline-text">Reconocimiento de la oportunidad ferroviaria y su conexión fronteriza.</p>
                    </div>
                    <div className="ramal-timeline-item">
                        <h5 className="ramal-timeline-year">1921</h5>
                        <p className="ramal-timeline-text">Impulso a la obra de San Antonio de los Cobres y propuestas de actualización.</p>
                    </div>
                    <div className="ramal-timeline-item">
                        <h5 className="ramal-timeline-year">1928</h5>
                        <p className="ramal-timeline-text">Conexión de San Antonio con los Cabros de San José.</p>
                    </div>
                    <div className="ramal-timeline-item">
                        <h5 className="ramal-timeline-year">1930-1932</h5>
                        <p className="ramal-timeline-text">Planes nacionales de seguridad y desarrollo para la zona.</p>
                    </div>
                    <div className="ramal-timeline-item">
                        <h5 className="ramal-timeline-year">1948</h5>
                        <p className="ramal-timeline-text">Revisión del estudio y enfoque gubernamental en el desarrollo industrial y seguridad.</p>
                    </div>
                </div>
                <div className="ramal-signature">
                  <p>Roma César, Máxima Marítima Cuentas</p>
                </div>
              </section>
            </div> {/* Fin description-wrapper */}
          </div> // Fin ramal-tren-vista
        );
      case 'timeline':
        return (
          <div className="ramal-timeline-vista"> {/* Clase específica */}
             <div className="ramal-back-button-container">
                 <button className="ramal-back-button" onClick={handleGoBack}>
                     <ArrowLeftOutlined style={{marginRight: '8px'}} /> Volver a opciones
                 </button>
             </div>
             <h3 className="ramal-timeline-titulo"> {/* Título estilizado por CSS */}
                Hitos del Ramal C-14
             </h3>
            <LineaTiempo /> {/* Asume que LineaTiempo tiene sus propios estilos */}
          </div>
        );
      case 'initial':
      default:
        return (
          <div className="ramal-initial-view">
            <p className="ramal-intro-text">
                El Ramal C-14 no es solo una vía férrea, es una historia de visión, esfuerzo y conexión a través de los Andes. Explora sus dos facetas principales:
            </p>
            <div className="ramal-choices-container">
              <div className="ramal-choice-card" onClick={() => setView("tren")} tabIndex="0" role="button">
                <span className="ramal-choice-icon" aria-hidden="true">🚂</span>
                <div className="ramal-choice-info">
                  <h3>Tren a las Nubes</h3>
                  <p>Descubre la historia y la proeza ingenieril.</p>
                </div>
              </div>
              <div className="ramal-choice-card" onClick={() => setView("timeline")} tabIndex="0" role="button">
                <span className="ramal-choice-icon" aria-hidden="true">📜</span>
                <div className="ramal-choice-info">
                  <h3>Línea de Tiempo</h3>
                  <p>Sigue los hitos clave de su construcción.</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <article className="sala-ramal-container">
      {/* Título estilizado por CSS */}
      <h2 className="ramal-main-title">RAMAL C-14 Y TREN A LAS NUBES</h2>
      <div className="ramal-content-area"> {/* Wrapper para contenido */}
        {renderContent()}
      </div>
    </article>
  );
};