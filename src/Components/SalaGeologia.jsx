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

// --- NUEVO: Importa los estilos base de Swiper ---
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// --- NUEVO: Datos para la Galería de Volcanes ---
const imagenesVolcanes = [
  // (Tu array completo de imágenes aquí)
  {
    nombre: "Cero archibarca",
    fecha: "23/4/2025 10:49",
    tipo: "Archivo JPG",
    tamaño: "52 KB",
    nombreArchivo: "Cerro_archibarca.jpg",
  },
  {
    nombre: "mapa_puna_argentina",
    fecha: "23/4/2025 09:13",
    tipo: "Archivo PNG",
    tamaño: "322 KB",
    nombreArchivo: "mapa_puna_argentina.png",
  },
  {
    nombre: "Nevado de acay",
    fecha: "23/4/2025 10:12",
    tipo: "Archivo JPG",
    tamaño: "32 KB",
    nombreArchivo: "Nevado_acay.jpg",
  },
  {
    nombre: "Volcan Aracar",
    fecha: "22/4/2025 18:49",
    tipo: "Archivo JPG",
    tamaño: "60 KB",
    nombreArchivo: "Volcan_Aracar.jpg",
  },
  {
    nombre: "Volcan de Pocitos",
    fecha: "23/4/2025 10:16",
    tipo: "Archivo JPG",
    tamaño: "255 KB",
    nombreArchivo: "Volcan_Pocitos.jpg",
  },
  {
    nombre: "Volcan Lastarria",
    fecha: "22/4/2025 19:14",
    tipo: "Archivo JPG",
    tamaño: "1,523 KB",
    nombreArchivo: "Volcan_Lastarria.jpg",
  },
  {
    nombre: "Volcan Quehuar",
    fecha: "23/4/2025 10:06",
    tipo: "Archivo JPG",
    tamaño: "365 KB",
    nombreArchivo: "Volcan_Quehuar.jpg",
  },
  {
    nombre: "Volcan Tuzgle - Puna",
    fecha: "22/4/2025 18:19",
    tipo: "Archivo JPG",
    tamaño: "137 KB",
    nombreArchivo: "Volcan_Tuzgle_Puna.jpg",
  },
  {
    nombre: "Volcan_llullaillaco_cara_oeste_christian_vitry_3",
    fecha: "22/4/2025 17:46",
    tipo: "Archivo JPG",
    tamaño: "189 KB",
    nombreArchivo: "Volcan_llullaillaco_cara_oeste_christian_vitry_3.jpg",
  },
  {
    nombre: "Volcan_llullaillaco_christian_vitry_23-vista sur",
    fecha: "22/4/2025 17:47",
    tipo: "Archivo JPG",
    tamaño: "231 KB",
    nombreArchivo: "Volcan_llullaillaco_christian_vitry_23-vista_sur.jpg",
  },
  {
    nombre: "Volcan_Ratones_panoramio",
    fecha: "23/4/2025 10:02",
    tipo: "Archivo JPG",
    tamaño: "24 KB",
    nombreArchivo: "Volcan_Ratones_panoramio.jpg",
  },
  {
    nombre: "Volcan_Socompa",
    fecha: "22/4/2025 14:23",
    tipo: "Archivo JPG",
    tamaño: "126 KB",
    nombreArchivo: "Volcan_Socompa.jpg",
  },
];

// --- 2. PREPARA TODO EL TEXTO DE LA SALA ---

