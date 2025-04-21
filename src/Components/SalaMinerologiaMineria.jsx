// SalaMinerologiaMineria.jsx (CON BOTÓN QR Y LÓGICA DE CÁMARA)
import React, { useRef } from 'react'; // Importa useRef
import { SalaContenidoItem } from "./SalaContenidoItem"; // Asegúrate que la ruta sea correcta
import '../SalaMinerologiaMineria.css'; // Importa el CSS
import { QrcodeOutlined } from '@ant-design/icons'; // Importa el icono QR

// --- Datos Organizados en Arrays ---
const mineralesCorteza = [
  { id: 'calcita', img: "/calcita.jfif", nombre: "Calcita", desc: "Mineral abundante compuesto por carbonato de calcio. Presente en formaciones sedimentarias, se usa en construcción y decoración." },
  { id: 'fluorita', img: "/fluorita.jfif", nombre: "Fluorita", desc: "De vivos colores y fluorescencia, es usada en óptica e industrias metalúrgicas. Común en yacimientos hidrotermales del NOA." },
  { id: 'galena', img: "/galena.jfif", nombre: "Galena", desc: "Principal fuente de plomo y a veces de plata. Fácil de identificar por su brillo metálico y peso. Presente en el noroeste argentino." },
  { id: 'pirita', img: "/pirita.jfif", nombre: "Pirita", desc: "Conocida como \"el oro de los tontos\", es un disulfuro de hierro que suele acompañar depósitos de oro. Muy frecuente en la región." },
  { id: 'ulexita', img: "/ulexite.jfif", nombre: "Ulexita", desc: "Llamada \"piedra de la televisión\", transmite imágenes a través de su estructura. Presente en salares, se usa en la industria química." }
];

const mineralesPuna = [
  { id: 'sal', img: "/sal.jfif", nombre: "Salares (Sal)", desc: "Aunque muchos no lo sepan, gran parte de la sal que usamos proviene de los <strong>salares</strong> de la Puna. Se extrae mediante evaporación solar." },
  { id: 'pomez', img: "/pomez.jfif", nombre: "Piedra Pómez", desc: "La <strong>piedra pómez</strong> es una lava solidificada y liviana, usada para exfoliar y también como aislante en la construcción.", reverse: true },
  { id: 'onix', img: "/onix.jfif", nombre: "Mármol Ónix", desc: "El <strong>márbol ónix</strong>, usado en artesanías y decoración, es una variedad de calcita que se trabaja en varias zonas del norte argentino." },
  { id: 'yeso', img: "/yeso.jfif", nombre: "Yeso", desc: "El <strong>yeso</strong> está presente en toda construcción moderna. Se extrae en la región y se transforma en placas y molduras.", reverse: true },
  { id: 'litio', img: "/litio.jfif", nombre: "Litio", desc: "El <strong>litio</strong> es clave para baterías de celulares, notebooks y autos eléctricos. Se extrae de salares del norte argentino." }
];


export const SalaMinerologiaMineria = () => {
  const fileInputRef = useRef(null);

  const handleQrClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  
    // --- Detección simple ---
    const isLikelyMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || /Mobi|Android/i.test(navigator.userAgent);
  
    if (isLikelyMobile && fileInputRef.current) {
       console.log('Detectado como móvil, activando input...');
       fileInputRef.current.click();
    } else {
       console.log('Detectado como escritorio o sin soporte táctil, no se activa el input.');
       // Opcional: podrías mostrar un mensaje tipo "Función disponible en móvil"
       // alert("Esta función está optimizada para dispositivos móviles.");
    }
  };
   const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Archivo/Foto capturada:", file.name);
      // Por ahora no hacemos nada más
    }
     event.target.value = null; // Permite tomar/seleccionar de nuevo
  };

  return (
    <div className="sala-minerologia-container">

      {/* Input oculto para cámara */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        aria-hidden="true"
      />

      <h1 className="sala-minerologia-titulo">Explora la colección</h1>
      <p className="sala-minerologia-intro">
        Tipos de Minerales Comunes en la Región Andina de Argentina
      </p>

      {/* Sección 1: Minerales Corteza */}
      <section className="seccion-minerales">
        <h2 className="sala-minerologia-subtitulo">Minerales de la Corteza Terrestre</h2>
        <div className="minerales-grid">
          {mineralesCorteza.map((mineral, index) => (
            <SalaContenidoItem key={mineral.id} img={mineral.img}>
              {/* Contenedor interno relativo */}
              <div className="mineral-text-content">
                {index % 2 !== 0 && ( // Botón en impares (Fluorita, Pirita)
                  <button
                    className="qr-code-button"
                    onClick={(e) => handleQrClick(e)}
                    aria-label={`Escanear QR para ${mineral.nombre}`}
                    title={`Escanear QR para ${mineral.nombre}`}
                    type="button"
                  >
                    <QrcodeOutlined />
                  </button>
                )}
                <p dangerouslySetInnerHTML={{ __html: `<strong>${mineral.nombre}:</strong> ${mineral.desc}` }}></p>
              </div>
            </SalaContenidoItem>
          ))}
        </div>
      </section>

      {/* Sección 2: Riqueza Puna */}
      <section className="seccion-minerales">
        <h2 className="sala-minerologia-subtitulo">La riqueza minera de la Puna</h2>
        <p className="sala-minerologia-intro">
          La Puna argentina alberga minerales que forman parte de nuestra vida diaria...
        </p>
        <img src={`${import.meta.env.BASE_URL}/salar.jfif`} alt="Paisaje de Salar en la Puna" className="salar-imagen-destacada" />
        <div className="minerales-grid">
          {mineralesPuna.map((mineral, index) => (
            <SalaContenidoItem
              key={mineral.id}
              img={mineral.img}
              // Pasamos la clase si existe en los datos
              className={mineral.reverse ? 'item-reverse' : ''}
            >
               {/* Contenedor interno relativo */}
               <div className="mineral-text-content">
                 {index % 2 !== 0 && ( // Botón en impares (Pómez, Yeso, Litio - ajusta si quieres otros)
                  <button
                    className="qr-code-button"
                    onClick={(e) => handleQrClick(e)}
                    aria-label={`Escanear QR para ${mineral.nombre}`}
                    title={`Escanear QR para ${mineral.nombre}`}
                    type="button"
                  >
                    <QrcodeOutlined />
                  </button>
                 )}
                <p dangerouslySetInnerHTML={{ __html: mineral.desc }}></p>
               </div>
            </SalaContenidoItem>
          ))}
        </div>
      </section>

    </div>
  );
};