import { Liquid } from '@ant-design/plots';
import { Descriptions } from 'antd';
import React from 'react';
export function ChartLiquid({ data }) {
  const styleLiquid = {};
  const config = {
    percent: data?.creditsAcc / data?.totalCredits,
    outline: {
      border: 4,
      distance: 4,
    },
    wave: {
      length: 128,
    },
  };
  return (
    <div>
      <div className='flex justify-between items-center h-[250px]'>
        <Liquid width={200} height={280} {...config} liquidStyle={styleLiquid} />
        <Descriptions labelStyle={{ width: 300 }} bordered={true} layout='horizontal' column={1}>
          <Descriptions.Item span={1} label='Tổng số tín chỉ đã hoàn thành'>
            {`${data?.creditsAcc} / ${data?.totalCredits}`}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Điểm trung bình tích lũy ( hệ 4 )'>
            {data?.accPoint4}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
}
