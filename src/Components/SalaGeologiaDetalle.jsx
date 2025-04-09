import { useParams } from "react-router-dom";

const detallesGeologia = {
  origen: {
    title: "Origen y Formación Geológica de la Tierra",
    content: "La Tierra se formó hace aproximadamente 4.500 millones de años a partir de la acumulación de material cósmico...",
    image: "historia_museo.jpg",
  },
  volcanes: {
    title: "Volcanes",
    content: "Los volcanes son estructuras geológicas que permiten la salida de magma, gases y otros materiales del interior de la Tierra...",
    image: "volcanes.jpg",
  },
  geiser: {
    title: "Géiser",
    content: "Un géiser es una fuente termal que periódicamente emite chorros de agua caliente y vapor debido a la presión del subsuelo...",
    image: "geiser.jpg",
  },
  salares: {
    title: "Salares",
    content: "Los salares son depósitos de sal formados por la evaporación de cuerpos de agua en regiones áridas y semiáridas...",
    image: "salares.jpg",
  },
};

export const SalaGeologiaDetalle = () => {
  const { id } = useParams();
  const tema = detallesGeologia[id];

  if (!tema) return <h2>Tema no encontrado</h2>;

  return (
    <div className="detalle-geologia">
      <h1>{tema.title}</h1>
      <img src={`/${tema.image}`} alt={tema.title} className="detalle-imagen" />
      <p>{tema.content}</p>
    </div>
  );
};
