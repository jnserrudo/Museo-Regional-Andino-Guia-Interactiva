// src/components/Salas/SalaTerritorioAndes.jsx

import React from "react";
// Importamos los CSS para reutilizar estilos y mantener consistencia
import "./SalaGeologia.css";
import "./SalaTerritorioAndes.css";

export const SalaTerritorioAndes = () => {
  return (
    <article className="sala-contenido-container">
      <h2 className="sala-contenido-titulo-principal">
        Territorio Nacional de Los Andes
      </h2>

      {/* --- Primer Bloque: Qué fue el Territorio --- */}
      <section className="territorio-bloque">
        <h3 className="sala-contenido-subtitulo">
          ¿Qué fue el Territorio Nacional de Los Andes?
        </h3>
        {/* Imagen del mapa principal a la izquierda */}
        <figure className="territorio-image-block align-left">
          <img
            src={import.meta.env.BASE_URL + "/mapa_gobernacion.jpg"} // REEMPLAZA ESTA RUTA
            alt="Mapa de la Gobernación de Los Andes"
            className="territorio-inline-image"
          />
        </figure>
        <p className="sala-contenido-parrafo">
          El Territorio Nacional de Los Andes fue una unidad
          político-administrativa creada oficialmente el 9 de enero de 1900,
          mediante la Ley N.º 3906, con el objetivo de afirmar la soberanía
          argentina sobre una vasta zona de la Puna de Atacama.
        </p>
        <p className="sala-contenido-parrafo">
          En 1902, un decreto presidencial designó como capital del territorio a
          San Antonio de los Cobres, que aún hoy es una referencia clave en la
          región andina salteña.
        </p>
        <p className="sala-contenido-parrafo">
          Los Territorios Nacionales eran regiones que, si bien formaban parte
          del país, no estaban aún organizadas como provincias. El Poder
          Ejecutivo Nacional nombraba allí gobernadores y secretarios que
          ejercían funciones administrativas, judiciales y de representación del
          Estado.
        </p>
        {/* Galería de mapas históricos */}
        <div className="mapas-historicos-galeria">
          <figure className="mapa-item">
            <img
              src={import.meta.env.BASE_URL + "/mapa_latzina.jpg"} // REEMPLAZA ESTA RUTA
              alt="Mapa de Francisco Latzina de 1888"
              className="mapa-imagen"
              loading="lazy"
            />
            <figcaption className="mapa-caption">
              Mapa argentino de Francisco Latzina de 1888 mostrando la Puna de
              Atacama como territorio chileno.
            </figcaption>
          </figure>

          <figure className="mapa-item">
            <img
              src={import.meta.env.BASE_URL + "/mapa_san_roman.jpg"} // REEMPLAZA ESTA RUTA
              alt="Carta geográfica de Francisco J. San Román de 1892"
              className="mapa-imagen"
              loading="lazy"
            />
            <figcaption className="mapa-caption">
              Carta geográfica del desierto y cordilleras de Atacama realizada
              por Francisco J. San Román y publicada en 1892.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* --- Segundo Bloque: Centro de los conflictos --- */}
      <section className="territorio-bloque">
        <h3 className="sala-contenido-subtitulo">
          Un territorio en el centro de los conflictos
        </h3>
        <p className="sala-contenido-parrafo">
          El origen del Territorio de Los Andes está profundamente ligado a la
          Guerra del Pacífico (1879–1884), un conflicto entre Chile, Bolivia y
          Perú por el control del Desierto de Atacama, una zona rica en salitre.
          Como consecuencia, Chile ocupó territorios en disputa, incluyendo
          partes de la Puna que también limitaban con Argentina.
        </p>
        <p className="sala-contenido-parrafo">
          En esa época, parajes como Antofagasta de la Sierra, Pastos Grandes y
          Surques eran áreas en litigio, sin delimitación precisa, y pasaron a
          estar bajo ocupación chilena. Mientras tanto, se usaba indistintamente
          el nombre Puna de Atacama o Cordillera de Atacama para referirse a
          esta región.
        </p>
      </section>

      {/* --- Tercer Bloque: Diplomacia y acuerdos --- */}
      <section className="territorio-bloque">
        <h3 className="sala-contenido-subtitulo">
          Diplomacia y acuerdos internacionales
        </h3>

        {/* Imagen del mapa de repartición a la derecha */}
        <figure className="territorio-image-block align-right">
          <img
            src={import.meta.env.BASE_URL + "/mapa_reparticion.png"} // REEMPLAZA ESTA RUTA
            alt="Mapa de la repartición de la Puna de Atacama"
            className="territorio-inline-image"
          />
        </figure>

        <p className="sala-contenido-parrafo">
          En 1889, Bolivia firmó un acuerdo con Argentina cediéndole derechos
          sobre una porción del territorio en conflicto. Esta cesión fue parte
          de un intercambio diplomático, como compensación por la renuncia
          argentina a su reclamo sobre la región de Tarija.
        </p>
        <p className="sala-contenido-parrafo">
          El litigio entre Argentina y Chile se resolvió parcialmente en 1899
          mediante un laudo arbitral internacional, conocido como el Laudo
          Buchanan, en referencia al ministro estadounidense William Buchanan,
          que ofició como mediador. El acuerdo dividió la Puna de Atacama:
        </p>
        <ul className="sala-contenido-lista">
          <li>
            La porción occidental (unos 11.000 km²) quedó en manos de Chile.
          </li>
          <li>
            La porción oriental (alrededor de 63.000 km²) se integró a
            Argentina, dando lugar a la creación del Territorio Nacional de Los
            Andes.
          </li>
        </ul>
        <p className="sala-contenido-parrafo">
          Localidades como Susques, Santa Rosa de Pastos Grandes y Antofagasta
          de la Sierra pasaron a formar parte del territorio argentino, mientras
          que San Pedro de Atacama quedó del lado chileno.
        </p>
      </section>
    </article>
  );
};
