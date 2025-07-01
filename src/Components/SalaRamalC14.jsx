// src/components/Salas/SalaRamalC14.jsx

import React, { useState, useRef } from "react";
// Importamos los CSS necesarios
import "./SalaGeologia.css";
import "../SalaRamalC14.css";
import "./SalaRamalGaleria.css"; // CSS para la galería (si tiene estilos específicos)

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
    {title && <h4 className="gallery-title">{title}</h4>}
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
  "locomotora_gm_gt22cu_smixto02.jpg",
  "locomotora_henschel_e4.jpg",
  "locomotora_skoda_e5.jpg",
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
  "recorrido_1653050.jpeg",
  "trabajadores_sobre_rieles_foto_ramal_c14_1922.jpg",
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
          preload="metadata"
          poster={posterSrc}
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

const salaRamalC14Text = `
RAMAL C-14.

Construido a fuerza de pico, pala, dinamita y carretillas, el Ramal C14 requirió el esfuerzo de más de 1.000 trabajadores que enfrentaron condiciones climáticas severas, altura extrema y terrenos abruptos. Su recorrido de 571 kilómetros es un verdadero monumento al ingenio humano, con:
1.400 curvas, 31 puentes, 21 túneles, 13 viaductos, 2 rulos (tramos en espiral), 2 zigzag, y 9 cobertizos.
Entre todas estas estructuras, el Viaducto La Polvorilla, construido entre 1930 y 1932, se destaca como un símbolo de esta hazaña: tiene 224 metros de largo, forma curva y se eleva 63 metros sobre el suelo, desafiando las alturas.

Una Historia de Decisiones, Cambios y Visión de Futuro.
1889: Se inician los primeros estudios para unir Salta con Antofagasta mediante un ferrocarril trasandino.
1905: La Ley 2693 autoriza oficialmente el proyecto.
1921: El presidente Hipólito Yrigoyen da el impulso decisivo y nombra al Ing. Richard Fontaine Maury como jefe de obra.
1929: El tendido de rieles llega a San Antonio de los Cobres, uno de los puntos más emblemáticos del trazado.
1948: El 20 de febrero se inaugura la conexión internacional con Chile por el paso de Socompa, en plena presidencia de Juan Domingo Perón. Ese mismo año, el ramal pasa a formar parte del Ferrocarril General Belgrano.

Mucho más que rieles.
El Ramal C14 no fue solo una vía de comunicación: fue una estrategia para integrar los territorios más aislados del país. El proyecto buscaba conectar zonas ricas en recursos minerales, como boratos y litio, con los puertos del Pacífico, facilitando el desarrollo económico y reduciendo la dependencia de rutas marítimas largas.
Así lo expresaba Eduardo Holmberg (hijo) a comienzos del siglo XX:
"Hay que enviar geólogos que descifren los secretos de la montaña, en cuyo seno hay escondidos filones preciosos; y hay que llevar una vía férrea hasta las mismas salidas de las punas, para que la exportación de la materia prima sea posible."

Del progreso al turismo: El Tren a las Nubes.
A fines del siglo XX, parte del trazado original del Ramal C14 se convirtió en uno de los viajes turísticos más famosos del país: el Tren a las Nubes. Su recorrido, que atraviesa paisajes imponentes de la Puna salteña, es una experiencia única que combina historia, ingeniería y naturaleza.
Este tren se ha consolidado como una oferta turística internacional, manteniendo viva la memoria de una obra que transformó el paisaje y la vida en los Andes.
`;

