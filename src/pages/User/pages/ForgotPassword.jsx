import { Button, Form, Input, Typography, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRequestForgotStudent } from "../../../API/axios";
import { DefaultLayoutPage } from "../components/Layout/DefaultLayoutPage";

function ForgotPasswordPage(props) {
  const { Text } = Typography;
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const onFinish = (values) => {
    setLoadingSubmit(true);
    sendRequestForgotStudent({
      values: values,
      link: `http://localhost:3000/confirm-changepassword/${values.id}`,
    })
      .then((res) => {
        if (res.data?.success === true) {
          navigate(`/`);
          message.success(res.data?.data);
          setLoadingSubmit(false);
        } else return message.error(res.data?.error?.message);
      })
      .finally(() => setLoadingSubmit(false));
  };

  return (
    <DefaultLayoutPage>
      <div className="bg-slate-200">
        <div className="max-w-[1100px] mx-auto bg-slate-100 pb-8 min-h-[70vh] justify-center flex">
          <div className="p-4 mt-20">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label={<Text style={{ marginRight: 50 }}>Tên đăng nhập</Text>}
                name="id"
                rules={[
                  {
                    required: true,
                    message: "Nhập đầy đủ thông tin",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={<Text>Email</Text>}
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Nhập đầy đủ thông tin",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadingSubmit}
                >
                  Gửi email
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </DefaultLayoutPage>
  );
}

export default ForgotPasswordPage;
