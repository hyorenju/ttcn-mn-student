import { LoadingOutlined } from '@ant-design/icons';
import { Descriptions, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInfoStudent } from '../../../API/axios';

function PersonalInformationStudent(props) {
  const { studentId } = useParams();
  const [dataStudent, setDataStudent] = useState({});
  const [loadingPage, setLoadingPage] = useState(false);

  // handle get information student
  const handleGetInfoStudent = (studentId) => {
    if (studentId !== undefined) {
      setLoadingPage(true);
      getInfoStudent(studentId)
        .then((res) => {
          if (res.data?.success === true) {
            setDataStudent(res.data?.data);
            setLoadingPage(false);
          } else {
            message.error(res.data?.error?.message);
          }
        })
        .finally(() => setLoadingPage(false));
    }
  };
  useEffect(() => {
    handleGetInfoStudent(studentId);
  }, [studentId]);

  const container = (
    <Descriptions
      column={8}
      style={{
        fontSize: 40,
      }}
    >
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Mã sinh viên'
      >
        {dataStudent?.id ? dataStudent?.id : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Họ và tên'
      >
        {dataStudent?.name ? dataStudent?.name : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Số điện thoại'
      >
        {dataStudent?.phoneNumber ? dataStudent?.phoneNumber : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Email'
      >
        {dataStudent?.email ? dataStudent?.email : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Giới tính'
      >
        {dataStudent?.gender ? dataStudent?.gender : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Ngày sinh'
      >
        {dataStudent?.dob ? dataStudent?.dob : '[ Không có dữ liệu ]'}
      </Descriptions.Item>

      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Lớp'
      >
        {dataStudent?.classes?.id ? dataStudent?.classes?.id : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Chuyên ngành'
      >
        {dataStudent?.major?.id ? dataStudent?.major?.id : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Nơi ở hiện tại'
      >
        {dataStudent?.residence ? dataStudent?.residence : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Quên quán'
      >
        {dataStudent?.homeTown ? dataStudent?.homeTown : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Họ và tên bố'
      >
        {dataStudent?.fatherName ? `ông ${dataStudent?.fatherName}` : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Thông tin liên hệ bố'
      >
        {dataStudent?.fatherPhoneNumber ? dataStudent?.fatherPhoneNumber : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Họ và tên mẹ'
      >
        {dataStudent?.motherName ? `bà ${dataStudent?.motherName}` : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Thông tin liên hệ mẹ'
      >
        {dataStudent?.motherPhoneNumber ? dataStudent?.motherPhoneNumber : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Tình trạng'
      >
        {dataStudent?.status ? dataStudent?.status : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={4}
        labelStyle={{ fontSize: '18px' }}
        contentStyle={{ fontSize: '18px' }}
        label='Thời gian'
      >
        {dataStudent?.statusDate ? dataStudent?.statusDate : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
      <Descriptions.Item
        span={8}
        labelStyle={{ fontSize: '18px', marginBottom: '20px' }}
        contentStyle={{ fontSize: '18px', color: dataStudent?.warning === 'Không bị cảnh cáo' ? 'green' : 'red' }}
        label='Diện cảnh cáo'
      >
        {dataStudent?.warning ? dataStudent?.warning : '[ Không có dữ liệu ]'}
      </Descriptions.Item>
    </Descriptions>
  );
  return (
    <div className='px-10 py-24'>
      <div className='border-2 border-black rounded-3xl p-12'>
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
    </div>
  );
}

export default PersonalInformationStudent;
