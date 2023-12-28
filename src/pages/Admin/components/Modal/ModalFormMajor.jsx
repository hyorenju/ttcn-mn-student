import { adminMajorApi } from '@/API/admin/adminMajorApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Space } from 'antd';

export function ModalFormMajor({ openForm, onChangeClickOpen, dataMajor }) {
  const queryClient = useQueryClient();
  const handleCreateMajor = useMutation({
    mutationKey: ['createMajor'],
    mutationFn: async (values) => await adminMajorApi.createMajor(values),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['majorList'],
        });
        onChangeClickOpen(false);
        notificationSuccess('Tạo ngành thành công');
      } else messageErrorToSever(res, 'Tạo ngành thất bại');
    },
  });
  const handleUpdateMajor = useMutation({
    mutationKey: ['updateMajor'],
    mutationFn: async (values) => await adminMajorApi.updateMajor(values),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ['majorList'],
        });
        onChangeClickOpen(false);
        notificationSuccess('Cập nhật ngành thành công');
      } else messageErrorToSever(res, 'Cập nhật ngành thất bại');
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
        title={dataMajor.id ? 'Sửa thông tin chuyên ngành' : 'Thêm chuyên ngành'}
        initialValues={dataMajor}
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
                title={dataMajor.id ? 'Cập nhật' : 'Tạo mới'}
                loading={dataMajor.id ? handleUpdateMajor.isLoading : handleCreateMajor.isLoading}
              />
              <ButtonCustom title='Hủy' handleClick={handleClickCancel} />
            </Space>,
          ],
        }}
        open={openForm}
        onFinish={(values) => {
          if (dataMajor.id) {
            handleUpdateMajor.mutate(values);
          } else {
            handleCreateMajor.mutate(values);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
            width='md'
            name='id'
            disabled={dataMajor.id ? true : false}
            label='Mã chuyên ngành'
            placeholder='Nhập mã chuyên ngành. Ví dụ: CNTT'
          />
          <ProFormText
            rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
            width='md'
            name='name'
            label='Tên chuyên ngành:'
            placeholder='Nhập tên chuyên ngành. Ví dụ: Công nghệ thông tin'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
            width='md'
            name='totalCredits'
            label='Tổng số tín chỉ tích lũy'
            placeholder='Nhập tổng số tín chỉ'
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
