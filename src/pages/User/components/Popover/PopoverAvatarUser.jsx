import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import { PopoverIndex } from ".";
import { MenuUser } from "../Menu";

export function PopoverAvatarUser(props) {
  const dataStudent = JSON.parse(localStorage.getItem("info_student"));
  return (
    <div>
      <PopoverIndex content={<MenuUser />}>
        <Avatar
          className="flex justify-center items-center border-1 border-black"
          size={{
            xs: 38,
            sm: 40,
            md: 56,
            lg: 50,
            xl: 54,
            xxl: 57,
          }}
          icon={<UserOutlined />}
          src={<img src={dataStudent?.avatar} alt="avatar_user" />}
        />
      </PopoverIndex>
    </div>
  );
}
