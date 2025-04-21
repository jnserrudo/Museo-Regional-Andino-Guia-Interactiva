// FontContext.jsx (CORREGIDO)
import React, { createContext, useState, useContext, useCallback } from 'react';

const FontContext = createContext();




// *** NUEVO ORDEN LÓGICO ***
const fontClasses = [
  'font-size-small',  // Índice 0: Pequeño
  '',                 // Índice 1: Normal (sin clase específica)
  'font-size-large',  // Índice 2: Grande
  'font-size-xlarge'  // Índice 3: Extra Grande
];
// *** NUEVO ÍNDICE INICIAL ***
// El estado inicial ahora es el índice de la clase normal ('')
const defaultFontIndex = 1;

export const FontProvider = ({ children }) => {
  // Estado para el índice actual
  const [fontIndex, setFontIndex] = useState(defaultFontIndex);

  // Función centralizada para actualizar la clase en el body
  const applyFontSizeClass = useCallback((currentIndex, newIndex) => {
    const oldClassName = fontClasses[currentIndex];
    const newClassName = fontClasses[newIndex];
    const targetElement = document.body; // Aplicamos a body

    // Quitar la clase anterior SÓLO si existía (no era '')
    if (oldClassName) {
      targetElement.classList.remove(oldClassName);
      // console.log('Removed class:', oldClassName);
    }

    // Añadir la nueva clase SÓLO si existe (no es '')
    if (newClassName) {
      targetElement.classList.add(newClassName);
      // console.log('Added class:', newClassName);
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