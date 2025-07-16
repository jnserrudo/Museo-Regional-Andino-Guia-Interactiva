// /src/components/QrScannerComponent.jsx

import React, { useEffect } from 'react';
import { useZxing } from 'react-zxing';

export const QrScannerComponent = ({ onScanSuccess, onScanError, onStatusChange }) => {
  const { ref } = useZxing({
    onResult(result) {
      // INFORMA ÉXITO
      onStatusChange('¡Éxito! Código encontrado.');
      onScanSuccess(result.getText());
    },
    onError(error) {
      // Si el error es "NotFoundException", significa que la cámara está buscando activamente.
      // Esto es una BUENA señal.
      if (error && error.name === 'NotFoundException') {
        onStatusChange('Escaneando activamente...');
      } 
      // Si es cualquier otro error, es un problema real.
      else if (error) {
        onStatusChange(`Error crítico: ${error.name}`);
        onScanError(error);
      }
    },
    constraints: { video: true }, // Usamos 'true' para máxima compatibilidad
  });

  // Este efecto nos dirá si el video se ha renderizado
  useEffect(() => {
    if (ref.current) {
      onStatusChange('Elemento de video montado en la pantalla.');
    }
  }, [ref, onStatusChange]);

  // Informa que el componente está intentando inicializarse
  useEffect(() => {
    onStatusChange('Inicializando escáner...');
  }, [onStatusChange]);

  return (
    <div className="qr-reader-container">
      <video ref={ref} className="qr-video-element" />
    </div>
  );
};