import { adminClassApi } from '@/API/admin/adminClassApi';
import { adminMajorApi } from '@/API/admin/adminMajorApi';
import { adminStudentApi } from '@/API/admin/adminStudentApi';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { addStudent, updateStudent } from '@/redux/Student/studentSilce';
import { ModalForm, ProForm, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Space } from 'antd';
import { useDispatch } from 'react-redux';

export function ModalFormStudentInfo({ openForm, onChangeClickOpen, dataStudent }) {
  const dispatch = useDispatch();
  const getMajorList = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getMajorList'],
    queryFn: async () => await adminMajorApi.getMajorSelection(),
    onSuccess: (res) => {
      if (res && res.success === false) {
        messageErrorToSever(res, 'Lấy danh sách ngành lỗi');
      }
    },
  });
  const getClassList = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getClassList'],
    queryFn: async () => await adminClassApi.getClassSelection(),
    onSuccess: (res) => {
      if (res && res.success === false) {
        messageErrorToSever(res, 'Lấy danh sách lớp lỗi');
      }
    },
  });
  const optionClass = getClassList.data?.data?.items.map((item) => ({ label: item.id, value: item.id }));
  const optionMajor = getMajorList.data?.data?.items.map((item) => ({ label: item.id, value: item.id }));
  const filterOptionMajor = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const filterOptionClass = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const optionFamilyCircumstances = [
    { label: 'Không', value: 'Không' },
    { label: 'Khuyết tật', value: 'Khuyết tật' },
    { label: 'Mồ côi cha mẹ', value: 'Mồ côi cha mẹ' },
    { label: 'Nghèo, cận nghèo', value: 'Nghèo cận nghèo' },
    { label: 'Dân tộc thiểu số, miền núi', value: 'Dân tộc thiểu số' },
    { label: 'Con thương binh liệt sĩ', value: 'Con thương binh liệt sĩ' },
  ];
  const optionGender = [
    { label: 'Nam', value: 'Nam' },
    { label: 'Nữ', value: 'Nữ' },
    { label: 'Khác', value: 'Khác' },
  ];
  const handleCreateStudent = useMutation({
    mutationFn: async (values) => await adminStudentApi.createStudent(values),
    onSuccess: (res) => {
      if (res && res.success) {
        dispatch(addStudent(res.data));
        notificationSuccess('Tạo sinh viên thành công');
        onChangeClickOpen(false);
      } else messageErrorToSever(res, 'Tạo sinh viên thất bại');
    },
  });

  const handleUpdateStudent = useMutation({
    mutationFn: async (values) => await adminStudentApi.updateStudent(values),
    onSuccess: (res) => {
      if (res && res?.success) {
        dispatch(updateStudent(res.data));
        notificationSuccess(`Cập nhật sinh viên ${dataStudent.surname} ${dataStudent.lastName} thành công`);
        onChangeClickOpen();
      } else messageErrorToSever(res, 'Cập nhật sinh viên thất bại');
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
        width={1100}
        title={dataStudent.id ? 'Cập nhật thông tin sinh viên' : 'Thêm sinh viên'}
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
                loading={dataStudent.id ? handleUpdateStudent.isLoading : handleCreateStudent.isLoading}
              />
              <ButtonCustom title='Hủy' handleClick={handleClickCancel} />
            </Space>,
          ],
        }}
        open={openForm}
        onFinish={(values) => {
          if (dataStudent.id) {
            handleUpdateStudent.mutate(values);
          } else {
            handleCreateStudent.mutate(values);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name='surname'
            label='Họ đệm'
            placeholder='Nhập họ đệm sinh viên'
          />
          <ProFormText
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name='lastName'
            label='Tên'
            placeholder='Nhập tên sinh viên'
          />
          <ProFormText
            rules={[
              { required: true, message: 'Không được để trống' },
              { pattern: '^[0-9]+$', message: 'Mã sinh viên chỉ chứa kí tự số' },
              { max: 10, message: 'Mã sinh viên không thể quá 10 kí tự số' },
            ]}
            width='md'
            name='id'
            label='Mã sinh viên'
            placeholder='Nhâp mã sinh viên'
            disabled={dataStudent.id ? true : false}
            validateDebounce={10000}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name='phoneNumber'
            label='Số điện thoại'
            placeholder='Nhập số điện thoại'
          />
          <ProFormText
            width='md'
            name='phoneNumber2'
            label='Số điện thoại dự phòng'
            placeholder='Nhập số điện thoại dự phòng'
          />
          <ProFormText
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name='dob'
            label='Ngày sinh'
            placeholder='Nhập ngày sinh, dd/MM/YYYY'
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
          <ProFormText
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name={['course', 'id']}
            label='Khóa'
            placeholder='Nhập khóa học'
          />
          <ProFormRadio.Group
            width='md'
            rules={[{ required: true, message: 'Không được để trống' }]}
            name='gender'
            label='Giới tính'
            options={optionGender}
            placeholder='Chọn giới tính'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name={['major', 'id']}
            label='Mã ngành'
            showSearch
            fieldProps={{
              filterOption: filterOptionMajor,
            }}
            placeholder='Chọn mã ngành'
            options={optionMajor}
          />
          <ProFormSelect
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name={['aclass', 'id']}
            label='Mã lớp'
            options={optionClass}
            showSearch
            fieldProps={{
              filterOption: filterOptionClass,
            }}
            placeholder='Chọn mã lớp học'
          />
          <ProFormText
            rules={[{ required: true, message: 'Không được để trống' }]}
            width='md'
            name='homeTown'
            label='Quê quán'
            placeholder='Nhập quê quán'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width='md'
            name='residence'
            label='Nơi ở hiện tại'
            placeholder='Nhập nơi ở hiện tại của sinh viên'
          />
          <ProFormText width='md' name='fatherName' label='Họ và tên bố' placeholder='Nhập họ tên bố ' />
          <ProFormText
            width='md'
            name='fatherPhoneNumber'
            label='Số điện thoại bố'
            placeholder='Nhập số điện thoại bố'
          />
          <ProForm.Group>
            <ProFormText width='md' name='motherName' label='Họ và tên mẹ' placeholder='Nhập họ tên mẹ' />
            <ProFormText
              width='md'
              name='motherPhoneNumber'
              label='Số điện thoại mẹ'
              placeholder='Nhập số điện thoại mẹ'
            />
            <ProFormSelect
              width='md'
              rules={[{ required: true, message: 'Không được để trống' }]}
              name='familySituation'
              label='Hoàn cảnh gia đình'
              placeholder='Chọn hoàn cảnh'
              options={optionFamilyCircumstances}
            />
            <ProFormText width='md' name='password' label='Mật khẩu' placeholder='Nhập mật khẩu' />
          </ProForm.Group>
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
