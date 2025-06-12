// src/components/ScrollToTop.jsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  // Extrae el "pathname" (la ruta, ej: "/salas/historia") del objeto de ubicación.
  const { pathname } = useLocation();

  // Este "useEffect" se ejecuta CADA VEZ que el "pathname" cambia.
  useEffect(() => {
    // Hace un scroll instantáneo a la posición (0, 0) de la ventana.
    window.scrollTo(0, 0);
  }, [pathname]); // El array de dependencias asegura que solo se ejecute al cambiar la ruta.

  // Este componente no renderiza nada en el HTML, solo ejecuta el efecto.
  return null;
};