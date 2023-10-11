import { ModalForm } from '@ant-design/pro-components';
import React from 'react';
import { ButtonCustom } from '../../../../components/Button';

export function ModalFormDocs({
  children,
  onFinish,
  open,
  onOpenChange,
  textSubmit,
  destroyOnClose,
  title,
  maskClosable,
}) {
  return (
    <ModalForm
      title={title}
      modalProps={{
        destroyOnClose,
        maskClosable,
      }}
      open={open}
      onOpenChange={onOpenChange}
      onFinish={onFinish}
      submitter={{
        render: (props) => [
          <div className='flex justify-end gap-1 items-center'>
            <ButtonCustom handleClick={() => onOpenChange(false)} title='Hủy' type='default'></ButtonCustom>
            <ButtonCustom handleClick={() => props.reset()} title='Làm mới' type='default'></ButtonCustom>
            <ButtonCustom handleClick={() => props.submit()} title={textSubmit} type='primary'></ButtonCustom>
          </div>,
        ],
      }}
    >
      {children}
    </ModalForm>
  );
}
