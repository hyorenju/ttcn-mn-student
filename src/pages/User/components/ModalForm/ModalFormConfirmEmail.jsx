import { visitor } from '@/API/Visistor/visitor';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { useMutation } from '@tanstack/react-query';
import { Space } from 'antd';

export function ModalFormConfirmEmail({ open, onOpenChange }) {
  const handleAutherzation = useMutation({
    mutationKey: ['confirmEmail'],
    mutationFn: async (values) =>
      await visitor.sendRequestChangePassword({
        link: 'http://localhost:3000/changepassword',
        user: values,
      }),
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess(res.data);
      } else messageErrorToSever(res, 'Thất bại');
    },
  });
  const handleClickCancel = () => {
    onOpenChange(false);
  };
  const handleClickSubmit = (props) => {
    props.submit();
  };
  const onFinish = (values) => {
    handleAutherzation.mutate(values);
  };
  return (
    <div>
      <ModalForm
        width={370}
        open={open}
        onOpenChange={onOpenChange}
        title='Xác thực tài khoản'
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          maskClosable: false,
        }}
        onFinish={onFinish}
        submitter={{
          render: (props) => {
            return [
              <div className='flex justify-between w-full items-center'>
                <Space size={10}>
                  <ButtonCustom
                    loading={handleAutherzation.isLoading}
                    type='primary'
                    title='Xác thực'
                    key='submit'
                    handleClick={() => handleClickSubmit(props)}
                  />
                  <ButtonCustom title='Hủy' key='cancel' handleClick={handleClickCancel} />
                </Space>
              </div>,
            ];
          },
        }}
      >
        <ProForm.Group>
          <ProFormText
            width='md'
            name='id'
            required
            rules={[
              {
                required: true,
                message: 'Không được để trống',
              },
            ]}
            label='Tài khoản đăng nhập'
            placeholder='Nhập mã sinh viên'
          />

          <ProFormText
            width='md'
            name='email'
            required
            rules={[
              {
                required: true,
                message: 'Không được để trống',
              },
            ]}
            label='Email đăng kí'
            placeholder='example@gmail.com'
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
