import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSpeech } from "../Contexts/SpeechContext"; // Ajusta la ruta si es necesario
import "../SalaDetalle.css"; // Asegúrate que este archivo exista y tenga los estilos NUEVOS
import "./SalaGeologiaDetalleVolcanes.css"; // <<<--- NUEVO CSS para la galería específica
import ReactDOM from "react-dom"; // <-- AÑADE ReactDOM

// QUITA la importación de Masonry si ya no la usas en otro lado
// import Masonry from 'react-masonry-css';
import { VolcanoExplorer3D } from "./VolcanoExplorer3D"; // <<<--- IMPORTA EL NUEVO COMPONENTE 3D
import "./SalaGeologiaDetalleVolcanes3D.css"; // <<<--- NUEVO ARCHIVO CSS para estilos del overlay HTML

// ========================================================================
// =                          DATOS DE DETALLE                          =
// ========================================================================
// ASEGÚRATE DE QUE LAS RUTAS DE IMAGEN SEAN CORRECTAS Y ESTÉN EN /public
// O CONFIGURADAS CORRECTAMENTE EN TU BUNDLER (Vite, etc.)

const detallesGeologia = {
  // --- Origen ---
  origen: {
    title: "Origen Geológico", // Título más corto para encabezado
    fullTitle: "Origen y Formación Geológica de la Tierra",
    image: "/img/geologia/origen_tierra.jpg", // Imagen principal impactante
    sections: [
      {
        text: "Nuestro planeta, la Tierra, es un cuerpo dinámico con una historia fascinante que se extiende por miles de millones de años. Su formación comenzó hace aproximadamente 4.54 mil millones de años a partir de una nube de gas y polvo cósmico, la nebulosa solar. Por acción de la gravedad, este material comenzó a agruparse, formando protoplanetas, uno de los cuales se convertiría en la Tierra.",
      },
      {
        subtitle: "Diferenciación Planetaria",
        text: "En sus etapas iniciales, la Tierra era una masa fundida debido al calor generado por las colisiones y la desintegración radiactiva. Los elementos más densos, como el hierro y el níquel, se hundieron hacia el centro formando el núcleo, mientras que los materiales más ligeros ascendieron para formar el manto y la corteza. Este proceso de diferenciación sentó las bases de la estructura interna que conocemos hoy.",
        image: "/img/geologia/diferenciacion_tierra.jpg",
      },
      {
        subtitle: "La Tectónica de Placas",
        text: "La superficie terrestre no es estática. La litosfera, la capa externa rígida, está dividida en grandes placas tectónicas que 'flotan' sobre la astenosfera, una capa más dúctil del manto. El movimiento de estas placas, impulsado por corrientes de convección en el manto, es responsable de la formación de montañas, la actividad volcánica, los terremotos y la configuración de los continentes y océanos a lo largo del tiempo geológico.",
        // Sin imagen en esta sección para variar el layout
      },
    ],
    gallery: [
      {
        src: "/img/geologia/fosil_estromatolito.jpg",
        caption: "Estromatolitos: Vida temprana.",
      },
      {
        src: "/img/geologia/gran_canon.jpg",
        caption: "Capas geológicas (Gran Cañón).",
      },
      {
        src: "/img/geologia/pliegues_rocosos.jpg",
        caption: "Pliegues rocosos.",
      },
    ],
  },

  // --- Volcanes ---
  volcanes: {
    title: "Volcanes",
    fullTitle: "¿Cómo se forma un Volcán?",
    image: "volcan_museo.png", // RUTA ORIGINAL MANTENIDA
    sections: [
      {
        text: `
Cuando en las profundidades de la corteza terrestres disminuye la presión de forma abrupta. La temperatura sube a tal punto que se funden las rocas generando una sustancia llamada magma.
El magma sube a la superficie y e su camino se carga de minerales que se encuentran en las rocas entre las que asciende.
Al llegar a la superficie, se derrama como coladas de lava y mantos de escoria y cenizas.
De esta manera se va construyendo gradualmente el edificio del volcán cuya forma depende de la composición de la lava.
`,
      },
      /*  {
        subtitle: "Tipos de Volcanes",
        text: "Existen diversos tipos de volcanes, clasificados según su forma, tipo de erupción y composición del magma. Los principales son los volcanes en escudo (amplios, pendientes suaves, lavas fluidas), estratovolcanes o compuestos (cónicos, pendientes pronunciadas, alternancia de lava y piroclastos) y calderas volcánicas (grandes depresiones formadas por colapso tras erupciones masivas).",
        image: "volcan_museo2.png", // RUTA ORIGINAL MANTENIDA
      },
      {
        subtitle: "Volcanismo en los Andes",
        text: "La Cordillera de los Andes, donde se ubica nuestra región, es parte del Cinturón de Fuego del Pacífico, una de las zonas con mayor actividad volcánica y sísmica del mundo. El volcanismo andino está relacionado con la subducción de la Placa de Nazca bajo la Placa Sudamericana, generando numerosos volcanes activos y paisajes característicos como los que observamos en la Puna.",
        image: "volcan_museo3.png", // RUTA ORIGINAL MANTENIDA
      }, */
    ],
    gallery: [
      { src: "lava_pahoehoe.jpg", caption: "Lava fluida Pahoehoe." }, // RUTA ORIGINAL MANTENIDA
      { src: "erupcion_cenizas.jpg", caption: "Columna de cenizas." }, // RUTA ORIGINAL MANTENIDA
      { src: "domo_lava.jpg", caption: "Domo de lava viscosa." }, // RUTA ORIGINAL MANTENIDA
    ],
  },

  // --- Géiser ---
  geiser: {
    title: "Géiser",
    fullTitle: "",
    image: "geiser_museo.png", // RUTA ORIGINAL MANTENIDA
    sections: [
      {
        text: "Un géiser es un tipo especial de fuente termal que entra en erupción periódicamente, lanzando una columna de agua caliente y vapor al aire. Este fenómeno ocurre en áreas con actividad geotérmica donde el agua subterránea entra en contacto con rocas calentadas por magma cercano.",
      },
      {
        subtitle: "Cómo Funciona",
        text: "El mecanismo de un géiser implica un sistema de 'plomería' subterráneo. El agua fría se filtra hacia abajo y es calentada por encima de su punto de ebullición, pero la presión del agua superior evita que hierva. Eventualmente, el agua supercalentada forma burbujas de vapor que ascienden, reduciendo la presión sobre el agua inferior. Esto provoca una ebullición repentina y violenta, expulsando el agua y el vapor acumulados en una erupción.",
        image: "geiser_museo2.png", // RUTA ORIGINAL MANTENIDA
      },
      {
        subtitle: "Géiseres en el Mundo y los Andes",
        text: "Los campos de géiseres son raros y requieren condiciones geológicas específicas. Los más famosos se encuentran en Yellowstone (EE.UU.), Islandia y Nueva Zelanda. En los Andes, aunque menos comunes que otras manifestaciones termales, existen áreas con actividad de géiseres, como El Tatio en Chile, uno de los campos más grandes del hemisferio sur, mostrando la intensa actividad geotérmica de la región.",
        image: "geiser_museo3.png", // RUTA ORIGINAL MANTENIDA
      },
    ],
    gallery: [
      { src: "geiser_erupcion_detalle.jpg", caption: "Erupción en detalle." }, // RUTA ORIGINAL MANTENIDA
      { src: "fumarolas.jpg", caption: "Fumarolas geotérmicas." }, // RUTA ORIGINAL MANTENIDA
      {
        src: "fuente_termal_colorida.jpg",
        caption: "Microorganismos termófilos.",
      }, // RUTA ORIGINAL MANTENIDA
    ],
  },

  // ================ INICIO DEL BLOQUE A REEMPLAZAR ================

  // --- Salares (SECCIÓN ACTUALIZADA) ---
  salares: {
    title: "Salares",
    fullTitle:
      "En la inmensidad de la Puna, emergen los salares: extensas llanuras blancas que brillan bajo el sol y parecen no tener fin. Su apariencia irreal y su silencio absoluto nos invitan a descubrir un universo único, donde la naturaleza esculpe formas extraordinarias en condiciones extremas.",
    image: "panel-final-atardecer.jpg", // Usamos la imagen final como hero
    sections: [
      {
        // Panel 1
        subtitle: "¿Qué son los Salares?",
        text: 'Miren esta imagen. ¿Ven esa superficie blanca y brillante? ¡Eso es un salar! Piensen en ellos como enormes espejos blancos hechos de sal sobre la tierra. La palabra "salar" viene de "sal", que es una palabra antigua. ¿Sabían que la palabra "salario" viene de cuando a los romanos les pagaban con sal? El término "salar" nació aquí, en América, para hablar de estos lugares tan salados, sobre todo en las montañas de los Andes.',
        image: "panel-1-cristales.jpg",
      },
      {
        // Panel de Nombres de Salares (Lo integramos aquí)
        subtitle: "Nuestros Gigantes Blancos",
        text: "En nuestra provincia de Salta tenemos muchos salares importantes, ¡algunos súper grandes! Como Arizaro, Pocitos, Rincón, Pastos Grandes, Ratones, Diablillos, Incahuasi, Centenario, Río Grande, y también compartimos Salinas Grandes, Antofalla y Hombre Muerto con otras provincias.",
        // Aquí podríamos añadir el componente interactivo más adelante
      },
      {
        // Panel 2
        subtitle: "¿Cómo se formaron los Salares de la Puna?",
        text: 'Esto pasó hace mucho tiempo, cuando la Tierra se movía un montón (eso se llama tectónica andina) y había volcanes activos. Estos movimientos crearon grandes "pozos" o cuencas en el suelo, en los que el agua no tenía por dónde salir. Hace mucho, había lagos de agua dulce aquí. Pero el clima cambió, ¡se volvió muy seco y caluroso! Los lagos empezaron a secarse, y el agua que quedaba se puso cada vez más salada, ¡se "salinizaron"! Además, los volcanes activos siguieron trayendo minerales disueltos que se mezclaban con el agua.',
        image: "panel-2-formacion.jpg",
      },
      {
        // Panel 3
        subtitle: "¡El Secreto es la Evaporación!",
        text: "Aquí está la clave de los salares: ¡la evaporación!. Como en la Puna hace mucho calor y llueve muy poquito, el agua que llega (de la lluvia o de las montañas) se evapora súper rápido. Imaginen un vaso con agua y sal. Si lo dejan al sol, el agua desaparece, ¡pero la sal se queda pegada al vaso! En los salares pasa algo parecido, ¡pero a lo grande! El agua se evapora y deja atrás todos los minerales que traía disueltos. Esto pasa de dos formas: el agua de la superficie se evapora y, a veces, el agua subterránea sube por el suelo y se evapora justo en la superficie, dejando una capa blanca y quebradiza de sal.",
        image: "panel-3-evaporacion.jpg",
      },
      {
        // Panel 4
        subtitle: "Más Allá de la Sal Común: Las Salmueras",
        text: "Los salares no tienen solo la sal que usamos para cocinar. Tienen una parte sólida (la sal y la tierra), ¡y una parte líquida que son las salmueras! Las salmueras son aguas súper, súper saladas. Aunque no se pueden beber, ¡son muy importantes porque, además de sal, tienen otros elementos valiosos como el boro, el magnesio, el potasio y, el más famoso de todos: el Litio!",
        image: "panel-4-piletas.jpg",
      },
      {
        // Panel 5
        subtitle: "El Litio: El Tesoro de la Puna",
        text: 'El Litio es como el "oro blanco". ¿Saben por qué es tan valioso? ¡Porque se usa para hacer las baterías de casi todo lo que usamos con electricidad! Tu celular, tu computadora y los coches eléctricos usan baterías de Litio. Para sacar estos minerales, usamos el mismo truco de la naturaleza: la evaporación. Bombeamos las salmueras a unas piletas gigantes al aire libre y el sol hace el resto.',
        image: "panel-5-bateria.jpg",
      },
      {
        // Panel 6
        subtitle: "¿Son todos los salares iguales?",
        text: 'Aunque se parecen, los salares son un poco diferentes. Algunos tienen más tierra y barro (Salares Terrosos como Salinas Grandes) y otros tienen capas de sal más gruesas (Salares Cristalinos como Hombre Muerto). Además, los salares tienen un ciclo de vida: se llenan de agua con las lluvias y luego se secan casi por completo. Este ciclo, junto con fenómenos como "La Niña" y "El Niño", influye en las capas de sal que se forman cada año.',
        image: "panel-6-ciclo-vida.jpg",
      },
      {
        // Panel Final
        subtitle: "Un paisaje único",
        text: "¡Increíble, ¿verdad?! Los salares de la Puna Salteña no son solo paisajes espectaculares. Son lugares con una historia geológica fascinante, un ejemplo de cómo el clima seco crea maravillas naturales, y una fuente muy importante de minerales que usamos en nuestra vida diaria. ¡No dejes de explorar el resto de la sala para descubrir más secretos de nuestra Región Andina",
        // Dejamos esta última sección sin imagen para variar el layout
      },
    ],
    // La galería de imágenes de abajo puede ser una selección de las mejores fotos
    gallery: [
      {
        src: "panel-1-cristales.jpg",
        caption: "Cristales de sal en la superficie.",
      },
      {
        src: "panel-4-piletas.jpg",
        caption: "Piletas de evaporación para la extracción de litio.",
      },
      {
        src: "panel-final-atardecer.jpg",
        caption: "Atardecer en un salar andino.",
      },
    ],
  },

  // ================== FIN DEL BLOQUE A REEMPLAZAR ==================
};

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

