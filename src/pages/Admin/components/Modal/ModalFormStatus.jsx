import { adminStatusApi } from "@/API/admin/adminStatusApi";
import { ButtonCustom } from "@/components/Button";
import {
  notificationError,
  notificationSuccess,
} from "@/components/Notification";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Space } from "antd";
import React from "react";

export function ModalFormStatus({ open, onChangeClickOpen, dataStatus }) {
  const queryClient = useQueryClient();
  const handleClickSubmit = (props) => {
    props.submit();
  };
  const handleClickCancel = () => {
    onChangeClickOpen(false);
  };
  // handle create class
  const handleCreateStatus = useMutation({
    mutationKey: ["createStatus"],
    mutationFn: async (values) => adminStatusApi.createStatus(values),
    onSuccess: (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ["listStatus"],
        });
        notificationSuccess("Tạo trạng thái thành công");
        onChangeClickOpen(false);
      }
    },
    onError: (error) => {
      notificationError(error?.data);
    },
  });

  // handle update class
  const handleUpdateStatus = useMutation({
    mutationKey: ["updateStatus"],
    mutationFn: async (id, values) => adminStatusApi.createStatus(id, values),
    onSuccess: (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ["listStatus"],
        });
        notificationSuccess("Cập nhật trạng thái thành công");
        onChangeClickOpen(false);
      } else {
        notificationError(res.error?.message);
      }
    },
    onError: (error) => {
      notificationError(error?.data);
    },
  });
  return (
    <div>
      <ModalForm
        width={750}
        title={
          dataStatus.id ? "Cập nhật thông tin trạng thái" : "Thêm trạng thái"
        }
        initialValues={dataStatus}
        modalProps={{
          destroyOnClose: true,
          maskClosable: false,
        }}
        submitter={{
          render: (props) => [
            <Space>
              <ButtonCustom
                type="primary"
                handleClick={() => handleClickSubmit(props)}
                title={dataStatus.id ? "Cập nhật" : "Tạo mới"}
              />
              <ButtonCustom title="Hủy" handleClick={handleClickCancel} />
            </Space>,
          ],
        }}
        open={open}
        onFinish={(values) => {
          if (dataStatus.id) {
            handleUpdateStatus.mutate(dataStatus.id, values);
          } else {
            handleCreateStatus.mutate(values);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: "Không thể để trống" }]}
            width="md"
            name="name"
            label="Tên trạng thái"
            placeholder="Nhập tên trạng thái"
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
