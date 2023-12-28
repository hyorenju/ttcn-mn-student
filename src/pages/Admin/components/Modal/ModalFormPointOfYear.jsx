import { adminPointApi } from '@/API/admin/adminPointApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification/NotificationSuccess';
import { createPointOfYear, updatePointOfYear } from '@/redux/Point/pointOfYear';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { useMutation } from '@tanstack/react-query';
import { Space } from 'antd';
import { useDispatch } from 'react-redux';

export function ModalFormPointOfYear({ openForm, onChangeClickOpen, dataPoint }) {
  const dispatch = useDispatch();
  const handleCreatePoint = useMutation({
    mutationKey: ['createPoint'],
    mutationFn: async (value) => adminPointApi.createPointOfYear(value),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(createPointOfYear(res.data));
        notificationSuccess('Tạo điểm mới thành công');
        onChangeClickOpen(false);
      } else messageErrorToSever(res, 'Tạo điểm thất bại');
    },
  });
  const handleUpdatePoint = useMutation({
    mutationKey: ['updatePoint'],
    mutationFn: async (value) => adminPointApi.updatePointOfYear(dataPoint.id, value),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(updatePointOfYear(res.data));
        notificationSuccess('Cập nhật điểm thành công');
        onChangeClickOpen(false);
      } else messageErrorToSever(res, 'Cập nhật điểm thất bại');
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
        title={dataPoint.id ? 'Cập nhật thông tin điểm' : 'Thêm điểm'}
        initialValues={dataPoint}
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
                title={dataPoint.id ? 'Cập nhật' : 'Tạo mới'}
                loading={dataPoint.id ? handleUpdatePoint.isLoading : handleCreatePoint.isLoading}
              />
              <ButtonCustom title='Hủy' handleClick={handleClickCancel} />
            </Space>,
          ],
        }}
        open={openForm}
        onFinish={(value) => {
          if (dataPoint.id) {
            handleUpdatePoint.mutate(value);
          } else {
            handleCreatePoint.mutate(value);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Không thể để trống' }]}
            width='md'
            name={['student', 'id']}
            label='Mã sinh viên'
            placeholder='Nhập mã sinh viên. Ví dụ: 655103'
            disabled={dataPoint.id ? true : false}
          />
          <ProFormText
            rules={[{ required: true, message: 'Không thể để trống' }]}
            width='md'
            name='year'
            label='Năm học'
            placeholder='Nhập năm học. Ví dụ: 2022-2023'
            disabled={dataPoint.id ? true : false}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width='md'
            rules={[{ required: true, message: 'Không thể để trống' }]}
            name='avgPoint10'
            label='Điểm trung bình hệ 10'
            placeholder='Nhập điểm trung bình hệ 10'
          />
          <ProFormText
            width='md'
            rules={[{ required: true, message: 'Không thể để trống' }]}
            name='avgPoint4'
            label='Điểm trung bình hệ 4'
            placeholder='Nhập điểm trung bình hệ 4'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width='md'
            rules={[{ required: true, message: 'Không thể để trống' }]}
            name='pointAcc10'
            label='Điểm trung bình tích lũy ( hệ 10 )'
            placeholder='Nhập điểm trung bình tích lũy ( hệ 10 )'
          />
          <ProFormText
            width='md'
            rules={[{ required: true, message: 'Không thể để trống' }]}
            name='pointAcc4'
            label='Điểm trung bình tích lũy ( hệ 4 )'
            placeholder='Nhập điểm trung bình tích lũy ( hệ 4 )'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width='md'
            rules={[{ required: true, message: 'Không thể để trống' }]}
            name='trainingPoint'
            label='Điểm rèn luyện'
            placeholder='Nhập điểm rèn luyện'
          />
          <ProFormText
            width='md'
            rules={[{ required: true, message: 'Không thể để trống' }]}
            name='creditsRegistered'
            label='Số tín chỉ đã đăng kí'
            placeholder='Nhập số tín chỉ đã đăng kí'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width='md'
            rules={[{ required: true, message: 'Không thể để trống' }]}
            name='creditsPassed'
            label='Số tín chỉ đạt'
            placeholder='Nhập số tín chỉ đạt'
          />
          <ProFormText
            width='md'
            rules={[{ required: true, message: 'Không thể để trống' }]}
            name='creditsNotPassed'
            label='Số tín chỉ không đạt'
            placeholder='Nhập số tín chỉ không đạt'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width='md'
            rules={[{ required: true, message: 'Không thể để trống' }]}
            name='creditsAcc'
            label='Số tín chỉ tích lũy'
            placeholder='Nhập số tín chỉ tích lũy'
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
