import { useState } from "react";
import { LineaTiempo } from "./LineaTiempo";

export const SalaRamalC14 = () => {
  const [view, setView] = useState(null);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {!view ? (
        <>
          <button onClick={() => setView("tren")}>🚂 Tren a las Nubes</button>
          <button onClick={() => setView("timeline")}>📜 Línea de Tiempo</button>
        </>
      ) : view === "tren" ? (
        <div>
          <img src="/tren-a-las-nubes.jpg" alt="Tren a las Nubes" style={{ width: "100%" }} />
          <p>Descripción del Tren a las Nubes...</p>
        </div>
      ) : (
        <LineaTiempo />
      )}
    </div>
  );
};
