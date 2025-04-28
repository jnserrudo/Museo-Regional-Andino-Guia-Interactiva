// SalaRamalTimelineDetalle.jsx
import React from 'react';
import { LineaTiempo } from "./LineaTiempo"; // Asegúrate que la ruta sea correcta
// Importa estilos si son necesarios
import '../SalaRamalC14.css';

export const SalaRamalTimelineDetalle = () => {
    // No necesitamos el botón 'Volver a opciones' aquí

  return (
    // Usamos la clase anterior para mantener estilos si existen
    <div className="ramal-timeline-vista">
        {/* Título estilizado por CSS */}
       <h3 className="ramal-timeline-titulo">
          Hitos del Ramal C-14
       </h3>
      <LineaTiempo /> {/* Renderiza tu componente de línea de tiempo */}
    </div>
  );
};