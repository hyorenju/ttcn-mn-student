import { setFilter, setPageCurrent } from '@/redux/Point/pointSlice';
import { Button, Form, Select, Space } from 'antd';
import { useDispatch } from 'react-redux';

export function ContentPopoverPoint() {
  const dispatch = useDispatch();
  const optionPointLearning = [
    {
      label: 'Từ 3.6 đến 4.0 ( Xuất sắc )',
      value: 1,
    },
    {
      label: 'Từ 3.2 đến cận 3.6 ( Giỏi )',
      value: 2,
    },
    {
      label: 'Từ 2.5 đến cận 3.2 ( Khá )',
      value: 3,
    },
    {
      label: 'Từ 2.5 trở lên',
      value: 4,
    },
    {
      label: 'Từ 2.0 đến cận 2.5 ( Trung bình )',
      value: 5,
    },
    {
      label: 'Dưới 2.0',
      value: 6,
    },
    {
      label: 'Từ 1.0 đến cận 2.0 ( Yếu )',
      value: 7,
    },
    {
      label: 'Dưới 1.0 ( Kém )',
      value: 8,
    },
  ];
  const optionPointTranning = [
    {
      label: 'Từ 90 - 100 ( Xuất sắc )',
      value: 1,
    },
    {
      label: 'Từ 80 - 89 ( Tốt )',
      value: 2,
    },
    {
      label: 'Từ 80 trở lên',
      value: 3,
    },
    {
      label: 'Từ 65 - 79 ( Khá )',
      value: 4,
    },
    {
      label: 'Từ 50 - 64 ( Trung bình )',
      value: 5,
    },
    {
      label: 'Từ 35 - 49 ( Yếu )',
      value: 6,
    },
    {
      label: 'Dưới 35 ( Kém )',
      value: 7,
    },
  ];
  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(setFilter(values));
    dispatch(setPageCurrent(1));
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
    <div className='w-[300px]'>
      <Form
        layout='vertical'
        style={{
          width: 300,
        }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item label='Điểm trung bình học tập ( học kỳ hệ 4 )' name='point'>
          <Select placeholder='Chọn khoảng điểm' options={optionPointLearning} />
        </Form.Item>
        <Form.Item label='Điểm trung bình học tập ( tích lũy hệ 4 )' name='accPoint'>
          <Select placeholder='Chọn khoảng điểm' options={optionPointLearning} />
        </Form.Item>
        <Form.Item label='Điểm rèn luyện' name='trainingPoint'>
          <Select placeholder='Chọn khoảng điểm' options={optionPointTranning} />
        </Form.Item>
        <Space>
          <Button type='default' onClick={handleReset} className='flex justify-center items-center'>
            Reset
          </Button>
          <Button type='primary' htmlType='submit' className='flex justify-center items-center'>
            Lọc
          </Button>
        </Space>
      </Form>
    </div>
  );
}
