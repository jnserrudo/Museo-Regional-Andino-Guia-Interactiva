import React, { useEffect, useMemo } from "react"; // Asegura importar useMemo
import { useSpeech } from "../Contexts/SpeechContext"; // Ajusta la ruta si es necesario
import "../SalaContenido.css";

// Datos de la sala (sin cambios)
const sala = {
  title: "GOBERNACIÓN DE LOS ANDES",
  image: "/historia_museo.png",
  video: "",
  sections: [
    {
      /* subtitle: "Contexto Histórico", */
      text: `El primer gobernador fue el Gral. De Brigada D. Daniel Cerri, en su gobernación se realizan el reconocimiento y exploración del territorio  y surge así la primera  memoria de la Gobernación  donde se identifican las propiedades y borateras. Y se suman exploraciones de científicos y naturalistas como Juan Ambrosetti (1904-1905), Eric  Boman (1910),entre otros.
      Los informes de la época reflejaban la importancia y potencial  de los recursos mineros y las características especiales del clima y la altura. 
      En el año 1943 el territorio de la Gobernación de Los Andes se divide en tres departamentos anexados a las actuales provincias de Salta (Los Andes)  Jujuy (Susques)  y Catamarca (Antofagasta de la Sierra).
`
    },
    /* {
      subtitle: "Desafíos y Logros",
      text: "La administración enfrentó enormes desafíos logísticos y climáticos. Las comunicaciones eran precarias y la adaptación a la altura, un obstáculo constante. A pesar de ello, se establecieron escuelas, se mejoraron caminos y se intentó impulsar la minería y la ganadería como motores económicos. La interacción con las comunidades originarias fue un aspecto crucial y complejo de la gestión.",
    },
    {
      subtitle: "Legado",
      text: "Aunque la Gobernación de Los Andes tuvo una existencia relativamente corta, su legado perdura en la memoria histórica de la región. Marcó un intento significativo de soberanía y administración en una de las zonas más inhóspitas de Argentina, sentando bases para la organización territorial posterior.",
    }, */
  ],
};

export const SalaGobernacionAndes = () => {
  const { registerText } = useSpeech();

  // <<<--- Usa useMemo para estabilizar textoCompleto --- >>>
  const textoCompleto = useMemo(() => {
    console.log(
      "SalaGobernacionAndes: Calculando textoCompleto (debería ser 1 vez)."
    );
    return `${sala.title}. ${sala.sections
      .map((s) => `${s.subtitle || ""}. ${s.text}`)
      .join(". ")}`;
  }, []); // Dependencia vacía, asume que 'sala' no cambia

  // <<<--- useEffect con dependencias estables --- >>>
  useEffect(() => {
    console.log(
      "SalaGobernacionAndes: useEffect ejecutado. Registrando texto."
    );
    registerText(textoCompleto);
    // Limpia el texto cuando el componente se desmonta
    return () => {
      console.log("SalaGobernacionAndes: useEffect cleanup. Limpiando texto.");
      registerText("");
    };
    // Dependencias: registerText (estable por useCallback[]) y textoCompleto (estable por useMemo[])
    // Este efecto ahora SÓLO se ejecuta al montar y limpia al desmontar.
  }, [registerText, textoCompleto]);

  return (
    <article className="sala-contenido-articulo" id="main-sala-content">
      <h2 className="sala-contenido-titulo-principal">{sala.title}</h2>
      <figure className="sala-contenido-imagen-destacada">
        <img
          src={`${import.meta.env.BASE_URL}${sala.image}`}
          alt={`Imagen representativa de ${sala.title}`}
        />
        <figcaption>
          El edificio histórico que alberga parte de nuestra colección.
        </figcaption>
      </figure>
      {sala.sections.map((section, index) => (
        <section key={index} className="sala-contenido-seccion">
          {section.subtitle && (
            <h3 className="sala-contenido-subtitulo">{section.subtitle}</h3>
          )}
          <p className="sala-contenido-parrafo">{section.text}</p>
        </section>
      ))}
    </article>
  );
};
