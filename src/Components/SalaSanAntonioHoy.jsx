// src/components/Salas/SalaSanAntonioHoy.jsx

import React from 'react';
// Importamos el CSS de Geología para reutilizar los estilos base
import "./SalaGeologia.css";
// Y un CSS específico para San Antonio Hoy
import "../SalaSanAntonioHoy.css";

// --- Importaciones de Swiper (necesarias para el carrusel) ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useRegisterText } from "../Contexts/SpeechContext";

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
            alt={`${title || "Galería San Antonio Hoy"} - Imagen ${index + 1}`}
            className="carousel-image"
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

const salaSanAntonioHoyText = `
SAN ANTONIO DE LOS COBRES HOY.

Un pueblo con raíces profundas.
San Antonio de los Cobres se extiende sobre una superficie de más de 11.000 kilómetros cuadrados, y cuenta con una población cercana a los 7.000 habitantes. Su nombre rinde homenaje a San Antonio de Padua, cuya imagen llegó desde la antigua Mina de Cobres en 1775, portada por comunidades Kolla tras la expulsión de los jesuitas. Aquella imagen sagrada aún hoy es venerada durante la tradicional fiesta patronal del 13 de junio, que reúne a toda la comunidad en un encuentro de fe, música, danza y reencuentro familiar.

Tejido, herencia y territorio.
Los telares y vestimentas que ves en esta sala son parte fundamental de la identidad cultural local. El tejido andino —realizado en telares rústicos o de cintura— conserva técnicas milenarias que se transmiten de generación en generación. Cada prenda no solo abriga: también narra historias, representa linajes, festividades, ciclos productivos y creencias.
Los colores, los motivos y los materiales (como la lana de llama o de oveja) hablan del entorno natural, del calendario agrícola y del mundo simbólico de las comunidades.

Escuela y saberes.
En San Antonio se encuentra la escuela más antigua de toda la región puneña: la Escuela Domingo Faustino Sarmiento, fundada en 1903 como Escuela Nacional Nº 1. Hoy sigue funcionando con el número 4.564, bajo jurisdicción provincial. Esta institución representa el esfuerzo por garantizar la educación en contextos geográficos extremos, y es también un espacio de transmisión de valores culturales locales, tanto ancestrales como contemporáneos.

La Pachamama: Madre Tierra, madre vida.
Una de las celebraciones más sentidas y difundidas en todo el Noroeste argentino es la Fiesta de la Pachamama, que se realiza cada 1º de agosto. “Pacha” significa tierra, universo en lengua quechua, y “mama” es madre. En esta fecha, las familias agradecen a la tierra todo lo que brinda: alimento, salud, abrigo. Se realiza la tradicional corpachada, donde se entierran ofrendas como hojas de coca, alimentos y bebidas.
Esta celebración, presente también en otras culturas andinas, es testimonio del fuerte vínculo espiritual entre el ser humano y la naturaleza. Un ejemplo claro de cómo las creencias indígenas perviven, incluso en contextos de transformación histórica, como la colonización y la evangelización.

Un testimonio del siglo XIX.
En 1870, el geólogo alemán Luis Brackebusch recorrió la región de San Antonio y escribió una crónica que hoy nos permite imaginar cómo era este paisaje humano y natural en el pasado. En su relato menciona a Ciriaco Colqui, un cacique Kolla que lo guió por la zona y le proporcionó información clave para sus estudios.
Brackebusch quedó impresionado por las casas de piedra, abandonadas durante el año, que se llenaban de vida en las grandes festividades religiosas. Su descripción del silencio nocturno, la vida dispersa en los parajes, y la comunión festiva anual nos conecta con una forma de habitar el territorio que —en muchos aspectos— todavía perdura.
`;

