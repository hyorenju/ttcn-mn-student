import { adminMajorApi } from '@/API/admin/adminMajorApi';
import { adminSemesterApi } from '@/API/admin/adminSemesterApi';
import { adminStatistic } from '@/API/admin/adminStatistic';
import { ButtonCustom } from '@/components/Button';
import { messageErrorToSever } from '@/components/Message';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Select, Space } from 'antd';
import { useState } from 'react';
import { ChartPieBasic } from '../Chart';

export function MajorStatistical(props) {
  const [valueSubmit, setValueSubmit] = useState({
    time: '',
  });
  const [majorId, setMajorId] = useState('');
  const [dataStatistic, setDataStatistic] = useState([]);
  const { data } = useQuery({
    cacheTime: 10 * 60 * 1000,
    staleTime: 11 * 60 * 1000,
    queryKey: ['getListTerm'],
    queryFn: async () => await adminSemesterApi.getAllSemester({ page: 1, size: 1000 }),
  });
  const getMajorList = useQuery({
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    queryKey: ['getMajorList'],
    queryFn: () => adminMajorApi.getMajorSelection(),
    onSuccess: (res) => {
      if (res && res.success === false) {
        messageErrorToSever('Lấy danh sách ngành lỗi');
      }
    },
  });
  const optionsMajor = getMajorList?.data?.data?.items?.map((i) => {
    return { label: i.name, value: i.id };
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
          Mã ngành:
          <Select
            value={majorId}
            showSearch
            options={optionsMajor}
            className='w-[370px]'
            size='large'
            placeholder='Chọn ngành'
            onChange={(e) => setMajorId(e)}
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
