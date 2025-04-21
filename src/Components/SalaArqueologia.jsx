// SalaArqueologia.jsx (Estructura Limpia)
import React from "react";
import '../SalaArqueologia.css'; // <<< --- IMPORTA EL NUEVO CSS

const arqueologiaData = [
  {
    image: "arqueologia1.jfif",
    alt: "Primeros pobladores de la Puna",
    text: "Los primeros pobladores habrían comenzado a llegar a la Puna hace alrededor de 10.000 años. Vivían en pequeños grupos y se desplazaban en grandes distancias a través del territorio. Su supervivencia dependía de la caza de camélidos silvestres como la vicuña y el guanaco."
  },
  {
    image: "arqueologia2.jfif",
    alt: "Desarrollo de la agricultura y ganadería",
    text: "La agricultura y cría de ganado comenzaron a realizarla hace unos 3000 años. Hacia los 3000-2500 años AP se consolidó la forma de vida pastoral, es decir, la presencia de domesticación y pastoreo ya pasaba a ser un rasgo típico de la vida puneña."
  },
  {
    image: "arqueologia3.jfif",
    alt: "Desarrollo de aldeas en la Puna",
    text: "Unos siglos después, continúa el crecimiento de la población, y la vida en aldeas y pequeños centros urbanos se establece con fuerza."
  }
];

export const SalaArqueologia = () => {
  return (
    // Añadimos clase contenedora específica
    <article className="sala-arqueologia-container-v2">
      {/* Asume que tienes un componente o estilo global para este título */}
      {/* <h1 className="sala-contenido-titulo-principal">ARQUEOLOGÍA</h1> */}
      <h1 className="arqueologia-main-title">ARQUEOLOGÍA</h1> {/* O usa un título local */}


      {arqueologiaData.map((item, index) => (
        <section
          key={index}
          className={`arqueologia-content-block ${index % 2 !== 0 ? 'reverse' : ''}`}
        >
          <figure className="arqueologia-image-container">
            <img
              src={`${import.meta.env.BASE_URL}${item.image}`}
              alt={item.alt}
              className="arqueologia-image"
              loading="lazy" // Carga diferida
            />
          </figure>
          <div className="arqueologia-text-container">
            <p className="arqueologia-text">{item.text}</p>
          </div>
        </section>
      ))}
    </article>
  );
};