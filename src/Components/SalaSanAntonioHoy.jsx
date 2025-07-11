// src/components/Salas/SalaSanAntonioHoy.jsx

import React from "react";
// Importamos el CSS de Geología para reutilizar los estilos base
import "./SalaGeologia.css";
// Y un CSS específico para San Antonio Hoy
import "../SalaSanAntonioHoy.css";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

// --- Importaciones de Swiper (necesarias para el carrusel) ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useRegisterText } from "../Contexts/SpeechContext";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const VideoPlayer = ({
  videoSrc,
  posterSrc,
  title,
  subtitle,
  autoplay = false,
  classNames = {},
}) => {
  const [isPlaying, setIsPlaying] = useState(false); // Empezamos en 'false' para que el estado refleje la realidad
  const videoRef = useRef(null);

  // useEffect para controlar la reproducción automática
  useEffect(() => {
    // Solo si se pide autoplay y tenemos la referencia al video
    if (autoplay && videoRef.current) {
      const videoElement = videoRef.current;

      // Aseguramos que el video esté silenciado para el autoplay
      videoElement.muted = true;

      // Intentamos reproducir el video
      const playPromise = videoElement.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // El autoplay comenzó correctamente
            setIsPlaying(true);
          })
          .catch((error) => {
            // El autoplay fue bloqueado. No hacemos nada, el usuario tendrá que darle play manualmente.
            console.warn("Autoplay bloqueado por el navegador:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [autoplay, videoSrc]); // Se ejecuta si cambia la prop 'autoplay' o la fuente del video

  const togglePlay = () => {
    if (videoRef.current) {
      // Al interactuar, quitamos el silencio si estaba puesto por el autoplay
      videoRef.current.muted = false;
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <section className={classNames.heroSection || "video-hero-section"}>
      {/* --- AÑADE LA CLASE CONDICIONAL AQUÍ --- */}
      <div
        className={`${classNames.wrapper || "video-wrapper"} ${
          isPlaying ? "is-playing" : ""
        } ${autoplay ? "autoplay-active" : ""}`}
      >
        {" "}
        <video
          ref={videoRef}
          className={classNames.video || "sala-video"}
          controls
          // --- ATRIBUTOS CLAVE PARA EL AUTOPLAY ---
          playsInline // <-- 1. CRUCIAL para móviles (especialmente iOS)
          muted // <-- 2. NECESARIO para que la mayoría de navegadores permitan autoplay
          loop // <-- 3. (Opcional) Si quieres que el video se repita al terminar
          // --- FIN ATRIBUTOS CLAVE ---
          preload="metadata"
          poster={posterSrc}
          src={videoSrc}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            // Si no está en loop, se asegura de que el estado sea 'pausado'
            if (!videoRef.current?.loop) {
              setIsPlaying(false);
            }
          }}
        >
          Tu navegador no soporta la etiqueta de video.
        </video>
        <div
          className={classNames.overlay || "play-button-overlay"}
          aria-hidden="true"
          onClick={togglePlay}
        >
          <div className={classNames.iconContainer || "play-icon-container"}>
            <PlayIcon />
          </div>
        </div>
      </div>
      <div className={classNames.caption || "video-caption"}>
        <h3 className={classNames.title || "video-title"}>{title}</h3>
        <p className={classNames.subtitle || "video-subtitle"}>{subtitle}</p>
      </div>
    </section>
  );
};

// --- Componente de Carrusel reutilizable ---
const CarouselGallery = ({ images, title }) => (
  <div className="carousel-wrapper">
    {title && <p className="gallery-title">{title}</p>}
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      className="sala-carousel"
    >
      {images.map((imgSrc, index) => (
        <SwiperSlide key={index}>
          <img
            src={imgSrc}
            alt={`${title || "Galería San Antonio Hoy"} - Imagen ${index + 1}`}
            className="carousel-image-pachamama"
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export const SalaSanAntonioHoy = () => {
  const { t } = useTranslation();

  const textoParaHablar = Object.values(
    t("sala_san_antonio_hoy", { returnObjects: true })
  )
    .map((value) =>
      typeof value === "object" ? Object.values(value).join(" ") : value
    )
    .join(" ");
  useRegisterText(textoParaHablar);

  // --- Define aquí las rutas a tus imágenes (deben estar en la carpeta /public) ---
  const galeriaTejidos = [
    import.meta.env.BASE_URL + "tejido_1.JPG", // REEMPLAZA ESTAS RUTAS
    import.meta.env.BASE_URL + "tejido_2.JPG",
    import.meta.env.BASE_URL + "tejido_3.JPG",
    import.meta.env.BASE_URL + "tejido_4.JPG",
    import.meta.env.BASE_URL + "tejido_5.JPG",
    import.meta.env.BASE_URL + "tejido_6.JPG",
  ];

  const galeriaPachamama = [
    import.meta.env.BASE_URL + "pachamama/pachamama_1.jpg",
    import.meta.env.BASE_URL + "pachamama/pachamama_2.jpg",
    import.meta.env.BASE_URL + "pachamama/pachamama_3.jpg",
    import.meta.env.BASE_URL + "pachamama/pachamama_4.jpg",
    import.meta.env.BASE_URL + "pachamama/pachamama_5.jpg",
  ];

  return (
    <article className="sala-contenido-container">
      <h2 className="sala-contenido-titulo-principal">
        {t("sala_san_antonio_hoy.titulo_principal")}
      </h2>

      <section className="san-antonio-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_san_antonio_hoy.subtitulo_raices")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_san_antonio_hoy.parrafo_raices_1")}
        </p>
      </section>

      <section className="san-antonio-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_san_antonio_hoy.subtitulo_tejido")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_san_antonio_hoy.parrafo_tejido_1")}
        </p>
        <p className="sala-contenido-parrafo">
          {t("sala_san_antonio_hoy.parrafo_tejido_2")}
        </p>
        <CarouselGallery
          images={galeriaTejidos}
          title={t("sala_san_antonio_hoy.titulo_carrusel_tejidos")}
        />
      </section>

      <section className="san-antonio-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_san_antonio_hoy.subtitulo_escuela")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_san_antonio_hoy.parrafo_escuela_1")}
        </p>
      </section>

      <section className="san-antonio-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_san_antonio_hoy.subtitulo_pachamama")}
        </h3>
        <div className="pachamama-grid-container">
          <div className="pachamama-texto">
            <p className="sala-contenido-parrafo">
              {t("sala_san_antonio_hoy.parrafo_pachamama_1")}
            </p>
          </div>
          <div className="pachamama-video">
            <VideoPlayer
              videoSrc={
                import.meta.env.BASE_URL + "pachamama/video-pachamama.mp4"
              }
              posterSrc={
                import.meta.env.BASE_URL + "pachamama/pachamama_poster.jpg"
              }
              autoplay={true}
              classNames={{ wrapper: "video-wrapper formato-vertical" }}
            />
          </div>
        </div>
        <p className="sala-contenido-parrafo">
          {t("sala_san_antonio_hoy.parrafo_pachamama_2")}
        </p>
        <CarouselGallery
          images={galeriaPachamama}
          title={t("sala_san_antonio_hoy.titulo_carrusel_pachamama")}
        />
      </section>

      <section className="san-antonio-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_san_antonio_hoy.subtitulo_testimonio")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_san_antonio_hoy.parrafo_testimonio_1")}
        </p>
        <p className="sala-contenido-parrafo">
          {t("sala_san_antonio_hoy.parrafo_testimonio_2")}
        </p>
      </section>
    </article>
  );
};
