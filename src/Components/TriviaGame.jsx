// src/Components/TriviaGame.jsx

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "antd";
import "./TriviaGame.css"; // Crearemos este archivo de estilos
import { useTranslation, Trans } from "react-i18next"; // <-- 1. Importa el hook
import { ReloadOutlined, ArrowLeftOutlined } from "@ant-design/icons"; // <-- IMPORTACIÓN AÑADIDA
import { Link } from 'react-router-dom'; // <-- IMPORTACIÓN AÑADIDA

// 1. Unificamos todas las preguntas en un solo array de datos

// Función para barajar un array y tomar los primeros N elementos

export const TriviaGame = () => {
  const { t, i18n } = useTranslation(); // Usamos i18n para detectar cambios de idioma
  // 2. Estado para almacenar las 5 preguntas del juego actual
  const [preguntasDelJuego, setPreguntasDelJuego] = useState([]);
  const [preguntaActualIndex, setPreguntaActualIndex] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  // 3. Inicializa el juego con 5 preguntas aleatorias al cargar el componente
  // La función para iniciar/reiniciar el juego
  const iniciarJuego = () => {
    const todasLasPreguntas = t("juegos.trivia_game.preguntas_set", {
      returnObjects: true,
    });
    const preguntasBarajadas = [...todasLasPreguntas].sort(
      () => 0.5 - Math.random()
    );

    setPreguntasDelJuego(preguntasBarajadas.slice(0, 5));
    setPreguntaActualIndex(0);
    setPuntuacion(0);
    setRespuestaSeleccionada(null);
    setMostrarResultado(false);
    setJuegoTerminado(false);
  };

  // useEffect para iniciar el juego al montar y reiniciarlo si cambia el idioma
  useEffect(() => {
    iniciarJuego();
  }, [i18n.language]); // Depende del idioma actual
  const handleSeleccionarRespuesta = (opcion) => {
    if (mostrarResultado) return; // No permitir cambiar la respuesta

    setRespuestaSeleccionada(opcion);
    const esCorrecta =
      opcion === preguntasDelJuego[preguntaActualIndex].respuestaCorrecta;

    if (esCorrecta) {
      setPuntuacion(puntuacion + 1);
    }
    setMostrarResultado(true);
  };

  const handleSiguientePregunta = () => {
    if (preguntaActualIndex < preguntasDelJuego.length - 1) {
      setPreguntaActualIndex(preguntaActualIndex + 1);
      setRespuestaSeleccionada(null);
      setMostrarResultado(false);
    } else {
      setJuegoTerminado(true);
    }
  };

  if (preguntasDelJuego.length === 0) {
    return <div>{t("juegos.trivia_game.cargando")}</div>;
  }

  if (juegoTerminado) {
    return (
      <div className="trivia-container">
        <div className="trivia-card resultado-final">
          <h2>{t("juegos.trivia_game.juego_terminado")}</h2>
          <p className="puntuacion-final">
            <Trans
              i18nKey="juegos.trivia_game.puntuacion_final"
              values={{
                puntuacion: puntuacion,
                total: preguntasDelJuego.length,
              }}
            >
              Tu puntuación final es:{" "}
              <strong>
                {puntuacion} de {preguntasDelJuego.length}
              </strong>
            </Trans>
          </p>
          <div className="resultado-acciones">
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={iniciarJuego}
              size="large"
            >
              {t("juegos.trivia_game.jugar_de_nuevo")}
            </Button>
            <Link to="/juegos">
              <Button type="default" icon={<ArrowLeftOutlined />} size="large">
                {t("juegos.trivia_game.volver_a_juegos")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const preguntaActual = preguntasDelJuego[preguntaActualIndex];

  return (
    <div className="trivia-container">
      <div className="trivia-header">
        <h1>{t("juegos.trivia_game.titulo")}</h1>
        <div className="trivia-progreso">
          {t("juegos.trivia_game.pregunta", {
            actual: preguntaActualIndex + 1,
            total: preguntasDelJuego.length,
          })}{" "}
          | {t("juegos.trivia_game.puntuacion", { puntuacion: puntuacion })}
        </div>
      </div>
      <div className="trivia-card">
        <h2 className="pregunta-texto">{preguntaActual.pregunta}</h2>
        <div className="opciones-container">
          {preguntaActual.opciones.map((opcion, index) => {
            const esCorrecta = opcion === preguntaActual.respuestaCorrecta;
            const esSeleccionada = opcion === respuestaSeleccionada;
            let claseBoton = "opcion-btn";
            if (mostrarResultado) {
              if (esCorrecta) claseBoton += " correcta";
              else if (esSeleccionada) claseBoton += " incorrecta";
            }

            return (
              <button
                key={index}
                className={claseBoton}
                onClick={() => handleSeleccionarRespuesta(opcion)}
                disabled={mostrarResultado}
              >
                {opcion}
              </button>
            );
          })}
        </div>
        {mostrarResultado && (
          <div className="resultado-container">
            <div className="dato-curioso">
              <strong>{t("juegos.trivia_game.dato_curioso")}</strong>{" "}
              {preguntaActual.datoCurioso}
            </div>
            <Button
              onClick={handleSiguientePregunta}
              type="primary"
              size="large"
              style={{ marginTop: "1rem" }}
            >
              {preguntaActualIndex < preguntasDelJuego.length - 1
                ? t("juegos.trivia_game.siguiente_pregunta")
                : t("juegos.trivia_game.ver_resultados")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
