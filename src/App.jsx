import { Layout } from "antd";

import { useState } from "react";
import { Navbar } from "./Components/Navbar";
import { Sidebar } from "./Components/Sidebar";
import { Salas } from "./Components/Salas";
import { Footer } from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Sala } from "./Components/Sala";
import { PuzzleGame } from "./Components/PuzzleGame";
const { Content } = Layout;

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar onMenuClick={() => setSidebarVisible(true)} />
        <Sidebar
          visible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
        />
        <Content style={{ padding: "16px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/salas" element={<Salas />} />
            <Route path="/salas/:salaId/*" element={<Sala />} />
            <Route path="/puzzle" element={<PuzzleGame />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
