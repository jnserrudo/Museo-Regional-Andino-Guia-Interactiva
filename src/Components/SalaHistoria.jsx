import React from "react";

export const SalaHistoria = () => {
  return (
    <div className="historia-container">
      <div className="historia-section">
        <h2 className="historia-title">
          El 28 de septiembre de 1902 un Decreto presidencial...
        </h2>
        <img src="/historia/mapa1.jpg" alt="Mapa 1" className="historia-img" />
        <p className="historia-text">
          Los Territorios Nacionales eran jurisdicciones que pertenecían...
        </p>
      </div>

      <div className="historia-section">
        <p className="historia-subtext">
          Entre 1880 y 1950 el Poder Ejecutivo Nacional los organizó creando...
        </p>
        <p className="historia-highlight">
          El caso del Territorio de los Andes fue distinto.
        </p>
        <img src="/historia/mapa2.jpg" alt="Mapa 2" className="historia-img" />
      </div>

      <div className="historia-section">
        <p className="historia-subtext">
          El Territorio de Los Andes surgió en la parte de los Andes...
        </p>
        <img src="/historia/mapa3.jpg" alt="Mapa 3" className="historia-img" />
      </div>

      <div className="historia-grid">
        <div className="historia-card">
          <h3>La guerra</h3>
          <p>
            En 1879 Chile ocupó tierras en disputa con Bolivia, iniciando la Guerra del Pacífico...
          </p>
        </div>
        <div className="historia-card">
          <h3>Laudo Buchanan</h3>
          <p>
            En 1899, el gobierno de EEUU propuso un arbitraje para resolver el litigio...
          </p>
        </div>
        <div className="historia-card">
          <h3>La diplomacia</h3>
          <p>
            En 1898, el gobierno boliviano denunció la ocupación chilena...
          </p>
        </div>
        <div className="historia-card">
          <h3>Con fuerza de ley</h3>
          <p>
            En 1900 se incorporaron oficialmente los territorios de la Puna de Atacama...
          </p>
        </div>
      </div>
    </div>
  );
};
