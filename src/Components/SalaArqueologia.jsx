// src/components/Salas/SalaArqueologia.jsx

import React, { useState, useRef } from "react";
import "../SalaArqueologia.css"; // Asegúrate de que este CSS exista y se adapte
import "./SalaTerritorioAndes.css";
import { useRegisterText } from "../Contexts/SpeechContext"; // <-- Ajusta la ruta si es necesario

// Icono de Play para el video
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path d="M8 5v14l11-7z" />
  </svg>
);

// Componente para mostrar una imagen alineada
// 'align' puede ser "left" o "right"
const ImageBlock = ({ src, alt, align = "left" }) => (
  <figure className={`arqueologia-image-block align-${align}`}>
    <img
      src={src}
      alt={alt}
      className="arqueologia-inline-image"
      loading="lazy"
    />
  </figure>
);


const salaArqueologiaText = `
ARQUEOLOGIA.
En esta sala vas a conocer quiénes habitaron la Puna, un territorio habitado desde hace miles de años. Conocerás cómo las personas se adaptaron a un entorno desafiante, desarrollaron formas de vida basadas en la caza, el pastoreo, la agricultura y el intercambio, y cómo fueron construyendo conocimientos, creencias y tecnologías que aún hoy nos sorprenden.

Hace más de 10.000 años, los primeros grupos humanos comenzaron a habitar los altos paisajes de la Puna. Eran cazadores y recolectores nómadas que se desplazaban por grandes extensiones del territorio andino. Su vida dependía de animales como la vicuña y el guanaco, que les proveían carne, cuero y hueso para herramientas.
Con el paso del tiempo, entre los 3.000 y 2.500 años antes del presente, estas comunidades comenzaron a domesticar camélidos —especialmente la llama— y a practicar la agricultura. Esta transformación marcó un cambio fundamental: el inicio de una forma de vida pastoril, con asentamientos más estables, intercambio de productos y una organización social más compleja.
La llama fue un verdadero motor del desarrollo andino: no sólo brindaba lana y carne, sino que permitía el transporte de bienes a largas distancias, siendo clave en las redes de intercambio entre la Puna y los valles.

En sitios como Matancillas y Urcuro (en el actual Valle de San Antonio de los Cobres), se han hallado evidencias arqueológicas que dan cuenta de la vida cotidiana de estas poblaciones hace 1.500 años. En Matancillas, un geoglifo grabado sobre roca de cuarzo —único en el país— representa un camélido, símbolo de su valor económico y espiritual.
Herramientas como puntas de proyectil y cuchillos fueron elaboradas principalmente en obsidiana, un vidrio volcánico muy apreciado por su filo, así como en cuarcita. Estos objetos muestran el conocimiento profundo que los antiguos puneños tenían sobre los minerales y su uso.

Con la expansión del Imperio Incaico en el siglo XV, muchas comunidades de la Puna fueron integradas a esta compleja red política, social y económica. Montañas como el Acay, Tuzgle, el Llullaillaco, Chañi y el Quevar fueron consideradas sagradas, y en ellas se realizaron importantes ceremonias, incluso con ofrendas humanas, como parte de la cosmovisión andina.
La Puna salteña forma parte de una de las regiones con mayor densidad de adoratorios de altura del mundo andino, con más de 100 cerros sagrados identificados, muchos de ellos vinculados a rituales incaicos.

Las cerámicas, máscaras y puntas de flecha que ves en esta sala son testimonio de ese pasado: objetos que acompañaron la vida diaria, los ritos, los intercambios y las creencias de quienes habitaron estas tierras antes y después de la llegada del Inca.
A partir de la llegada de los españoles en el siglo XVI, las formas de vida indígenas comenzaron a transformarse. La organización colonial introdujo nuevas instituciones —como la encomienda y los pueblos de indios— que fueron modificando el modo de habitar, trabajar y relacionarse con el territorio.
La historia de los primeros habitantes de la Puna no está escrita con letras, sino con piedras, cerámicas, senderos y rituales. Hoy, esos rastros nos permiten conocer cómo fueron sus vidas, su entorno, y su legado. Su sabiduría sigue presente en las formas de habitar, de criar llamas, de rendir culto a la Pachamama.

Entrevista con el Dr. Federico Restifo. Arqueólogo-Investigador del CONICET.
`;

