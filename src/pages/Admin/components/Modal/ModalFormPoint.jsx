import { adminPointApi } from '@/API/admin/adminPointApi';
import { adminSemesterApi } from '@/API/admin/adminSemesterApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification/NotificationSuccess';
import { addPoint, updatePoint } from '@/redux/Point/pointSlice';
import { ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Space } from 'antd';
import { useDispatch } from 'react-redux';

export function ModalFormPoint({ openForm, onChangeClickOpen, dataPoint }) {
  const dispatch = useDispatch();
  const getTermList = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getTermList'],
    queryFn: async () => await adminSemesterApi.getAllTermSelection(),
    onSuccess: (res) => {
      if (res && res.success === false) {
        messageErrorToSever(res, 'Lấy danh sách học kỳ lỗi');
      }
    },
  });
  const handleCreatePoint = useMutation({
    mutationKey: ['createPoint'],
    mutationFn: async (value) => adminPointApi.createPoint(value),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(addPoint(res.data));
        notificationSuccess('Tạo điểm mới thành công');
        onChangeClickOpen(false);
      } else messageErrorToSever(res, 'Tạo điểm thất bại');
    },
  });
  const handleUpdatePoint = useMutation({
    mutationKey: ['updatePoint'],
    mutationFn: async (value) => adminPointApi.updatePoint(dataPoint.id, value),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(updatePoint(res.data));
        notificationSuccess('Cập nhật điểm thành công');
        onChangeClickOpen();
      } else messageErrorToSever(res, 'Cập nhật điểm thất bại');
    },
  });
  const filterOptionTerm = (input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase());
  const optionTerm = getTermList.data?.data?.items.map((item) => ({ label: item.id, value: item.id }));
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
          <ProFormSelect
            showSearch
            fieldProps={{
              optionFilterProp: 'children',
              filterOption: filterOptionTerm,
            }}
            options={optionTerm}
            rules={[{ required: true, message: 'Không thể để trống' }]}
            width='md'
            name={['term', 'id']}
            label='Mã học kỳ'
            placeholder='Chọn mã học kỳ. Ví dụ: 20211'
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
