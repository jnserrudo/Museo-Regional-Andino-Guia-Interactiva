// SalaMinerologiaMineria.jsx (CON BOTÓN QR Y LÓGICA DE CÁMARA)
import React, { useRef } from "react"; // Importa useRef
import { SalaContenidoItem } from "./SalaContenidoItem"; // Asegúrate que la ruta sea correcta
import "../SalaMinerologiaMineria.css"; // Importa el CSS
import { QrcodeOutlined } from "@ant-design/icons"; // Importa el icono QR

// --- Datos Organizados en Arrays ---
const mineralesCorteza = [
  // Minerales originales del array (conservados)
  {
    id: "calcita",
    img: "/calcita.png",
    nombre: "Calcita",
    desc: "Mineral fundamental, componente principal del cemento y la cal, con efervescencia característica ante el ácido clorhídrico.",
    clase: "Carbonatos",
    composicion: "Principalmente carbonato de calcio (CaCO3)",
    sistemaCristalografico: "Trigonal",
    etimologia: 'Del latín "calx", que significa cal viva.',
    propiedadDiagnostica: "Efervescencia con HCl, dureza 3 en escala Mohs, birrefringencia.",
    importanciaEconomica: "Construcción (cemento, cal), Industria papelera (relleno), plásticos, vidrio, tratamiento de agua, fertilizantes.",
    genesis: "Sedimentaria, Biológica (conchas, esqueletos), Metamórfica (mármoles).",
    yacimientosPuna: ["Yacimientos sedimentarios y metamórficos en la región."],
    otros: 'Conocida localmente como "cal viva" o "piedra de cal".'
  },
  {
    id: "fluorita",
    img: "/fluorita.png",
    nombre: "Fluorita",
    desc: "Conocida por su amplia gama de colores y su fluorescencia bajo luz UV, es la principal fuente de flúor para la industria.",
    clase: "Haluros",
    composicion: "Fluoruro de calcio (CaF₂)",
    sistemaCristalografico: "Isométrico (cúbico u octaédrico).",
    propiedadDiagnostica: "Dureza 4, exfoliación octaédrica perfecta, brillo vítreo, fluorescencia.",
    importanciaEconomica: "Fuente de flúor (ácido fluorhídrico), fundente en acero y vidrio, fabricación de lentes ópticas, joyería.",
    genesis: "Rocas sedimentarias, ígneas, filones hidrotermales.",
    yacimientosPuna: ["Presente en varios yacimientos de la región."],
    otros: 'Su nombre viene del latín "fluere" (fluir) por su facilidad para fundirse.'
  },
  // Minerales del Word (actualizados y añadidos)
  {
    id: "pirita",
    img: "/minerales/pirita.png",
    nombre: "Pirita",
    desc: "Disulfuro de hierro con cristales cúbicos. Usada para ácido sulfúrico y asociada a depósitos de oro.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Cúbico",
    etimologia:
      "Del griego 'pyros' (fuego), por producir chispas al golpearse.",
    propiedadDiagnostica:
      "Cristales cúbicos estriados, quebradiza, polvo negruzco.",
    importanciaEconomica:
      "Extrae oro/cobre asociado; fuente de azufre para ácido sulfúrico.",
    genesis: "Rocas ígneas, sedimentarias, metamórficas; vetas hidrotermales.",
    yacimientosPuna: ["Taca Taca (Salta)", "Mina La Colorada (Salta)"],
    otros: "Llamada 'binches' por nativos de la Puna.",
  },
  {
    id: "calcopirita",
    img: "/minerales/calcopirita.png",
    nombre: "Calcopirita",
    desc: "Principal mineral de cobre, color amarillo latón y raya negra verdosa.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Tetragonal",
    etimologia: "Del griego 'chalkos' (cobre) + 'pirita'.",
    propiedadDiagnostica:
      "Más blanda que el acero, frágil, color amarillo intenso.",
    importanciaEconomica: "Mena principal de cobre (Cu).",
    genesis: "Pórfidos cupríferos, vetas hidrotermales, skarn.",
    yacimientosPuna: ["Taca Taca (Salta)", "Diablillos (Salta)"],
    otros: "",
  },
  {
    id: "tetraedrita",
    img: "/minerales/tetraedrita.png",
    nombre: "Tetraedrita",
    desc: "Sulfosal común en vetas epitermales, fuente de plata en su variedad 'freibergita'.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Cúbico",
    etimologia: "Por su forma tetraédrica (Haidinger, 1845).",
    propiedadDiagnostica:
      "Color gris acero, raya negra grisácea, cristales tetraédricos.",
    importanciaEconomica: "Contiene hasta 18% plata (Ag) en la freibergita.",
    genesis: "Vetas epitermales (fluidos hidrotermales de baja temperatura).",
    yacimientosPuna: ["Mina La Concordia (Salta)", "El Quévar (Salta)"],
    otros: "",
  },
  {
    id: "galena",
    img: "/minerales/galena.png",
    nombre: "Galena",
    desc: "Principal mena de plomo, con frecuente contenido de plata.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Cúbico",
    etimologia: "Del latín 'galena' (mena de plomo).",
    propiedadDiagnostica: "Clivaje cúbico perfecto, peso específico elevado.",
    importanciaEconomica:
      "Usos en baterías, soldaduras, y protección radiológica.",
    genesis: "Yacimientos hidrotermales, tipo VMS y SEDEX.",
    yacimientosPuna: ["Mina Pirquitas (Jujuy)", "Mina La Concordia (Salta)"],
    otros: "",
  },
  {
    id: "estibinita",
    img: "/minerales/estibinita.png",
    nombre: "Estibinita",
    desc: "Fuente principal de antimonio, con hábito hojoso y exfoliación perfecta.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Rómbico",
    etimologia: "Del griego antiguo para 'antimonio'.",
    propiedadDiagnostica: "Baja dureza, raya negra, exfoliación perfecta.",
    importanciaEconomica:
      "Usado en retardantes de fuego, baterías y metalurgia.",
    genesis: "Soluciones hidrotermales de baja temperatura.",
    yacimientosPuna: ["Mina Victoria (Salta)"],
    otros: "",
  },
  {
    id: "esfalerita",
    img: "/minerales/esfalerita.png",
    nombre: "Esfalerita",
    desc: "Principal mena de zinc, con brillo resinoso y clivaje perfecto.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Cúbico",
    etimologia: "Del alemán 'blenden' (ofuscar, por confundirse con galena).",
    propiedadDiagnostica: "Brillo resinoso, clivaje perfecto, color variable.",
    importanciaEconomica: "Galvanizado de hierro, baterías, farmacéuticos.",
    genesis: "Vetas hidrotermales, yacimientos VMS y SEDEX.",
    yacimientosPuna: ["Mina Pirquitas (Jujuy)", "Mina La Concordia (Salta)"],
    otros: "",
  },
  {
    id: "malaquita",
    img: "/minerales/malaquita.png",
    nombre: "Malaquita",
    desc: "Carbonato de cobre verde, usado como ornamental y gema.",
    clase: "Clase V (Carbonatos y Nitratos)",
    sistemaCristalografico: "Monoclínico",
    etimologia: "Del griego 'malache' (malva, por su color).",
    propiedadDiagnostica: "Color verde brillante, efervescencia con HCl.",
    importanciaEconomica: "Piedra ornamental y gema.",
    genesis: "Zonas de oxidación de sulfuros de cobre.",
    yacimientosPuna: ["Aguas Amargas (Salta)", "Los Colorados (Salta)"],
    otros: "",
  },
  {
    id: "azurita",
    img: "/minerales/azurita.png",
    nombre: "Azurita",
    desc: "Carbonato de cobre azul, usado como pigmento y ornamental.",
    clase: "Clase V (Carbonatos y Nitratos)",
    sistemaCristalografico: "Monoclínico",
    etimologia: "Del persa por su color azul.",
    propiedadDiagnostica: "Azul marino, efervescencia con HCl.",
    importanciaEconomica: "Piedra ornamental y pigmento.",
    genesis: "Zonas de oxidación de sulfuros de cobre.",
    yacimientosPuna: ["Aguas Amargas (Salta)", "Los Colorados (Salta)"],
    otros: "",
  },
  {
    id: "bornita",
    img: "/minerales/bornita.png",
    nombre: "Bornita",
    desc: "Sulfuro de cobre con iridiscencia púrpura ('pecho de paloma').",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Tetragonal",
    etimologia: "En honor a Ignatius von Born (mineralogista austríaco).",
    propiedadDiagnostica: "Color bronce fresco, iridiscencia púrpura.",
    importanciaEconomica: "Mena de cobre (Cu).",
    genesis: "Vetas hidrotermales, pórfidos cupríferos.",
    yacimientosPuna: ["Taca Taca (Salta)", "Diablillos (Salta)"],
    otros: "",
  },
  {
    id: "platas_rojas",
    img: "/minerales/platas_rojas.png",
    nombre: "Platas Rojas (Proustita y Pirargirita)",
    desc: "Sulfosales de plata con color rojo intenso y alto contenido de plata.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Trigonal",
    etimologia:
      "Proustita (por J.L. Proust), Pirargirita (del griego 'Ag' + 'fuego').",
    propiedadDiagnostica:
      "Color rojo bermellón (proustita) o rojo oscuro (pirargirita).",
    importanciaEconomica: "Fuente de plata (Ag).",
    genesis: "Fluidos hidrotermales epitermales.",
    yacimientosPuna: ["Mina Pirquitas (Jujuy)", "El Quevar (Salta)"],
    otros: "En Bolivia llamadas 'rosicleres' o 'canutillos'.",
  },
  {
    id: "oro",
    img: "/minerales/oro.png",
    nombre: "Oro",
    desc: "Metal precioso maleable, usado en joyería y reservas monetarias.",
    clase: "Clase I (Elementos)",
    sistemaCristalografico: "Cúbico",
    etimologia: "Del latín 'aurum' (brillante).",
    propiedadDiagnostica:
      "Color amarillo oro, maleabilidad, alto peso específico.",
    importanciaEconomica: "Joyería, electrónica, reservas financieras.",
    genesis: "Vetas epitermales, placeres aluviales.",
    yacimientosPuna: ["Mina Lindero (Salta)", "Diablillos (Salta)"],
    otros: "",
  },
  {
    id: "plata",
    img: "/minerales/plata.png",
    nombre: "Plata",
    desc: "Metal noble usado en fotografía, electrónica y aleaciones.",
    clase: "Clase I (Elementos)",
    sistemaCristalografico: "Cúbico",
    etimologia: "Conocida desde la antigüedad.",
    propiedadDiagnostica: "Color blanco plata, maleable, alto peso específico.",
    importanciaEconomica: "Emulsiones fotográficas, electrónica, aleaciones.",
    genesis: "Soluciones hidrotermales con sulfuros de plata.",
    yacimientosPuna: ["Mina Pirquitas (Jujuy)", "El Quevar (Salta)"],
    otros: "",
  },
  {
    id: "cobre",
    img: "/minerales/cobre.png",
    nombre: "Cobre",
    desc: "Metal rojizo esencial para conductores eléctricos y aleaciones.",
    clase: "Clase I (Elementos)",
    sistemaCristalografico: "Cúbico",
    etimologia: "Conocido desde la antigüedad.",
    propiedadDiagnostica: "Color rojo cobre, fractura astillosa, maleable.",
    importanciaEconomica: "Cables eléctricos, industria automotriz, militar.",
    genesis: "Zonas oxidadas de depósitos de cobre.",
    yacimientosPuna: ["Taca Taca (Salta)", "Río Grande (Salta)"],
    otros: "Popular en coleccionismo.",
  },
  // Mineral original del array no presente en el Word
  // REEMPLAZA EL OBJETO 'ulexita' ANTIGUO POR ESTE NUEVO

{
  id: "ulexita",
  img: "/ulexite.jfif",
  nombre: "Ulexita",
  desc: "Conocida como la 'piedra televisión' por su capacidad de transmitir imágenes a través de sus fibras ópticas naturales. Es una fuente importante de boro para la agricultura y la industria.",
  clase: "Boratos",
  composicion: "Borato de sodio y calcio hidratado (NaCaB₅O₉·8H₂O).",
  sistemaCristalografico: "Triclínico",
  propiedadDiagnostica: "Hábito fibroso, efecto de fibra óptica ('televisión'), baja dureza, color blanco a grisáceo.",
  importanciaEconomica: "Fuente de boro para fertilizantes de liberación lenta, industria cerámica (esmaltes), aislamientos térmicos y acústicos.",
  genesis: "Evaporítico, formado en salares y playas de lagos boratados en climas áridos.",
  otros: "Su estructura fibrosa es la que permite el curioso fenómeno óptico que le da su apodo."
},
];

