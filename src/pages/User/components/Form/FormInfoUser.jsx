import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Col, Row } from "antd";
import React from "react";
import { ButtonCustom } from "../../../../components/Button";
import { notificationSuccess } from "../../../../components/Notification";

export function FormInfoUser() {
  const dataStudent = JSON.parse(localStorage.getItem("info_student"));
  const onFinish = (values) => {
    notificationSuccess(values);
  };
  const handleClickSubmit = (e) => {
    e.submit();
  };
  return (
    <div>
      <ProForm
        onFinish={onFinish}
        initialValues={dataStudent}
        submitter={{
          render: (props) => {
            return [
              <div className="flex gap-3 mt-4 justify-center lg:justify-start">
                <ButtonCustom
                  title="Lưu thông tin"
                  size="large"
                  type="primary"
                  handleClick={() => handleClickSubmit(props)}
                />
              </div>,
            ];
          },
        }}
      >
        <Row gutter={[30, 20]} justify={["center"]}>
          <Col>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              width="md"
              name="surname"
              label=<p className="text-base">Họ Đệm</p>
              rules={[{ required: true, message: "Không thể bỏ trống" }]}
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              width="md"
              name="lastName"
              label=<p className="text-base">Tên</p>
              rules={[{ required: true, message: "Không thể bỏ trống" }]}
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              width="md"
              name="id"
              label=<p className="text-base">Mã sinh viên</p>
              placeholder="Mã sinh viên"
              rules={[{ required: true, message: "Không thể bỏ trống" }]}
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              width="md"
              name={["aclass", "id"]}
              label=<p className="text-base">Lớp</p>
              placeholder="Lớp"
              rules={[{ required: true, message: "Không thể bỏ trống" }]}
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              width="md"
              name={["major", "id"]}
              label=<p className="text-base">Chuyên ngành</p>
              placeholder="Chuyên ngành"
              rules={[{ required: true, message: "Không thể bỏ trống" }]}
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              width="md"
              name="email"
              label=<p className="text-base">Email</p>
              placeholder="example@gamil.com"
              rules={[{ required: true, message: "Không thể bỏ trống" }]}
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              disabled
              width="md"
              rules={[
                {
                  required: true,
                  message: "Không thể để trống",
                },
              ]}
              name="homeTown"
              label=<p className="text-base">Địa chỉ quê quán</p>
              placeholder="Số nhà - Ngõ (Ngách) - Xã - Phường"
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              width="md"
              name="residence"
              rules={[
                {
                  required: true,
                  message: "Không thể để trống",
                },
              ]}
              label=<p className="text-base">Địa chỉ nơi ở hiện tại</p>
              placeholder="Số nhà - Ngõ (Ngách) - Xã - Phường"
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              width="md"
              name="fatherName"
              label=<p className="text-base">Họ và tên bố</p>
              placeholder=""
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              width="md"
              name="fatherPhoneNumber"
              label=<p className="text-base">Số điện thoại bố</p>
              placeholder="+ 84"
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              width="md"
              name="motherName"
              label=<p className="text-base">Họ và tên mẹ</p>
              placeholder=""
            />
          </Col>
          <Col>
            <ProFormText
              fieldProps={{
                size: "large",
              }}
              width="md"
              name="motherPhoneNumber"
              label=<p className="text-base">Số điện thoại mẹ</p>
              placeholder="+ 84"
            />
          </Col>
          <Col>
            <ProFormSelect
              fieldProps={{
                size: "large",
              }}
              width="md"
              name="status"
              options={[
                { label: "Còn đi học", value: "stillStudying" },
                { label: "Đã tốt nghiệp", value: "graduated" },
                { label: "Đã bỏ học", value: "dropped" },
                { label: "Bị buộc thôi học", value: "forcedOut" },
              ]}
              label=<p className="text-base">Tình trạng</p>
              placeholder="Tình trạng"
            />
          </Col>
          <Col>
            <ProFormDatePicker
              width="md"
              name="statusDate"
              label=<p className="text-base">Thời gian</p>
              placeholder="Chọn thời gian"
              fieldProps={{
                size: "large",
                format: "DD-MM-YYYY",
              }}
            />
          </Col>
        </Row>
      </ProForm>
    </div>
  );
}
