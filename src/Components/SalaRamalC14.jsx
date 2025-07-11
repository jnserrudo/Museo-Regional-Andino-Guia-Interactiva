// src/components/Salas/SalaRamalC14.jsx

import React, { useState, useRef } from "react";
// Importamos los CSS necesarios
import "./SalaGeologia.css";
import "../SalaRamalC14.css";
import "./SalaRamalGaleria.css"; // CSS para la galería (si tiene estilos específicos)

import { useTranslation, Trans } from "react-i18next";

// --- Importaciones de Swiper para el carrusel ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { GaleriaRamal } from "./GaleriaRamal";
import { useRegisterText } from "../Contexts/SpeechContext";

// --- Componente de Carrusel (lo necesitamos aquí) ---
const CarouselGallery = ({ images, title, customClassName }) => (
  <div className={`carousel-wrapper ${customClassName}`}>
    {title && <p className="gallery-title">{title}</p>}
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      loop={true}
      className="sala-carousel"
    >
      {images.map((imgSrc, index) => (
        <SwiperSlide key={index}>
          <img
            src={imgSrc}
            alt={`${title} - Imagen ${index + 1}`}
            className="carousel-image"
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

// --- AÑADE ESTE NUEVO ARRAY PARA EL CARRUSEL ---
const imagenesCarrusel = [
  "/ramalc14/polvorilla_construccion01aa.jpg",
  "/ramalc14/trabajadores_sobre_rieles_foto_ramal_c14_1922.jpg",
  "/ramalc14/hconstruyendo_tunel.jpg",
  "/ramalc14/paleando5.jpg",
  "/ramalc14/hviaducto_el_candado.jpg",
  "/ramalc14/inauguracion.jpg",
  "/ramalc14/ramal_c14_inaugurado_20_febrero_1948.jpg",
  "/ramalc14/maury_pantoja.jpg",
];

const imagenesCarrusel2 = [
  "187465-las-maquinas-carguero-2001-puna-salteña.jpg",
  "187465-vieja-fotografia-c14-estacion-nubes.jpg",
  "archpolvorilla1.jpg",
  "archpolvorilla2.jpg",
  "archpolvorilla3.jpg",
  "archtoro1.jpg",
  "archtoro2.jpg",
  "chorrillosh1_en_los_años_40.jpg",
  "ferrocarril_de_salta_a_chile_huahitiquina_1940.jpg",
  "foto_trabajadores.jpg",
  "grua1.jpg",
  "hcabrestante01.jpg",
  "hcatangos01.jpg",
  "hcatangos03.jpg",
  "hcatangos05.jpg",
  "hcatangos06.jpg",
  "hcatangos07.jpg",
  "hcobertizo_km1294_100_1028.jpg",
  "hconstruccion01.jpg",
  "hconstruyendo_tunel.jpg",
  "hdefensas1.jpg",
  "hing_rafael_rossi.jpg",
  "hpablo_saravia.jpg",
  "hparada01.jpg",
  "hpaseo01.jpg",
  "hsan_antonio01a.jpg",
  "hsan_antonio02a.jpg",
  "hvaporera01_carguero_cerca_el_aisal.jpg",
  "hviaducto_el_candado.jpg",
  "inauguracion.jpg",
  "loc1334.jpg",
  /* "locomotora_gm_gt22cu_smixto02.jpg",
  "locomotora_henschel_e4.jpg",
  "locomotora_skoda_e5.jpg", */
  "locvieja_locomotora_accidentada.jpg",
  "maury_pantoja.jpg",
  "paleando5.jpg",
  "pistarini.jpg",
  "polvorilla_construccion01aa.jpg",
  "polvorilla_construccion02aa.jpg",
  "polvorilla1h_decada_del_40.jpg",
  "primeras_locomotoras_baldwin_e2.jpg",
  "qtoroh1_en_los_años_40.jpg",
  "ramal_c14_inaugurado_20_febrero_1948.jpg",
  /*   "recorrido_1653050.jpeg",
   */ "trabajadores_sobre_rieles_foto_ramal_c14_1922.jpg",
];

// --- AÑADE ESTE NUEVO ARRAY ---
const galeriaTrenActual = [
  "/ramal-tren/tren-salta-chile.jpg",
  "/ramal-tren/1500px-Tren_a_las_Nubes2.jpg",
  "/ramal-tren/imagen-tren.jpg",
  "/ramal-tren/Tren a las Nubes07.jpg",
  "/ramal-tren/tren-cruzado-viaducto.jpg",
  "/ramal-tren/tren1.JPG",
  "/ramal-tren/ttren.jpg",
  "/ramal-tren/viaducto-polvorilla.jpg",
  "/ramal-tren/viaducto-tren.jpg",
];
// --- FIN DE LA ADICIÓN ---

// --- Componente de Video (lo necesitamos aquí) ---
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const VideoPlayer = ({ videoSrc, posterSrc, title, subtitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
    }
  };

  return (
    <section className="video-hero-section">
      <div className={`video-wrapper ${isPlaying ? "is-playing" : ""}`}>
        <video
          ref={videoRef}
          className="sala-video"
          controls
          preload="auto"
          /* poster={posterSrc} */
          src={videoSrc}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          Tu navegador no soporta la etiqueta de video.
        </video>
        <div
          className="play-button-overlay"
          aria-hidden="true"
          onClick={togglePlay}
        >
          <div className="play-icon-container">
            <PlayIcon />
          </div>
        </div>
      </div>
      <div className="video-caption">
        <h3 className="video-title">{title}</h3>
        <p className="video-subtitle">{subtitle}</p>
      </div>
    </section>
  );
};

// --- COMPONENTE PRINCIPAL DE LA SALA ---
export const SalaRamalC14 = () => {
  const { t } = useTranslation();

  const textoParaHablar = Object.values(
    t("sala_ramal_c14", { returnObjects: true })
  )
    .map((value) =>
      typeof value === "object" ? Object.values(value).join(" ") : value
    )
    .join(" ");
  useRegisterText(textoParaHablar);

  const galeriaFotosAntiguas = [
    "/img/ramal/antiguas/foto_1.jpg", // REEMPLAZA ESTAS RUTAS
    "/img/ramal/antiguas/foto_2.jpg",
    "/img/ramal/antiguas/foto_3.jpg",
  ];

  return (
    <article className="sala-contenido-container sala-contenido-container-ramal">
      <h2 className="sala-contenido-titulo-principal">
        {t("sala_ramal_c14.titulo_principal")}
      </h2>

      <section className="ramal-bloque">
        <p className="sala-contenido-parrafo">
          {t("sala_ramal_c14.parrafo_construccion_1")}
        </p>
        <ul className="sala-contenido-lista">
          <li>{t("sala_ramal_c14.lista_construccion.item1")}</li>
          <li>{t("sala_ramal_c14.lista_construccion.item2")}</li>
          <li>{t("sala_ramal_c14.lista_construccion.item3")}</li>
          <li>{t("sala_ramal_c14.lista_construccion.item4")}</li>
          <li>{t("sala_ramal_c14.lista_construccion.item5")}</li>
          <li>{t("sala_ramal_c14.lista_construccion.item6")}</li>
          <li>{t("sala_ramal_c14.lista_construccion.item7")}</li>
        </ul>
        <p className="sala-contenido-parrafo">
          {t("sala_ramal_c14.parrafo_construccion_2")}
        </p>

        <CarouselGallery
          images={imagenesCarrusel.map(
            (img) => `${import.meta.env.BASE_URL}${img}`
          )}
          title={t("sala_ramal_c14.titulo_carrusel_construccion")}
          customClassName="carrusel-fotos-antiguas"
        />
        <CarouselGallery
          images={imagenesCarrusel2.map(
            (img) => `${import.meta.env.BASE_URL}/ramalc14/${img}`
          )}
          title={t("sala_ramal_c14.titulo_carrusel_construccion_2")}
          customClassName="carrusel-fotos-antiguas"
        />
      </section>

      <section className="ramal-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_ramal_c14.subtitulo_historia")}
        </h3>
        <ul className="sala-contenido-lista">
          <li>
            <Trans i18nKey="sala_ramal_c14.lista_historia.item1" />
          </li>
          <li>
            <Trans i18nKey="sala_ramal_c14.lista_historia.item2" />
          </li>
          <li>
            <Trans i18nKey="sala_ramal_c14.lista_historia.item3" />
          </li>
          <li>
            <Trans i18nKey="sala_ramal_c14.lista_historia.item4" />
          </li>
          <li>
            <Trans i18nKey="sala_ramal_c14.lista_historia.item5" />
          </li>
        </ul>
        <VideoPlayer
          videoSrc={import.meta.env.BASE_URL + "viaje_ramal_video.mp4"}
          posterSrc={
            import.meta.env.BASE_URL + "/img/ramal/posters/poster_1926.jpg"
          }
          subtitle={t("sala_ramal_c14.video_subtitulo_1")}
        />
      </section>

      <section className="ramal-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_ramal_c14.subtitulo_rieles")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_ramal_c14.parrafo_rieles_1")}
        </p>
        <blockquote className="ramal-quote">
          <p>{t("sala_ramal_c14.cita_rieles")}</p>
          <footer>{t("sala_ramal_c14.cita_autor")}</footer>
        </blockquote>
        <VideoPlayer
          videoSrc={import.meta.env.BASE_URL + "trasandino_del_norte_comp.mp4"}
          posterSrc={import.meta.env.BASE_URL + "poster_trasandino.jpg"}
          subtitle={t("sala_ramal_c14.video_subtitulo_2")}
        />
      </section>

      <section className="ramal-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_ramal_c14.subtitulo_turismo")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_ramal_c14.parrafo_turismo_1")}
        </p>
        <p className="sala-contenido-parrafo">
          {t("sala_ramal_c14.parrafo_turismo_2")}
        </p>
        <CarouselGallery
          images={galeriaTrenActual.map(
            (img) => `${import.meta.env.BASE_URL}${img}`
          )}
          title={t("sala_ramal_c14.titulo_carrusel_actual")}
        />
      </section>
    </article>
  );
};
