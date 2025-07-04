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
import { ArrowLeftOutlined, // --- AÑADE ESTOS TRES ---
  FireOutlined,
  RiseOutlined,
  AppstoreOutlined, } from "@ant-design/icons";

// --- Importa tus componentes de sala principales ---
import { SalaTerritorioAndes } from "./SalaTerritorioAndes";
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

// import { SalaBiodiversidadDetalle } from "./SalaBiodiversidadDetalle"; // <- Cuando la crees
// import { SalaArqueologiaDetalle } from "./SalaArqueologiaDetalle"; // <- Cuando la crees
// etc.

import { useLocation } from "react-router-dom"; // Asegura importar useLocation

import "./Sala.css";

// --- IMPORTAMOS EL CSS DE LAS TARJETAS DE SUBTEMAS ---
import "./SalaSubtemas.css"; // <-- Necesitamos estos estilos

import "../SalaRamalC14.css"; // Para estilos específicos del ramal si son necesarios

// --- Datos de las salas (igual que antes) ---
const salasData = {
  gobernacion_de_los_andes: {
    title: "SALA DE GOBERNACIÓN DE LOS ANDES",
    image: "imagen_to_salas.webp",
    description: `Una historia de exploración, conocimiento y transformación del territorio.
Bienvenidos a esta sala que recorre el proceso de organización y conocimiento del Territorio Nacional de Los Andes, a partir de su administración estatal. Aquí vas a conocer a sus protagonistas, las primeras investigaciones científicas y cómo esta región tan particular fue integrada al país.
`,
  },
  territorio_de_los_andes: {
    title: "SALA DE TERRITORIO DE LOS ANDES",
    image: "imagen_to_salas.webp",
    description: `Un territorio en disputa, una historia de integración nacional.
Bienvenidos a este espacio que narra el origen, los conflictos y la consolidación del Territorio Nacional de Los Andes, una región estratégica y cargada de historia en el corazón de la Puna argentina.
`,
  },
  geologia: {
    title: "SALA DE GEOLOGÍA",
    image: "imagen_to_salas.webp",
    description: `
    Bienvenidos a la sala donde la Tierra cuenta su historia más profunda.
En este espacio, te invitamos a viajar al corazón geológico de la Puna, una región moldeada por la fuerza de los volcanes, el calor oculto de los géiseres y la calma brillante de los salares.
Aquí vas a descubrir cómo, a lo largo de millones de años, la actividad del planeta dio forma a paisajes extremos y únicos. Cada montaña, cada cristal de sal y cada vapor que emerge del suelo nos habla de un mundo en constante transformación.
Tocá, Explora y observá: la geología no es solo ciencia, es el relato vivo del origen de la Tierra.

    `,
  },
  minerologia_y_mineria: {
    title: "SALA DE MINERÍA",
    image: "imagen_to_salas.webp",
    description: `
    La riqueza de la Puna: lo que está en la tierra… y en tu vida.
En esta sala vas a conocer dos caras de una misma historia.
Los minerales: verdaderas joyas naturales formadas a lo largo de millones de años. Vas a ver cómo algunos de ellos están presentes en tu vida diaria —en el celular, en las paredes de tu casa, en la sal del almuerzo, en medicamentos, en el brillo de algún cosmético y hasta en algunos adornos —  aquí vas a descubrir las fórmulas químicas y usos de los minerales más destacados de la Puna. 
Por otro lado, la minería: las técnicas que usamos para extraer esos minerales del suelo. Desde métodos ancestrales hasta tecnologías actuales, conocerás cómo se obtienen, quiénes los trabajan, y cómo se busca hoy equilibrar su explotación con el cuidado del ambiente y de las comunidades locales.
`,
  },
  biodiversidad: {
    title: "SALA DE BIODIVERSIDAD",
    image: "imagen_to_salas.webp",
    description: `
    En esta sala vas a descubrir cómo la vida logra adaptarse y prosperar en uno de los ambientes más extremos del planeta: la Puna andina.
A más de 3.500 metros sobre el nivel del mar, con aire seco, lluvias escasas, temperaturas bajo cero por la noche y un sol intenso durante el día, la vida enfrenta desafíos constantes.
Sin embargo, la naturaleza responde con estrategias sorprendentes:
•	Algunas plantas crecen muy cerca del suelo para protegerse del viento.
•	Muchos animales cambian de color, migran o modifican sus hábitos para sobrevivir.
•	Los organismos más pequeños desarrollan defensas especiales frente a la fuerza del sol en altura: algunos se refugian bajo piedras o en grietas del suelo.
La biodiversidad en la Puna no es abundante, pero cuenta con especies endémicas. Cada especie que vive aquí forma parte de una red moldeada por millones de años de adaptación.


    `,
  },
  arqueologia: {
    title: "SALA DE ARQUEOLOGÍA",
    image: "imagen_to_salas.webp",
    description: `Bienvenidos a la Sala de Historia de la Puna Andina
En esta sala vas a conocer quiénes habitaron la Puna, un territorio habitado desde hace miles de años. Conocerás cómo las personas se adaptaron a un entorno desafiante, desarrollaron formas de vida basadas en la caza, el pastoreo, la agricultura y el intercambio, y cómo fueron construyendo conocimientos, creencias y tecnologías que aún hoy nos sorprenden.
`,
  },
  ramal_c14: {
    title: "SALA DE RAMAL C14",
    image: "imagen_to_salas.webp",
    description: `Bienvenidos a la Sala del Ramal C14, 
una de las obras más asombrosas de la ingeniería ferroviaria en América del Sur. Aquí vas a descubrir la historia del tren que desafió la geografía extrema de la Cordillera de los Andes, uniendo Salta con la frontera chilena en Socompa, a más de 3.500 metros sobre el nivel del mar.
`,
  },
  "san-antonio-hoy": {
    title: "SALA DE SAN ANTONIO HOY",
    image: "imagen_to_salas.webp",
    description: `Una comunidad viva en el corazón de la Puna
Bienvenidos a San Antonio de los Cobres, capital del departamento Los Andes y una de las localidades más emblemáticas de la Puna argentina. Esta sala te invita a conocer no solo su historia, sino su presente: un territorio que se sostiene entre la memoria ancestral, la vida comunitaria, el trabajo de pastores y mineros, y una cultura viva que sigue latiendo a 3.776 metros de altura.
`,
  },
  historia: {
    title: "SALA DE HISTORIA",
    image: "imagen_to_salas.webp",
    description: `Bienvenidos a la Sala de Historia
Un recorrido por los grandes cambios políticos y sociales que marcaron la región andina y el país.
Desde los primeros contactos con los conquistadores hasta la consolidación de la Argentina como Estado nacional, esta sala nos invita a descubrir cómo se fueron transformando los territorios, las poblaciones y las formas de gobierno.
`,
  },
};

