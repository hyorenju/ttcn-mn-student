import { adminStatusApi } from '@/API/admin/adminStatusApi';
import { adminStudentStatusApi } from '@/API/admin/adminStudentStatusApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { ModalForm, ProForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Space } from 'antd';

export function ModalFormStudentStatus({ open, dataStudent, onChangeClickOpen }) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    keepPreviousData: true,
    
    queryKey: ['statusList'],
    queryFn: async () => await adminStatusApi.getAllStatus({ page: 1, size: 100 }),
  });
  const optionSelected = data?.data?.items.map((item) => {
    return { label: item.name, value: item.id };
  });
  const handleClickSubmit = (props) => {
    props.submit();
  };
  const handleUpdateStudentStatus = useMutation({
    mutationKey: ['updateStudentStatus'],
    mutationFn: async (values) => await adminStudentStatusApi.updateStudentStatus(dataStudent.id, values),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ['studentStatusList'],
        });
        notificationSuccess('Cập nhật tình trạng thành công');
        onChangeClickOpen(false);
      } else messageErrorToSever(res, 'Cập nhật tình trạng thất bại');
    },
  });
  const handleCreateStudentStatus = useMutation({
    mutationKey: ['createStudentStatus'],
    mutationFn: async (values) => await adminStudentStatusApi.createStudentStatus(values),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ['studentStatusList'],
        });
        notificationSuccess('Tạo tình trạng thành công');
        onChangeClickOpen(false);
      } else messageErrorToSever(res, 'Tạo tình trạng thất bại');
    },
  });
  const onFinish = (values) => {
    if (dataStudent.id) {
      handleUpdateStudentStatus.mutate(values);
    } else {
      handleCreateStudentStatus.mutate(values);
    }
  };
  const handleClickCancel = () => {
    onChangeClickOpen(false);
  };
  return (
    <div>
      <ModalForm
        width={740}
        title={dataStudent.id ? 'Sửa thông tin tình trạng sinh viên' : 'Thêm tình trạng sinh viên'}
        initialValues={dataStudent}
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
                title={dataStudent.id ? 'Cập nhật' : 'Tạo mới'}
                loading={dataStudent.id ? handleUpdateStudentStatus.isLoading : handleCreateStudentStatus.isLoading}
              />
              <ButtonCustom title='Hủy' handleClick={handleClickCancel} />
            </Space>,
          ],
        }}
        open={open}
        onFinish={onFinish}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            disabled={dataStudent.id ? true : false}
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name={['student', 'id']}
            label='Mã sinh viên'
            placeholder='Nhâp mã sinh viên'
          />
          <ProFormSelect
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            disabled={dataStudent.id ? true : false}
            name={['status', 'id']}
            label='Tình trạng'
            placeholder='Chọn tình trạng'
            mode='single'
            options={optionSelected}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width='md'
            name='time'
            label='Thời gian'
            rules={[{ required: true, message: 'Không được để trống' }]}
            placeholder='Nhập thời gian, dd/MM/YYYY'
          />
          <ProFormTextArea width='md' name='note' label='Ghi chú' placeholder='Ghi chú sinh viên' />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
