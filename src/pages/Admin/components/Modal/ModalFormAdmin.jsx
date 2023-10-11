import { ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { adminAdminApi } from '../../../../API/admin/adminAdminApi';
import { notificationSuccess } from '../../../../components/Notification';
import { addAdmin, updateAdmin } from '../../../../redux/Admin/adminSilce';

export function ModalFormAdmin({ openForm, onChangeClickOpen, dataAdmin, onSuccess, required }) {
  const dispatch = useDispatch();
  const createAdminMutation = useMutation({
    mutationKey: ['createAdmin'],
    mutationFn: async (values) => await adminAdminApi.createAdmin(values),
    onSuccess: (res) => {
      if (res && res.success) {
        dispatch(addAdmin(res.data));
        notificationSuccess('Tạo admin thành công');
        onSuccess();
      } else if (res.error?.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          res.error?.errorDetailList.forEach((e) => message.error(e.message));
        }
      } else if (res.error?.code === 500) {
        message.error(res.error?.message);
      }
    },
  });
  const updateAdminMutation = useMutation({
    mutationKey: ['createAdmin'],
    mutationFn: async (values) => await adminAdminApi.updateAdmin(values),
    onSuccess: (res) => {
      if (res && res.success) {
        dispatch(updateAdmin(res.data));
        notificationSuccess('Cập nhật admin thành công');
        onSuccess();
      } else if (res.error?.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          res.error?.errorDetailList.forEach((e) => message.error(e.message));
        }
      } else if (res.error?.code === 500) {
        message.error(res.error?.message);
      }
    },
  });
  const handleCreateStudent = (values) => {
    createAdminMutation.mutate(values);
  };
  const handleUpdateStudent = (values) => {
    updateAdminMutation.mutate(values);
  };
  return (
    <div>
      <ModalForm
        width={750}
        title={dataAdmin.id ? 'Cập nhật thông tin admin' : 'Thêm admin'}
        initialValues={dataAdmin}
        modalProps={{
          destroyOnClose: true,
          okText: dataAdmin.id ? 'Lưu' : 'Tạo',
          cancelText: 'Hủy',
        }}
        open={openForm}
        onFinish={(values) => {
          if (dataAdmin.id) {
            handleUpdateStudent(values);
          } else {
            handleCreateStudent(values);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name='id'
            label='Tên đăng nhập'
            placeholder='Nhập tên đăng nhập'
          />
          <ProFormText
            rules={[{ required: required, message: 'Không được để trống' }]}
            width='md'
            name='password'
            label='Mật khẩu'
            placeholder='Nhập mật khẩu'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name='name'
            label='Tên người dùng'
            placeholder='Nhập tên người dùng'
          />
          <ProFormSelect
            width='md'
            rules={[{ required: true, message: 'Không được để trống' }]}
            name='roleId'
            label='Vai trò'
            options={[
              {
                label: 'Quản trị viên',
                value: 'ADMIN',
              },
              {
                label: 'Kiểm duyệt viên',
                value: 'MOD',
              },
            ]}
            placeholder='Chọn vai trò'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name='email'
            label='Email'
            placeholder='Nhập email'
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
