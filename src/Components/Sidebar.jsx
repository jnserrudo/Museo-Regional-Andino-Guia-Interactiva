import { Drawer, Menu } from "antd";
import { Link } from "react-router-dom";

export const Sidebar = ({ visible, onClose }) => {
  return (
    <Drawer title="Menú"  placement="left" onClose={onClose} open={visible}>
      <Menu>
        <Link to="/" onClick={() => onClose()}>
          <Menu.Item>Inicio</Menu.Item>
        </Link>
        <Link to="/salas" onClick={() => onClose()}>
          <Menu.Item>Salas</Menu.Item>
        </Link>
      </Menu>
    </Drawer>
  );
};