// --- Mapeo de IDs a componentes PRINCIPALES ---
const salaComponentMap = {
  geologia: SalaGeologia,
  biodiversidad: SalaBiodiversidad,
   ramal_c14: SalaRamalC14, 
  gobernacion_de_los_andes: SalaGobernacionAndes,
  historia: SalaHistoria,
  minerologia_y_mineria: SalaMinerologiaMineria,
  arqueologia: SalaArqueologia,
  "san-antonio-hoy": SalaSanAntonioHoy,
  territorio_de_los_andes: SalaTerritorioAndes,
};

// --- NUEVO: Mapeo de IDs a componentes de DETALLE ---
const salaDetailComponentMap = {
  /* geologia: SalaGeologiaDetalle, */
  // biodiversidad: SalaBiodiversidadDetalle, // <- Descomenta cuando exista
  // arqueologia: SalaArqueologiaDetalle,     // <- Descomenta cuando exista
  // Añade aquí los mapeos para otras salas con detalle
};





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




  

  // Determina si estamos en la ruta base de la sala actual
  const location = useLocation();
  /* const estamosEnRutaBaseSala =
    location.pathname === `/salas/${salaId}` ||
    location.pathname.endsWith(`/salas/${salaId}/`); */

// En Sala.jsx, REEMPLAZA la línea que define estamosEnRutaBaseSala por esta:

const estamosEnRutaBaseSala = !detailId;


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

  const mostrarSeccionIntro = !ocultarIntroNormal;


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
    setOcultarIntroNormal(true);
  };

  
/* 
  const handleSubtemaCardClick = (subtemaId) => {
    navigate(subtemaId);
  }; */

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
                      /* elements.push(
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
                      ); */
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
                  /* elements.push(
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
                  ); */
                }

                // Retorna todos los elementos (párrafos y listas)
                return elements;
              })()}

              {/* --- FIN: Bloque Modificado --- */}
            </p>

            {/* --- Tarjetas Ramal C14 --- */}
           

            {/* Pista de click (Asegúrate que esta condición también incluya !esSalaRamal) */}
            {(
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


  
  if (!ContentComponent) {
    return <SalaInvalida />;
  }
  return <ContentComponent />;
};
export const SalaDetalleWrapper = () => {
  const { salaId, id: detailId } = useParams(); // Obtiene ambos params
  let DetailComponent = null;

  


  // Si no encontramos un componente de detalle válido
  if (!DetailComponent) {
    return <SalaInvalida isDetail={true} />;
  }

  // Renderiza el componente de detalle encontrado
  return <DetailComponent />;
};
