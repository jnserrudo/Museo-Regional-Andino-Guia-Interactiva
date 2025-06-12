// Footer.js
import React from 'react';
import { Layout, Button, Tooltip } from 'antd'; // Mantenemos Ant Design
import {
  HomeOutlined,
  CalendarOutlined,
  SoundOutlined,
  StopOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  AppstoreOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useSpeech } from '../Contexts/SpeechContext';
import { useFont } from '../Contexts/FontContext';
import '../Footer.css'; // Asegúrate que este es el Footer.css con los estilos de "Theart"

// Iconos SVG simples para redes sociales (o usa react-icons si prefieres)
const InstagramIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"></path></svg>;
const TwitterIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.48 2.96,10.28 2.38,9.95C2.38,9.97 2.38,9.99 2.38,10.02C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.11,7.63 21.85,6.87 22.46,6Z"></path></svg>;
const FacebookIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.81C10.44 7.31 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"></path></svg>;


// No usamos AntFooter directamente, sino un tag <footer> semántico
// const AntFooter = Layout.Footer;

export const Footer = () => {
  const { speakText, isSpeaking, canSpeak } = useSpeech();
  const { increaseFontSize, decreaseFontSize } = useFont();
  const location = useLocation();

  if (location.pathname === '/puzzle') {
      return null;
  }

  return (
    // Usamos la clase principal del footer de Theart
    <footer className="theart-main-footer">
      <div className="theart-footer-container"> {/* Contenedor interno para centrar y limitar ancho */}
        <div className="theart-footer-content"> {/* Grid de columnas */}

          {/* Columna 1: Logo/Descripción */}
          <div className="theart-footer-column">
            <h4 className="theart-footer-logo"> {/* Usa tu logo o nombre del museo */}
              MUSEO<br />REGIONAL ANDINO
            </h4>
            <p>
              Descubre la riqueza cultural de San Antonio de los Cobres y la Puna Salteña.
              Un viaje a través de la historia y las tradiciones.
            </p>
          </div>

          {/* Columna 2: Links de Navegación (Tus botones de acción) */}
          <div className="theart-footer-column">
            <h4>Navegación y Herramientas</h4>
            {/* Aquí integramos tus botones de funcionalidad como si fueran links */}
            <ul className="theart-footer-tool-list"> {/* Lista para herramientas */}
              <li>
                <Tooltip title="Inicio">
                  <Link to="/" className="theart-footer-action-link"> {/* Clase para estilizar como link */}
                    <Button type="text" icon={<HomeOutlined style={{ color: 'white' }} />} className="footer-btn-theart-style" /> Inicio
                  </Link>
                </Tooltip>
              </li>
              {/* <li>
                <Tooltip title="Eventos (Próximamente)">
                  <Link to="/eventos" className="theart-footer-action-link">
                    <Button type="text" icon={<CalendarOutlined style={{ color: 'white' }} />} disabled className="footer-btn-theart-style" /> Eventos
                  </Link>
                </Tooltip>
              </li> */}
              <li>
                <Tooltip title="Rompecabezas">
                  <Link to="/puzzle" className="theart-footer-action-link">
                    <Button type="text" icon={<AppstoreOutlined style={{ color: 'white' }} />} className="footer-btn-theart-style" /> Rompecabezas
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Mapa del Museo">
                  <Link to="/mapa" className="theart-footer-action-link">
                    <Button type="text" icon={<GlobalOutlined style={{ color: 'white' }} />} className="footer-btn-theart-style" /> Mapa del Museo
                  </Link>
                </Tooltip>
              </li>
            </ul>
          </div>


          {/* Columna 3: Herramientas de Accesibilidad y Redes Sociales */}
          <div className="theart-footer-column">
            <h4>Accesibilidad</h4> {/* Título específico para esta sección */}
            <div className="theart-accessibility-controls-group"> {/* Nuevo contenedor */}
              <Tooltip title={isSpeaking ? "Detener Lectura" : "Leer Contenido en Voz Alta"}>
                <Button
                  type="text"
                  icon={isSpeaking ? <StopOutlined /> : <SoundOutlined />}
                  onClick={speakText}
                  disabled={!canSpeak}
                  className={`footer-btn-theart-style accessibility-btn ${isSpeaking ? 'speaking' : ''}`} // Clase adicional
                  aria-label={isSpeaking ? "Detener Lectura" : "Leer Contenido en Voz Alta"}
                />
              </Tooltip>
              <Tooltip title="Aumentar Tamaño de Texto">
                <Button
                  type="text"
                  icon={<ZoomInOutlined style={{ color: 'white' }} />}
                  onClick={increaseFontSize}
                  className="footer-btn-theart-style accessibility-btn" // Clase adicional
                  aria-label="Aumentar Tamaño de Texto"
                />
              </Tooltip>
              <Tooltip title="Disminuir Tamaño de Texto">
                <Button
                  type="text"
                  icon={<ZoomOutOutlined style={{ color: 'white' }} />  }
                  onClick={decreaseFontSize}
                  className="footer-btn-theart-style accessibility-btn" // Clase adicional
                  aria-label="Disminuir Tamaño de Texto"
                />
              </Tooltip>
            </div>

            <h4 style={{ marginTop: '20px' }}>Síguenos</h4> {/* Separación para las redes */}
            <div className="theart-social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
              {/* ... otros iconos sociales ... */}
            </div>
          </div>

          {/* Columna 4: Oficina/Contacto */}
          <div className="theart-footer-column">
            <h4>Contacto</h4>
            <p>
              {/* Dirección Ficticia 123<br /> */}
              San Antonio de los Cobres, Salta, Argentina
            </p>
            {/* <p>Email: info@museoandino.com</p>
            <p>Tel: +54 9 387 123 4567</p> */}
          </div>

        </div>

        <div className="theart-footer-bottom"> {/* Copyright */}
          <p>© {new Date().getFullYear()} Museo Regional Andino. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};