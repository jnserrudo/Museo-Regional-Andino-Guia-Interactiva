import React from "react";
import "../lineaTiempo.css"; // <<<--- Importa el CSS actualizado

const eventos = [
  { año: "1888", descripcion: "Proyección inicial de un trazado ferroviario transandino que uniría Antofagasta (Chile) con Salta (Argentina)." },
  { año: "1905", descripcion: "El Congreso de la Nación Argentina sanciona la Ley N° 4693, impulsada por el diputado salteño Dr. Ángel M. Ovejero, que dispone estudios para un ferrocarril a Chile por la Quebrada del Toro." },
  { año: "1921", descripcion: "Bajo la presidencia de Hipólito Yrigoyen, se retoma el proyecto y se ordena la construcción del ramal C-14, bajo la dirección del ingeniero estadounidense Richard Maury." },
  { año: "1922", descripcion: "Se firma en Santiago de Chile un protocolo entre Argentina y Chile comprometiéndose a la construcción de ferrocarriles que los vinculen." },
  { año: "1924", descripcion: "Tras avances significativos, incluyendo la llegada a Puerta Tastil, la obra se paraliza temporalmente por falta de fondos." },
  { año: "1929", descripcion: "Se completa el tramo clave entre Salta y San Antonio de los Cobres, superando enormes desafíos de ingeniería y altitud." },
  { año: "1930-32", descripcion: "Construcción del icónico Viaducto La Polvorilla, una obra maestra de 224 metros de longitud y 63 metros de altura, diseñado por Maury." },
  { año: "1948", descripcion: "Finalmente, el 17 de enero, se unen los rieles argentinos y chilenos en Socompa, completando la conexión ferroviaria transandina tras décadas de esfuerzo." },
  { año: "1972", descripcion: "Se inaugura oficialmente el servicio turístico conocido como \"Tren a las Nubes\", aprovechando la espectacularidad del Ramal C-14." },
  // Puedes añadir más eventos relevantes
];

export const LineaTiempo = () => {
  return (
    <div className="timeline-container">
      {eventos.map((evento, index) => (
        // Añade animación escalonada si quieres
        <div
          key={index}
          className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          style={{ animationDelay: `${index * 0.15}s` }} // Animación suave
        >
          {/* Marcador (se estiliza con ::after) */}
          <div className="timeline-marker"></div>
          {/* Contenido del evento */}
          <div className="content">
            {/* Año destacado */}
            <span className="timeline-year">{evento.año}</span>
            {/* Descripción */}
            <p className="timeline-description">{evento.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
};