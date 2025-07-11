// src/components/Salas/SalaHistoria.jsx

import React from "react";
// Importamos el CSS de Geología para reutilizar los estilos base de títulos y párrafos
import "./SalaGeologia.css";
// Y un CSS específico para Historia si necesitamos algún ajuste
import "../SalaHistoria.css";
import { useRegisterText } from "../Contexts/SpeechContext"; // <-- Ajusta la ruta si es necesario
import { useTranslation } from "react-i18next";

// --- COMPONENTE PRINCIPAL DE LA SALA ---
export const SalaHistoria = () => {
  // --- 2. USA EL HOOK PARA REGISTRAR EL TEXTO ---
  const { t } = useTranslation();

  // Genera el texto plano para el audio
  const textoParaHablar = Object.values(
    t("sala_historia", { returnObjects: true })
  ).join(" ");
  useRegisterText(textoParaHablar);
  return (
    <article className="sala-contenido-container">
      <h2 className="sala-contenido-titulo-principal">
        {t("sala_historia.titulo_principal")}
      </h2>

      <section className="historia-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_historia.subtitulo_virreinato")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_historia.parrafo_virreinato_1")}
        </p>
        <p className="sala-contenido-parrafo">
          {t("sala_historia.parrafo_virreinato_2")}
        </p>
      </section>

      <section className="historia-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_historia.subtitulo_evangelizacion")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_historia.parrafo_evangelizacion_1")}
        </p>
        <p className="sala-contenido-parrafo">
          {t("sala_historia.parrafo_evangelizacion_2")}
        </p>
      </section>

      <section className="historia-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_historia.subtitulo_republica")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_historia.parrafo_republica_1")}
        </p>
        <p className="sala-contenido-parrafo">
          {t("sala_historia.parrafo_republica_2")}
        </p>
      </section>

      <section className="historia-bloque">
        <h3 className="sala-contenido-subtitulo">
          {t("sala_historia.subtitulo_territorios")}
        </h3>
        <p className="sala-contenido-parrafo">
          {t("sala_historia.parrafo_territorios_1")}
        </p>
        <p className="sala-contenido-parrafo">
          {t("sala_historia.parrafo_territorios_2")}
        </p>
      </section>
    </article>
  );
};
