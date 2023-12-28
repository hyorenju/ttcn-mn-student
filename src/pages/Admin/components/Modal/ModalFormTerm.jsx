import { adminSemesterApi } from '@/API/admin/adminSemesterApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Space } from 'antd';

export function ModalFormTerm({ openForm, onChangeClickOpen, dataTerm }) {
  const queryClient = useQueryClient();
  const handleCreateTerm = useMutation({
    mutationKey: ['createTerm'],
    mutationFn: async (values) => await adminSemesterApi.createSemester(values),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ['semesterList'],
        });
        notificationSuccess('Tạo học kỳ thành công');
        onChangeClickOpen(false);
      } else messageErrorToSever(res, 'Tạo học kỳ thất bại');
    },
  });
  const handleClickSubmit = (props) => {
    props.submit();
  };
  const handleClickCancel = (props) => {
    onChangeClickOpen(false);
  };
  return (
    <div>
      <ModalForm
        width={750}
        title={'Thêm kỳ học mới'}
        initialValues={dataTerm}
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
                title={'Tạo mới'}
                loading={handleCreateTerm.isLoading}
              />
              <ButtonCustom title='Hủy' handleClick={handleClickCancel} />
            </Space>,
          ],
        }}
        open={openForm}
        onFinish={(value) => handleCreateTerm.mutate(value)}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              { required: true, message: 'Vui lòng nhập đầy đủ thông tin' },
              {
                pattern: '[0-9]{4}[1-2]',
                message: 'Mã học kỳ có dạng năm + học kỳ',
              },
              { min: 5, max: 5, message: 'Mã học kỳ chỉ dài 5 kí tự số' },
            ]}
            width='md'
            name='id'
            label='Mã học kỳ'
            placeholder='Nhập mã học kỳ, ví dụ: 20201'
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
