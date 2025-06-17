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
    desc: `Clase: Carbonatos. 
Composición: Principalmente carbonato de calcio (CaCO3). 
Sistema cristalográfico: Trigonal. 
Etimología: Del latín "calx", que significa cal viva. 
Propiedad diagnóstica: Efervescencia ante el ácido clorhídrico (HCl). 
Importancia económica y usos:
Construcción: Principal componente del cemento y la cal. 
Industria papelera: Material de relleno y recubrimiento. 
Industria de plásticos: Aditivo y material de relleno. 
Industria del vidrio: Reduce la temperatura de fusión y mejora propiedades ópticas. 
Tratamiento de agua: Reduce sólidos y mejora la calidad. 
Fertilizantes, metales, caucho, pinturas. 
Génesis:
Sedimentaria: Formación por precipitación en soluciones acuosas. 
Biológica: Componente de conchas y eskeletos de organismos. 
Metamórfica: En mármoles. 
Ejemplos de yacimientos en la Puna:
Yacimientos sedimentarios en rocas calcáreas y dolomías. 
Yacimientos metamórficos en mármoles. 
Otros datos de interés:
Puede encontrarse en diferentes colores (incolora, blanca, gris, etc.). 
Su dureza en la escala de Mohs es de 3. 
Puede presentar birrefringencia (doble imagen). 
En la Puna, puede ser conocida localmente como "cal viva" o "piedra de cal". `,
  },
  {
    id: "fluorita",
    img: "/fluorita.png",
    nombre: "Fluorita",
    desc: `La fluorita es un mineral de fórmula química CaF₂ (fluoruro de calcio), conocido por su amplia gama de colores y por ser una fuente importante de flúor. Se caracteriza por su dureza de 4 en la escala de Mohs, exfoliación perfecta en forma de octaedro y por su brillo vítreo. 
Propiedades y Características:
Sistema cristalino:
Isométrico, formando cristales cúbicos o octaédricos. 
Colores:
Puede ser incolora, pero también presenta una variedad de colores como violeta, verde, amarillo, azul, rosa, debido a impurezas o trazas de otros minerales. 
Fluorescencia:
Brilla bajo luz ultravioleta, lo que le da su nombre (de "fluere", "fluir" en latín, por su facilidad para fundirse). 
Usos industriales:
Principalmente como fuente de flúor, en la producción de ácido fluorhídrico, como fundente en la producción de acero y vidrio, y en la fabricación de lentes ópticas. 
Formación y Distribución:
Se forma en rocas sedimentarias e ígneas, en filones hidrotermales, pegmatitas y grietas alpinas.
Yacimientos importantes: Canadá, Estados Unidos, China, Sudáfrica, México, Perú, Tailandia, Polonia, República Checa, Hungría, Noruega, Inglaterra, España, Alemania. 
Usos y Aplicaciones:
Industria: Principalmente como fuente de flúor, para la producción de ácido fluorhídrico, como fundente en la producción de acero y vidrio, y en la fabricación de lentes ópticas. 
Ornamental: Se utiliza en joyería y como pieza decorativa. 
Cristaloterapia: Se cree que tiene propiedades calmantes y relajantes, y que puede ayudar a equilibrar las emociones. 
En resumen, la fluorita es un mineral versátil con aplicaciones industriales, ornamentales y, en algunos casos, terapéuticas, reconocido por su color y capacidad para fluorescer. `,
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
  {
    id: "ulexita",
    img: "/ulexite.jfif",
    nombre: "Ulexita",
    desc: `Características generales:
Composición:
La ulexita es un borato de sodio y calcio hidratado, de fórmula Na₂B₅O₈(OH)₄·3H₂O. 
Apariencia:
Generalmente se presenta en forma granular, de color grisáceo, con un tamaño de partícula de 2-4 mm. 
Propiedades:
Es un producto inodoro, de bajo peso específico y una liberación lenta de boro. 
Contenido de Boro:
La ulexita natural suele tener un contenido de boro del 10-15%, pudiendo variar según la fuente y el proceso de granulación. 
Usos principales:
Fertilizante:
Se utiliza como fuente de boro de liberación lenta en cultivos, especialmente en suelos arenosos. 
Industria Cerámica:
Se emplea como materia prima en la fabricación de esmaltes y frías cerámicas, aportando boro, sodio y calcio. 
Aislamiento:
Se utiliza en la producción de aislamientos térmicos y acústicos en la construcción y la industria automotriz. 
Otras aplicaciones:
En la industria de la refinería de oro, en la producción de ácido bórico y bórax, y como agente de liberación lenta en otros procesos. 
Beneficios:
Libreción lenta de boro: Su baja solubilidad la hace ideal para aplicaciones agrícolas, donde se necesita una liberación gradual de boro. 
Mejora la estructura del suelo: Puede ayudar a retener agua y mejorar la aireación del suelo. 
Ajusta el pH del suelo: Puede elevar el pH en suelos ácidos. 
Aumenta la calidad de los cultivos: Garantiza un suministro adecuado de boro, un nutriente esencial para el desarrollo de los cultivos. 
Consideraciones adicionales:
La ulexita granular 2-4 mm es una opción popular para aplicaciones agrícolas debido a su fácil aplicación y distribución uniforme. 
La liberación de boro de la ulexita puede variar según el tipo de suelo y las condiciones ambientales. 
Existen diferentes marcas y presentaciones de ulexita, como la ulexita natural y la ulexita granular, con diferentes porcentajes de boro. `,
  },
];