const mineralesPuna = [
  {
    id: "sal",
    img: "/sal.jfif",
    nombre: "Sal (Halita)",
    desc: "Componente esencial en la alimentación, la sal común o halita es abundante en los salares de la Puna, formándose por la evaporación de antiguas lagunas.",
    clase: "Haluros",
    composicion: "Cloruro de sodio (NaCl)",
    sistemaCristalografico: "Cúbico",
    propiedadDiagnostica: "Sabor salado, alta solubilidad en agua, clivaje cúbico perfecto.",
    importanciaEconomica: "Alimentación, conservación de alimentos, industria química.",
    genesis: "Evaporítico, formado en salares y cuencas marinas cerradas.",
  },
  {
    id: "pomez",
    img: "/pomez.jfif",
    nombre: "Piedra Pómez",
    desc: "Roca volcánica extremadamente porosa y ligera, formada por el enfriamiento rápido de lava rica en gases. A menudo, puede flotar en el agua.",
    clase: "Roca Ígnea Volcánica (no es un mineral)",
    composicion: "Vidrio volcánico de composición ácida (riolítica).",
    propiedadDiagnostica: "Muy ligera, alta porosidad (vesicular), textura abrasiva.",
    importanciaEconomica: "Abrasivo industrial, cosmética (exfoliante), horticultura (mejora de sustratos), construcción ligera.",
    genesis: "Erupciones volcánicas explosivas.",
  },
  {
    id: "onix",
    img: "/onix.jfif",
    nombre: "Ónix Calcáreo",
    desc: "Variedad de caliza bandeada y translúcida, muy apreciada como piedra ornamental para decoración y arquitectura de lujo.",
    clase: "Roca Sedimentaria Química (no es un mineral)",
    composicion: "Carbonato de calcio (CaCO3), principalmente aragonito.",
    propiedadDiagnostica: "Bandas de colores concéntricas, translucidez, reacciona con ácido.",
    importanciaEconomica: "Piedra ornamental, revestimientos, esculturas, joyería.",
    genesis: "Precipitación química en aguas termales o cuevas (travertino).",
  },
  {
    id: "yeso",
    img: "/yeso.jfif",
    nombre: "Yeso",
    desc: "Mineral muy blando que se forma en ambientes evaporíticos. Es la materia prima para la fabricación de escayola y paneles de yeso (Durlock).",
    clase: "Sulfatos",
    composicion: "Sulfato cálcico dihidratado (CaSO₄·2H₂O)",
    sistemaCristalografico: "Monoclínico",
    propiedadDiagnostica: "Muy blando (se raya con la uña), exfoliación perfecta.",
    importanciaEconomica: "Construcción (placas de yeso, revoques), agricultura (acondicionador de suelos), moldes.",
    genesis: "Evaporítico, precipitado de aguas ricas en sulfato de calcio.",
  },
  {
    id: "litio",
    img: "/litio.jfif",
    nombre: "Litio (en Salmuera)",
    desc: "El metal más ligero, no se encuentra como mineral nativo sino disuelto en salmueras dentro de los salares. Es un recurso estratégico para la transición energética.",
    clase: "Elemento (contenido en salmuera)",
    composicion: "Iones de Litio (Li+) en solución acuosa salina.",
    propiedadDiagnostica: "Se identifica por análisis químico de la salmuera.",
    importanciaEconomica: "Baterías recargables (vehículos eléctricos, electrónica), cerámica, vidrio, grasas lubricantes.",
    genesis: "Lixiviación de rocas volcánicas y concentración por evaporación en cuencas endorreicas (salares).",
  },
    {
    id: "ulexita",
    img: "/ulexite.jfif",
    nombre: "Ulexita",
    desc: "Conocida como la 'piedra televisión' por su capacidad de transmitir imágenes a través de sus fibras ópticas naturales. Es una fuente importante de boro.",
    clase: "Boratos",
    composicion: "Borato de sodio y calcio hidratado.",
    sistemaCristalografico: "Triclínico",
    propiedadDiagnostica: "Hábito fibroso, efecto de fibra óptica, baja dureza.",
    importanciaEconomica: "Fuente de boro para fertilizantes de liberación lenta, industria cerámica y de vidrio.",
    genesis: "Evaporítico, formado en salares y playas de lagos boratados.",
  },
];

