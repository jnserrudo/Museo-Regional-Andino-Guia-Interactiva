// Footer.js
import React from 'react';
import { Layout, Button, Tooltip } from 'antd'; // Añadimos Tooltip
import {
  HomeOutlined,
  CalendarOutlined,       // Icono de Eventos
  SoundOutlined,          // Icono de Audio/Bocina (o CustomerServiceOutlined)
  StopOutlined,           // Icono para Detener audio
  ZoomInOutlined,         // Icono Aumentar Fuente
  ZoomOutOutlined,        // Icono Disminuir Fuente
  AppstoreOutlined,       // Icono Puzzle
  GlobalOutlined          // Icono Mapa (o CompassOutlined)
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useSpeech } from '../Contexts/SpeechContext'; // Importa los hooks de contexto
import { useFont } from '../Contexts/FontContext'; // Importa los hooks de contexto
import '../Footer.css'; // Importa el CSS del Footer

const AntFooter = Layout.Footer;

export const Footer = () => {
  const { speakText, isSpeaking, canSpeak } = useSpeech(); // Obtiene funciones y estado de audio
  const { increaseFontSize, decreaseFontSize } = useFont(); // Obtiene funciones de fuente
  const location = useLocation(); // Para saber la ruta actual

  // Ocultar footer en ciertas rutas si es necesario (ej. el puzzle)
  if (location.pathname === '/puzzle') {
      return null; // No renderiza el footer en la ruta del puzzle
  }

  return (
    <AntFooter className="app-footer">
      <Tooltip title="Inicio">
        <Link to="/">
          <Button type="text" className="footer-btn" icon={<HomeOutlined />} />
        </Link>
      </Tooltip>
      <Tooltip title="Eventos (Próximamente)">
        <Link to="/eventos"> {/* Ruta aún no creada */}
          <Button type="text" className="footer-btn" icon={<CalendarOutlined />} disabled /> {/* Deshabilitado por ahora */}
        </Link>
      </Tooltip>
      <Tooltip title={isSpeaking ? "Detener Lectura" : "Leer Contenido en Voz Alta"}>
         {/* Botón de Audio: Muestra icono de stop si está hablando */}
         <Button
            type="text"
            className={`footer-btn ${isSpeaking ? 'speaking' : ''}`}
            icon={isSpeaking ? <StopOutlined /> : <SoundOutlined />}
            onClick={speakText}
            disabled={!canSpeak} // Deshabilitado si el navegador no soporta TTS
          />
      </Tooltip>
      <Tooltip title="Aumentar Tamaño de Texto">
         <Button type="text" className="footer-btn" icon={<ZoomInOutlined />} onClick={increaseFontSize} />
      </Tooltip>
      <Tooltip title="Disminuir Tamaño de Texto">
         <Button type="text" className="footer-btn" icon={<ZoomOutOutlined />} onClick={decreaseFontSize} />
      </Tooltip>
      <Tooltip title="Rompecabezas">
         <Link to="/puzzle">
            <Button type="text" className="footer-btn" icon={<AppstoreOutlined />} />
         </Link>
      </Tooltip>
       {/* --- CAMBIOS AQUÍ --- */}
       <Tooltip title="Mapa del Museo"> {/* Título actualizado */}
         <Link to="/mapa">
           {/* Botón HABILITADO */}
           <Button type="text" className="footer-btn" icon={<GlobalOutlined />} />
         </Link>
      </Tooltip>
      {/* --- FIN CAMBIOS --- */}
    </AntFooter>
  );
};