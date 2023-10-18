import { adminSemesterApi } from "@/API/admin/adminSemesterApi";
import {
  notificationError,
  notificationSuccess,
} from "@/components/Notification";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import React from "react";

export function ModalFormTerm({ openForm, onChangeClickOpen, dataTerm }) {
  const queryClient = useQueryClient();
  const handleCreateTerm = useMutation({
    mutationKey: ["createTerm"],
    mutationFn: async (values) => await adminSemesterApi.createSemester(values),
    onSuccess: async (res) => {
      if (res && res.success === true) {
        await queryClient.invalidateQueries({
          queryKey: ["semesterList"],
        });
        notificationSuccess("Tạo học kì thành công");
        onChangeClickOpen(false);
      } else if (res && res.error?.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          res.error?.errorDetailList.forEach((e) => message.error(e.message));
        }
      } else if (res && res.error?.code === 500) {
        notificationError(res.error?.message);
      } else {
        notificationError("Cập nhật học kì thất bại");
      }
    },
  });
  return (
    <div>
      <ModalForm
        width={750}
        title={dataTerm.id ? "Sửa thông tin kỳ học" : "Thêm kì học mới"}
        initialValues={dataTerm}
        modalProps={{
          destroyOnClose: true,
          okText: dataTerm.id ? "Cập nhật" : "Tạo",
          cancelText: "Hủy",
        }}
        open={openForm}
        onFinish={(value) => handleCreateTerm.mutate(value)}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              { required: true, message: "Vui lòng nhập đầy đủ thông tin" },
              {
                pattern: "[0-9]{4}[1-2]",
                message: "Mã học kỳ có dạng năm + học kỳ",
              },
              { min: 5, max: 5, message: "Mã học kỳ chỉ dài 5 kí tự số" },
            ]}
            width="md"
            name="id"
            label="Mã học kì"
            placeholder="Nhập mã học kì, ví dụ: 20201"
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
