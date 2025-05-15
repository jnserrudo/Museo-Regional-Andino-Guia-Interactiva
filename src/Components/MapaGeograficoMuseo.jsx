// MapaGeograficoMuseo.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { PushpinFilled, UserOutlined, EnvironmentFilled } from "@ant-design/icons"; // Icono para el usuario
import ReactDOMServer from "react-dom/server";
import "./MapaGeograficoMuseo.css"; // Crearemos este archivo CSS

// --- CONFIGURACIÓN ---
// !!! REEMPLAZA CON LAS COORDENADAS REALES DE TU MUSEO !!!
const MUSEO_LATITUD = -24.208577149244608; // San Antonio de los Cobres, Salta
const MUSEO_LONGITUD = -66.32009611960797; // San Antonio de los Cobres, Salta
const MUSEO_NOMBRE = "Museo Regional Andino";

// Puntos de interés (POIs) - AHORA CON COORDENADAS GEOGRÁFICAS REALES [lat, lng]
// !!! DEBES OBTENER LAS COORDENADAS LAT/LNG REALES PARA ESTOS PUNTOS SI QUIERES QUE SEAN PRECISOS !!!
const puntosDeInteres = [
  {
    id: "museo-principal",
    nombre: MUSEO_NOMBRE,
    coords: [MUSEO_LATITUD, MUSEO_LONGITUD],
    descripcion: "Visítanos y descubre la rica herencia andina.",
  },
  {
    id: "plaza-central",
    nombre: "Plaza Central (Ejemplo)",
    coords: [-24.217, -66.3175],
    descripcion: "Corazón de la ciudad, cerca del museo.",
    link: "#",
  },
  {
    id: "viaducto-polvorilla",
    nombre: "Viaducto La Polvorilla (Ejemplo Cercano)",
    coords: [-24.2034, -66.4],
    descripcion: "Impresionante obra de ingeniería ferroviaria.",
    link: "#",
  },
  // Añade más puntos con sus coordenadas lat/lng reales
];

// Icono para Puntos de Interés (MÁS GRANDE Y DESTACADO)
const createPoiIcon = (poi) => {
  const iconHtml = ReactDOMServer.renderToString(
    <div className="leaflet-antd-icon-wrapper poi-icon-wrapper">
      {" "}
      {/* Clase específica */}
      <EnvironmentFilled // O PushpinFilled, o un icono temático si tienes
        style={{
          fontSize: "38px", // <<<--- MÁS GRANDE
          color:
            poi.id === "museo-principal"
              ? "var(--color-primary-sala, #8B4513)"
              : "var(--color-accent-theart, #c8a07d)", // Color diferente para el museo principal
          filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.3))", // Sombra para destacar
        }}
      />
    </div>
  );
  return new L.DivIcon({
    html: iconHtml,
    className: "custom-leaflet-div-icon poi-marker", // Clase específica para POI
    iconSize: [40, 40], // <<<--- TAMAÑO DEL ÁREA DEL ICONO MÁS GRANDE (debe contener el icono AntD)
    iconAnchor: [20, 38], // <<<--- AJUSTAR ANCLA (punta inferior central del icono AntD más grande)
    popupAnchor: [0, -40], // <<<--- AJUSTAR POPUP ANCHOR
  });
};

// Icono para la Ubicación del Usuario (MÁS PEQUEÑO Y SIMPLE)
const createUserIcon = () => {
  const iconHtml = ReactDOMServer.renderToString(
    <div className="leaflet-antd-icon-wrapper user-icon-wrapper">
      {" "}
      {/* Clase específica */}
      {/* Un círculo simple o un icono más pequeño */}
      <div className="user-location-dot"></div>
      {/* O si prefieres un icono de AntD más pequeño:
        <UserOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
        */}
    </div>
  );
  return new L.DivIcon({
    html: iconHtml,
    className: "custom-leaflet-div-icon user-marker",
    iconSize: [24, 24], // <<<--- TAMAÑO DEL ÁREA DEL ICONO MÁS PEQUEÑO
    iconAnchor: [12, 12], // <<<--- CENTRADO para un círculo
    popupAnchor: [0, -15], // <<<--- AJUSTAR POPUP ANCHOR
  });
};

// Componente para centrar el mapa en una posición
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);
  return null;
}

