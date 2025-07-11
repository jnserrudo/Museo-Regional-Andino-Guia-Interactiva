import { Button } from "antd";
import { Link } from "react-router-dom";
import { PlayCircleOutlined, EyeOutlined } from "@ant-design/icons";
import "../Home.css"; // Asegúrate que la ruta sea correcta

import { useRegisterText } from "../Contexts/SpeechContext"; // <-- Ajusta la ruta si es necesario
import { useTranslation } from "react-i18next";

const homeText = `
Bienvenidos al Museo Regional Andino de San Antonio de los Cobres.

El Museo Regional Andino de San Antonio de los Cobres tiene como finalidad la conservación y promoción del invaluable patrimonio cultural y natural de la Puna. Este revaloriza la identidad local a través de exposiciones interactivas y actividades educativas, diseñadas para conectar profundamente a los visitantes con la rica historia y tradiciones de la comunidad andina.
`;

export const Home = () => {
  const { t } = useTranslation();

  // Obtenemos el texto traducido para el audio
  useRegisterText(t("pagina_home.texto_completo_audio"));

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2 className="welcome-text">{t("pagina_home.bienvenida")}</h2>
          <h1 className="museum-title">{t("pagina_home.titulo_museo")}</h1>

          <div className="button-group">
            <Link to="/guia">
              <Button
                className="btn-custom btn-filled"
                icon={<PlayCircleOutlined />}
                size="large"
                type="primary"
              >
                {t("pagina_home.boton_iniciar_visita")}
              </Button>
            </Link>

            <Link to="/salas">
              <Button
                className="btn-custom btn-filled"
                icon={<PlayCircleOutlined />}
                size="large"
                type="primary"
              >
                {t("pagina_home.boton_salas")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="info-content">
          <p>{t("pagina_home.parrafo_info")}</p>
        </div>
        <div className="info-visual">
          <img
            src={`${import.meta.env.BASE_URL}logo_museo_andino.jpg`}
            alt="Logo Museo Andino"
          />
        </div>
      </section>
    </div>
  );
};
