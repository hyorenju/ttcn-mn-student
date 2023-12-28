import { adminSemesterApi } from '@/API/admin/adminSemesterApi';
import { adminStatistic } from '@/API/admin/adminStatistic';
import { ButtonCustom } from '@/components/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input, Select, Space } from 'antd';
import { useState } from 'react';
import { ChartPieBasic } from '../Chart';

export function MajorStatistical(props) {
  const [valueSubmit, setValueSubmit] = useState({
    start: '',
    end: '',
  });
  const [majorId, setMajorId] = useState('');
  const [dataStatistic, setDataStatistic] = useState([]);
  const { data } = useQuery({
    cacheTime: 10 * 60 * 1000,
    staleTime: 11 * 60 * 1000,
    queryKey: ['getListTerm'],
    queryFn: async () => await adminSemesterApi.getAllSemester({ page: 1, size: 1000 }),
  });
  const optionsTerm = data?.data?.items?.map((i) => {
    return { label: i.termName, value: i.id };
  });
  const handleSubmit = useMutation({
    mutationKey: ['submit'],
    mutationFn: async () => await adminStatistic.getDataStatsticMajor(majorId, valueSubmit),
    onSuccess: (res) => {
      if (res && res.success === true) {
        setDataStatistic(res.data?.items);
      }
    },
  });
  return (
    <div>
      <div className='flex gap-4'>
        <Space>
          Mã lớp:
          <Input
            size='large'
            placeholder='Nhập mã ngành. Ví dụ: CNTT'
            value={majorId}
            onChange={(e) => setMajorId(e.target.value)}
          />
        </Space>
        <Space>
          Từ học kỳ:
          <Select
            value={valueSubmit.start}
            options={optionsTerm}
            className='w-[200px]'
            size='large'
            placeholder='Chọn học kỳ bắt đầu'
            onChange={(e) => setValueSubmit((prev) => ({ ...prev, start: e }))}
          />
        </Space>
        <Space>
          Đến học kỳ:
          <Select
            value={valueSubmit.end}
            options={optionsTerm}
            className='w-[200px]'
            size='large'
            placeholder='Chọn học kỳ kết thúc'
            onChange={(e) => setValueSubmit((prev) => ({ ...prev, end: e }))}
          />
        </Space>
        <ButtonCustom
          title={'Tìm kiếm'}
          size={'large'}
          type='primary'
          handleClick={() => handleSubmit.mutate()}
          loading={handleSubmit.isLoading}
        />
      </div>
      <h1 className='my-12 uppercase text-2xl text-center'>Thống kê xếp loại rèn luyện theo ngành</h1>
      {dataStatistic &&
        dataStatistic.map((item) => (
          <section>
            <figure>
              <ChartPieBasic data={item?.chart} />
            </figure>
            <figcaption className='italic text-center'>{item?.term?.termName}</figcaption>
          </section>
        ))}
    </div>
  );
}
