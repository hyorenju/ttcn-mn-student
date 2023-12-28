import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
import { PopoverIndex } from '.';
import { MenuUser } from '../Menu';

export function PopoverAvatarUser(props) {
  const dataStudent = JSON.parse(localStorage.getItem('info_student'));
  return (
    <div>
      <PopoverIndex content={<MenuUser />}>
        <Avatar
          className={`${
            dataStudent.avatar
              ? 'border-1 border-black flex justify-center items-center'
              : 'flex justify-center items-center'
          } `}
          size={{
            xs: 45,
            sm: 50,
            md: 56,
            lg: 50,
            xl: 54,
            xxl: 57,
          }}
          icon={<UserOutlined />}
          src={dataStudent?.avatar ? <img src={dataStudent?.avatar} alt='avatar_user' /> : ''}
        />
      </PopoverIndex>
    </div>
  );
}
