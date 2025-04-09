// SalaMinerologiaMineria.jsx
import { SalaContenidoItem } from "./SalaContenidoItem";

export const SalaMinerologiaMineria = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Explora la colección</h1>
      <p style={{ textAlign: "justify" }}>
        Tipos de Minerales Comunes en la Región Andina de Argentina
      </p>

      <h2>Minerales de la Corteza Terrestre</h2>
      <SalaContenidoItem img="/calcita.jfif">
        <p style={{ textAlign: "justify" }}>
          <strong>Calcita:</strong> Mineral abundante compuesto por carbonato de calcio. Presente en formaciones sedimentarias, se usa en construcción y decoración.
        </p>
      </SalaContenidoItem>

      <SalaContenidoItem img="/fluorita.jfif">
        <p style={{ textAlign: "justify" }}>
          <strong>Fluorita:</strong> De vivos colores y fluorescencia, es usada en óptica e industrias metalúrgicas. Común en yacimientos hidrotermales del NOA.
        </p>
      </SalaContenidoItem>

      <SalaContenidoItem img="/galena.jfif">
        <p style={{ textAlign: "justify" }}>
          <strong>Galena:</strong> Principal fuente de plomo y a veces de plata. Fácil de identificar por su brillo metálico y peso. Presente en el noroeste argentino.
        </p>
      </SalaContenidoItem>

      <SalaContenidoItem img="/pirita.jfif">
        <p style={{ textAlign: "justify" }}>
          <strong>Pirita:</strong> Conocida como "el oro de los tontos", es un disulfuro de hierro que suele acompañar depósitos de oro. Muy frecuente en la región.
        </p>
      </SalaContenidoItem>

      <SalaContenidoItem img="/ulexite.jfif">
        <p style={{ textAlign: "justify" }}>
          <strong>Ulexita:</strong> Llamada "piedra de la televisión", transmite imágenes a través de su estructura. Presente en salares, se usa en la industria química.
        </p>
      </SalaContenidoItem>

      <h2>La riqueza minera de la Puna</h2>
      <p style={{ textAlign: "justify" }}>
        La Puna argentina alberga minerales que forman parte de nuestra vida diaria. Desde elementos industriales hasta recursos estratégicos, su riqueza mineral es clave en la economía regional y nacional.
      </p>

      <img src="/salar.jfif" alt="salar" style={{ width: "100%", marginBottom: "20px" }} />

      <SalaContenidoItem img="/sal.jfif">
        <p style={{ textAlign: "justify" }}>
          Aunque muchos no lo sepan, gran parte de la sal que usamos proviene de los <strong>salares</strong> de la Puna. Se extrae mediante evaporación solar.
        </p>
      </SalaContenidoItem>

      <SalaContenidoItem img="/pomez.jfif" reverse>
        <p style={{ textAlign: "justify" }}>
          La <strong>piedra pómez</strong> es una lava solidificada y liviana, usada para exfoliar y también como aislante en la construcción.
        </p>
      </SalaContenidoItem>

      <SalaContenidoItem img="/onix.jfif">
        <p style={{ textAlign: "justify" }}>
          El <strong>márbol ónix</strong>, usado en artesanías y decoración, es una variedad de calcita que se trabaja en varias zonas del norte argentino.
        </p>
      </SalaContenidoItem>

      <SalaContenidoItem img="/yeso.jfif" reverse>
        <p style={{ textAlign: "justify" }}>
          El <strong>yeso</strong> está presente en toda construcción moderna. Se extrae en la región y se transforma en placas y molduras.
        </p>
      </SalaContenidoItem>

      <SalaContenidoItem img="/litio.jfif">
        <p style={{ textAlign: "justify" }}>
          El <strong>litio</strong> es clave para baterías de celulares, notebooks y autos eléctricos. Se extrae de salares del norte argentino.
        </p>
      </SalaContenidoItem>
    </div>
  );
};
