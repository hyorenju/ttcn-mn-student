import { adminAdminApi } from '@/API/admin/adminAdminApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { useMutation } from '@tanstack/react-query';
import { Space } from 'antd';

export function ModalChangePassword({ openModal, onOpenChange }) {
  const handleChangePassword = useMutation({
    mutationKey: ['changePasswordAdmin'],
    mutationFn: async (values) => adminAdminApi.changePassword(values),
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess('Đổi mật khẩu thành công');
        onOpenChange(false);
      } else messageErrorToSever(res, 'Đổi mật khẩu thất bại');
    },
  });
  const onFinish = (values) => {
    handleChangePassword.mutate(values);
  };
  const handleClickSubmit = (props) => {
    props.submit();
  };
  const handleClickCancel = () => {
    onOpenChange(false);
  };
  return (
    <div>
      <ModalForm
        width={740}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
        }}
        submitter={{
          render: (props) => [
            <Space>
              <ButtonCustom
                type='primary'
                handleClick={() => handleClickSubmit(props)}
                title={'Cập nhật'}
                loading={handleChangePassword.isLoading}
              />
              <ButtonCustom title='Hủy' handleClick={handleClickCancel} />
            </Space>,
          ],
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
          />
          <ProFormText label='Mật khẩu mới' name='newPassword' width='md' placeholder='Nhập mật khẩu mới' />
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
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
