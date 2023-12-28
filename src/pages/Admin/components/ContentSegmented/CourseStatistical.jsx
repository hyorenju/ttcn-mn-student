import { adminSemesterApi } from '@/API/admin/adminSemesterApi';
import { adminStatistic } from '@/API/admin/adminStatistic';
import { ButtonCustom } from '@/components/Button/ButtonCustom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input, Select, Space } from 'antd';
import { useState } from 'react';
import { ChartPieBasic } from '../Chart/ChartPieBasic';

export function CourseStatistical(props) {
  const [valueSubmit, setValueSubmit] = useState({
    start: '',
    end: '',
  });
  const [courseId, setCourseId] = useState('');
  const [dataStatistic, setDataStatistic] = useState([]);
  const { data } = useQuery({
    cacheTime: 10 * 60 * 1000,
    staleTime: 11 * 60 * 1000,
    queryKey: ['getTermList'],
    queryFn: async () => await adminSemesterApi.getAllTermSelection(),
  });
  const optionsTerm = data?.data?.items?.map((i) => {
    return { label: i.termName, value: i.id };
  });
  const handleSubmit = useMutation({
    mutationKey: ['submit'],
    mutationFn: async () => await adminStatistic.getDataStatsticCourse(courseId, valueSubmit),
    onSuccess: (res) => {
      if (res && res.success === true) {
        setDataStatistic(res.data.items);
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
            placeholder='Nhập mã khóa. Ví dụ: 65'
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
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
        <ButtonCustom title={'Tìm kiếm'} size={'large'} type='primary' handleClick={() => handleSubmit.mutate()} />
      </div>
      <h1 className='my-12 uppercase text-2xl text-center'>Thống kê xếp loại rèn luyện theo khóa</h1>
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
