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
    img: "/calcita.jfif",
    nombre: "Calcita",
    desc: "Mineral abundante compuesto por carbonato de calcio. Presente en formaciones sedimentarias, se usa en construcción y decoración.",
  },
  {
    id: "fluorita",
    img: "/fluorita.jfif",
    nombre: "Fluorita",
    desc: "De vivos colores y fluorescencia, es usada en óptica e industrias metalúrgicas. Común en yacimientos hidrotermales del NOA.",
  },
  // Minerales del Word (actualizados y añadidos)
  {
    id: "pirita",
    img: "/minerales/pirita.jpeg",
    nombre: "Pirita",
    desc: "Disulfuro de hierro con cristales cúbicos. Usada para ácido sulfúrico y asociada a depósitos de oro.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Cúbico",
    etimologia: "Del griego 'pyros' (fuego), por producir chispas al golpearse.",
    propiedadDiagnostica: "Cristales cúbicos estriados, quebradiza, polvo negruzco.",
    importanciaEconomica: "Extrae oro/cobre asociado; fuente de azufre para ácido sulfúrico.",
    genesis: "Rocas ígneas, sedimentarias, metamórficas; vetas hidrotermales.",
    yacimientosPuna: ["Taca Taca (Salta)", "Mina La Colorada (Salta)"],
    otros: "Llamada 'binches' por nativos de la Puna."
  },
  {
    id: "calcopirita",
    img: "/minerales/calcopirita.jpeg",
    nombre: "Calcopirita",
    desc: "Principal mineral de cobre, color amarillo latón y raya negra verdosa.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Tetragonal",
    etimologia: "Del griego 'chalkos' (cobre) + 'pirita'.",
    propiedadDiagnostica: "Más blanda que el acero, frágil, color amarillo intenso.",
    importanciaEconomica: "Mena principal de cobre (Cu).",
    genesis: "Pórfidos cupríferos, vetas hidrotermales, skarn.",
    yacimientosPuna: ["Taca Taca (Salta)", "Diablillos (Salta)"],
    otros: ""
  },
  {
    id: "tetraedrita",
    img: "/minerales/tetraedrita.jpeg",
    nombre: "Tetraedrita",
    desc: "Sulfosal común en vetas epitermales, fuente de plata en su variedad 'freibergita'.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Cúbico",
    etimologia: "Por su forma tetraédrica (Haidinger, 1845).",
    propiedadDiagnostica: "Color gris acero, raya negra grisácea, cristales tetraédricos.",
    importanciaEconomica: "Contiene hasta 18% plata (Ag) en la freibergita.",
    genesis: "Vetas epitermales (fluidos hidrotermales de baja temperatura).",
    yacimientosPuna: ["Mina La Concordia (Salta)", "El Quévar (Salta)"],
    otros: ""
  },
  {
    id: "galena",
    img: "/minerales/galena.jpeg",
    nombre: "Galena",
    desc: "Principal mena de plomo, con frecuente contenido de plata.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Cúbico",
    etimologia: "Del latín 'galena' (mena de plomo).",
    propiedadDiagnostica: "Clivaje cúbico perfecto, peso específico elevado.",
    importanciaEconomica: "Usos en baterías, soldaduras, y protección radiológica.",
    genesis: "Yacimientos hidrotermales, tipo VMS y SEDEX.",
    yacimientosPuna: ["Mina Pirquitas (Jujuy)", "Mina La Concordia (Salta)"],
    otros: ""
  },
  {
    id: "estibinita",
    img: "/minerales/estibinita.jpeg",
    nombre: "Estibinita",
    desc: "Fuente principal de antimonio, con hábito hojoso y exfoliación perfecta.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Rómbico",
    etimologia: "Del griego antiguo para 'antimonio'.",
    propiedadDiagnostica: "Baja dureza, raya negra, exfoliación perfecta.",
    importanciaEconomica: "Usado en retardantes de fuego, baterías y metalurgia.",
    genesis: "Soluciones hidrotermales de baja temperatura.",
    yacimientosPuna: ["Mina Victoria (Salta)"],
    otros: ""
  },
  {
    id: "esfalerita",
    img: "/minerales/esfalerita.jpeg",
    nombre: "Esfalerita",
    desc: "Principal mena de zinc, con brillo resinoso y clivaje perfecto.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Cúbico",
    etimologia: "Del alemán 'blenden' (ofuscar, por confundirse con galena).",
    propiedadDiagnostica: "Brillo resinoso, clivaje perfecto, color variable.",
    importanciaEconomica: "Galvanizado de hierro, baterías, farmacéuticos.",
    genesis: "Vetas hidrotermales, yacimientos VMS y SEDEX.",
    yacimientosPuna: ["Mina Pirquitas (Jujuy)", "Mina La Concordia (Salta)"],
    otros: ""
  },
  {
    id: "malaquita",
    img: "/minerales/malaquita.jpeg",
    nombre: "Malaquita",
    desc: "Carbonato de cobre verde, usado como ornamental y gema.",
    clase: "Clase V (Carbonatos y Nitratos)",
    sistemaCristalografico: "Monoclínico",
    etimologia: "Del griego 'malache' (malva, por su color).",
    propiedadDiagnostica: "Color verde brillante, efervescencia con HCl.",
    importanciaEconomica: "Piedra ornamental y gema.",
    genesis: "Zonas de oxidación de sulfuros de cobre.",
    yacimientosPuna: ["Aguas Amargas (Salta)", "Los Colorados (Salta)"],
    otros: ""
  },
  {
    id: "azurita",
    img: "/minerales/azurita.jpeg",
    nombre: "Azurita",
    desc: "Carbonato de cobre azul, usado como pigmento y ornamental.",
    clase: "Clase V (Carbonatos y Nitratos)",
    sistemaCristalografico: "Monoclínico",
    etimologia: "Del persa por su color azul.",
    propiedadDiagnostica: "Azul marino, efervescencia con HCl.",
    importanciaEconomica: "Piedra ornamental y pigmento.",
    genesis: "Zonas de oxidación de sulfuros de cobre.",
    yacimientosPuna: ["Aguas Amargas (Salta)", "Los Colorados (Salta)"],
    otros: ""
  },
  {
    id: "bornita",
    img: "/minerales/bornita.jpeg",
    nombre: "Bornita",
    desc: "Sulfuro de cobre con iridiscencia púrpura ('pecho de paloma').",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Tetragonal",
    etimologia: "En honor a Ignatius von Born (mineralogista austríaco).",
    propiedadDiagnostica: "Color bronce fresco, iridiscencia púrpura.",
    importanciaEconomica: "Mena de cobre (Cu).",
    genesis: "Vetas hidrotermales, pórfidos cupríferos.",
    yacimientosPuna: ["Taca Taca (Salta)", "Diablillos (Salta)"],
    otros: ""
  },
  {
    id: "platas_rojas",
    img: "/minerales/platas_rojas.jpeg",
    nombre: "Platas Rojas (Proustita y Pirargirita)",
    desc: "Sulfosales de plata con color rojo intenso y alto contenido de plata.",
    clase: "Clase II (Sulfuros y Sulfosales)",
    sistemaCristalografico: "Trigonal",
    etimologia: "Proustita (por J.L. Proust), Pirargirita (del griego 'Ag' + 'fuego').",
    propiedadDiagnostica: "Color rojo bermellón (proustita) o rojo oscuro (pirargirita).",
    importanciaEconomica: "Fuente de plata (Ag).",
    genesis: "Fluidos hidrotermales epitermales.",
    yacimientosPuna: ["Mina Pirquitas (Jujuy)", "El Quevar (Salta)"],
    otros: "En Bolivia llamadas 'rosicleres' o 'canutillos'."
  },
  {
    id: "oro",
    img: "/minerales/oro.jpeg",
    nombre: "Oro",
    desc: "Metal precioso maleable, usado en joyería y reservas monetarias.",
    clase: "Clase I (Elementos)",
    sistemaCristalografico: "Cúbico",
    etimologia: "Del latín 'aurum' (brillante).",
    propiedadDiagnostica: "Color amarillo oro, maleabilidad, alto peso específico.",
    importanciaEconomica: "Joyería, electrónica, reservas financieras.",
    genesis: "Vetas epitermales, placeres aluviales.",
    yacimientosPuna: ["Mina Lindero (Salta)", "Diablillos (Salta)"],
    otros: ""
  },
  {
    id: "plata",
    img: "/minerales/plata.jpeg",
    nombre: "Plata",
    desc: "Metal noble usado en fotografía, electrónica y aleaciones.",
    clase: "Clase I (Elementos)",
    sistemaCristalografico: "Cúbico",
    etimologia: "Conocida desde la antigüedad.",
    propiedadDiagnostica: "Color blanco plata, maleable, alto peso específico.",
    importanciaEconomica: "Emulsiones fotográficas, electrónica, aleaciones.",
    genesis: "Soluciones hidrotermales con sulfuros de plata.",
    yacimientosPuna: ["Mina Pirquitas (Jujuy)", "El Quevar (Salta)"],
    otros: ""
  },
  {
    id: "cobre",
    img: "/minerales/cobre.jpeg",
    nombre: "Cobre",
    desc: "Metal rojizo esencial para conductores eléctricos y aleaciones.",
    clase: "Clase I (Elementos)",
    sistemaCristalografico: "Cúbico",
    etimologia: "Conocido desde la antigüedad.",
    propiedadDiagnostica: "Color rojo cobre, fractura astillosa, maleable.",
    importanciaEconomica: "Cables eléctricos, industria automotriz, militar.",
    genesis: "Zonas oxidadas de depósitos de cobre.",
    yacimientosPuna: ["Taca Taca (Salta)", "Río Grande (Salta)"],
    otros: "Popular en coleccionismo."
  },
  // Mineral original del array no presente en el Word
  {
    id: "ulexita",
    img: "/ulexite.jfif",
    nombre: "Ulexita",
    desc: 'Llamada "piedra de la televisión", presente en salares del NOA.',
  }
];



