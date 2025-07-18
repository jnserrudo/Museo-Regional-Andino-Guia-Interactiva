// src/components/salas/GuiaSalas.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { Button } from "antd";
import { ArrowRightOutlined, HomeOutlined } from "@ant-design/icons";
import "./GuiaSalas.css"; // Crearemos este archivo de estilos
import { useTranslation } from "react-i18next"; // <-- 1. Importa el hook

// El orden oficial de las salas para el recorrido guiado
const ordenSalas = [
  "geologia",
  "biodiversidad",
  "minerologia_y_mineria",
  "arqueologia",
  "ramal_c14",
  "historia",
  "gobernacion_de_los_andes",
  "san-antonio-hoy",
];

export const GuiaSalas = () => {
  const { t } = useTranslation();
  const { salaId } = useParams();
  const navigate = useNavigate();
  const [isSalaDespedida, setIsSalaDespedida] = useState(false);

  // --- 2. CREA UNA REFERENCIA PARA EL CONTENEDOR DEL CONTENIDO ---
  const contenidoRef = useRef(null);

  const indiceActual = ordenSalas.indexOf(salaId);
  const esLaUltimaSala = indiceActual === ordenSalas.length - 1;

  // --- 3. AÑADE ESTE useEffect ---
  // Este efecto se ejecutará cada vez que el `salaId` cambie.
  useEffect(() => {
    // Hacemos scroll al inicio del contenedor del contenido de la sala.
    // Usamos 'contenidoRef.current' que apunta al <main>
    if (contenidoRef.current) {
      // Opción A: Scroll suave (si lo prefieres)
      // contenidoRef.current.scrollTo({ top: 0, behavior: 'smooth' });

      // Opción B: Scroll instantáneo (más directo)
      contenidoRef.current.scrollTop = 0;
    }
  }, [salaId]); // La dependencia es `salaId`

  const handleSiguienteSala = () => {
    if (!esLaUltimaSala) {
      const siguienteSalaId = ordenSalas[indiceActual + 1];
      navigate(`/guia/${siguienteSalaId}`);
      setIsSalaDespedida(false);
    } else {
      // Si es la última sala, llévanos a la pantalla de despedida
      navigate("/guia/despedida");
      setIsSalaDespedida(true);
    }
  };

  const handleVolverAlInicio = () => {
    navigate("/");
  };

  return (
    <div className="guia-container">
      <header className="guia-navegacion">
        <Button
          type="default"
          icon={<HomeOutlined />}
          onClick={handleVolverAlInicio}
        >
          {t("guia_salas.salir_guia")}
        </Button>
        <div className="guia-info-sala">
          {salaId && indiceActual !== -1
            ? t("guia_salas.info_sala", {
                indiceActual: indiceActual + 1,
                totalSalas: ordenSalas.length,
              })
            : t("guia_salas.info_fin_recorrido")}
        </div>
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          onClick={handleSiguienteSala}
        >
          {isSalaDespedida
            ? t("guia_salas.boton_repetir")
            : esLaUltimaSala
            ? t("guia_salas.boton_finalizar")
            : t("guia_salas.boton_siguiente")}
        </Button>
      </header>

      <main ref={contenidoRef} className="guia-contenido-sala">
        <Outlet />
      </main>
    </div>
  );
};
