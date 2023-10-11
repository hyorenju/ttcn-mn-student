import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { message, notification } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { changePassword } from '../../../../API/axios';

export function ModalChangePassword({ openModal, onOpenChange, onSuccess }) {
  const { roleId } = useParams();
  const onFinish = (values) => {
    changePassword({ id: roleId, values: values }).then((res) => {
      if (res.data?.success === true) {
        notification.success({
          message: 'Thành công',
          description: 'Cập nhật mật khẩu thành công',
          duration: 2,
        });
        onSuccess();
      } else if (res.data?.success === false) {
        message.error(res.data?.error.message);
      }
    });
  };
  return (
    <div>
      <ModalForm
        width={740}
        modalProps={{
          destroyOnClose: true,
          okText: 'Cập nhật',
          okType: 'primary',
          cancelText: 'Hủy',
        }}
        title='Cập nhật mật khẩu'
        open={openModal}
        onOpenChange={onOpenChange}
        onFinish={onFinish}
      >
        <ProForm.Group>
          <ProFormText
            label='Mật khẩu hiện tại'
            name='currentPassword'
            width='md'
            placeholder='Nhập mật khẩu hiện tại'
          ></ProFormText>
          <ProFormText label='Mật khẩu mới' name='newPassword' width='md' placeholder='Nhập mật khẩu mới'></ProFormText>
          <ProFormText
            width='md'
            label='Xác nhận mật khẩu mới'
            name='confirmPassword'
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không trùng khớp !'));
                },
              }),
            ]}
            placeholder='Xác nhận mật khẩu mới'
          ></ProFormText>
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
