import { Button, Form, Input, Typography, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { changeForgotStudent } from '../../../../API/axios';
import Footer from '../../components/Footer/Footer';
import HeaderTop from '../../components/Header/Header';

function ConfirmChangPassword(props) {
  const { id } = useParams();
  const { Text } = Typography;
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const onFinish = (values) => {
    if (id !== undefined) {
      setLoadingSubmit(true);
      changeForgotStudent({ id: id, values: values })
        .then((res) => {
          if (res.data?.success === true) {
            message.success(res.data?.data);
            navigate('/');
          } else return message.error(res.data?.error?.message);
        })
        .finally(() => setLoadingSubmit(false));
    }
  };
  return (
    <div>
      <div>
        <HeaderTop />
      </div>
      <div className='bg-slate-200'>
        <div className='max-w-[1100px] mx-auto bg-slate-100 pb-8 min-h-[70vh] justify-center flex'>
          <div className='p-4 mt-20'>
            <Form
              name='basic'
              style={{
                width: 300,
              }}
              onFinish={onFinish}
              autoComplete='off'
              layout='vertical'
            >
              <Form.Item
                label={<Text>Mật khẩu mới</Text>}
                name='newPassword'
                rules={[
                  {
                    required: true,
                    message: 'Nhập đầy đủ thông tin',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={<Text>Xác nhận mật khẩu</Text>}
                name='confirmPassword'
                rules={[
                  {
                    required: true,
                    message: 'Nhập đầy đủ thông tin',
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
                <Input />
              </Form.Item>
              <Form.Item>
                <Button
                  className='flex justify-end items-center px-6'
                  type='primary'
                  htmlType='submit'
                  loading={loadingSubmit}
                >
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default ConfirmChangPassword;