const salaGeologiaText = `
GEOLOGÍA.
¿Sabías que hay un lugar en Argentina donde el agua nunca llega al mar?

La Puna es una región única en el planeta. Nos encontramos a más de 4.000 metros sobre el nivel del mar, en un paisaje que parece de otro mundo: volcanes, salares, lagunas de colores intensos y un clima tan extremo como fascinante.
Esta región forma parte de una cuenca endorreica, un tipo especial de cuenca donde el agua no tiene salida al mar. Aquí, el agua se evapora o se filtra en el suelo, dejando atrás sales y minerales que se acumulan  y dan origen a los salares.

La Puna está encerrada entre dos grandes cordilleras:
Al oeste, la Cordillera Volcánica Occidental, rica en volcanes activos e inactivos.
Al este, la Cordillera Oriental, formada por importantes montañas y valles.

Fuerzas de fuego y vapor: volcanes y géiseres.
Bajo nuestros pies, la Tierra está viva. La actividad volcánica y geotérmica de la Puna crea fuentes termales, géiseres, campos fumarólicos y depósitos minerales.
La energía interna del planeta se manifiesta aquí de forma directa:
Volcanes: expulsan lava, gases y cenizas.
Géiseres y fumarolas: nos muestran el calor subterráneo emergiendo en forma de vapor.
Suelos mineralizados: el agua caliente que circula bajo tierra disuelve minerales que, al enfriarse, se depositan en la superficie.

¿Cómo se forma un volcán?
Bajo la superficie terrestre, a varios kilómetros de profundidad, ocurren procesos silenciosos pero poderosos. Cuando la presión disminuye bruscamente en las capas internas de la Tierra, las temperaturas suben tanto que las rocas comienzan a fundirse. Así se forma el magma, una mezcla incandescente de minerales derretidos.
Este magma busca salir. A medida que asciende, se abre paso entre las fracturas de la corteza terrestre y cristaliza nuevos minerales. Cuando finalmente encuentra una salida, erupciona violentamente o se derrama suavemente, dependiendo de su composición.
Con cada erupción, el volcán crece: se acumulan capas de lava, cenizas, escoria y gases solidificados. Esas capas forman poco a poco lo que llamamos el "edificio volcánico", cuya forma varía según el tipo de magma y la intensidad de la actividad.
En la región de la Puna, los volcanes no solo moldean el paisaje: también son el origen de muchos de los minerales valiosos que encontramos en esta zona, como azufre, litio y oro. La energía del interior de la Tierra se transforma, aquí, en una fuente de riqueza natural.

¿Sabías qué...?
Algunos volcanes de la Puna estuvieron activos hace miles o millones de años, pero sus huellas aún se conservan en cráteres, conos y flujos de lava fosilizados. Hoy, muchos de esos antiguos volcanes son claves para entender la formación de los salares y depósitos minerales de la región.

¿Qué es un géiser?
Imaginá un volcán, pero en lugar de arrojar lava, lanza al cielo chorros de agua hirviendo y vapor.
Eso es un géiser: una manifestación espectacular del calor oculto bajo la Tierra.
En las profundidades del suelo, el agua se filtra hasta entrar en contacto con rocas muy calientes, calentadas por el magma. Esa agua se convierte en vapor a presión, que busca salir a la superficie y cuando la presión es demasiado alta, el géiser entra en erupción, expulsando con fuerza una mezcla de agua caliente y vapor.
Aunque duran solo unos segundos o minutos, estas erupciones pueden alcanzar varios metros de altura, y se repiten una y otra vez durante años o incluso siglos


¿Sabías qué…?
Los géiseres son muy raros en el planeta. Se necesitan condiciones muy precisas de calor, agua subterránea y una geología especial. En la Puna argentina, podés ver fenómenos similares en los campos geotermales, donde el vapor sale por grietas en la tierra… ¡como si la Tierra respirara!

¿Cómo nace un Salar?
En las vastas alturas de la Puna, donde el cielo es inmenso y la lluvia escasa, la Tierra ha creado paisajes deslumbrantes: planicies blancas y resplandecientes que parecen hechas de hielo, pero están compuestas por sal.
Estos salares no siempre estuvieron allí. Se formaron a lo largo de miles —incluso millones— de años, cuando una serie de factores muy particulares coincidieron en un mismo lugar: Una depresión natural en el terreno, sin salida hacia el mar
Volcanes activos, que liberan minerales, gases y cenizas
Aguas termales cargadas de elementos químicos provenientes del interior de la Tierra
Fragmentos de roca erosionada, polvo y materia volcánica transportados por el viento
Y sobre todo, un clima extremadamente árido, con mucha evaporación y casi nada de lluvia
Con el tiempo, esas depresiones se llenaron con agua de lluvia, deshielos y manantiales calientes pero en lugar de formar ríos o lagos permanentes, el agua simplemente se evaporó, precipitando todos los compuestos disueltos. Así comenzaron a formarse las grandes planicies de sal.
Bajo esa costra blanca y brillante, todavía queda agua muy salada, conocida como salmuera, donde flotan elementos como el litio, potasio y magnesio. Esta salmuera es una de las mayores riquezas naturales de la Puna, y hoy es clave para tecnologías limpias y energías renovables.

¿Sabías qué...?
El litio que permite que funcionen los celulares, notebooks y autos eléctricos se extrae, en gran parte, de las salmueras escondidas bajo los salares del noroeste argentino. La Puna forma parte del Triángulo del Litio, una de las regiones más estratégicas del planeta.

El lenguaje secreto de la Puna.
Aunque parezca un paisaje detenido en el tiempo, la Puna está en constante transformación. La falta de lluvias, el viento seco y el sol abrasador del día, seguidos por noches heladas, son verdaderos escultores del paisaje. La roca se quiebra, se convierte en grava y lentamente, el desierto se expande.
Los habitantes de la región han aprendido a leer  las señales de la naturaleza en los cerros, y lo llaman “los cerros brujos”.

Los cerros brujos: sabiduría ancestral del clima.
Los pueblos originarios del altiplano no usan apps meteorológicas. Durante generaciones han observado cómo se comportan las nubes alrededor de los cerros:
¿Una corona blanca sobre la cima? Puede nevar.
¿Nubes que se aferran a la ladera? Se aproxima humedad.
Estos cerros “avisadores” son parte del paisaje… y del conocimiento local.
`;
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

  // --- 3. USA EL HOOK PARA REGISTRAR EL TEXTO ---
  useRegisterText(salaGeologiaText);

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

  const galeriaSalares = [
    import.meta.env.BASE_URL + "salar_1.jpg",
    import.meta.env.BASE_URL + "salar_2.jpg",
    import.meta.env.BASE_URL + "salar_3.jpg",
    import.meta.env.BASE_URL + "salar_4.jpg",
    import.meta.env.BASE_URL + "salar_5.jpg",
  ];

  return (
    <article className="sala-contenido-container">
      <h2 className="sala-contenido-titulo-principal">GEOLOGÍA</h2>
      <h3 className="sala-contenido-subtitulo">
        ¿Sabías que hay un lugar en Argentina donde el agua nunca llega al mar?
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
        <strong>La Puna es una región única en el planeta.</strong> 
        <br />
        Nos encontramos a más de 4.000 metros sobre el nivel del mar, en un paisaje que parece de otro
        mundo: volcanes, salares, lagunas de colores intensos y un clima tan
        extremo como fascinante.
      </p>
      <p className="sala-contenido-parrafo">
        Esta región forma parte de una <strong>cuenca endorreica</strong>, un
        tipo especial de cuenca donde el agua no tiene salida al mar. Aquí, el
        agua se evapora o se filtra en el suelo, dejando atrás sales y minerales
        que se acumulan y dan origen a los salares.
      </p>

      {/* --- MODIFICADO: Usamos el nuevo componente de carrusel --- */}
      <CarouselGallery
        images={galeriaCuencas}
        title="Vistas de cuencas en la Puna"
      />

      {/* El resto del contenido sigue igual... */}
      <p className="sala-contenido-parrafo">
        La Puna está encerrada entre dos grandes cordilleras:
      </p>
      <ul className="sala-contenido-lista">
        <li>
          Al oeste, <strong>la Cordillera Volcánica Occidental</strong>, rica en
          volcanes activos e inactivos.
        </li>
        <li>
          Al este, <strong>la Cordillera Oriental</strong>, formada por
          importantes montañas y valles.
        </li>
      </ul>

      <h3 className="sala-contenido-subtitulo">
        Fuerzas de fuego y vapor: volcanes y géiseres
      </h3>
      {/* ... más contenido ... */}
      <p className="sala-contenido-parrafo">
        Bajo nuestros pies, la Tierra está viva. La actividad volcánica y
        geotérmica de la Puna crea fuentes termales, géiseres, campos
        fumarólicos y depósitos minerales.
      </p>
      <p className="sala-contenido-parrafo">
        La energía interna del planeta se manifiesta aquí de forma directa:
      </p>
      <ul className="sala-contenido-lista">
        <li>
          <strong>Volcanes:</strong> expulsan lava, gases y cenizas.
        </li>
        <li>
          <strong>Géiseres y fumarolas:</strong> nos muestran el calor
          subterráneo emergiendo en forma de vapor.
        </li>
        <li>
          <strong>Suelos mineralizados:</strong> el agua caliente que circula
          bajo tierra disuelve minerales que, al enfriarse, se depositan en la
          superficie.
        </li>
      </ul>

      <h3 className="sala-contenido-subtitulo">¿Cómo se forma un volcán?</h3>
      <p className="sala-contenido-parrafo">
        Bajo la superficie terrestre, a varios kilómetros de profundidad,
        ocurren procesos silenciosos pero poderosos. Cuando la presión disminuye
        bruscamente en las capas internas de la Tierra, las temperaturas suben
        tanto que las rocas comienzan a fundirse. Así se forma el magma, una
        mezcla incandescente de minerales derretidos.
      </p>
      <p className="sala-contenido-parrafo">
        Este magma busca salir. A medida que asciende, se abre paso entre las
        fracturas de la corteza terrestre y cristaliza nuevos minerales. Cuando
        finalmente encuentra una salida, erupciona violentamente o se derrama
        suavemente, dependiendo de su composición.
      </p>
      <p className="sala-contenido-parrafo">
        Con cada erupción, el volcán crece: se acumulan capas de lava, cenizas,
        escoria y gases solidificados. Esas capas forman poco a poco lo que
        llamamos el "edificio volcánico", cuya forma varía según el tipo de
        magma y la intensidad de la actividad.
      </p>

      {/* Espacio para la imagen grande del volcán */}
      <div className="imagen-destacada-container">
        {/*
          IMPORTANTE: Cambia esta ruta por la real de tu imagen del volcán.
          Debe estar en la carpeta /public de tu proyecto.
          Ejemplo: '/img/geologia/esquema-volcan.png'
        */}
        <img
          src={import.meta.env.BASE_URL + "funcionamiento_volcan.jpg"}
          alt="Esquema del funcionamiento de un volcán"
          className="imagen-destacada imagen-volcan"
        />
      </div>

      <p className="sala-contenido-parrafo">
        En la región de la Puna, los volcanes no solo moldean el paisaje:
        también son el origen de muchos de los minerales valiosos que
        encontramos en esta zona, como azufre, litio y oro. La energía
        del interior de la Tierra se transforma, aquí, en una fuente de riqueza
        natural.
      </p>

      <div className="sabias-que-box">
        <h5 className="sabias-que-titulo">¿Sabías qué...?</h5>
        <p className="sabias-que-texto">
          Algunos volcanes de la Puna estuvieron activos hace miles o millones
          de años, pero sus huellas aún se conservan en cráteres, conos y flujos
          de lava fosilizados. Hoy, muchos de esos antiguos volcanes son claves
          para entender la formación de los salares y depósitos minerales de la
          región.
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

      <h4 className="sala-contenido-subtitulo-menor">¿Qué es un géiser?</h4>
      <p className="sala-contenido-parrafo">
        Imaginá un volcán, pero en lugar de arrojar lava, lanza al cielo chorros
        de agua hirviendo y vapor. Eso es un géiser: una manifestación
        espectacular del calor oculto bajo la Tierra. En las profundidades del
        suelo, el agua se filtra hasta entrar en contacto con rocas muy
        calientes, calentadas por el magma. Esa agua se convierte en vapor a
        presión, que busca salir a la superficie y cuando la presión es
        demasiado alta, el géiser entra en erupción, expulsando con fuerza una
        mezcla de agua caliente y vapor. Aunque duran solo unos segundos o
        minutos, estas erupciones pueden alcanzar varios metros de altura, y se
        repiten una y otra vez durante años o incluso siglos
      </p>
      <p className="sala-contenido-parrafo">
        En las profundidades del suelo, el agua se filtra hasta entrar en
        contacto con rocas muy calientes, calentadas por magma cercano. Esa agua
        se convierte en vapor a presión, que busca salir a la superficie. Cuando
        la presión es demasiado alta, el géiser entra en erupción, expulsando
        con fuerza una mezcla de agua caliente y vapor.
      </p>
      <p className="sala-contenido-parrafo">
        Aunque duran solo unos segundos o minutos, estas erupciones pueden
        alcanzar varios metros de altura, ¡y se repiten una y otra vez durante
        años o incluso siglos!
      </p>

      {/* Contenedor para el video responsivo */}
      {/* <div className="video-responsive-container">
        <iframe
          className="video-iframe"
          src="https://www.youtube.com/embed/7jSFEkezaxw"
          title="Video de un Géiser"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div> */}
      {/* <p className="video-caption">
        También puedes ver el video en{" "}
        <a
          href="https://drive.google.com/file/d/1zHREdABSef0N18SU6AUvViC2b0B_0QHa/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Drive
        </a>
        .
      </p> */}

      <div className="video-geiser">
        <video
          controls
          preload="auto"
          src={`${import.meta.env.BASE_URL}video-geiser.mp4`} // <-- REEMPLAZA
        >
          Tu navegador no soporta la etiqueta de video.
        </video>
      </div>

      <div className="sabias-que-box">
        <h5 className="sabias-que-titulo">¿Sabías qué…?</h5>
        <p className="sabias-que-texto">
          Los géiseres son muy raros en el planeta. Se necesitan condiciones muy
          precisas de calor, agua subterránea y una geología especial. En la
          Puna argentina, podés ver fenómenos similares en los campos
          geotermales, donde el vapor sale por grietas en la tierra… ¡como si la
          Tierra respirara!
        </p>
      </div>

      <h4 className="sala-contenido-subtitulo-menor">¿Cómo nace un Salar?</h4>
      <p className="sala-contenido-parrafo">
        En las vastas alturas de la Puna, donde el cielo es inmenso y la lluvia
        escasa, la Tierra ha creado paisajes deslumbrantes: planicies blancas y
        resplandecientes que parecen hechas de hielo, pero están compuestas por
        sal.
      </p>
      <p className="sala-contenido-parrafo">
        Estos salares no siempre estuvieron allí, se formaron a lo largo de
        miles —incluso millones— de años, cuando una serie de factores muy
        particulares que coincidieron en un mismo lugar:
        <ul>
          <li>Una depresión natural en el terreno, sin salida hacia el mar</li>
          <li>Volcanes activos, que liberan minerales, gases y cenizas</li>
          <li>
            Aguas termales cargadas de elementos químicos provenientes del
            interior de la Tierra
          </li>
          <li>
            Fragmentos de roca erosionada, polvo y materia volcánica
            transportados por el viento
          </li>
          <li>
            Y sobre todo, un clima extremadamente árido, con mucha evaporación y
            casi nada de lluvia
          </li>
        </ul>
      </p>
      <p className="sala-contenido-parrafo">
        Con el tiempo, esas depresiones se llenaron con agua de lluvia,
        deshielos y manantiales calientes pero en lugar de formar ríos o lagos
        permanentes, el agua simplemente se evaporó, precipitando todos los
        compuestos disueltos. Así comenzaron a formarse las grandes planicies de
        sal. Bajo esa costra blanca y brillante, todavía queda agua muy salada,
        conocida como salmuera, donde flotan elementos como el litio, potasio y
        magnesio. Esta salmuera es una de las mayores riquezas naturales de la
        Puna, y hoy es clave para tecnologías limpias y energías renovables.
      </p>

      <div className="sabias-que-box">
        <h5 className="sabias-que-titulo">¿Sabías qué...?</h5>
        <p className="sabias-que-texto">
          El litio permite que funcionen los celulares, notebooks y autos
          eléctricos se extrae, en gran parte, de las salmueras escondidas bajo
          los salares del noroeste argentino. La Puna forma parte del{" "}
          <strong>Triángulo del Litio</strong>, una de las regiones más
          estratégicas del planeta.
        </p>
      </div>

      {/* --- MODIFICADO: Usamos el nuevo componente de carrusel --- */}
      {/*       <CarouselGallery images={galeriaSalares} title="Salares de la Puna" />
       */}
      <h3 className="sala-contenido-subtitulo">
        El lenguaje secreto de la Puna
      </h3>
      <p className="sala-contenido-parrafo">
        Aunque parezca un paisaje detenido en el tiempo, la Puna está en
        constante transformación. La falta de lluvias, el viento seco y el sol
        abrasador del día, seguidos por noches heladas, son verdaderos
        escultores del paisaje. La roca se quiebra, se convierte en grava y
        lentamente, el desierto se expande. Los habitantes de la región han
        aprendido a leer las señales de la naturaleza en los cerros, y lo llaman
        “los cerros brujos”.
      </p>

      <h4 className="sala-contenido-subtitulo-menor">
        Los cerros brujos: sabiduría ancestral del clima
      </h4>
      <p className="sala-contenido-parrafo">
        Los pueblos originarios del altiplano no usan apps meteorológicas.
        Durante generaciones han observado cómo se comportan las nubes alrededor
        de los cerros:
      </p>
      <ul className="sala-contenido-lista">
        <li>
          <strong>¿Una corona blanca sobre la cima?</strong> <em>Puede nevar.</em>
        </li>
        <li>
          <strong>¿Nubes que se aferran a la ladera?</strong> <em>Se aproxima humedad.</em>
        </li>
      </ul>
      <p className="sala-contenido-parrafo">
        Estos cerros “avisadores” son parte del paisaje… y del conocimiento
        local.
      </p>
    </article>
  );
};
