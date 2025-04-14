import { List } from "antd"; // No necesitamos Card si usamos divs
import { Link } from "react-router-dom";
import { RightOutlined } from '@ant-design/icons';
import '../Salas.css';

const data = [
    // ... (tus datos de salas sin cambios)
    { title: "GOBERNACIÓN DE LOS ANDES", image: "litio.jfif", path: "gobernacion_de_los_andes", icon: "🏛️" },
    { title: "GEOLOGÍA", image: "geologia.jfif", path: "geologia", icon: "🪨" },
    { title: "MINEROLOGÍA Y MINERÍA", image: "minerologia.jfif", path: "minerologia_y_mineria", icon: "⛏️" },
    { title: "BIODIVERSIDAD", image: "biodiversidad.jfif", path: "biodiversidad", icon: "🌱" },
    { title: "ARQUEOLOGÍA", image: "arqueologia.jfif", path: "arqueologia", icon: "🏺" },
    { title: "RAMAL C14", image: "ramalC14.jfif", path: "ramal_c14", icon: "🚆" },
    { title: "SAN ANTONIO HOY", image: "san_antonio_cobres.jfif", path: "san-antonio-hoy", icon: "📰" },
    { title: "HISTORIA", image: "historia_museo.png", path: "historia", icon: "📜" },
];

export const Salas = () => {
  return (
    <div className="salas-container">
      <h2 className="salas-main-title">
        <span>Descubre</span> Nuestras Salas
      </h2>
      <p className="salas-subtitle">
        Viaja a través de la historia, la cultura y la naturaleza de la región andina.
      </p>

      <List
        grid={{
          gutter: [14, 14],
          xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3
        }}
        dataSource={data}
        className="salas-list"
        renderItem={(item, index) => (
          <List.Item style={{ animationDelay: `${index * 0.1}s` }} className="sala-list-item">
            <Link to={`/salas/${item.path}`} className="sala-link-wrapper">
              {/* Contenedor principal (era sala-card) ahora es parte del wrapper */}
              <div className="sala-card-inner">
                {/* Contenedor de imagen (Sí se usa y es necesario) */}
                <div className="sala-image-container">
                  <img src={item.image} alt={item.title} className="sala-image" />
                  <div className="sala-image-overlay"></div>
                  {/* Icono temático movido */}
                </div>
                {/* Contenedor de información */}
                <div className="sala-info-container">
                  {/* Div extra para agrupar título e icono temático */}
                  <div className="sala-title-group">
                     {/* Icono temático AHORA AQUÍ */}
                    <span className="sala-theme-icon" aria-hidden="true">{item.icon}</span>
                    <h3 className="sala-title">{item.title}</h3>
                  </div>
                  {/* Icono de flecha que aparece en hover */}
                  <div className="sala-arrow-icon">
                    <RightOutlined />
                  </div>
                </div>
              </div>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};