// App.js (CORREGIDO - Asegúrate que esté así)
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "antd";
import { Navbar } from "./Components/Navbar";
import { Sidebar } from "./Components/Sidebar";
import { Footer } from "./Components/Footer";
import { Home } from "./Pages/Home";
// --- IMPORTANTE: Importa Sala Y los wrappers EXPORTADOS desde Sala.jsx ---
import { Sala, SalaPrincipal, SalaDetalleWrapper } from "./Components/Sala";
import { Salas } from "./Components/Salas"; // Para la vista de lista de salas
import { PuzzleGame } from "./Components/PuzzleGame";
import { MapaMuseo } from "./Components/MapaMuseo";
import { PlanoInteractivoMuseo } from "./Components/PlanoInteractivoMuseo";
import { MapaGeograficoMuseo } from "./Components/MapaGeograficoMuseo";
import { SpeechProvider } from "./Contexts/SpeechContext";
import { FontProvider } from "./Contexts/FontContext";
import { useState } from "react";
import { AccessibilityWidget } from "./Components/AccessibilityWidget";

import "leaflet/dist/leaflet.css";

const { Content } = Layout;
import { ScrollToTop } from "./Components/ScrollToTop";
import { GuiaSalas } from "./Components/GuiaSalas";

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <SpeechProvider>
        <FontProvider>
          <Layout style={{ minHeight: "100vh" }}>
            <Navbar onMenuClick={() => setSidebarVisible(true)} />
            <Sidebar
              visible={sidebarVisible}
              onClose={() => setSidebarVisible(false)}
            />
            <Content style={{ padding: "0" }}>
              {" "}
              {/* Padding 0 si hijos lo manejan */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/salas" element={<Salas />} />
                {/* --- RUTA PADRE PARA LAS SALAS --- */}
                {/* Renderiza SIEMPRE el componente Sala, que actúa como layout */}
                <Route path="/salas/:salaId" element={<Sala />}>
                  {" "}
                  {/* Layout */}
                  {/* --- RUTAS HIJAS (Anidadas) --- */}
                  {/* Se renderizarán DENTRO del <Outlet/> de Sala.jsx */}
                  {/* Ruta "índice" (ej: /salas/biodiversidad o /salas/geologia) */}
                  <Route index element={<SalaPrincipal />} />
                  {/* Ruta de detalle (ej: /salas/geologia/volcanes) */}
                  <Route path=":id" element={<SalaDetalleWrapper />} />
                </Route>{" "}
                {/* --- Fin Ruta Padre Salas --- */}
                {/* ====================================================== */}
                {/* ====== AÑADE ESTO PARA LA NUEVA FUNCIONALIDAD ======== */}
                {/* ====================================================== */}
                <Route path="/guia" element={<GuiaSalas />}>
                  {/* Redirige a la primera sala del recorrido al entrar a /guia */}
                  <Route
                    index
                    element={<Navigate to="/guia/geologia" replace />}
                  />

                  {/* Renderiza la sala correspondiente dentro del layout de la guía */}
                  <Route path=":salaId/*" element={<Sala />} />
                </Route>
                {/* ====================================================== */}
                {/* =================== FIN DE LA ADICIÓN ================ */}
                {/* ====================================================== */}
                <Route path="/puzzle" element={<PuzzleGame />} />
                {/* <Route path="/mapa" element={<MapaMuseo />} /> */}
                <Route path="/mapa" element={<MapaGeograficoMuseo />} />
                {/* <Route path="*" element={<div>404</div>} /> */}
              </Routes>
            </Content>
            <Footer />
          </Layout>
          <AccessibilityWidget />
        </FontProvider>
      </SpeechProvider>
    </BrowserRouter>
  );
};

export default App;
