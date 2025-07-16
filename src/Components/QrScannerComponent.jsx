// /src/components/QrScannerComponent.jsx (o donde corresponda)

import React from 'react';
import { useZxing } from 'react-zxing';

export const QrScannerComponent = ({ onScanSuccess, onScanError }) => {
  const { ref } = useZxing({
    onResult(result) {
      onScanSuccess(result.getText()); // Pasamos solo el texto, que es lo que nos importa
    },
    onError(error) {
      // Solo notifica errores reales de la cámara, no "código no encontrado"
      if (error && error.name !== 'NotFoundException') {
        onScanError(error);
      }
    },
    constraints: { video: { facingMode: 'environment' } },
  });

  return (
    <div className="qr-reader-container">
      <video ref={ref} className="qr-video-element" />
    </div>
  );
};