// Función para calcular distancia (haversine o aproximación simple si es local)
function getDistance(lat1, lon1, lat2, lon2) {
  // en metros
  const R = 6371e3; // Radio de la Tierra en metros
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const UMBRAL_SUPERPOSICION = 20; // Metros

export const MapaGeograficoMuseo = () => {
  const [userPosition, setUserPosition] = useState(null); // [lat, lng]
  const [mapCenter, setMapCenter] = useState([MUSEO_LATITUD, MUSEO_LONGITUD]); // Inicia centrado en el museo
  const [mapZoom, setMapZoom] = useState(15); // Zoom inicial
  const [showPermissionsMessage, setShowPermissionsMessage] = useState(false);
  const [usuarioCercaDelMuseo, setUsuarioCercaDelMuseo] = useState(false); // Para la lógica de superposición
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocalización no es soportada por este navegador.");
      setShowPermissionsMessage(true); // Mostrar mensaje si NO hay soporte
      return;
    }

    // IMPORTANTE: Inicialmente podrías querer mostrar un mensaje de "Buscando ubicación..."
    // y solo mostrar el mensaje de error/permiso si falla.
    // Por ahora, lo mantenemos simple. Si el navegador pregunta, asumimos que está "intentando".
    // setShowPermissionsMessage(false); // Asegurar que no se muestre si empezamos a buscar

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
        setMapCenter([latitude, longitude]);
        setMapZoom(16);
        setShowPermissionsMessage(false);

        // Comprobar si el usuario está cerca del museo
        const distancia = getDistance(
          latitude,
          longitude,
          MUSEO_LATITUD,
          MUSEO_LONGITUD
        );
        if (distancia < UMBRAL_SUPERPOSICION) {
          setUsuarioCercaDelMuseo(true);
        } else {
          setUsuarioCercaDelMuseo(false);
        }
      },
      (error) => {
        console.warn(`Error obteniendo geolocalización: ${error.message}`);
        setMapCenter([MUSEO_LATITUD, MUSEO_LONGITUD]);
        setMapZoom(15);
        setShowPermissionsMessage(true); // Mostrar mensaje si hay error o no se concedió permiso
        setUsuarioCercaDelMuseo(false); // Asegurar que sea false si hay error
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <div className="mapa-geo-page-wrapper">
      <h1 className="mapa-geo-main-title">
        Explora el Museo y sus Alrededores
      </h1>
      {/* Condición actualizada: Mostrar solo si showPermissionsMessage es true Y AÚN NO tenemos userPosition */}
      {showPermissionsMessage && !userPosition && (
        <p className="mapa-geo-permissions-message">
          La geolocalización no está disponible o no se concedieron permisos.
          Mostrando ubicación del museo.
        </p>
      )}
      <div className="mapa-geo-container-leaflet">
        <MapContainer
          center={mapCenter} // Centro dinámico
          zoom={mapZoom} // Zoom dinámico
          style={{ height: "100%", width: "100%" }}
          // scrollWheelZoom={true} // Habilitar si se desea
        >
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marcador del Museo */}
          <Marker
            position={[MUSEO_LATITUD, MUSEO_LONGITUD]}
            icon={createPoiIcon({ id: "museo-principal", nombre: MUSEO_NOMBRE })}
          >
            <Popup>
              <div className="poi-popup-content">
                <h4>{MUSEO_NOMBRE}</h4>
                <p>Nuestra ubicación principal. ¡Te esperamos!</p>
              </div>
            </Popup>
          </Marker>

          {/* Marcadores para otros Puntos de Interés */}
          {puntosDeInteres
            .filter((poi) => poi.id !== "museo-principal")
            .map(
              (
                poi // No duplicar el marcador del museo
              ) => (
                <Marker
                  key={poi.id}
                  position={poi.coords}
                  icon={createPoiIcon(poi)}
                >
                  <Popup>
                    <div className="poi-popup-content">
                      <h4>{poi.nombre}</h4>
                      <p>{poi.descripcion}</p>
                      {poi.link && (
                        <Link to={poi.link} className="poi-popup-link">
                          Más información
                        </Link>
                      )}
                    </div>
                  </Popup>
                </Marker>
              )
            )}

           {/* Marcador para la ubicación del usuario */}
           {userPosition && (
            <Marker position={userPosition} icon={createUserIcon()} /* zIndexOffset={1000} */> {/* Mayor zIndex para el usuario por defecto */}
              <Popup>
                <div className="poi-popup-content">
                  <h4>Tu Ubicación</h4>
                  <p>Estás aquí (aproximadamente).</p>
                  {usuarioCercaDelMuseo && ( // Si el usuario está MUY cerca del museo, el popup del museo podría no ser clickeable.
                    <div style={{ marginTop: '10px', borderTop: '1px solid #555', paddingTop: '10px' }}>
                      <p>También te encuentras en:</p>
                      <Link to={`/salas/DETALLE_DEL_MUSEO_SI_HAY_LINK`} className="poi-popup-link">
                        <strong>{MUSEO_NOMBRE}</strong>
                      </Link>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          )}
          <ChangeView center={mapCenter} zoom={mapZoom} />
        </MapContainer>
      </div>
      <p className="mapa-geo-instructions">
        Usa el ratón para moverte y la rueda para hacer zoom. Haz clic en los
        marcadores para más información.
      </p>
    </div>
  );
};
