import { adminCourseApi } from '@/API/admin/adminCourseApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Space } from 'antd';

export function ModalFormCourse({ openForm, onChangeClickOpen, dataCourse }) {
  const queryClient = useQueryClient();
  const handleCreateCourse = useMutation({
    mutationKey: ['createCourse'],
    mutationFn: async (values) => await adminCourseApi.createCourse(values),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ['courseList'],
        });
        notificationSuccess('Tạo khóa mới thành công');
        onChangeClickOpen(false);
      } else messageErrorToSever(res, 'Tạo khóa mới thất bại');
    },
  });
  const handleClickSubmit = (props) => {
    props.submit();
  };
  const handleClickCancel = () => {
    onChangeClickOpen(false);
  };
  return (
    <div>
      <ModalForm
        width={750}
        title={dataCourse.id ? 'Cập nhật thông tin khóa' : 'Thêm khóa'}
        initialValues={dataCourse}
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
                title={dataCourse.id ? 'Cập nhật' : 'Tạo mới'}
                loading={handleCreateCourse.isLoading}
              />
              <ButtonCustom title='Hủy' handleClick={handleClickCancel} />
            </Space>,
          ],
        }}
        open={openForm}
        onFinish={(value) => handleCreateCourse.mutate(value)}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              { required: true, message: 'Vui lòng nhập đầy đủ thông tin' },
              {
                min: 1,
                max: 5,
                message: 'Vượt quá số kí tự',
              },
            ]}
            width='md'
            name='id'
            label='Mã khóa'
            placeholder='Nhập mã khóa học, ví dụ: K65'
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
