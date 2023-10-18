import { adminCourseApi } from "@/API/admin/adminCourseApi";
import {
  notificationError,
  notificationSuccess,
} from "@/components/Notification";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import React from "react";

export function ModalFormCourse({ openForm, onChangeClickOpen, dataCourse }) {
  const queryClient = useQueryClient();
  const handleCreateCourse = useMutation({
    mutationKey: ["createCourse"],
    mutationFn: async (values) => await adminCourseApi.createCourse(values),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ["courseList"],
        });
        notificationSuccess("Tạo khóa mới thành công");
        onChangeClickOpen(false);
      } else if (res.error?.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          res.error?.errorDetailList.forEach((e) => message.error(e.message));
        }
      } else {
        notificationError("Tạo khóa thất bại");
      }
    },
  });

  return (
    <div>
      <ModalForm
        width={750}
        title={dataCourse.id ? "Cập nhật thông tin khóa" : "Thêm khóa"}
        initialValues={dataCourse}
        modalProps={{
          destroyOnClose: true,
          okText: dataCourse.id ? "Cập nhật" : "Tạo",
          okType: "primary",
          cancelText: "Hủy",
        }}
        open={openForm}
        onFinish={(value) => handleCreateCourse.mutate(value)}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              { required: true, message: "Vui lòng nhập đầy đủ Thông tin" },
              {
                min: 1,
                max: 5,
                message: "Vượt quá số kí tự",
              },
            ]}
            width="md"
            name="id"
            label="Mã khóa"
            placeholder="Nhập mã khóa học, ví dụ: K65"
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
