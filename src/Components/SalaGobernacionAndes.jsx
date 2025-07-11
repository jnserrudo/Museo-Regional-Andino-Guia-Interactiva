// src/components/Salas/SalaGobernacionAndes.jsx

import React from "react";
// Importamos el CSS de Geología para reutilizar los estilos base de títulos y párrafos
import "./SalaGeologia.css";
// Y un CSS específico si necesitamos algún ajuste
import "./SalaGobernacionAndes.css";
import { useRegisterText } from "../Contexts/SpeechContext";

// --- Importaciones de Swiper (necesarias para el carrusel) ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation, Trans } from "react-i18next";

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
            alt={`${title || "Galería de Biodiversidad"} - Imagen ${index + 1}`}
            className="carousel-image-chinchilla"
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

const gobernacionAndesImages = [
  import.meta.env.BASE_URL + "gob_andes_casa_gobierno.jpeg",
  import.meta.env.BASE_URL + "gob_andes_casa_gobierno2.jpeg",
];

export const SalaGobernacionAndes = () => {
  const { t } = useTranslation();

  // Genera el texto plano para el audio
  const textoParaHablar = Object.values(
    t("sala_gobernacion_andes", { returnObjects: true })
  )
    .map((value) =>
      typeof value === "object" ? Object.values(value).join(" ") : value
    )
    .join(" ");
  useRegisterText(textoParaHablar);
  return (
    <article className="sala-contenido-container">
      <h2 className="sala-contenido-titulo-principal">
        {t("sala_gobernacion_andes.titulo_principal")}
      </h2>

      <section className="gobernacion-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_gobernacion_andes.subtitulo_gobernador")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_gobernacion_andes.parrafo_gobernador_1")}
        </p>

        <div className="bloque-lista-con-imagen">
          <div className="texto-lista-bloque">
            <p className="sala-contenido-parrafo">
              {t("sala_gobernacion_andes.parrafo_gobernador_2")}
            </p>
            <ul className="sala-contenido-lista">
              <li>{t("sala_gobernacion_andes.lista_gobernador.item1")}</li>
              <li>{t("sala_gobernacion_andes.lista_gobernador.item2")}</li>
              <li>{t("sala_gobernacion_andes.lista_gobernador.item3")}</li>
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
          {t("sala_gobernacion_andes.parrafo_gobernador_3")}
        </p>
      </section>

      <section className="gobernacion-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_gobernacion_andes.subtitulo_ciencia")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_gobernacion_andes.parrafo_ciencia_1")}
        </p>
        <p className="sala-contenido-parrafo">
          {t("sala_gobernacion_andes.parrafo_ciencia_2")}
        </p>
        <ul className="sala-contenido-lista">
          <li>
            <Trans i18nKey="sala_gobernacion_andes.lista_ciencia.item1" />
          </li>
          <li>
            <Trans i18nKey="sala_gobernacion_andes.lista_ciencia.item2" />
          </li>
        </ul>
        <p className="sala-contenido-parrafo">
          {t("sala_gobernacion_andes.parrafo_ciencia_3")}
        </p>
      </section>

      <section className="gobernacion-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_gobernacion_andes.subtitulo_futuro")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_gobernacion_andes.parrafo_futuro_1")}
        </p>
        <ul className="sala-contenido-lista">
          <li>{t("sala_gobernacion_andes.lista_futuro.item1")}</li>
          <li>{t("sala_gobernacion_andes.lista_futuro.item2")}</li>
          <li>{t("sala_gobernacion_andes.lista_futuro.item3")}</li>
        </ul>
        <p className="sala-contenido-parrafo">
          {t("sala_gobernacion_andes.parrafo_futuro_2")}
        </p>
      </section>

      <section className="gobernacion-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_gobernacion_andes.subtitulo_final")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_gobernacion_andes.parrafo_final_1")}
        </p>
        <ul className="sala-contenido-lista">
          <li>{t("sala_gobernacion_andes.lista_final.item1")}</li>
          <li>{t("sala_gobernacion_andes.lista_final.item2")}</li>
          <li>{t("sala_gobernacion_andes.lista_final.item3")}</li>
        </ul>
        <p className="sala-contenido-parrafo">
          {t("sala_gobernacion_andes.parrafo_final_2")}
        </p>
      </section>

      <CarouselGallery
        images={gobernacionAndesImages}
        title={t("sala_gobernacion_andes.titulo_carrusel")}
      />
    </article>
  );
};
