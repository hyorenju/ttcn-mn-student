import { Pie } from '@ant-design/plots';
import React from 'react';

export function ChartPieBasic({ data }) {
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <div>
      <Pie {...config} />
    </div>
  );
}
