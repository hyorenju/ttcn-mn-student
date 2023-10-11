import { KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Cookies from 'js-cookie';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function MenuUser(props) {
  const navigate = useNavigate();
  const handleClickItemMenu = ({ key }) => {
    if (key === '') {
      navigate('/');
      Cookies.remove('access_token');
    } else navigate(key);
  };
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('Thông tin cá nhân', '/personal', <UserOutlined />),
    getItem('Đổi mật khẩu', '/changepassword', <KeyOutlined />),
    getItem('Đăng xuất', '', <LogoutOutlined />),
  ];
  return (
    <div>
      <Menu
        style={{
          border: 'none',
          fontSize: 15,
        }}
        items={items}
        defaultSelectedKeys={[window.location.pathname]}
        onClick={handleClickItemMenu}
        triggerSubMenuAction={'click'}
      ></Menu>
    </div>
  );
}
