import { Modal } from 'antd';
import React from 'react';

export function ModalShowPreview({ open, setOpen, children, title, handleClickOk, okText }) {
  return (
    <div>
      <Modal title={title} open={open} onCancel={() => setOpen(false)} onOk={handleClickOk} okText={okText}>
        {children}
      </Modal>
    </div>
  );
}
