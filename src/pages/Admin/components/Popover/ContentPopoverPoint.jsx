import { Button, Col, Form, Row, Select, Space } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter, setPageCurrent } from '../../../../redux/Point/pointSlice';

export function ContentPopoverPoint() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(setFilter(values));
  };
  const handleReset = () => {
    dispatch(setFilter({}));
    dispatch(setPageCurrent(1));
    form.setFieldsValue({
      point: null,
      accPoint: null,
      trainingPoint: null,
    });
  };
  return (
    <div className='w-[290px]'>
      <Form
        layout='vertical'
        style={{
          width: 350,
        }}
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={[20]}>
          <Col span={20}>
            <Form.Item label='Điểm trung bình học tập ( học kì hệ 4 )' name='point'>
              <Select placeholder='Chọn khoảng điểm'>
                <Select.Option value={1}>{'Từ 3.6 đến 4.0 ( Xuất sắc )'}</Select.Option>
                <Select.Option value={2}>{'Từ 3.2 đến cận 3.6 ( Giỏi )'}</Select.Option>
                <Select.Option value={3}>{'Từ 2.5 đến cận 3.2 ( Khá )'}</Select.Option>
                <Select.Option value={4}>{'Trên 2.5'}</Select.Option>
                <Select.Option value={5}>{'Từ 2.0 đến cận 2.5 ( Trung bình )'}</Select.Option>
                <Select.Option value={6}>{'Từ 1.0 đến cận 2.0 ( Yếu )'}</Select.Option>
                <Select.Option value={7}>{'Dưới 1.0 ( Kém )'}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={20}>
            <Form.Item label='Điểm trung bình học tập ( tích lũy hệ 4 )' name='accPoint'>
              <Select placeholder='Chọn khoảng điểm'>
                <Select.Option value={1}>{'Từ 3.6 đến 4.0 ( Xuất sắc )'}</Select.Option>
                <Select.Option value={2}>{'Từ 3.2 đến cận 3.6 ( Giỏi )'}</Select.Option>
                <Select.Option value={3}>{'Từ 2.5 đến cận 3.2 ( Khá )'}</Select.Option>
                <Select.Option value={4}>{'Từ 2.0 đến cận 2.5 ( Trung bình )'}</Select.Option>
                <Select.Option value={5}>{'Dưới 2.0'}</Select.Option>
                <Select.Option value={6}>{'Từ 1.0 đến cận 2.0 ( Yếu )'}</Select.Option>
                <Select.Option value={7}>{'Dưới 1.0 ( Kém )'}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={20}>
            <Form.Item label='Điểm rèn luyện' name='trainingPoint'>
              <Select placeholder='Chọn khoảng điểm'>
                <Select.Option value={1}>{'Từ 90 - 100 ( Xuất sắc )'}</Select.Option>
                <Select.Option value={2}>{'Từ 80 - 89 ( Tốt )'}</Select.Option>
                <Select.Option value={3}>{'Trên 80'}</Select.Option>
                <Select.Option value={4}>{'Từ 65 - 79 ( Khá )'}</Select.Option>
                <Select.Option value={5}>{'Từ 50 - 64 ( Trung bình )'}</Select.Option>
                <Select.Option value={6}>{'Từ 35 - 49 ( Yếu )'}</Select.Option>
                <Select.Option value={7}>{'Dưới 35 ( Kém )'}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={20} className='flex justify-end'>
            <Space>
              <Button type='primary' htmlType='submit' className='flex justify-center items-center'>
                Lọc
              </Button>
              <Button type='default' onClick={handleReset} className='flex justify-center items-center'>
                Reset
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
