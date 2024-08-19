import { Column } from '@ant-design/plots';
import React from 'react';

export function ChartGroup({ data }) {
  const config = {
    data,
    isGroup: true,
    xField: 'time',
    yField: 'quantity',
    seriesField: 'name',
    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  };
  return (
    <div className='h-[50vh]'>
      <Column {...config} />
    </div>
  );
}
