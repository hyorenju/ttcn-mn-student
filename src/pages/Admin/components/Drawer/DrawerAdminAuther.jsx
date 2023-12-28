import { Collapse } from 'antd';
import React from 'react';
import { FormAuthAdmin, FormAuthMod, FormAuthStudent } from '../Form';

export function DrawerAdminAuther(props) {
  const { Panel } = Collapse;

  return (
    <div>
      <Collapse
        accordion
        style={{
          width: '100%',
        }}
      >
        <Panel header='Quản trị viên' key='1'>
          <FormAuthAdmin />
        </Panel>
        <Panel header='Kiểm duyệt viên' key='3'>
          <FormAuthMod />
        </Panel>
        {/* <Panel header='Lớp trưởng' key='4'>
          <FormAuthMod />
        </Panel> */}
        <Panel header='Sinh viên' key='5'>
          <FormAuthStudent />
        </Panel>
      </Collapse>
    </div>
  );
}
