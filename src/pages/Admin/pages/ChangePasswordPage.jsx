import { Button, Descriptions, Form, Input, Typography, message, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { changePasswordStudent, getInfoStudent } from '../../../API/axios';

function ChangePasswordPage(props) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const studentId = location.pathname.split('/')[2];
  const [dataStudent, setDataStudent] = useState({});
  const { Title } = Typography;
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const openNotification = () => {
    api.success({
      message: 'Thành công',
      description: 'Bạn đã cập nhật mật khẩu thành công !',
    });
  };
  // handle get information student
  const handleGetInfoStudent = (studentId) => {
    if (studentId !== undefined) {
      getInfoStudent(studentId).then((res) => {
        if (res.data?.success === true) {
          setDataStudent(res.data?.data);
        } else {
          message.error(res.data?.error?.message);
        }
      });
    }
  };
  useEffect(() => {
    handleGetInfoStudent(studentId);
  }, [studentId]);

  const onFinish = (values) => {
    setLoading(true);
    changePasswordStudent({ id: studentId, values: values })
      .then((res) => {
        if (res.data?.success === true) {
          setLoading(false);
          form.setFieldsValue({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
          openNotification();
        } else return message.error(res.data?.error?.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className='pt-12'>
      <div className='bg-yellow-200/80 flex flex-col rounded-xl items-center py-20'>
        <Title style={{ textTransform: 'uppercase', marginBottom: 40 }} level={2}>
          Thay đổi mật khẩu
        </Title>
        <Descriptions title='Thông tin cá nhân' column={2} style={{ maxWidth: 200, marginBottom: 40 }}>
          <Descriptions.Item span={2} label='Họ và tên'>
            {dataStudent?.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label='Mã sinh viên'>
            {dataStudent?.id}
          </Descriptions.Item>
        </Descriptions>
        <Form name='basic' onFinish={onFinish} autoComplete='off' style={{ width: 400 }} size='middle' form={form}>
          <Form.Item
            name='currentPassword'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input placeholder='Nhập mật khẩu cũ' style={{ borderRadius: 999 }} size='large' />
          </Form.Item>
          <Form.Item
            name='newPassword'
            rules={[
              {
                required: true,
                message: 'Please input your new password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder='Nhập mật khẩu mới' style={{ borderRadius: 999 }} size='large' />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Không trùng khớp !'));
                },
              }),
            ]}
          >
            <Input.Password
              size='large'
              placeholder='Nhập lại mật khẩu mới'
              style={{ borderRadius: 999 }}
              className='placeholder:italic placeholder:text-slate-400'
            />
          </Form.Item>
          {contextHolder}
          <div className='flex justify-center items-center'>
            <Button
              size='large'
              loading={loading}
              type='default'
              htmlType='submit'
              style={{ borderRadius: 999, backgroundColor: 'white', fontWeight: 500 }}
            >
              Cập nhật
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
