import { adminStatistic } from '@/API/admin/adminStatistic';
import { notificationError } from '@/components/Notification';
import { SearchOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Input } from 'antd';
import { useState } from 'react';
import { ChartColumnBasic, ChartLiquid } from '../Chart';

export function StudentStatistical(props) {
  const [dataChart, setDataChart] = useState(null);
  const { Search } = Input;
  const getDataPoint = useMutation({
    cacheTime: 5 * 60 * 1000,
    mutationKey: ['getDataPoint'],
    mutationFn: async (id) => await adminStatistic.getDataPoint(id),
    onSuccess: (res) => {
      if (res && res.success === true) {
        setDataChart(res.data);
      } else if (res && res.success === false) {
        notificationError(res.error?.message);
      }
    },
  });
  const handleSearchEnter = (value) => {
    getDataPoint.mutate(value);
  };
  return (
    <div>
      <Search
        size='large'
        loading={getDataPoint.isLoading}
        placeholder='Nhập mã sinh viên'
        className='w-[380px] mb-12'
        enterButton={'Tìm kiếm'}
        onSearch={handleSearchEnter}
        prefix={<SearchOutlined className='mr-2' />}
      />
      {dataChart && (
        <>
          <h2 className='mb-12 text-lg italic text-slate-500'>{`Thông tin sinh viên: ${dataChart.student?.surname} ${dataChart.student?.lastName} - ${dataChart.student?.id} - ${dataChart.student?.aclass?.id}`}</h2>
          <div className='flex gap-20 w-[83vw] mb-20'>
            <div className='flex-1'>
              <figure>
                <ChartColumnBasic data={dataChart.avgPoint4List} />
              </figure>
              <figcaption className='text-center italic mt-4'>Điểm học tập hệ 4</figcaption>
            </div>
            <div className='flex-1'>
              <figure>
                <ChartColumnBasic data={dataChart.avgPoint10List} />
              </figure>
              <figcaption className='text-center italic mt-4'>Điểm học tập hệ 10</figcaption>
            </div>
          </div>
          <div className='flex gap-20 w-[83vw]'>
            <div className='flex-1'>
              <figure>
                <ChartColumnBasic data={dataChart.trainingPointList} />
              </figure>
              <figcaption className='text-center italic mt-4'>Điểm rèn luyện</figcaption>
            </div>
            <div className='flex-1'>
              <figure>
                <ChartLiquid data={dataChart} />
              </figure>
              <figcaption className='text-center italic'>Số tín chỉ tích lũy</figcaption>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
