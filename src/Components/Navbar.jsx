// Navbar.js
// import { Layout, Button } from "antd"; // Comentamos AntD Header y Button por ahora
// import { MenuOutlined } from "@ant-design/icons"; // No lo usaremos directamente por ahora
import { Link } from "react-router-dom";
import "./Navbar.css"; // Crearemos este archivo o modificaremos el existente

// Importa los iconos que necesites, pueden ser SVGs o de una librería
// Ejemplo con caracteres unicode simples por ahora:
const SearchIcon = () => <span></span>;
const CartIcon = () => <span></span>;
const UserIcon = () => <span></span>;

// Si necesitas el botón de menú para mobile, puedes añadirlo condicionalmente
// o tener una estructura diferente para mobile.
// La plantilla "Theart" no muestra un botón de hamburguesa explícito en el ejemplo del header desktop.

import { useTranslation } from "react-i18next"; // 1. Importa el hook
import i18n from "../i18n"; // 2. Importa la instancia de i18n

export const Navbar = ({ onMenuClick }) => {
  // onMenuClick podría usarse para un drawer en mobile
  // La función onClose no está definida, la eliminamos del Link
  // const onClose = () => {};
  const { t } = useTranslation(); // 3. Usa el hook

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="theart-main-header">
      <div className="theart-header-container">
        <Link to="/" className="theart-logo">
          {t("pagina_home.titulo_museo")}
        </Link>

        <nav className="theart-main-nav">
          <ul>
            {/* 4. Usa la función t() para traducir */}
            <li>
              <Link to="/" className="active">
                {t("navbar.inicio")}
              </Link>
            </li>
            <li>
              <Link to="/salas">{t("navbar.salas")}</Link>
            </li>
            {/*             <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
             */}
            {/*             <li><Link to="/eventos">Eventos</Link></li>
             */}{" "}
            {/* Puedes añadir más enlaces según la plantilla: Pages, Shop, Blog, Contact */}
          </ul>
        </nav>

        {/* Los selectores de idioma y otros iconos */}
        <div className="theart-header-actions">
          {/* Iconos de la plantilla */}
          {/* <a href="#" className="theart-action-icon"><SearchIcon /></a>
          <a href="#" className="theart-action-icon"><CartIcon /> <span className="cart-count">(0)</span></a>
          <a href="#" className="theart-action-icon"><UserIcon /></a>
 */}
          {/* Tus selectores de idioma, estilizados */}
          <div className="theart-language-selector">
            {/* 5. Añade los botones con sus onClick */}
            <button 
              className={`theart-lang-btn ${i18n.language === 'es' ? 'active' : ''}`} 
              onClick={() => changeLanguage('es')}
            >
              <img className="theart-lang-flag" src={`${import.meta.env.BASE_URL}bandera_español.png`} alt="ES"/> ES
            </button>
            <button 
              className={`theart-lang-btn ${i18n.language === 'en' ? 'active' : ''}`} 
              onClick={() => changeLanguage('en')}
            >
              <img className="theart-lang-flag" src={`${import.meta.env.BASE_URL}bandera_ingles.png`} alt="EN"/> EN
            </button>
            {/* <button className="theart-lang-btn">
              <img className="theart-lang-flag" src={`${import.meta.env.BASE_URL}bandera_quechua.png`} alt="QU"/> QU
            </button> */}
          </div>
          {/* Botón de menú para mobile (opcional, si lo manejas con CSS o JS) */}
          {/* <button type="button" className="theart-mobile-menu-toggle" onClick={onMenuClick}>
            <MenuOutlined style={{ color: 'var(--color-text-light-theart)' }}/>
          </button> */}
        </div>
      </div>
    </header>
  );
};
