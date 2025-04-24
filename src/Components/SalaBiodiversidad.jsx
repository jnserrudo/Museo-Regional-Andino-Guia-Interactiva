import React from "react";
import "../SalaBiodiversidad.css"; // <<< --- IMPORTA EL NUEVO CSS

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
    text: "El animal más representativo de la Puna es pequeño y no demanda mucho alimento. Tiene dientes insólitos, finos y de crecimiento continuo para cortar y no arrancar la vegetación. No erosiona el suelo porque posee unas almohadillas en sus patas. Puede cerrar a voluntad su nariz para evitar que los fuertes vientos introduzcan cuerpos extraños. Tiene una forma de glóbulos rojos y una hemoglobina que son muy eficientes para la captación del escaso oxígeno.",
  },
  {
    title: "Roedores y Carnívoros: Habitantes Discretos",
    image: "zorroAndinoBiodiversidad.jfif",
    alt: "Chinchilla, un roedor de la Puna",
    text: "En los roquedales de los cerros viven el chinchillón, la chinchilla real, la chinchilla chica y la rata chinchilla. Buscando roedores y otras presas, aparecen el zorro colorado, el gato de los pajonales, el hurón y el zorrino rey.",
  },
  {
    title: "Aves Acuáticas: Vida en las Lagunas Altoandinas",
    image: "flamencosBiodiversidad.jfif",
    alt: "Flamencos andinos en una laguna de la Puna",
    text: "En las grandes lagunas vive una enorme cantidad de aves acuáticas. Algunas son migratorias como los chorlos y playeros, y otras son residentes como el chorlito puneño, el chorlito de vincha, el pato serrano, la avoceta andina, la gaviota andina y la guallata andina. Entre las más notorias por su colorido y apariencia encontramos a la parina grande o flamenco andino, la parina chica o flamenco de James y el flamenco austral.",
  },
  {
    title: "Flora Resiliente: Estrategias de Supervivencia",
    image: "yaretaBiodiversidad.jfif",
    alt: "Planta de Yareta creciendo en forma compacta",
    text: "Para sobrevivir a la escasez de agua, las plantas crecen dispersas para aprovecharla al máximo, reducen todo lo posible la evaporación desarrollando hojas pequeñas y suaves, crecen en forma rastrera como la yareta, así evitan la desecación que provocan los fuertes vientos de la Puna. Los cardones almacenan agua en sus tejidos aéreos, otras lo hacen en estructuras subterráneas (bulbos, rizomas, tubérculos, etc.) como la papa silvestre.",
  },
  {
    title: "Arbustos y el Árbol de las Alturas",
    image: "bosquesilloBiodiversidad.jfif",
    alt: "Bosquecillo de Queñoa en la Puna",
    text: "La vegetación predominante en la Puna son los arbustos bajos como la tola y la tolilla. La queñoa es el único árbol que crece entre los 3000 y 4300 metros de altura sobre el nivel del mar.",
  },
  {
    title: "Las Vegas: Oasis de Biodiversidad",
    image: "vegasBiodiversidad.jfif",
    alt: "Una vega o bofedal con pasto verde en la Puna",
    text: "Todo desierto tiene sus oasis; las vegas son los humedales de la Puna. En ellas se acumula agua de vertiente y se genera un micro ecosistema que permite la supervivencia de las especies nativas y domesticadas, así como también la del hombre.",
  },
];

export const SalaBiodiversidad = () => {
  return (
    <article className="sala-biodiversidad-container">
      <h2 className="sala-contenido-titulo-principal">
        BIODIVERSIDAD DE LA PUNA
      </h2>

      {biodiversidadData.map((item, index) => (
        <section
          key={index}
          // Alternar layout, excepto quizás para la intro si se quiere diferente
          className={`bio-content-block ${
            !item.isIntro && index % 2 !== 0 ? "reverse" : ""
          } ${item.isIntro ? "intro-block" : ""}`}
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
            <p
              className="bio-text"
              dangerouslySetInnerHTML={{ __html: item.text }}
            ></p>
          </div>
        </section>
      ))}
    </article>
  );
};