const mineralesPuna = [
  {
    id: "sal",
    img: "/sal.jfif",
    nombre: "Sal",
    desc: `Aunque muchos no lo sepan, en casi todos los hogares de Argentina hay algo proveniente de la Puna. Literalmente nos comemos un pedacito de Puna todos los días cuando ingerimos la sal común.
           La sal es un mineral común, científicamente conocido como cloruro de sodio (NaCl). Se caracteriza por ser un compuesto iónico con estructura cristalina cúbica, altamente soluble en agua y con un sabor salado característico. Además de sodio y cloro, algunas sales contienen otros minerales como magnesio, calcio y potasio. 
Características principales de la sal:
Composición química: Principalmente cloruro de sodio (NaCl). 
Estructura cristalina: Forma cubos o cristales. 
Solubilidad: Alta solubilidad en agua. 
Sabor: Salado, distintivo de la sal. 
Color: Generalmente blanco, pero puede variar a rojo, amarillo, rosa o azul. 
Brillo: Vítreo. 
Dureza: Baja dureza, se puede raspar fácilmente con un cuchillo. 
Aplicaciones: Uso en la alimentación, como conservante, en la industria y como materia prima para la producción de otros productos.
    `,
  },
  {
    id: "pomez",
    img: "/pomez.jfif",
    nombre: "Piedra Pómez",
    desc: `Muchas personas se frotan la piel con lava ácida eruptada violentamente por antiquísimos volcanes: la llamamos piedra pómez.
    La piedra pómez es una roca volcánica extrusiva, ligera y muy porosa, que se forma cuando la lava rica en gases se enfría rápidamente. Su principal característica es su extrema ligereza, que permite que la mayoría de los fragmentos floten en el agua. 

Características:
Textura:
Vesicular, con numerosas cavidades (vesículas) de tamaño variable (desde 1 mm hasta más de 1 cm). 
Ligereza:
Muy ligera, con densidades entre 0,4 y 0,9 g/cm3, lo que permite que flote en el agua. 
Porosidad:
Alta porosidad, alrededor del 90%, debido a las numerosas vesículas internas. 
Color:
Puede variar desde el blanco hasta el gris claro y el marrón tostado. 
Aislamiento térmico:
Es un buen aislante térmico gracias a sus vesículas, que atrapan aire. 
Abrasividad:
Tiene una textura abrasiva, lo que la convierte en un buen material para exfoliar la piel.
    `,
    reverse: true,
  },
  {
    id: "onix",
    img: "/onix.jfif",
    nombre: "Ónix",
    desc: `El ónix, o mármol ónix, es una piedra semipreciosa de la familia de las calcedonias, conocida por su translucidez y elegancia. Es una roca natural con características técnicas que la hacen ideal para aplicaciones decorativas y de construcción, especialmente en espacios de lujo.

Características Técnicas del ónix:
Dureza:
Entre 6.5 y 7 en la escala de Mohs, lo que lo hace resistente pero menos que otras piedras como el diamante. 
Composición: principalmente por dióxido de silicio (SiO2), lo que le confiere su dureza y resistencia. 
Color:
Puede variar en una amplia gama de colores, incluyendo negro, blanco, rojo, verde, gris, amarillo y azul, así como patrones jaspeados o veteados. 
Densidad: es de aprox.2.6 a 2.7 g/cm³. 
Uso:
Se utiliza en decoración, joyeros, arquitectura, entre otros`,
  },
  {
    id: "yeso",
    img: "/yeso.jfif",
    nombre: "Yeso",
    desc: `El yeso es un mineral común, un sulfato cálcico hidratado (CaSO4·2H2O), 

Características principales del yeso:
Composición química: Sulfato cálcico dihidratado (CaSO4·2H2O). 
Color: Incoloro, blanco, pero puede ser gris, marrón, rojizo o amarillento debido a impurezas. 
Brillo: Vítreo o sedoso en los cristales, nacarado en las superficies de exfoliación. 
Dureza: Muy blanda, 1.5-2 en la escala de Mohs. 
Exfoliación: Perfecta en una dirección (a menudo perpendicular a la orientación de las fibras). 
Densidad: 2.31-2.33 g/cm³. 
Solubilidad: Soluble en agua. 
Formación: Se forma por precipitación directa en ambientes evaporíticos o por hidratación de la anhidrita. 
Hábito cristalino: Monoclínico. 
Usos: En la construcción, en la medicina (moldes de yeso), en la producción de escayola, entre otros. El yeso es un mineral común, un sulfato cálcico hidratado (CaSO4·2H2O), caracterizado por su suavidad, exfoliación perfecta y solubilidad en agua. Su color suele ser incoloro o blanco, pero puede presentar variaciones debido a impurezas, como arcilla, óxido de hierro o sílice. 
Características principales del yeso:
Composición química: Sulfato cálcico dihidratado (CaSO4·2H2O). 
Color: Incoloro, blanco, pero puede ser gris, marrón, rojizo o amarillento debido a impurezas. 
Brillo: Vítreo o sedoso en los cristales, nacarado en las superficies de exfoliación. 
Dureza: Muy blanda, 1.5-2 en la escala de Mohs. 
Exfoliación: Perfecta en una dirección (a menudo perpendicular a la orientación de las fibras). 
Densidad: 2.31-2.33 g/cm³. 
Solubilidad: Soluble en agua. 
Formación: Se forma por precipitación directa en ambientes evaporíticos o por hidratación de la anhidrita. 
Hábito cristalino: Monoclínico. 
Usos: En la construcción, en la medicina (moldes de yeso), en la producción de escayola, entre otros.`,
    reverse: true,
  },
  {
    id: "litio",
    img: "/litio.jfif",
    nombre: "Litio",
    desc: `El litio es un mineral metálico alcalino de color blanco-plateado, conocido por ser el más ligero de todos los metales y por su alta capacidad de almacenar energía. Es un elemento químico muy reactivo, blando y maleable, utilizado principalmente en baterías recargables y en la producción de ciertos tipos de cerámica y vidrio. 
Características generales del litio:
Metal blando y plateado:
El litio es un metal fácilmente cortable con un cuchillo y de color blanco plateado. 
Densidad baja:
Es el metal más ligero que existe, con una densidad menor que la del agua, lo que significa que flota en ella. 
Alta reactividad química:
Reacciona con el agua, liberando hidrógeno y formando hidróxido de litio. 
Bajo punto de fusión:
El litio se funde a una temperatura relativamente baja (180.5 °C). 
Conductividad eléctrica:
Es un buen conductor de electricidad, lo que lo convierte en un elemento importante en la fabricación de baterías. 
Propiedades únicas para almacenamiento de energía:
El litio tiene una alta capacidad de almacenar energía, lo que lo convierte en un componente esencial en baterías recargables, especialmente para vehículos eléctricos. 
Uso en aleaciones:
Se utiliza en aleaciones para mejorar la conductividad térmica y la resistencia.
    `,
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
            <article key={mineral.id} className="mineral-card-modern">
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
