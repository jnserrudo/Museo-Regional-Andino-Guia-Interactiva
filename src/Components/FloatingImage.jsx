// FloatingImage.jsx
import React, { useState, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useSpring, a } from '@react-spring/three';
import { Html, useTexture } from '@react-three/drei';
import { FileJpgOutlined, FileImageOutlined, CalendarOutlined, HddOutlined } from '@ant-design/icons';

export const FloatingImage = ({ imgData, position, isFocused, isDimmed, onClick }) => {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const texture = useTexture(`${import.meta.env.BASE_URL}/volcanes/${imgData.nombreArchivo}`);

  // Calcular tamaño del plano basado en aspect ratio
  const imageAspect = texture.image ? texture.image.width / texture.image.height : 16 / 9;
  const baseWidth = 3; // Hacer imágenes un poco más grandes
  const planeWidth = isFocused ? baseWidth * 1.8 : baseWidth; // Más grande si está enfocado
  const planeHeight = planeWidth / imageAspect;

  // Animación para escala, opacidad y posición Z
  const { scale, opacity, zPos } = useSpring({
    // Aumenta el valor de escala cuando está enfocado (ej. de 2.0 a 2.8 o 3.0)
    scale: isFocused ? 3.0 : (isHovered ? 1.15 : 1),
    opacity: isDimmed ? 0.15 : 1, // Puedes atenuar más las otras imágenes
    zPos: isFocused ? 3 : 0, // Traer aún más al frente si es necesario
    config: { mass: 1, tension: 280, friction: 60 }
  });

  // Rotación para que siempre mire a la cámara (Billboard - Opcional, puede ser complejo)
  // useFrame(({ camera }) => {
  //   if (meshRef.current) {
  //     meshRef.current.lookAt(camera.position);
  //   }
  // });

  const handleClick = (e) => {
    e.stopPropagation(); // Evita que el click se propague a otros elementos
    onClick(imgData, position); // Llama a la función del padre para enfocar
  };

  return (
    <a.mesh
      ref={meshRef}
      position={position} // Posición base
      scale={scale} // Aplicar escala animada
      // Animar posición Z para traer al frente
      position-z={zPos.to(z => position[2] + z)} // Sumar zPos animado a la Z original
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); setIsHovered(true); }}
      onPointerOut={(e) => setIsHovered(false)}
    >
      {/* Usar ancho y alto calculados */}
      <planeGeometry args={[planeWidth, planeHeight]} />
      <a.meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent
        opacity={opacity} // Aplicar opacidad animada
        metalness={0.1} // Ligeros reflejos
        roughness={0.9}
      />

      {/* Panel HTML: ahora solo se muestra SI está enfocado */}
      <Html
         position={[planeWidth * 0.6, 0, 0.1]} // Posicionar al lado derecho de la imagen enfocada
         center
         distanceFactor={10}
         style={{
             transition: 'opacity 0.4s ease 0.2s', // Transición con retraso
             opacity: isFocused ? 1 : 0, // Solo visible si está enfocado
             pointerEvents: isFocused ? 'auto' : 'none' // Permitir eventos solo si está visible/enfocado
         }}
      >
        {/* El mismo panel de información */}
        <div className="volcano-info-panel detailed-view"> {/* Clase adicional */}
             <h4>{imgData.nombre.replace(/_/g, " ")}</h4>
             {/* <p>
                 {imgData.tipo.includes('JPG') ? <FileJpgOutlined /> : <FileImageOutlined />}
                 {imgData.tipo}
             </p>
             <p><HddOutlined /> {imgData.tamaño}</p>
             <p><CalendarOutlined /> {new Date(imgData.fecha).toLocaleDateString()}</p> */}
             {/* Podrías añadir más detalles aquí si los tuvieras */}
        </div>
      </Html>
    </a.mesh>
  );
};