// SalaRamalTimelineDetalle.jsx (con reproductor de video integrado)
import React, { useState, useRef } from 'react';
import { LineaTiempo } from "./LineaTiempo";
import '../SalaRamalC14.css'; // Asegúrate de que este archivo contenga los nuevos estilos de video

// Un pequeño componente para el ícono del Play (SVG)
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const SalaRamalTimelineDetalle = () => {
    // Lógica para el reproductor de video
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
    <div className="ramal-timeline-vista">
       <h3 className="ramal-timeline-titulo">
          Hitos del Ramal C-14
       </h3>

        {/* ====================================================== */}
        {/*          NUEVO REPRODUCTOR DE VIDEO AÑADIDO            */}
        {/* ====================================================== */}
        <section className="video-hero-section">
            <div 
                className={`video-wrapper ${isPlaying ? 'is-playing' : ''}`}
                onClick={togglePlay}
            >
                <video
                    ref={videoRef}
                    className="sala-video" // Usamos una clase genérica
                    controls={isPlaying} 
                    preload="metadata"
                    poster={`${import.meta.env.BASE_URL}nombre-de-tu-poster.jpg`} // <-- REEMPLAZA
                    src={`${import.meta.env.BASE_URL}trasandino_del_norte.mp4`}     // <-- REEMPLAZA
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
            <div className="video-caption">
                <h3 className="video-title">El Trasandino del Norte</h3>
                <p className="video-subtitle">
                    Imágenes históricas de la construcción y operación del tren.
                </p>
            </div>
        </section>

        <LineaTiempo />
    </div>
  );
};