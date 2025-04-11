import { Layout, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

export const Navbar = ({ onMenuClick }) => {
  return (
    <Header className="header" style={{ background: "#8B5A2B" }}>
      <div className="cont_menu_txt">
        <Button type="text" icon={<MenuOutlined />} onClick={onMenuClick} style={{ color: "#fff" }} />
        <p className="txt_nav" >MUSEO REGIONAL ANDINO</p>

      </div>
      <div className="cont_band_leng">
        <div className="band_leng">
          <img className="band" src={`${import.meta.env.BASE_URL}bandera_ingles.png`} />
          <Button className="btn_leng" type="text" style={{ color: "#fff" }}>EN</Button>

        </div>
        <div className="band_leng">
          <img className="band" src={`${import.meta.env.BASE_URL}bandera_español.png`} />
          <Button className="btn_leng" type="text" style={{ color: "#fff" }}>ES</Button>

        </div>
        <div className="band_leng">
          <img className="band" src={`${import.meta.env.BASE_URL}bandera_quechua.png`} />
          <Button className="btn_leng" type="text" style={{ color: "#fff" }}>QU</Button>

        </div>
      </div>
    </Header>
  );
};
