import { useQuery } from '@tanstack/react-query';
import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { adminMajorApi } from '../../../../API/admin/adminMajorApi';
import { setFilter, setPageCurrent } from '../../../../redux/Student/studentSilce';

export function ContentPopoverStudent() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { data } = useQuery({
    queryKey: ['majorList'],
    queryFn: async () => {
      try {
        const res = await adminMajorApi.getAllMajor({ page: 1, size: 10 });
        if (res) return res;
      } catch (error) {}
    },
  });
  const onFinish = (values) => {
    if (values) {
      dispatch(setFilter(values));
    }
  };

  const handleReset = () => {
    form.setFieldsValue({
      majorId: null,
      courseId: null,
      classId: '',
    });
    dispatch(setFilter({}));
    dispatch(setPageCurrent(1));
  };

  return (
    <div className='w-[300px]'>
      <Form
        form={form}
        layout='vertical'
        style={{
          width: 300,
        }}
        onFinish={onFinish}
      >
        <Row gutter={[24]}>
          <Col span={16}>
            <Form.Item
              label='Lớp'
              name='classId'
              rules={[
                {
                  min: 1,
                  max: 20,
                  message: 'Mã lớp quá dài',
                },
                {
                  pattern: '^K|k\\d+[a-zA-Z]+$',
                  message: 'Không đúng định dạng',
                },
              ]}
            >
              <Input placeholder='VD: K65CNTTA' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Khóa'
              name='courseId'
              rules={[
                {
                  min: 1,
                  message: 'Khóa không được nhỏ hơn 1',
                },
              ]}
            >
              <Input placeholder='VD: 65' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label='Ngành' name='majorId'>
              <Select placeholder='Chọn ngành'>
                {data?.data?.items &&
                  data.data.items.map((e) => (
                    <Select.Option key={e.id} value={e.id}>
                      {e.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} className='flex justify-end'>
            <Space>
              <Button type='default' onClick={handleReset} className='flex justify-center items-center'>
                Reset
              </Button>
              <Button type='primary' htmlType='submit' className='flex justify-center items-center'>
                Lọc
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
