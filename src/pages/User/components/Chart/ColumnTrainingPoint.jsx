import { LoadingOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/plots';
import { Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDataStudentTraningPoint } from '../../../../API/axios';

export function ColumnTrainingPoint(props) {
  const { Text } = Typography;
  const { studentId } = useParams();
  const [data, setData] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);

  // handle get data points
  const handleGetDataTrainingPoints = (studentId) => {
    setLoadingPage(true);
    if (studentId !== undefined) {
      getDataStudentTraningPoint(studentId)
        .then((res) => {
          if (res.data?.success === true) {
            setData(res.data?.data?.items);
            setLoadingPage(false);
          }
        })
        .finally(() => setLoadingPage(false));
    }
  };
  useEffect(() => {
    handleGetDataTrainingPoints(studentId);
  }, [studentId]);

  const config = {
    data,
    xField: 'termId',
    yField: 'trainingPoint',
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
      time: {
        alias: 'Kì',
      },
      value: {
        alias: 'Điểm rèn luyện',
      },
    },
  };
  return (
    <div className='mt-12'>
      <Spin
        spinning={loadingPage}
        indicator={
          <LoadingOutlined
            style={{
              color: 'orange',
              fontSize: 24,
            }}
            spin
          />
        }
      >
        <Column {...config} />
        <Text style={{ display: 'block', textAlign: 'center', opacity: 0.5, marginTop: '10px' }} italic>
          Biểu đồ điểm rèn luyện theo từng kì học
        </Text>
      </Spin>
    </div>
  );
}
