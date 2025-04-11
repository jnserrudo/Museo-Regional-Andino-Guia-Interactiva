// FontContext.jsx (CORREGIDO)
import React, { createContext, useState, useContext, useCallback } from 'react';

const FontContext = createContext();

// Clases CSS: El primer elemento (tamaño normal) AHORA es null o undefined para simplificar
// O mantenemos '' pero lo manejamos en la lógica. Vamos a mantener '' y manejarlo.
const fontClasses = ['', 'font-size-large', 'font-size-xlarge', 'font-size-small'];
const defaultFontIndex = 0; // Índice para tamaño normal (clase '')

export const FontProvider = ({ children }) => {
  // Estado para el índice actual
  const [fontIndex, setFontIndex] = useState(defaultFontIndex);

  // Función centralizada para actualizar la clase en el body
  const applyFontSizeClass = useCallback((currentIndex, newIndex) => {
    const oldClassName = fontClasses[currentIndex];
    const newClassName = fontClasses[newIndex];

    // Quitar la clase anterior SÓLO si existía (no era '')
    if (oldClassName) {
      document.body.classList.remove(oldClassName);
      // console.log('Removed class:', oldClassName); // Para depurar
    }

    // Añadir la nueva clase SÓLO si existe (no es '')
    if (newClassName) {
      document.body.classList.add(newClassName);
      // console.log('Added class:', newClassName); // Para depurar
    }
  }, []); // No necesita dependencias externas

  // Función para cambiar el índice y aplicar la clase
  const changeFontIndex = (newIndex) => {
    // Asegura que el nuevo índice esté dentro de los límites
    const normalizedIndex = Math.max(0, Math.min(newIndex, fontClasses.length - 1));

    // Si el índice realmente cambió
    if (normalizedIndex !== fontIndex) {
      applyFontSizeClass(fontIndex, normalizedIndex); // Aplica el cambio de clases
      setFontIndex(normalizedIndex); // Actualiza el estado
    }
  };

  const increaseFontSize = () => {
      // Va al siguiente índice, sin pasarse del final
      changeFontIndex(Math.min(fontIndex + 1, fontClasses.length - 1));
  };

  const decreaseFontSize = () => {
      // Va al índice anterior, sin pasarse del inicio (índice 0)
      changeFontIndex(Math.max(fontIndex - 1, 0));
  };

  // --- Eliminamos el useEffect que causaba el problema inicial ---
  // Ya no es necesario aplicar la clase al montar aquí,
  // porque el estado inicial (índice 0) corresponde a no tener clase (o clase '').
  // Las clases se aplicarán sólo cuando se llame a increase/decrease.

  return (
    <FontContext.Provider value={{ increaseFontSize, decreaseFontSize, currentFontClass: fontClasses[fontIndex] }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => useContext(FontContext);