import { Button } from "antd";
import { Link } from "react-router-dom";
import { PlayCircleOutlined, EyeOutlined } from '@ant-design/icons';
import "../Home.css"; // Asegúrate que la ruta sea correcta

export const Home = () => {
  return (
    <div className="home-container">
      {/* Sección Hero */}
      <section className="hero-section">
        <div className="hero-overlay"></div> {/* Capa de superposición */}
        <div className="hero-content">
          {/* Eliminados los atributos data-aos */}
          <h2 className="welcome-text">Bienvenidos al</h2>
          <h1 className="museum-title">
            Museo Regional Andino
          </h1>
          <p className="museum-subtitle">
            Descubre la riqueza cultural de San Antonio de los Cobres
          </p>
          <div className="button-group">
            <Button
              className="btn-custom btn-outline"
              icon={<EyeOutlined />}
              size="large"
              ghost
              // Considera deshabilitar o cambiar el texto si aún no está lista
              // disabled
            >
              Visita Virtual (Próximamente)
            </Button>
            <Link to="/salas">
              <Button
                className="btn-custom btn-filled"
                icon={<PlayCircleOutlined />}
                size="large"
                type="primary"
              >
                Iniciar Visita
              </Button>
            </Link>
          </div>
        </div>
        {/* Indicador de scroll opcional (no depende de AOS) */}
        <div className="scroll-indicator">
          <span></span>
        </div>
      </section>

      {/* Sección de Información */}
      {/* Eliminado data-aos="fade-up" */}
      <section className="info-section">
        <div className="info-content">
            <h3 className="info-title">Explora Nuestra Herencia</h3>
            <p>
            El Museo Regional Andino de San Antonio de los Cobres se dedica a la conservación
            y promoción del invaluable patrimonio cultural y natural de la Puna Salteña.
            Revalorizamos la identidad local a través de exposiciones interactivas y actividades
            educativas diseñadas para conectar profundamente a nuestros visitantes con la rica
            historia y tradiciones de nuestra comunidad andina.
            </p>
            <Link to="/sobre-nosotros">
              <Button type="link" className="info-link">Conoce más sobre el museo →</Button>
            </Link>
        </div>
        <div className="info-visual">
             {/* Podrías poner un SVG, un icono temático o una imagen pequeña aquí */}
             <img src={`${import.meta.env.BASE_URL}logo_museo_andino.jpg`} alt="Logo Museo Andino" />
        </div>
      </section>

       {/* Puedes añadir más secciones aquí */}

    </div>
  );
};