export const SalaMinerologiaMineria = () => {
  const fileInputRef = useRef(null);

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
  };

  return (
    <div className="sala-minerologia-container">
      {/* Input oculto para cámara */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        aria-hidden="true"
      />

      <h3 className="ramal-timeline-titulo">
        {/* Título estilizado por CSS */}
        Minerología y Minería
      </h3>
      <p className="sala-minerologia-intro">
        Desde las profundidades del planeta hasta la superficie de las montañas,
        los minerales forman parte esencial del mundo que habitamos. Cada uno
        encierra una historia sobre su origen, su composición y su relación con
        nuestras vidas. Te invitamos a explorar la colección de minerales del
        museo, compuesta por ejemplares representativos de nuestra región y de
        otras partes del mundo. Para facilitar su comprensión, los agrupamos en
        dos grandes categorías: <br />
        <span className="viñeta">•</span> Minerales metalíferos, como el cobre,
        el oro, la plata o el hierro, que contienen metales y son fundamentales
        para la industria, la tecnología y la energía. <br />
        <span className="viñeta">•</span> Minerales no metalíferos, como el
        cuarzo, la sal o el yeso, valorados por sus propiedades físicas o
        químicas, con usos diversos en la vida cotidiana. También destacan
        minerales como el litio y los boratos, extraídos en ambientes salinos de
        la Puna. Estos recursos estratégicos son clave en la transición
        energética y en la fabricación de nuevas tecnologías. A lo largo del
        recorrido, encontrarás piezas señalizadas con códigos QR. Escaneándolos
        con tu dispositivo móvil, podrás acceder a contenidos en realidad
        aumentada para observar detalles de su estructura o características.
      </p>
      <h1 className="sala-minerologia-titulo">Explora la colección</h1>
      <p className="sala-minerologia-intro">
        Tipos de Minerales Comunes en la Región Andina de Argentina
      </p>

      {/* Sección 1: Minerales Corteza */}
      <section className="seccion-minerales">
        <h2 className="sala-minerologia-subtitulo">Minerales</h2>
        <div className="minerales-grid">
          {mineralesCorteza.map((mineral, index) => (
            // *** INICIO: MODIFICAR EL CONTENIDO DE SalaContenidoItem o su estructura ***
            // Si SalaContenidoItem es muy rígido, puedes reemplazarlo por esta estructura:
            <article key={mineral.id} className="mineral-card"> {/* <-- Usa la nueva clase .mineral-card */}
              <div className="mineral-card-image-wrapper">
                <img
                  src={`${import.meta.env.BASE_URL}${mineral.img}`}
                  alt={mineral.nombre}
                  className="mineral-card-image"
                />
                {/* Botón QR sobre la imagen si se desea o en el contenido */}
                {index % 2 !== 0 && (
                  <button
                    className="qr-code-button mineral-qr-on-image" // Nueva clase para posicionamiento
                    onClick={(e) => handleQrClick(e)}
                    aria-label={`Escanear QR para ${mineral.nombre}`}
                    title={`Escanear QR para ${mineral.nombre}`}
                    type="button"
                  >
                    <QrcodeOutlined />
                  </button>
                )}
              </div>
              <div className="mineral-card-content">
                <h4 className="mineral-card-name">{mineral.nombre}</h4>
                <p className="mineral-card-description-main">{mineral.desc}</p>

                {(mineral.clase ||
                  mineral.sistemaCristalografico ||
                  mineral.etimologia ||
                  mineral.propiedadDiagnostica ||
                  mineral.importanciaEconomica ||
                  mineral.genesis ||
                  mineral.yacimientosPuna ||
                  mineral.otros) && (
                  <div className="mineral-card-extra-details">
                    {mineral.clase && (
                      <p className="mineral-detail-item">
                        <strong>Clase:</strong> {mineral.clase}
                      </p>
                    )}
                    {mineral.sistemaCristalografico && (
                      <p className="mineral-detail-item">
                        <strong>Sistema Cristal.:</strong>{" "}
                        {mineral.sistemaCristalografico}
                      </p>
                    )}
                    {mineral.etimologia && (
                      <p className="mineral-detail-item">
                        <strong>Etimología:</strong> {mineral.etimologia}
                      </p>
                    )}
                    {mineral.propiedadDiagnostica && (
                      <p className="mineral-detail-item">
                        <strong>Prop. Diagnóstica:</strong>{" "}
                        {mineral.propiedadDiagnostica}
                      </p>
                    )}
                    {mineral.importanciaEconomica && (
                      <p className="mineral-detail-item">
                        <strong>Importancia Econ.:</strong>{" "}
                        {mineral.importanciaEconomica}
                      </p>
                    )}
                    {mineral.genesis && (
                      <p className="mineral-detail-item">
                        <strong>Génesis:</strong> {mineral.genesis}
                      </p>
                    )}
                    {mineral.yacimientosPuna &&
                      mineral.yacimientosPuna.length > 0 && (
                        <p className="mineral-detail-item">
                          <strong>Yacimientos (Puna):</strong>{" "}
                          {mineral.yacimientosPuna.join(", ")}
                        </p>
                      )}
                      {mineral.composicion && (
                        <p className="mineral-detail-item">
                          <strong>Composición:</strong> {mineral.composicion}
                        </p>
                      )}
                      {mineral.sistemaCristalografico && (
                        <p className="mineral-detail-item">
                          <strong>Sistema Cristal.:</strong>{" "}
                          {mineral.sistemaCristalografico}
                        </p>
                      )}
                      {mineral.etimologia && (
                        <p className="mineral-detail-item">
                          <strong>Etimología:</strong> {mineral.etimologia}
                        </p>
                      )}
                      {mineral.propiedadDiagnostica && (
                        <p className="mineral-detail-item">
                          <strong>Prop. Diagnóstica:</strong>{" "}
                          {mineral.propiedadDiagnostica}
                        </p>
                      )}
                    {mineral.otros && (
                      <p className="mineral-detail-item">
                        <strong>Otros:</strong> {mineral.otros}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </article>
            // *** FIN: MODIFICACIÓN ***
          ))}
        </div>
      </section>

      {/* Sección 2: Riqueza Puna */}
      <section className="seccion-minerales">
        <h2 className="sala-minerologia-subtitulo">
          La riqueza minera de la Puna
        </h2>
        <p className="sala-minerologia-intro">
          Dependemos en buena parte de la Puna para sostener nuestra
          cotidianeidad.
        </p>
        {/* <img
          src={`${import.meta.env.BASE_URL}/salar.jfif`}
          alt="Paisaje de Salar en la Puna"
          className="salar-imagen-destacada"
        /> */}
        <div className="minerales-grid">
          {mineralesPuna.map((mineral, index) => (
            // *** INICIO: REEMPLAZAR SalaContenidoItem CON NUEVA ESTRUCTURA ***
            <article
              key={mineral.id}
              className={`mineral-card-modern ${
                mineral.reverse ? "item-reverse-visual-effect" : ""
              }`} // Aplicar nueva clase base
              // 'item-reverse-visual-effect' es opcional si quieres diferenciar visualmente
            >
              <div className="mineral-card-image-wrapper">
                <img
                  src={`${import.meta.env.BASE_URL}${mineral.img}`}
                  alt={mineral.nombre}
                  className="mineral-card-image"
                />
                {/* Botón QR (misma lógica de posicionamiento o ajuste) */}
                {index % 2 !== 0 && (
                  <button
                    className="qr-code-button mineral-qr-on-image"
                    onClick={(e) => handleQrClick(e)}
                    aria-label={`Escanear QR para ${mineral.nombre}`}
                    title={`Escanear QR para ${mineral.nombre}`}
                    type="button"
                  >
                    <QrcodeOutlined />
                  </button>
                )}
              </div>
              <div className="mineral-card-content">
                <h4 className="mineral-card-name">{mineral.nombre}</h4>
                {/* La descripción para mineralesPuna usa dangerouslySetInnerHTML, lo mantenemos */}
                <div
                  className="mineral-card-description-main puna-description" // Clase adicional para posible estilo específico
                  dangerouslySetInnerHTML={{ __html: mineral.desc }}
                ></div>
                {/* No hay 'mineral-card-extra-details' aquí porque mineralesPuna no los tiene */}
              </div>
            </article>
            // *** FIN: REEMPLAZO ***
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* =      NUEVA SECCIÓN: PROCESO DEL LITIO    = */}
      {/* ============================================ */}
      {/* <section className="seccion-proceso-litio">
        <h2 className="litio-titulo">
          ¿Cómo se obtiene y procesa el Litio de un Salar?
        </h2>
        
        <div className="litio-contenido">
          <p className="litio-text">
            Debajo de la costra de sal, el salar es como una esponja de sales
            embebida en salmuera con cloruro de sodio y otras sales disueltas
            como el litio, el magnesio o el potasio en concentraciones
            variables. Como la composición media de las salmueras es diferente
            para cada cuenca salina, el proceso de recuperación necesita
            “diseñarse a medida”.
          </p>
          <p className="litio-text">
            En el salar no hay agua dulce. La salmuera es el único líquido
            presente en él y no es apto para el consumo humano o agrícola, pero
            si le sirve a la industria. La cantidad total de sales en la
            salmuera a la temperatura ambiente (15 a 20°C) es 7 a 10 veces mayor
            que la del agua de mar.{" "}
          </p>
          <p className="litio-text">
            Para extraer la salmuera se hace perforaciones en el salar,
            bombeándola y llevándola por tuberías a piletas de evaporación. Su
            procesamiento consiste en imitar y/o acelerar el proceso natural
            hasta alcanzar una escala comercial adecuada. En las piletas se
            realiza el mismo proceso de evaporación que en la salina, pero en
            condiciones controladas para lograr una mayor concentración de litio
            y extraer las impurezas. Las impurezas, que son sales sin interés,
            son devueltas al salar, su lugar de origen.
          </p>
          <p className="litio-text">
            En este proceso no se consume energía, la salmuera se concentra al
            evaporarse el agua por acción del sol y del viento. Es exactamente
            igual que lo que sucede naturalmente en la salina, pero en las
            piletas se realiza bajo control técnico, evitando que el litio
            precipite y se convierta en irrecuperable.
          </p>
          <p className="litio-text">
            Como en el ciclo natural del agua que ocurrió durante miles de años
            en los salares, el agua se evapora, se condensa en las nubes,
            precipita, se infiltra o escurre, a veces llega al mar.{" "}
          </p>
          <p className="litio-text">
            Las únicas sustancias que se agregan a la salmuera en un proceso
            convencional de extracción son cal y sulfato de sodio (ambos
            inocuos) en muy pequeñas cantidades. Luego de este proceso la
            salmuera rica en litio y libre de impurezas es transportada a una
            planta industrial para fabricar en la mayoría de los casos Carbonato
            o Cloruro de Litio, a través de un proceso químico que debe
            adaptarse a las características de cada salmuera extraída.
          </p>
        </div>
      </section> */}
      {/* ============================================ */}
      {/* =       FIN NUEVA SECCIÓN LITIO            = */}
      {/* ============================================ */}
    </div>
  );
};
