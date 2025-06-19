// src/components/salas/GuiaSalas.jsx
import React from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined, HomeOutlined } from '@ant-design/icons';
import './GuiaSalas.css'; // Crearemos este archivo de estilos

// El orden oficial de las salas para el recorrido guiado
const ordenSalas = [
  'geologia',
  'biodiversidad',
  'minerologia_y_mineria',
  'arqueologia',
  'ramal_c14',
  'historia',
  'gobernacion_de_los_andes',
  'san-antonio-hoy',
];

export const GuiaSalas = () => {
  const { salaId } = useParams();
  const navigate = useNavigate();

  const indiceActual = ordenSalas.indexOf(salaId);
  const esLaUltimaSala = indiceActual === ordenSalas.length - 1;

  const handleSiguienteSala = () => {
    if (!esLaUltimaSala) {
      const siguienteSalaId = ordenSalas[indiceActual + 1];
      navigate(`/guia/${siguienteSalaId}`);
    } else {
      // Si es la última, quizás llevarlo de vuelta al home o a la lista de salas
      navigate('/');
    }
  };
  
  const handleVolverAlInicio = () => {
    navigate('/');
  }

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
          disabled={esLaUltimaSala} // Se deshabilita en la última sala
        >
          Siguiente Sala
        </Button>
      </header>

      {/* El contenido de la sala actual se renderizará aquí */}
      <main className="guia-contenido-sala">
        <Outlet />
      </main>
    </div>
  );
};