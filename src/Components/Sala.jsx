import { useState } from "react";
import { useParams, Routes, Route } from "react-router-dom";
import { SalaGeologia } from "./SalaGeologia";
import { SalaBiodiversidad } from "./SalaBiodiversidad";
import { SalaGeologiaDetalle } from "./SalaGeologiaDetalle";
import { SalaRamalC14 } from "./SalaRamalC14";
import { SalaGobernacionAndes } from "./SalaGobernacionAndes";
import { SalaHistoria } from "./SalaHistoria";
import { SalaMinerologiaMineria } from "./SalaMinerologiaMineria";

const salasData = {
  "gobernacion_de_los_andes": {
    title: "GOBERNACIÓN DE LOS ANDES",
    image: "imagen_to_salas.webp",
    description: "Descripción de la Gobernación de los Andes...",
  },
  geologia: {
    title: "GEOLOGÍA",
    image: "imagen_to_salas.webp",
    description: "Descripción sobre geología...",
  },
  "mineralogia-y-mineria": {
    title: "MINERALOGÍA Y MINERÍA",
    image: "imagen_to_salas.webp",
    description: "Información sobre mineralogía y minería...",
  },
  biodiversidad: {
    title: "BIODIVERSIDAD",
    image: "imagen_to_salas.webp",
    description: "Datos sobre la biodiversidad...",
  },
  arqueologia: {
    title: "ARQUEOLOGÍA",
    image: "imagen_to_salas.webp",
    description: "Detalles sobre la arqueología...",
  },
  "ramal_c14": {
    title: "RAMAL C14",
    image: "imagen_to_salas.webp",
    description: "Historia del Ramal C14 y su importancia...",
  },
  "san-antonio-hoy": {
    title: "SAN ANTONIO HOY",
    image: "imagen_to_salas.webp",
    description: "Creencias y costumbres actuales de San Antonio...",
  },
  historia: {
    title: "HISTORIA",
    image: "imagen_to_salas.webp",
    description: "Información sobre la historia...",
  },
  minerologia_y_mineria: {
    title: "MINEROLOGÍA Y MINERÍA",
    image: "imagen_to_salas.webp",
    description: "Información sobre mineralogía y minería...",
  },
};

export const Sala = () => {
  const { salaId } = useParams();
  const sala = salasData[salaId];

  const [bandImg, setBandImg] = useState(true);

  if (!sala) {
    return <h2>Sala no encontrada</h2>;
  }

  return (
    <>
      {bandImg ? (
        <div
          onClick={() => setBandImg(false)}
          className="img_sala"
          style={{ backgroundImage: `url(/${sala.image})` }}
        >
          <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>{sala.title}</h1>

            <p style={{ marginTop: "20px", fontSize: "18px" }}>
              {sala.description}
            </p>
          </div>
        </div>
      ) : (
        <div className="" style={{ textAlign: "center", padding: "20px" }}>
           <Routes>
            <Route path="/" element={
              {
                geologia: <SalaGeologia />,
                biodiversidad: <SalaBiodiversidad />,
                ramal_c14: <SalaRamalC14 />,
                gobernacion_de_los_andes: <SalaGobernacionAndes />,
                historia: <SalaHistoria />,
                minerologia_y_mineria: <SalaMinerologiaMineria />,
                // Agrega más salas aquí según sea necesario
              }[salaId] || <h2>Sala no encontrada</h2>
            } />
            <Route path=":id" element={<SalaGeologiaDetalle />} />
          </Routes>
        </div>
      )}
      
    </>
  );
};
