import { useNavigate } from "react-router-dom";

const temasGeologia = [
  {
    id: "origen",
    title: "Origen y Formación Geológica de la Tierra",
    image: "fondo1.JPG",
  },
  { id: "volcanes", title: "Volcanes", image: "fondo1.JPG" },
  { id: "geiser", title: "Géiser", image: "fondo1.JPG" },
  { id: "salares", title: "Salares", image: "fondo1.JPG" },
];

export const SalaGeologia = () => {
  const navigate = useNavigate();

  return (
    <div className="sala-geologia">
      <h1>GEOLOGÍA</h1>
      <div className="grid-temas">
        {temasGeologia.map((tema) => (
          <div
            key={tema.id}
            className="tema-row"
            onClick={() => navigate(`/salas/geologia/${tema.id}`)}
          >
            <div className="tema-info">
              <p>{tema.title}</p>
            </div>
            <div
              className="tema-image"
              style={{ backgroundImage: `url(/${tema.image})` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
