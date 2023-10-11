import { Collapse } from 'antd';
import React from 'react';
import FormAuthAdmin from '../Form/FormAuthAdmin';
import FormAuthSuperMod from '../Form/FormAuthSuperMod';
import FormAuthMod from '../Form/FormAuthMod';
import FormAuthStudent from '../Form/FormAuthStudent';

function DrawerAdminAuther(props) {
  const { Panel } = Collapse;

  return (
    <div>
      <Collapse
        accordion
        style={{
          width: '100%',
        }}
      >
        <Panel header='ADMIN' key='1'>
          <FormAuthAdmin />
        </Panel>
        <Panel header='SUPERMOD' key='2'>
          <FormAuthSuperMod />
        </Panel>
        <Panel header='MOD' key='3'>
          <FormAuthMod />
        </Panel>
        <Panel header='STUDENT' key='4'>
          <FormAuthStudent />
        </Panel>
      </Collapse>
    </div>
  );
}

export default DrawerAdminAuther;
