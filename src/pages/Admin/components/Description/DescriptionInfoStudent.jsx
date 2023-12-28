import { Descriptions } from 'antd';

export function DescriptionInfoStudent({ dataStudent }) {
  return (
    <>
      {dataStudent && (
        <Descriptions bordered={true} layout='vertical' column={3}>
          <Descriptions.Item span={1} label='Mã sinh viên'>
            {dataStudent.id}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Họ đệm'>
            {dataStudent.surname}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Tên'>
            {dataStudent.lastName}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Mã Khóa'>
            {dataStudent.course?.id}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Mã ngành'>
            {dataStudent.major?.id}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Mã Lớp'>
            {dataStudent.aclass?.id}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Ngày sinh'>
            {dataStudent.dob}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Giới tính'>
            {dataStudent.gender}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Số điện thoại'>
            {dataStudent.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Email'>
            {dataStudent.email}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Quê quán'>
            {dataStudent.homeTown}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Nơi ở hiện tại'>
            {dataStudent.residence}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Họ và tên bố'>
            {dataStudent.fatherName}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Số điện thoại bố'>
            {dataStudent.fatherPhoneNumber}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Họ và tên mẹ'>
            {dataStudent.motherName}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Số điện thoại mẹ'>
            {dataStudent.motherPhoneNumber}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Hoàn cảnh gia đình'>
            {dataStudent.familySituation}
          </Descriptions.Item>
          <Descriptions.Item span={1} label='Mật khẩu'>
            {dataStudent.password}
          </Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
}
