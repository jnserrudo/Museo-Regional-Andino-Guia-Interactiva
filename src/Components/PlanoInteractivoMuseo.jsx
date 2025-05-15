// PlanoInteractivoMuseo.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet"; // Importar Leaflet directamente para CRS y iconos
import "./PlanoInteractivoMuseo.css"; // Crearemos este archivo CSS
import { PushpinFilled } from "@ant-design/icons"; // <<<--- IMPORTA UN ICONO DE ANT DESIGN
// --- Configuración del Plano del Museo ---
// DEBES REEMPLAZAR ESTO CON LAS DIMENSIONES REALES DE TU IMAGEN DEL PLANO
const planoImageUrl = `${import.meta.env.BASE_URL}mapaMuseo.png`; // RUTA A TU IMAGEN DEL PLANO
const planoImageWidth = 2000; // Ancho en píxeles de tu imagen del plano
const planoImageHeight = 1500; // Alto en píxeles de tu imagen del plano

// Puntos de interés (POIs) - Coordenadas en el sistema de la imagen (Y, X) o (lat, lng) si son geográficas
// Para un plano, Y es la vertical (0 arriba), X es la horizontal (0 izquierda)
// Leaflet usa [lat, lng], así que para una imagen podemos mapear Y a "lat" y X a "lng"
// PERO es más fácil usar CRS.Simple y coordenadas de imagen directamente.
// Aquí usaremos un sistema donde [0,0] es la esquina superior izquierda de la imagen.
// Las coordenadas para los marcadores serán [Y, X] respecto a la imagen.
const puntosDeInteres = [
  {
    id: "entrada",
    nombre: "Entrada Principal",
    coords: [planoImageHeight * 0.85, planoImageWidth * 0.5],
    descripcion: "Acceso al museo y recepción.",
  },
  {
    id: "sala-geologia",
    nombre: "Sala de Geología",
    coords: [planoImageHeight * 0.6, planoImageWidth * 0.25],
    descripcion: "Descubre los secretos de la tierra.",
    link: "/salas/geologia",
  },
  {
    id: "sala-arqueologia",
    nombre: "Sala de Arqueología",
    coords: [planoImageHeight * 0.6, planoImageWidth * 0.75],
    descripcion: "Un viaje al pasado prehispánico.",
    link: "/salas/arqueologia",
  },
  {
    id: "sala-biodiversidad",
    nombre: "Sala de Biodiversidad",
    coords: [planoImageHeight * 0.4, planoImageWidth * 0.5],
    descripcion: "Descubre la diversidad de la vida en el mundo.",
    link: "/salas/biodiversidad",
  },
  {
    id: "sala-historia",
    nombre: "Sala de Historia",
    coords: [planoImageHeight * 0.2, planoImageWidth * 0.5],
    descripcion: "Descubre la historia del museo.",
    link: "/salas/historia",
  },
  {
    id: "sala-minerologia-y-mineria",
    nombre: "Sala de Minería y Minería",
    coords: [planoImageHeight * 0.2, planoImageWidth * 0.5],
    descripcion: "Descubre la minería y minería del museo.",
    link: "/salas/minerologia-y-mineria",
  },
  {
    id: "sala-san-antonio-hoy",
    nombre: "Sala de San Antonio Hoy",
    coords: [planoImageHeight * 0.2, planoImageWidth * 0.5],
    descripcion: "Descubre la historia de San Antonio Hoy.",
    link: "/salas/san-antonio-hoy",
  },
  {
    id: "sala-gobernacion-de-los-andes",
    nombre: "Sala de Gobernación de los Andes",
    coords: [planoImageHeight * 0.2, planoImageWidth * 0.5],
    descripcion: "Descubre la gobernación de los andes del museo.",
    link: "/salas/gobernacion-de-los-andes",
  },
  {
    id: "sala-ramal-c14",
    nombre: "Sala de Ramal C14",
    coords: [planoImageHeight * 0.2, planoImageWidth * 0.5],
    descripcion: "Descubre la historia del ramal C14 del museo.",
    link: "/salas/ramal-c14",
  },
  // Añade más puntos según tu plano
];

