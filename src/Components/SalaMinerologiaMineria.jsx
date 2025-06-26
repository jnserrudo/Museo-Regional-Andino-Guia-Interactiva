// SalaMinerologiaMineria.jsx (CON BOTÓN QR Y LÓGICA DE CÁMARA)
import React, { useRef } from "react"; // Importa useRef
import { SalaContenidoItem } from "./SalaContenidoItem"; // Asegúrate que la ruta sea correcta
import "../SalaMinerologiaMineria.css"; // Importa el CSS
import { QrcodeOutlined } from "@ant-design/icons"; // Importa el icono QR
import { border } from "@chakra-ui/react";

// AÑADE ESTAS IMPORTACIONES AL PRINCIPIO DEL ARCHIVO
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// --- Datos Organizados en Arrays ---

// REEMPLAZA TUS DOS ARRAYS ANTERIORES POR ESTE ÚNICO ARRAY
const minerales = [
  // Todos los minerales juntos en una sola lista
  {
    id: "pomez",
    img: ["/minerales_museo/0.1. piedra pomez 1.jpg", "/minerales_museo/0.1. piedra pomez 2.JPG", "/minerales_museo/0.1. piedra pomez.jpg"],
    nombre: "Piedra Pómez",
    tipo: "Roca ígnea volcánica (no es un mineral, sino una roca).",
    composicionQuimica:
      "Varía, pero suele contener SiO₂ (sílice) en altos porcentajes (hasta 70–75%) junto con óxidos de aluminio, potasio y sodio.",
    caracteristicas:
      "Textura vítrea y extremadamente porosa. Muy liviana; puede flotar en el agua. Se forma por el enfriamiento rápido de lava con alto contenido de gases, que quedan atrapados como burbujas.",
    usos: "Exfoliantes para la piel (cosmética). Abrasivos suaves (limpieza de metales, callos). Fabricación de bloques livianos de construcción. Agricultura: mejora la aireación de suelos.",
  },
  {
    id: "onix",
    img: ["/minerales_museo/0.2. Marmol_onix_verde-removebg-preview.png"],
    nombre: "Ónix (mármol ónix)",
    nombreTecnico: "Ónix calcáreo o ónyx de travertino.",
    composicion:
      "Principalmente carbonato de calcio (CaCO₃), con formas cristalinas de calcita y aragonita.",
    caracteristicas:
      "Apariencia translúcida con vetas suaves de distintos colores (verde, blanco, miel). Se forma por deposición de carbonatos a partir de aguas termales o cuevas. Es más frágil que otros mármoles.",
    usos: "Artesanías decorativas: figuras, ceniceros, lámparas. Revestimientos de interiores (paredes, mesas, lavabos). Joyería de baja escala (collares, pulseras).",
  },
  {
    id: "ulexita",
    img: ["/minerales_museo/0.3._Ulexita-removebg-preview.png", "/minerales_museo/0.3._Ulexite-Calcite-40061-removebg-preview.png"],
    nombre: "Ulexita",
    formulaQuimica: "NaCaB₅O₆(OH)₆·5H₂O (borato de sodio y calcio hidratado).",
    clase: "Boratos",
    caracteristicas:
      "Conocida como “piedra televisión” por su estructura de fibras paralelas que transmiten imágenes o luz de un lado al otro. Cristal blanco o transparente, con brillo sedoso. Se forma en ambientes evaporíticos (salares secos).",
    usos: "Fuente de boro, esencial en: Vidrios resistentes al calor (tipo Pyrex). Detergentes y blanqueadores. Fertilizantes y cerámica. Productos ópticos y de telecomunicaciones. Educación y coleccionismo por su efecto visual inusual.",
    tieneQr: true, // <-- AÑADIR ESTA LÍNEA
  },

  {
    id: "baritina",
    img: ["/minerales_museo/1._Baritina-removebg-preview.png"],    nombre: "Baritina",
    formulaQuimica: "BaSO₄",
    clase: "Sulfatos",
    caracteristicas: "Mineral muy denso, de color blanco a grisáceo.",
    usos: "Se emplea principalmente como barro de perforación en pozos petroleros, por su peso. También se usa en la industria del vidrio, pinturas, plásticos y papeles especiales por su alto contenido en bario.",
  },
  {
    id: "ortosa",
    img: ["/minerales_museo/2. Ortosa.JPG"],    nombre: "Ortosa (Feldspato potásico)",
    formulaQuimica: "KAlSi₃O₈",
    clase: "Silicatos, grupo de los feldespatos",
    caracteristicas:
      "Es uno de los minerales más comunes de la corteza terrestre.",
    usos: "Materia prima para la fabricación de porcelana, esmaltes cerámicos, vidrios y aislantes eléctricos. También se emplea en pastas dentales como abrasivo suave.",
  },
  {
    id: "turmalina",
    img: ["/minerales_museo/3. Turmalina Negra.png"],    nombre: "Turmalina",
    formulaQuimica: "(Na,Ca)(Mg,Fe,Al,Li)₃Al₆(BO₃)₃Si₆O₁₈(OH,F)₄",
    clase: "Silicatos, grupo ciclosilicatos",
    caracteristicas: "Mineral muy duro, con gran variedad de colores.",
    usos: "Utilizada en la fabricación de instrumentos de medición de presión (por su respuesta piezoeléctrica), en tecnología submarina, y en algunos equipos electrónicos y ópticos especializados. También es popular como gema ornamental.",
  },
  {
    id: "cuarzo_blanco",
    img: ["/minerales_museo/4. Cuarzo Blanco.png"],    nombre: "Cuarzo Blanco",
    formulaQuimica: "SiO₂",
    clase: "Óxidos / tectosilicatos",
    caracteristicas: "Mineral muy abundante, resistente y versátil.",
    usos: "Se utiliza en la fabricación de vidrio, cerámicas, instrumentos ópticos y electrónicos, y como carga mineral en plásticos, pinturas y productos de madera prensada.",
  },
  {
    id: "malaquita",
    img: ["/minerales_museo/5. Malaquita.jpg"],    nombre: "Malaquita",
    formulaQuimica: "Cu₂CO₃(OH)₂",
    clase: "Carbonatos",
    caracteristicas:
      "Mineral de color verde intenso, asociado a zonas de oxidación de yacimientos de cobre.",
    usos: "Importante mena de cobre (fuente de extracción del metal). También se utiliza como piedra ornamental y, en algunos casos, como pigmento natural en arte tradicional.",
    tieneQr: true, // <-- AÑADIR ESTA LÍNEA
  },

  {
    id: "muscovita",
    img: ["/minerales_museo/6. Muscovita - Mica Blanca.JPG", "/minerales_museo/6. Muscovita - otra.jpg", "/minerales_museo/6. Muscovita.JPG"],    nombre: "Muscovita (Mica Blanca)",
    formulaQuimica: "KAl₂(AlSi₃O₁₀)(OH)₂",
    clase: "Silicatos, grupo de las micas",
    caracteristicas:
      "Tiene tantas propiedades que es uno de los minerales más usados en la industria.",
    usos: "Muy utilizada por sus propiedades aislantes, térmicas y ópticas. Se aplica en la fabricación de pinturas, plásticos, yeso para construcción, aislantes eléctricos, cosméticos y componentes electrónicos.",
  },
  {
    id: "azufre_nativo",
    img: ["/minerales_museo/7. Azufre.JPG"],    nombre: "Azufre (nativo)",
    formulaQuimica: "S",
    clase: "Elementos nativos",
    usos: "Se emplea principalmente para producir ácido sulfúrico, base de muchos procesos industriales. También se usa en la fabricación de fósforos, fertilizantes, fungicidas, tintes, pólvora, productos fotográficos y medicamentos tópicos como pomadas con acción antibacteriana.",
  },

  {
    id: "yeso",
    img: ["/minerales_museo/8. Yeso.jpg"],
    nombre: "Yeso",
    formulaQuimica: "CaSO₄·2H₂O",
    clase: "Sulfatos",
    usos: "Muy utilizado en la construcción: para revoques, juntas, paneles de yeso (Durlock®) y estucos artísticos. También se usa como enmienda de suelos agrícolas y en moldes para cerámica y odontología.",
  },
  {
    id: "calcita_rosada",
    img: ["/minerales_museo/9._Calcita_Rosada_1-removebg-preview.png", "/minerales_museo/9._Calcita_rosada-removebg-preview.png"],    nombre: "Calcita Rosada",
    formulaQuimica: "CaCO₃",
    clase: "Carbonatos",
    usos: "Industrialmente se usa como relleno en pinturas, plásticos y papel. Aunque popularmente se le atribuyen usos medicinales ancestrales, no tiene aplicaciones médicas reconocidas formalmente hoy.",
  },
  {
    id: "epidoto_en_cuarzo",
    img: ["/minerales_museo/10. Epidota en cuarzo 0.JPG", "/minerales_museo/10._Epidota_en_cuarzo_1-removebg-preview.png", "/minerales_museo/10._Epidota_en_cuarzo-removebg-preview.png"],    nombre: "Epidoto en Cuarzo",
    formulaQuimica: "Ca₂(Al,Fe)₃(SiO₄)₃(OH)",
    clase: "Silicatos",
    usos: "No tiene aplicaciones industriales masivas. Se valora como mineral de colección o piedra semipreciosa.",
  },

  {
    id: "estaurolita",
    img: ["/minerales_museo/11._Estaurolita_lab_1-removebg-preview.png", "/minerales_museo/11._Estaurolita_lab_2-removebg-preview.png", "/minerales_museo/11._Estaurolita-2_1wb-removebg-preview.png", "/minerales_museo/11._Estaurolita-removebg-preview.png"],    nombre: "Estaurolita",
    formulaQuimica: "Fe²⁺Al₄Si₂O₁₀(OH)₂",
    clase: "Silicatos",
    caracteristicas:
      "Mineral metamórfico. Es un mineral indicador para geólogos porque señala condiciones específicas de formación de rocas metamórficas.",
    usos: "Utilizado como adorno o amuleto debido a sus cristales en forma de cruz. También se ha usado como material abrasivo, aunque en menor escala.",
  },
  {
    id: "casiterita",
    img: ["/minerales_museo/12. cassiterite-tin-ore-stone-isolated-on-white-photo.jpg", "/minerales_museo/12.Casiterita-removebg-preview.png"],    nombre: "Casiterita",
    formulaQuimica: "SnO₂",
    clase: "Óxidos",
    caracteristicas:
      "Mineral muy denso, duro y resistente a la mayoría de los ácidos.",
    usos: "Es la principal mena de estaño, usado en soldaduras, aleaciones (como el bronce) y en recubrimientos metálicos para evitar la corrosión.",
    tieneQr: true, // <-- AÑADIR ESTA LÍNEA
  },
  // REEMPLAZA el objeto 'galena' existente con este
  {
    id: "galena",
    img: ["/minerales_museo/13. galena.jpg", "/minerales_museo/13._Galena_con_Blenda-removebg-preview.png"],    nombre: "Galena",
    formulaQuimica: "PbS con Blenda – ZnS",
    clase: "Sulfuros",
    caracteristicas:
      "Algunas galenas contienen plata como subproducto valioso.",
    usos: "Es la principal fuente del metal plomo. Utilizado en la fabricación de baterías, aleaciones y antiguamente en la industria del vidrio y en municiones.",
    tieneQr: true, // <-- AÑADIR ESTA LÍNEA
  },
  // REEMPLAZA el objeto 'fluorita' existente con este
  {
    id: "fluorita_verde",
    img: ["/minerales_museo/14. Fluorita verde 1.jpg", "/minerales_museo/14. Fluorita verde.JPG", "/minerales_museo/14._Fluorita_verde_2-removebg-preview.png"],    nombre: "Fluorita Verde",
    formulaQuimica: "CaF₂",
    clase: "Haluros",
    caracteristicas:
      "Su color puede variar; el verde es una de sus variedades más apreciadas.",
    usos: "Se emplea como fundente en la fundición de metales (como hierro y acero), en la fabricación de ácido fluorhídrico, y en óptica para lentes de alta precisión.",
  },

  {
    id: "jadeita",
    img: ["/minerales_museo/15._Jadeita_1-removebg-preview.png", "/minerales_museo/15._Jadeita_2-removebg-preview.png", "/minerales_museo/15._Jadeite_Sodium_aluminum_silicate_Burma_3025-removebg-preview.png"],    nombre: "Jadeíta",
    formulaQuimica: "NaAlSi₂O₆",
    clase: "Silicatos, grupo de los piroxenos",
    usos: "Desde hace más de 5000 años, se utiliza para fabricar adornos, herramientas y objetos rituales, por ser muy dura y resistente. Es muy valorada culturalmente en Asia y América prehispánica.",
  },

  // AÑADE ESTOS TRES NUEVOS OBJETOS AL FINAL DE TU ARRAY 'minerales'
  {
    id: "basalto_llullaillaco", // id único
    img: ["/minerales_museo/16. Basalto.JPG"],    nombre: "Basalto",
    tipo: "Roca ígnea volcánica básica.",
    origen: "(Salar Llullaillaco)",
    caracteristicas:
      "Se forma por el enfriamiento rápido de la lava en la superficie. Es una roca muy común en regiones volcánicas como la Puna, y su presencia está relacionada con antiguos eventos eruptivos.",
  },
  {
    id: "halita_sal_gema", // id único
    img: ["/minerales_museo/17. Halita - Sal.jpg"], // Asigna la imagen cuando la tengas
    nombre: "Halita – NaCl (Sal gema)",
    origen: "(Salar Llullaillaco)",
    caracteristicas:
      "Cristales cúbicos, transparentes o blanquecinos. Es la forma mineral de la sal de mesa. La halita es una de las riquezas económicas de los salares andinos y forma parte de nuestra vida diaria.",
    usos: "Alimentación humana. Procesos industriales y químicos. Conservación de alimentos.",
  },
  /* {
    id: "yeso_con_halita", // id único
    img: ["/minerales_museo/17. Halita - Sal.jpg"], // Asigna la imagen cuando la tengas
    nombre: "Yeso – CaSO₄·2H₂O con Halita",
    origen: "(Salar de Llullaillaco)",
    caracteristicasCombinadas:
      "El yeso puede aparecer como masas terrosas o cristales, y en este caso se observa con incrustaciones o asociaciones de halita cúbica. Esta coexistencia mineral es típica de ambientes de evaporación extrema, como los salares.",
    usos: "Construcción (paneles, estucos, revoques). Agricultura (mejorador de suelos). Arte y escultura.",
  }, */
  /* {
    id: "calcita",
    img: "/calcita.png",
    nombre: "Calcita",
    desc: "Mineral fundamental, componente principal del cemento y la cal, con efervescencia característica ante el ácido clorhídrico.",
    clase: "Carbonatos",
    composicion: "Principalmente carbonato de calcio (CaCO3)",
    sistemaCristalografico: "Trigonal",
    etimologia: 'Del latín "calx", que significa cal viva.',
    propiedadDiagnostica:
      "Efervescencia con HCl, dureza 3 en escala Mohs, birrefringencia.",
    importanciaEconomica:
      "Construcción (cemento, cal), Industria papelera (relleno), plásticos, vidrio, tratamiento de agua, fertilizantes.",
    genesis:
      "Sedimentaria, Biológica (conchas, esqueletos), Metamórfica (mármoles).",
    yacimientosPuna: ["Yacimientos sedimentarios y metamórficos en la región."],
    otros: 'Conocida localmente como "cal viva" o "piedra de cal".',
    tieneQr: true, // <-- AÑADIR ESTA LÍNEA

  },
  // REEMPLAZA el objeto 'fluorita' existente con este
  {
    id: "fluorita_verde",
    img: "/fluorita.png", // O la nueva ruta que le asignes
    nombre: "Fluorita Verde",
    formulaQuimica: "CaF₂",
    clase: "Haluros",
    caracteristicas:
      "Su color puede variar; el verde es una de sus variedades más apreciadas.",
    usos: "Se emplea como fundente en la fundición de metales (como hierro y acero), en la fabricación de ácido fluorhídrico, y en óptica para lentes de alta precisión.",
  },
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
  {
    id: "sal",
    img: "/sal.jfif",
    nombre: "Sal (Halita)",
    desc: "Componente esencial en la alimentación, la sal común o halita es abundante en los salares de la Puna, formándose por la evaporación de antiguas lagunas.",
    clase: "Haluros",
    composicion: "Cloruro de sodio (NaCl)",
    sistemaCristalografico: "Cúbico",
    propiedadDiagnostica:
      "Sabor salado, alta solubilidad en agua, clivaje cúbico perfecto.",
    importanciaEconomica:
      "Alimentación, conservación de alimentos, industria química.",
    genesis: "Evaporítico, formado en salares y cuencas marinas cerradas.",
    tieneQr: true, // <-- AÑADIR ESTA LÍNEA

  },
  
  {
    id: "litio",
    img: "/litio.jfif",
    nombre: "Litio (en Salmuera)",
    desc: "El metal más ligero, no se encuentra como mineral nativo sino disuelto en salmueras dentro de los salares. Es un recurso estratégico para la transición energética.",
    clase: "Elemento (contenido en salmuera)",
    composicion: "Iones de Litio (Li+) en solución acuosa salina.",
    propiedadDiagnostica: "Se identifica por análisis químico de la salmuera.",
    importanciaEconomica:
      "Baterías recargables (vehículos eléctricos, electrónica), cerámica, vidrio, grasas lubricantes.",
    genesis:
      "Lixiviación de rocas volcánicas y concentración por evaporación en cuencas endorreicas (salares).",
  },
  
  
  {
    id: "calcita_rosada",
    img: "/minerales/calcita_rosada.png", // Añade la imagen cuando la tengas
    nombre: "Calcita Rosada",
    formulaQuimica: "CaCO₃",
    clase: "Carbonatos",
    usos: "Industrialmente se usa como relleno en pinturas, plásticos y papel. Aunque popularmente se le atribuyen usos medicinales ancestrales, no tiene aplicaciones médicas reconocidas formalmente hoy.",
  },
  {
    id: "epidoto_en_cuarzo",
    img: "/minerales/epidoto_en_cuarzo.png", // Añade la imagen cuando la tengas
    nombre: "Epidoto en Cuarzo",
    formulaQuimica: "Ca₂(Al,Fe)₃(SiO₄)₃(OH)",
    clase: "Silicatos",
    usos: "No tiene aplicaciones industriales masivas. Se valora como mineral de colección o piedra semipreciosa.",
  },
 */
  // AÑADE ESTOS NUEVOS OBJETOS AL FINAL DE TU ARRAY 'minerales'
];

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
      <h1 className="sala-main-title sala-contenido-titulo-principal">
        {/* Título estilizado por CSS */}
        MINERÍA
      </h1>

      <section className="seccion-minerales">
        <h2 className="sala-contenido-subtitulo">
          Colección de Minerales y Rocas
        </h2>
        <p className="sala-contenido-parrafo">
          Acompáñanos a descubrir nuestra colección de minerales y rocas,
          testigos silenciosos de la riqueza natural de la Puna. Algunos de las
          rocas y minerales de la colección tienen un código QR:{" "}
          <strong>
            Apuntá con la cámara de tu celular y míralos en realidad aumentada,
            para poder observarlos en 3D
          </strong>{" "}
          e interactuar para ver sus características más destacadas.
        </p>

        <div className="minerales-grid">
          {minerales.map((mineral, index) => (
            <article key={mineral.id} className="mineral-card">
              <div className="mineral-card-image-wrapper">
                {/* Comprueba si img es un array y si tiene más de una imagen */}
                {Array.isArray(mineral.img) && mineral.img.length > 1 ? (
                  // Si hay MÁS de una imagen, renderiza el carrusel
                  <MineralCarousel
                    images={mineral.img}
                    mineralNombre={mineral.nombre}
                  />
                ) : (
                  // Si hay UNA SOLA imagen (o si img no es un array por error), renderiza la imagen
                  <img
                    src={`${import.meta.env.BASE_URL}${
                      Array.isArray(mineral.img) ? mineral.img[0] : mineral.img
                    }`}
                    alt={mineral.nombre}
                    className="mineral-card-image"
                  />
                )}
                {mineral.tieneQr && (
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

                {/* Muestra la descripción principal si existe */}
                {mineral.desc && (
                  <p className="mineral-card-description-main">
                    {mineral.desc}
                  </p>
                )}

                {/* Muestra todos los demás detalles solo si existen */}
                <div className="mineral-card-extra-details">
                  {mineral.tipo && (
                    <p className="mineral-detail-item">
                      <strong>Tipo:</strong> {mineral.tipo}
                    </p>
                  )}
                  {mineral.nombreTecnico && (
                    <p className="mineral-detail-item">
                      <strong>Nombre técnico:</strong> {mineral.nombreTecnico}
                    </p>
                  )}
                  {mineral.origen && (
                    <p className="mineral-detail-item">
                      <strong>Origen:</strong> {mineral.origen}
                    </p>
                  )}{" "}
                  {/* <-- Esta línea */}
                  {mineral.formulaQuimica && (
                    <p className="mineral-detail-item">
                      <strong>Fórmula Química:</strong> {mineral.formulaQuimica}
                    </p>
                  )}
                  {mineral.clase && (
                    <p className="mineral-detail-item">
                      <strong>Clase:</strong> {mineral.clase}
                    </p>
                  )}
                  {mineral.composicion && (
                    <p className="mineral-detail-item">
                      <strong>Composición:</strong> {mineral.composicion}
                    </p>
                  )}
                  {mineral.composicionQuimica && (
                    <p className="mineral-detail-item">
                      <strong>Composición química:</strong>{" "}
                      {mineral.composicionQuimica}
                    </p>
                  )}
                  {mineral.sistemaCristalografico && (
                    <p className="mineral-detail-item">
                      <strong>Sistema Cristal.:</strong>{" "}
                      {mineral.sistemaCristalografico}
                    </p>
                  )}
                  {mineral.caracteristicas && (
                    <p className="mineral-detail-item">
                      <strong>Características:</strong>{" "}
                      {mineral.caracteristicas}
                    </p>
                  )}
                  {mineral.caracteristicasCombinadas && (
                    <p className="mineral-detail-item">
                      <strong>Características combinadas:</strong>{" "}
                      {mineral.caracteristicasCombinadas}
                    </p>
                  )}{" "}
                  {/* <-- Y esta línea */}
                  {mineral.propiedadDiagnostica && (
                    <p className="mineral-detail-item">
                      <strong>Prop. Diagnóstica:</strong>{" "}
                      {mineral.propiedadDiagnostica}
                    </p>
                  )}
                  {mineral.usos && (
                    <p className="mineral-detail-item">
                      <strong>Usos:</strong> {mineral.usos}
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
                  {mineral.etimologia && (
                    <p className="mineral-detail-item">
                      <strong>Etimología:</strong> {mineral.etimologia}
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
              </div>
            </article>
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
      <h2 className="sala-minerologia-subtitulo">
        Minería: de la tierra a nuestra vida cotidiana
      </h2>
      <p className="sala-minerologia-intro">
        Tal vez ya sabés que muchos objetos que usás cada día vienen de
        minerales. Pero… ¿cómo pasan de estar en una roca a formar parte de tu
        celular, tus paredes o tu comida? Esta sección de la guía te invita a
        descubrir <strong> cómo se extraen y transforman los minerales:</strong>
        Desde las técnicas más antiguas usadas por las comunidades andinas,
        hasta los métodos modernos que buscan ser más cuidadosos con el ambiente
        y las personas.
      </p>
      <h2 className="sala-minerologia-subtitulo">
        Los primeros pasos de la minería
      </h2>
      <p className="sala-minerologia-intro">
        La minería nació con el ser humano. En los Andes, las culturas
        originarias ya extraían minerales como la obsidiana, el cobre o la sal,
        que usaban para fabricar herramientas, como objetos ceremoniales, para
        pintar cuevas con pigmentos naturales o como elementos de intercambio.
        Hoy, la Puna sigue siendo clave: el litio que se encuentra bajo los
        salares permite fabricar baterías para celulares, computadoras y autos
        eléctricos en todo el mundo. Uno de los objetos que utilizaban
        antiguamente es la lámpara a carburo, que podés ver en esta sala.
      </p>
      <img
        src={`${import.meta.env.BASE_URL}/lampara_carburo.JPG`}
        alt="Paisaje de Salar en la Puna"
        className="imagen-testigo lampara-recortada"
      />
      <p className="sala-minerologia-intro">
        <strong> ¿Cómo funcionaba? </strong>
        Tenía un compartimento superior con agua y uno inferior con carburo de
        calcio. Al mezclarse, generaban gas acetileno, que se encendía y ofrecía
        una llama estable y duradera. Era indispensable para los mineros que
        trabajaban en galerías profundas sin electricidad. Esta lámpara no solo
        iluminaba el camino: también mostraba cuán ingenioso debía ser el
        trabajo minero antes de la tecnología moderna.
      </p>
      <h2 className="sala-minerologia-subtitulo">
        Explorá los testigos de perforación – la memoria del subsuelo
      </h2>
      <p className="sala-minerologia-intro">
        En esta sala también puedes se exhiben cortes cilíndricos—o
        “testigos”—que representan muestras directas del subsuelo de la Puna.
        Cada uno refleja procesos geológicos específicos, útiles tanto para la
        minería como para la investigación científica.
      </p>
      {/* TESTIGOOOS */}
      {/* ========================================================= */}
      {/* =      INICIO: SECCIÓN DE TESTIGOS DESTACADOS           = */}
      {/* ========================================================= */}
      <section className="seccion-testigos" style={{ border: "0px" }}>
        <h3 className="sala-contenido-subtitulo">Testigos destacados</h3>
        <p className="sala-contenido-parrafo">
          A continuación, puedes observar en detalle algunos de los testigos
          geológicos más representativos de la colección.
        </p>

        {/* --- Testigo 1: Brecha Hidrotermal --- */}
        <div className="testigo-item">
          <h4 className="sala-contenido-subtitulo-menor">
            Brecha hidrotermal (testigo 3-4)
          </h4>
          <p className="sala-contenido-parrafo">
            Puedes observar fragmentos angulares de roca unidos por cuarzo
            relleno, con vetas de alunita y jarosita. Esto indica zonas donde
            circuló agua caliente (150–350 °C), creando depósitos minerales. Una
            brecha hidrotermal se forma cuando fluidos calientes y ricos en
            minerales, llamados fluidos hidrotermales, ascienden a través de
            fracturas en la corteza terrestre y entran en contacto con rocas más
            frías. Este cambio brusco de temperatura y presión provoca la
            precipitación de minerales, que luego cementan los fragmentos de
            roca circundantes, formando una brecha hidrotermal.
          </p>
          <div className="imagen-destacada-container">
            {/* REEMPLAZA esta ruta con la tuya en /public */}
            <img
              src={`${import.meta.env.BASE_URL}/brecha_hidrotermal.png`}
              alt="Testigo de Brecha Hidrotermal"
              className="imagen-testigo"
              loading="lazy"
            />
          </div>
        </div>

        {/* --- Testigo 2: Andesita Alterada (Argílica) --- */}
        <div className="testigo-item">
          <h4 className="sala-contenido-subtitulo-menor">
            Andesita alterada (testigo 5)
          </h4>
          <p className="sala-contenido-parrafo">
            La alteración argílica: contiene arcillas como alunita y goethita,
            lo que es señal de fluidos subterráneos ácidos.
          </p>
          <div className="imagen-destacada-container">
            {/* REEMPLAZA esta ruta con la tuya en /public */}
            <img
              src={`${import.meta.env.BASE_URL}/andesita_alterada_5.png`}
              alt="Testigo de Andesita Alterada con alteración argílica"
              className="imagen-testigo"
              loading="lazy"
            />
          </div>
        </div>

        {/* --- Testigo 3: Andesita Alterada (Silícica) --- */}
        <div className="testigo-item">
          <h4 className="sala-contenido-subtitulo-menor">
            Andesita alterada (testigo 6)
          </h4>
          <p className="sala-contenido-parrafo">
            La alteración silícica con óxidos de hierro y vetillas de alunita
            tipifica entornos de alta sulfuración, cercanos a vapores
            volcánicos.
          </p>
          <div className="imagen-destacada-container">
            {/* REEMPLAZA esta ruta con la tuya en /public */}
            <img
              src={`${import.meta.env.BASE_URL}/andesita_alterada_6.png`}
              alt="Testigo de Andesita Alterada con alteración silícica"
              className="imagen-testigo"
              loading="lazy"
            />
          </div>
        </div>

        {/* --- Testigo 4: Diamantina / Halita --- */}
        <div className="testigo-item">
          <h4 className="sala-contenido-subtitulo-menor">
            Diamantina / halita
          </h4>
          <p className="sala-contenido-parrafo">
            Contiene cristales cúbicos de sal (halita) en roca árida del salar.
            Revela episodios de agua salina antigua y evaporación intensiva.
          </p>
          <div className="imagen-destacada-container">
            {/* REEMPLAZA esta ruta con la tuya en /public */}
            <img
              src={`${import.meta.env.BASE_URL}/diamantina_halita.png`}
              alt="Testigo de Diamantina con Halita"
              className="imagen-testigo"
              loading="lazy"
            />
          </div>
        </div>
        {/* --- Testigo 5: Granitoide --- */}
        <div className="testigo-item">
          <h4 className="sala-contenido-subtitulo-menor">Granitoide</h4>
          <p className="sala-contenido-parrafo">
            Granitoide (testigo 1) con alteración vuggy silica: presencia de
            cavidades rellenas de sílice vítrea, común en zonas de
            mineralización hidrotermal
          </p>
          <div className="imagen-destacada-container">
            {/* REEMPLAZA esta ruta con la tuya en /public */}
            <img
              src={`${import.meta.env.BASE_URL}/granitoide.png`}
              alt="Testigo de Granitoide"
              className="imagen-testigo"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      {/* ========================================================= */}
      {/* =       FIN: SECCIÓN DE TESTIGOS DESTACADOS             = */}
      {/* ========================================================= */}
      <h2 className="sala-minerologia-subtitulo">
        Boratos – colección de boro y derivados
      </h2>
      <p className="sala-minerologia-intro">
        Los boratos, son minerales de importancia industrial (detergentes,
        agricultura, vidrio). La muestra que puedes observar en la sala incluye
        ulexita natural, bórax, y ácido bórico (grado técnico).
      </p>
      {(() => {
        // --- Estructura de datos para la colección de Boratos ---
        const boratosCollection = [
          {
            id: "boro_10",
            nombre: "Boro 10",
            imgSrc: `${import.meta.env.BASE_URL}/boro_10.png`,
          },
          {
            id: "boro_15",
            nombre: "Boro 15",
            imgSrc: `${import.meta.env.BASE_URL}/boro_15.png`,
          },
          {
            id: "ulexita_natural",
            nombre: "Ulexita Natural",
            imgSrc: `${import.meta.env.BASE_URL}/ulexita_natural.png`,
          },
          {
            id: "aquabor",
            nombre: "Aquabor",
            imgSrc: `${import.meta.env.BASE_URL}/aquabor.png`,
          },
          {
            id: "ulexita_molida",
            nombre: "Ulexita Molida",
            imgSrc: `${import.meta.env.BASE_URL}/ulexita_molida.png`,
          },
          {
            id: "borax_10",
            nombre: "Bórax 10",
            imgSrc: `${import.meta.env.BASE_URL}/borax_10.png`,
          },
          {
            id: "acido_borico_tecnico",
            nombre: "Ácido Bórico grado técnico",
            imgSrc: `${import.meta.env.BASE_URL}/acido_borico_tecnico.png`,
          },
          {
            id: "acido_borico_powder",
            nombre: "Ácido Bórico Powder",
            imgSrc: `${import.meta.env.BASE_URL}/acido_borico_powder.png`,
          },
        ];

        return (
          <section className="boratos-section">
            <div className="boratos-grid">
              {boratosCollection.map((borato) => (
                <div key={borato.id} className="borato-item">
                  <h4 className="borato-caption">{borato.nombre}</h4>
                  <img
                    src={borato.imgSrc} // <- Aquí va la ruta que luego reemplazarás
                    alt={borato.nombre}
                    className="borato-image"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        );
      })()}
    </div>
  );
};
