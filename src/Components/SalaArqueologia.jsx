// src/components/Salas/SalaArqueologia.jsx

import React, { useState, useRef } from "react";
import "../SalaArqueologia.css"; // Asegúrate de que este CSS exista y se adapte
import "./SalaTerritorioAndes.css";
import { useRegisterText } from "../Contexts/SpeechContext"; // <-- Ajusta la ruta si es necesario
import { useTranslation } from "react-i18next";

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

// --- COMPONENTE PRINCIPAL DE LA SALA ---
export const SalaArqueologia = () => {
  // --- 2. USA EL HOOK PARA REGISTRAR EL TEXTO ---
  const { t } = useTranslation();

  // Genera el texto plano para el audio a partir del JSON traducido
  const textoParaHablar = Object.values(
    t("sala_arqueologia", { returnObjects: true })
  ).join(" ");
  useRegisterText(textoParaHablar);
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
      <header className="sala-header">
        <h1 className="sala-main-title sala-contenido-titulo-principal">
          {t("sala_arqueologia.titulo_principal")}
        </h1>
      </header>

      <section className="arqueologia-narrative">
        <div className="territorio-bloque">
          <p className="sala-contenido-parrafo">
            {t("sala_arqueologia.parrafo_intro")}
          </p>
        </div>

        <section className="territorio-bloque">
          <figure className="territorio-image-block align-right">
            <img
              src={import.meta.env.BASE_URL + "/cazadores.png"}
              alt="Herramientas de cazadores"
              className="territorio-inline-image"
            />
            <img
              src={import.meta.env.BASE_URL + "/cazadores2.png"}
              alt="Herramientas de recolectores"
              className="territorio-inline-image"
              style={{ marginTop: "1rem" }}
            />
          </figure>
          <p className="sala-contenido-parrafo">
            {t("sala_arqueologia.parrafo_bloque1_1")}
          </p>
          <p className="sala-contenido-parrafo">
            {t("sala_arqueologia.parrafo_bloque1_2")}
          </p>
          <p className="sala-contenido-parrafo">
            {t("sala_arqueologia.parrafo_bloque1_3")}
          </p>
        </section>

        <section className="territorio-bloque">
          <figure className="territorio-image-block align-left">
            <img
              src={import.meta.env.BASE_URL + "/geoglifo_matancillas.png"}
              alt="Geoglifo de camélido"
              className="territorio-inline-image"
            />
          </figure>
          <p className="sala-contenido-parrafo">
            {t("sala_arqueologia.parrafo_bloque2_1")}
          </p>
          <p className="sala-contenido-parrafo">
            {t("sala_arqueologia.parrafo_bloque2_2")}
          </p>
        </section>

        <section className="territorio-bloque">
          <figure className="territorio-image-block align-right">
            <img
              src={import.meta.env.BASE_URL + "/ofrenda_incaica.png"}
              alt="Ofrenda humana incaica"
              className="territorio-inline-image"
            />
          </figure>
          <p className="sala-contenido-parrafo">
            {t("sala_arqueologia.parrafo_bloque3_1")}
          </p>
          <p className="sala-contenido-parrafo">
            {t("sala_arqueologia.parrafo_bloque3_2")}
          </p>
        </section>

        <section className="territorio-bloque">
          <figure className="territorio-image-block align-left">
            <img
              src={import.meta.env.BASE_URL + "/ceramica.png"}
              alt="Cerámica arqueológica"
              className="territorio-inline-image"
            />
          </figure>
          <p className="sala-contenido-parrafo">
            {t("sala_arqueologia.parrafo_bloque4_1")}
          </p>
          <p className="sala-contenido-parrafo">
            {t("sala_arqueologia.parrafo_bloque4_2")}
          </p>
          <p className="sala-contenido-parrafo">
            {t("sala_arqueologia.parrafo_bloque4_3")}
          </p>
        </section>
      </section>

      <section className="video-hero-section video-at-end">
        <div className="video-caption">
          <h3 className="video-title">{t("sala_arqueologia.video_titulo")}</h3>
          <p className="video-subtitle">
            {t("sala_arqueologia.video_subtitulo")}
          </p>
        </div>
        <div
          className={`video-wrapper formato-vertical ${
            isPlaying ? "is-playing" : ""
          }`}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            className="arqueologia-video"
            controls={isPlaying}
            preload="metadata"
            src={`${import.meta.env.BASE_URL}/Arqueologia_video.mp4`}
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
