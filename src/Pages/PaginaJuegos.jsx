// src/Pages/PaginaJuegos.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionCircleOutlined, AppstoreOutlined } from '@ant-design/icons';
import './PaginaJuegos.css'; // Crearemos este archivo de estilos
import { useTranslation } from 'react-i18next'; // <-- 1. Importa el hook

export const PaginaJuegos = () => {
  const { t } = useTranslation();
  return (
    <div className="pagina-juegos-container">
      <h1 className="pagina-juegos-titulo">{t('juegos.pagina_juegos.titulo')}</h1>
      <p className="pagina-juegos-subtitulo">{t('juegos.pagina_juegos.subtitulo')}</p>
      <div className="juegos-grid">
        <Link to="/juegos/trivia" className="juego-card">
          <div className="juego-card-icon"><QuestionCircleOutlined /></div>
          <h3 className="juego-card-titulo">{t('juegos.pagina_juegos.trivia_titulo')}</h3>
          <p className="juego-card-descripcion">{t('juegos.pagina_juegos.trivia_desc')}</p>
          <span className="juego-card-link">{t('juegos.pagina_juegos.jugar_ahora')}</span>
        </Link>
        <Link to="/juegos/puzzle" className="juego-card">
          <div className="juego-card-icon"><AppstoreOutlined /></div>
          <h3 className="juego-card-titulo">{t('juegos.pagina_juegos.puzzle_titulo')}</h3>
          <p className="juego-card-descripcion">{t('juegos.pagina_juegos.puzzle_desc')}</p>
          <span className="juego-card-link">{t('juegos.pagina_juegos.jugar_ahora')}</span>
        </Link>
      </div>
    </div>
  );
};