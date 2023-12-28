import { adminStatusApi } from '@/API/admin/adminStatusApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Space } from 'antd';

export function ModalFormStatus({ open, onChangeClickOpen, dataStatus }) {
  const queryClient = useQueryClient();
  // handle create class
  const handleCreateStatus = useMutation({
    mutationKey: ['createStatus'],
    mutationFn: async (values) => adminStatusApi.createStatus(values),
    onSuccess: (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['listStatus'],
        });
        notificationSuccess('Tạo tình trạng thành công');
        onChangeClickOpen(false);
      } else messageErrorToSever(res, 'Tạo tình trạng thất bại');
    },
  });

  // handle update class
  const handleUpdateStatus = useMutation({
    mutationKey: ['updateStatus'],
    mutationFn: async (values) => adminStatusApi.updateStatus(dataStatus.id, values),
    onSuccess: (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['listStatus'],
        });
        notificationSuccess('Cập nhật tình trạng thành công');
        onChangeClickOpen(false);
      } else messageErrorToSever(res, 'Cập nhật tình trạng thất bại');
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
        title={dataStatus.id ? 'Cập nhật thông tin tình trạng' : 'Thêm tình trạng'}
        initialValues={dataStatus}
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
                title={dataStatus.id ? 'Cập nhật' : 'Tạo mới'}
                loading={dataStatus.id ? handleUpdateStatus.isLoading : handleCreateStatus.isLoading}
              />
              <ButtonCustom title='Hủy' handleClick={handleClickCancel} />
            </Space>,
          ],
        }}
        open={open}
        onFinish={(values) => {
          if (dataStatus.id) {
            handleUpdateStatus.mutate(values);
          } else {
            handleCreateStatus.mutate(values);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Không thể để trống' }]}
            width='md'
            name='name'
            label='Tên tình trạng'
            placeholder='Nhập tên tình trạng'
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
