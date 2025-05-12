// VolcanoExplorer3D.jsx
import React, { Suspense, useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, CameraControls, Html } from '@react-three/drei'; // Necesitamos CameraControls para animar foco
import { FloatingImage } from './FloatingImage';
import * as THREE from 'three'; // Necesario para Vector3, etc.

// ... (función calculatePositions como antes) ...
const calculatePositions = (count, radius) => {
    const positions = [];
    const phi = Math.PI * (3. - Math.sqrt(5.)); // Golden angle
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      // Añadir una pequeña variación aleatoria para menos uniformidad
      const randFactor = 0.1;
      const rX = (Math.random() - 0.5) * randFactor * radius;
      const rY = (Math.random() - 0.5) * randFactor * radius;
      const rZ = (Math.random() - 0.5) * randFactor * radius;
      positions.push([x * radius + rX, y * radius + rY, z * radius + rZ]);
    }
    return positions;
  };


export const VolcanoExplorer3D = ({ images }) => {
  const [focusedImage, setFocusedImage] = useState(null); // Estado para la imagen enfocada
  const controlsRef = useRef(); // Ref para CameraControls
  const positions = useMemo(() => calculatePositions(images.length, 7), [images.length]); // Aumentar radio

  // VolcanoExplorer3D.jsx

  const handleImageClick = (imgData, meshPosition) => {
    setFocusedImage(imgData);
    if (controlsRef.current) {
      const targetPosition = new THREE.Vector3().fromArray(meshPosition);
      // Reducir la distancia Z al añadir el vector (ej. de 3 a 1.8 o 2.0)
      // Este valor depende de la escala aplicada y el tamaño del plano
      const cameraDistanceFactor = 1.8;
      const cameraTargetPosition = targetPosition.clone().add(new THREE.Vector3(0, 0, cameraDistanceFactor));

      controlsRef.current.setLookAt(
          cameraTargetPosition.x, cameraTargetPosition.y, cameraTargetPosition.z,
          targetPosition.x, targetPosition.y, targetPosition.z,
          true
      );
      controlsRef.current.enabled = false;
    }
  };

  const handleCloseFocus = () => {
    setFocusedImage(null);
    // Animar cámara de vuelta a una posición general
    if (controlsRef.current) {
       // Volver a la posición inicial o una vista general
       controlsRef.current.reset(true); // Resetea a la posición inicial con transición
       // Habilitar controles orbitales de nuevo
       controlsRef.current.enabled = true;
    }
  };

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 40 }}> {/* Alejar cámara inicial y reducir FOV para que se distribuyan mejor */}
      <ambientLight intensity={0.7} />
      <pointLight position={[15, 15, 15]} intensity={0.9} />
      {/* <Stars radius={150} depth={60} count={6000} factor={5} saturation={0} fade speed={0.5} /> */}

      <Suspense fallback={null}>
        {images.map((imgData, index) => (
          <FloatingImage
            key={imgData.nombreArchivo}
            imgData={imgData}
            position={positions[index]}
            isFocused={focusedImage?.nombreArchivo === imgData.nombreArchivo}
            isDimmed={focusedImage !== null && focusedImage?.nombreArchivo !== imgData.nombreArchivo} // Está alguna imagen enfocada Y no es esta?
            onClick={handleImageClick}
          />
        ))}
      </Suspense>

      {/* Usar CameraControls para mejor control de animación */}
      <CameraControls ref={controlsRef} minDistance={5} maxDistance={30} truckSpeed={0} />
      {/* OrbitControls es más simple si no necesitas animación compleja */}
      {/* <OrbitControls enablePan={false} enableZoom={true} minDistance={5} maxDistance={25} /> */}

      {/* Botón HTML para cerrar la vista enfocada */}
      {focusedImage && (
        <Html>
          <button onClick={handleCloseFocus} className="close-focus-button">
            Volver a Explorar
          </button>
        </Html>
      )}
    </Canvas>
  );
};