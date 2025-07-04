// src/components/salas/DespedidaGuia.jsx

import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  ExperimentOutlined,
  FormOutlined,
} from "@ant-design/icons";
import "./DespedidaGuia.css"; // Crearemos este archivo de estilos
import { useRegisterText } from "../Contexts/SpeechContext";

const despedidaGuiaText = `
¡Gracias por recorrer el museo con nosotros!
Esperamos que esta guía te haya acompañado en un viaje por la historia, el territorio, las culturas y la identidad viva de San Antonio de los Cobres y la Puna andina. Cada sala guarda fragmentos de una memoria colectiva que sigue presente en quienes habitan hoy este lugar.
¡Compartí tu experiencia en redes con el hashtag #MuseoRegionalAndino y #MuseoenlaPuna!

¿Querés seguir explorando?
Te invitamos a:
Jugar con nuestras actividades interactivas.
Dejanos tus comentarios. Tu opinión nos ayuda a mejorar. Por favor, completá esta breve encuesta.
`;
export const DespedidaGuia = () => {
  useRegisterText(despedidaGuiaText);

  return (
    <div className="despedida-container sala-contenido-container">
      <h2 className="sala-contenido-titulo-principal">
        ¡Gracias por recorrer el museo con nosotros!
      </h2>

      <p className="sala-contenido-parrafo">
        Esperamos que esta guía te haya acompañado en un viaje por la historia,
        el territorio, las culturas y la identidad viva de San Antonio de los
        Cobres y la Puna andina. Cada sala guarda fragmentos de una memoria
        colectiva que sigue presente en quienes habitan hoy este lugar.
      </p>

      <p className="despedida-redes">
        ¡Compartí tu experiencia en redes con el hashtag{" "}
        <strong>#MuseoRegionalAndino</strong> y <strong>#MuseoenlaPuna</strong>!
      </p>
      <div className="despedida-cta-section">
        <h3 className="sala-contenido-subtitulo">Seguí descubriendo</h3>
        <p className="sala-contenido-parrafo">
          Te invitamos a jugar y aprender con nuestras actividades interactivas:
        </p>

        <div className="despedida-botones-cta">
          {/* --- Botón de Trivia --- */}
          <Link to="/juegos/trivia">
            <Button
              type="primary"
              size="large"
              className="sala-contenido-boton"
              icon={<ExperimentOutlined />}
            >
              🧠 Trivia: ¿Cuánto sabés sobre la Puna? Poné a prueba tus
              conocimientos y descubrí datos curiosos.
            </Button>
          </Link>

          {/* --- Botón de Rompecabezas --- */}
          <Link to="/juegos/puzzle">
            <Button
              type="primary"
              size="large"
              className="sala-contenido-boton"
              icon={<ExperimentOutlined />}
            >
              🧩 Rompecabezas: ¿Podés armarlo? Observá con atención y completá
              la imagen.
            </Button>
          </Link>
        </div>

        <h4 className="sala-contenido-subtitulo-menor">
          🗣️ ¿Querés contarnos qué te pareció?
        </h4>
        <p className="sala-contenido-parrafo">
          Dejanos tus comentarios y respondé una mini encuesta. ¡Tu opinión nos
          ayuda a mejorar!
        </p>

        {/* --- Formulario de Google Forms --- */}
        <div className="google-form-container">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScO8ncvTOVKXTxxz0Hz_17SXOCIp3wiRMF9OTGb4vDGm6vGTQ/viewform?embedded=true"
            className="google-form-iframe"
            title="Encuesta de Satisfacción del Museo"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            Cargando…
          </iframe>
        </div>
      </div>
    </div>
  );
};
