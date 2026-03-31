// src/components/Salas/SalaGeologia.jsx

import React, { useRef, useState, useEffect } from "react";
import { useRegisterText } from "../Contexts/SpeechContext";
// Importa el CSS que ya teníamos
import "./SalaGeologia.css";

// --- NUEVO: Importaciones necesarias de Swiper ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { VolcanoExplorer3D } from "./VolcanoExplorer3D"; // <<<--- IMPORTA EL NUEVO COMPONENTE 3D
import MapaVolcanes from "./MapaVolcanes"; // <<<--- IMPORTA EL NUEVO COMPONENTE 3D
import { useTranslation, Trans } from "react-i18next"; // <-- Importa Trans

// --- NUEVO: Importa los estilos base de Swiper ---
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
// --- MODIFICADO: El componente de galería ahora es un carrusel ---
const CarouselGallery = ({ images, title }) => (
  <div className="carousel-wrapper">
    {/* El título ahora va fuera del componente Swiper */}
    {title && <p className="gallery-title">{title}</p>}

    <Swiper
      // Módulos que vamos a usar
      modules={[Navigation, Pagination, Autoplay]}
      // Activa la navegación con flechas
      navigation={true}
      // Activa la paginación con "puntitos" y los hace clickables
      pagination={{ clickable: true }}
      // Activa el autoplay
      autoplay={{
        delay: 4000, // 4 segundos entre cada slide
        disableOnInteraction: false, // El autoplay no se detiene si el usuario interactúa
      }}
      // Para que el carrusel sea infinito
      loop={true}
      // Clases personalizadas para poder darles estilo fácilmente en el CSS
      className="sala-carousel"
    >
      {images.map((imgSrc, index) => (
        <SwiperSlide key={index}>
          {/*
            IMPORTANTE: La ruta sigue viniendo de la carpeta /public
            Ejemplo: '/img/geologia/cuenca-01.jpg'
          */}
          <img
            src={imgSrc}
            alt={`${title || "Galería de Geología"} - Imagen ${index + 1}`}
            className="carousel-image"
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path d="M8 5v14l11-7z" />
  </svg>
);
// --- COMPONENTE PRINCIPAL DE LA SALA (sin cambios en su lógica) ---
export const SalaGeologia = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useTranslation();

  // --- 3. USA EL HOOK PARA REGISTRAR EL TEXTO ---
  // Obtenemos el texto completo traducido para el audio
  // Usamos 'translation' como namespace por defecto.
  const textoParaHablar = t("sala_geologia", {
    returnObjects: true,
    joinArrays: " ",
  });

  // Convertimos el objeto de texto en un string plano para la lectura de voz
  const textoPlano = Object.values(textoParaHablar)
    .map((value) => {
      if (typeof value === "object") {
        return Object.values(value).join(" ");
      }
      return value;
    })
    .join(" ");

  useRegisterText(textoPlano);

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

  // Las rutas a tus imágenes no cambian
  const galeriaCuencas = [
    import.meta.env.BASE_URL + "cuenca_1.jpg",
    import.meta.env.BASE_URL + "cuenca_2.jpg",
    import.meta.env.BASE_URL + "cuenca_3.jpg",
    import.meta.env.BASE_URL + "cuenca_4.jpg",
    import.meta.env.BASE_URL + "cuenca_5.JPG",
    import.meta.env.BASE_URL + "cuenca_6.JPG",
  ];
  const galeriaCuencasComprimidos = [
    import.meta.env.BASE_URL + "/comprimidos/cuenca_1.webp",
    import.meta.env.BASE_URL + "/comprimidos/cuenca_2.webp",
    import.meta.env.BASE_URL + "/comprimidos/cuenca_3.webp",
    import.meta.env.BASE_URL + "/comprimidos/cuenca_4.webp",
    import.meta.env.BASE_URL + "/comprimidos/cuenca_5.webp",
    import.meta.env.BASE_URL + "/comprimidos/cuenca_6.webp",
  ];

  const galeriaSalares = [
    import.meta.env.BASE_URL + "salar_1.jpg",
    import.meta.env.BASE_URL + "salar_2.jpg",
    import.meta.env.BASE_URL + "salar_3.jpg",
    import.meta.env.BASE_URL + "salar_4.jpg",
    import.meta.env.BASE_URL + "salar_5.jpg",
  ];

  return (
    <article className="sala-contenido-container">
      <h2 className="sala-contenido-titulo-principal">
        {t("sala_geologia.titulo_principal")}
      </h2>
      <h3 className="sala-contenido-subtitulo">
        {t("sala_geologia.subtitulo_principal")}
      </h3>
      {/* --- AQUÍ ESTÁ EL CAMBIO --- */}
      <VideoPlayer
        videoSrc={import.meta.env.BASE_URL + "animacion_mundo.mp4"}
        // --- USAREMOS LA IMAGEN DE LA PUNA COMO POSTER ---
        posterSrc={import.meta.env.BASE_URL + "/cuenca_1.jpg"} // <-- Pon una imagen representativa de la Puna
        autoplay={true} // <-- AÑADE ESTA PROP
        // --- AÑADE ESTA PROP CON LAS CLASES PERSONALIZADAS ---
        classNames={{
          heroSection: "geologia-video-hero-section",
          wrapper: "geologia-video-wrapper",
          video: "geologia-sala-video",
          overlay: "geologia-play-button-overlay",
          iconContainer: "geologia-play-icon-container",
          caption: "geologia-video-caption",
          title: "geologia-video-title",
          subtitle: "geologia-video-subtitle",
        }}
      />
      {/* --- FIN DEL CAMBIO --- */}

      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_intro_1")}
      </p>
      <p className="sala-contenido-parrafo">
        <Trans i18nKey="sala_geologia.parrafo_intro_2">
          {/* El contenido aquí es solo un fallback y permite que las etiquetas HTML funcionen */}
          Esta región forma parte de una <strong>cuenca endorreica</strong>...
        </Trans>
      </p>

      {/* --- MODIFICADO: Usamos el nuevo componente de carrusel --- */}
      <CarouselGallery
        images={galeriaCuencasComprimidos}
        title={t('sala_geologia.titulo_carrusel_cuencas')}
      />

      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_cordilleras")}
      </p>
      <ul className="sala-contenido-lista">
        <li>
          <Trans i18nKey="sala_geologia.lista_cordilleras.item1">
            Al oeste, <strong>la Cordillera Volcánica Occidental</strong>, rica
            en volcanes activos e inactivos.
          </Trans>
        </li>
        <li>
          <Trans i18nKey="sala_geologia.lista_cordilleras.item2">
            Al este, <strong>la Cordillera Oriental</strong>, formada por
            importantes montañas y valles.
          </Trans>
        </li>
      </ul>

      <h3 className="sala-contenido-subtitulo">
        {t("sala_geologia.subtitulo_fuerzas")}
      </h3>
      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_fuerzas_1")}
      </p>
      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_fuerzas_2")}
      </p>
      <ul className="sala-contenido-lista">
        <li>
          <Trans i18nKey="sala_geologia.lista_fuerzas.item1">
            <strong>Volcanes:</strong> expulsan lava, gases y cenizas.
          </Trans>
        </li>
        <li>
          <Trans i18nKey="sala_geologia.lista_fuerzas.item2">
            <strong>Géiseres y fumarolas:</strong> nos muestran el calor
            subterráneo emergiendo en forma de vapor.
          </Trans>
        </li>
        <li>
          <Trans i18nKey="sala_geologia.lista_fuerzas.item3">
            <strong>Suelos mineralizados:</strong> el agua caliente que circula
            bajo tierra disuelve minerales que, al enfriarse, se depositan en la
            superficie.
          </Trans>
        </li>
      </ul>

      <h3 className="sala-contenido-subtitulo">
        {t("sala_geologia.subtitulo_formacion_volcan")}
      </h3>
      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_formacion_volcan_1")}
      </p>
      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_formacion_volcan_2")}
      </p>
      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_formacion_volcan_3")}
      </p>
      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_formacion_volcan_4")}
      </p>
      {/* Espacio para la imagen grande del volcán */}
      <div className="imagen-destacada-container">
        {/*
          IMPORTANTE: Cambia esta ruta por la real de tu imagen del volcán.
          Debe estar en la carpeta /public de tu proyecto.
          Ejemplo: '/img/geologia/esquema-volcan.png'
        */}
        <img
          src={import.meta.env.BASE_URL + "funcionamiento_volcan2.jpg"}
          alt="Esquema del funcionamiento de un volcán"
          className="imagen-destacada imagen-volcan"
        />
      </div>

      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_formacion_volcan_4")}
      </p>

      <div className="sabias-que-box">
        <h5 className="sabias-que-titulo">
          {t("sala_geologia.sabias_que_volcanes_titulo")}
        </h5>
        <p className="sabias-que-texto">
          {t("sala_geologia.sabias_que_volcanes_texto")}
        </p>
      </div>

      <MapaVolcanes />
      {/* 
<section className="volcanes-3d-gallery-section">

          <h3 className="volcanes-3d-gallery-title">
            Explorador Geológico Interactivo
          </h3>
          <div className="volcano-explorer-container">
            
            <VolcanoExplorer3D images={imagenesVolcanes} />
          </div>
          <p className="volcano-explorer-instructions">
            Haz clic y arrastra para rotar. Usa la rueda del ratón para hacer
            zoom. Pasa el cursor sobre una imagen para ver detalles.
          </p>
        </section> */}

      <h4 className="sala-contenido-subtitulo-menor">
        {t("sala_geologia.subtitulo_geiser")}
      </h4>
      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_geiser_1")}
      </p>

      <div className="video-geiser">
        <video
          controls
          preload="metadata"
          src={`${import.meta.env.BASE_URL}video-geiser.mp4`}
        >
          Tu navegador no soporta la etiqueta de video.
        </video>
      </div>

      <div className="sabias-que-box">
        <h5 className="sabias-que-titulo">
          {t("sala_geologia.sabias_que_geiser_titulo")}
        </h5>
        <p className="sabias-que-texto">
          {t("sala_geologia.sabias_que_geiser_texto")}
        </p>
      </div>

      <h4 className="sala-contenido-subtitulo-menor">
        {t("sala_geologia.subtitulo_salar")}
      </h4>
      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_salar_1")}
      </p>
      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_salar_2")}
      </p>
      <ul className="sala-contenido-lista">
        <li>{t("sala_geologia.lista_salar.item1")}</li>
        <li>{t("sala_geologia.lista_salar.item2")}</li>
        <li>{t("sala_geologia.lista_salar.item3")}</li>
        <li>{t("sala_geologia.lista_salar.item4")}</li>
        <li>{t("sala_geologia.lista_salar.item5")}</li>
      </ul>
      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_salar_3")}
      </p>

      <div className="sabias-que-box">
        <h5 className="sabias-que-titulo">
          {t("sala_geologia.sabias_que_litio_titulo")}
        </h5>
        <p className="sabias-que-texto">
          <Trans i18nKey="sala_geologia.sabias_que_litio_texto">
            El litio permite que funcionen los celulares, notebooks y autos
            eléctricos se extrae, en gran parte, de las salmueras escondidas
            bajo los salares del noroeste argentino. La Puna forma parte del{" "}
            <strong>Triángulo del Litio</strong>, una de las regiones más
            estratégicas del planeta.
          </Trans>{" "}
        </p>
      </div>

      <h3 className="sala-contenido-subtitulo">
        {t("sala_geologia.subtitulo_lenguaje_puna")}
      </h3>
      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_lenguaje_puna")}
      </p>

      <h4 className="sala-contenido-subtitulo-menor">
        {t("sala_geologia.subtitulo_cerros_brujos")}
      </h4>
      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_cerros_brujos")}
      </p>
      <ul className="sala-contenido-lista">
        <li>
          <Trans i18nKey="sala_geologia.lista_cerros_brujos.item1">
            <strong>¿Una corona blanca sobre la cima?</strong>
            <em>Puede nevar.</em>
          </Trans>
        </li>
        <li>
          <Trans i18nKey="sala_geologia.lista_cerros_brujos.item2">
            <strong>¿Nubes que se aferran a la ladera?</strong>
            <em>Se aproxima humedad.</em>
          </Trans>
        </li>
      </ul>
      <p className="sala-contenido-parrafo">
        {t("sala_geologia.parrafo_cerros_brujos_final")}
      </p>
    </article>
  );
};
