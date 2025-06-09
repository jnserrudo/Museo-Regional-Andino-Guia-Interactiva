import React from 'react';
import '../SalaHistoria.css'; // <<<--- IMPORTA EL NUEVO CSS

// --- Datos para la cuadrícula final ---
const historiaCardsData = [
  {
    title: "La Guerra del Pacífico",
    text: "En 1879, Chile ocupó territorios costeros ricos en salitre en disputa con Bolivia, desatando la Guerra del Pacífico. Tras la derrota boliviana, la región de Atacama quedó bajo control chileno, generando un complejo litigio fronterizo que involucró también a Argentina."
  },
  {
    title: "La Diplomacia",
    text: "En 1898, ante la ocupación chilena de la Puna de Atacama (cedida a Bolivia por Argentina a cambio de Tarija), el gobierno boliviano la cedió nuevamente a Argentina para fortalecer su posición diplomática y buscar un arbitraje internacional."
  },
  {
    title: "Laudo Buchanan y Arbitraje",
    text: "Ante la tensión, se acordó un arbitraje internacional. En 1899, el ministro estadounidense William Buchanan dividió la Puna de Atacama: una parte mayoritaria para Argentina y una menor para Chile, buscando un equilibrio basado en la ocupación efectiva y los intereses económicos."
  },
  {
    title: "Creación del Territorio",
    text: "Tras el laudo arbitral, mediante la Ley N° 3906 de 1900, Argentina incorporó oficialmente su porción de la Puna de Atacama y creó el Territorio Nacional de Los Andes en 1902, estableciendo su capital inicial en San Antonio de los Cobres."
  }
];


// --- Componente SalaHistoria ---
export const SalaHistoria = () => {
  return (
    <article className="sala-historia-container">
      {/* Título Principal */}
      <h2 className="sala-contenido-titulo-principal">Territorio Nacional de Los Andes: Orígenes</h2>

      {/* Sección 1: Decreto y Mapa 1 */}
      <section className="sh-content-block image-right">
        <figure className="sh-image-container">
          <img src={`${import.meta.env.BASE_URL}mapaTerritoriosArgentinos.jfif`} alt="Mapa de Territorios Nacionales Argentinos" className="sh-image" loading="lazy" />
        </figure>
        <div className="sh-text-container">
          {/* Usamos H3 para subtítulo de sección */}
          <h3 className="sh-section-subtitle">Organización Territorial Argentina</h3>
          <p className="sh-text">
            Hacia fines del siglo XIX y principios del XX, el Estado argentino buscaba consolidar su soberanía sobre vastas áreas poco pobladas o disputadas. Un Decreto Presidencial del 26 de septiembre de 1902 fue clave en la creación formal del Territorio Nacional de Los Andes.
          </p>
          <p className="sh-text">
            Los Territorios Nacionales eran jurisdicciones administradas directamente por el Poder Ejecutivo Nacional, a diferencia de las provincias autónomas. Su creación buscaba integrar estas regiones, fomentar su poblamiento y explotación económica, y definir fronteras.
          </p>
        </div>
      </section>

      {/* Sección 2: Diferencia y Mapa 2 */}
      <section className="sh-content-block image-left">
         <figure className="sh-image-container">
           {/* Usar un mapa que muestre la Puna de Atacama o el área en disputa */}
           <img src={`${import.meta.env.BASE_URL}mapaPunaAtacama.png`} alt="Mapa de la Puna de Atacama en disputa" className="sh-image" loading="lazy" />
         </figure>
         <div className="sh-text-container">
           <h3 className="sh-section-subtitle">Un Origen Singular</h3>
           <p className="sh-text">
             Entre 1880 y 1950, el gobierno nacional organizó varios Territorios Nacionales (como La Pampa, Chaco, Patagonia). Sin embargo, <strong>el caso del Territorio de Los Andes fue distinto.</strong> No surgió de la subdivisión de áreas ya bajo soberanía indiscutida, sino de la incorporación de tierras obtenidas tras un complejo litigio internacional.
           </p>
            <p className="sh-text">
             Su creación está directamente ligada a la resolución de la disputa por la Puna de Atacama entre Argentina, Bolivia y Chile, derivada de las consecuencias de la Guerra del Pacífico.
           </p>
         </div>
       </section>

      {/* Sección 3: Incorporación y Mapa 3 (Opcional si es redundante) */}
      {/* Podríamos omitir esta sección si los mapas anteriores ya lo ilustran,
          o enfocarla en la división específica del Laudo Buchanan */}
      
      <section className="sh-content-block image-right">
         <figure className="sh-image-container">
           <img src={`${import.meta.env.BASE_URL}mapaDivisionLaudo.jfif`} alt="Mapa división Laudo Buchanan" className="sh-image" loading="lazy" />
         </figure>
         <div className="sh-text-container">
            <h3 className="sh-section-subtitle">La Puna Dividida</h3>
            <p className="sh-text">
             El Territorio de Los Andes se conformó principalmente con la porción de la Puna de Atacama asignada a Argentina por el laudo arbitral estadounidense de 1899, resolviendo así décadas de indefinición fronteriza en una de las regiones más inhóspitas del continente.
           </p>
         </div>
       </section>
     

      {/* Sección 4: Cuadrícula de Tarjetas */}
      <section className="sh-grid-section">
        <h3 className="sh-section-subtitle centered">Claves del Proceso</h3>
        <div className="sh-grid-container">
          {historiaCardsData.map((card, index) => (
            <article key={index} className="sh-grid-card">
              {/* Usamos H4 para títulos de tarjeta */}
              <h4 className="sh-card-title">{card.title}</h4>
              <p className="sh-card-text">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

    </article>
  );
};