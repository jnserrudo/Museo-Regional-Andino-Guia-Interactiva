// SalaMinerologiaMineria.jsx (CON BOTÓN QR Y LÓGICA DE CÁMARA)
import React, { useState, useEffect } from "react"; // Importa useRef
import { SalaContenidoItem } from "./SalaContenidoItem"; // Asegúrate que la ruta sea correcta
import "../SalaMinerologiaMineria.css"; // Importa el CSS
import { QrcodeOutlined } from "@ant-design/icons"; // Importa el icono QR
import { useTranslation, Trans } from "react-i18next";
import "webrtc-adapter"; // ¡AÑADE ESTA LÍNEA!
import ReactDOM from "react-dom"; // Necesitas importar ReactDOM

// *** IMPORTA LA LIBRERÍA QR-READER ***
//import { QrReader } from "react-qr-reader"; // <--- NUEVA IMPORTACIÓN
import { useZxing } from 'react-zxing'; // <-- NUEVA IMPORTACIÓN
import { QrScannerComponent } from "./QrScannerComponent";
// AÑADE ESTAS IMPORTACIONES AL PRINCIPIO DEL ARCHIVO
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRegisterText } from "../Contexts/SpeechContext";
import { Button } from "antd";
import { ExperimentOutlined } from "@ant-design/icons";

// --- Datos Organizados en Arrays ---

// --- DATOS ESTÁTICOS (NO SE TRADUCEN) ---
// Contiene la información que es igual en todos los idiomas.
const mineralesData = [
  {
    id: "pomez",
    img: [
      "/minerales_museo/sin_fondo_blanco/Piedra_Pomez-removebg-preview.png",
      "/minerales_museo/sin_fondo_blanco/0.1._piedra_pomez-removebg-preview.png",
      "/minerales_museo/sin_fondo_blanco/0.1._piedra_pomez_2-removebg-preview.png",
      "/minerales_museo/sin_fondo_blanco/0.1._piedra_pomez_1-removebg-preview.png",
    ],
    tieneQr: false,
  },
  {
    id: "onix",
    img: ["/minerales_museo/0.2. Marmol_onix_verde-removebg-preview.png"],
    tieneQr: false,
  },
  {
    id: "ulexita",
    img: [
      "/minerales_museo/0.3._Ulexita-removebg-preview.png",
      "/minerales_museo/0.3._Ulexite-Calcite-40061-removebg-preview.png",
    ],
    tieneQr: true,
  },
  {
    id: "baritina",
    img: ["/minerales_museo/1._Baritina-removebg-preview.png"],
    tieneQr: false,
  },
  {
    id: "ortosa",
    img: ["/minerales_museo/sin_fondo_blanco/2._Ortosa-removebg-preview.png"],
    tieneQr: false,
  },
  {
    id: "turmalina",
    img: ["/minerales_museo/3. Turmalina Negra.png"],
    tieneQr: false,
  },
  {
    id: "cuarzo_blanco",
    img: ["/minerales_museo/4. Cuarzo Blanco.png"],
    tieneQr: false,
  },
  {
    id: "malaquita",
    img: [
      "/minerales_museo/sin_fondo_blanco/5._Malaquita-removebg-preview.png",
    ],
    tieneQr: true,
  },
  {
    id: "muscovita",
    img: [
      "/minerales_museo/sin_fondo_blanco/6._Muscovita_-_Mica_Blanca-removebg-preview.png",
      "/minerales_museo/sin_fondo_blanco/6._Muscovita_-_otra2-removebg-preview.png",
      "/minerales_museo/sin_fondo_blanco/6._Muscovita-removebg-preview.png",
    ],
    tieneQr: false,
  },
  {
    id: "azufre_nativo",
    img: ["/minerales_museo/sin_fondo_blanco/7._Azufre-removebg-preview.png"],
    tieneQr: false,
  },
  {
    id: "yeso",
    img: ["/minerales_museo/sin_fondo_blanco/8._Yeso-removebg-preview.png"],
    tieneQr: false,
  },
  {
    id: "calcita_rosada",
    img: [
      "/minerales_museo/9._Calcita_Rosada_1-removebg-preview.png",
      "/minerales_museo/9._Calcita_rosada-removebg-preview.png",
    ],
    tieneQr: false,
  },
  {
    id: "epidoto_en_cuarzo",
    img: [
      "/minerales_museo/sin_fondo_blanco/10._Epidota_en_cuarzo_0-removebg-preview.png",
      "/minerales_museo/10._Epidota_en_cuarzo_1-removebg-preview.png",
      "/minerales_museo/10._Epidota_en_cuarzo-removebg-preview.png",
    ],
    tieneQr: false,
  },
  {
    id: "estaurolita",
    img: [
      "/minerales_museo/11._Estaurolita_lab_1-removebg-preview.png",
      "/minerales_museo/11._Estaurolita_lab_2-removebg-preview.png",
      "/minerales_museo/11._Estaurolita-2_1wb-removebg-preview.png",
      "/minerales_museo/11._Estaurolita-removebg-preview.png",
    ],
    tieneQr: false,
  },
  {
    id: "casiterita",
    img: [
      "/minerales_museo/sin_fondo_blanco/12._cassiterite-tin-ore-stone-isolated-on-white-photo-removebg-preview.png",
      "/minerales_museo/12.Casiterita-removebg-preview.png",
    ],
    tieneQr: true,
  },
  {
    id: "galena",
    img: [
      "/minerales_museo/sin_fondo_blanco/13._galena-removebg-preview.png",
      "/minerales_museo/13._Galena_con_Blenda-removebg-preview.png",
    ],
    tieneQr: true,
  },
  {
    id: "fluorita_verde",
    img: [
      "/minerales_museo/sin_fondo_blanco/14._Fluorita_verde_1-removebg-preview.png",
      "/minerales_museo/sin_fondo_blanco/14._Fluorita_verde-removebg-preview.png",
      "/minerales_museo/14._Fluorita_verde_2-removebg-preview.png",
    ],
    tieneQr: false,
  },
  {
    id: "jadeita",
    img: [
      "/minerales_museo/15._Jadeita_1-removebg-preview.png",
      "/minerales_museo/15._Jadeita_2-removebg-preview.png",
      "/minerales_museo/15._Jadeite_Sodium_aluminum_silicate_Burma_3025-removebg-preview.png",
    ],
    tieneQr: false,
  },
  {
    id: "basalto_llullaillaco",
    img: ["/minerales_museo/sin_fondo_blanco/16._Basalto-removebg-preview.png"],
    tieneQr: false,
  },
  {
    id: "halita_sal_gema",
    img: [
      "/minerales_museo/sin_fondo_blanco/17._Halita_-_Sal-removebg-preview.png",
    ],
    tieneQr: false,
  },
];

