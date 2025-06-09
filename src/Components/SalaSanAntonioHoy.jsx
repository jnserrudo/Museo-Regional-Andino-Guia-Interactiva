// SalaSanAntonioHoy.jsx (Estructura Limpia para v2)
import React from 'react';
import '../SalaSanAntonioHoy.css'; // <<< --- IMPORTA EL NUEVO CSS

export const SalaSanAntonioHoy = () => {
  return (
    // Nueva clase contenedora específica
    <article className="sala-san-antonio-container-v2">
      {/* Título Principal - Puedes usar uno global o este local */}
      <h1 className="sa-main-title">San Antonio de los Cobres Hoy</h1>
      <h2 className="sa-subtitulo">Creencias y Costumbres</h2>

      {/* Sección 1: Introducción */}
      {/* Alternancia manejada por orden en JSX y CSS si es necesario */}
      <section className="sa-content-block">
        <figure className="sa-image-container">
          <img
            src={`${import.meta.env.BASE_URL}puebloSanAntonio.jpeg`}
            alt="Vista de San Antonio de los Cobres"
            className="sa-image"
            loading="eager" // Carga la primera imagen rápido
          />
        </figure>
        <div className="sa-text-container">
          {/* Usamos h3 para subtítulos de sección */}
          <h3 className="sa-section-subtitle">San Antonio Hoy</h3>
          <p className="sa-text">
            El pueblo de San Antonio de los Cobres se encuentra rodeado de cerros y en una zona árida de La Puna.
          </p>
          <p className="sa-text">
            San Antonio de los Cobres se ubica a una altura de 3776 metros. Posee una superficie cercana a los 11.420 km2 con una población estimada de 7000 habitantes. El pueblo es ideal para descubrir las tradiciones y costumbres de los habitantes de La Puna, además de disfrutar de hermosos paisajes de cerros y salares. La zona donde se levanta San Antonio de los Cobres es árida y por la altura se recomienda caminar lentamente y evitar agitarse para no sufrir el apunamiento, también conocido como soroche o mal de altura.
          </p>
          {/* Sin título explícito aquí, solo párrafos */}
        <p className="sa-text">
          Esta emplazada a 3776 metros sobre el nivel del mar. Posee una superficie cercana a los 11.420 km2, con una población estimada de 7000 habitantes.
        </p>
        <p className="sa-text">
          El 13 de junio se celebra la fiesta de su Patrono que es San Antonio de Padua. Llegó hasta este lugar el año 1775 desde la Mina de Cobres ubicada en la localidad homónima distante a 70 km de San Antonio.
        </p>
        </div>
      </section>
{/* 
      <section className="sa-text-block">
        <p className="sa-text">
          Esta emplazada a 3776 metros sobre el nivel del mar. Posee una superficie cercana a los 11.420 km2, con una población estimada de 7000 habitantes.
        </p>
        <p className="sa-text">
          El 13 de junio se celebra la fiesta de su Patrono que es San Antonio de Padua. Llegó hasta este lugar el año 1775 desde la Mina de Cobres ubicada en la localidad homónima distante a 70 km de San Antonio.
        </p>
      </section>
 */}
      {/* Sección 3: Mina de Cobres */}
      <section className="sa-content-block reverse"> {/* Añadimos clase 'reverse' para alternar */}
        <figure className="sa-image-container">
          <img
            src={`${import.meta.env.BASE_URL}minaCobre.jfif`}
            alt="Mina de Cobres"
            className="sa-image"
            loading="lazy"
          />
        </figure>
        <div className="sa-text-container">
          <h3 className="sa-section-subtitle">Mina de Cobres</h3>
          <p className="sa-text">
            Fue construida y explotada por los Jesuitas junto a los aborígenes Kolla. Cuando los jesuitas fueron expulsados por Carlos III de todos los territorios que la Corona Española había conquistado, los Kollas tuvieron que abandonar también esas tierras y la mina. Huyeron con su santo a cuestas y llegaron hasta un lugar ya habitado por aborígenes bajo el cerro Terciopelo. Ahí se quedaron y el poblado pasó a llamarse San Antonio de los Cobres mientras que en Cobres se venera desde entonces y hasta hoy a la Virgen del Perpetuo Socorro.
          </p>
        </div>
      </section>

      {/* Sección 4: Testimonio Brackebusch */}
      <section className="sa-quote-block">
        {/* Título opcional para la cita */}
        <h4 className="sa-quote-title">Testimonio de Luis Braquebusch (1870)</h4>
        <blockquote>
          <p className="sa-quote-text"> {/* Clase específica para el texto */}
            "En este camino me acompañó Ciriaco Colqui, un cacique indio (todas estas regiones están habitadas por indios quichuas que son cristianos pero viven todavía en un estado completamente primitivo) y hombre inteligente que me facilitó detalles topográficos de incalculable valor; pasamos por el pueblo de San Antonio de los Cobres, que consistía en por lo menos trescientas casas bien construidas y bien conservadas, pero que no estaba habitado por una sola alma..." {/* Texto completo */}
          </p>
        </blockquote>
        {/* Podríamos mover la atribución aquí si se prefiere */}
        {/* <p className="sa-quote-attribution">- Luis Braquebusch, 1870</p> */}
      </section>

      {/* Sección 5: Escuela (Texto solo) */}
      <section className="sa-text-block">
        <h3 className="sa-section-subtitle centered">Educación en la Puna</h3> {/* Título centrado */}
        <p className="sa-text narrow-text"> {/* Texto centrado y estrecho */}
          En San Antonio de Los Cobres se encuentra la escuela más antigua de la Puna. La Escuela "Domingo Faustino Sarmiento", nació como Escuela Nacional Nro. 1 en el año 1903, hoy se la conoce como Escuela Nro. 5464 y depende de la provincia.
        </p>
      </section>

      {/* Sección 6: Pachamama */}
      <section className="sa-content-block"> {/* Layout normal */}
        <figure className="sa-image-container">
          <img
            src={`${import.meta.env.BASE_URL}ofrendaPachamamaSanAntonioHoy.jfif`}
            alt="Celebración de la Pachamama"
            className="sa-image"
            loading="lazy"
          />
        </figure>
        <div className="sa-text-container">
          <h3 className="sa-section-subtitle">La Pachamama</h3>
          <p className="sa-text">
            La Pachamama es la celebración más conocida y difundida de todo nuestro noroeste. Pacha significa Tierra en lengua quechua y mama significa madre. La Pachamama es una deidad, es la Madre Tierra.
          </p>
          <p className="sa-text">
            Es la madre de los cerros y de los hombres, la que hace posible que las cosechas prosperen, los frutos maduren y el ganado se reproduzca. Agosto es el mes de la Pachamama y el primer día de este mes comienza su celebración.
          </p>
        </div>
      </section>

      {/* Sección 7: Sincretismo (Highlight) */}
      {/* Usamos clase modificadora para el estilo */}
      <section className="sa-highlight-block highlight-primary">
        <h4 className="sa-highlight-title">Sincretismo Cultural</h4>
        <p className="sa-highlight-text">
          En esta tierra de pastores y mineros, se guardan y practican ancestrales tradiciones que lograron sobrevivir ante las imposiciones extrañas de los conquistadores gracias a la fuerte identidad de un pueblo y que hoy forman parte de un singular y equilibrado sincretismo.
        </p>
      </section>
    </article>
  );
};