import { useEffect, useMemo } from 'react';
import { useParams } from "react-router-dom";
import { useSpeech } from '../Contexts/SpeechContext'; // Ajusta la ruta si es necesario
import '../SalaDetalle.css'; // Asegúrate que este archivo exista y tenga los estilos

// ========================================================================
// =                          DATOS DE DETALLE                          =
// ========================================================================
// Completa con tus propios textos e imágenes reales.
// Las rutas de imagen asumen que están en la carpeta /public o configuradas para ser servidas.

const detallesGeologia = {
  // --- Origen ---
  origen: {
    title: "Origen y Formación Geológica",
    fullTitle: "Origen y Formación Geológica de la Tierra",
    image: "/img/geologia/origen_tierra.jpg", // Imagen destacada
    sections: [
      {
        text: "Nuestro planeta, la Tierra, es un cuerpo dinámico con una historia fascinante que se extiende por miles de millones de años. Su formación comenzó hace aproximadamente 4.54 mil millones de años a partir de una nube de gas y polvo cósmico, la nebulosa solar. Por acción de la gravedad, este material comenzó a agruparse, formando protoplanetas, uno de los cuales se convertiría en la Tierra.",
      },
      {
        subtitle: "Diferenciación Planetaria",
        text: "En sus etapas iniciales, la Tierra era una masa fundida debido al calor generado por las colisiones y la desintegración radiactiva. Los elementos más densos, como el hierro y el níquel, se hundieron hacia el centro formando el núcleo, mientras que los materiales más ligeros ascendieron para formar el manto y la corteza. Este proceso de diferenciación sentó las bases de la estructura interna que conocemos hoy.",
        image: "/img/geologia/diferenciacion_tierra.jpg", // Imagen específica de sección
      },
      {
        subtitle: "La Tectónica de Placas",
        text: "La superficie terrestre no es estática. La litosfera, la capa externa rígida, está dividida en grandes placas tectónicas que 'flotan' sobre la astenosfera, una capa más dúctil del manto. El movimiento de estas placas, impulsado por corrientes de convección en el manto, es responsable de la formación de montañas, la actividad volcánica, los terremotos y la configuración de los continentes y océanos a lo largo del tiempo geológico.",
      },
    ],
    gallery: [
        { src: "/img/geologia/fosil_estromatolito.jpg", caption: "Estromatolitos: Evidencia de vida temprana." },
        { src: "/img/geologia/gran_canon.jpg", caption: "Capas geológicas expuestas en el Gran Cañón." },
        { src: "/img/geologia/pliegues_rocosos.jpg", caption: "Pliegues formados por la compresión de rocas." },
    ]
  },

  // --- Volcanes ---
  volcanes: {
    title: "Volcanes",
    fullTitle: "Volcanes: Ventanas al Interior Terrestre",
    image: "/img/geologia/volcan_principal.jpg",
    sections: [
      { text: "Los volcanes son manifestaciones superficiales de la energía interna de la Tierra. Son estructuras geológicas, generalmente montañas o colinas, por donde el magma (roca fundida), cenizas y gases del interior del planeta emergen a la superficie. Las erupciones volcánicas pueden ser espectaculares y destructivas, pero también son procesos fundamentales en la formación de nueva corteza terrestre y la liberación de gases que componen nuestra atmósfera." },
      {
        subtitle: "Tipos de Volcanes",
        text: "Existen diversos tipos de volcanes, clasificados según su forma, tipo de erupción y composición del magma. Los principales son los volcanes en escudo (amplios, pendientes suaves, lavas fluidas), estratovolcanes o compuestos (cónicos, pendientes pronunciadas, alternancia de lava y piroclastos) y calderas volcánicas (grandes depresiones formadas por colapso tras erupciones masivas).",
        image: "/img/geologia/tipos_volcanes_diagrama.jpg"
      },
      {
        subtitle: "Volcanismo en los Andes",
        text: "La Cordillera de los Andes, donde se ubica nuestra región, es parte del Cinturón de Fuego del Pacífico, una de las zonas con mayor actividad volcánica y sísmica del mundo. El volcanismo andino está relacionado con la subducción de la Placa de Nazca bajo la Placa Sudamericana, generando numerosos volcanes activos y paisajes característicos como los que observamos en la Puna.",
        image: "/img/geologia/volcan_andes.jpg"
      }
    ],
     gallery: [
        { src: "/img/geologia/lava_pahoehoe.jpg", caption: "Lava fluida tipo Pahoehoe." },
        { src: "/img/geologia/erupcion_cenizas.jpg", caption: "Columna de cenizas durante una erupción." },
        { src: "/img/geologia/domo_lava.jpg", caption: "Domo de lava viscosa." },
    ]
  },

  // --- Géiser ---
  geiser: {
    title: "Géiseres",
    fullTitle: "Géiseres: Fuentes Termales Eruptivas",
    image: "/img/geologia/geiser_principal.jpg",
    sections: [
      { text: "Un géiser es un tipo especial de fuente termal que entra en erupción periódicamente, lanzando una columna de agua caliente y vapor al aire. Este fenómeno ocurre en áreas con actividad geotérmica donde el agua subterránea entra en contacto con rocas calentadas por magma cercano." },
      {
        subtitle: "Cómo Funciona un Géiser",
        text: "El mecanismo de un géiser implica un sistema de 'plomería' subterráneo. El agua fría se filtra hacia abajo y es calentada por encima de su punto de ebullición, pero la presión del agua superior evita que hierva. Eventualmente, el agua supercalentada forma burbujas de vapor que ascienden, reduciendo la presión sobre el agua inferior. Esto provoca una ebullición repentina y violenta, expulsando el agua y el vapor acumulados en una erupción.",
        image: "/img/geologia/geiser_diagrama.jpg"
      },
      {
        subtitle: "Géiseres en el Mundo y los Andes",
        text: "Los campos de géiseres son raros y requieren condiciones geológicas específicas. Los más famosos se encuentran en Yellowstone (EE.UU.), Islandia y Nueva Zelanda. En los Andes, aunque menos comunes que otras manifestaciones termales, existen áreas con actividad de géiseres, como El Tatio en Chile, uno de los campos más grandes del hemisferio sur, mostrando la intensa actividad geotérmica de la región.",
        image: "/img/geologia/geiser_campo_tatio.jpg" // Ejemplo específico
      }
    ],
    gallery: [
      { src: "/img/geologia/geiser_erupcion_detalle.jpg", caption: "Detalle de una erupción." },
      { src: "/img/geologia/fumarolas.jpg", caption: "Fumarolas asociadas a campos geotérmicos." },
      { src: "/img/geologia/fuente_termal_colorida.jpg", caption: "Microorganismos termófilos en fuentes cercanas." },
    ]
  },

  // --- Salares ---
  salares: {
    title: "Salares",
    fullTitle: "Salares Andinos: Desiertos de Sal y Vida Adaptada",
    image: "/img/geologia/salar_principal.jpg",
    sections: [
      { text: "Los salares, también conocidos como desiertos de sal o salinas, son extensas llanuras cubiertas por costras de sal y otros minerales evaporíticos. Se forman en cuencas endorreicas (sin salida al mar) de regiones áridas o semiáridas, donde la evaporación del agua supera con creces la precipitación. El agua que llega a la cuenca, cargada de sales disueltas erosionadas de las rocas circundantes, se acumula y se evapora lentamente, dejando atrás los minerales." },
      {
        subtitle: "Riqueza Mineral y Económica",
        text: "Los salares son importantes depósitos de minerales como halita (sal común), yeso, ulexita y, de forma destacada en los Andes, litio y potasio. El litio, contenido en las salmueras bajo la costra salina, se ha vuelto crucial para la fabricación de baterías, convirtiendo a los salares andinos en puntos estratégicos a nivel mundial. La extracción de estos recursos debe realizarse considerando la sostenibilidad y el frágil equilibrio del ecosistema.",
        image: "/img/geologia/extraccion_litio_salar.jpg"
      },
      {
        subtitle: "Un Ecosistema Extremo",
        text: "A pesar de su apariencia inhóspita, los salares albergan ecosistemas únicos adaptados a condiciones extremas de salinidad, radiación solar y fluctuaciones de temperatura. Microorganismos extremófilos forman la base de la cadena alimenticia. En las lagunas asociadas a los salares, es común encontrar flamencos andinos que se alimentan de pequeños crustáceos, así como vicuñas y otra fauna adaptada al altiplano que utiliza estos espacios.",
        image: "/img/geologia/flamencos_salar.jpg"
      }
    ],
    gallery: [
      { src: "/img/geologia/texturas_sal.jpg", caption: "Texturas poligonales de la costra salina." },
      { src: "/img/geologia/ojos_de_salar.jpg", caption: "Pequeñas lagunas u 'ojos de salar'." },
      { src: "/img/geologia/vicunas_altiplano.jpg", caption: "Vicuñas pastando cerca de un salar." },
    ]
  },
};