const boratosCollection = [
  { id: "boro_10", imgSrc: "/boro_10.png" },
  { id: "boro_15", imgSrc: "/boro_15.png" },
  { id: "ulexita_natural", imgSrc: "/ulexita_natural.png" },
  { id: "aquabor", imgSrc: "/aquabor.png" },
  { id: "ulexita_molida", imgSrc: "/ulexita_molida.png" },
  { id: "borax_10", imgSrc: "/borax_10.png" },
  { id: "acido_borico_tecnico", imgSrc: "/acido_borico_tecnico.png" },
  { id: "acido_borico_powder", imgSrc: "/acido_borico_powder.png" },
];

// --- NUEVA FUNCIÓN PARA GENERAR TEXTO DE MINERALES ---
const generarTextoMinerales = (listaMinerales) => {
  return listaMinerales
    .map((mineral) => {
      // Construimos un array de strings con los detalles de cada mineral
      const detalles = [
        mineral.nombre,
        mineral.desc,
        mineral.tipo ? `Tipo: ${mineral.tipo}` : null,
        mineral.nombreTecnico
          ? `Nombre técnico: ${mineral.nombreTecnico}`
          : null,
        mineral.origen ? `Origen: ${mineral.origen}` : null,
        mineral.formulaQuimica
          ? `Fórmula Química: ${mineral.formulaQuimica}`
          : null,
        mineral.clase ? `Clase: ${mineral.clase}` : null,
        mineral.composicion ? `Composición: ${mineral.composicion}` : null,
        mineral.composicionQuimica
          ? `Composición química: ${mineral.composicionQuimica}`
          : null,
        mineral.sistemaCristalografico
          ? `Sistema Cristalografico: ${mineral.sistemaCristalografico}`
          : null,
        mineral.caracteristicas
          ? `Características: ${mineral.caracteristicas}`
          : null,
        mineral.caracteristicasCombinadas
          ? `Características combinadas: ${mineral.caracteristicasCombinadas}`
          : null,
        mineral.propiedadDiagnostica
          ? `Propiedad Diagnóstica: ${mineral.propiedadDiagnostica}`
          : null,
        mineral.usos ? `Usos: ${mineral.usos}` : null,
        mineral.importanciaEconomica
          ? `Importancia Económica: ${mineral.importanciaEconomica}`
          : null,
        mineral.genesis ? `Génesis: ${mineral.genesis}` : null,
        mineral.etimologia ? `Etimología: ${mineral.etimologia}` : null,
        mineral.yacimientosPuna
          ? `Yacimientos en la Puna: ${mineral.yacimientosPuna.join(", ")}`
          : null,
        mineral.otros ? `Otros datos: ${mineral.otros}` : null,
      ];

      // Filtramos los detalles nulos o vacíos y los unimos con un punto y un espacio
      return detalles.filter(Boolean).join(". ");
    })
    .join("\n\n"); // Unimos cada mineral con un doble salto de línea
};

