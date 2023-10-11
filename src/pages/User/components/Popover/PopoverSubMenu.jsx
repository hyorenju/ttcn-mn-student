import { MenuOutlined } from '@ant-design/icons';
import React from 'react';
import { PopoverIndex } from '.';
import { SubMenu } from '../Menu';

export function PopoverSubMenu(props) {
  return (
    <div>
      <PopoverIndex content={<SubMenu />}>
        <MenuOutlined className='text-2xl text-black md:hidden' />
      </PopoverIndex>
    </div>
  );
}
