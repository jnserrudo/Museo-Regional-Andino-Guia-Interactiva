// SalaRamalTrenDetalle.jsx
import React, { useState } from "react";
// Importa los estilos específicos si los tenías en SalaRamalC14.css
// Asegúrate de que las clases usadas aquí estén definidas (ej. en SalaRamalC14.css o uno nuevo)
import "../SalaRamalC14.css"; // O un CSS específico si prefieres

import "./SalaRamalGaleria.css"; // <<<--- NUEVO CSS para la galería específica

import { ArrowLeftOutlined } from "@ant-design/icons";


import ReactDOM from 'react-dom'; // <--- IMPORTANTE: Importa ReactDOM


export const SalaRamalTrenDetalle = () => {
  // No necesitamos el botón 'Volver a opciones' aquí,
  // porque el componente Sala ya añade un botón 'Volver' general.
  
  // --- Fin Estado y Handlers Modal ---

  return (
    // Añadimos clase específica para esta vista
    <div className="ramal-tren-vista">
      {/* Mantenemos el contenedor del botón volver */}
      {/* <div className="ramal-back-button-container">
      <button className="ramal-back-button" onClick={handleGoBack}>
        <ArrowLeftOutlined style={{ marginRight: '8px' }} /> Volver a opciones
      </button>
    </div>
 */}
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
            <strong>
              Una monumental empresa a más de 3500 metros de altura y a pura
              pala, picó, barreta, carretilla, dinamita y camiones pequeños.
            </strong>
          </p>
          {/* Datos clave en lista o div */}
          <div className="ramal-datos-clave">
            <p className="ramal-paragraph">
              El Ramal que demandó el sacrificado trabajo a pala y picó de 1000
              hombres para cubrir con rieles 171 km de recorrido sobre
              territorio argentino hasta Socompa, con:
            </p>
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
            Se convirtió en una oferta turística importante que durante las
            últimas décadas del S. XX se orientó crecientemente al mercado
            internacional con el recorrido turístico del Tren a las Nubes.
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
              <p className="ramal-timeline-text">
                Se incluyen proyectos comunes por un segundo ferrocarril entre
                Salta y Antofagasta.
              </p>
            </div>
            <div className="ramal-timeline-item">
              <h5 className="ramal-timeline-year">1905</h5>
              <p className="ramal-timeline-text">
                Reconocimiento de la oportunidad ferroviaria y su conexión
                fronteriza.
              </p>
            </div>
            <div className="ramal-timeline-item">
              <h5 className="ramal-timeline-year">1921</h5>
              <p className="ramal-timeline-text">
                Impulso a la obra de San Antonio de los Cobres y propuestas de
                actualización.
              </p>
            </div>
            <div className="ramal-timeline-item">
              <h5 className="ramal-timeline-year">1928</h5>
              <p className="ramal-timeline-text">
                Conexión de San Antonio con los Cabros de San José.
              </p>
            </div>
            <div className="ramal-timeline-item">
              <h5 className="ramal-timeline-year">1930-1932</h5>
              <p className="ramal-timeline-text">
                Planes nacionales de seguridad y desarrollo para la zona.
              </p>
            </div>
            <div className="ramal-timeline-item">
              <h5 className="ramal-timeline-year">1948</h5>
              <p className="ramal-timeline-text">
                Revisión del estudio y enfoque gubernamental en el desarrollo
                industrial y seguridad.
              </p>
            </div>
          </div>
          <div className="ramal-signature">
            <p>Roma César, Máxima Marítima Cuentas</p>
          </div>
        </section>
      </div>{" "}
      {/* Fin description-wrapper */}






      

 {/* --- Modal Renderizado con Portal --- */}
 {selectedImage && ReactDOM.createPortal( // <--- USA PORTAL
          <div className="ramalc14-modal-overlay" onClick={closeModal}>
              <div className="ramalc14-modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="ramalc14-modal-close" onClick={closeModal} aria-label="Cerrar imagen">×</button>
                  <figure className="ramalc14-modal-figure">
                      <img
                          src={`${import.meta.env.BASE_URL}/ramalc14/${selectedImage.nombreArchivo}`}
                          alt={selectedImage.nombre}
                          className="ramalc14-modal-image"
                      />
                      <figcaption className="ramalc14-modal-caption">
                          {selectedImage.nombre.replace(/_/g, ' ').replace(/-+/g, ' ')}
                      </figcaption>
                  </figure>
              </div>
          </div>,
          document.body // <--- Lo renderiza como hijo directo del body
      )}
      {/* --- Fin Modal --- */}

    </div> // Fin ramal-tren-vista
  );
};