// ========================================================================
// =                       COMPONENTE DE DETALLE                        =
// ========================================================================

export const SalaGeologiaDetalle = () => {
  const { id } = useParams(); // Obtiene el 'id' del subtema desde la URL
  const { registerText } = useSpeech(); // Para el lector de pantalla/voz

  // Memoriza el tema actual basado en el ID, evitando recálculos innecesarios
  const tema = useMemo(() => detallesGeologia[id] || null, [id]);

  // Memoriza el texto completo para el lector de voz, basado en el tema actual
  const textoCompletoParaVoz = useMemo(() => {
    if (!tema) return "";
    // Concatena título y textos de todas las secciones para la lectura por voz
    return `${tema.fullTitle || tema.title}. ${tema.sections
      .map(s => `${s.subtitle ? s.subtitle + '. ' : ''}${s.text}`)
      .join('. ')}`;
  }, [tema]);

  // Efecto para registrar el texto cuando el componente se monta o el texto cambia,
  // y para limpiarlo cuando se desmonta.
  useEffect(() => {
    if (textoCompletoParaVoz) {
      registerText(textoCompletoParaVoz);
    }
    // Función de limpieza que se ejecuta al desmontar
    return () => registerText("");
  }, [textoCompletoParaVoz, registerText]); // Dependencias del efecto

  // --- Renderizado Condicional: Tema no encontrado ---
  if (!tema) {
    return (
      <div className="sala-detalle-container sala-detalle-not-found">
        <h2>Tema no encontrado</h2>
        <p>El detalle solicitado para "{id}" no está disponible.</p>
        {/* Podrías añadir un botón para volver a la sala principal de Geología */}
      </div>
    );
  }

  // --- Renderizado Principal: Mostrar el detalle del tema ---
  return (
    <article className="sala-detalle-container" id="main-sala-detail-content">

      {/* Encabezado con título e imagen principal */}
      <header className="sala-detalle-header">
        <h1 className="sala-detalle-titulo-principal">{tema.title}</h1>
        {tema.image && (
          <figure className="sala-detalle-imagen-destacada">
            <img src={`${import.meta.env.BASE_URL}${tema.image}`} alt={`Imagen principal de ${tema.title}`} />
            {/* Puedes añadir un figcaption aquí si es relevante */}
          </figure>
        )}
      </header>

      {/* Contenido principal dividido en secciones */}
      <div className="sala-detalle-contenido">
        {tema.sections.map((section, index) => (
          <section key={index} className="sala-detalle-seccion">
            {/* Subtítulo opcional de la sección */}
            {section.subtitle && (
              <h2 className="sala-detalle-subtitulo">{section.subtitle}</h2>
            )}
            {/* Párrafo de texto de la sección */}
            <p className="sala-detalle-parrafo">{section.text}</p>
            {/* Imagen opcional de la sección */}
            {section.image && (
               <figure className="sala-detalle-imagen-seccion">
                 <img src={`${import.meta.env.BASE_URL}${section.image}`} alt={section.subtitle || `Ilustración de ${tema.title}`} />
                 {/* Puedes añadir un figcaption aquí también */}
               </figure>
            )}
            {/* Aquí podrías añadir lógica para renderizar un video si tuvieras la ID */}
          </section>
        ))}
      </div>

      {/* Galería de imágenes opcional */}
      {tema.gallery && tema.gallery.length > 0 && (
        <aside className="sala-detalle-galeria">
          <h3 className="sala-detalle-galeria-titulo">Galería de Imágenes</h3>
          <div className="sala-detalle-galeria-grid">
            {tema.gallery.map((img, index) => (
              <figure key={index} className="sala-detalle-galeria-item">
                <img src={`${import.meta.env.BASE_URL}${img.src}`} alt={img.caption || `Imagen ${index + 1} de la galería ${tema.title}`} />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </aside>
      )}
    </article>
  );
};