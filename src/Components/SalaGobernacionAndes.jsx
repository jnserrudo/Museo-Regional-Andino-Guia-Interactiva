// src/components/Salas/SalaGobernacionAndes.jsx

import React from "react";
// Importamos el CSS de Geología para reutilizar los estilos base de títulos y párrafos
import "./SalaGeologia.css";
// Y un CSS específico si necesitamos algún ajuste
import "./SalaGobernacionAndes.css";
import { useRegisterText } from "../Contexts/SpeechContext";

const salaGobernacionAndesText = `
GOBERNACIÓN DE LOS ANDES.

El primer gobernador: Daniel Cerri.
El General de Brigada Daniel Cerri fue designado como primer gobernador del Territorio Nacional de Los Andes a principios del siglo XX. Su gestión, además de sentar las bases institucionales, estuvo marcada por expediciones de reconocimiento y exploración del territorio, fundamentales para conocer su geografía, sus recursos y su potencial.
Durante su administración se elaboró la primera Memoria oficial de la Gobernación, un documento clave que detallaba:
Propiedades y límites territoriales.
La ubicación de yacimientos de boratos y otros minerales estratégicos.
Condiciones climáticas y ambientales de la Puna andina.
Este informe no solo permitió avanzar en políticas de ocupación y administración, sino que llamó la atención sobre el valor económico de los recursos naturales, en especial los boratos, el litio y el cobre.

Ciencia y territorio: Ambrosetti, Boman y otros exploradores.
En paralelo con la labor política y administrativa, la Gobernación impulsó o facilitó expediciones científicas pioneras, que fueron fundamentales para la historia de la arqueología, la geología y la etnografía argentina.
Entre ellas se destacan:
Juan Ambrosetti (1904–1905): considerado el “padre de la arqueología argentina”, recorrió la región registrando sitios arqueológicos, cerámicas, tumbas y geoglifos, muchos de ellos hoy considerados patrimonio.
Eric Boman (1910): etnógrafo y arqueólogo sueco-argentino, realizó estudios sistemáticos sobre pueblos originarios, asentamientos y rutas prehispánicas.
Sus investigaciones fueron pioneras en mostrar que esta región no era “vacía” ni marginal, sino que tenía una larga historia cultural y estaba profundamente integrada al mundo andino.

Un territorio con futuro… y con historia.
Los informes técnicos y científicos de principios del siglo XX destacaron que la región tenía:
Un clima singular, extremadamente seco, con gran amplitud térmica.
Una altitud desafiante, pero con posibilidades para la minería, la ganadería y ciertos cultivos.
Riquezas geológicas: boratos, salares, piedra pómez, litio, cobre y otros minerales.
Este conocimiento fue clave para promover exploraciones mineras, organizar servicios básicos y fomentar pequeñas poblaciones.

El final del Territorio Nacional de Los Andes.
En 1943, por decreto nacional, el Territorio fue disuelto y sus partes integradas definitivamente a las provincias vecinas:
El Departamento de Los Andes pasó a formar parte de Salta.
Susques, a la provincia de Jujuy.
Antofagasta de la Sierra, a Catamarca.
Así culminó una etapa de administración nacional directa y se consolidó el mapa provincial actual del noroeste argentino.
`;

