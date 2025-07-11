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
import { useTranslation, Trans } from 'react-i18next';

export const DespedidaGuia = () => {
  const { t } = useTranslation();

  const textoParaHablar = Object.values(t('despedida_guia', { returnObjects: true }))
    .map(value => value.replace(/<[^>]*>/g, '')) // Limpia el HTML para el audio
    .join(' ');
  useRegisterText(textoParaHablar);

  return (
    <div className="despedida-container sala-contenido-container">
      <h2 className="sala-contenido-titulo-principal">
        {t('despedida_guia.titulo')}
      </h2>

      <p className="sala-contenido-parrafo">
        {t('despedida_guia.parrafo_1')}
      </p>

      <p className="despedida-redes">
        <Trans i18nKey="despedida_guia.redes_sociales" />
      </p>
      
      <div className="despedida-cta-section">
        <h3 className="sala-contenido-subtitulo">{t('despedida_guia.subtitulo_explorar')}</h3>
        <p className="sala-contenido-parrafo">{t('despedida_guia.parrafo_explorar')}</p>

        <div className="despedida-botones-cta">
          <Link to="/juegos/trivia">
            <Button type="primary" size="large" className="sala-contenido-boton">
              {t('despedida_guia.boton_trivia')}
            </Button>
          </Link>
          <Link to="/juegos/puzzle">
            <Button type="primary" size="large" className="sala-contenido-boton">
              {t('despedida_guia.boton_puzzle')}
            </Button>
          </Link>
        </div>

        <h4 className="sala-contenido-subtitulo-menor">{t('despedida_guia.subtitulo_encuesta')}</h4>
        <p className="sala-contenido-parrafo">{t('despedida_guia.parrafo_encuesta')}</p>

        <div className="google-form-container">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScO8ncvTOVKXTxxz0Hz_17SXOCIp3wiRMF9OTGb4vDGm6vGTQ/viewform?embedded=true"
            className="google-form-iframe"
            title="Encuesta de Satisfacción del Museo"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            {t('despedida_guia.iframe_cargando')}
          </iframe>
        </div>
      </div>
    </div>
  );
};
