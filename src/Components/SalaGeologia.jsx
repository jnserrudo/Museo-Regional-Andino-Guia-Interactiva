import { useNavigate } from "react-router-dom";
import '../SalaSubtemas.css'; // <<< --- IMPORTA EL NUEVO CSS

// Asegúrate que las imágenes existan en tu carpeta public o sean importadas correctamente
const temasGeologia = [
  {
    id: "origen",
    title: "Origen y Formación Geológica", // Título ligeramente acortado para ejemplo
    image: "/fondo1.JPG", // Asumiendo que está en /public/fondo1.JPG
  },
  { id: "volcanes", title: "Volcanes", image: "/volcanes.jpg" }, // Cambia a imágenes reales
  { id: "geiser", title: "Géiser", image: "/geiser.jpg" },
  { id: "salares", title: "Salares", image: "/salares.jpg" },
];

export const SalaGeologia = () => {
  const navigate = useNavigate();

  return (
    // Contenedor principal para esta vista de subtemas
    <article className="sala-subtemas-container">

      {/* Puedes reutilizar el estilo del título principal si quieres */}
      <h2 className="sala-contenido-titulo-principal">GEOLOGÍA</h2>
      <p className="sala-subtemas-descripcion">
        Explora los fascinantes procesos que dieron forma a la Puna y sus paisajes únicos.
      </p>

      {/* La grilla de tarjetas */}
      <div className="sala-subtemas-grid">
        {temasGeologia.map((tema, index) => (
          // Cada tema es una "tarjeta" clickable
          <article
            key={tema.id}
            className="sala-subtema-card"
            onClick={() => navigate(`/salas/geologia/${tema.id}`)}
            style={{ animationDelay: `${index * 0.1}s` }} // Animación escalonada
            tabIndex="0" // Hace que sea enfocable con teclado
            role="link" // ARIA role para accesibilidad
            aria-label={`Explorar ${tema.title}`} // Más info para lectores de pantalla
          >
            {/* Contenedor de la imagen */}
            <div
              className="sala-subtema-image"
              style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${tema.image})` }}
            >
              <div className="sala-subtema-image-overlay"></div> {/* Overlay sutil */}
            </div>

            {/* Contenedor de la información */}
            <div className="sala-subtema-info">
              {/* Título del subtema (mejor semántica con H3) */}
              <h3 className="sala-subtema-title">{tema.title}</h3>
              {/* Icono de flecha que aparece en hover/focus */}
              <span className="sala-subtema-arrow" aria-hidden="true">→</span>
            </div>
          </article>
        ))}
      </div>
    </article>
  );
};