import React, { useState } from "react";
import "./MapaVolcanes.css"; // Importa el archivo CSS
// Al principio de MapaVolcanes.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Datos de los volcanes con coordenadas estimadas
// En MapaVolcanes.jsx
// En MapaVolcanes.jsx
import ReactDOM from 'react-dom';
const volcanoesData = [
  {
    id: "aracar",
    name: "Aracar",
    top: "32%",
    left: "33%",
    info: {
      location: `24°17'17.89"S / 67°47'26.33"O`,
      elevation: "6.095 m s.n.m.",
      type: "Estratovolcán",
      description:
        "Aracar significa “lugar de huesos”. Este gran volcán domina el paisaje con sus laderas de basalto gris. En 1993 se vio una columna de vapor y ceniza. ⚠️ La ladera noroeste no ha sido explorada por posible presencia de campos minados.",
      images: [
        "/volcanes/Volcan_Aracar.jpg",
      ],
    },
  },
  {
    id: "socompa",
    name: "Socompa",
    top: "36%",
    left: "14%",
    info: {
      location: `24°23′46″S / 68°14′46″O`,
      elevation: "6.051 m s.n.m.",
      type: "Estratovolcán",
      description:
        "Su nombre puede significar “tierra que se estremece”. Tuvo una erupción pliniana hace 72.000 años, dejando una enorme avalancha visible hoy.",
      images: ['/volcanes/Volcan_Socompa.jpg'],
    },
  },
  {
    id: "llullaillaco",
    name: "Llullaillaco",
    top: "60%",
    left: "10%",
    info: {
      location: `24°43′11″S / 68°32′13″O`,
      elevation: "6.739 m s.n.m.",
      type: "Estratovolcán",
      description:
        'Significa “agua engañosa”. Es el segundo volcán activo más alto del mundo. En su cima se encuentra el sitio arqueológico más alto del planeta, donde se hallaron los "Niños del Llullaillaco".',
      images: [
        /* "/volcan_llullaillaco.png", */
        "/volcanes/Volcan_llullaillaco_cara_oeste_christian_vitry_3.jpg",
        "/volcanes/Volcan_llullaillaco_christian_vitry_23-vista_sur.jpg",
      ],
    },
  },
  {
    id: "lastarria",
    name: "Lastarria",
    top: "80%",
    left: "15%",
    info: {
      location: `25°10'9.35"S / 68°29'58.10"O`,
      elevation: "5.700 m s.n.m.",
      type: "Volcán poligénico",
      description:
        "Su última gran erupción fue hace 2.400 años, pero se mantiene activo con fuerte actividad fumarólica, siendo un gran emisor de gases volcánicos en los Andes.",
      images: ["/volcanes/Volcan_Lastarria.jpg"],
    },
  },
  { 
    id: "archibarca",
    name: "Archibarca",
    top: "85%",
    left: "30%",
    info: {
      location: `25°11'59.86"S / 67°55'29.98"O`,
      elevation: "5.629 m s.n.m.",
      type: "Estratovolcán",
      description:
        "Volcán inactivo cuya última erupción fue hace 11 millones de años. En su cumbre se identificó un sitio ritual incaico.",
      images: ["/volcanes/Cerro_archibarca.jpg"],
    },
  },
  {
    id: "ratones",
    name: "Ratones",
    top: "90%",
    left: "55%",
    info: {
      location: `25°14'51.75"S / 66°53'10.45"O`,
      elevation: "4.955 m s.n.m.",
      type: "Estratovolcán",
      description:
        "Antigua estructura volcánica inactiva. No se conoce el origen de su nombre ni usos culturales específicos, pero su geología permite estudiarlo en el contexto regional.",
      images: ["/volcanes/volcan_ratones.jpg",
        "/volcanes/Volcan_Ratones_panoramio.jpg",
      ],
    },
  },
  {
    id: "quevar",
    name: "Quevar",
    top: "32%",
    left: "70%",
    info: {
      location: `24°18'42.78"S / 66°43'48.20"O`,
      elevation: "6.130 m s.n.m.",
      type: "Estratovolcán",
      description:
        'Su nombre podría provenir de los "quehuare", un grupo reconocido como “Incas por privilegio”. Su deshielo abastece de agua a la región y en su cima se encontraron estructuras ceremoniales.',
      images: ["/volcanes/volcan-quevar.jpg"],
    },
  },
  {
    id: "pocitos",
    name: "Pocitos",
    top: "30%",
    left: "60%",
    info: {
      location: `24°15'57.20"S / 66°59'05.66"O`,
      elevation: "5.383 m s.n.m.",
      type: "Estratovolcán",
      description:
        "Gran estructura andesítica cuya lava ha interactuado con los flujos del cercano volcán Del Medio.",
      images: ["/volcanes/Volcan_Pocitos.jpg"],
    },
  },
  {
    id: "del-medio",
    name: "Del Medio",
    top: "24%",
    left: "57%",
    info: {
      location: `24°13'54.35"S / 67°02'50.19"O`,
      elevation: "5.020 m s.n.m.",
      type: "Estratovolcán",
      description:
        "También conocido como cerro Talismán, presenta evidencias de un colapso en su flanco sur y una caldera en la cima.",
      images: [],
    },
  },
  {
    id: "san-geronimo",
    name: "San Gerónimo",
    top: "23%",
    left: "82%",
    info: {
      location: `24°13'42.58"S / 66°29'54.64"O`,
      elevation: "4.950 m s.n.m.",
      type: "Cono de escoria",
      description:
        "Antiguo cono formado por una única erupción de tipo estromboliano. Un ejemplo valioso del volcanismo monogenético del Altiplano-Puna.",
      images: ["/volcanes/volcan-geronimo.jpg"],
    },
  },
  {
    id: "tuzgle",
    name: "Tuzgle",
    top: "12%",
    left: "78%",
    info: {
      location: `24°03′26.81″S / 66°28′53.99″O`,
      elevation: "5.486 m s.n.m.",
      type: "Estratovolcán",
      description:
        "Destaca por sus fuentes termales y una antigua mina de azufre, y ha sido estudiado por su alto potencial geotérmico.",
      images: ["/volcanes/Volcan_Tuzgle_Puna.jpg"],
    },
  },
  {
    id: "chimpa",
    name: "Chimpa",
    top: "10%",
    left: "93%",
    info: {
      location: `24°01'28.30"S / 66°06'19.42"O`,
      elevation: "4.800 m s.n.m.",
      type: "Estratovolcán",
      description:
        "Su nombre significa “cruce de río” en quechua. Una serie de colapsos sectoriales modelaron el paisaje, dando origen al Valle de Casan.",
      images: [],
    },
  },
  {
    id: "arizaro",
    name: "Arizaro",
    top: "38%",
    left: "27%",
    info: {
      location: `24°25'10.40"S / 67°59'5.59"O`,
      elevation: "5.754 m s.n.m.",
      type: "Estratovolcán",
      description:
        "Su nombre kunza significa “dormidero del buitre”. Destaca como un sitio arqueológico de altura, lo que sugiere que fue parte de caminos o rituales andinos.",
      images: [],
    },
  },
  {
    id: "negro-de-chorrillos",
    name: "Negro de Chorrillos",
    top: "30%",
    left: "84%",
    info: {
      elevation: "5,020 m",
      type: "Volcán",
      description:
        "Un cono volcánico oscuro, parte de un campo volcánico más amplio.",
      images: [],
    },
  },
  {
    id: "tultul",
    name: "Tultul",
    top: "24%",
    left: "55%",
    info: {
      elevation: "5,200 m",
      type: "Volcán",
      description:
        "Volcán de menor altura en la zona, parte de un grupo de conos.",
      images: [],
    },
  },
];

