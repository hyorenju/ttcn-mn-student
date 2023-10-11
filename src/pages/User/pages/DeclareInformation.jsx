import { Button, Col, Form, Input, Row, Select, Skeleton, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInfoStudent, updateStudentInfoDetails } from '../../../API/axios';

function DeclareInformationPage(props) {
  const { Text } = Typography;
  const { studentId } = useParams();
  const [dataStudent, setDataStudent] = useState({});
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  // handle get information student
  const handleGetInfoStudent = (studentId) => {
    if (studentId !== undefined) {
      setLoadingPage(true);
      getInfoStudent(studentId)
        .then((res) => {
          if (res.data?.success === true) {
            setDataStudent(res.data?.data);
            setLoadingPage(false);
          } else {
            message.error(res.data?.error?.message);
          }
        })
        .finally(() => setLoadingPage(false));
    }
  };
  useEffect(() => {
    handleGetInfoStudent(studentId);
  }, [studentId]);

  const onFinish = (values) => {
    setLoadingBtn(true);
    updateStudentInfoDetails(studentId, values)
      .then((res) => {
        if (res.data?.success === true) {
          handleGetInfoStudent(studentId);
          message.success('Cập nhật thông tin sinh viên thành công');
        } else return message.error(res.data?.error?.message);
      })
      .finally(() => setLoadingBtn(false));
  };

  const container = (
    <div className='flex flex-col justify-center items-center bg-orange-300 rounded-xl py-10'>
      <div className='flex flex-col justify-center items-center'>
        <Form
          title='Cập nhật thông tin'
          layout='vertical'
          name='basic'
          labelCol={{ span: 12 }}
          style={{
            width: 800,
          }}
          initialValues={dataStudent}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Row gutter={[48, 24]}>
            <Col span={12}>
              <Form.Item label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Họ và tên</Text>} name='name'>
                <Input size='large' disabled={true} style={{ backgroundColor: '#fff' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Mã sinh viên</Text>} name='id'>
                <Input size='large' disabled={true} style={{ backgroundColor: '#fff' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Lớp</Text>} name={['classes', 'id']}>
                <Input size='large' disabled={true} style={{ backgroundColor: '#fff' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Chuyên ngành</Text>}
                name={['major', 'id']}
              >
                <Input size='large' disabled={true} style={{ backgroundColor: '#fff' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Số điện thoại</Text>}
                name='phoneNumber'
                rules={[
                  {
                    required: true,
                    message: 'Không thể để trống số điện thoại',
                  },
                ]}
              >
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Email</Text>}
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Không thể để trống địa chỉ email',
                  },
                ]}
              >
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Địa chỉ nơi ở hiện tại</Text>}
                name='residence'
              >
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Địa chỉ quê quán</Text>}
                name='homeTown'
              >
                <Input size='large' disabled={true} style={{ backgroundColor: '#fff' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Họ và tên bố</Text>} name='fatherName'>
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Số điện thoại bố</Text>}
                name='fatherPhoneNumber'
              >
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Họ và tên mẹ</Text>} name='motherName'>
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Số điện thoại mẹ</Text>}
                name='motherPhoneNumber'
              >
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Tình trạng</Text>} name='status'>
                <Select size='large'>
                  <Select.Option value='stillStudying'>Còn đi học</Select.Option>
                  <Select.Option value='graduated'>Đã tốt nghiệp</Select.Option>
                  <Select.Option value='dropped'>Đã bỏ học</Select.Option>
                  <Select.Option value='forcedOut'>Bị buộc thôi học</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<Text style={{ fontSize: 16, fontWeight: 500 }}>Thời gian</Text>} name='statusDate'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Button
                loading={loadingBtn}
                type='default'
                htmlType='submit'
                className='flex justify-center items-center px-8 py-4 bg-white font-medium'
              >
                Lưu
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
  return (
    <div className='pt-20'>
      <Skeleton loading={loadingPage} active>
        {container}
      </Skeleton>
    </div>
  );
}

export default DeclareInformationPage;
