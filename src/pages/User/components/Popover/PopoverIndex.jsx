import { Popover } from 'antd';
import React from 'react';

export function PopoverIndex({ children, content }) {
  return (
    <Popover content={content} placement='bottom' trigger={'click'} className='hover:cursor-pointer'>
      {children}
    </Popover>
  );
}

export default PopoverIndex;
