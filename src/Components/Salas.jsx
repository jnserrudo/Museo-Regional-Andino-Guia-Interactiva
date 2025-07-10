import { List } from "antd"; // No necesitamos Card si usamos divs
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import "../Salas.css";

const data = [
  // ... (tus datos de salas sin cambios)
  { title: "GEOLOGÍA", 
    image: "geologia.jpg", 
    path: "geologia", 
    icon: "🪨" },
  {
    title: "BIODIVERSIDAD",
    image: "biodiversidad.jpg",
    path: "biodiversidad",
    icon: "🌱",
  },

  {
    title: "ARQUEOLOGÍA",
    image: "arqueologia.JPG",
    path: "arqueologia",
    icon: "🏺",
  },
  {
    title: "HISTORIA",
    image: "historia_museo.JPG",
    path: "historia",
    icon: "📜",
  },
  {
    title: "TERRITORIO DE LOS ANDES",
    //image: "gobernacion_de_los_andes.jfif",
    image: "territorio_andes_tarjeta.JPG",
    path: "territorio_de_los_andes",
    icon: "🏛️",
  },
  {
    title: "GOBERNACIÓN DE LOS ANDES",
    //image: "gobernacion_de_los_andes.jfif",
    image: "historia_museo.png",
    path: "gobernacion_de_los_andes",
    icon: "🏛️",
  },
  
  {
    title: "MINERÍA",
    image: "minerologia_y_mineria.jpg",
    path: "minerologia_y_mineria",
    icon: "⛏️",
  },

  {
    title: "RAMAL C14",
    image: "ramalc14_tarjeta.jpg",
    path: "ramal_c14",
    icon: "🚆",
  },
  {
    title: "SAN ANTONIO HOY",
    image: "territorio_andes.jpg",//se intercambio la foto con la de territorio de los andes
    path: "san-antonio-hoy",
    icon: "📰",
  },
  
];

export const Salas = () => {
  return (
    <div className="salas-container">
      <h2 className="salas-main-title">
        <span>Descubre</span> Nuestras Salas
      </h2>
      <p className="salas-subtitle">
        Viaja a través de la historia, la cultura y la naturaleza de la región
        andina.
      </p>

      <List
        grid={{
          gutter: [24, 24], // Aumentar gutter para más espacio
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={data}
        className="salas-list-immersive" // Nueva clase para el List si es necesario
        renderItem={(item, index) => (
          <List.Item
            style={{ animationDelay: `${index * 0.1}s` }}
            className="sala-list-item-immersive"
          >
            {/* --- INICIO: NUEVA ESTRUCTURA DE TARJETA INMERSIVA --- */}
            <Link
              to={`/salas/${item.path}`}
              className={`sala-card-immersive-link ${
                item.path === "historia" ? "sala-historia-link" : ""
              }`}
              style={{
                backgroundImage: `url(${import.meta.env.BASE_URL}${
                  item.image
                })`,
              }}
              aria-label={`Explorar sala ${item.title}`}
            >
              <div className="sala-card-immersive-content-overlay">
                {/* <div className="sala-card-immersive-icon" aria-hidden="true">
                  {item.icon}
                </div> */}
                <h3 className="sala-card-immersive-title">{item.title}</h3>
                <span
                  className="sala-card-immersive-indicator"
                  aria-hidden="true"
                >
                  Ingresar →
                </span>
              </div>
            </Link>
            {/* --- FIN: NUEVA ESTRUCTURA DE TARJETA INMERSIVA --- */}
          </List.Item>
        )}
      />
    </div>
  );
};
