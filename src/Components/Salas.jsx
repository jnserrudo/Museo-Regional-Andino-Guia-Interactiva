import { List } from "antd"; // No necesitamos Card si usamos divs
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import "../Salas.css";

const data = [
  // ... (tus datos de salas sin cambios)
  {
    title: "GOBERNACIÓN DE LOS ANDES",
    image: "litio.jfif",
    path: "gobernacion_de_los_andes",
    icon: "🏛️",
  },
  { title: "GEOLOGÍA", image: "geologia.jpg", path: "geologia", icon: "🪨" },
  {
    title: "MINEROLOGÍA Y MINERÍA",
    image: "minerologia_y_mineria.jpg",
    path: "minerologia_y_mineria",
    icon: "⛏️",
  },
  {
    title: "BIODIVERSIDAD",
    image: "biodiversidad.jfif",
    path: "biodiversidad",
    icon: "🌱",
  },
  {
    title: "ARQUEOLOGÍA",
    image: "arqueologia.jfif",
    path: "arqueologia",
    icon: "🏺",
  },
  { title: "RAMAL C14", image: "ramalc14_tarjeta.jpg", path: "ramal_c14", icon: "🚆" },
  {
    title: "SAN ANTONIO HOY",
    image: "san_antonio_cobres.jfif",
    path: "san-antonio-hoy",
    icon: "📰",
  },
  {
    title: "HISTORIA",
    image: "historia_museo.jfif",
    path: "historia",
    icon: "📜",
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
              className={`sala-card-immersive-link ${item.path === "historia" ? "sala-historia-link" : ""}`}
              style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${item.image})` }}
              aria-label={`Explorar sala ${item.title}`}
            >
              <div className="sala-card-immersive-content-overlay">
                {/* <div className="sala-card-immersive-icon" aria-hidden="true">
                  {item.icon}
                </div> */}
                <h3 className="sala-card-immersive-title">{item.title}</h3>
                <span className="sala-card-immersive-indicator" aria-hidden="true">
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
