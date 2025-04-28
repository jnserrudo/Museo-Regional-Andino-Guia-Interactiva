// SalaMinerologiaMineria.jsx (CON BOTÓN QR Y LÓGICA DE CÁMARA)
import React, { useRef } from "react"; // Importa useRef
import { SalaContenidoItem } from "./SalaContenidoItem"; // Asegúrate que la ruta sea correcta
import "../SalaMinerologiaMineria.css"; // Importa el CSS
import { QrcodeOutlined } from "@ant-design/icons"; // Importa el icono QR

// --- Datos Organizados en Arrays ---
const mineralesCorteza = [
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
  {
    id: "galena",
    img: "/galena.jfif",
    nombre: "Galena",
    desc: "Principal fuente de plomo y a veces de plata. Fácil de identificar por su brillo metálico y peso. Presente en el noroeste argentino.",
  },
  {
    id: "pirita",
    img: "/pirita.jfif",
    nombre: "Pirita",
    desc: 'Conocida como "el oro de los tontos", es un disulfuro de hierro que suele acompañar depósitos de oro. Muy frecuente en la región.',
  },
  {
    id: "ulexita",
    img: "/ulexite.jfif",
    nombre: "Ulexita",
    desc: 'Llamada "piedra de la televisión", transmite imágenes a través de su estructura. Presente en salares, se usa en la industria química.',
  },
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
          Minerales de la Corteza Terrestre
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
                <p
                  dangerouslySetInnerHTML={{
                    __html: `<strong>${mineral.nombre}:</strong> ${mineral.desc}`,
                  }}
                ></p>
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