// --- COMPONENTE PRINCIPAL DE LA SALA ---
export const SalaArqueologia = () => {
  // --- 2. USA EL HOOK PARA REGISTRAR EL TEXTO ---
  useRegisterText(salaArqueologiaText);

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  return (
    <article className="sala-arqueologia-container sala-contenido-container">
      {" "}
      {/* Usamos clases consistentes */}
      <header className="sala-header">
        <h1 className="sala-main-title sala-contenido-titulo-principal">
          ARQUEOLOGIA
        </h1>
      </header>
      <section className="arqueologia-narrative">
        {/* Párrafo inicial sin imagen */}
        <div className="territorio-bloque">
          {" "}
          {/* Usamos la clase que funciona */}
          <p className="sala-contenido-parrafo">
            En esta sala vas a conocer quiénes habitaron la Puna, un territorio
            habitado desde hace miles de años. Conocerás cómo las personas se
            adaptaron a un entorno desafiante, desarrollaron formas de vida
            basadas en la caza, el pastoreo, la agricultura y el intercambio, y
            cómo fueron construyendo conocimientos, creencias y tecnologías que
            aún hoy nos sorprenden.
          </p>
        </div>

        {/* --- BLOQUE 1: Primeros Pasos --- */}
        <section className="territorio-bloque">
          {/* Imagen flotando a la derecha */}
          <figure className="territorio-image-block align-right">
            <img
              src={import.meta.env.BASE_URL + "/cazadores.png"}
              alt="Herramientas de cazadores y recolectores"
              className="territorio-inline-image" // Usamos la clase que funciona
            />
            <img
              src={import.meta.env.BASE_URL + "/cazadores2.png"}
              alt="Herramientas de cazadores y recolectores"
              className="territorio-inline-image"
              style={{ marginTop: "1rem" }} // Pequeño espacio entre imágenes apiladas
            />
          </figure>
          <p className="sala-contenido-parrafo">
            Hace más de 10.000 años, los primeros grupos humanos comenzaron a
            habitar los altos paisajes de la Puna. Eran cazadores y recolectores
            nómadas que se desplazaban por grandes extensiones del territorio
            andino. Su vida dependía de animales como la vicuña y el guanaco,
            que les proveían carne, cuero y hueso para herramientas.
          </p>
          <p className="sala-contenido-parrafo">
            Con el paso del tiempo, entre los 3.000 y 2.500 años antes del
            presente, estas comunidades comenzaron a domesticar camélidos
            —especialmente la llama— y a practicar la agricultura. Esta
            transformación marcó un cambio fundamental: el inicio de una forma
            de vida pastoril, con asentamientos más estables, intercambio de
            productos y una organización social más compleja.
          </p>
          <p className="sala-contenido-parrafo">
            La llama fue un verdadero motor del desarrollo andino: no sólo
            brindaba lana y carne, sino que permitía el transporte de bienes a
            largas distancias, siendo clave en las redes de intercambio entre la
            Puna y los valles.
          </p>
        </section>

        {/* --- BLOQUE 2: Sitios y Herramientas --- */}
        <section className="territorio-bloque">
          {/* Imagen flotando a la izquierda */}
          <figure className="territorio-image-block align-left">
            <img
              src={import.meta.env.BASE_URL + "/geoglifo_matancillas.png"}
              alt="Geoglifo de camélido en Matancillas"
              className="territorio-inline-image"
            />
          </figure>
          <p className="sala-contenido-parrafo">
            En sitios como Matancillas y Urcuro (en el actual Valle de San
            Antonio de los Cobres), se han hallado evidencias arqueológicas que
            dan cuenta de la vida cotidiana de estas poblaciones hace 1.500
            años. En Matancillas, un geoglifo grabado sobre roca de cuarzo
            —único en el país— representa un camélido, símbolo de su valor
            económico y espiritual.
          </p>
          <p className="sala-contenido-parrafo">
            Herramientas como puntas de proyectil y cuchillos fueron elaboradas
            principalmente en obsidiana, un vidrio volcánico muy apreciado por
            su filo, así como en cuarcita. Estos objetos muestran el
            conocimiento profundo que los antiguos puneños tenían sobre los
            minerales y su uso.
          </p>
        </section>

        {/* --- BLOQUE 3: Imperio Incaico --- */}
        <section className="territorio-bloque">
          {/* Imagen flotando a la derecha */}
          <figure className="territorio-image-block align-right">
            <img
              src={import.meta.env.BASE_URL + "/ofrenda_incaica.png"}
              alt="Ofrenda humana incaica"
              className="territorio-inline-image"
            />
          </figure>
          <p className="sala-contenido-parrafo">
            Con la expansión del Imperio Incaico en el siglo XV, muchas
            comunidades de la Puna fueron integradas a esta compleja red
            política, social y económica. Montañas como el Acay, Tuzgle, el
            Llullaillaco, Chañi y el Quevar fueron consideradas sagradas, y en
            ellas se realizaron importantes ceremonias, incluso con ofrendas
            humanas, como parte de la cosmovisión andina.
          </p>
          <p className="sala-contenido-parrafo">
            La Puna salteña forma parte de una de las regiones con mayor
            densidad de adoratorios de altura del mundo andino, con más de 100
            cerros sagrados identificados, muchos de ellos vinculados a rituales
            incaicos.
          </p>
        </section>

        {/* --- BLOQUE 4: Cerámicas y Legado --- */}
        <section className="territorio-bloque">
          {/* Imagen flotando a la izquierda */}
          <figure className="territorio-image-block align-left">
            <img
              src={import.meta.env.BASE_URL + "/ceramica.png"}
              alt="Cerámica arqueológica"
              className="territorio-inline-image"
            />
          </figure>
          <p className="sala-contenido-parrafo">
            Las cerámicas, máscaras y puntas de flecha que ves en esta sala son
            testimonio de ese pasado: objetos que acompañaron la vida diaria,
            los ritos, los intercambios y las creencias de quienes habitaron
            estas tierras antes y después de la llegada del Inca.
          </p>
          <p className="sala-contenido-parrafo">
            A partir de la llegada de los españoles en el siglo XVI, las formas
            de vida indígenas comenzaron a transformarse. La organización
            colonial introdujo nuevas instituciones —como la encomienda y los
            pueblos de indios— que fueron modificando el modo de habitar,
            trabajar y relacionarse con el territorio.
          </p>
          <p className="sala-contenido-parrafo">
            La historia de los primeros habitantes de la Puna no está escrita
            con letras, sino con piedras, cerámicas, senderos y rituales. Hoy,
            esos rastros nos permiten conocer cómo fueron sus vidas, su entorno,
            y su legado. Su sabiduría sigue presente en las formas de habitar,
            de criar llamas, de rendir culto a la Pachamama (Madre Tierra).
          </p>
        </section>
      </section>
      {/* --- SECCIÓN DE VIDEO (AHORA AL FINAL) --- */}
      <section className="video-hero-section video-at-end">
        <div className="video-caption">
          {/* Aquí podrías usar un ícono si quieres */}
          <h3 className="video-title">
            Entrevista con el Dr. Federico Restifo
          </h3>
          <p className="video-subtitle">Arqueólogo-Investigador del CONICET.</p>
          {/*           <a href="https://drive.google.com/drive/folders/1gAMjRQQcTeP2sTX0besnO7kSkzYQBCSY" target="_blank" rel="noopener noreferrer" className="video-link">Ver entrevista completa</a>
           */}{" "}
        </div>
        <div
          className={`video-wrapper ${isPlaying ? "is-playing" : ""}`}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            className="arqueologia-video"
            controls={isPlaying}
            preload="auto"
            /* poster={`${
              import.meta.env.BASE_URL
            }/img/arqueologia/poster_video.jpg`} */ // REEMPLAZA ESTA RUTA
            src={`${import.meta.env.BASE_URL}/Arqueologia_video.mp4`} // REEMPLAZA ESTA RUTA
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            Tu navegador no soporta la etiqueta de video.
          </video>
          <div className="play-button-overlay" aria-hidden="true">
            <div className="play-icon-container">
              <PlayIcon />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
