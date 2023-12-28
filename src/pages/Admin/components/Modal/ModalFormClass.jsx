import { adminClassApi } from '@/API/admin/adminClassApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Space } from 'antd';

export function ModalFormClass({ openModalForm, onChangeClickOpen, dataClass }) {
  const queryClient = useQueryClient();

  // handle create class
  const handleCreateClass = useMutation({
    mutationKey: ['createClass'],
    mutationFn: async (values) => await adminClassApi.createClass(values),
    onSuccess: (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['classList'],
        });
        onChangeClickOpen(false);
        notificationSuccess('Tạo lớp thành công');
      } else messageErrorToSever(res, 'Tạo lớp thất bại');
    },
  });

  // handle update class
  const handleUpdateClass = useMutation({
    mutationKey: ['updateClass'],
    mutationFn: async (values) => await adminClassApi.updateClass(values),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ['classList'],
        });
        onChangeClickOpen(false);
        notificationSuccess('Cập nhật lớp thành công');
      } else messageErrorToSever(res, 'Cập nhật lớp thất bại');
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
        title={dataClass.id ? 'Cập nhật thông tin lớp' : 'Thêm lớp'}
        initialValues={dataClass}
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
                title={dataClass.id ? 'Cập nhật' : 'Tạo mới'}
                loading={dataClass.id ? handleUpdateClass.isLoading : handleCreateClass.isLoading}
              />
              <ButtonCustom title='Hủy' handleClick={handleClickCancel} />
            </Space>,
          ],
        }}
        open={openModalForm}
        onFinish={(values) => {
          if (dataClass.id) {
            handleUpdateClass.mutate(values);
          } else {
            handleCreateClass.mutate(values);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin ' }]}
            width='md'
            name='id'
            label='Mã lớp'
            placeholder='Nhập mã lớp'
            disabled={dataClass.id ? true : false}
            validateDebounce={3}
          />
          <ProFormText
            rules={[
              {
                required: '^K[0-9]+-[0-9]+-',
                message: 'Vui lòng nhập đầy đủ thông tin ',
              },
            ]}
            width='md'
            name='name'
            label='Tên lớp'
            placeholder='Nhập tên lớp học'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width='md'
            name={['monitor', 'id']}
            label='Mã sinh viên lớp trưởng'
            placeholder='Nhập mã sinh viên lớp trưởng'
          />
          <ProFormText
            width='md'
            name={['viceMonitor', 'id']}
            label='Mã sinh viên lớp phó'
            placeholder='Nhập mã sinh viên lớp phó'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width='md'
            name={['secretary', 'id']}
            label='Mã sinh viên bí thư'
            placeholder='Nhập mã sinh viên bí thư'
          />
          <ProFormText
            width='md'
            name={['deputySecretary', 'id']}
            label='Mã sinh viên phó bí thư'
            placeholder='Nhập mã sinh viên phó bí thư'
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
