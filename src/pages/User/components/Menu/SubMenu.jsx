import {
  HomeOutlined,
  OrderedListOutlined,
  ReadOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export function SubMenu() {
  const navigate = useNavigate();
  const handleClickItemMenu = ({ key }) => {
    navigate(key);
  };
  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };
  const items = [
    getItem("Trang chủ", "/", <HomeOutlined />),
    getItem("Tin tức", "/news", <OrderedListOutlined />),
    getItem("Về chúng tôi", "/aboutus", <TeamOutlined />),
    getItem("Tài liệu học tập", "/documents", <ReadOutlined />),
  ];
  return (
    <div>
      <Menu
        style={{
          border: "none",
          fontSize: 15,
        }}
        items={items}
        defaultSelectedKeys={[window.location.pathname]}
        onClick={handleClickItemMenu}
        triggerSubMenuAction={"click"}
      />
    </div>
  );
}
