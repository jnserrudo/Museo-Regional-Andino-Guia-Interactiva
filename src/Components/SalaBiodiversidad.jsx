// src/components/Salas/SalaBiodiversidad.jsx

import React from "react";
// Importamos el CSS de Geología porque usaremos los mismos estilos base
import "./SalaGeologia.css";
// Y un CSS específico para Biodiversidad si necesitamos ajustes
import '../SalaBiodiversidad.css';
// --- 1. IMPORTA EL HOOK ---
import { useRegisterText } from "../Contexts/SpeechContext"; // <-- Ajusta la ruta si es necesario

// --- Importaciones de Swiper (necesarias para el carrusel) ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// --- Componente de Carrusel reutilizable ---
const CarouselGallery = ({ images, title }) => (
  <div className="carousel-wrapper">
    {title && <h4 className="gallery-title">{title}</h4>}
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

const salaBiodiversidadText = `
BIODIVERSIDAD.
¿Cómo sobrevive la vida en la Puna?
En este ambiente tan extremo, todo está diseñado para resistir:
Algunas plantas almacenan agua como una esponja.
Otras tienen hojas pequeñas, duras o cubiertas de pelusa para evitar la pérdida de humedad.
Los animales tienen patas acolchadas para caminar en suelos áridos o pelajes densos para soportar el frío.
Las aves vuelan más bajo para conservar energía en un aire con menos oxígeno.
Muchas especies son endémicas: sólo viven en la Puna. Eso significa que este ecosistema es frágil, único y digno de ser protegido.

Las plantas: especialistas del desierto alto.
La vegetación en la Puna parece poca, pero cada planta está perfectamente adaptada:
Crecen separadas unas de otras para no competir por el agua.
Reducen sus hojas a espinas o formas pequeñas para evitar la evaporación.
Muchas se arrastran pegadas al suelo, como la yareta, para protegerse del viento.
Otras, como los cardones, almacenan agua en sus tallos; y algunas, como la papa silvestre, lo hacen bajo tierra en estructuras como rizomas o tubérculos.
Por estas razones la vegetación predominante en la Puna son los arbustos bajos como la Tola y la Tolilla, que parecen humildes… pero son verdaderas maestras de la supervivencia.

El Árbol de las Alturas.
La queñoa es el único árbol que crece entre los 3500 y 4300 metros de altura sobre el nivel del mar.

La vicuña: hecha a medida para la altura.
Pequeña, ligera y eficiente, la vicuña es el animal más emblemático de la Puna.
Tiene almohadillas en las patas que no erosionan el suelo.
Sus incisivos afilados cortan los brotes sin arrancarlos.
Puede cerrar sus fosas nasales para protegerse del viento.
Y su sangre contiene glóbulos rojos especiales que aprovechan al máximo el poco oxígeno del aire.
Vivir en altura es difícil. Pero la vicuña lo hace con elegancia.

Pequeños mamíferos, grandes especialistas.
En los cerros y roquedales, muchas especies se ocultan de la vista. Los roedores como el chinchillón, la chinchilla real o la rata chinchilla son los más comunes, y dan alimento a pequeños carnívoros como:
El zorro colorado, el gato de los pajonales, el hurón, y el zorrino real.
Aunque discretos, todos juegan un rol clave en el equilibrio del ecosistema.

Aves que llenan de vida las lagunas de altura.
Donde hay agua, hay vida. En las grandes lagunas de la Puna se concentran cientos de aves, tanto residentes como migratorias. Vas a poder reconocer a:
El chorlito puneño, el chorlito de vincha, el tero serrano, la avoceta andina, la becasina andina y la gaviota andina, entre muchas otras.
Algunas viajan miles de kilómetros cada año. Otras viven aquí todo el tiempo. Juntas, llenan de movimiento el cielo del altiplano.
`;

// --- COMPONENTE PRINCIPAL DE LA SALA ---
export const SalaBiodiversidad = () => {
  // --- 2. USA EL HOOK PARA REGISTRAR EL TEXTO ---
  useRegisterText(salaBiodiversidadText);

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

  return (
    <article className="sala-contenido-container">
      <h2 className="sala-contenido-titulo-principal">BIODIVERSIDAD</h2>

      <h3 className="sala-contenido-subtitulo">¿Cómo sobrevive la vida en la Puna?</h3>
      <p className="sala-contenido-parrafo">
        En este ambiente tan extremo, todo está diseñado para resistir:
      </p>
      <ul className="sala-contenido-lista">
        <li>Algunas plantas almacenan agua como una esponja.</li>
        <li>Otras tienen hojas pequeñas, duras o cubiertas de pelusa para evitar la pérdida de humedad.</li>
        <li>Los animales tienen patas acolchadas para caminar en suelos áridos o pelajes densos para soportar el frío.</li>
        <li>Las aves vuelan más bajo para conservar energía en un aire con menos oxígeno.</li>
      </ul>
      <p className="sala-contenido-parrafo">
        Muchas especies son <strong>endémicas</strong>: sólo viven en la Puna. Eso significa que este ecosistema es frágil, único y digno de ser protegido.
      </p>

      <CarouselGallery images={galeriaIntroduccion} title="Especies adaptadas al entorno" />

      <h3 className="sala-contenido-subtitulo">Las plantas: especialistas del desierto alto</h3>
      <p className="sala-contenido-parrafo">
        La vegetación en la Puna parece poca, pero cada planta está perfectamente adaptada:
      </p>
      <ul className="sala-contenido-lista">
        <li>Crecen separadas unas de otras para no competir por el agua.</li>
        <li>Reducen sus hojas a espinas o formas pequeñas para evitar la evaporación.</li>
        <li>Muchas se arrastran pegadas al suelo, como la yareta, para protegerse del viento.</li>
        <li>Otras, como los cardones, almacenan agua en sus tallos; y algunas, como la papa silvestre, lo hacen bajo tierra en estructuras como rizomas o tubérculos.</li>
      </ul>
      <p className="sala-contenido-parrafo">
        Por estas razones la vegetación predominante en la Puna son los arbustos bajos como la <strong>Tola</strong> y la <strong>Tolilla</strong>, que parecen humildes… pero son verdaderas maestras de la supervivencia.
      </p>

      <div className="imagen-destacada-container">
        <img src={import.meta.env.BASE_URL + "Tola.jpg"} alt="Planta de Tola en la Puna" className="imagen-destacada" />
      </div>

      <div className="sabias-que-box">
        <h5 className="sabias-que-titulo">El Árbol de las Alturas</h5>
        <p className="sabias-que-texto">
          La <strong>queñoa</strong> es el único árbol que crece entre los 3500 y 4300 metros de altura sobre el nivel del mar.
        </p>
        <img src={import.meta.env.BASE_URL + "Quenoa.jpg"} alt="Bosquecillo de Queñoa" className="imagen-en-box" />
      </div>
      
      <h3 className="sala-contenido-subtitulo">La vicuña: hecha a medida para la altura</h3>
      <p className="sala-contenido-parrafo">
        Pequeña, ligera y eficiente, la vicuña es el animal más emblemático de la Puna.
      </p>
      <ul className="sala-contenido-lista">
        <li>Tiene almohadillas en las patas que no erosionan el suelo.</li>
        <li>Sus incisivos afilados cortan los brotes sin arrancarlos.</li>
        <li>Puede cerrar sus fosas nasales para protegerse del viento.</li>
        <li>Y su sangre contiene glóbulos rojos especiales que aprovechan al máximo el poco oxígeno del aire.</li>
      </ul>
      <p className="sala-contenido-parrafo">
        Vivir en altura es difícil. Pero la vicuña lo hace con elegancia.
      </p>
      
      <div className="imagen-destacada-container">
        <img src={import.meta.env.BASE_URL + "vicuna_montana.JPG"} alt="Vicuña en un paisaje montañoso de la Puna" className="imagen-destacada" />
      </div>

      <h3 className="sala-contenido-subtitulo">Pequeños mamíferos, grandes especialistas</h3>
      <p className="sala-contenido-parrafo">
        En los cerros y roquedales, muchas especies se ocultan de la vista. Los roedores como el <strong>chinchillón</strong>, la <strong>chinchilla real</strong> o la <strong>rata chinchilla</strong> son los más comunes, y dan alimento a pequeños carnívoros como:
      </p>
      <ul className="sala-contenido-lista">
          <li>El zorro colorado,</li>
          <li>El gato de los pajonales,</li>
          <li>El hurón,</li>
          <li>Y el zorrino real.</li>
      </ul>
      <p className="sala-contenido-parrafo">
        Aunque discretos, todos juegan un rol clave en el equilibrio del ecosistema.
      </p>
       {/* <div className="imagen-destacada-container">
        <img src={import.meta.env.BASE_URL + "Chinchilla.jpg"} alt="Zorro colorado andino" className="imagen-destacada" />
        <img src={import.meta.env.BASE_URL + "zorro-chinchilla.JPG"} alt="Zorro colorado andino" className="imagen-destacada" />
        <img src={import.meta.env.BASE_URL + "zorro-chinchilla2.JPG"} alt="Zorro colorado andino" className="imagen-destacada" />
      
      </div> */}

      <CarouselGallery images={chinchilla} title="" />
      <h3 className="sala-contenido-subtitulo">Aves que llenan de vida las lagunas de altura</h3>
      <p className="sala-contenido-parrafo">
        Donde hay agua, hay vida. En las grandes lagunas de la Puna se concentran cientos de aves, tanto residentes como migratorias. Vas a poder reconocer a:
      </p>
      <ul className="sala-contenido-lista">
        <li>El chorlito puneño,</li>
        <li>El chorlito de vincha,</li>
        <li>El tero serrano,</li>
        <li>La avoceta andina,</li>
        <li>La becasina andina y</li>
        <li>La gaviota andina, entre muchas otras.</li>
      </ul>
      <p className="sala-contenido-parrafo">
        Algunas viajan miles de kilómetros cada año. Otras viven aquí todo el tiempo. Juntas, llenan de movimiento el cielo del altiplano.
      </p>

      <CarouselGallery images={galeriaAves} title="Aves de las Lagunas Altoandinas" />

    </article>
  );
};