export const SalaGobernacionAndes = () => {
  useRegisterText(salaGobernacionAndesText);
  return (
    <article className="sala-contenido-container">
      {" "}
      {/* Usamos la clase base para consistencia */}
      <h2 className="sala-contenido-titulo-principal">
        GOBERNACIÓN DE LOS ANDES
      </h2>
      {/* --- Primer Bloque: Daniel Cerri --- */}
      <section className="gobernacion-bloque">
        <h3 className="sala-contenido-subtitulo">
          El primer gobernador: Daniel Cerri
        </h3>
        <p className="sala-contenido-parrafo">
          El General de Brigada Daniel Cerri fue designado como primer
          gobernador del Territorio Nacional de Los Andes a principios del siglo
          XX. Su gestión, además de sentar las bases institucionales, estuvo
          marcada por expediciones de reconocimiento y exploración del
          territorio, fundamentales para conocer su geografía, sus recursos y su
          potencial.
        </p>
        {/* --- Contenedor Grid para la lista y la imagen --- */}
        <div className="bloque-lista-con-imagen">
          <div className="texto-lista-bloque">
            <p className="sala-contenido-parrafo">
              Durante su administración se elaboró la primera Memoria oficial de
              la Gobernación, un documento clave que detallaba:
            </p>
            <ul className="sala-contenido-lista">
              <li>Propiedades y límites territoriales.</li>
              <li>
                La ubicación de yacimientos de boratos y otros minerales
                estratégicos.
              </li>
              <li>Condiciones climáticas y ambientales de la Puna andina.</li>
            </ul>
          </div>
          <figure className="imagen-lista-bloque">
            <img
              src={import.meta.env.BASE_URL + "/libro-gobernacion-andes.png"} 
              alt="Documento de la Memoria oficial de la Gobernación"
            />
          </figure>
        </div>
        <p className="sala-contenido-parrafo">
          Este informe no solo permitió avanzar en políticas de ocupación y
          administración, sino que llamó la atención sobre el valor económico de
          los recursos naturales, en especial los boratos, el litio y el cobre.
        </p>
      </section>
      {/* --- Segundo Bloque: Ciencia y Exploradores --- */}
      <section className="gobernacion-bloque">
        <h3 className="sala-contenido-subtitulo">
          Ciencia y territorio: Ambrosetti, Boman y otros exploradores
        </h3>
        <p className="sala-contenido-parrafo">
          En paralelo con la labor política y administrativa, la Gobernación
          impulsó o facilitó expediciones científicas pioneras, que fueron
          fundamentales para la historia de la arqueología, la geología y la
          etnografía argentina.
        </p>
        <p className="sala-contenido-parrafo">Entre ellas se destacan:</p>
        <ul className="sala-contenido-lista">
          <li>
            <strong>Juan Ambrosetti (1904–1905):</strong> considerado el “padre
            de la arqueología argentina”, recorrió la región registrando sitios
            arqueológicos, cerámicas, tumbas y geoglifos, muchos de ellos hoy
            considerados patrimonio.
          </li>
          <li>
            <strong>Eric Boman (1910):</strong> etnógrafo y arqueólogo
            sueco-argentino, realizó estudios sistemáticos sobre pueblos
            originarios, asentamientos y rutas prehispánicas.
          </li>
        </ul>
        <p className="sala-contenido-parrafo">
          Sus investigaciones fueron pioneras en mostrar que esta región no era
          “vacía” ni marginal, sino que tenía una larga historia cultural y
          estaba profundamente integrada al mundo andino.
        </p>
      </section>
      {/* --- Tercer Bloque: Futuro e Historia --- */}
      <section className="gobernacion-bloque">
        <h3 className="sala-contenido-subtitulo">
          Un territorio con futuro… y con historia
        </h3>
        <p className="sala-contenido-parrafo">
          Los informes técnicos y científicos de principios del siglo XX
          destacaron que la región tenía:
        </p>
        <ul className="sala-contenido-lista">
          <li>
            Un clima singular, extremadamente seco, con gran amplitud térmica.
          </li>
          <li>
            Una altitud desafiante, pero con posibilidades para la minería, la
            ganadería y ciertos cultivos.
          </li>
          <li>
            Riquezas geológicas: boratos, salares, piedra pómez, litio, cobre y
            otros minerales.
          </li>
        </ul>
        <p className="sala-contenido-parrafo">
          Este conocimiento fue clave para promover exploraciones mineras,
          organizar servicios básicos y fomentar pequeñas poblaciones.
        </p>
      </section>
      {/* --- Cuarto Bloque: El Final del Territorio --- */}
      <section className="gobernacion-bloque">
        <h3 className="sala-contenido-subtitulo">
          El final del Territorio Nacional de Los Andes
        </h3>
        <p className="sala-contenido-parrafo">
          En 1943, por decreto nacional, el Territorio fue disuelto y sus partes
          integradas definitivamente a las provincias vecinas:
        </p>
        <ul className="sala-contenido-lista">
          <li>El Departamento de Los Andes pasó a formar parte de Salta.</li>
          <li>Susques, a la provincia de Jujuy.</li>
          <li>Antofagasta de la Sierra, a Catamarca.</li>
        </ul>
        <p className="sala-contenido-parrafo">
          Así culminó una etapa de administración nacional directa y se
          consolidó el mapa provincial actual del noroeste argentino.
        </p>
      </section>
    </article>
  );
};
