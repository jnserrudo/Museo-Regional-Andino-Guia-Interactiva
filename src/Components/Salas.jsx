import { List } from "antd"; // No necesitamos Card si usamos divs
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import "../Salas.css";
import { useTranslation } from "react-i18next"; // <-- 1. Importa el hook

// --- El array ahora solo tiene datos que no cambian con el idioma ---
const data = [
  { image: "geologia.jpg", path: "geologia" },
  { image: "biodiversidad.jpg", path: "biodiversidad" },
  { image: "arqueologia.JPG", path: "arqueologia" },
  { image: "historia_museo.JPG", path: "historia" },
  { image: "territorio_andes_tarjeta.JPG", path: "territorio_de_los_andes" },
  { image: "historia_museo.png", path: "gobernacion_de_los_andes" },
  { image: "minerologia_y_mineria.jpg", path: "minerologia_y_mineria" },
  { image: "ramalc14_tarjeta.jpg", path: "ramal_c14" },
  { image: "territorio_andes.jpg", path: "san-antonio-hoy" },
];

export const Salas = () => {
  const { t } = useTranslation();
  return (
    <div className="salas-container">
      <h2 className="salas-main-title">
        {/* Usamos t() para el título */}
        <span>{t("tarjetas_salas.titulo_pagina").split(" ")[0]}</span>{" "}
        {t("tarjetas_salas.titulo_pagina").split(" ").slice(1).join(" ")}
      </h2>
      <p className="salas-subtitle">{t("tarjetas_salas.subtitulo_pagina")}</p>

      <List
        grid={{
          gutter: [24, 24],
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={data}
        className="salas-list-immersive"
        renderItem={(item, index) => {
          // 3. Obtenemos el título traducido para cada tarjeta
          const tituloTraducido = t(`tarjetas_salas.${item.path}`);

          return (
            <List.Item
              style={{ animationDelay: `${index * 0.1}s` }}
              className="sala-list-item-immersive"
            >
              <Link
                to={`/salas/${item.path}`}
                className="sala-card-immersive-link"
                style={{
                  backgroundImage: `url(${import.meta.env.BASE_URL}${
                    item.image
                  })`,
                }}
                aria-label={`Explorar sala ${tituloTraducido}`}
              >
                <div className="sala-card-immersive-content-overlay">
                  <h3 className="sala-card-immersive-title">
                    {tituloTraducido}
                  </h3>
                  <span
                    className="sala-card-immersive-indicator"
                    aria-hidden="true"
                  >
                    {t("tarjetas_salas.boton_ingresar")}
                  </span>
                </div>
              </Link>
            </List.Item>
          );
        }}
      />
    </div>
  );
};
