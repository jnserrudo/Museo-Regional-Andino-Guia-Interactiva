// SalaRamalTrenDetalle.jsx
import React, { useState } from "react";
// Importa los estilos específicos si los tenías en SalaRamalC14.css
// Asegúrate de que las clases usadas aquí estén definidas (ej. en SalaRamalC14.css o uno nuevo)
import "../SalaRamalC14.css"; // O un CSS específico si prefieres

import "./SalaRamalGaleria.css"; // <<<--- NUEVO CSS para la galería específica

import { ArrowLeftOutlined } from "@ant-design/icons";


import ReactDOM from 'react-dom'; // <--- IMPORTANTE: Importa ReactDOM

// --- Datos para la Galería del Ramal C-14 ---
const imagenesRamalc14 = [
  {
    nombre: "Maquinas carguero 2001 Puna Salteña",
    fecha: "24/4/2025 18:00",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo:
      "187465-las-maquinas-carguero-2001-puna-salteña.jpg",
  },
  {
    nombre: "Vieja fotografía C14 estación Nubes",
    fecha: "24/4/2025 17:59",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo:
      "187465-vieja-fotografia-c14-estacion-nubes.jpg",
  },
  {
    nombre: "Archivo Polvorilla 1",
    fecha: "24/4/2025 18:07",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "archpolvorilla1.jpg",
  },
  {
    nombre: "Archivo Polvorilla 2",
    fecha: "24/4/2025 18:07",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "archpolvorilla2.jpg",
  },
  {
    nombre: "Archivo Polvorilla 3",
    fecha: "24/4/2025 18:07",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "archpolvorilla3.jpg",
  },
  {
    nombre: "Archivo Toro 1",
    fecha: "24/4/2025 18:08",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "archtoro1.jpg",
  },
  {
    nombre: "Archivo Toro 2",
    fecha: "24/4/2025 18:08",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "archtoro2.jpg",
  },
  {
    nombre: "Chorrillos años 40",
    fecha: "24/4/2025 18:06",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "chorrillosh1_en_los_años_40.jpg",
  },
  {
    nombre: "Ferrocarril Salta a Chile (Huaytiquina) 1940",
    fecha: "24/4/2025 18:15",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "ferrocarril_de_salta_a_chile_huahitiquina_1940.jpg",
  },
  {
    nombre: "Foto Trabajadores",
    fecha: "24/4/2025 18:15",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "foto_trabajadores.jpg",
  },
  {
    nombre: "Grúa 1",
    fecha: "24/4/2025 18:06",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "grua1.jpg",
  },
  {
    nombre: "HC Bar Estante",
    fecha: "24/4/2025 18:09",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hcabrestante01.jpg",
  },
  {
    nombre: "HC Antangos 01",
    fecha: "24/4/2025 18:08",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hcatangos01.jpg",
  },
  {
    nombre: "HC Antangos 03",
    fecha: "24/4/2025 18:09",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hcatangos03.jpg",
  },
  {
    nombre: "HC Antangos 05",
    fecha: "24/4/2025 18:08",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hcatangos05.jpg",
  },
  {
    nombre: "HC Antangos 06",
    fecha: "24/4/2025 18:09",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hcatangos06.jpg",
  },
  {
    nombre: "HC Antangos 07",
    fecha: "24/4/2025 18:09",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hcatangos07.jpg",
  },
  {
    nombre: "HCobertizo KM1294",
    fecha: "24/4/2025 18:09",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hcobertizo_km1294_100_1028.jpg",
  },
  {
    nombre: "H Construcción 01",
    fecha: "24/4/2025 18:09",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hconstruccion01.jpg",
  },
  {
    nombre: "H Construyendo Túnel",
    fecha: "24/4/2025 18:09",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hconstruyendo_tunel.jpg",
  },
  {
    nombre: "H Defensas 1",
    fecha: "24/4/2025 18:07",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hdefensas1.jpg",
  },
  {
    nombre: "Ing. Rafael Rossi",
    fecha: "24/4/2025 18:06",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hing_rafael_rossi.jpg",
  },
  {
    nombre: "H Pablo Saravia",
    fecha: "24/4/2025 18:06",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hpablo_saravia.jpg",
  },
  {
    nombre: "H Parada 01",
    fecha: "24/4/2025 18:10",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hparada01.jpg",
  },
  {
    nombre: "H Paseo 01",
    fecha: "24/4/2025 18:10",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hpaseo01.jpg",
  },
  {
    nombre: "H San Antonio 01a",
    fecha: "24/4/2025 18:10",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hsan_antonio01a.jpg",
  },
  {
    nombre: "H San Antonio 02a",
    fecha: "24/4/2025 18:10",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hsan_antonio02a.jpg",
  },
  {
    nombre: "H Vaporera carguero cerca El Alisal",
    fecha: "24/4/2025 18:20",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hvaporera01_carguero_cerca_el_aisal.jpg",
  },
  {
    nombre: "H Viaducto El Candado",
    fecha: "24/4/2025 18:07",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "hviaducto_el_candado.jpg",
  },
  {
    nombre: "Inauguración",
    fecha: "24/4/2025 18:11",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "inauguracion.jpg",
  },
  {
    nombre: "Locomotora 1334",
    fecha: "24/4/2025 18:18",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "loc1334.jpg",
  },
  {
    nombre: "Locomotora GM GT22CU Mixto",
    fecha: "24/4/2025 18:21",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "locomotora_gm_gt22cu_smixto02.jpg",
  },
  {
    nombre: "Locomotora Henschel E4",
    fecha: "24/4/2025 18:19",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "locomotora_henschel_e4.jpg",
  },
  {
    nombre: "Locomotora Skoda E5",
    fecha: "24/4/2025 18:21",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "locomotora_skoda_e5.jpg",
  },
  {
    nombre: "Locomotora vieja accidentada",
    fecha: "24/4/2025 18:20",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "locvieja_locomotora_accidentada.jpg",
  },
  {
    nombre: "Maury Pantoja",
    fecha: "24/4/2025 18:06",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "maury_pantoja.jpg",
  },
  {
    nombre: "Paleando 5",
    fecha: "24/4/2025 18:07",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "paleando5.jpg",
  },
  {
    nombre: "Pistarini",
    fecha: "24/4/2025 18:08",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "pistarini.jpg",
  },
  {
    nombre: "Polvorilla Construcción 01aa",
    fecha: "24/4/2025 18:10",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "polvorilla_construccion01aa.jpg",
  },
  {
    nombre: "Polvorilla Construcción 02aa",
    fecha: "24/4/2025 18:10",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "polvorilla_construccion02aa.jpg",
  },
  {
    nombre: "Polvorilla década del 40",
    fecha: "24/4/2025 18:14",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "polvorilla1h_decada_del_40.jpg",
  },
  {
    nombre: "Primeras locomotoras Baldwin E2",
    fecha: "24/4/2025 18:18",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "primeras_locomotoras_baldwin_e2.jpg",
  },
  {
    nombre: "Quebrada del Toro años 40",
    fecha: "24/4/2025 18:19",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "qtoroh1_en_los_años_40.jpg",
  },
  {
    nombre: "Ramal C14 inaugurado 20 Febrero 1948",
    fecha: "24/4/2025 18:05",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "ramal_c14_inaugurado_20_febrero_1948.jpg",
  },
  {
    nombre: "Recorrido",
    fecha: "24/4/2025 18:15",
    tipo: "JPG",
    tamaño: "",
    nombreArchivo: "recorrido_1653050.jpeg",
  },
  {
    nombre: "Trabajadores sobre rieles 1922",
    fecha: "24/4/2025 18:02",
    tipo: "JPEG",
    tamaño: "",
    nombreArchivo: "trabajadores_sobre_rieles_foto_ramal_c14_1922.jpg",
  },
];

