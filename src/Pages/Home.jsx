import { Button } from "antd";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
      <div className="home">
        {/* Sección de la imagen de fondo con título */}
        <div className="home-header">
          <h2>Bienvenidos al</h2>
          <h1 className="home-title">MUSEO REGIONAL ANDINO</h1>
          <div className="home-buttons">
            <Button type="default" className="home-button">Visita Virtual</Button>
            <Link to="/salas">
              <Button type="primary" className="home-button">Iniciar Visita</Button>
            </Link>
          </div>
        </div>
  
        {/* Sección de información con fondo de color */}
        <div className="home-info">
  
          <p className="home-description">
            El Museo Regional Andino de San Antonio de los Cobres conserva y
            promueve el patrimonio cultural y natural de la región andina,
            fomentando la educación y la sensibilización sobre su historia y
            tradiciones. Revalorizando la identidad cultural local, ofreciendo
            exposiciones y actividades educativas que conecten a los visitantes
            con la rica herencia de San Antonio de los Cobres.
          </p>
        </div>
      </div>
    );
  };
  
