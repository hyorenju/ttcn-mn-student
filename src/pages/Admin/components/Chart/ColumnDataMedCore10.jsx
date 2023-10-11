import { Column } from '@ant-design/plots';
import { Spin, Typography } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDataMedCore10 } from '../../../../API/axios';

export function ColumnDataMedCore10({ dataStudent }) {
  const studentId = dataStudent?.id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Text } = Typography;

  const getDataMedCoreStudent10 = () => {
    if (studentId !== undefined) {
      getDataMedCore10(studentId)
        .then((res) => {
          setLoading(true);
          if (res.data.success === true) {
            setData(res.data?.data?.items);
            setLoading(false);
          }
        })
        .finally(() => setLoading(false));
    }
  };
  useEffect(() => {
    getDataMedCoreStudent10();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  const config = {
    data,
    xField: 'termId',
    yField: 'medScore10',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    columnStyle: {
      fill: 'red',
      fillOpacity: 0.5,
      stroke: 'black',
      lineWidth: 1,
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      cursor: 'pointer',
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      time: {
        alias: 'Kì học',
      },
      value: {
        alias: 'Điểm',
      },
    },
  };
  return (
    <Spin spinning={loading}>
      {data && (
        <>
          <Column {...config} />
          <Text style={{ display: 'block', textAlign: 'center', opacity: 0.5, marginTop: '10px' }} italic>
            Biểu đồ điểm trung bình học tập theo từng kì học
          </Text>
        </>
      )}
    </Spin>
  );
}
