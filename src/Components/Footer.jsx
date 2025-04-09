import { useState } from "react";
import { Layout, Button, Modal } from "antd";
import { HomeOutlined, ReadOutlined, FontSizeOutlined, CompassOutlined, AppstoreOutlined } from "@ant-design/icons";
import { PuzzleGame } from "./PuzzleGame";
import { Link } from "react-router-dom";

const FooterMenu = Layout.Footer;

export const Footer = () => {

  return (
    <>
      <FooterMenu style={{ display: "flex", justifyContent: "space-around", background: "#8B5A2B", color: "#fff" }}>
        <Button type="text" icon={<HomeOutlined />} style={{ color: "#fff" }} />
        <Button type="text" icon={<ReadOutlined />} style={{ color: "#fff" }} />
        <Button type="text" icon={<FontSizeOutlined />} style={{ color: "#fff" }} />
        <Button type="text" icon={<CompassOutlined />} style={{ color: "#fff" }} />
        <Link to="/puzzle" style={{ color: "#fff" }}>
          <Button type="text" icon={<AppstoreOutlined />} style={{ color: "#fff" }}  />
        </Link>
      </FooterMenu>
      
    </>
  );
};
