// src/Pages/PaginaJuegos.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionCircleOutlined, AppstoreOutlined } from '@ant-design/icons';
import './PaginaJuegos.css'; // Crearemos este archivo de estilos

export const PaginaJuegos = () => {
  return (
    <div className="pagina-juegos-container">
      <h1 className="pagina-juegos-titulo">Actividades Interactivas</h1>
      <p className="pagina-juegos-subtitulo">
        Pon a prueba tus conocimientos y diviértete con nuestros juegos.
      </p>

      <div className="juegos-grid">
        {/* --- Tarjeta para la Trivia --- */}
        <Link to="/juegos/trivia" className="juego-card">
          <div className="juego-card-icon">
            <QuestionCircleOutlined />
          </div>
          <h3 className="juego-card-titulo"> Trivia: ¿Cuánto sabés sobre la Puna?</h3>
          <p className="juego-card-descripcion">
            Poné a prueba tus conocimientos y descubrí datos curiosos.
          </p>
          <span className="juego-card-link">Jugar Ahora →</span>
        </Link>

        {/* --- Tarjeta para el Rompecabezas --- */}
        <Link to="/juegos/puzzle" className="juego-card">
          <div className="juego-card-icon">
            <AppstoreOutlined />
          </div>
          <h3 className="juego-card-titulo"> Rompecabezas: ¿Podés armarlo?</h3>
          <p className="juego-card-descripcion">
            Observá con atención y completá la imagen.
          </p>
          <span className="juego-card-link">Jugar Ahora →</span>
        </Link>
      </div>
    </div>
  );
};