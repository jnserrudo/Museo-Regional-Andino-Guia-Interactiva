import React from "react";
import '../SalaArqueologia.css'; // <<< --- IMPORTA EL CSS

// --- Asegúrate que estas rutas de imagen sean correctas ---
const arqueologiaData = [
  {
    image: "arqueologia1.jfif", // Ejemplo: /img/arqueologia/arqueologia1.jpg
    alt: "Primeros pobladores de la Puna",
    text: "Los primeros grupos humanos habrían comenzado a llegar a la Puna hace alrededor de 10.000 años. Eran cazadores-recolectores que vivían en pequeños grupos móviles, adaptándose a los desafíos del entorno de altura y aprovechando los recursos disponibles, como la caza de camélidos silvestres (vicuña, guanaco)."
  },
  {
    image: "arqueologia2.jfif", // Ejemplo: /img/arqueologia/arqueologia2.jpg
    alt: "Desarrollo de la agricultura y ganadería andina",
    text: "Hace unos 3000 años, se produjo una transformación significativa con el inicio de la agricultura y la domesticación de animales (llama, alpaca). Hacia los 2500 años antes del presente, la vida pastoril se consolidó como un rasgo fundamental de la Puna. Siglos después, esta economía mixta, combinando pastoreo y cultivos adaptados a la altura (papa, quinua), permitió el desarrollo de aldeas y centros poblados más estables."
  },
  {
    image: "arqueologia3.jfif", // Ejemplo: /img/arqueologia/arqueologia3.jpg
    alt: "Cerámica y vida cotidiana andina",
    text: "La vida cotidiana, las creencias y la organización social de los pueblos andinos se reflejan en su cultura material. Objetos cerámicos con diversos estilos, herramientas de piedra finamente trabajadas, textiles, estructuras arquitectónicas y prácticas rituales nos permiten reconstruir aspectos clave de su cosmovisión, economía y relaciones sociales a lo largo del tiempo."
  }
];

export const SalaArqueologia = () => {
  return (
    // Usamos <article> para el contenedor principal de la sala
    <article className="sala-arqueologia-container">
      {/* Reutilizamos el estilo de título principal si es apropiado */}
      <h2 className="sala-contenido-titulo-principal">ARQUEOLOGÍA</h2>
      {/* Opcional: Podrías añadir un párrafo introductorio aquí */}
      {/* <p className="sala-arqueologia-intro">Un viaje a través de milenios de presencia humana en la Puna...</p> */}

      {arqueologiaData.map((item, index) => (
        // Usamos <section> para cada bloque de contenido
        <section
          key={index}
          // Aplica 'reverse' a las filas pares (índice 1, 3, etc.)
          className={`arqueologia-content-block ${index % 2 !== 0 ? 'reverse' : ''}`}
        >
          <figure className="arqueologia-image-container">
            <img
              src={`${import.meta.env.BASE_URL}${item.image}`}
              alt={item.alt}
              className="arqueologia-image"
            />
            {/* <figcaption>Opcional: Leyenda de la imagen</figcaption> */}
          </figure>
          <div className="arqueologia-text-container">
            <p className="arqueologia-text">{item.text}</p>
          </div>
        </section>
      ))}
    </article>
  );
};