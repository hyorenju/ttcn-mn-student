import { adminClassApi } from '@/API/admin/adminClassApi';
import { adminSemesterApi } from '@/API/admin/adminSemesterApi';
import { adminStatistic } from '@/API/admin/adminStatistic';
import { ButtonCustom } from '@/components/Button/ButtonCustom';
import { messageErrorToSever } from '@/components/Message';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Select, Space } from 'antd';
import { useState } from 'react';
import { ChartPieBasic } from '../Chart/ChartPieBasic';

export function ClassStatistical(props) {
  const [valueSubmit, setValueSubmit] = useState({
    time: '',
  });
  const [classId, setClassId] = useState('');
  const [dataStatistic, setDataStatistic] = useState([]);
  const { data } = useQuery({
    cacheTime: 10 * 60 * 1000,
    staleTime: 11 * 60 * 1000,
    queryKey: ['getTermList'],
    queryFn: () => adminSemesterApi.getAllTermSelection(),
  });
  const getClassList = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getClassList'],
    queryFn: () => adminClassApi.getClassSelection(),
    onSuccess: (res) => {
      if (res && res.success === false) {
        messageErrorToSever('Lấy danh sách lớp lỗi');
      }
    },
  });
  const optionsClass = getClassList.data?.data?.items?.map((i) => {
    return { label: i.id, value: i.id };
  });
  const optionsTerm = data?.data?.items?.map((i) => {
    return { label: i.termName, value: i.id };
  });
  const handleSubmit = useMutation({
    mutationKey: ['submit'],
    mutationFn: () => adminStatistic.getDataStatsticClass(classId, valueSubmit),
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
          Chọn mã lớp:
          <Select
            showSearch
            value={classId}
            options={optionsClass}
            className='w-[200px]'
            size='large'
            placeholder='Chọn mã lớp'
            onChange={(e) => setClassId(e)}
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
        <ButtonCustom
          title={'Tìm kiếm'}
          size={'large'}
          type='primary'
          handleClick={() => handleSubmit.mutate()}
          loading={handleSubmit.isLoading}
        />
      </div>
      <h1 className='my-12 uppercase text-2xl text-center'>Thống kê xếp loại rèn luyện theo lớp</h1>
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
