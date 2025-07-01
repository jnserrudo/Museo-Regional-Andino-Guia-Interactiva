// src/components/Salas/SalaHistoria.jsx

import React from 'react';
// Importamos el CSS de Geología para reutilizar los estilos base de títulos y párrafos
import "./SalaGeologia.css"; 
// Y un CSS específico para Historia si necesitamos algún ajuste
import "../SalaHistoria.css";
import { useRegisterText } from "../Contexts/SpeechContext"; // <-- Ajusta la ruta si es necesario

const salaHistoriaText = `
HISTORIA.
El dominio español y el nacimiento del Virreinato.
Durante el siglo XVI, los españoles avanzaron en la colonización de América. En 1776 se creó el Virreinato del Río de la Plata, que incluía los actuales territorios de Argentina, Bolivia, Paraguay y Uruguay. Su capital fue Buenos Aires.
Para organizar su gobierno, el virreinato se dividió en intendencias como Buenos Aires, Córdoba del Tucumán, Salta del Tucumán y Potosí, y gobernaciones militares como Montevideo y Misiones. Estas estructuras facilitaron la administración y el control de una vasta región con gran diversidad cultural y geográfica.

La evangelización y la vida en la Puna.
Junto con los conquistadores llegaron órdenes religiosas como los dominicos, franciscanos y jesuitas. Su misión era cristianizar a los pueblos originarios y, al mismo tiempo, integrarlos en nuevas formas de vida organizadas.
Los jesuitas se destacaron por su acción en regiones como la Puna andina, donde trabajaron junto a comunidades kollas en la explotación de minas como Incahuasi y Cobres. Aunque fueron expulsados en 1767 por orden del rey Carlos III, su legado perduró a través de las prácticas religiosas, económicas y culturales que ayudaron a establecer.

De las Provincias Unidas a la República Argentina.
Tras el proceso independentista iniciado en 1810, las Provincias Unidas del Río de la Plata comenzaron a organizarse como entidades autónomas. Entre 1813 y 1834, se consolidaron catorce provincias, cada una con su propia constitución. A pesar de esa autonomía, mantenían un débil vínculo confederal.
La sanción de la Constitución Nacional en 1853 fue clave para organizar políticamente el país. En 1862, con la incorporación de Buenos Aires, se formó oficialmente la República Argentina, integrada por catorce provincias bajo un marco común.

Territorios Nacionales y expansión del Estado.
A fines del siglo XIX, el gobierno nacional impulsó una política de expansión territorial. En 1884 se crearon los Territorios Nacionales, zonas aún no organizadas como provincias, que fueron divididas en gobernaciones: Chaco, Formosa, Pampa, Chubut, entre otras.
En el año 1900, durante la presidencia de Julio A. Roca, se creó el Territorio Nacional de Los Andes, que abarcaba parte de la región puneña. Su creación respondió al interés estratégico en zonas de frontera y a la importancia de sus recursos naturales, como el litio y los boratos.
`;

// --- COMPONENTE PRINCIPAL DE LA SALA ---
export const SalaHistoria = () => {
  // --- 2. USA EL HOOK PARA REGISTRAR EL TEXTO ---
  useRegisterText(salaHistoriaText);

  return (
    <article className="sala-contenido-container"> {/* Usamos la clase base para consistencia */}
      
      <h2 className="sala-contenido-titulo-principal">HISTORIA</h2>

      {/* --- Primer Bloque: La Colonia --- */}
      <section className="historia-bloque">
        <h3 className="sala-contenido-subtitulo">El dominio español y el nacimiento del Virreinato</h3>
        <p className="sala-contenido-parrafo">
          Durante el siglo XVI, los españoles avanzaron en la colonización de América. En 1776 se creó el Virreinato del Río de la Plata, que incluía los actuales territorios de Argentina, Bolivia, Paraguay y Uruguay. Su capital fue Buenos Aires.
        </p>
        <p className="sala-contenido-parrafo">
          Para organizar su gobierno, el virreinato se dividió en intendencias como Buenos Aires, Córdoba del Tucumán, Salta del Tucumán y Potosí, y gobernaciones militares como Montevideo y Misiones. Estas estructuras facilitaron la administración y el control de una vasta región con gran diversidad cultural y geográfica.
        </p>
      </section>

      {/* --- Segundo Bloque: Evangelización --- */}
      <section className="historia-bloque">
        <h3 className="sala-contenido-subtitulo">La evangelización y la vida en la Puna</h3>
        <p className="sala-contenido-parrafo">
          Junto con los conquistadores llegaron órdenes religiosas como los dominicos, franciscanos y jesuitas. Su misión era cristianizar a los pueblos originarios y, al mismo tiempo, integrarlos en nuevas formas de vida organizadas.
        </p>
        <p className="sala-contenido-parrafo">
          Los jesuitas se destacaron por su acción en regiones como la Puna andina, donde trabajaron junto a comunidades kollas en la explotación de minas como Incahuasi y Cobres. Aunque fueron expulsados en 1767 por orden del rey Carlos III, su legado perduró a través de las prácticas religiosas, económicas y culturales que ayudaron a establecer.
        </p>
      </section>

      {/* --- Tercer Bloque: Independencia y República --- */}
      <section className="historia-bloque">
        <h3 className="sala-contenido-subtitulo">De las Provincias Unidas a la República Argentina</h3>
        <p className="sala-contenido-parrafo">
          Tras el proceso independentista iniciado en 1810, las Provincias Unidas del Río de la Plata comenzaron a organizarse como entidades autónomas. Entre 1813 y 1834, se consolidaron catorce provincias, cada una con su propia constitución. A pesar de esa autonomía, mantenían un débil vínculo confederal.
        </p>
        <p className="sala-contenido-parrafo">
          La sanción de la Constitución Nacional en 1853 fue clave para organizar políticamente el país. En 1862, con la incorporación de Buenos Aires, se formó oficialmente la República Argentina, integrada por catorce provincias bajo un marco común.
        </p>
      </section>

      {/* --- Cuarto Bloque: Territorios Nacionales --- */}
      <section className="historia-bloque">
        <h3 className="sala-contenido-subtitulo">Territorios Nacionales y expansión del Estado</h3>
        <p className="sala-contenido-parrafo">
          A fines del siglo XIX, el gobierno nacional impulsó una política de expansión territorial. En 1884 se crearon los Territorios Nacionales, zonas aún no organizadas como provincias, que fueron divididas en gobernaciones: Chaco, Formosa, Pampa, Chubut, entre otras.
        </p>
        <p className="sala-contenido-parrafo">
          En el año 1900, durante la presidencia de Julio A. Roca, se creó el Territorio Nacional de Los Andes, que abarcaba parte de la región puneña. Su creación respondió al interés estratégico en zonas de frontera y a la importancia de sus recursos naturales, como el litio y los boratos.
        </p>
      </section>

    </article>
  );
};