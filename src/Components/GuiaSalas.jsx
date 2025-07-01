// src/components/salas/GuiaSalas.jsx
import React, { useEffect, useRef } from "react"; 
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { Button } from "antd";
import { ArrowRightOutlined, HomeOutlined } from "@ant-design/icons";
import "./GuiaSalas.css"; // Crearemos este archivo de estilos

// El orden oficial de las salas para el recorrido guiado
const ordenSalas = [
  "geologia",
  "biodiversidad",
  "minerologia_y_mineria",
  "arqueologia",
  "ramal_c14",
  "historia",
  "gobernacion_de_los_andes",
  "san-antonio-hoy",
];

export const GuiaSalas = () => {
  const { salaId } = useParams();
  const navigate = useNavigate();


// --- 2. CREA UNA REFERENCIA PARA EL CONTENEDOR DEL CONTENIDO ---
const contenidoRef = useRef(null);

  const indiceActual = ordenSalas.indexOf(salaId);
  const esLaUltimaSala = indiceActual === ordenSalas.length - 1;

  
  // --- 3. AÑADE ESTE useEffect ---
  // Este efecto se ejecutará cada vez que el `salaId` cambie.
  useEffect(() => {
    // Hacemos scroll al inicio del contenedor del contenido de la sala.
    // Usamos 'contenidoRef.current' que apunta al <main>
    if (contenidoRef.current) {
        // Opción A: Scroll suave (si lo prefieres)
        // contenidoRef.current.scrollTo({ top: 0, behavior: 'smooth' });

        // Opción B: Scroll instantáneo (más directo)
        contenidoRef.current.scrollTop = 0;
    }
  }, [salaId]); // La dependencia es `salaId`
  
  const handleSiguienteSala = () => {
    if (!esLaUltimaSala) {
      const siguienteSalaId = ordenSalas[indiceActual + 1];
      navigate(`/guia/${siguienteSalaId}`);
    } else {
      // Si es la última sala, llévanos a la pantalla de despedida
      navigate("/guia/despedida");
    }
  };

  const handleVolverAlInicio = () => {
    navigate("/");
  };

  return (
    <div className="guia-container">
      {/* --- Barra de Navegación de la Guía (Persistente) --- */}
      <header className="guia-navegacion">
        <Button
          type="default"
          icon={<HomeOutlined />}
          onClick={handleVolverAlInicio}
        >
          Salir de la Guía
        </Button>
        <div className="guia-info-sala">
          Sala {indiceActual + 1} de {ordenSalas.length}
        </div>
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          onClick={handleSiguienteSala}
          // Ya no necesitamos 'disabled', el botón siempre estará activo
        >
          {esLaUltimaSala ? "Finalizar Guía" : "Siguiente Sala"}
        </Button>
      </header>

      {/* --- 4. ASIGNA LA REFERENCIA AL CONTENEDOR <main> --- */}
      <main ref={contenidoRef} className="guia-contenido-sala">
        <Outlet />
      </main>
    </div>
  );
};
