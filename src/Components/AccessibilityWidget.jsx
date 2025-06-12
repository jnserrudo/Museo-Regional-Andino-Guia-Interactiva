// AccessibilityWidget.js
import React from 'react';
import { Button, Tooltip } from 'antd';
import {
  SoundOutlined,
  StopOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useSpeech } from '../Contexts/SpeechContext'; // Ajusta la ruta
import { useFont } from '../Contexts/FontContext';   // Ajusta la ruta
import './AccessibilityWidget.css'; // Estilos para el widget
import { useNavigate } from 'react-router-dom';

export const AccessibilityWidget = () => {
  const { speakText, isSpeaking, canSpeak } = useSpeech();
  const { increaseFontSize, decreaseFontSize } = useFont();
  const navigate = useNavigate();
  // Podrías añadir un estado para mostrar/ocultar el widget si se vuelve muy intrusivo
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accessibility-widget">
      {/* Podrías tener un botón principal para abrir/cerrar los controles */}
      {/* <Button className="widget-toggle-btn" icon={<AccessibilityIcon />} onClick={() => setIsOpen(!isOpen)} /> */}
      {/* {isOpen && ( */}
        <div className="widget-controls">
          {/* --- BOTÓN DE VOLVER AÑADIDO --- */}
        <Tooltip title="Volver Atrás" placement="left">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="widget-btn"
            aria-label="Volver Atrás"
          />
        </Tooltip>
          <Tooltip title={isSpeaking ? "Detener Lectura" : "Leer Contenido"} placement="left">
            <Button
              type="text"
              icon={isSpeaking ? <StopOutlined /> : <SoundOutlined />}
              onClick={speakText}
              disabled={!canSpeak}
              className={`widget-btn ${isSpeaking ? 'speaking' : ''}`}
              aria-label={isSpeaking ? "Detener Lectura" : "Leer Contenido"}
            />
          </Tooltip>
          <Tooltip title="Aumentar Texto" placement="left">
            <Button
              type="text"
              icon={<ZoomInOutlined />}
              onClick={increaseFontSize}
              className="widget-btn"
              aria-label="Aumentar Texto"
            />
          </Tooltip>
          <Tooltip title="Disminuir Texto" placement="left">
            <Button
              type="text"
              icon={<ZoomOutOutlined />}
              onClick={decreaseFontSize}
              className="widget-btn"
              aria-label="Disminuir Texto"
            />
          </Tooltip>
        </div>
      {/* )} */}
    </div>
  );
};