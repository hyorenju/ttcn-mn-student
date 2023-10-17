import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Avatar, Button, Form, Input } from "antd";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { visitor } from "../../../API/Visistor/visitor";
import ErrorPage from "../../../components/Error/ErrorPage";
import {
  notificationError,
  notificationSuccess,
} from "../../../components/Notification";

function ChangePasswordPage(props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenChangePassword = searchParams.get("email-verification") || "";
  const { data } = useQuery({
    queryKey: ["checkTokenChangePassword"],
    queryFn: async () =>
      await visitor.checkTokenChangePassword({ token: tokenChangePassword }),
  });
  const handleSubmit = useMutation({
    mutationKey: ["confirmChangePassword"],
    mutationFn: async (values) =>
      await visitor.changePassword({
        token: tokenChangePassword,
        values: values,
      }),
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess("Cập nhật mật khẩu thành công");
        navigate("/");
      }
    },
  });
  const onFinish = (values) => {
    handleSubmit.mutate(values);
  };
  return (
    <div>
      {data?.success === true && (
        <div className="h-[100vh] flex justify-center items-center flex-col bg-gradient-to-tl from-stone-800 via-black to-lime-500">
          <Avatar
            className="border-2 border-white"
            size={120}
            icon={<UserOutlined />}
          />
          <div className="backdrop-blur bg-transparent p-16 pt-12 rounded-3xl mt-8 border-2 border-white">
            <Form
              size="large"
              name="normal_login"
              className="w-[400px]"
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                label=<p className="text-white">Mật khẩu mới</p>
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                />
              </Form.Item>
              <Form.Item
                label=<p className="text-white">Nhập lại mật khẩu</p>
                name="confirmPassword"
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu không trùng khớp !")
                      );
                    },
                  }),
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={handleSubmit.isLoading}
                  htmlType="submit"
                  className="w-full text-white uppercase mt-8"
                >
                  Cập nhật mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
      {data?.success === false && <ErrorPage />}
      {data?.success === false && notificationError(data.error.message)}
    </div>
  );
}

export default ChangePasswordPage;
