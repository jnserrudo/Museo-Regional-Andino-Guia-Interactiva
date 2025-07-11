// src/components/Salas/SalaBiodiversidad.jsx

import React from "react";
// Importamos el CSS de Geología porque usaremos los mismos estilos base
import "./SalaGeologia.css";
// Y un CSS específico para Biodiversidad si necesitamos ajustes
import "../SalaBiodiversidad.css";
// --- 1. IMPORTA EL HOOK ---
import { useRegisterText } from "../Contexts/SpeechContext"; // <-- Ajusta la ruta si es necesario

import { useTranslation, Trans } from "react-i18next"; // <-- Importa los hooks

// --- Importaciones de Swiper (necesarias para el carrusel) ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

// --- COMPONENTE PRINCIPAL DE LA SALA ---
export const SalaBiodiversidad = () => {
  // --- 2. USA EL HOOK PARA REGISTRAR EL TEXTO ---
  const { t } = useTranslation();

  // Genera el texto plano para el audio a partir del JSON traducido
  const textoParaHablar = Object.values(
    t("sala_biodiversidad", { returnObjects: true })
  )
    .map((value) =>
      typeof value === "object" ? Object.values(value).join(" ") : value
    )
    .join(" ");
  useRegisterText(textoParaHablar);
  // --- Define aquí las rutas a tus imágenes (deben estar en la carpeta /public) ---
  const galeriaIntroduccion = [
    import.meta.env.BASE_URL + "bio_1.JPG",
    import.meta.env.BASE_URL + "bio_2.JPG",
    import.meta.env.BASE_URL + "bio_3.JPG",
    import.meta.env.BASE_URL + "bio_4.JPG",
    import.meta.env.BASE_URL + "bio_5.JPG",
  ];

  const chinchilla = [
    import.meta.env.BASE_URL + "Chinchilla.jpg",
    import.meta.env.BASE_URL + "zorro-chinchilla.JPG",
    import.meta.env.BASE_URL + "zorro-chinchilla2.JPG",
  ];

  const galeriaAves = [
    import.meta.env.BASE_URL + "ave_1.JPG",
    import.meta.env.BASE_URL + "ave_2.JPG",
    import.meta.env.BASE_URL + "ave_3.JPG",
    import.meta.env.BASE_URL + "ave_4.JPG",
    import.meta.env.BASE_URL + "ave_5.JPG",
    import.meta.env.BASE_URL + "ave_6.JPG",
  ];

  const galeriaAveParinas = [
    import.meta.env.BASE_URL + "parina.jpg",
    import.meta.env.BASE_URL + "parina1.JPG",
    import.meta.env.BASE_URL + "parina2.jpg",
    import.meta.env.BASE_URL + "parina3.jpg",
    import.meta.env.BASE_URL + "parina4.jpg",
  ];

  return (
    <article className="sala-contenido-container">
      <h2 className="sala-contenido-titulo-principal">
        {t("sala_biodiversidad.titulo_principal")}
      </h2>

      <h3 className="sala-contenido-subtitulo">
        {t("sala_biodiversidad.subtitulo_intro")}
      </h3>
      <p className="sala-contenido-parrafo">
        {t("sala_biodiversidad.parrafo_intro_1")}
      </p>
      <ul className="sala-contenido-lista">
        <li>{t("sala_biodiversidad.lista_intro.item1")}</li>
        <li>{t("sala_biodiversidad.lista_intro.item2")}</li>
        <li>{t("sala_biodiversidad.lista_intro.item3")}</li>
        <li>{t("sala_biodiversidad.lista_intro.item4")}</li>
      </ul>
      <p className="sala-contenido-parrafo">
        <Trans i18nKey="sala_biodiversidad.parrafo_intro_2">
          Muchas especies son <strong>endémicas</strong>: sólo viven en la Puna.
          Eso significa que este ecosistema es frágil, único y digno de ser
          protegido.
        </Trans>
      </p>

      <h3 className="sala-contenido-subtitulo">
        {t("sala_biodiversidad.subtitulo_plantas")}
      </h3>
      <p className="sala-contenido-parrafo">
        {t("sala_biodiversidad.parrafo_plantas_1")}
      </p>
      <ul className="sala-contenido-lista">
        <li>{t("sala_biodiversidad.lista_plantas.item1")}</li>
        <li>{t("sala_biodiversidad.lista_plantas.item2")}</li>
        <li>{t("sala_biodiversidad.lista_plantas.item3")}</li>
      </ul>
      <CarouselGallery
        images={galeriaIntroduccion}
        title={t("sala_biodiversidad.titulo_carrusel_intro")}
      />

      <p className="sala-contenido-parrafo">
        <Trans i18nKey="sala_biodiversidad.parrafo_plantas_2">
          Por eso predominan los arbustos bajos, como la <strong>Tola</strong> y
          la <strong>Tolilla</strong>.
        </Trans>
      </p>

      <div className="imagen-destacada-container">
        <p
          className="sala-contenido-parrafo"
          style={{
            textAlign: "center",
            fontStyle: "italic",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {t("sala_biodiversidad.caption_tola")}
        </p>
        <img
          src={import.meta.env.BASE_URL + "Tola.jpg"}
          alt="Planta de Tola en la Puna"
          className="imagen-destacada"
        />
      </div>

      <h3 className="sala-contenido-subtitulo">
        {t("sala_biodiversidad.subtitulo_vicuna")}
      </h3>
      <p className="sala-contenido-parrafo">
        {t("sala_biodiversidad.parrafo_vicuna_1")}
      </p>
      <ul className="sala-contenido-lista">
        <li>{t("sala_biodiversidad.lista_vicuna.item1")}</li>
        <li>{t("sala_biodiversidad.lista_vicuna.item2")}</li>
        <li>{t("sala_biodiversidad.lista_vicuna.item3")}</li>
        <li>{t("sala_biodiversidad.lista_vicuna.item4")}</li>
      </ul>
      <p className="sala-contenido-parrafo">
        {t("sala_biodiversidad.parrafo_vicuna_2")}
      </p>

      <div className="imagen-destacada-container">
        <img
          src={import.meta.env.BASE_URL + "vicuna_montana.JPG"}
          alt="Vicuña en un paisaje montañoso de la Puna"
          className="imagen-destacada"
        />
      </div>

      <h3 className="sala-contenido-subtitulo">
        {t("sala_biodiversidad.subtitulo_mamiferos")}
      </h3>
      <p className="sala-contenido-parrafo">
        <Trans i18nKey="sala_biodiversidad.parrafo_mamiferos_1">
          En los cerros y roquedales, muchas especies se ocultan de la vista.
          Los roedores como el <strong>chinchillón</strong>, la{" "}
          <strong>chinchilla real</strong> o la <strong>rata chinchilla</strong>{" "}
          son los más comunes
        </Trans>
      </p>
      <ul className="sala-contenido-lista">
        <li>{t("sala_biodiversidad.lista_mamiferos.item1")}</li>
        <li>{t("sala_biodiversidad.lista_mamiferos.item2")}</li>
        <li>{t("sala_biodiversidad.lista_mamiferos.item3")}</li>
        <li>{t("sala_biodiversidad.lista_mamiferos.item4")}</li>
      </ul>
      <p className="sala-contenido-parrafo">
        {t("sala_biodiversidad.parrafo_mamiferos_2")}
      </p>

      <CarouselGallery
        images={chinchilla}
        title={t("sala_biodiversidad.titulo_carrusel_chinchilla")}
      />

      <h3 className="sala-contenido-subtitulo">
        {t("sala_biodiversidad.subtitulo_aves")}
      </h3>
      <p className="sala-contenido-parrafo">
        {t("sala_biodiversidad.parrafo_aves_1")}
      </p>
      <ul className="sala-contenido-lista">
        <li>{t("sala_biodiversidad.lista_aves.item1")}</li>
        <li>{t("sala_biodiversidad.lista_aves.item2")}</li>
        <li>{t("sala_biodiversidad.lista_aves.item3")}</li>
        <li>{t("sala_biodiversidad.lista_aves.item4")}</li>
        <li>{t("sala_biodiversidad.lista_aves.item5")}</li>
        <li>{t("sala_biodiversidad.lista_aves.item6")}</li>
      </ul>
      <p className="sala-contenido-parrafo">
        {t("sala_biodiversidad.parrafo_aves_2")}
      </p>

      <CarouselGallery
        images={galeriaAves}
        title={t("sala_biodiversidad.titulo_carrusel_aves")}
      />
      <CarouselGallery
        images={galeriaAveParinas}
        title={t("sala_biodiversidad.titulo_carrusel_parinas")}
      />
    </article>
  );
};
