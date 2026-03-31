// src/components/Salas/SalaTerritorioAndes.jsx

import React from "react";
// Importamos los CSS para reutilizar estilos y mantener consistencia
import "./SalaGeologia.css";
import "./SalaTerritorioAndes.css";
import { useRegisterText } from "../Contexts/SpeechContext";
import { useTranslation } from "react-i18next";

export const SalaTerritorioAndes = () => {
  const { t } = useTranslation();

  // Genera el texto plano para el audio
  const textoParaHablar = Object.values(
    t("sala_territorio_andes", { returnObjects: true })
  )
    .map((value) =>
      typeof value === "object" ? Object.values(value).join(" ") : value
    )
    .join(" ");
  useRegisterText(textoParaHablar);
  return (
    <article className="sala-contenido-container">
      <h2 className="sala-contenido-titulo-principal">
        {t("sala_territorio_andes.titulo_principal")}
      </h2>

      <section className="territorio-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_territorio_andes.subtitulo_intro")}
        </h3>
        <figure className="territorio-image-block align-left">
          <img
            src={import.meta.env.BASE_URL + "/mapa_gobernacion.jpg"}
            alt="Mapa de la Gobernación de Los Andes"
            className="territorio-inline-image"
            loading="lazy"
          />
        </figure>
        <p className="sala-contenido-parrafo">
          {t("sala_territorio_andes.parrafo_intro_1")}
        </p>
        <p className="sala-contenido-parrafo">
          {t("sala_territorio_andes.parrafo_intro_2")}
        </p>
        <p className="sala-contenido-parrafo">
          {t("sala_territorio_andes.parrafo_intro_3")}
        </p>

        <div className="mapas-historicos-galeria">
          <figure className="mapa-item">
            <img
              src={import.meta.env.BASE_URL + "/mapa_latzina.jpg"}
              alt="Mapa de Francisco Latzina"
              className="mapa-imagen"
              loading="lazy"
            />
            <figcaption className="mapa-caption">
              {t("sala_territorio_andes.caption_mapa_latzina")}
            </figcaption>
          </figure>
          <figure className="mapa-item">
            <img
              src={import.meta.env.BASE_URL + "/mapa_san_roman.jpg"}
              alt="Carta geográfica de Francisco J. San Román"
              className="mapa-imagen"
              loading="lazy"
            />
            <figcaption className="mapa-caption">
              {t("sala_territorio_andes.caption_mapa_san_roman")}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="territorio-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_territorio_andes.subtitulo_conflictos")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_territorio_andes.parrafo_conflictos_1")}
        </p>
        <p className="sala-contenido-parrafo">
          {t("sala_territorio_andes.parrafo_conflictos_2")}
        </p>
      </section>

      <section className="territorio-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_territorio_andes.subtitulo_diplomacia")}
        </h3>
        <figure className="territorio-image-block align-right">
          <img
            src={import.meta.env.BASE_URL + "/mapa_reparticion.png"}
            alt="Mapa de la repartición de la Puna de Atacama"
            className="territorio-inline-image"
            loading="lazy"
          />
        </figure>
        <p className="sala-contenido-parrafo">
          {t("sala_territorio_andes.parrafo_diplomacia_1")}
        </p>
        <p className="sala-contenido-parrafo">
          {t("sala_territorio_andes.parrafo_diplomacia_2")}
        </p>
        <ul className="sala-contenido-lista">
          <li>{t("sala_territorio_andes.lista_diplomacia.item1")}</li>
          <li>{t("sala_territorio_andes.lista_diplomacia.item2")}</li>
        </ul>
        <p className="sala-contenido-parrafo">
          {t("sala_territorio_andes.parrafo_diplomacia_3")}
        </p>
      </section>
    </article>
  );
};