export const SalaSanAntonioHoy = () => {

  useRegisterText(salaSanAntonioHoyText);

  // --- Define aquí las rutas a tus imágenes (deben estar en la carpeta /public) ---
  const galeriaTejidos = [
    import.meta.env.BASE_URL + "tejido_1.JPG", // REEMPLAZA ESTAS RUTAS
    import.meta.env.BASE_URL + "tejido_2.JPG",
    import.meta.env.BASE_URL + "tejido_3.JPG",
    import.meta.env.BASE_URL + "tejido_4.JPG",
    import.meta.env.BASE_URL + "tejido_5.JPG",
    import.meta.env.BASE_URL + "tejido_6.JPG",
  ];
 
  return (
    <article className="sala-contenido-container">
      
      <h2 className="sala-contenido-titulo-principal">SAN ANTONIO DE LOS COBRES HOY</h2>

      {/* --- Primer Bloque: Raíces --- */}
      <section className="san-antonio-bloque">
        <h3 className="sala-contenido-subtitulo">Un pueblo con raíces profundas</h3>
        <p className="sala-contenido-parrafo">
          San Antonio de los Cobres se extiende sobre una superficie de más de 11.000 km², y cuenta con una población cercana a los 7.000 habitantes. Su nombre rinde homenaje a San Antonio de Padua, cuya imagen llegó desde la antigua Mina de Cobres en 1775, portada por comunidades Kolla tras la expulsión de los jesuitas. Aquella imagen sagrada aún hoy es venerada durante la tradicional fiesta patronal del 13 de junio, que reúne a toda la comunidad en un encuentro de fe, música, danza y reencuentro familiar.
        </p>
      </section>

      {/* --- Segundo Bloque: Tejidos y Carrusel --- */}
      <section className="san-antonio-bloque">
        <h3 className="sala-contenido-subtitulo">Tejido, herencia y territorio</h3>
        <p className="sala-contenido-parrafo">
          Los telares y vestimentas que ves en esta sala son parte fundamental de la identidad cultural local. El tejido andino —realizado en telares rústicos o de cintura— conserva técnicas milenarias que se transmiten de generación en generación. Cada prenda no solo abriga: también narra historias, representa linajes, festividades, ciclos productivos y creencias.
        </p>
        <p className="sala-contenido-parrafo">
          Los colores, los motivos y los materiales (como la lana de llama o de oveja) hablan del entorno natural, del calendario agrícola y del mundo simbólico de las comunidades.
        </p>
        
        {/* Aquí insertamos el carrusel */}
        <CarouselGallery images={galeriaTejidos} title="Técnicas y motivos del tejido andino" />
      </section>

      {/* --- Tercer Bloque: Escuela --- */}
      <section className="san-antonio-bloque">
        <h3 className="sala-contenido-subtitulo">Escuela y saberes</h3>
        <p className="sala-contenido-parrafo">
          En San Antonio se encuentra la escuela más antigua de toda la región puneña: la Escuela Domingo Faustino Sarmiento, fundada en 1903 como Escuela Nacional Nº 1. Hoy sigue funcionando con el número 4.564, bajo jurisdicción provincial. Esta institución representa el esfuerzo por garantizar la educación en contextos geográficos extremos, y es también un espacio de transmisión de valores culturales locales, tanto ancestrales como contemporáneos.
        </p>
      </section>

      {/* --- Cuarto Bloque: Pachamama --- */}
      <section className="san-antonio-bloque">
        <h3 className="sala-contenido-subtitulo">La Pachamama: Madre Tierra, madre vida</h3>
        <p className="sala-contenido-parrafo">
          Una de las celebraciones más sentidas y difundidas en todo el Noroeste argentino es la Fiesta de la Pachamama, que se realiza cada 1º de agosto. “Pacha” significa tierra, universo en lengua quechua, y “mama” es madre. En esta fecha, las familias agradecen a la tierra todo lo que brinda: alimento, salud, abrigo. Se realiza la tradicional corpachada, donde se entierran ofrendas como hojas de coca, alimentos y bebidas.
        </p>
        <p className="sala-contenido-parrafo">
          Esta celebración, presente también en otras culturas andinas, es testimonio del fuerte vínculo espiritual entre el ser humano y la naturaleza. Un ejemplo claro de cómo las creencias indígenas perviven, incluso en contextos de transformación histórica, como la colonización y la evangelización.
        </p>
      </section>
      
      {/* --- Quinto Bloque: Testimonio --- */}
      <section className="san-antonio-bloque">
        <h3 className="sala-contenido-subtitulo">Un testimonio del siglo XIX</h3>
        <p className="sala-contenido-parrafo">
          En 1870, el geólogo alemán Luis Brackebusch recorrió la región de San Antonio y escribió una crónica que hoy nos permite imaginar cómo era este paisaje humano y natural en el pasado. En su relato menciona a Ciriaco Colqui, un cacique Kolla que lo guió por la zona y le proporcionó información clave para sus estudios.
        </p>
        <p className="sala-contenido-parrafo">
          Brackebusch quedó impresionado por las casas de piedra, abandonadas durante el año, que se llenaban de vida en las grandes festividades religiosas. Su descripción del silencio nocturno, la vida dispersa en los parajes, y la comunión festiva anual nos conecta con una forma de habitar el territorio que —en muchos aspectos— todavía perdura.
        </p>
      </section>

    </article>
  );
};