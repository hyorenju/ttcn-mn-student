import { studentApi } from '@/API/Student';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { notificationSuccess } from '@/components/Notification';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useMutation } from '@tanstack/react-query';
import { Col, Row } from 'antd';

export function FormInfoUser() {
  const dataStudent = JSON.parse(localStorage.getItem('info_student'));
  const updateProfile = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: async (values) => await studentApi.updateProfile(values),
    onSuccess: (res) => {
      if (res && res.success === true && res.data) {
        notificationSuccess('Cập nhật thành công');
        localStorage.setItem('info_student', JSON.stringify(res.data));
      } else messageErrorToSever(res, 'Cập nhật thất bại');
    },
  });
  const onFinish = (values) => {
    updateProfile.mutate(values);
  };
  const handleClickSubmit = (e) => {
    e.submit();
  };
  const optionFamilySituation = [
    { label: 'Không', value: 'Không' },
    { label: 'Khuyết tật', value: 'Khuyết tật' },
    { label: 'Mồ côi cha mẹ', value: 'Mồ côi cha mẹ' },
    { label: 'Nghèo, cận nghèo', value: 'Nghèo cận nghèo' },
    { label: 'Dân tộc thiểu số, miền núi', value: 'Dân tộc thiểu số' },
    { label: 'Con thương binh liệt sĩ', value: 'Con thương binh liệt sĩ' },
  ];
  return (
    <div>
      <ProForm
        onFinish={onFinish}
        initialValues={dataStudent}
        submitter={{
          render: (props) => {
            return [
              <div className='flex gap-3 mt-4 justify-center lg:justify-start'>
                <ButtonCustom
                  title='Lưu thông tin'
                  size='large'
                  type='primary'
                  handleClick={() => handleClickSubmit(props)}
                  loading={updateProfile.isLoading}
                />
              </div>,
            ];
          },
        }}
      >
        <Row gutter={[30, 20]} justify={['center']}>
          <Col>
            <ProFormText
              fieldProps={{
                size: 'large',
              }}
              disabled
              width='md'
              name='surname'
              label=<p className='text-base'>Họ Đệm</p>
              rules={[{ required: true, message: 'Không thể bỏ trống' }]}
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: 'large',
              }}
              disabled
              width='md'
              name='lastName'
              label=<p className='text-base'>Tên</p>
              rules={[{ required: true, message: 'Không thể bỏ trống' }]}
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: 'large',
              }}
              disabled
              width='md'
              name='id'
              label=<p className='text-base'>Mã sinh viên</p>
              placeholder='Mã sinh viên'
              rules={[{ required: true, message: 'Không thể bỏ trống' }]}
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: 'large',
              }}
              disabled
              width='md'
              name={['aclass', 'id']}
              label=<p className='text-base'>Lớp</p>
              placeholder='Lớp'
              rules={[{ required: true, message: 'Không thể bỏ trống' }]}
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: 'large',
              }}
              disabled
              width='md'
              name={['major', 'id']}
              label=<p className='text-base'>Chuyên ngành</p>
              placeholder='Chuyên ngành'
              rules={[{ required: true, message: 'Không thể bỏ trống' }]}
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: 'large',
              }}
              disabled
              width='md'
              name='email'
              label=<p className='text-base'>Email</p>
              placeholder='example@gamil.com'
              rules={[{ required: true, message: 'Không thể bỏ trống' }]}
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: 'large',
              }}
              width='md'
              disabled
              name='phoneNumber'
              label=<p className='text-base'>Số điện thoại</p>
              placeholder='+84'
              rules={[{ required: true, message: 'Không thể bỏ trống' }]}
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: 'large',
              }}
              disabled
              width='md'
              rules={[
                {
                  required: true,
                  message: 'Không thể để trống',
                },
              ]}
              name='homeTown'
              label=<p className='text-base'>Địa chỉ quê quán</p>
              placeholder='Số nhà - Ngõ (Ngách) - Xã - Phường'
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: 'large',
              }}
              width='md'
              name='residence'
              rules={[
                {
                  required: true,
                  message: 'Không thể để trống',
                },
              ]}
              label=<p className='text-base'>Địa chỉ nơi ở hiện tại</p>
              placeholder='Số nhà - Ngõ (Ngách) - Xã - Phường'
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: 'large',
              }}
              width='md'
              name='fatherName'
              label=<p className='text-base'>Họ và tên bố</p>
              placeholder=''
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: 'large',
              }}
              width='md'
              name='fatherPhoneNumber'
              label=<p className='text-base'>Số điện thoại bố</p>
              placeholder='+ 84'
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: 'large',
              }}
              width='md'
              name='motherName'
              label=<p className='text-base'>Họ và tên mẹ</p>
              placeholder=''
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: 'large',
              }}
              width='md'
              name='motherPhoneNumber'
              label=<p className='text-base'>Số điện thoại mẹ</p>
              placeholder='+ 84'
            />
          </Col>
          <Col>
            <ProFormSelect
              options={optionFamilySituation}
              fieldProps={{
                size: 'large',
              }}
              width='md'
              name='familySituation'
              rules={[{ required: true, message: 'Không thể bỏ trống' }]}
              label=<p className='text-base'>Tình trạng</p>
            />
          </Col>
        </Row>
      </ProForm>
    </div>
  );
}
