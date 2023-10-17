import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, Upload, notification } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { updateInfoAdmin } from "../../../API/axios";
import { ButtonCustom } from "../../../components/Button";
import {
  notificationError,
  notificationSuccess,
} from "../../../components/Notification";
import { ModalChangePassword } from "../components/Modal";

function AdminChangeInfomation() {
  const [loadingBtnUpload, setLoadingBtnUpload] = useState(false);
  const dataAdmin = JSON.parse(localStorage.getItem("info_admin"));
  const { roleId } = useParams();
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const jwt = Cookies.get("access_token");

  const onFinish = (values) => {
    setLoading(true);
    if (roleId !== undefined) {
      setLoading(true);
      updateInfoAdmin({ id: roleId, info: values })
        .then((res) => {
          if (res.data?.success === true) {
            notification.success({
              message: "Thành công",
              description: "Cập nhật thành công",
              duration: 3,
            });
            setLoading(false);
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const props = {
    multiple: false,
    action: `http://localhost:8080/admin/admin/avatar`,
    showUploadList: false,
    headers: {
      Authorization: jwt ? `Bearer ${jwt}` : undefined,
    },
    onChange: (file) => {
      const { response, status } = file.file;
      if (response && response?.success === true) {
        localStorage.setItem("info_admin", JSON.stringify(response.data));
        notificationSuccess("Ảnh đại diện đã được cập nhật thành công.");
      }
      if (status === "done") {
        setLoadingBtnUpload(false);
      } else if (status === "uploading") {
        setLoadingBtnUpload(true);
      }
    },
    beforeUpload: (file) => {
      const { size, type } = file;
      const isSize = size / 1024 / 1024 < 2;
      const isType = type === "image/jpeg" || file.type === "image/png";
      if (!isType) {
        notificationError(`${file.name} phải là một file ảnh`);
        return false;
      }
      if (!isSize) {
        notificationError(`Ảnh tải lên không được quá 2MB`);
        return false;
      }
      return true;
    },
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <Title
        level={2}
        style={{
          textTransform: "uppercase",
        }}
      >
        Thông tin cá nhân
      </Title>
      <div className="px-44 pt-16 pb-8 bg-slate-600 rounded-lg flex flex-col items-center max-w-[80%]">
        <div className="bg-slate-50 px-16 py-8 rounded-lg">
          <Form
            form={form}
            style={{
              width: 500,
              maxWidth: 700,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Tên người dùng"
              name="name"
              initialValue={dataAdmin.name}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              initialValue={dataAdmin.email}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Ảnh đại diện" valuePropName="fileList">
              <Upload {...props}>
                <ButtonCustom
                  loading={loadingBtnUpload}
                  title={"Cập nhật ảnh đại diện"}
                  icon={<UploadOutlined />}
                />
              </Upload>
            </Form.Item>
            <Button
              type="link"
              onClick={() => setOpenModal(true)}
              className="pl-0"
            >
              Đổi mật khẩu
            </Button>
            <Form.Item className="flex justify-center items-center">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="mb-0 w-[150px] flex justify-center items-center"
              >
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <ModalChangePassword
        openModal={openModal}
        onOpenChange={(open) => {
          if (!open) {
            setOpenModal(false);
          }
        }}
        onSuccess={() => setOpenModal(false)}
      />
    </div>
  );
}

export default AdminChangeInfomation;
