// src/Components/TriviaGame.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import './TriviaGame.css'; // Crearemos este archivo de estilos

// 1. Unificamos todas las preguntas en un solo array de datos
const todasLasPreguntas = [
  // Trivia Puna
  {
    pregunta: "¿Qué característica especial tiene la Puna respecto al agua?",
    opciones: ["Tiene los ríos más largos del país.", "Sus aguas desembocan en el mar Atlántico.", "Es parte de una cuenca endorreica, donde el agua no llega al mar.", "Recibe lluvias todo el año."],
    respuestaCorrecta: "Es parte de una cuenca endorreica, donde el agua no llega al mar.",
    datoCurioso: "Las cuencas endorreicas actúan como gigantescos platos de evaporación, lo que da origen a los impresionantes salares."
  },
  {
    pregunta: "¿Qué hay al oeste de la Puna?",
    opciones: ["La Cordillera Oriental", "La Cordillera Volcánica Occidental", "La Selva Misionera", "El Océano Pacífico"],
    respuestaCorrecta: "La Cordillera Volcánica Occidental",
    datoCurioso: "Esta cordillera está llena de volcanes gigantes, algunos de los cuales superan los 6.000 metros de altura."
  },
  {
    pregunta: "¿Cómo se llama el fenómeno donde el vapor caliente sale por grietas del suelo, como si la Tierra 'respirara'?",
    opciones: ["Fumarolas", "Tornado térmico", "Corriente convectiva", "Temblores secos"],
    respuestaCorrecta: "Fumarolas",
    datoCurioso: "Las fumarolas son una señal de que hay actividad volcánica o geotérmica muy cerca de la superficie."
  },
  {
    pregunta: "¿Qué elemento se usa en celulares y autos eléctricos, y se extrae de las salmueras bajo los salares?",
    opciones: ["Cobre", "Litio", "Plata", "Uranio"],
    respuestaCorrecta: "Litio",
    datoCurioso: "La Puna forma parte del 'Triángulo del Litio', una de las reservas de este mineral más grandes del mundo."
  },
  {
    pregunta: "¿Cómo se forma un géiser?",
    opciones: ["Por una explosión volcánica repentina.", "Cuando la lava entra en contacto con hielo.", "Cuando el agua subterránea se calienta con rocas volcánicas y sale como vapor a presión.", "Por la acción del viento sobre las dunas salinas."],
    respuestaCorrecta: "Cuando el agua subterránea se calienta con rocas volcánicas y sale como vapor a presión.",
    datoCurioso: "Los géiseres son extremadamente raros y solo existen en unos pocos lugares del planeta con las condiciones geológicas perfectas."
  },
  // Trivia Minerales
  {
    pregunta: "¿Qué tiene de especial la piedra pómez?",
    opciones: ["Es muy pesada y se hunde rápido", "Es suave y se derrite con el calor", "Tiene tantos agujeritos que ¡puede flotar!", "Cambia de color con la luz del sol"],
    respuestaCorrecta: "Tiene tantos agujeritos que ¡puede flotar!",
    datoCurioso: "La piedra pómez flota porque tiene muchas burbujas de aire atrapadas. ¡Es como lava 'espumosa' solidificada!"
  },
  {
    pregunta: "¿Cuál de estos minerales puede 'mostrar imágenes' como si fuera una televisión?",
    opciones: ["Ulexita", "Galena", "Ónix", "Yeso"],
    respuestaCorrecta: "Ulexita",
    datoCurioso: "A la Ulexita se la llama “piedra televisión” porque sus fibras naturales transmiten la luz de un lado a otro. ¡Pura magia de la naturaleza!"
  },
  {
    pregunta: "¿Qué mineral usaban los antiguos mineros en lámparas especiales para iluminar en la oscuridad?",
    opciones: ["Halita", "Carburo de calcio", "Azufre", "Malaquita"],
    respuestaCorrecta: "Carburo de calcio",
    datoCurioso: "Al mezclarlo con agua, el carburo de calcio produce un gas inflamable que genera una llama brillante y duradera."
  },
  {
    pregunta: "¿Cuál de estos minerales es la principal fuente de plomo y a veces también contiene plata?",
    opciones: ["Galena", "Ortosa", "Casiterita", "Muscovita"],
    respuestaCorrecta: "Galena",
    datoCurioso: "La galena es tan brillante y pesada que parece una roca metálica de otro planeta."
  },
  {
    pregunta: "¿Qué es una 'brecha hidrotermal'?",
    opciones: ["Una cueva llena de cristales gigantes", "Una zona donde el agua caliente formó minerales al enfriarse", "Una grieta con lava", "Un tipo de roca que se encuentra solo en volcanes activos"],
    respuestaCorrecta: "Una zona donde el agua caliente formó minerales al enfriarse",
    datoCurioso: "Estas brechas parecen 'rompecabezas' de rocas rotas que fueron pegadas con cuarzo y otros minerales brillantes."
  },
  // Puedes seguir añadiendo más preguntas aquí...
];

