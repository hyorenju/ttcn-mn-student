import { Descriptions } from "antd";
import React from "react";

export function DescriptionInfoStudent({ dataStudent }) {
  return (
    <>
      {dataStudent && (
        <Descriptions bordered={true} layout="vertical" column={3}>
          <Descriptions.Item span={1} label="Mã sinh viên">
            {dataStudent?.id ? dataStudent?.id : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Họ và tên">
            {dataStudent?.name ? dataStudent?.name : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Khóa">
            {dataStudent?.course?.id
              ? dataStudent?.course?.id
              : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Chuyên ngành">
            {dataStudent?.major?.id
              ? dataStudent?.major?.id
              : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Lớp">
            {dataStudent?.classes?.id
              ? dataStudent?.classes?.id
              : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Ngày sinh">
            {dataStudent?.dob ? dataStudent?.dob : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Giới tính">
            {dataStudent?.gender ? dataStudent?.gender : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Số điện thoại">
            {dataStudent?.phoneNumber
              ? dataStudent?.phoneNumber
              : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Email">
            {dataStudent?.email ? dataStudent?.email : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Quê quán">
            {dataStudent?.homeTown
              ? dataStudent?.homeTown
              : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Nơi ở hiện tại">
            {dataStudent?.residence
              ? dataStudent?.residence
              : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Họ và tên bố">
            {dataStudent?.fatherName
              ? dataStudent?.fatherName
              : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Số điện thoại bố">
            {dataStudent?.fatherPhoneNumber
              ? dataStudent?.fatherPhoneNumber
              : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Họ và tên mẹ">
            {dataStudent?.motherName
              ? dataStudent?.motherName
              : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Số điện thoại mẹ">
            {dataStudent?.motherPhoneNumber
              ? dataStudent?.motherPhoneNumber
              : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Mật khẩu">
            {dataStudent?.password
              ? dataStudent?.password
              : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Diện cảnh cáo">
            {dataStudent?.warning
              ? dataStudent?.warning
              : "[ Không có dữ liệu ]"}
          </Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
}
