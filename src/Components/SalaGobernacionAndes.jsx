import { useState } from "react";
import { CustomerServiceOutlined } from "@ant-design/icons";

export const SalaGobernacionAndes = () => {
  const [mostrarContenido, setMostrarContenido] = useState(false);

  const sala = {
    title: "GOBERNACIÓN DE LOS ANDES",
    image: "/historia_museo.png", // Asegúrate de reemplazar con la ruta correcta
    video: "", // Agrega un enlace a un video si está disponible
    description: `El primer gobernador fue el Gral. De Brigada D. Daniel Cerri, 
    en su gobernación se realizan el reconocimiento y exploración del territorio...`,
  };

  const handleReproducir = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        `${sala.title}. ${sala.description}`
      );
      utterance.lang = "es-ES";
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("La síntesis de voz no es compatible con tu navegador.");
    }
  };

  return (
    <div>
      <div
        className="img_sala"
        onClick={() => setMostrarContenido(true)}
        style={{
          backgroundImage: `url(${sala.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          color: "white",
          textAlign: "center",
          cursor: "pointer",
          paddingLeft: "1rem",
        }}
      >
        <h2>{sala.title}</h2>
        {sala.video ? (
          <video controls style={{ maxWidth: "100%" }}>
            <source src={sala.video} type="video/mp4" />
          </video>
        ) : (
          <CustomerServiceOutlined
            onClick={handleReproducir}
            style={{ fontSize: "24px", cursor: "pointer", marginRight: "auto" }}
          />
        )}
      </div>

      <div style={{ textAlign: "center", padding: "20px" }}>
        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          {sala.description}
        </p>
      </div>
    </div>
  );
};
