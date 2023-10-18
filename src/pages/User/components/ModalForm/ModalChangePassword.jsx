import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { ButtonCustom } from "../../../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { studentApi } from "../../../../API/Student";
import {
  notificationError,
  notificationSuccess,
} from "../../../../components/Notification";

export function ModalChangePassword({ open, onOpenChange }) {
  const handleUpdatePassword = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: async (values) => await studentApi.changePassword(values),
    onSuccess: (res) => {
      if (res && res.success === true) {
        notificationSuccess("Cập nhật mật khẩu thành công");
        onOpenChange(false);
      } else if (res && res.success === false) {
        notificationError(res.error?.message);
      }
    },
  });
  const onFinish = (values) => {
    handleUpdatePassword.mutate(values);
  };
  const handleClickSubmit = (props) => {
    props.submit();
  };
  const handleClickCancel = () => {
    onOpenChange(false);
  };
  return (
    <>
      <div>
        <ModalForm
          width={400}
          open={open}
          title={<h1 className="text-xl mb-4">Cập nhật mật khẩu</h1>}
          onOpenChange={onOpenChange}
          onFinish={onFinish}
          submitter={{
            render: (props) => [
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center">
                  <ButtonCustom
                    loading={handleUpdatePassword.isLoading}
                    type="primary"
                    title={"Cập nhật"}
                    handleClick={() => handleClickSubmit(props)}
                  />
                  <ButtonCustom title={"Hủy"} handleClick={handleClickCancel} />
                </div>
              </div>,
            ],
          }}
          modalProps={{
            destroyOnClose: true,
            maskClosable: false,
          }}
        >
          <ProFormText
            name="currentPassword"
            required
            rules={[
              {
                required: true,
                message: "Không thể bỏ trống",
              },
            ]}
            label={<p className="text-md">Mật khẩu cũ</p>}
            placeholder="Nhập hiện tại"
          />
          <ProFormText.Password
            name="newPassword"
            required
            rules={[
              {
                required: true,
                message: "Không thể bỏ trống",
              },
            ]}
            label={<p className="text-md">Mật khẩu mới</p>}
            placeholder="Nhập mật khẩu mới"
          />
          <ProFormText.Password
            name="confirmPassword"
            required
            label={<p className="text-md">Xác nhận mật khẩu mới</p>}
            placeholder="Nhập lại mật khẩu mới"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Không thể bỏ trống",
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
          />
        </ModalForm>
      </div>
    </>
  );
}
