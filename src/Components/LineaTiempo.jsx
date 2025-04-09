import React from "react";
import "../lineaTiempo.css";

const eventos = [
  { año: "1888", descripcion: "Se proyectó un trazado que uniría Antofagasta con Salta." },
  { año: "1905", descripcion: "El Congreso de la Nación Argentina sanciona la Ley N° 4693..." },
  { año: "1921", descripcion: "Hipólito Yrigoyen impulsa y ordena la construcción..." },
  { año: "1922", descripcion: "Se firmó en Santiago de Chile un protocolo..." },
  { año: "1924", descripcion: "Se paraliza la obra." },
  { año: "1929", descripcion: "Se terminó el tramo entre Salta y San Antonio de los Cobres." },
  { año: "1930 - 1932", descripcion: "Se construyó el viaducto La Polvorilla, con una longitud de 224 metros..." },
  { año: "1948", descripcion: "Se unieron los trazados de Argentina con los de Chile..." },
];

export const LineaTiempo = () => {
  return (
    <div className="timeline-container">
      {eventos.map((evento, index) => (
        <div key={index} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
          <div className="content">
            <h2>{evento.año}</h2>
            <p>{evento.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