export const SalaRamalTrenDetalle = () => {
  // No necesitamos el botón 'Volver a opciones' aquí,
  // porque el componente Sala ya añade un botón 'Volver' general.
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imgData) => {
    setSelectedImage(imgData);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  // --- Fin Estado y Handlers Modal ---

  return (
    // Añadimos clase específica para esta vista
    <div className="ramal-tren-vista">
      {/* Mantenemos el contenedor del botón volver */}
      {/* <div className="ramal-back-button-container">
      <button className="ramal-back-button" onClick={handleGoBack}>
        <ArrowLeftOutlined style={{ marginRight: '8px' }} /> Volver a opciones
      </button>
    </div>
 */}
      {/* Título ahora estilizado por CSS */}
      <h3 className="ramal-tren-titulo">
        El Ramal C-14: Historia y Proeza Ingenieril
      </h3>
      <figure className="ramal-tren-image-container">
        <img
          src={`${import.meta.env.BASE_URL}tren-a-las-nubes.jfif`} // Asegúrate que esta ruta es correcta
          alt="Construcción del Ramal C-14"
          className="ramal-tren-image"
          loading="lazy"
        />
        {/* Podríamos añadir un figcaption con datos clave */}
        <figcaption className="ramal-tren-image-caption">
          Una obra monumental atravesando la geografía andina.
        </figcaption>
      </figure>
      {/* Contenedor principal para la descripción */}
      <div className="ramal-tren-description-wrapper">
        {/* Sección 1: Descripción monumental */}
        <section className="ramal-section">
          <h4 className="ramal-section-title">La Gran Obra</h4>
          {/* Usamos clases para párrafos */}
          <p className="ramal-paragraph">
            <strong>
              Una monumental empresa a más de 3500 metros de altura y a pura
              pala, picó, barreta, carretilla, dinamita y camiones pequeños.
            </strong>
          </p>
          {/* Datos clave en lista o div */}
          <div className="ramal-datos-clave">
            <p className="ramal-paragraph">
              El Ramal que demandó el sacrificado trabajo a pala y picó de 1000
              hombres para cubrir con rieles 171 km de recorrido sobre
              territorio argentino hasta Socompa, con:
            </p>
            <ul>
              <li>1400 curvas</li>
              <li>31 puentes</li>
              <li>21 túneles</li>
              <li>13 viaductos</li>
              <li>2 rulos</li>
              <li>2 zig-zag</li>
              <li>9 cobertizos</li>
            </ul>
          </div>
          <p className="ramal-paragraph">
            Se convirtió en una oferta turística importante que durante las
            últimas décadas del S. XX se orientó crecientemente al mercado
            internacional con el recorrido turístico del Tren a las Nubes.
          </p>
          <div className="ramal-signature">
            <p>Roma César, Máxima Marítima Cuentas</p>
          </div>
        </section>

        {/* Sección 2: Cronología histórica */}
        <section className="ramal-section">
          <h4 className="ramal-section-title">Línea de Tiempo del Proyecto</h4>
          {/* Contenedor para la línea de tiempo simplificada */}
          <div className="ramal-timeline-simplified">
            <div className="ramal-timeline-item">
              <h5 className="ramal-timeline-year">1889</h5>
              <p className="ramal-timeline-text">
                Se incluyen proyectos comunes por un segundo ferrocarril entre
                Salta y Antofagasta.
              </p>
            </div>
            <div className="ramal-timeline-item">
              <h5 className="ramal-timeline-year">1905</h5>
              <p className="ramal-timeline-text">
                Reconocimiento de la oportunidad ferroviaria y su conexión
                fronteriza.
              </p>
            </div>
            <div className="ramal-timeline-item">
              <h5 className="ramal-timeline-year">1921</h5>
              <p className="ramal-timeline-text">
                Impulso a la obra de San Antonio de los Cobres y propuestas de
                actualización.
              </p>
            </div>
            <div className="ramal-timeline-item">
              <h5 className="ramal-timeline-year">1928</h5>
              <p className="ramal-timeline-text">
                Conexión de San Antonio con los Cabros de San José.
              </p>
            </div>
            <div className="ramal-timeline-item">
              <h5 className="ramal-timeline-year">1930-1932</h5>
              <p className="ramal-timeline-text">
                Planes nacionales de seguridad y desarrollo para la zona.
              </p>
            </div>
            <div className="ramal-timeline-item">
              <h5 className="ramal-timeline-year">1948</h5>
              <p className="ramal-timeline-text">
                Revisión del estudio y enfoque gubernamental en el desarrollo
                industrial y seguridad.
              </p>
            </div>
          </div>
          <div className="ramal-signature">
            <p>Roma César, Máxima Marítima Cuentas</p>
          </div>
        </section>
      </div>{" "}
      {/* Fin description-wrapper */}






      {/* ============================================================ */}
      {/* =      NUEVA GALERÍA DE IMÁGENES DEL RAMAL C-14            = */}
      {/* ============================================================ */}
      <aside className="ramalc14-image-gallery"> {/* Clase específica */}
        <h3 className="ramalc14-gallery-title">Galería Histórica del Ramal C-14</h3>
        <div className="ramalc14-gallery-grid"> {/* Clase específica */}
          {imagenesRamalc14.map((imgData, index) => (
            <figure
                key={imgData.nombreArchivo + index}
                className="ramalc14-gallery-item" // Clase específica
                tabIndex="0"
                onClick={() => handleImageClick(imgData)} // Abre el modal
                onKeyDown={(e) => e.key === 'Enter' && handleImageClick(imgData)} // Accesibilidad teclado
                role="button" // Indica que es interactivo
                aria-label={`Ver imagen ampliada de ${imgData.nombre}`}
            >
              <img
                src={`${import.meta.env.BASE_URL}/ramalc14/${imgData.nombreArchivo}`}
                alt={imgData.nombre}
                className="ramalc14-gallery-image" // Clase específica
                loading="lazy"
              />
              <figcaption className="ramalc14-gallery-caption"> {/* Clase específica */}
                {/* Limpiar y mostrar nombre */}
                {imgData.nombre.replace(/_/g, ' ').replace(/-+/g, ' ')}
              </figcaption>
            </figure>
          ))}
        </div>
      </aside>
      {/* ============================================================ */}
      {/* =             FIN NUEVA GALERÍA DEL RAMAL                 = */}
      {/* ============================================================ */}

 {/* --- Modal Renderizado con Portal --- */}
 {selectedImage && ReactDOM.createPortal( // <--- USA PORTAL
          <div className="ramalc14-modal-overlay" onClick={closeModal}>
              <div className="ramalc14-modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="ramalc14-modal-close" onClick={closeModal} aria-label="Cerrar imagen">×</button>
                  <figure className="ramalc14-modal-figure">
                      <img
                          src={`${import.meta.env.BASE_URL}/ramalc14/${selectedImage.nombreArchivo}`}
                          alt={selectedImage.nombre}
                          className="ramalc14-modal-image"
                      />
                      <figcaption className="ramalc14-modal-caption">
                          {selectedImage.nombre.replace(/_/g, ' ').replace(/-+/g, ' ')}
                      </figcaption>
                  </figure>
              </div>
          </div>,
          document.body // <--- Lo renderiza como hijo directo del body
      )}
      {/* --- Fin Modal --- */}

    </div> // Fin ramal-tren-vista
  );
};