// AÑADE ESTE COMPONENTE DE CARRUSEL
const MineralCarousel = ({ images, mineralNombre }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={true}
      pagination={{ clickable: true, dynamicBullets: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      className="mineral-card-carousel" // Clase específica para darle estilo
    >
      {images.map((imgSrc, index) => (
        <SwiperSlide key={index}>
          <img
            src={`${import.meta.env.BASE_URL}${imgSrc}`}
            alt={`${mineralNombre} - Imagen ${index + 1}`}
            className="mineral-card-image" // Reutilizamos la clase de la imagen
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const SalaMinerologiaMineria = () => {
  const { t } = useTranslation();

  // --- ESTADO PARA CONTROLAR LA VISIBILIDAD DEL ESCÁNER QR ---
  const [showQrScanner, setShowQrScanner] = useState(false); // <--- NUEVO ESTADO
  const [scannedData, setScannedData] = useState(""); // Estado para guardar el resultado del escaneo
  const [cameraError, setCameraError] = useState(null); // Nuevo estado para errores de cámara

  // *** IMPORTANTE: Usamos useEffect para limpiar el escáner cuando se cierra el modal ***
  useEffect(() => {
    if (!showQrScanner) {
      setScannedData(""); // Limpia el mensaje cuando el escáner está oculto
      setCameraError(null); // Limpia cualquier error previo de cámara
    }
  }, [showQrScanner]);

    
  // --- LÓGICA DE ESCANEO QR ---
  // --- LÓGICA DE ESCANEO QR CORREGIDA ---
  const handleScan = (result, error) => {
    // 1. Si hay un resultado válido, procésalo.
    if (result) {
      // Detenemos el mensaje de "Escaneando..." y limpiamos cualquier error previo.
      setCameraError(null);
      const scannedUrl = result?.text;
      setScannedData(scannedUrl);
      console.log("QR Escaneado:", scannedUrl);

      if (
        scannedUrl &&
        (scannedUrl.startsWith(
          "https://museo-andino-realidad-aumentada.onrender.com/"
        ) ||
        scannedUrl.startsWith("https://qr.link/"))
      ) {
        window.location.href = scannedUrl;
      } else {
        alert("Este QR no es un enlace válido a un mineral del museo. "+scannedUrl);
        // Cerramos el escáner si el QR no es válido para que el usuario no se quede atascado.
        setShowQrScanner(false);
      }
      return; // Salimos de la función para no procesar la parte del error.
    }

    // 2. Si hay un error, verifica si es un error crítico de inicialización.
    if (error) {
      // ERRORES CRÍTICOS: Permiso denegado o cámara no encontrada.
      // Estos errores sí deben mostrarse al usuario porque impiden que el escáner funcione.
      if (error.name === "NotAllowedError" || error.name === "NotFoundError") {
        setCameraError(
          error.name === "NotAllowedError"
            ? "Permiso de cámara denegado. Por favor, concede acceso en la configuración de tu navegador."
            : "No se detecta ninguna cámara disponible en este dispositivo."
        );
      }
      // Para cualquier otro tipo de error (como el 'e2' o 'NotFoundException' que ocurren en cada fotograma sin QR),
      // simplemente lo ignoramos. No establecemos un estado de error, permitiendo que el escáner siga
      // intentando en el siguiente fotograma.
    }
  };


 // --- NUEVA FUNCIÓN PARA MANEJAR EL ÉXITO ---
 const handleScanSuccess = (scannedUrl) => {
  setCameraError(null);
  setScannedData(scannedUrl);
  console.log("QR Escaneado:", scannedUrl);

  if (
    scannedUrl &&
    (scannedUrl.startsWith("https://museo-andino-realidad-aumentada.onrender.com/") ||
     scannedUrl.startsWith("https://qr.link/"))
  ) {
    window.location.href = scannedUrl;
  } else {
    alert("Este QR no es un enlace válido para el museo. Contenido: " + scannedUrl);
    setShowQrScanner(false);
  }
};

// --- NUEVA FUNCIÓN PARA MANEJAR ERRORES DE CÁMARA ---
const handleScanError = (error) => {
  setCameraError(
    error.name === "NotAllowedError"
      ? "Permiso de cámara denegado. Revísalo en la configuración de tu navegador."
      : "No se detecta ninguna cámara disponible o hay un error."
  );
};

// La función handleScan ya no es necesaria, la hemos dividido en las dos de arriba.
// Las funciones handleQrButtonClick y closeQrScanner permanecen igual.


  // --- LÓGICA AL CLICKEAR EL BOTÓN QR DEL MINERAL ---
  // Ahora solo activa la visibilidad del escáner
  const handleQrButtonClick = (event, mineralData) => {
    // Renombré para evitar conflicto
    event.preventDefault();
    event.stopPropagation();
    setCameraError(null); // Limpia cualquier error anterior antes de abrir

    // Puedes pasar 'mineralData' si quisieras mostrar información específica antes de escanear
    setShowQrScanner(true); // Muestra el componente del escáner
    setScannedData("Escaneando..."); // Mensaje de carga
  };

  // --- Función para cerrar el escáner (opcional, para un botón "Cerrar") ---
  const closeQrScanner = () => {
    setShowQrScanner(false);
    setScannedData("");
  };

  // --- CONSTRUCCIÓN DEL TEXTO PARA EL LECTOR DE VOZ ---
  const textoMineralesTraducido = Object.values(
    t("sala_minerologia_mineria.lista_minerales", { returnObjects: true })
  )
    .map((mineral) => Object.values(mineral).join(". "))
    .join("\n\n");

  const textoParaHablar = `
      ${t("sala_minerologia_mineria.titulo_principal")}.
      ${t("sala_minerologia_mineria.subtitulo_coleccion")}.
      ${t("sala_minerologia_mineria.parrafo_coleccion_1")}.
      ${t("sala_minerologia_mineria.parrafo_coleccion_2")} ${t(
    "sala_minerologia_mineria.parrafo_coleccion_3"
  ).replace(/<[^>]*>/g, "")}.
      ${textoMineralesTraducido}.
      ${t("sala_minerologia_mineria.subtitulo_vida_cotidiana")}.
      ${t("sala_minerologia_mineria.parrafo_vida_cotidiana_1").replace(
        /<[^>]*>/g,
        ""
      )}.
      ${t("sala_minerologia_mineria.subtitulo_primeros_pasos")}.
      ${t("sala_minerologia_mineria.parrafo_primeros_pasos_1")}.
      ${t("sala_minerologia_mineria.caption_lampara")}.
      ${t("sala_minerologia_mineria.parrafo_lampara_1").replace(
        /<[^>]*>/g,
        ""
      )}.
      ${t("sala_minerologia_mineria.parrafo_lampara_2")}.
      ${t("sala_minerologia_mineria.subtitulo_testigos")}.
      ${t("sala_minerologia_mineria.parrafo_testigos_1")}.
      ${t("sala_minerologia_mineria.parrafo_testigos_2")}.
      ${t("sala_minerologia_mineria.subtitulo_testigo_brecha")}: ${t(
    "sala_minerologia_mineria.parrafo_testigo_brecha"
  )}.
      ${t("sala_minerologia_mineria.subtitulo_testigo_andesita_5")}: ${t(
    "sala_minerologia_mineria.parrafo_testigo_andesita_5"
  )}.
      ${t("sala_minerologia_mineria.subtitulo_testigo_andesita_6")}: ${t(
    "sala_minerologia_mineria.parrafo_testigo_andesita_6"
  )}.
      ${t("sala_minerologia_mineria.subtitulo_testigo_diamantina")}: ${t(
    "sala_minerologia_mineria.parrafo_testigo_diamantina"
  )}.
      ${t("sala_minerologia_mineria.subtitulo_testigo_granitoide")}: ${t(
    "sala_minerologia_mineria.parrafo_testigo_granitoide"
  )}.
      ${t("sala_minerologia_mineria.subtitulo_boratos")}.
      ${t("sala_minerologia_mineria.parrafo_boratos_1")}.
  `;
  useRegisterText(textoParaHablar);

  /* const fileInputRef = useRef(null);

  const handleQrClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // --- Detección simple ---
    const isLikelyMobile =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      /Mobi|Android/i.test(navigator.userAgent);

    if (isLikelyMobile && fileInputRef.current) {
      console.log("Detectado como móvil, activando input...");
      fileInputRef.current.click();
    } else {
      console.log(
        "Detectado como escritorio o sin soporte táctil, no se activa el input."
      );
      // Opcional: podrías mostrar un mensaje tipo "Función disponible en móvil"
      // alert("Esta función está optimizada para dispositivos móviles.");
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Archivo/Foto capturada:", file.name);
      // Por ahora no hacemos nada más
    }
    event.target.value = null; // Permite tomar/seleccionar de nuevo
  }; */

  // Definir el componente Portal para el modal
  const QrScannerPortal = ({ children }) => {
    const el = document.getElementById("qr-scanner-root"); // Busca un div específico
    // Si no existe, créalo o usa document.body
    if (!el) {
      const newEl = document.createElement("div");
      newEl.id = "qr-scanner-root";
      document.body.appendChild(newEl);
      return ReactDOM.createPortal(children, newEl);
    }
    return ReactDOM.createPortal(children, el);
  };

  return (
    <div className="sala-minerologia-container">
      {/* ELIMINAMOS EL INPUT TYPE FILE Y useRef */}
      {/* <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      /> */}

      {/* --- RENDERIZADO CONDICIONAL DEL ESCÁNER QR --- */}

      {showQrScanner && (
        <QrScannerPortal>
          <div className="qr-scanner-overlay">
            <div className="qr-scanner-content">
              <h3 style={{ color: "black", margin: 0, textAlign: "center" }}>
                {scannedData.startsWith("https://")
                  ? "QR Escaneado"
                  : "Apunte la cámara al QR"}
              </h3>

                {/* === ¡AQUÍ ESTÁ LA MAGIA! === */}
              {/* Renderizamos nuestro componente aislado */}
              <QrScannerComponent
                onScanSuccess={handleScanSuccess}
                onScanError={handleScanError}
              />


              {/* Mostramos el mensaje de error si existe */}
              {cameraError && (
                <p style={{ color: "red", textAlign: "center", margin: 0 }}>
                  {cameraError}
                </p>
              )}

              <p className="qr-scanner-message">
                {scannedData === "Escaneando..."
                  ? "Buscando código..."
                  : scannedData}
              </p>

              <Button
                onClick={closeQrScanner}
                className="qr-scanner-close-button"
                type="primary"
                danger
              >
                Cerrar Escáner
              </Button>
            </div>
          </div>
        </QrScannerPortal>
      )}
      {/* --- FIN DEL ESCÁNER QR --- */}
      <h1 className="sala-main-title sala-contenido-titulo-principal">
        {t("sala_minerologia_mineria.titulo_principal")}
      </h1>

      <section className="seccion-minerales">
        <h2 className="sala-contenido-subtitulo">
          {t("sala_minerologia_mineria.subtitulo_coleccion")}
        </h2>
        <p className="sala-contenido-parrafo">
          {t("sala_minerologia_mineria.parrafo_coleccion_1")}
        </p>
        <p className="sala-contenido-parrafo">
          {t("sala_minerologia_mineria.parrafo_coleccion_2")}
        </p>
        <p className="sala-contenido-parrafo">
          <Trans i18nKey="sala_minerologia_mineria.parrafo_coleccion_3" />
        </p>

        <div className="minerales-grid">
          {mineralesData.map((mineralData, index) => {
            const mineralTextos = t(
              `sala_minerologia_mineria.lista_minerales.${mineralData.id}`,
              { returnObjects: true }
            );
            return (
              <article key={mineralData.id} className="mineral-card">
                <div className="mineral-card-image-wrapper">
                  {mineralData.img.length > 1 ? (
                    <MineralCarousel
                      images={mineralData.img}
                      mineralNombre={mineralTextos.nombre}
                    />
                  ) : (
                    <img
                      src={`${import.meta.env.BASE_URL}${mineralData.img[0]}`}
                      alt={mineralTextos.nombre}
                      className="mineral-card-image"
                    />
                  )}
                  {mineralData.tieneQr && (
                    <button
                      className="qr-code-button mineral-qr-on-image"
                      onClick={(e) => handleQrButtonClick(e, mineralData)} // <--- ASEGÚRATE QUE LLAMA A handleQrButtonClick
                    >
                      <QrcodeOutlined />
                    </button>
                  )}
                </div>
                <div className="mineral-card-content">
                  <h4 className="mineral-card-name">{mineralTextos.nombre}</h4>
                  <div className="mineral-card-extra-details">
                    {mineralTextos.tipo && (
                      <p className="mineral-detail-item">
                        <strong>Tipo:</strong> {mineralTextos.tipo}
                      </p>
                    )}
                    {mineralTextos.nombreTecnico && (
                      <p className="mineral-detail-item">
                        <strong>Nombre técnico:</strong>{" "}
                        {mineralTextos.nombreTecnico}
                      </p>
                    )}
                    {mineralTextos.origen && (
                      <p className="mineral-detail-item">
                        <strong>Origen:</strong> {mineralTextos.origen}
                      </p>
                    )}
                    {mineralTextos.formulaQuimica && (
                      <p className="mineral-detail-item">
                        <strong>Fórmula Química:</strong>{" "}
                        {mineralTextos.formulaQuimica}
                      </p>
                    )}
                    {mineralTextos.clase && (
                      <p className="mineral-detail-item">
                        <strong>Clase:</strong> {mineralTextos.clase}
                      </p>
                    )}
                    {mineralTextos.composicion && (
                      <p className="mineral-detail-item">
                        <strong>Composición:</strong>{" "}
                        {mineralTextos.composicion}
                      </p>
                    )}
                    {mineralTextos.caracteristicas && (
                      <p className="mineral-detail-item">
                        <strong>Características:</strong>{" "}
                        {mineralTextos.caracteristicas}
                      </p>
                    )}
                    {mineralTextos.usos && (
                      <p className="mineral-detail-item">
                        <strong>Usos:</strong> {mineralTextos.usos}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <h2 className="sala-minerologia-subtitulo">
        {t("sala_minerologia_mineria.subtitulo_vida_cotidiana")}
      </h2>
      <p className="sala-minerologia-intro">
        <Trans i18nKey="sala_minerologia_mineria.parrafo_vida_cotidiana_1" />
      </p>

      <h2 className="sala-minerologia-subtitulo">
        {t("sala_minerologia_mineria.subtitulo_primeros_pasos")}
      </h2>
      <p className="sala-minerologia-intro">
        {t("sala_minerologia_mineria.parrafo_primeros_pasos_1")}
      </p>

      <p className="titulo-imagen">
        {t("sala_minerologia_mineria.caption_lampara")}
      </p>
      <img
        src={`${import.meta.env.BASE_URL}/lampara_carburo.JPG`}
        alt="Lámpara a Carburo"
        className="imagen-testigo lampara-recortada"
      />
      <p className="sala-minerologia-intro">
        <Trans i18nKey="sala_minerologia_mineria.parrafo_lampara_1" />
      </p>
      <p className="sala-minerologia-intro">
        {t("sala_minerologia_mineria.parrafo_lampara_2")}
      </p>

      <div className="botones-sala-minerologia">
        <a
          href="https://drive.google.com/file/d/17T5oswp-eh064JrfQFe3w32Z0Ijd8V7D/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            type="primary"
            size="large"
            className="sala-contenido-boton"
            icon={<ExperimentOutlined />}
          >
            {t("sala_minerologia_mineria.boton_mina_oro")}
          </Button>
        </a>
        <a
          href="https://centenario.virtual.eramet.com/es/visit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            type="primary"
            size="large"
            className="sala-contenido-boton"
            icon={<ExperimentOutlined />}
          >
            {t("sala_minerologia_mineria.boton_planta_litio")}
          </Button>
        </a>
      </div>

      <h2 className="sala-minerologia-subtitulo">
        {t("sala_minerologia_mineria.subtitulo_testigos")}
      </h2>
      <p className="sala-minerologia-intro">
        {t("sala_minerologia_mineria.parrafo_testigos_1")}
      </p>

      <section className="seccion-testigos" style={{ border: "0px" }}>
        <p className="sala-contenido-parrafo">
          {t("sala_minerologia_mineria.parrafo_testigos_2")}
        </p>
        <div className="testigo-item">
          <h4 className="sala-contenido-subtitulo-menor">
            {t("sala_minerologia_mineria.subtitulo_testigo_brecha")}
          </h4>
          <p className="sala-contenido-parrafo">
            {t("sala_minerologia_mineria.parrafo_testigo_brecha")}
          </p>
          <div className="imagen-destacada-container">
            <img
              src={`${
                import.meta.env.BASE_URL
              }/testigos/1._Testigos__Brecha_Hidrotermal_-_testigo_3-removebg-preview.png`}
              alt="Testigo de Brecha Hidrotermal"
              className="imagen-testigo"
            />
          </div>
        </div>
        <div className="testigo-item">
          <h4 className="sala-contenido-subtitulo-menor">
            {t("sala_minerologia_mineria.subtitulo_testigo_andesita_5")}
          </h4>
          <p className="sala-contenido-parrafo">
            {t("sala_minerologia_mineria.parrafo_testigo_andesita_5")}
          </p>
          <div className="imagen-destacada-container">
            <img
              src={`${
                import.meta.env.BASE_URL
              }/testigos/2._Testigos_Andesita_4-removebg-preview.png`}
              alt="Testigo de Andesita Alterada"
              className="imagen-testigo"
            />
          </div>
        </div>
        <div className="testigo-item">
          <h4 className="sala-contenido-subtitulo-menor">
            {t("sala_minerologia_mineria.subtitulo_testigo_andesita_6")}
          </h4>
          <p className="sala-contenido-parrafo">
            {t("sala_minerologia_mineria.parrafo_testigo_andesita_6")}
          </p>
          <div className="imagen-destacada-container">
            <img
              src={`${
                import.meta.env.BASE_URL
              }/testigos/4._Testigo_Andesita_6-removebg-preview.png`}
              alt="Testigo de Andesita Alterada"
              className="imagen-testigo"
            />
          </div>
        </div>
        <div className="testigo-item">
          <h4 className="sala-contenido-subtitulo-menor">
            {t("sala_minerologia_mineria.subtitulo_testigo_diamantina")}
          </h4>
          <p className="sala-contenido-parrafo">
            {t("sala_minerologia_mineria.parrafo_testigo_diamantina")}
          </p>
          <div className="imagen-destacada-container">
            <img
              src={`${
                import.meta.env.BASE_URL
              }/testigos/5._Testigo_Diamantina-removebg-preview.png`}
              alt="Testigo de Diamantina"
              className="imagen-testigo"
            />
          </div>
        </div>
        <div className="testigo-item">
          <h4 className="sala-contenido-subtitulo-menor">
            {t("sala_minerologia_mineria.subtitulo_testigo_granitoide")}
          </h4>
          <p className="sala-contenido-parrafo">
            {t("sala_minerologia_mineria.parrafo_testigo_granitoide")}
          </p>
          <div className="imagen-destacada-container">
            <img
              src={`${
                import.meta.env.BASE_URL
              }/testigos/granitoide-removebg-preview.png`}
              alt="Testigo de Granitoide"
              className="imagen-testigo"
            />
          </div>
        </div>
      </section>

      <h2 className="sala-minerologia-subtitulo">
        {t("sala_minerologia_mineria.subtitulo_boratos")}
      </h2>
      <p className="sala-minerologia-intro">
        {t("sala_minerologia_mineria.parrafo_boratos_1")}
      </p>
      {/* {(() => {
        return (
          <section className="boratos-section">
            <div className="boratos-grid">
              {boratosCollection.map((borato) => (
                <div key={borato.id} className="borato-item">
                  <h4 className="borato-caption">{borato.nombre}</h4>
                  <img
                    src={`${import.meta.env.BASE_URL}${borato.imgSrc}`}
                    alt={borato.nombre}
                    className="borato-image"
                  />
                </div>
              ))}
            </div>
          </section>
        );
      })()} */}
    </div>
  );
};
