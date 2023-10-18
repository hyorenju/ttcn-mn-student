import { adminClassApi } from "@/API/admin/adminClassApi";
import {
  notificationError,
  notificationSuccess,
} from "@/components/Notification";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import React from "react";

export function ModalFormClass({
  openModalForm,
  onChangeClickOpen,
  dataClass,
  disabledClass,
}) {
  const queryClient = useQueryClient();
  // handle create class
  const handleCreateClass = useMutation({
    mutationKey: ["createClass"],
    mutationFn: async (values) => await adminClassApi.createClass(values),
    onSuccess: (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ["classList"],
        });
        onChangeClickOpen(false);
        notificationSuccess("Tạo lớp thành công");
      } else if (res && res.success === false && res.error?.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          res.error?.errorDetailList.forEach((e) => message.error(e.message));
        }
      } else {
        notificationError("Tạo lớp thất bại");
      }
    },
  });

  // handle update class
  const handleUpdateClass = useMutation({
    mutationKey: ["updateClass"],
    mutationFn: async (values) => await adminClassApi.updateClass(values),
    onSuccess: (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ["classList"],
        });
        onChangeClickOpen(false);
        notificationSuccess("Cập nhật lớp thành công");
      } else if (res && res.success === false && res.error?.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          res.error?.errorDetailList.forEach((e) => message.error(e.message));
        }
      } else {
        notificationError("Cập nhật lớp thất bại");
      }
    },
  });
  return (
    <div>
      <ModalForm
        width={750}
        title={dataClass.id ? "Cập nhật thông tin lớp" : "Thêm lớp"}
        initialValues={dataClass}
        modalProps={{
          destroyOnClose: true,
          okText: dataClass.id ? "Cập nhật" : "Tạo",
          okType: "primary",
          cancelText: "Hủy",
        }}
        open={openModalForm}
        onFinish={(values) => {
          if (dataClass.id) {
            handleUpdateClass.mutate(values);
          } else {
            handleCreateClass.mutate(values);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              { required: true, message: "Vui lòng nhập đầy đủ thông tin " },
            ]}
            width="md"
            name="id"
            label="Mã lớp"
            placeholder="Nhập mã lớp"
            disabled={disabledClass}
          />
          <ProFormText
            rules={[
              {
                required: "^K[0-9]+-[0-9]+-",
                message: "Vui lòng nhập đầy đủ thông tin ",
              },
            ]}
            width="md"
            name="name"
            label="Tên lớp"
            placeholder="Nhập tên lớp học"
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
