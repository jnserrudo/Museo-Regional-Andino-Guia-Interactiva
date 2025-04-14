import React from 'react';
import '../SalaBiodiversidad.css'; // <<< --- IMPORTA EL NUEVO CSS

// --- Organizar datos en un array para facilitar el renderizado ---
// --- Reemplaza '/ruta/a/tu/imagenX.jpg' con las rutas correctas, ej: '/img/biodiversidad/paisaje_puna.jpg' ---
const biodiversidadData = [
  {
    // No necesita título, es la introducción
    image: "punaBiodiversidad.jfif",
    alt: "Paisaje característico de la Puna andina",
    text: "<strong>La Puna es una de las ecorregiones más exigentes para la vida.</strong> Las plantas y animales que habitan aquí han desarrollado adaptaciones sorprendentes para sobrevivir al clima extremo, la escasez de agua y alimentos, y los efectos de la gran altitud.",
    isIntro: true, // Flag para posible estilo diferente
  },
  {
    title: "La Vicuña: Símbolo de Adaptación",
    image: "vicuñaBiodiversidad.jfif",
    alt: "Vicuña pastando en la Puna",
    text: "Este camélido silvestre es emblemático de los Andes. Su pequeño tamaño reduce sus necesidades alimenticias. Sus incisivos de crecimiento continuo le permiten cortar pastos duros sin arrancarlos, y sus patas con almohadillas minimizan la erosión del suelo. Posee adaptaciones fisiológicas únicas, como glóbulos rojos eficientes para captar el escaso oxígeno de altura.",
  },
  {
    title: "Roedores y Carnívoros: Habitantes Discretos",
    image: "zorroAndinoBiodiversidad.jfif", // O una imagen compuesta
    alt: "Chinchillón, un roedor de la Puna",
    text: "Los pastizales y roquedales albergan diversos roedores como el chinchillón, la vizcacha serrana y distintas especies de tuco-tucos. Siguiendo a estas presas, encontramos carnívoros adaptados como el zorro colorado andino, el gato andino (muy esquivo y amenazado), el gato de los pajonales y zorrinos.",
  },
  {
    title: "Aves Acuáticas: Vida en las Lagunas Altoandinas",
    image: "flamencosBiodiversidad.jfif", // O una imagen de varias aves
    alt: "Flamencos andinos en una laguna de la Puna",
    text: "Las lagunas salobres y dulces de la Puna son vitales para una gran diversidad de aves acuáticas. Algunas son residentes permanentes como el chorlito puneño y el pato puna, mientras otras migran estacionalmente. Destacan las tres especies de flamencos andinos (Andino, de James y Austral), que filtran microorganismos del agua con sus picos especializados, tiñendo el paisaje de rosa.",
  },
  {
    title: "Flora Resiliente: Estrategias de Supervivencia",
    image: "yaretaBiodiversidad.jfif",
    alt: "Planta de Yareta creciendo en forma compacta",
    text: "Para sobrevivir a la sequía y los vientos, las plantas puneñas crecen dispersas, reducen la superficie de sus hojas (a menudo transformadas en espinas), y adoptan formas compactas y rastreras como la yareta. Los cardones almacenan agua en sus tallos, mientras otras especies como las papas silvestres lo hacen en órganos subterráneos (tubérculos).",
  },
  {
    title: "Arbustos y el Árbol de las Alturas",
    image: "bosquesilloBiodiversidad.jfif", // O tolares
    alt: "Bosquecillo de Queñoa en la Puna",
    text: "La vegetación dominante a menudo son arbustos bajos y resistentes como la tola y la tolilla, que forman extensos matorrales. Sin embargo, la Queñoa (Polylepis spp.) desafía las condiciones extremas, siendo el único género de árbol capaz de formar bosques a altitudes que pueden superar los 4000 metros sobre el nivel del mar, creando microhábitats cruciales para otras especies.",
  },
  {
    title: "Las Vegas: Oasis de Biodiversidad",
    image: "vegasBiodiversidad.jfif",
    alt: "Una vega o bofedal con pasto verde en la Puna",
    text: "En medio de la aridez, las vegas o bofedales representan verdaderos oasis. Son humedales altoandinos formados por afloramientos de agua de vertiente, donde prospera una vegetación hidrófila (pastos tiernos). Estos ecosistemas son vitales para la fauna silvestre (vicuñas, aves) y para el pastoreo tradicional de llamas y alpacas, siendo fundamentales para la vida humana en la Puna.",
  }
];

export const SalaBiodiversidad = () => {
  return (
    <article className="sala-biodiversidad-container">
      <h2 className="sala-contenido-titulo-principal">BIODIVERSIDAD DE LA PUNA</h2>

      {biodiversidadData.map((item, index) => (
        <section
          key={index}
          // Alternar layout, excepto quizás para la intro si se quiere diferente
          className={`bio-content-block ${!item.isIntro && index % 2 !== 0 ? 'reverse' : ''} ${item.isIntro ? 'intro-block' : ''}`}
        >
          <figure className="bio-image-container">
            <img
              src={`${import.meta.env.BASE_URL}${item.image}`}
              alt={item.alt}
              className="bio-image"
              loading="lazy" // Carga diferida para imágenes no iniciales
            />
          </figure>
          <div className="bio-text-container">
            {/* Mostrar subtítulo si existe */}
            {item.title && (
              <h3 className="bio-section-subtitle">{item.title}</h3>
            )}
            {/* Usar dangerouslySetInnerHTML solo si confías plenamente en el origen del texto (o sanitizarlo)
                Alternativa más segura: procesar el <strong> en CSS o usar un componente específico */}
            <p className="bio-text" dangerouslySetInnerHTML={{ __html: item.text }}></p>
          </div>
        </section>
      ))}
    </article>
  );
};