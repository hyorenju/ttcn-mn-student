import { PageContainer } from '@ant-design/pro-components';
import { Collapse } from 'antd';
import React from 'react';
import { ColumnMedCore10, ColumnMedCore4, ColumnTrainingPoint, ProgressCreditsUser } from '../components/Chart';
import { DescriptionsUser } from '../components/Description';

function PointPageStudent(props) {
  const { Panel } = Collapse;
  return (
    <div className='px-10 py-8'>
      <div className='border-2 border-gray-300 rounded-2xl pb-8'>
        <DescriptionsUser />
        <PageContainer>
          <Collapse accordion size='large'>
            <Panel header='Điểm trung bình hệ 4' key='1'>
              <ColumnMedCore4 />
            </Panel>
            <Panel header='Điểm trung bình hệ 10' key='2'>
              <ColumnMedCore10 />
            </Panel>
            <Panel header='Điểm rèn luyện' key='3'>
              <ColumnTrainingPoint />
            </Panel>
            <Panel header='Tiến độ học tập' key='4'>
              <ProgressCreditsUser />
            </Panel>
          </Collapse>
        </PageContainer>
      </div>
    </div>
  );
}

export default PointPageStudent;
