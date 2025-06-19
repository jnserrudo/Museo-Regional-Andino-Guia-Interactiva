// SalaArqueologia.jsx (Solución final con control total del reproductor)
import React, { useState, useRef } from "react"; // <--- 1. IMPORTAMOS useRef
import "../SalaArqueologia.css";

// ... (arqueologiaData y PlayIcon no cambian)
const arqueologiaData = [
  {
    image: "arqueologia1.jfif",
    alt: "Primeros Pobladores de la Puna",
    text: "Los primeros pobladores habrían comenzado a llegar a la Puna hace alrededor de 10.000 años. Vivían en pequeños grupos y se desplazaban en grandes distancias a través del territorio. Su supervivencia dependía de la caza de camélidos silvestres como la vicuña y el guanaco, animales esenciales para su alimentación, vestimenta y herramientas.",
  },
  {
    image: "arqueologia2.jfif",
    alt: "Desarrollo de la Agricultura y Ganadería",
    text: "Hace unos 3.000 años, se produjo una transformación significativa en la forma de vida de estos pueblos. Comenzaron a practicar la agricultura y la cría de ganado, lo que permitió una mayor estabilidad y asentamiento en la región. La domesticación de camélidos como las llamas y alpacas se consolidó en este período, marcando el inicio de una economía pastoril organizada.",
  },
  {
    image: "arqueologia3.jfif",
    alt: "Desarrollo de Aldeas en la Puna",
    text: "Entre 3.000 y 2.500 años antes del presente, la vida pastoril se consolidó como el modo de vida predominante en la Puna. La presencia de pastores y pastoras se convirtió en un rasgo característico de la región. Este período también estuvo marcado por el crecimiento de la población y el establecimiento de aldeas y pequeños centros urbanos, donde la vida comunitaria y el trabajo colectivo eran fundamentales.",
  },
];

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const SalaArqueologia = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null); // <--- 2. CREAMOS UNA REFERENCIA AL VIDEO

  // --- 3. FUNCIÓN PARA CONTROLAR PLAY/PAUSE ---
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
    <article className="sala-arqueologia-container">
      {/* ... (El header no cambia) ... */}
      <header className="sala-header">
        <h1 className="sala-main-title">Arqueología</h1>
        <p className="sala-subtitle">
          Un viaje a los orígenes de la vida en la Puna.
        </p>
      </header>

      <section className="video-hero-section">
        {/* --- 4. AÑADIMOS EL MANEJADOR DE CLIC AL CONTENEDOR --- */}
        <div
          className={`video-wrapper ${isPlaying ? "is-playing" : ""}`}
          onClick={togglePlay}
        >
          <video
            ref={videoRef} // <-- Asignamos la referencia
            className="arqueologia-video"
            // --- 5. ¡IMPORTANTE! LOS CONTROLES AHORA SON DINÁMICOS ---
            controls={isPlaying}
            preload="metadata"
            poster={`${import.meta.env.BASE_URL}arqueologia.jfif`}
            src={`${import.meta.env.BASE_URL}Arqueologia_video.mp4`}
            // --- 6. ESTOS EVENTOS ACTUALIZAN NUESTRO ESTADO ---
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            Tu navegador no soporta la etiqueta de video.
          </video>
          {/* El overlay ahora es solo visual, el clic lo maneja el div padre */}
          <div className="play-button-overlay" aria-hidden="true">
            <div className="play-icon-container">
              <PlayIcon />
            </div>
          </div>
        </div>
        {/* ... (El caption del video no cambia) ... */}
        <div className="video-caption">
          <h3 className="video-title">La Voz de la Experiencia</h3>
          <p className="video-subtitle">
            Entrevista con el Dr. Federico Restifo, Arqueólogo-Investigador del
            CONICET.
          </p>
        </div>
      </section>

      {/* ... (La sección narrativa no cambia) ... */}
      <section className="arqueologia-narrative">
        {arqueologiaData.map((item, index) => (
          <div key={index} className="narrative-block">
            <h2 className="narrative-title">{item.alt}</h2>
            <p className="narrative-text">{item.text}</p>
          </div>
        ))}
      </section>
    </article>
  );
};
