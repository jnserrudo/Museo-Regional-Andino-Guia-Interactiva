import { useState } from "react";
import { LineaTiempo } from "./LineaTiempo";
import { Button } from "antd"; // O tu componente Button si usas uno
import { ArrowLeftOutlined } from "@ant-design/icons"; // O icono similar
import '../SalaRamalC14.css'; // <<<--- Importa el CSS principal de la sala

export const SalaRamalC14 = () => {
  // Estado para controlar la vista: 'initial', 'tren', 'timeline'
  const [view, setView] = useState('initial');

  // Función para volver a la vista inicial
  const handleGoBack = () => {
    setView('initial');
  };

  // Renderizado condicional basado en el estado 'view'
  const renderContent = () => {
    switch (view) {
      case 'tren':
        return (
          <div className="ramal-tren-content">
            {/* Contenedor para el botón Volver */}
             <div className="ramal-back-button-container">
                <button className="ramal-back-button" onClick={handleGoBack}>
                    <ArrowLeftOutlined style={{marginRight: '8px'}} /> Volver a opciones
                </button>
            </div>
            {/* Título específico si quieres */}
             <h3 style={{textAlign: 'center', color: 'var(--primary-color)', margin: '2rem 0 1.5rem 0', fontSize: '1.8rem'}}>
                El Tren a las Nubes
             </h3>
            <figure className="ramal-tren-image-container">
              <img
                src={`${import.meta.env.BASE_URL}tren-a-las-nubes.jfif`} // Asegura la ruta correcta
                alt="Tren a las Nubes cruzando un viaducto"
                className="ramal-tren-image"
              />
            </figure>
            <p className="ramal-tren-description">
              El Tren a las Nubes es uno de los ferrocarriles más altos del mundo, un ícono turístico de Argentina que recorre paisajes espectaculares de la Puna salteña. Su trazado sigue en gran parte al histórico Ramal C-14, una proeza de ingeniería diseñada para conectar el Noroeste argentino con Chile a través de la Cordillera de los Andes. El viaje atraviesa quebradas coloridas, valles silenciosos y asciende a más de 4.200 metros sobre el nivel del mar, culminando en el imponente Viaducto La Polvorilla, símbolo indiscutible de esta aventura ferroviaria.
            </p>
             {/* Puedes añadir más párrafos o secciones aquí */}
          </div>
        );
      case 'timeline':
        return (
          <div className="ramal-timeline-content">
             {/* Contenedor para el botón Volver */}
             <div className="ramal-back-button-container">
                 <button className="ramal-back-button" onClick={handleGoBack}>
                     <ArrowLeftOutlined style={{marginRight: '8px'}} /> Volver a opciones
                 </button>
             </div>
              {/* Título específico si quieres */}
             <h3 style={{textAlign: 'center', color: 'var(--primary-color)', margin: '2rem 0 1rem 0', fontSize: '1.8rem'}}>
                Hitos del Ramal C-14
             </h3>
            <LineaTiempo />
          </div>
        );
      // Vista inicial por defecto
      case 'initial':
      default:
        return (
          <div className="ramal-initial-view">
             {/* Texto introductorio opcional */}
            <p className="ramal-intro-text">
                El Ramal C-14 no es solo una vía férrea, es una historia de visión, esfuerzo y conexión a través de los Andes. Explora sus dos facetas principales:
            </p>
            <div className="ramal-choices-container">
              {/* Opción 1: Tren */}
              <div className="ramal-choice-card" onClick={() => setView("tren")} tabIndex="0" role="button">
                <span className="ramal-choice-icon" aria-hidden="true">🚂</span>
                <div className="ramal-choice-info">
                  <h3>Tren a las Nubes</h3>
                  <p>Descubre el famoso recorrido turístico y sus paisajes.</p>
                </div>
              </div>
              {/* Opción 2: Línea de Tiempo */}
              <div className="ramal-choice-card" onClick={() => setView("timeline")} tabIndex="0" role="button">
                <span className="ramal-choice-icon" aria-hidden="true">📜</span>
                <div className="ramal-choice-info">
                  <h3>Línea de Tiempo</h3>
                  <p>Conoce la historia y construcción del Ramal C-14.</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // Renderizado del componente principal
  return (
    // Contenedor principal de la sala
    <article className="sala-ramal-container">
      {/* Título principal consistente con otras salas */}
      <h2 className="sala-contenido-titulo-principal">RAMAL C-14 Y TREN A LAS NUBES</h2>
      {/* Renderiza el contenido según la vista seleccionada */}
      {renderContent()}
    </article>
  );
};