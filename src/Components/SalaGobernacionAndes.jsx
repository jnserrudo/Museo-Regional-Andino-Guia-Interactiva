import React, { useEffect, useMemo } from "react"; // Asegura importar useMemo
import { useSpeech } from '../Contexts/SpeechContext'; // Ajusta la ruta si es necesario
import "../SalaContenido.css";

// Datos de la sala (sin cambios)
const sala = {
  title: "GOBERNACIÓN DE LOS ANDES",
  image: "/historia_museo.png",
  video: "",
  sections: [
    { subtitle: "Contexto Histórico", text: "El Territorio Nacional de Los Andes fue una división administrativa de Argentina creada en 1900 y disuelta en 1943. Su primer gobernador fue el General de Brigada Daniel Cerri, quien lideró las primeras exploraciones y reconocimientos del vasto y desafiante territorio puneño. La gobernación buscaba integrar esta región remota al resto del país, estableciendo autoridades y fomentando el desarrollo." },
    { subtitle: "Desafíos y Logros", text: "La administración enfrentó enormes desafíos logísticos y climáticos. Las comunicaciones eran precarias y la adaptación a la altura, un obstáculo constante. A pesar de ello, se establecieron escuelas, se mejoraron caminos y se intentó impulsar la minería y la ganadería como motores económicos. La interacción con las comunidades originarias fue un aspecto crucial y complejo de la gestión." },
    { subtitle: "Legado", text: "Aunque la Gobernación de Los Andes tuvo una existencia relativamente corta, su legado perdura en la memoria histórica de la región. Marcó un intento significativo de soberanía y administración en una de las zonas más inhóspitas de Argentina, sentando bases para la organización territorial posterior." },
  ],
};

export const SalaGobernacionAndes = () => {
  const { registerText } = useSpeech();

  // <<<--- Usa useMemo para estabilizar textoCompleto --- >>>
  const textoCompleto = useMemo(() => {
    console.log("SalaGobernacionAndes: Calculando textoCompleto (debería ser 1 vez).");
    return `${sala.title}. ${sala.sections
      .map((s) => `${s.subtitle || ""}. ${s.text}`)
      .join(". ")}`;
  }, []); // Dependencia vacía, asume que 'sala' no cambia

  // <<<--- useEffect con dependencias estables --- >>>
  useEffect(() => {
    console.log("SalaGobernacionAndes: useEffect ejecutado. Registrando texto.");
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