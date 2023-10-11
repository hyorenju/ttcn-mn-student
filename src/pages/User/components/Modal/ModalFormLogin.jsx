import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { useMutation } from "@tanstack/react-query";
import { Space } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { visitor } from "../../../../API/Visistor/visitor";
import { ButtonCustom } from "../../../../components/Button";
import {
  notificationError,
  notificationSuccess,
} from "../../../../components/Notification";
import { setOpenModal } from "../../../../redux/Modal/modalLoginSlice";

export function ModalFormLogin({ onChangeClickOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openModal = useSelector((state) => state.modalLogin.openModal);

  const handleLogin = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values) => await visitor.login(values),
    onSuccess: (res) => {
      if (res && res.success === true && res.data) {
        Cookies.set("access_token", res.data.jwt);
        if (res.data.roleId === "STUDENT") {
          sessionStorage.setItem("info_student", JSON.stringify(res.data));
          notificationSuccess("Đăng nhập thành công");
          dispatch(setOpenModal(false));
          window.location.reload();
        } else if (res.data.roleId !== "STUDENT") {
          sessionStorage.setItem("info_admin", JSON.stringify(res.data));
          notificationSuccess("Đăng nhập thành công");
          dispatch(setOpenModal(false));
          navigate(`/manage`);
        }
      } else if (res && res.success === false && res.error.code === 500) {
        notificationError(res.error.message);
      }
    },
    onError: (error) => {
      notificationError("Đăng nhập thất bại");
    },
  });
  const onFinish = (values) => {
    handleLogin.mutate(values);
  };
  const handleClickForgotPassword = () => {
    navigate("/forgotpassword");
  };
  const handleClickSubmit = (props) => {
    props.submit();
  };
  const handleClickCancel = () => {
    dispatch(setOpenModal(false));
  };
  return (
    <div>
      <ModalForm
        title={<p className="font-saira text-2xl text-center">Đăng nhập</p>}
        width={380}
        open={openModal}
        onFinish={onFinish}
        onOpenChange={onChangeClickOpen}
        modalProps={{
          destroyOnClose: true,
          okText: "Đăng nhập",
        }}
        submitter={{
          render: (props) => {
            return [
              <div className="flex justify-between w-full items-center">
                <p
                  key="forgot"
                  onClick={handleClickForgotPassword}
                  className="opacity-50 font-saira italic hover:opacity-100 hover:text-primary-color hover:cursor-pointer"
                >
                  Quên mật khẩu
                </p>
                <Space size={10}>
                  <ButtonCustom
                    loading={handleLogin.isLoading}
                    type="primary"
                    title="Đăng nhập"
                    key="submit"
                    handleClick={() => handleClickSubmit(props)}
                  ></ButtonCustom>
                  <ButtonCustom
                    title="Hủy"
                    key="cancel"
                    handleClick={handleClickCancel}
                  ></ButtonCustom>
                </Space>
              </div>,
            ];
          },
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="id"
            label={<p className="font-saira">Tài khoản</p>}
            placeholder="Mã sinh viên"
            rules={[
              {
                required: true,
                message: (
                  <p className="font-saira">Không thể để trống tài khoản</p>
                ),
              },
            ]}
            fieldProps={{
              prefix: <UserOutlined className="opacity-50 mr-1" />,
            }}
          />
          <ProFormText.Password
            width="md"
            name="password"
            label={<p className="font-saira">Mật khẩu</p>}
            placeholder="Mật khẩu "
            rules={[
              {
                required: true,
                message: (
                  <p className="font-saira">Không thể để trống mật khẩu</p>
                ),
              },
            ]}
            fieldProps={{
              prefix: <LockOutlined className="opacity-50 mr-1" />,
            }}
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
