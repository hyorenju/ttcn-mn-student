import { adminSemesterApi } from '@/API/admin/adminSemesterApi';
import { adminStatusApi } from '@/API/admin/adminStatusApi';
import { notificationError } from '@/components/Notification';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, Select, Space } from 'antd';

export function ContentPopoverStudentStatus({ setValueFilter, setPageCurrent }) {
  const getStatusList = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getClassList'],
    queryFn: async () => await adminStatusApi.getStatusSelect(),
    onSuccess: (res) => {
      if (res && res.success === false) {
        notificationError('Lấy danh sách tình trạng lỗi');
      }
    },
  });
  const getTermList = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getTermList'],
    queryFn: async () => await adminSemesterApi.getAllTermSelection(),
    onSuccess: (res) => {
      if (res && res.success === false) {
        notificationError('Lấy danh sách học kì lỗi');
      }
    },
  });
  const optionTerm = getTermList.data?.data?.items.map((item) => ({ label: item.termName, value: item.id }));
  const optionStatus = getStatusList.data?.data?.items.map((item) => ({ label: item.name, value: item.id }));
  const filterOptionStatus = (input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase());
  const filterOptionTerm = (input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase());
  const [form] = Form.useForm();
  const onFinish = (values) => {
    setPageCurrent(1);
    setValueFilter(values);
  };
  const handleReset = () => {
    setPageCurrent(1);
    form.setFieldsValue({
      termId: null,
      statusId: null,
    });
  };
  return (
    <div className='w-[250px]'>
      <Form
        layout='vertical'
        style={{
          width: 250,
        }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item label='Tình trạng' name='statusId'>
          <Select
            showSearch
            options={optionStatus}
            loading={getStatusList.isLoading}
            filterOption={filterOptionStatus}
            placeholder='Chọn tình trạng tìm kiếm'
            optionFilterProp='children'
          />
        </Form.Item>
        <Form.Item label='Học kì' name='termId'>
          <Select
            showSearch
            options={optionTerm}
            loading={getTermList.isLoading}
            filterOption={filterOptionTerm}
            placeholder='Chọn học kỳ tìm kiếm'
            optionFilterProp='children'
          />
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
