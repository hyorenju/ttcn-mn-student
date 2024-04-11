import { adminSemesterApi } from '@/API/admin/adminSemesterApi';
import { adminStatistic } from '@/API/admin/adminStatistic';
import { ButtonCustom } from '@/components/Button/ButtonCustom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input, Select, Space } from 'antd';
import { useState } from 'react';
import { ChartPieBasic } from '../Chart/ChartPieBasic';

export function CourseStatistical(props) {
  const [valueSubmit, setValueSubmit] = useState({
    time: '',
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
          Mã khóa:
          <Input
            size='large'
            placeholder='Nhập mã khóa. Ví dụ: 65'
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />
        </Space>
        <Space>
          Chọn học kỳ:
          <Select
            value={valueSubmit.time}
            options={optionsTerm}
            className='w-[300px]'
            size='large'
            placeholder='Chọn học kỳ'
            onChange={(e) => setValueSubmit((prev) => ({ ...prev, time: e }))}
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
