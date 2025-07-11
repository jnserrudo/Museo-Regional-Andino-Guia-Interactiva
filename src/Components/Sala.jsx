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

import { useTranslation } from "react-i18next"; // 1. Importa el hook

import "./Sala.css";

// --- IMPORTAMOS EL CSS DE LAS TARJETAS DE SUBTEMAS ---
import "./SalaSubtemas.css"; // <-- Necesitamos estos estilos

import "../SalaRamalC14.css"; // Para estilos específicos del ramal si son necesarios



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
  const { t } = useTranslation(); // <-- 2. USA EL HOOK

  // Obtenemos ambos parámetros: el de la sala y el del detalle (si existe)
  const { salaId, id: detailId } = useParams(); // Renombramos 'id' a 'detailId' para claridad
  // --- 3. OBTÉN LOS DATOS DE LA SALA DESDE i18next ---
  const sala = useMemo(() => {
    // Usamos el `salaId` para construir la clave de traducción
    const claveBase = `introduccion_salas.${salaId}`;
    return {
      title: t(`${claveBase}.title`),
      description: t(`${claveBase}.description`),
      // La imagen sigue siendo estática, podemos añadirla aquí si es necesario
      image: "imagen_to_salas.webp" 
    };
  }, [salaId, t]); // Depende de salaId y de la función t (que cambia con el idioma)
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
