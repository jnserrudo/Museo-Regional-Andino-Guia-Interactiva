import { useState, useMemo } from "react";
import { useParams, Routes, Route, Link, Outlet } from "react-router-dom"; // Añadimos Outlet
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

// --- Importa tus componentes de sala principales ---
import { SalaGeologia } from "./SalaGeologia";
import { SalaBiodiversidad } from "./SalaBiodiversidad";
import { SalaRamalC14 } from "./SalaRamalC14";
import { SalaGobernacionAndes } from "./SalaGobernacionAndes";
import { SalaHistoria } from "./SalaHistoria";
import { SalaMinerologiaMineria } from "./SalaMinerologiaMineria";
// Añade imports para Arqueología, San Antonio Hoy si los tienes

// --- Importa tus componentes de DETALLE (Incluso si aún no existen) ---
import { SalaGeologiaDetalle } from "./SalaGeologiaDetalle";
// import { SalaBiodiversidadDetalle } from "./SalaBiodiversidadDetalle"; // <- Cuando la crees
// import { SalaArqueologiaDetalle } from "./SalaArqueologiaDetalle"; // <- Cuando la crees
// etc.

import "./Sala.css";

// --- Datos de las salas (igual que antes) ---
const salasData = {
  gobernacion_de_los_andes: {
    title: "GOBERNACIÓN DE LOS ANDES",
    image: "imagen_to_salas.webp",
    description:
      "Un recorrido por la historia administrativa y social del Territorio Nacional de Los Andes.",
  },
  geologia: {
    title: "GEOLOGÍA",
    image: "imagen_to_salas.webp",
    description:
      "Descubre los secretos de la formación geológica de la Puna y sus imponentes paisajes.",
  },
  minerologia_y_mineria: {
    title: "MINEROLOGÍA Y MINERÍA",
    image: "imagen_to_salas.webp",
    description:
      "Explora la riqueza mineral de la región y el impacto de la actividad minera.",
  },
  biodiversidad: {
    title: "BIODIVERSIDAD",
    image: "imagen_to_salas.webp",
    description:
      "Conoce la sorprendente flora y fauna adaptada a las condiciones extremas del altiplano.",
  },
  arqueologia: {
    title: "ARQUEOLOGÍA",
    image: "imagen_to_salas.webp",
    description:
      "Vestigios de antiguas culturas que habitaron la Puna, sus costumbres y su legado.",
  },
  ramal_c14: {
    title: "RAMAL C14",
    image: "imagen_to_salas.webp",
    description:
      "La proeza de ingeniería del Tren a las Nubes y su conexión con la vida local.",
  },
  "san-antonio-hoy": {
    title: "SAN ANTONIO HOY",
    image: "imagen_to_salas.webp",
    description:
      "La vida actual, las tradiciones y las perspectivas de la comunidad.",
  },
  historia: {
    title: "HISTORIA",
    image: "imagen_to_salas.webp",
    description:
      "Eventos clave y personajes que marcaron la historia del museo y la localidad.",
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
  // arqueologia: SalaArqueologia,
  // "san-antonio-hoy": SalaSanAntonioHoy,
};

// --- NUEVO: Mapeo de IDs a componentes de DETALLE ---
const salaDetailComponentMap = {
  geologia: SalaGeologiaDetalle,
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

  // Determina el componente PRINCIPAL a renderizar
  const ContentComponent = salaComponentMap[salaId] || null; // Usamos null si no hay componente principal

  // --- LÓGICA PARA DETERMINAR EL COMPONENTE DE DETALLE ---
  const DetailComponent = salaDetailComponentMap[salaId] || null; // Busca en el nuevo mapa

  // Si la entrada en salasData no existe en absoluto
  if (!sala) {
    return (
      <div className="sala-page-container sala-page-invalid">
        <SalaInvalida />
      </div>
    );
  }

  // Si no hay componente principal definido para esta salaId
  if (!ContentComponent && !detailId) {
    // Si no estamos en una ruta de detalle y no hay componente principal
    return (
      <div className="sala-page-container sala-page-invalid">
        {/* Podrías mostrar la intro aunque no haya contenido específico */}
        {/* O mostrar directamente el mensaje de inválido */}
        <SalaInvalida />
      </div>
    );
  }

  const handleIntroClick = () => {
    setBandImg(false);
  };

  // --- Renderizado ---
  return (
    <div
      className={`sala-page-container ${
        bandImg ? "view-intro" : "view-content"
      }`}
    >
      {bandImg && (
        <div className="sala-intro-hero" onClick={handleIntroClick}>
          <div className="sala-intro-overlay"></div>
          <div className="sala-intro-content">
            <h1 className="sala-intro-title">{sala.title}</h1>
            <p className="sala-intro-description">{sala.description}</p>
            <div className="sala-intro-click-hint">
              <span>Toca o haz click para explorar</span>
            </div>
          </div>
        </div>
      )}

      {!bandImg && (
        <div className="sala-content-area">
          <Routes>
            {/* Ruta base muestra el componente PRINCIPAL */}
            <Route
              path="/"
              element={
                ContentComponent ? <ContentComponent /> : <SalaInvalida />
              }
            />

            {/* --- RUTA DE DETALLE DINÁMICA --- */}
            <Route
              path=":id" // Sigue usando :id como parámetro en la URL
              element={
                // Renderiza el componente de detalle mapeado SI EXISTE
                DetailComponent ? (
                  <DetailComponent />
                ) : (
                  <SalaInvalida isDetail={true} />
                )
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
};
