import { adminAdminApi } from '@/API/admin/adminAdminApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { addAdmin, updateAdmin } from '@/redux/Admin/adminSilce';
import { ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useMutation } from '@tanstack/react-query';
import { Space } from 'antd';
import { useDispatch } from 'react-redux';

export function ModalFormAdmin({ openForm, onChangeClickOpen, dataAdmin }) {
  const dispatch = useDispatch();
  const createAdminMutation = useMutation({
    mutationKey: ['createAdmin'],
    mutationFn: async (values) => await adminAdminApi.createAdmin(values),
    onSuccess: (res) => {
      if (res && res.success) {
        dispatch(addAdmin(res.data));
        notificationSuccess('Tạo quản trị viên thành công');
        onChangeClickOpen(false);
      } else messageErrorToSever(res, 'Tạo quản trị viên thất bại');
    },
  });
  const updateAdminMutation = useMutation({
    mutationKey: ['updateAdmin'],
    mutationFn: async (values) => await adminAdminApi.updateAdmin(values),
    onSuccess: (res) => {
      if (res && res.success) {
        dispatch(updateAdmin(res.data));
        notificationSuccess('Cập nhật quản trị viên thành công');
        onChangeClickOpen(false);
      } else messageErrorToSever(res, 'Cập nhật quản trị viên thất bại');
    },
  });
  const handleCreateStudent = (values) => {
    createAdminMutation.mutate(values);
  };
  const handleUpdateStudent = (values) => {
    updateAdminMutation.mutate(values);
  };
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
        title={dataAdmin.id ? 'Cập nhật thông tin quản trị viên' : 'Thêm quản trị viên'}
        initialValues={dataAdmin}
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
                title={dataAdmin.id ? 'Cập nhật' : 'Tạo mới'}
                loading={dataAdmin.id ? createAdminMutation.isLoading : createAdminMutation.isLoading}
              />
              <ButtonCustom title='Hủy' handleClick={handleClickCancel} />
            </Space>,
          ],
        }}
        open={openForm}
        onFinish={(values) => {
          if (dataAdmin.id) {
            handleUpdateStudent(values);
          } else {
            handleCreateStudent(values);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name='id'
            disabled={dataAdmin.id ? true : false}
            label='Tên đăng nhập'
            placeholder='Nhập tên đăng nhập'
          />
          <ProFormText
            rules={dataAdmin.id ? null : [{ required: true, message: 'Không được để trống' }]}
            width='md'
            name='password'
            label='Mật khẩu'
            placeholder='Nhập mật khẩu'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name='name'
            label='Tên người dùng'
            placeholder='Nhập tên người dùng'
          />
          <ProFormSelect
            width='md'
            rules={[{ required: true, message: 'Không được để trống' }]}
            name={['role', 'id']}
            label='Vai trò'
            options={[
              {
                label: 'Quản trị viên',
                value: 'ADMIN',
              },
              {
                label: 'Kiểm duyệt viên',
                value: 'MOD',
              },
            ]}
            placeholder='Chọn vai trò'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name='email'
            label='Email'
            placeholder='Nhập email'
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
