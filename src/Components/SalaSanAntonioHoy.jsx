import React from 'react';
import '../SalaSanAntonioHoy.css'; // <<<--- IMPORTA EL NUEVO CSS

// --- Componente SalaSanAntonioHoy ---
export const SalaSanAntonioHoy = () => {
  return (
    <article className="sala-san-antonio-container">
      {/* Título Principal */}
      <h2 className="sala-contenido-titulo-principal">SAN ANTONIO DE LOS COBRES HOY</h2>

      {/* Sección 1: Introducción con Imagen */}
      <section className="sa-content-block image-right"> {/* Imagen a la derecha */}
        <figure className="sa-image-container">
          <img src={`${import.meta.env.BASE_URL}vistaPanoramicaSanAntonioHoy.jfif`} alt="Vista panorámica de San Antonio de los Cobres" className="sa-image" loading="lazy" />
        </figure>
        <div className="sa-text-container">
          <h3 className="sa-section-subtitle">Corazón de la Puna Salteña</h3>
          <p className="sa-text">
            Emplazada a 3.776 metros sobre el nivel del mar, San Antonio de los Cobres es la cabecera del departamento Los Andes. Con una superficie departamental cercana a los 11.420 km² y una población estimada de 7000 habitantes, es un centro vital en la inmensidad de la Puna.
          </p>
          <p className="sa-text">
            Cada 13 de junio, la comunidad celebra con fervor la fiesta de su Santo Patrono, San Antonio de Padua, cuya imagen llegó al pueblo en 1775 desde la histórica Mina de Cobres, ubicada a 70 km.
          </p>
        </div>
      </section>

      {/* Sección 2: Mina de Cobres (Texto solo) */}
      <section className="sa-text-block">
        <h3 className="sa-section-subtitle centered">El Legado de Mina de Cobres</h3>
        <p className="sa-text narrow-text">
          La cercana Mina de Cobres tiene una rica historia ligada a la Compañía de Jesús. Los jesuitas, junto a comunidades originarias Kollas, explotaron sus recursos hasta la expulsión de la orden en 1767 por orden de Carlos III. Este evento forzó a los Kollas a abandonar la mina, llevando consigo sus santos y buscando refugio en el poblado preexistente al pie del cerro Terciopelo, que pasaría a llamarse San Antonio de los Cobres. Desde entonces, en Mina de Cobres se venera a la Virgen del Perpetuo Socorro.
        </p>
      </section>

      {/* Sección 3: Mapa y Descripción Geográfica */}
      <section className="sa-content-block image-left"> {/* Imagen a la izquierda */}
        <figure className="sa-image-container">
          <img src={`${import.meta.env.BASE_URL}ubicacionSanAntonioHoy.jfif`} alt="Mapa ubicación San Antonio de los Cobres" className="sa-image" loading="lazy" />
        </figure>
        <div className="sa-text-container">
          <h3 className="sa-section-subtitle">Ubicación y Entorno</h3>
          <p className="sa-text">
            Rodeado de cerros imponentes en un paisaje árido característico de la Puna, San Antonio de los Cobres ofrece una ventana única a las tradiciones andinas. Su clima seco y mayormente soleado invita a explorar, pero la altura exige respeto: es fundamental caminar pausado y evitar la agitación para prevenir el "apunamiento" o mal de altura.
          </p>
           <p className="sa-text">
            Es un punto ideal para descubrir las costumbres ancestrales de los habitantes de la Puna, disfrutar de paisajes sobrecogedores y experimentar la vida a casi 4000 msnm.
          </p>
        </div>
      </section>

      {/* Sección 4: Testimonio Brackebusch (Bloque de Cita) */}
      <section className="sa-quote-block">
         <h4 className="sa-quote-attribution">Testimonio de Luis Brackebusch (1870):</h4>
         <blockquote>
            <p>
                "En este camino me acompañó Ciriaco Colqui, un cacique indio (...). Cuando entramos en el pueblo de San Antonio de los Cobres, que consistía en no más de trescientas casas bien construidas y bien conservadas, creí que no estaba habitado por una sola alma. (...) Me informaron que en San Antonio todo el mundo es minero. Se extrae de las minas antimonio, cobre, plomo y oro. (...)"
            </p>
         </blockquote>
      </section>

      {/* Sección 5: Escuela (Texto solo, más corto) */}
      <section className="sa-text-block">
        <h3 className="sa-section-subtitle centered">Educación Pionera</h3>
        <p className="sa-text narrow-text">
            En San Antonio de los Cobres se encuentra la escuela más antigua de la Puna: la Escuela N° 4664 "Domingo Faustino Sarmiento", fundada como Escuela Nacional N° 16 en el año 1903, un pilar fundamental en la historia educativa de la región.
        </p>
      </section>

      {/* Sección 6: Fiesta San Antonio (Podría ser como bloque imagen-texto) */}
       <section className="sa-content-block image-right"> {/* Imagen a la derecha */}
        <figure className="sa-image-container">
          <img src={`${import.meta.env.BASE_URL}sanAntonioPadua.jfif`} alt="Celebración de San Antonio de Padua" className="sa-image" loading="lazy" />
        </figure>
        <div className="sa-text-container">
          <h3 className="sa-section-subtitle">Fiesta Patronal</h3>
          <p className="sa-text">
            El 13 de junio, la fe y la tradición se unen en la celebración de San Antonio de Padua. Misachicos, procesiones, ferias de artesanías y comidas típicas llenan las calles, reafirmando la devoción popular que data de la llegada de la imagen en el siglo XVIII.
          </p>
        </div>
      </section>

      {/* Sección 7: Fiesta Pachamama (Similar) */}
       <section className="sa-content-block image-left"> {/* Imagen a la izquierda */}
        <figure className="sa-image-container">
          <img src={`${import.meta.env.BASE_URL}ofrendaPachamamaSanAntonioHoy.jfif`} alt="Ofrenda a la Pachamama" className="sa-image" loading="lazy" />
        </figure>
        <div className="sa-text-container">
          <h3 className="sa-section-subtitle">Fiesta Nacional de la Pachamama</h3>
          <p className="sa-text">
            Cada 1 de agosto, San Antonio de los Cobres se convierte en epicentro de la Fiesta Nacional de la Pachamama. Este ritual ancestral de agradecimiento a la Madre Tierra convoca a habitantes locales y de regiones vecinas en una profunda conexión con la cosmovisión andina.
          </p>
        </div>
      </section>

      {/* Sección 8: Explicación Pachamama (Bloque Destacado Primario) */}
      <section className="sa-highlight-block highlight-primary">
        <h4 className="sa-highlight-title">Pachamama: Madre Tierra</h4>
        <p>
            "Pacha" significa Universo, Mundo, Tiempo, Lugar, mientras que "Mama" es Madre. La Pachamama es la deidad máxima de los pueblos andinos, la Madre Tierra. Es la protectora y proveedora; la que engendra la vida, nutre y cuida. Es la madre de los cerros y de los hombres; la que madura los frutos y multiplica el ganado. Agosto es su mes, y el primer día se inicia la celebración con ofrendas y corpachadas.
        </p>
      </section>

      {/* Sección 9: Sincretismo (Bloque Destacado Secundario) */}
      <section className="sa-highlight-block highlight-secondary">
         <p>
           En esta tierra de pastores y mineros, se guardan y practican ancestrales tradiciones que lograron sobrevivir ante las imposiciones culturales externas, gracias a la fuerte identidad de un pueblo y su singular y equilibrado sincretismo religioso y cultural.
        </p>
      </section>



    </article>
  );
};

// Exporta el componente si es necesario en tu estructura de archivos
// export default SalaSanAntonioHoy;