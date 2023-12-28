import { adminSemesterApi } from '@/API/admin/adminSemesterApi';
import { adminStatistic } from '@/API/admin/adminStatistic';
import { ButtonCustom } from '@/components/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Select, Space } from 'antd';
import { useState } from 'react';
import { ChartGroup, ChartPieBasic } from '../Chart';

export function FacultyStatistical(props) {
  const [valueSubmit, setValueSubmit] = useState({
    start: '',
    end: '',
  });
  const [optionChart, setOptionChart] = useState('');
  const [dataColumn, setDataColumn] = useState([]);
  const [dataPie, setDataPie] = useState([]);
  const { data } = useQuery({
    cacheTime: 10 * 60 * 1000,
    staleTime: 11 * 60 * 1000,
    queryKey: ['getTermList'],
    queryFn: () => adminSemesterApi.getAllTermSelection(),
  });
  const optionsTerm = data?.data?.items?.map((i) => {
    return { label: i.termName, value: i.id };
  });
  const handleGetDataColumn = useMutation({
    mutationKey: ['getDataColumn'],
    mutationFn: () => adminStatistic.getDataStatsticFacultyColumn(valueSubmit),
    onSuccess: (res) => {
      if (res && res.success === true) {
        setDataColumn(res.data.chart);
      }
    },
  });
  const handleGetDataCircle = useMutation({
    mutationKey: ['getDataCircle'],
    mutationFn: () => adminStatistic.getDataStatsticFacultyCircle(valueSubmit),
    onSuccess: (res) => {
      if (res && res.success === true) {
        setDataPie(res.data.items);
      }
    },
  });
  const handleSubmit = (type) => {
    if (type === 'column') {
      handleGetDataColumn.mutate();
    } else if (type === 'circle') {
      handleGetDataCircle.mutate();
    }
  };
  return (
    <div>
      <div className='flex gap-4'>
        <Space>
          Lọc theo
          <Select
            className='w-[300px]'
            size='large'
            placeholder='Lọc theo'
            value={optionChart}
            options={[
              {
                label: 'Xếp loại sinh viên',
                value: 'circle',
              },
              {
                label: 'Sinh viên xin thôi học và bị buộc thôi học',
                value: 'column',
              },
            ]}
            onChange={(e) => setOptionChart(e)}
          />
        </Space>
        <Space>
          Từ học kỳ:
          <Select
            options={optionsTerm}
            className='w-[200px]'
            size='large'
            value={valueSubmit.start}
            placeholder='Chọn học kỳ bắt đầu'
            onChange={(e) => setValueSubmit((prev) => ({ ...prev, start: e }))}
          />
        </Space>
        <Space>
          Đến học kỳ:
          <Select
            options={optionsTerm}
            className='w-[200px]'
            size='large'
            value={valueSubmit.end}
            placeholder='Chọn học kỳ kết thúc'
            onChange={(e) => setValueSubmit((prev) => ({ ...prev, end: e }))}
          />
        </Space>
        <ButtonCustom
          title={'Tìm kiếm'}
          size={'large'}
          type='primary'
          handleClick={() => handleSubmit(optionChart)}
          loading={handleGetDataColumn.isLoading || handleGetDataCircle.isLoading}
        />
      </div>
      {dataPie &&
        optionChart === 'circle' &&
        dataPie.map((item) => (
          <section>
            <figure>
              <ChartPieBasic data={item?.chart} />
            </figure>
            <figcaption className='italic text-center'>{item.term?.termName}</figcaption>
          </section>
        ))}
      {dataColumn && optionChart === 'column' && (
        <section className='mt-12'>
          <figure>
            <ChartGroup data={dataColumn} />
          </figure>
        </section>
      )}
    </div>
  );
}
