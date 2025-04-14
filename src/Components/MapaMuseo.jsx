import React from 'react';
import '../MapaMuseo.css'; // Importa el CSS

export const MapaMuseo = () => {
  return (
    // Contenedor PADRE: ocupa toda la pantalla y centra al hijo
    <div className="mapa-page-wrapper">
      {/* Contenedor HIJO: el que tiene el mapa y es más pequeño */}
      <div
        className="mapa-museo-container"
        role="img"
        aria-label="Mapa interactivo del Museo Regional Andino"
      >
        {/* Aquí podrías poner elementos SOBRE el mapa si quisieras */}
         {/* <h1 className="mapa-museo-title">Mapa del Museo</h1> */}
      </div>
    </div>
  );
};