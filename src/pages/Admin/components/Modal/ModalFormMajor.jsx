import { adminMajorApi } from "@/API/admin/adminMajorApi";
import {
  notificationError,
  notificationSuccess,
} from "@/components/Notification";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import React from "react";
export function ModalFormMajor({ openForm, onChangeClickOpen, dataMajor }) {
  const queryClient = useQueryClient();
  const handleCreateMajor = useMutation({
    mutationKey: ["createMajor"],
    mutationFn: async (values) => await adminMajorApi.createMajor(values),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ["majorList"],
        });
        onChangeClickOpen(false);
        notificationSuccess("Tạo ngành thành công");
      } else if (res.error?.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          res.error?.errorDetailList.forEach((e) => message.error(e.message));
        }
      } else {
        notificationError("Tạo ngành thất bại");
      }
    },
  });
  const handleUpdateMajor = useMutation({
    mutationKey: ["updateMajor"],
    mutationFn: async (values) => await adminMajorApi.updateMajor(values),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        queryClient.invalidateQueries({
          queryKey: ["majorList"],
        });
        onChangeClickOpen(false);
        notificationSuccess("Cập nhật ngành thành công");
      } else if (res.error?.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          res.error?.errorDetailList.forEach((e) => message.error(e.message));
        }
      } else {
        notificationError("Cập nhật ngành thất bại");
      }
    },
  });

  return (
    <div>
      <ModalForm
        width={750}
        title={
          dataMajor.id ? "Sửa thông tin chuyên ngành" : "Thêm chuyên ngành"
        }
        initialValues={dataMajor}
        modalProps={{
          destroyOnClose: true,
          okText: dataMajor.id ? "Lưu" : "Tạo",
          okType: "primary",
          cancelText: "Hủy",
        }}
        open={openForm}
        onFinish={(values) => {
          if (dataMajor.id) {
            handleUpdateMajor.mutate(dataMajor.id, values);
          } else {
            handleCreateMajor.mutate(values);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              { required: true, message: "Vui lòng nhập đầy đủ thông tin" },
            ]}
            width="md"
            name="id"
            label="Mã chuyên ngành"
            placeholder="Nhập mã chuyên ngành. Ví dụ: CNTT"
          />
          <ProFormText
            rules={[
              { required: true, message: "Vui lòng nhập đầy đủ thông tin" },
            ]}
            width="md"
            name="name"
            label="Tên chuyên ngành:"
            placeholder="Nhập tên chuyên ngành. Ví dụ: Công nghệ thông tin"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[
              { required: true, message: "Vui lòng nhập đầy đủ thông tin" },
            ]}
            width="md"
            name="totalCredits"
            label="Tổng số tín chỉ tích lũy"
            placeholder="Nhập tổng số tín chỉ"
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