const mineralesPuna = [
  {
    id: "sal",
    img: "/sal.jfif",
    nombre: "Salares (Sal)",
    desc: `Aunque muchos no lo sepan, en casi todos los hogares de Argentina hay algo proveniente de la Puna. Literalmente nos comemos un pedacito de Puna todos los días cuando ingerimos la sal común.`,
  },
  {
    id: "pomez",
    img: "/pomez.jfif",
    nombre: "Piedra Pómez",
    desc: `Muchas personas se frotan la piel con lava ácida eruptada violentamente por antiquísimos volcanes: la llamamos piedra pómez.`,
    reverse: true,
  },
  {
    id: "onix",
    img: "/onix.jfif",
    nombre: "Mármol Ónix",
    desc: `Esos ceniceros color verde y/o cabezas de caballos que adornan quietamente muchas casas son de mármol ónix.`,
  },
  {
    id: "yeso",
    img: "/yeso.jfif",
    nombre: "Yeso",
    desc: `No existe casa que no posea un cielorraso o pared de yeso.`,
    reverse: true,
  },
  {
    id: "litio",
    img: "/litio.jfif",
    nombre: "Litio",
    desc: `Las computadoras portátiles y otros muchos dispositivos móviles electrónicos funcionan gracias a baterías que contienen litio, mineral que se extrae de las salmueras que se hallan en nuestra Puna.`,
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

      <h1 className="sala-minerologia-titulo">Explora la colección</h1>
      <p className="sala-minerologia-intro">
        Tipos de Minerales Comunes en la Región Andina de Argentina
      </p>

      {/* Sección 1: Minerales Corteza */}
      <section className="seccion-minerales">
        <h2 className="sala-minerologia-subtitulo">
          Minerales
        </h2>
        <div className="minerales-grid">
          {mineralesCorteza.map((mineral, index) => (
            <SalaContenidoItem key={mineral.id} img={mineral.img}>
              {/* Contenedor interno relativo */}
              <div className="mineral-text-content">
                {index % 2 !== 0 && ( // Botón en impares (Fluorita, Pirita)
                  <button
                    className="qr-code-button"
                    onClick={(e) => handleQrClick(e)}
                    aria-label={`Escanear QR para ${mineral.nombre}`}
                    title={`Escanear QR para ${mineral.nombre}`}
                    type="button"
                  >
                    <QrcodeOutlined />
                  </button>
                )}
                
                {/* --- NUEVA ESTRUCTURA DEL CONTENIDO --- */}
                {/* Nombre del Mineral como título */}
                <h4 className="mineral-name">{mineral.nombre}</h4>
                {/* Descripción principal */}
                <p className="mineral-description">{mineral.desc}</p>

                {/* Div para los detalles extra (solo se renderiza si hay alguno) */}
                {(mineral.clase || mineral.sistemaCristalografico || mineral.etimologia || mineral.propiedadDiagnostica || mineral.importanciaEconomica || mineral.genesis || mineral.yacimientosPuna || mineral.otros) && (
                    <div className="mineral-extra-details">
                        {mineral.clase && <p className="mineral-detail-item"><strong>Clase:</strong> {mineral.clase}</p>}
                        {mineral.sistemaCristalografico && <p className="mineral-detail-item"><strong>Sistema Cristalografico:</strong> {mineral.sistemaCristalografico}</p>}
                        {mineral.etimologia && <p className="mineral-detail-item"><strong>Etimología:</strong> {mineral.etimologia}</p>}
                        {mineral.propiedadDiagnostica && <p className="mineral-detail-item"><strong>Propiedad Diagnóstica:</strong> {mineral.propiedadDiagnostica}</p>}
                        {mineral.importanciaEconomica && <p className="mineral-detail-item"><strong>Importancia Económica:</strong> {mineral.importanciaEconomica}</p>}
                        {mineral.genesis && <p className="mineral-detail-item"><strong>Génesis:</strong> {mineral.genesis}</p>}
                        {/* Mapear si yacimientos es un array */}
                        {mineral.yacimientosPuna && mineral.yacimientosPuna.length > 0 && (
                            <p className="mineral-detail-item"><strong>Yacimientos (Puna):</strong> {mineral.yacimientosPuna.join(', ')}</p>
                        )}
                        {mineral.otros && <p className="mineral-detail-item"><strong>Otros:</strong> {mineral.otros}</p>}
                    </div>
                )}
                 {/* --- FIN NUEVA ESTRUCTURA --- */}
              </div>
            </SalaContenidoItem>
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
        <img
          src={`${import.meta.env.BASE_URL}/salar.jfif`}
          alt="Paisaje de Salar en la Puna"
          className="salar-imagen-destacada"
        />
        <div className="minerales-grid">
          {mineralesPuna.map((mineral, index) => (
            <SalaContenidoItem
              key={mineral.id}
              img={mineral.img}
              // Pasamos la clase si existe en los datos
              className={mineral.reverse ? "item-reverse" : ""}
            >
              {/* Contenedor interno relativo */}
              <div className="mineral-text-content">
                {index % 2 !== 0 && ( // Botón en impares (Pómez, Yeso, Litio - ajusta si quieres otros)
                  <button
                    className="qr-code-button"
                    onClick={(e) => handleQrClick(e)}
                    aria-label={`Escanear QR para ${mineral.nombre}`}
                    title={`Escanear QR para ${mineral.nombre}`}
                    type="button"
                  >
                    <QrcodeOutlined />
                  </button>
                )}
                <p dangerouslySetInnerHTML={{ __html: mineral.desc }}></p>
              </div>
            </SalaContenidoItem>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* =      NUEVA SECCIÓN: PROCESO DEL LITIO    = */}
      {/* ============================================ */}
      <section className="seccion-proceso-litio">
        <h2 className="litio-titulo">
          ¿Cómo se obtiene y procesa el Litio de un Salar?
        </h2>
        {/* Opcional: Un ícono representativo */}
        {/* <div className="litio-icon">⚛️</div> */}
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
            {/* Corregido 'salmera' a 'sales en la salmuera' */}
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
            {/* Corregido 'l agua' a 'el agua' */}
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
      </section>
      {/* ============================================ */}
      {/* =       FIN NUEVA SECCIÓN LITIO            = */}
      {/* ============================================ */}
    </div>
  );
};
