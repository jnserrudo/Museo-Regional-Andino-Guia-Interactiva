// /src/components/QrScannerComponent.jsx

import React, { useState, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

// Este componente ahora es más "inteligente"
export const QrScannerComponent = ({ onScanSuccess, onScanError, onStatusChange }) => {
  // 1. Guardaremos el elemento <video> en el estado.
  const [videoElement, setVideoElement] = useState(null);

  // 2. El callback ref que asignará el nodo del video a nuestro estado.
  const videoRef = (node) => {
    if (node) {
      setVideoElement(node);
      onStatusChange('Elemento de video asignado.');
    }
  };

  // 3. Este useEffect es la clave. Se ejecutará SOLO cuando 'videoElement' tenga un valor.
  useEffect(() => {
    // Si no hay elemento de video, no hacemos nada.
    if (!videoElement) {
      return;
    }

    onStatusChange('Iniciando decodificador...');
    
    const reader = new BrowserMultiFormatReader();
    
    // Opciones para intentar usar la cámara trasera
    const constraints = {
      video: {
        facingMode: 'environment' // Prioriza la cámara trasera
      }
    };

    // Intentamos iniciar el escáner con la cámara trasera
    reader.decodeFromConstraints(constraints, videoElement, (result, error) => {
        if (result) {
            onStatusChange('¡Éxito! Código encontrado.');
            onScanSuccess(result.getText());
            // Detenemos el escáner después de encontrar un resultado
            reader.reset();
        }

        if (error) {
            // "NotFoundException" es normal, significa que está buscando.
            if (error.name === 'NotFoundException') {
                onStatusChange('Escaneando activamente...');
            } 
            // Si el error es "NotAllowedError" o "NotFoundError", lo notificamos.
            else if (error.name === "NotAllowedError" || error.name === "NotFoundError") {
                onStatusChange(`Error de cámara: ${error.name}`);
                onScanError(error);
                reader.reset();
            }
        }
    }).catch(err => {
        // Este catch maneja el caso en que la cámara trasera no esté disponible
        // y el navegador no pueda iniciar el stream.
        onStatusChange(`Error al iniciar stream: ${err.name}`);
        onScanError(err);
    });

    // Función de limpieza: se ejecuta cuando el componente se desmonta.
    // Esto es crucial para apagar la cámara.
    return () => {
      onStatusChange('Deteniendo decodificador...');
      reader.reset();
    };

  }, [videoElement, onScanSuccess, onScanError, onStatusChange]); // Dependencias del efecto

  return (
    <div className="qr-reader-container">
      {/* Usamos el callback ref en lugar de la ref directa */}
      <video ref={videoRef} className="qr-video-element" />
    </div>
  );
};