import ReactDOMServer from "react-dom/server"; // Para renderizar React a string para el icono
// --- NUEVA FORMA DE CREAR EL ICONO CON ANT DESIGN ---
const createAntDIcon = (poi) => {
  // Renderiza el componente de icono de AntD a una cadena HTML
  const iconHtml = ReactDOMServer.renderToString(
    // Puedes personalizar el icono aquí, color, etc.
    // Añadimos una clase para poder darle estilos específicos al contenedor del icono
    <div className="leaflet-antd-icon-wrapper">
      <PushpinFilled
        style={{
          fontSize: "28px", // Tamaño del icono
          color: "var(--color-accent-theart, #c8a07d)", // Color del icono
        }}
      />
    </div>
  );

  return new L.DivIcon({
    html: iconHtml,
    className: "custom-leaflet-div-icon", // Clase para el contenedor del DivIcon (útil para quitar estilos por defecto de Leaflet)
    iconSize: [30, 30], // Tamaño del área del icono (ajusta según tu icono y padding)
    iconAnchor: [15, 30], // Punto del icono que corresponde a la ubicación (abajo al centro)
    popupAnchor: [0, -32], // Punto desde donde el popup debe abrirse
  });
};

// Componente para ajustar la vista del mapa a la imagen
function FitBoundsToImage({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);
  return null;
}

// Configurar un icono personalizado (opcional, pero recomendado para el estilo)
const customIcon = new L.Icon({
  iconUrl: `${import.meta.env.BASE_URL}marcador-museo.svg`, // <<<--- CREA ESTE ICONO SVG
  iconRetinaUrl: `${import.meta.env.BASE_URL}marcador-museo.svg`,
  iconSize: [30, 42], // Tamaño del icono
  iconAnchor: [15, 42], // Punto del icono que corresponde a la ubicación del marcador
  popupAnchor: [0, -45], // Punto desde donde el popup debe abrirse relativo al iconAnchor
  shadowUrl: `${import.meta.env.BASE_URL}marcador-sombra.png`, // <<<--- OPCIONAL: Sombra para el marcador
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

export const PlanoInteractivoMuseo = () => {
  // Los límites de la imagen para Leaflet: [[Y_min, X_min], [Y_max, X_max]]
  // Con CRS.Simple, Y crece hacia abajo, X hacia la derecha.
  // [0,0] es arriba-izquierda. [alto, ancho] es abajo-derecha.
  const imageBounds = [
    [0, 0],
    [planoImageHeight, planoImageWidth],
  ];

  // Estado para la ubicación del usuario (si decides implementar geolocalización real)
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    //   // Lógica para obtener geolocalización del usuario (si es un mapa geográfico)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        console.warn("No se pudo obtener la geolocalización.");
      }
    );
  }, []);

  return (
    <div className="plano-museo-page-wrapper">
      {" "}
      {/* Wrapper para centrar/estilar página */}
      <h1 className="plano-museo-main-title">Mapa Interactivo del Museo</h1>
      <div className="plano-museo-container-leaflet">
        <MapContainer
          crs={L.CRS.Simple} // Sistema de Coordenadas Simple para imágenes (no geográfico)
          bounds={imageBounds} // Ajustar vista inicial a la imagen
          minZoom={-2} // Ajusta estos valores según el tamaño de tu imagen y el nivel de detalle deseado
          maxZoom={2}
          zoomSnap={0.25}
          style={{ height: "100%", width: "100%" }}
          attributionControl={false} // Ocultar atribución de Leaflet si es un plano interno
          // scrollWheelZoom={false} // Deshabilitar zoom con rueda si interfiere con scroll de página
        >
          <ImageOverlay
            url={planoImageUrl}
            bounds={imageBounds} // [[Y_superior, X_izquierdo], [Y_inferior, X_derecho]]
          />
          {/* Marcadores para Puntos de Interés */}
          {puntosDeInteres.map((poi) => (
            <Marker
              key={poi.id}
              position={poi.coords} // Leaflet espera [lat, lng], aquí es [Y, X]
              icon={createAntDIcon(poi)} // Usar el icono personalizado
              alt={poi.nombre}
            >
              <Popup>
                <div className="poi-popup-content">
                  <h4>{poi.nombre}</h4>
                  <p>{poi.descripcion}</p>
                  {poi.link && (
                    <a
                      href={poi.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Más información
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
          {/* Marcador para la ubicación del usuario (si se implementa geolocalización en mapa real) */}
          {userPosition && (
            <Marker position={userPosition} icon={someUserIcon}>
              <Popup>Estás aquí</Popup>
            </Marker>
          )}
          <FitBoundsToImage bounds={imageBounds} />{" "}
          {/* // Podría no ser necesario con CRS.Simple y bounds en MapContainer */}
        </MapContainer>
      </div>
      <p className="plano-museo-instructions">
        Usa el ratón para moverte y la rueda para hacer zoom. Haz clic en los
        marcadores para más información.
      </p>
    </div>
  );
};