// Componente de la ventana emergente para el volcán

const VolcanoPopup = ({ volcano, onClose }) => {
    if (!volcano) return null;

    const hasImages = volcano.info.images && volcano.info.images.length > 0;
    const hasMultipleImages = hasImages && volcano.info.images.length > 1;

    // Usamos ReactDOM.createPortal para renderizar el pop-up fuera de la jerarquía actual
    return ReactDOM.createPortal(
        // Este es el fondo oscuro que cubre toda la pantalla
        <div className="volcano-popup-overlay" onClick={onClose}>
            
            {/* Este es el contenido del pop-up en sí */}
            <div className="volcano-popup" onClick={(e) => e.stopPropagation()}>
                
                {/* Lógica para mostrar imagen única o carrusel */}
                {hasImages && (
                    hasMultipleImages ? (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            loop={true}
                            className="volcano-image-carousel"
                        >
                            {volcano.info.images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img 
                                      src={`${import.meta.env.BASE_URL}${img}`} 
                                      alt={`${volcano.name} - Imagen ${index + 1}`} 
                                      className="popup-image" 
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <img 
                          src={`${import.meta.env.BASE_URL}${volcano.info.images[0]}`} 
                          alt={volcano.name} 
                          className="popup-image" 
                        />
                    )
                )}

                {/* Contenido de texto del pop-up */}
                <div className="popup-content">
                    <h3>{volcano.name}</h3>
                    <p><strong>📍 Ubicación:</strong> {volcano.info.location || 'No disponible'}</p>
                    <p><strong>📏 Altura:</strong> {volcano.info.elevation}</p>
                    <p><strong>🌋 Tipo:</strong> {volcano.info.type}</p>
                    <p className="popup-description">{volcano.info.description}</p>
                    <button onClick={onClose} className="popup-close-button">Cerrar</button>
                </div>
            </div>
        </div>,
        // El segundo argumento le dice a React dónde renderizarlo: directamente en el <body>
        document.body 
    );
};

// Componente principal del mapa
const MapaVolcanes = () => {
  // Estado para gestionar qué volcán está seleccionado y si su pop-up debe mostrarse
  const [selectedVolcano, setSelectedVolcano] = useState(null);

  // Manejador de clic para cuando se presiona un volcán
  const handleVolcanoClick = (volcano) => {
    setSelectedVolcano(volcano);
  };

  // Manejador para cerrar la ventana emergente
  const handleClosePopup = () => {
    setSelectedVolcano(null);
  };

  return (
    <div className="mapa-volcanes-container">
      <img
        src={import.meta.env.BASE_URL + "/Mapa Puna con Volcanes.jpg"}
        alt="Mapa Puna con Volcanes"
        className="mapa-volcanes-image"
      />

      {/* Mapea y renderiza cada volcán en el mapa */}
      {volcanoesData.map((volcano) => (
        <div
          key={volcano.id}
          className="volcano-marker"
          style={{ top: volcano.top, left: volcano.left }}
          onClick={() => handleVolcanoClick(volcano)}
        >
          {/* Aquí necesitarás una imagen de ícono de volcán en tu carpeta 'public' */}
          {/*                     <img src="/volcano-icon.png" alt="Ícono Volcán" className="volcano-icon" />
           */}{" "}
          <span className="volcano-name">{volcano.name}</span>
        </div>
      ))}

      {/* Renderiza el pop-up si hay un volcán seleccionado */}
      <VolcanoPopup volcano={selectedVolcano} onClose={handleClosePopup} />
    </div>
  );
};

export default MapaVolcanes;
