import { adminSchoolYearApi } from '@/API/admin/adminSchoolYear';
import { adminSemesterApi } from '@/API/admin/adminSemesterApi';
import { adminStatistic } from '@/API/admin/adminStatistic';
import { ButtonCustom } from '@/components/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Select, Space } from 'antd';
import { useState } from 'react';
import { ChartGroup, ChartPieBasic } from '../Chart';

export function FacultyStatistical(props) {
  const [valueSubmitCircle, setValueSubmitCircle] = useState({
    time: '',
  });
  const [valueSubmitColumn1, setValueSubmitColumn1] = useState({
    start: '',
    end: '',
  });
  const [valueSubmitColumn2, setValueSubmitColumn2] = useState({
    start: '',
    end: '',
  });
  const [optionChart, setOptionChart] = useState('');
  const [dataColumn, setDataColumn] = useState([]);
  const [dataPie, setDataPie] = useState([]);
  const termSelect = useQuery({
    cacheTime: 10 * 60 * 1000,
    staleTime: 11 * 60 * 1000,
    queryKey: ['getTermList'],
    queryFn: () => adminSemesterApi.getAllTermSelection(),
  });
  const yearSelect = useQuery({
    cacheTime: 10 * 60 * 1000,
    staleTime: 11 * 60 * 1000,
    queryKey: ['getYearList'],
    queryFn: () => adminSchoolYearApi.getYear(),
  });
  const optionsTerm = termSelect.data?.data?.items?.map((i) => {
    return { label: i.termName, value: i.id };
  });
  const optionsYear = yearSelect.data?.data?.items?.map((i) => {
    return { label: i.id, value: i.id };
  });
  const handleGetDataColumn1 = useMutation({
    mutationKey: ['getDataColumn'],
    mutationFn: () => adminStatistic.getDataStatsticFacultyColumn1(valueSubmitColumn1),
    onSuccess: (res) => {
      if (res && res.success === true) {
        setDataColumn(res.data.chart);
      }
    },
  });
  const handleGetDataColumn2 = useMutation({
    mutationKey: ['getDataColumn'],
    mutationFn: () => adminStatistic.getDataStatsticFacultyColumn2(valueSubmitColumn2),
    onSuccess: (res) => {
      if (res && res.success === true) {
        setDataColumn(res.data.chart);
      }
    },
  });
  const handleGetDataCircle = useMutation({
    mutationKey: ['getDataCircle'],
    mutationFn: () => adminStatistic.getDataStatsticFacultyCircle(valueSubmitCircle),
    onSuccess: (res) => {
      if (res && res.success === true) {
        setDataPie(res.data.items);
      }
    },
  });
  const handleSubmit = (type) => {
    if (type === 'column1') {
      handleGetDataColumn1.mutate();
    } else if (type === 'column2') {
      handleGetDataColumn2.mutate();
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
            className='w-[350px]'
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
                value: 'column1',
              },
              {
                label: 'Sinh viên nhập học và ra trường',
                value: 'column2',
              },
            ]}
            onChange={(e) => setOptionChart(e)}
          />
        </Space>
        {optionChart === 'column1' && (
          <>
            <Space>
              Từ học kỳ:
              <Select
                options={optionsTerm}
                className='w-[300px]'
                size='large'
                value={valueSubmitColumn1.start}
                placeholder='Chọn học kỳ bắt đầu'
                onChange={(e) => setValueSubmitColumn1((prev) => ({ ...prev, start: e }))}
              />
            </Space>
            <Space>
              Đến học kỳ:
              <Select
                options={optionsTerm}
                className='w-[300px]'
                size='large'
                value={valueSubmitColumn1.end}
                placeholder='Chọn học kỳ kết thúc'
                onChange={(e) => setValueSubmitColumn1((prev) => ({ ...prev, end: e }))}
              />
            </Space>
          </>
        )}
        {optionChart === 'circle' && (
          <>
            <Space>
              Chọn học kỳ:
              <Select
                options={optionsTerm}
                className='w-[300px]'
                size='large'
                value={valueSubmitCircle.time}
                placeholder='Chọn học kỳ'
                onChange={(e) => setValueSubmitCircle((prev) => ({ ...prev, time: e }))}
              />
            </Space>
          </>
        )}
        {optionChart === 'column2' && (
          <>
            <Space>
              Từ năm học:
              <Select
                options={optionsYear}
                className='w-[200px]'
                size='large'
                value={valueSubmitColumn2.start}
                placeholder='Chọn năm học bắt đầu'
                onChange={(e) => setValueSubmitColumn2((prev) => ({ ...prev, start: e }))}
              />
            </Space>
            <Space>
              Đến năm học:
              <Select
                options={optionsYear}
                className='w-[200px]'
                size='large'
                value={valueSubmitColumn2.end}
                placeholder='Chọn năm học kết thúc'
                onChange={(e) => setValueSubmitColumn2((prev) => ({ ...prev, end: e }))}
              />
            </Space>
          </>
        )}
        <ButtonCustom
          title={'Tìm kiếm'}
          size={'large'}
          type='primary'
          handleClick={() => handleSubmit(optionChart)}
          loading={handleGetDataColumn1.isLoading || handleGetDataColumn2.isLoading || handleGetDataCircle.isLoading}
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
      {dataColumn && optionChart === 'column1' && (
        <section className='mt-12'>
          <figure>
            <ChartGroup data={dataColumn} />
          </figure>
        </section>
      )}
      {dataColumn && optionChart === 'column2' && (
        <section className='mt-12'>
          <figure>
            <ChartGroup data={dataColumn} />
          </figure>
        </section>
      )}
    </div>
  );
}
