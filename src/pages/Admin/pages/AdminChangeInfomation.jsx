import { adminAdminApi } from '@/API/admin/adminAdminApi';
import { ButtonCustom } from '@/components/Button';
import { notificationError, notificationSuccess } from '@/components/Notification';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Typography, Upload } from 'antd';
import { useState } from 'react';
import { ModalChangePassword } from '../components/Modal';
import { messageErrorToSever } from '@/components/Message';

function AdminChangeInfomation() {
  const dataAdmin = JSON.parse(localStorage.getItem('info_admin'));
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [openModal, setOpenModal] = useState(false);
  const handleEditProfile = useMutation({
    mutationKey: ['editProfile'],
    mutationFn: async (values) => await adminAdminApi.editProfile(values),
    onSuccess: (res) => {
      if (res && res.success === true) {
        localStorage.setItem('info_admin', JSON.stringify(res.data));
        notificationSuccess('Cập nhật thành công');
      } else messageErrorToSever(null, 'Cập nhật thất bại');
    },
  });
  const onFinish = (values) => {
    handleEditProfile.mutate(values);
  };
  const uploadAvatar = useMutation({
    mutationKey: ['uploadAvatar'],
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('file', file.file);
      return await adminAdminApi.uploadAvatar(formData);
    },
    onSuccess: (res) => {
      if (res && res.success === true) {
        localStorage.setItem('info_admin', JSON.stringify(res.data));
        notificationSuccess('Cập nhật avatar thành công');
      } else if (res && res.success === false && res.error?.code === 500) {
        notificationError(res.error?.message);
      } else {
        notificationError('Cập nhật avatar thất bại');
      }
    },
  });
  const props = {
    multiple: false,
    showUploadList: false,
    customRequest: (file) => uploadAvatar.mutate(file),
    beforeUpload: (file) => {
      const { size, type } = file;
      const isSize = size / 1024 / 1024 < 2;
      const isType = type === 'image/jpeg' || file.type === 'image/png';
      if (!isType) {
        notificationError(`${file.name} phải là một file ảnh`);
        return false;
      }
      if (!isSize) {
        notificationError(`Ảnh tải lên không được quá 2MB`);
        return false;
      }
      return true;
    },
  };
  return (
    <div className='flex justify-center items-center flex-col'>
      <Title
        level={2}
        style={{
          textTransform: 'uppercase',
        }}
      >
        Thông tin cá nhân
      </Title>
      <div className='px-44 pt-16 pb-8 bg-slate-600 rounded-lg flex flex-col items-center max-w-[80%]'>
        <div className='bg-slate-50 px-16 py-8 rounded-lg'>
          <Form
            form={form}
            style={{
              width: 500,
              maxWidth: 700,
            }}
            onFinish={onFinish}
            autoComplete='off'
          >
            <Form.Item label='Tên người dùng' name='name' initialValue={dataAdmin.name}>
              <Input />
            </Form.Item>
            <Form.Item label='Email' name='email' initialValue={dataAdmin.email}>
              <Input />
            </Form.Item>
            <Form.Item label='Ảnh đại diện' valuePropName='fileList'>
              <Upload {...props}>
                <ButtonCustom loading={uploadAvatar.isLoading} title={'Tải ảnh lên'} icon={<UploadOutlined />} />
              </Upload>
            </Form.Item>
            <Button type='link' onClick={() => setOpenModal(true)} className='pl-0'>
              Đổi mật khẩu
            </Button>
            <Form.Item className='flex justify-center items-center'>
              <Button
                type='primary'
                htmlType='submit'
                loading={handleEditProfile.isLoading}
                className='mb-0 w-[150px] flex justify-center items-center'
              >
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <ModalChangePassword
        openModal={openModal}
        onOpenChange={(open) => {
          if (!open) {
            setOpenModal(false);
          }
        }}
        onSuccess={() => setOpenModal(false)}
      />
    </div>
  );
}

export default AdminChangeInfomation;
