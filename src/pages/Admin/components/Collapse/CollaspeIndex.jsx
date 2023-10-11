import { Collapse } from 'antd';
import React from 'react';

export function CollaspeIndex({ children }) {
  return <Collapse accordion>{children}</Collapse>;
}
