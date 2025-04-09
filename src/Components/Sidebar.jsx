import { Drawer, Menu } from "antd";

export const Sidebar = ({ visible, onClose }) => {
  return (
    <Drawer title="Menú" placement="left" onClose={onClose} visible={visible}>
      <Menu>
        <Menu.Item>Inicio</Menu.Item>
        <Menu.Item>Sobre el Museo</Menu.Item>
        <Menu.Item>Contacto</Menu.Item>
      </Menu>
    </Drawer>
  );
};
