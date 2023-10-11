import { Collapse } from 'antd';
import React from 'react';

export function PanelIndex({ children, header, key }) {
  const { Panel } = Collapse;
  return (
    <Panel header={header} key={key}>
      {children}
    </Panel>
  );
}
