import { useState, useEffect, useMemo } from "react";
import {
  useParams,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom"; // Añadimos Outlet
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

// --- Importa tus componentes de sala principales ---
import { SalaGeologia } from "./SalaGeologia";
import { SalaBiodiversidad } from "./SalaBiodiversidad";
import { SalaRamalC14 } from "./SalaRamalC14";
import { SalaGobernacionAndes } from "./SalaGobernacionAndes";
import { SalaHistoria } from "./SalaHistoria";
import { SalaMinerologiaMineria } from "./SalaMinerologiaMineria";
import { SalaArqueologia } from "./SalaArqueologia";
import { SalaSanAntonioHoy } from "./SalaSanAntonioHoy";
// Añade imports para Arqueología, San Antonio Hoy si los tienes

// --- Importa tus componentes de DETALLE (Incluso si aún no existen) ---
import { SalaGeologiaDetalle } from "./SalaGeologiaDetalle";
// import { SalaBiodiversidadDetalle } from "./SalaBiodiversidadDetalle"; // <- Cuando la crees
// import { SalaArqueologiaDetalle } from "./SalaArqueologiaDetalle"; // <- Cuando la crees
// etc.

import { SalaRamalTrenDetalle } from "./SalaRamalTrenDetalle"; // <-- NUEVO
import { SalaRamalTimelineDetalle } from "./SalaRamalTimelineDetalle"; // <-- NUEVO
import { useLocation } from "react-router-dom"; // Asegura importar useLocation

import "./Sala.css";

// --- IMPORTAMOS EL CSS DE LAS TARJETAS DE SUBTEMAS ---
import "./SalaSubtemas.css"; // <-- Necesitamos estos estilos

import "../SalaRamalC14.css"; // Para estilos específicos del ramal si son necesarios

// --- Datos de las salas (igual que antes) ---
const salasData = {
  gobernacion_de_los_andes: {
    title: "GOBERNACIÓN DE LOS ANDES",
    image: "imagen_to_salas.webp",
    description: `Bienvenidos a la Sala de la Gobernación de Los Andes, un espacio donde la historia cobra vida para contarnos cómo se organizó y gobernó esta región única del país. La Gobernación de Los Andes fue una división territorial creada en 1900 por el gobierno nacional con el objetivo de administrar una zona estratégica en el noroeste argentino, que abarcaba sectores de las actuales provincias de Salta, Jujuy y Catamarca. San Antonio de los Cobres fue su cabecera y principal centro administrativo. Aquí vas a poder conocer:
* Documentos originales, fotografías y objetos que muestran cómo era la vida política, social y económica de la época.

* Las funciones del gobernador y cómo se ejercía el poder en esta región aislada y diversa.

* El papel de la Gobernación en el desarrollo del ferrocarril, la minería y la integración con los pueblos originarios.

* La historia de cómo este territorio fue reorganizado e integrado a las provincias actuales en 1943.`,
  },
  geologia: {
    title: "SALA DE GEOLOGÍA",
    image: "imagen_to_salas.webp",
    description: `
    Bienvenido a la sala de geología. Fuerzas de la Tierra en lo más alto de los Andes. Esta sala te invita a conocer los paisajes extremos y sorprendentes que forman parte de la Puna salteña: un territorio donde la Tierra todavía está viva. En esta región de gran altura, los volcanes dormidos, los géiseres humeantes, los salares brillantes y las extrañas formaciones rocosas son el resultado de procesos geológicos que siguen en marcha, moldeando el paisaje día a día. A lo largo del recorrido vas a descubrir:

* Cómo se forman los volcanes.

* Qué son los géiseres.

* Por qué se forman los salares y qué minerales se esconden en ellos.
    `,
  },
  minerologia_y_mineria: {
    title: "MINEROLOGÍA Y MINERÍA",
    image: "imagen_to_salas.webp",
    description: `
    Bienvenidos a la Sala de Mineralogía y Minería. En esta sala vas a descubrir el asombroso mundo de los minerales: cómo se forman, qué formas y colores tienen, y por qué son tan importantes para la vida cotidiana. La Puna salteña es una de las regiones más ricas en minerales de toda la Argentina. Desde tiempos antiguos, sus recursos fueron aprovechados por los pueblos originarios, y más tarde, por la minería moderna. Oro, plata, cobre, hierro, litio y muchos otros elementos forman parte del suelo de San Antonio de los Cobres y sus alrededores. Durante tu visita vas a poder:

* Observar una colección de minerales de la región andina.

* Conocer cómo se extraen y procesan los minerales.

* Aprender para qué se usan en la vida diaria: desde un anillo hasta un celular.

* Descubrir el papel de la minería en la economía, el ambiente y la cultura local.`,
  },
  biodiversidad: {
    title: "BIODIVERSIDAD",
    image: "imagen_to_salas.webp",
    description: `Bienvenidos a la Sala de Biodiversidad. En esta sala vas a conocer las formas de vida que habitan uno de los ambientes más extremos del planeta: la Puna andina. A más de 3.500 metros de altura, con frío intenso, poca lluvia y mucho viento, la naturaleza se adapta de manera sorprendente. Animales, plantas y microorganismos desarrollaron estrategias únicas para sobrevivir y convivir con el paisaje. Durante tu visita vas a poder:

* Descubrir especies emblemáticas como la vicuña, el suri o el cardón.

* Conocer cómo los pueblos originarios aprendieron a vivir en equilibrio con este entorno.

* Entender la importancia de conservar esta biodiversidad única y frágil.

* Sorprenderte con pequeños ecosistemas ocultos entre salares, lagunas y montañas.`,
  },
  arqueologia: {
    title: "ARQUEOLOGÍA",
    image: "imagen_to_salas.webp",
    description: `Bienvenidos a la Sala de Arqueología. Este espacio te invita a viajar en el tiempo y descubrir cómo vivieron las comunidades que habitaron la Puna andina miles de años antes de la llegada de los europeos. A través de excavaciones, hallazgos y estudios, la arqueología nos permite conocer cómo eran sus viviendas, qué herramientas usaban, cómo se alimentaban, qué creencias tenían y cómo se relacionaban con su entorno. En esta sala vas a poder:

* Ver piezas auténticas como cerámicas, puntas de flecha, tejidos y objetos rituales.

* Conocer cómo los pueblos originarios aprovechaban los recursos del desierto de altura.

* Descubrir las rutas de intercambio que conectaban la Puna con otros pueblos andinos.

* Reflexionar sobre la continuidad cultural y la presencia viva de estas raíces en la actualidad.`,
  },
  ramal_c14: {
    title: "RAMAL C14",
    image: "imagen_to_salas.webp",
    description: `Bienvenidos a la sala dedicada al Ramal C14, una de las obras ferroviarias más imponentes y desafiantes de la Argentina. Este ramal fue parte esencial del Ferrocarril General Belgrano y unió el norte del país con la frontera chilena, atravesando los paisajes extremos de la Puna salteña. Construido entre las décadas de 1920 y 1940, el Ramal C14 es famoso por su ingeniería audaz, sus puentes y viaductos, sus curvas imposibles y su recorrido a más de 4.000 metros sobre el nivel del mar. Su tramo más conocido es el que atraviesa San Antonio de los Cobres y culmina en el icónico Viaducto La Polvorilla. En esta sala vas a poder:

* Conocer cómo fue el trabajo de los obreros, ingenieros y comunidades que hicieron posible este proyecto.

* Ver planos, herramientas, uniformes y fotografías históricas del ramal.

* Entender el impacto que tuvo el tren en la vida económica y social de la región.

* Descubrir cómo esta línea sigue viva hoy a través del famoso Tren a las Nubes.`,
  },
  "san-antonio-hoy": {
    title: "SAN ANTONIO HOY",
    image: "imagen_to_salas.webp",
    description: `Bienvenidos a la sala “San Antonio de los Cobres hoy”, un espacio dedicado a mostrar cómo las costumbres, creencias y modos de vida de la Puna siguen presentes y en constante evolución. San Antonio de los Cobres no es solo un lugar geográfico: es una comunidad que mantiene viva su identidad cultural en cada gesto cotidiano. Aquí, la tradición y la modernidad conviven entre rituales ancestrales, celebraciones populares, oficios heredados y nuevas formas de habitar el territorio. En esta sala vas a conocer:

* Las principales fiestas y ceremonias del calendario local, como la Pachamama, la Señalada o las Fiestas Patronales.

* Las prácticas cotidianas que reflejan una relación respetuosa con la naturaleza, los animales y la tierra.

* El valor del tejido, la cerámica y otros oficios tradicionales que aún se transmiten entre generaciones.

* Cómo los habitantes de San Antonio construyen comunidad, conservan la memoria y se adaptan a los desafíos del presente sin perder sus raíces.`,
  },
  historia: {
    title: "HISTORIA",
    image: "imagen_to_salas.webp",
    description: `Bienvenidos a la Sala de Historia. Este espacio te invita a recorrer el pasado de la región a través de sus protagonistas: los pueblos originarios, los viajeros, los mineros, los ferroviarios y todas las personas que, a lo largo del tiempo, construyeron la identidad de la Puna. San Antonio de los Cobres y sus alrededores guardan huellas profundas de miles de años de historia. Desde las primeras comunidades andinas hasta la llegada del ferrocarril, cada etapa dejó su marca en el territorio, en las tradiciones y en la memoria colectiva. En esta sala vas a poder:

* Conocer cómo vivían y se organizaban las comunidades prehispánicas.

* Descubrir objetos de la vida cotidiana, ceremonias y prácticas ancestrales.

* Ver cómo cambió la región con la llegada de los colonizadores, la minería y el Estado nacional.

* Entender cómo la historia de la Puna forma parte del gran relato del noroeste argentino.`,
  },
};

// --- Mapeo de IDs a componentes PRINCIPALES ---
const salaComponentMap = {
  /* geologia: SalaGeologia, */
  biodiversidad: SalaBiodiversidad,
  /* ramal_c14: SalaRamalC14, */
  gobernacion_de_los_andes: SalaGobernacionAndes,
  historia: SalaHistoria,
  minerologia_y_mineria: SalaMinerologiaMineria,
  arqueologia: SalaArqueologia,
  "san-antonio-hoy": SalaSanAntonioHoy,
};

// --- NUEVO: Mapeo de IDs a componentes de DETALLE ---
const salaDetailComponentMap = {
  geologia: SalaGeologiaDetalle,
  // biodiversidad: SalaBiodiversidadDetalle, // <- Descomenta cuando exista
  // arqueologia: SalaArqueologiaDetalle,     // <- Descomenta cuando exista
  // Añade aquí los mapeos para otras salas con detalle
};

// --- DATOS DE LOS SUBTEMAS DE GEOLOGÍA (Movidos aquí) ---
const temasGeologia = [
  { id: "volcanes", title: "Volcanes", image: "/volcan_museo.png" },
  { id: "geiser", title: "Géiser", image: "/geiser_museo.png" },
  { id: "salares", title: "Salares", image: "/salares_museo.jpeg" },
];
import { CloudServerOutlined, ClockCircleOutlined } from "@ant-design/icons"; // Ejemplos
// --- NUEVO: Datos subtemas Ramal C-14 ---
const temasRamal = [
  {
    id: "tren",
    title: "Tren a las Nubes",
    description: "Descubre la historia y la proeza ingenieril.",
    icon: (
      <CloudServerOutlined
        style={{ fontSize: "2.5em", marginBottom: "0.5em" }}
      />
    ),
  },
  {
    id: "linea-tiempo",
    title: "Línea de Tiempo",
    description: "Sigue los hitos clave de su construcción.",
    icon: (
      <ClockCircleOutlined
        style={{ fontSize: "2.5em", marginBottom: "0.5em" }}
      />
    ),
  },
];

// --- Componente para contenido inválido/no encontrado ---
const SalaInvalida = (
  { isDetail = false } // Añadimos prop opcional
) => (
  <div className="sala-invalid-content">
    <h2>{isDetail ? "Detalle no Disponible" : "Sala no encontrada"}</h2>
    <p>El contenido que buscas no está disponible en este momento.</p>
    <Link
      to={isDetail ? ".." : "/salas"}
      relative={isDetail ? "path" : undefined}
    >
      <Button type="default" icon={<ArrowLeftOutlined />}>
        {isDetail ? "Volver a la Sala" : "Volver a Salas"}
      </Button>
    </Link>
  </div>
);

// --- Componente Principal Sala ---
export const Sala = () => {
  // Obtenemos ambos parámetros: el de la sala y el del detalle (si existe)
  const { salaId, id: detailId } = useParams(); // Renombramos 'id' a 'detailId' para claridad
  const sala = useMemo(() => salasData[salaId], [salaId]);
  const [bandImg, setBandImg] = useState(true);
  const navigate = useNavigate(); // <--- Hook para navegación

  // Determina el componente PRINCIPAL a renderizar
  const ContentComponent = salaComponentMap[salaId] || null; // Usamos null si no hay componente principal

  // --- LÓGICA PARA DETERMINAR EL COMPONENTE DE DETALLE ---
  const DetailComponent = salaDetailComponentMap[salaId] || null; // Busca en el nuevo mapa

  // --- NUEVO: Determina si esta sala es la de geología ---
  const esSalaGeologia = salaId === "geologia";

  const esSalaRamal = salaId === "ramal_c14"; // <-- NUEVO check

  // Determina si estamos en la ruta base de la sala actual
  const location = useLocation();
  const estamosEnRutaBaseSala =
    location.pathname === `/salas/${salaId}` ||
    location.pathname.endsWith(`/salas/${salaId}/`);

  const estamosEnDetalle = !!detailId;

  // Estado para la intro de salas NO geológicas
  const [mostrarIntroNoGeologia, setMostrarIntroNoGeologia] = useState(true);
  // Resetear al cambiar de sala
  useEffect(() => {
    setMostrarIntroNoGeologia(true);
  }, [salaId]);

  // *** AÑADIR ESTAS DOS LÍNEAS DE VUELTA ***
  const [ocultarIntroNormal, setOcultarIntroNormal] = useState(false);
  useEffect(() => {
    console.log(`Reseteando ocultarIntroNormal para salaId: ${salaId}`); // Log útil
    setOcultarIntroNormal(false); // Siempre empieza mostrando la intro para no-especiales
  }, [salaId]);
  // *** FIN DE LÍNEAS A AÑADIR ***

  // Decisión final: Mostrar la sección Intro SI:
  // 1. Es Geología O Ramal Y estamos EXACTAMENTE en su ruta base
  // 2. NO es Geología NI Ramal Y el estado dice que NO la ocultemos todavía
  const mostrarSeccionIntro =
    (esSalaGeologia && estamosEnRutaBaseSala) ||
    (esSalaRamal && estamosEnRutaBaseSala) ||
    (!esSalaGeologia && !esSalaRamal && !ocultarIntroNormal);

  // Si la entrada en salasData no existe en absoluto
  if (!sala) {
    return (
      <div className="sala-page-container sala-page-invalid">
        <SalaInvalida />
      </div>
    );
  }

  // Función para manejar el click en la intro (SOLO si NO es geología)
  const handleIntroClick = () => {
    if (!esSalaGeologia && !esSalaRamal) {
      // <-- Solo navega si NO es geología
      //setBandImg(false); // Oculta la intro y muestra el contenido
      setOcultarIntroNormal(true);
    }
    // Si es geología, no hace nada al hacer click en el fondo/texto
  };

  // Función para manejar el click en las tarjetas de geología
  const handleGeologiaCardClick = (subtemaId) => {
    /*     navigate(`/salas/geologia/${subtemaId}`); // Navega al detalle
     */
    // Navega a la ruta hija relativa: ':id' se reemplazará por subtemaId
    navigate(subtemaId);
  };

  const handleSubtemaCardClick = (subtemaId) => {
    navigate(subtemaId);
  };

  // --- Función para manejar el click de "Volver" ---
  const handleGoBack = () => {
    navigate(-1); // Navega una página atrás en el historial
  };

  // --- Renderizado ---

  return (
    <div
      // La clase ahora solo diferencia visualmente si es intro o no
      className={`sala-page-container ${
        mostrarSeccionIntro ? "view-intro" : "view-content"
      }`}
      data-sala-id={salaId}
    >
      {mostrarSeccionIntro ? (
        // --- VISTA DE INTRODUCCIÓN (CON TARJETAS GEO SI APLICA) ---
        <div
          className="sala-intro-hero"
          onClick={handleIntroClick}
          style={{ cursor: esSalaGeologia ? "default" : "pointer" }}
        >
          {/* --- BOTÓN VOLVER (AHORA FUERA DEL CONDICIONAL) --- */}
          <Button
            className="sala-back-button-fixed" // NUEVA Clase para posicionamiento
            type="default"
            icon={<ArrowLeftOutlined />}
            onClick={handleGoBack}
            // Quitamos el style inline de marginBottom
          >
            Volver
          </Button>
          {/* --- FIN BOTÓN VOLVER --- */}
          <div className="sala-intro-overlay"></div>
          <div className="sala-intro-content">
            <h1 className="sala-intro-title">{sala.title}</h1>
            <p
              className="sala-intro-description"
              style={{ textAlign: "justify" }}
            >
              {(() => {
                if (!sala?.description) {
                  return <p className="sala-intro-description">[]</p>;
                }

                const lines = sala.description.trim().split("\n");
                const elements = []; // Array para guardar párrafos y listas
                let currentListItems = []; // Lista temporal para los items *

                lines.forEach((line, index) => {
                  const trimmedLine = line.trim();

                  if (trimmedLine.startsWith("* ")) {
                    // Es un item de lista, añadirlo a la lista temporal
                    currentListItems.push(trimmedLine.substring(2));
                  } else {
                    // NO es un item de lista
                    // Si teníamos items en la lista temporal, es hora de renderizar esa lista
                    if (currentListItems.length > 0) {
                      elements.push(
                        <ul
                          key={`list-${elements.length}`}
                          className="sala-intro-list"
                        >
                          {currentListItems.map((item, itemIndex) => (
                            <li key={`li-${elements.length}-${itemIndex}`}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                      currentListItems = []; // Resetear la lista temporal
                    }
                    // Si la línea actual NO está vacía, añadirla como párrafo
                    if (trimmedLine) {
                      elements.push(
                        <p
                          key={`p-${elements.length}`}
                          className="sala-intro-description"
                          style={{ textAlign: "justify" }}
                        >
                          {trimmedLine}
                        </p>
                      );
                    }
                  }
                });

                // Asegurarse de renderizar la última lista si la descripción termina con items *
                if (currentListItems.length > 0) {
                  elements.push(
                    <ul
                      key={`list-${elements.length}`}
                      className="sala-intro-list"
                    >
                      {currentListItems.map((item, itemIndex) => (
                        <li key={`li-${elements.length}-${itemIndex}`}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Retorna todos los elementos (párrafos y listas)
                return elements;
              })()}

              {/* --- FIN: Bloque Modificado --- */}
            </p>
            {esSalaGeologia && (
              <div className="geologia-subtemas-en-intro">
                <h2 className="geologia-subtemas-titulo">Explora los temas:</h2>
                <div className="sala-subtemas-grid">
                  {temasGeologia.map((tema, index) => (
                    // *** AÑADE: La nueva tarjeta inmersiva ***
                    <article
                      key={tema.id}
                      className="sala-subtema-card-immersive" // <<<--- USAR LA NUEVA CLASE
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que el click active handleIntroClick
                        handleGeologiaCardClick(tema.id);
                      }}
                      style={{
                        backgroundImage: `url(${import.meta.env.BASE_URL}${
                          tema.image
                        })`,
                        animationDelay: `${index * 0.12}s`,
                      }}
                      tabIndex="0"
                      role="link"
                      aria-label={`Explorar ${tema.title}`}
                    >
                      <div className="sala-subtema-content-overlay">
                        <h3 className="sala-subtema-title">{tema.title}</h3>
                        <span
                          className="sala-subtema-indicator"
                          aria-hidden="true"
                        >
                          Explorar →
                        </span>
                      </div>
                    </article>
                    // *** FIN: Nueva tarjeta inmersiva ***
                  ))}
                </div>
              </div>
            )}

            {/* --- Tarjetas Ramal C14 --- */}
            {esSalaRamal && (
              <div className="ramal-subtemas-en-intro">
                <h2 className="ramal-subtemas-titulo">
                  Explora las secciones:
                </h2>
                {/* Reutilizamos el grid y card */}
                <div className="sala-subtemas-grid ramal-choices-container">
                  {temasRamal.map((tema, index) => (
                    // *** AÑADE: La nueva tarjeta inmersiva (adaptada) ***
                    <article
                      key={tema.id}
                      // Usamos la misma clase base, pero añadimos una específica
                      className="sala-subtema-card-immersive ramal-card-no-image"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubtemaCardClick(tema.id);
                      }}
                      style={{
                        // Sin backgroundImage, el fondo lo dará el CSS
                        animationDelay: `${index * 0.12}s`,
                      }}
                      tabIndex="0"
                      role="link"
                      aria-label={`Explorar ${tema.title}`}
                    >
                      {/* Usamos el overlay para controlar el fondo y contenido */}
                      <div className="sala-subtema-content-overlay ramal-overlay-layout">
                        {/* Contenedor para el contenido principal (icono, título, desc) */}
                        <div className="ramal-card-main-content">
                          {/* Renderizar el icono */}
                          {tema.icon && (
                            <div className="ramal-card-icon-wrapper">
                              {tema.icon}
                            </div>
                          )}
                          <h3 className="sala-subtema-title">{tema.title}</h3>
                          <p className="ramal-card-description">
                            {tema.description}
                          </p>
                        </div>
                        {/* Indicador que aparece en hover (abajo) */}
                        <span
                          className="sala-subtema-indicator ramal-indicator"
                          aria-hidden="true"
                        >
                          Explorar →
                        </span>
                      </div>
                    </article>
                    // *** FIN: Nueva tarjeta inmersiva (adaptada) ***
                  ))}
                </div>
              </div>
            )}

            {/* Pista de click (Asegúrate que esta condición también incluya !esSalaRamal) */}
            {!esSalaGeologia && !esSalaRamal && (
              <div className="sala-intro-click-hint">
                <span>Toca o haz click para explorar</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        // --- VISTA DE CONTENIDO (PRINCIPAL O DETALLE) ---
        // Renderiza SIEMPRE el Outlet cuando NO se muestra la intro.
        // React Router decidirá qué poner dentro (SalaPrincipal o SalaDetalleWrapper)
        <div className="sala-content-area">
          {/* Botón Volver SIEMPRE presente en esta vista */}
          <Button
            className="sala-back-button"
            type="default"
            icon={<ArrowLeftOutlined />}
            onClick={handleGoBack}
            style={{ marginBottom: "2rem" }}
          >
            Volver
          </Button>
          <Outlet /> {/* ¡AQUÍ SE RENDERIZA EL HIJO! */}
        </div>
      )}
    </div>
  );
};

// --- Wrappers (¡ASEGÚRATE DE EXPORTARLOS!) ---
// Estos SÍ necesitan estar exportados
export const SalaPrincipal = () => {
  const { salaId } = useParams();
  const ContentComponent = salaComponentMap[salaId] || null;

  // Si es Geología O Ramal -> null
  if (salaId === "geologia" || salaId === "ramal_c14") {
    // <-- AÑADIDO RAMAL
    return null;
  }

  if (!ContentComponent) {
    return <SalaInvalida />;
  }
  return <ContentComponent />;
};
export const SalaDetalleWrapper = () => {
  const { salaId, id: detailId } = useParams(); // Obtiene ambos params
  let DetailComponent = null;

  // Lógica específica para Ramal C14
  if (salaId === "ramal_c14") {
    if (detailId === "tren") {
      DetailComponent = SalaRamalTrenDetalle;
    } else if (detailId === "linea-tiempo") {
      // Usa el id del temaRamal
      DetailComponent = SalaRamalTimelineDetalle;
    }
  } else {
    // Lógica para otras salas (como Geología)
    DetailComponent = salaDetailComponentMap[salaId] || null;
  }

  // Si no encontramos un componente de detalle válido
  if (!DetailComponent) {
    return <SalaInvalida isDetail={true} />;
  }

  // Renderiza el componente de detalle encontrado
  return <DetailComponent />;
};