// Función para barajar un array y tomar los primeros N elementos
const obtenerPreguntasAleatorias = (cantidad) => {
  const preguntasBarajadas = [...todasLasPreguntas].sort(() => 0.5 - Math.random());
  return preguntasBarajadas.slice(0, cantidad);
};


export const TriviaGame = () => {
  // 2. Estado para almacenar las 5 preguntas del juego actual
  const [preguntasDelJuego, setPreguntasDelJuego] = useState([]);
  const [preguntaActualIndex, setPreguntaActualIndex] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  // 3. Inicializa el juego con 5 preguntas aleatorias al cargar el componente
  useEffect(() => {
    iniciarJuego();
  }, []);

  const iniciarJuego = () => {
    setPreguntasDelJuego(obtenerPreguntasAleatorias(5));
    setPreguntaActualIndex(0);
    setPuntuacion(0);
    setRespuestaSeleccionada(null);
    setMostrarResultado(false);
    setJuegoTerminado(false);
  };

  const handleSeleccionarRespuesta = (opcion) => {
    if (mostrarResultado) return; // No permitir cambiar la respuesta

    setRespuestaSeleccionada(opcion);
    const esCorrecta = opcion === preguntasDelJuego[preguntaActualIndex].respuestaCorrecta;
    
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
    return <div>Cargando trivia...</div>;
  }
  
  if (juegoTerminado) {
    return (
      <div className="trivia-container">
        <div className="trivia-card resultado-final">
          <h2>Juego Terminado</h2>
          <p className="puntuacion-final">Tu puntuación final es: <strong>{puntuacion} de {preguntasDelJuego.length}</strong></p>
          {/* --- NUEVO: Contenedor para los botones de acción --- */}
          <div className="resultado-acciones">
            <Button 
              type="primary" 
              icon={<ReloadOutlined />} 
              onClick={iniciarJuego} 
              size="large"
            >
              Jugar de Nuevo
            </Button>
            
            <Link to="/juegos">
              <Button 
                type="default" 
                icon={<ArrowLeftOutlined />} 
                size="large"
              >
                Volver a Juegos
              </Button>
            </Link>
          </div>
          {/* --- FIN DEL NUEVO CONTENEDOR --- */}
        </div>
      </div>
    );
  }

  const preguntaActual = preguntasDelJuego[preguntaActualIndex];

  return (
    <div className="trivia-container">
      <div className="trivia-header">
        <h1>Trivia sobre la Puna</h1>
        <div className="trivia-progreso">
          Pregunta {preguntaActualIndex + 1} de {preguntasDelJuego.length} | Puntuación: {puntuacion}
        </div>
      </div>
      
      <div className="trivia-card">
        <h2 className="pregunta-texto">{preguntaActual.pregunta}</h2>
        <div className="opciones-container">
          {preguntaActual.opciones.map((opcion, index) => {
            const esCorrecta = opcion === preguntaActual.respuestaCorrecta;
            const esSeleccionada = opcion === respuestaSeleccionada;
            let claseBoton = 'opcion-btn';
            if (mostrarResultado) {
              if (esCorrecta) claseBoton += ' correcta';
              else if (esSeleccionada) claseBoton += ' incorrecta';
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
              <strong>💡 Dato Curioso:</strong> {preguntaActual.datoCurioso}
            </div>
            <Button onClick={handleSiguientePregunta} type="primary" size="large" style={{ marginTop: '1rem' }}>
              {preguntaActualIndex < preguntasDelJuego.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};