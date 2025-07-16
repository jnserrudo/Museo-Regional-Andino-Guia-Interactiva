// /src/components/QrScannerComponent.jsx

import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

export const QrScannerComponent = ({
  onScanSuccess,
  onScanError,
  onStatusChange,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let reader = new BrowserMultiFormatReader();
    let isMounted = true; // Variable para controlar si el componente sigue montado

    const startScanner = async () => {
      // Si el componente ya se desmontó, no hacemos nada.
      if (!videoRef.current || !isMounted) return;

      onStatusChange("Iniciando escáner...");

      try {
        onStatusChange("Intentando cámara trasera...");
        await reader.decodeFromConstraints(
          { video: { facingMode: "environment" } },
          videoRef.current,
          (result, error) => {
            if (!isMounted) return; // No hacer nada si ya se desmontó
            if (result) onScanSuccess(result.getText());
            if (error && error.name !== "NotFoundException") onScanError(error);
          }
        );
      } catch (error) {
        onStatusChange("Cámara trasera falló, probando cualquier cámara...");
        try {
          await reader.decodeFromConstraints(
            { video: true },
            videoRef.current,
            (result, error) => {
              if (!isMounted) return;
              if (result) onScanSuccess(result.getText());
              if (error && error.name !== "NotFoundException")
                onScanError(error);
            }
          );
        } catch (finalError) {
          if (!isMounted) return;
          onStatusChange("Error final: No se pudo iniciar ninguna cámara.");
          onScanError(finalError);
        }
      }
    };

    startScanner();

    // La función de limpieza se asegura de apagar la cámara.
    return () => {
      isMounted = false;
      onStatusChange("Componente desmontado, deteniendo escáner.");
      reader.reset();
    };
    // Incluimos las dependencias memorizadas.
  }, [onScanSuccess, onScanError, onStatusChange]);

  return (
    <div className="qr-reader-container">
      <video ref={videoRef} className="qr-video-element" />
    </div>
  );
};