// --- COMPONENTE PRINCIPAL DE LA SALA ---
export const SalaRamalC14 = () => {

  useRegisterText(salaRamalC14Text);

  const galeriaFotosAntiguas = [
    "/img/ramal/antiguas/foto_1.jpg", // REEMPLAZA ESTAS RUTAS
    "/img/ramal/antiguas/foto_2.jpg",
    "/img/ramal/antiguas/foto_3.jpg",
  ];

  return (
    <article className="sala-contenido-container sala-contenido-container-ramal">
      <h2 className="sala-contenido-titulo-principal">RAMAL C-14</h2>

      {/* --- Primer Bloque: La hazaña de la construcción --- */}
      <section className="ramal-bloque">
        <p className="sala-contenido-parrafo">
          Construido a fuerza de pico, pala, dinamita y carretillas, el Ramal
          C14 requirió el esfuerzo de más de 1.000 trabajadores que enfrentaron
          condiciones climáticas severas, altura extrema y terrenos abruptos. Su
          recorrido de 571 kilómetros es un verdadero monumento al ingenio
          humano, con:
        </p>
        <ul className="sala-contenido-lista">
          <li>1.400 curvas</li>
          <li>31 puentes</li>
          <li>21 túneles</li>
          <li>13 viaductos</li>
          <li>2 rulos (tramos en espiral)</li>
          <li>2 zigzag</li>
          <li>9 cobertizos</li>
        </ul>
        <p className="sala-contenido-parrafo">
          Entre todas estas estructuras, el Viaducto La Polvorilla, construido
          entre 1930 y 1932, se destaca como un símbolo de esta hazaña: tiene
          224 metros de largo, forma curva y se eleva 63 metros sobre el suelo,
          desafiando las alturas.
        </p>
        {/* Aquí va la galería de las fotos viejas */}

        <CarouselGallery
          images={imagenesCarrusel.map(
            (img) => `${import.meta.env.BASE_URL}${img}`
          )}
          title="Imágenes históricas de la construcción"
          customClassName="carrusel-fotos-antiguas" // <-- AÑADE ESTA PROP
        />

        <CarouselGallery
          images={imagenesCarrusel2.map(
            (img) => `${import.meta.env.BASE_URL}/ramalc14/${img}`
          )}
          title="Mas imágenes históricas de la construcción"
          customClassName="carrusel-fotos-antiguas" // <-- AÑADE ESTA PROP
        />

        {/* <GaleriaRamal /> */}
      </section>

      {/* --- Segundo Bloque: Hitos históricos --- */}
      <section className="ramal-bloque">
        <h3 className="sala-contenido-subtitulo">
          Una Historia de Decisiones, Cambios y Visión de Futuro
        </h3>
        <ul className="sala-contenido-lista">
          <li>
            <strong>1889:</strong> Se inician los primeros estudios para unir
            Salta con Antofagasta mediante un ferrocarril trasandino.
          </li>
          <li>
            <strong>1905:</strong> La Ley 2693 autoriza oficialmente el
            proyecto.
          </li>
          <li>
            <strong>1921:</strong> El presidente Hipólito Yrigoyen da el impulso
            decisivo y nombra al Ing. Richard Fontaine Maury como jefe de obra.
          </li>
          <li>
            <strong>1929:</strong> El tendido de rieles llega a San Antonio de
            los Cobres, uno de los puntos más emblemáticos del trazado.
          </li>
          <li>
            <strong>1948:</strong> El 20 de febrero se inaugura la conexión
            internacional con Chile por el paso de Socompa, en plena presidencia
            de Juan Domingo Perón. Ese mismo año, el ramal pasa a formar parte
            del Ferrocarril General Belgrano.
          </li>
        </ul>
        {/* Video de Facebook */}
        <VideoPlayer
          videoSrc={import.meta.env.BASE_URL + "viaje_ramal_video.mp4"} // REEMPLAZA ESTA RUTA
          posterSrc={
            import.meta.env.BASE_URL + "/img/ramal/posters/poster_1926.jpg"
          } // REEMPLAZA ESTA RUTA
          /* title="Viaje por el Ramal C14 en 1926" */
          subtitle="Viaje por el Ramal C14 en 1926. Video cortesía de Archivo General de la Nación."
        />
      </section>

      {/* --- Tercer Bloque: Estrategia y desarrollo --- */}
      <section className="ramal-bloque">
        <h3 className="sala-contenido-subtitulo">Mucho más que rieles</h3>
        <p className="sala-contenido-parrafo">
          El Ramal C14 no fue solo una vía de comunicación: fue una estrategia
          para integrar los territorios más aislados del país. El proyecto
          buscaba conectar zonas ricas en recursos minerales, como boratos y
          litio, con los puertos del Pacífico, facilitando el desarrollo
          económico y reduciendo la dependencia de rutas marítimas largas.
        </p>
        <blockquote className="ramal-quote">
          <p>
            "Hay que enviar geólogos que descifren los secretos de la montaña,
            en cuyo seno hay escondidos filones preciosos; y hay que llevar una
            vía férrea hasta las mismas salidas de las punas, para que la
            exportación de la materia prima sea posible."
          </p>
          <footer>- Eduardo Holmberg (hijo), comienzos del siglo XX</footer>
        </blockquote>
        {/* Video de YouTube que ya tenías */}
        <VideoPlayer
          videoSrc={import.meta.env.BASE_URL + "trasandino_del_norte_comp.mp4"} // REEMPLAZA ESTA RUTA (es el que ya tenías)
          posterSrc={import.meta.env.BASE_URL + "poster_trasandino.jpg"} // REEMPLAZA ESTA RUTA
          /* title="El Trasandino del Norte" */
          subtitle="El Trasandino del Norte. Imágenes históricas de la construcción y operación del tren."
        />
        {/* Botones a los documentales */}
        {/* <div className="ramal-documentales-links">
            <h4 className="sala-contenido-subtitulo-menor">Ver Documentales</h4>
            <a href="https://youtu.be/g_dC66VQdR0?si=vT0GJxWgrnZzqmSx" target="_blank" rel="noopener noreferrer" className="ramal-boton-link">Documental 1</a>
            <a href="https://youtu.be/ZBsOFQeSYcI?si=HcSqtSy9BAAhLpI6" target="_blank" rel="noopener noreferrer" className="ramal-boton-link">Documental 2</a>
            <a href="https://youtu.be/GraN8x2TSWU?si=RtAXFy5LSPHdQw_4" target="_blank" rel="noopener noreferrer" className="ramal-boton-link">Documental 3</a>
        </div> */}
      </section>

      {/* --- Cuarto Bloque: El Tren a las Nubes --- */}
      <section className="ramal-bloque">
        <h3 className="sala-contenido-subtitulo">
          Del progreso al turismo: El Tren a las Nubes
        </h3>
        <p className="sala-contenido-parrafo">
          A fines del siglo XX, parte del trazado original del Ramal C14 se
          convirtió en uno de los viajes turísticos más famosos del país: el
          Tren a las Nubes. Su recorrido, que atraviesa paisajes imponentes de
          la Puna salteña, es una experiencia única que combina historia,
          ingeniería y naturaleza.
        </p>
        <p className="sala-contenido-parrafo">
          Este tren se ha consolidado como una oferta turística internacional,
          manteniendo viva la memoria de una obra que transformó el paisaje y la
          vida en los Andes.
        </p>
        <CarouselGallery
          images={galeriaTrenActual.map(
            (img) => `${import.meta.env.BASE_URL}${img}`
          )}
          title="El Tren a las Nubes en la actualidad"
        />
      </section>
    </article>
  );
};
