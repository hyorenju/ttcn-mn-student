import { LoadingOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Descriptions, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInfoStudent } from '../../../../API/axios';

export function DescriptionsUser(props) {
  const { studentId } = useParams();
  const [dataStudent, setDataStudent] = useState({});
  const [loadingPage, setLoadingPage] = useState(false);

  // handle get info student
  const handleGetInfoStudent = (studentId) => {
    if (studentId !== undefined) {
      setLoadingPage(true);
      getInfoStudent(studentId)
        .then((res) => {
          if (res.data?.success === true) {
            setDataStudent(res.data?.data);
            setLoadingPage(false);
          }
        })
        .finally(() => setLoadingPage(false));
    }
  };
  useEffect(() => {
    handleGetInfoStudent(studentId);
  }, [studentId]);
  const container = (
    <PageContainer>
      <Descriptions
        layout='horizontal'
        column={1}
        labelStyle={{ fontSize: '16px', marginBottom: '12px' }}
        contentStyle={{ fontSize: '16px' }}
      >
        <Descriptions.Item span={1} label='Sinh viên'>
          {dataStudent?.name ? dataStudent?.name : '[ Không có dữ liệu ]'}
        </Descriptions.Item>
        <Descriptions.Item span={1} label='Mã sinh viên'>
          {dataStudent?.id ? dataStudent?.id : '[ Không có dữ liệu ]'}
        </Descriptions.Item>
        <Descriptions.Item span={1} label='Lớp'>
          {dataStudent?.classes?.id ? dataStudent?.classes?.id : '[ Không có dữ liệu ]'}
        </Descriptions.Item>
        <Descriptions.Item span={1} label='Chuyên ngành'>
          {dataStudent?.major?.id ? dataStudent?.major?.id : '[ Không có dữ liệu ]'}
        </Descriptions.Item>
        <Descriptions.Item span={1} label='Tình trạng sinh viên'>
          {dataStudent?.status ? dataStudent?.status : '[ Không có dữ liệu ]'}
        </Descriptions.Item>
      </Descriptions>
    </PageContainer>
  );
  return (
    <div>
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
        {container}
      </Spin>
    </div>
  );
}
