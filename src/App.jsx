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
import { DespedidaGuia } from "./Components/DespedidaGuia";

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
                {/* ======        AQUÍ ESTÁ LA CORRECCIÓN         ======== */}
                {/* ====================================================== */}
                {/* --- RUTA PARA LA VISITA GUIADA --- */}
                {/* 1. La ruta padre /guia renderiza el layout de la guía (<GuiaSalas />) */}
                <Route path="/guia" element={<GuiaSalas />}>
                  {/* 2. Al entrar a /guia, redirige a la primera sala del recorrido. */}
                  <Route
                    index
                    element={<Navigate to="/guia/geologia" replace />}
                  />

                  {/* 3. ¡LA CLAVE! Anidamos la misma estructura de rutas de /salas DENTRO de /guia.
                         Ahora, cuando la URL sea /guia/geologia, se renderizará <Sala />
                         dentro del <Outlet /> de <GuiaSalas />, y a su vez, <SalaPrincipal />
                         se renderizará dentro del <Outlet /> de <Sala />.
                         Esto funciona para las sub-rutas también (ej: /guia/geologia/volcanes).
                  */}
                  <Route path=":salaId" element={<Sala />}>
                    {/* Estas son las rutas hijas de <Sala />, igual que en el modo normal */}
                    <Route index element={<SalaPrincipal />} />
                    <Route path=":id" element={<SalaDetalleWrapper />} />
                  </Route>

                  {/* --- AÑADE ESTA NUEVA RUTA AQUÍ --- */}
                  <Route path="despedida" element={<DespedidaGuia />} /> 
                </Route>
                {/* ====================================================== */}
                {/* =================== FIN DE LA CORRECCIÓN ============= */}
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
