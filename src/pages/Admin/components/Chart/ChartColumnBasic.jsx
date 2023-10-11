import { Column } from '@ant-design/plots';
import React from 'react';

export function ChartColumnBasic({ data }) {
  const config = {
    data,
    xField: 'termId',
    yField: 'point',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      termId: {
        alias: 'Học kì',
      },
      point: {
        alias: 'Điểm',
      },
    },
  };
  return <Column {...config} />;
}
