import { studentApi } from '@/API/Student';
import { ButtonCustom } from '@/components/Button';
import { notificationError, notificationSuccess } from '@/components/Notification';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useMutation } from '@tanstack/react-query';
import { Space } from 'antd';

export function ModalFormChangeEmail({ open, onOpenChange }) {
  const updateEmail = useMutation({
    mutationKey: ['updateEmail'],
    mutationFn: async (values) => await studentApi.updateEmail(values),
    onSuccess: (res) => {
      if (res && res.success === true) {
        localStorage.setItem('info_student', JSON.stringify(res.data));
        notificationSuccess('Cập nhật email thành công');
        onOpenChange(false);
      } else if (res && res.success === false && res.error?.code === 500) {
        notificationError(res.error?.message);
      } else {
        notificationError('Cập nhật email thất bại');
      }
    },
  });
  const onFinish = (values) => {
    updateEmail.mutate(values);
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
        width={400}
        open={open}
        title={<h1 className='text-xl mb-4'>Cập nhật mật khẩu</h1>}
        onOpenChange={onOpenChange}
        onFinish={onFinish}
        submitter={{
          render: (props) => [
            <div className='w-full flex justify-between items-center'>
              <Space>
                <ButtonCustom
                  loading={updateEmail.isLoading}
                  type='primary'
                  title={'Cập nhật'}
                  handleClick={() => handleClickSubmit(props)}
                />
                <ButtonCustom title={'Hủy'} handleClick={handleClickCancel} />
              </Space>
            </div>,
          ],
        }}
        modalProps={{
          destroyOnClose: true,
          maskClosable: false,
        }}
      >
        <ProFormText
          name='email'
          required
          rules={[
            {
              required: true,
              message: 'Không thể bỏ trống',
            },
          ]}
          label={<p className='text-md'>Email</p>}
          placeholder='Nhập email mới. example@gmail.com'
        />
      </ModalForm>
    </div>
  );
}