// ========================================================================
// =                       COMPONENTE DE DETALLE                        =
// ========================================================================

export const SalaGeologiaDetalle = () => {
  const { id } = useParams();

  // ================ INICIO: CÓDIGO DEL MODAL A AÑADIR ================
  const [selectedImage, setSelectedImage] = useState(null);

  // La data de la imagen ahora debe tener 'nombreArchivo' y 'nombre'
  const handleImageClick = (imageData) => {
    // Si la imagen viene de una sección, puede que no tenga todos los datos.
    // Creamos un objeto compatible.
    const modalData = {
      nombreArchivo: imageData.image, // La ruta de la imagen
      nombre: imageData.subtitle || imageData.caption || "Imagen de la sección", // Un título de fallback
    };
    setSelectedImage(modalData);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  // ================== FIN: CÓDIGO DEL MODAL A AÑADIR ==================

  const { registerText } = useSpeech();

  const tema = useMemo(() => detallesGeologia[id] || null, [id]);

  const textoCompletoParaVoz = useMemo(() => {
    if (!tema) return "";
    return `${tema.fullTitle || tema.title}. ${tema.sections
      .map((s) => `${s.subtitle ? s.subtitle + ". " : ""}${s.text}`)
      .join(". ")}`;
  }, [tema]);

  useEffect(() => {
    if (textoCompletoParaVoz) {
      registerText(textoCompletoParaVoz);
    }
    // Limpia el texto al desmontar o cambiar de tema
    return () => registerText("");
  }, [textoCompletoParaVoz, registerText]);

  if (!tema) {
    return (
      <div className="sala-detalle-container sala-detalle-not-found">
        <h2>Tema no encontrado</h2>
        <p>El detalle solicitado para "{id}" no está disponible.</p>
      </div>
    );
  }

  // Determina si hay imágenes en las secciones para aplicar estilos condicionales
  const hasSectionImages = tema.sections.some((section) => section.image);

  return (
    // Quitamos la animación fadeIn del contenedor principal por ahora para evitar efectos indeseados
    <article className="sala-detalle-container" id={`detalle-${id}`}>
      {/* --- HERO SECTION --- */}
      {/* Usamos la imagen del tema. ASEGÚRATE QUE ESTAS RUTAS FUNCIONEN EN TU PROYECTO */}
      <header
        className="sala-detalle-hero"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}${tema.image})`,
        }}
      >
        {/* Overlay aplicado vía CSS con ::before para más control */}
        <div className="sala-detalle-hero-content">
          <h1 className="sala-detalle-titulo-principal">{tema.title}</h1>
        </div>
      </header>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div
        className={`sala-detalle-contenido ${
          hasSectionImages ? "has-section-images" : ""
        }`}
      >
        <p className="sala-detalle-subtitulo-hero">{/*{tema.fullTitle}*/}</p>
        {tema.sections.map((section, index) => (
          <section
            key={index}
            className={`sala-detalle-seccion ${
              section.image ? "with-image" : "text-only"
            } section-${index % 2 === 0 ? "even" : "odd"}`} // Alternar clases para layout
          >
            <div className="sala-detalle-seccion-content">
              {section.subtitle && (
                <h2 className="sala-detalle-subtitulo">{section.subtitle}</h2>
              )}
              {/* Renderizamos el texto */}
              <p className="sala-detalle-parrafo">{section.text}</p>
            </div>
            {section.image && (
              <figure
                className="sala-detalle-imagen-seccion clickable-image" // Añadimos una clase para el cursor
                onClick={() => handleImageClick(section)} // Llama a la función con los datos de la sección
                role="button"
                tabIndex="0"
                aria-label={`Ver imagen ampliada: ${
                  section.subtitle || tema.title
                }`}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleImageClick(section)
                }
              >
                {" "}
                {/* IMAGEN DESCOMENTADA - Usa la ruta de la sección */}
                {/* ASEGÚRATE QUE ESTAS RUTAS FUNCIONEN EN TU PROYECTO */}
                <img
                  src={`${import.meta.env.BASE_URL}${section.image}`}
                  alt={section.subtitle || `Ilustración de ${tema.title}`}
                  loading="lazy"
                />
                {/* Puedes añadir figcaption si lo necesitas */}
                {/* <figcaption>Descripción opcional</figcaption> */}
              </figure>
            )}
          </section>
        ))}
      </div>

      {/* ============================================================ */}
      {/* =      NUEVA GALERÍA DE IMÁGENES (Solo para Volcanes)      = */}
      {/* ============================================================ */}
      {id === "volcanes" && (
        <section className="volcanes-3d-gallery-section">
          {" "}
          {/* Contenedor general */}
          <h3 className="volcanes-3d-gallery-title">
            Explorador Geológico Interactivo
          </h3>
          <div className="volcano-explorer-container">
            {" "}
            {/* Contenedor para el canvas 3D */}
            <VolcanoExplorer3D images={imagenesVolcanes} />
          </div>
          <p className="volcano-explorer-instructions">
            Haz clic y arrastra para rotar. Usa la rueda del ratón para hacer
            zoom. Pasa el cursor sobre una imagen para ver detalles.
          </p>
        </section>
      )}
      {/* ============================================================ */}
      {/* =             FIN NUEVA GALERÍA DE VOLCANES                = */}
      {/* ============================================================ */}

      {/* --- GALERÍA DE IMÁGENES --- */}
      {/* GALERÍA DESCOMENTADA Y HABILITADA (false && -> true &&) */}
      {false && tema.gallery && tema.gallery.length > 0 && (
        <aside className="sala-detalle-galeria">
          <h3 className="sala-detalle-galeria-titulo">Galería Visual</h3>
          <div className="sala-detalle-galeria-grid">
            {tema.gallery.map((img, index) => (
              <figure key={index} className="sala-detalle-galeria-item">
                {/* IMAGEN DESCOMENTADA - Usa la ruta de la galería */}
                {/* ASEGÚRATE QUE ESTAS RUTAS FUNCIONEN EN TU PROYECTO */}
                <img
                  src={`${import.meta.env.BASE_URL}${img.src}`}
                  alt={
                    img.caption ||
                    `Imagen ${index + 1} de la galería ${tema.title}`
                  }
                  loading="lazy"
                />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </aside>
      )}



      {/* --- Renderizado del Modal con Portal --- */}
      {selectedImage && ReactDOM.createPortal(
        <div className="ramalc14-modal-overlay" onClick={closeModal}>
            <div className="ramalc14-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="ramalc14-modal-close" onClick={closeModal} aria-label="Cerrar imagen">×</button>
                <figure className="ramalc14-modal-figure">
                    <img
                        src={`${import.meta.env.BASE_URL}${selectedImage.nombreArchivo.startsWith('/') ? selectedImage.nombreArchivo.substring(1) : selectedImage.nombreArchivo}`}
                        alt={selectedImage.nombre}
                        className="ramalc14-modal-image"
                    />
                    <figcaption className="ramalc14-modal-caption">
                        {selectedImage.nombre.replace(/_/g, ' ').replace(/-+/g, ' ')}
                    </figcaption>
                </figure>
            </div>
        </div>,
        document.body
      )}
      {/* --- Fin del Modal --- */}

    </article>
  );
};
