import { adminPointApi } from "@/API/admin/adminPointApi";
import { notificationSuccess } from "@/components/Notification/NotificationSuccess";
import { addPoint, updatePoint } from "@/redux/Point/pointSlice";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
export function ModalFormPoint({
  openForm,
  onChangeClickOpen,
  dataPoint,
  onSuccess,
  disabled,
}) {
  const dispatch = useDispatch();
  const handleCreatePoint = useMutation({
    mutationKey: ["createPoint"],
    mutationFn: async (value) => adminPointApi.createPoint(value),
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(addPoint(res.data));
        notificationSuccess("Tạo điểm mới thành công");
        onSuccess();
      } else if (res && res.error?.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          res.error.errorDetailList.forEach((e) => message.error(e.message));
        }
      }
    },
  });
  const handleUpdatePoint = useMutation({
    mutationKey: ["updatePoint"],
    mutationFn: async (value) => {
      return adminPointApi.updatePoint(dataPoint.id, value);
    },
    onSuccess: (res) => {
      if (res && res.success === true) {
        dispatch(updatePoint(res.data));
        notificationSuccess("Cập nhật điểm thành công");
        onSuccess();
      } else if (res && res.error?.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          res.error.errorDetailList.forEach((e) => message.error(e.message));
        }
      }
    },
  });
  return (
    <div>
      <ModalForm
        width={750}
        title={dataPoint.id ? "Sửa thông tin điểm" : "Thêm điểm"}
        initialValues={dataPoint}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
          okText: dataPoint.id ? "Lưu" : "Tạo",
          okType: "primary",
          cancelText: "Hủy",
        }}
        open={openForm}
        onFinish={(value) => {
          if (dataPoint.id) {
            handleUpdatePoint.mutate(value);
          } else {
            handleCreatePoint.mutate(value);
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
            name={["student", "id"]}
            label="Mã sinh viên"
            placeholder="Nhập mã sinh viên. Ví dụ: 655103"
            disabled={disabled}
          />
          <ProFormText
            rules={[
              { required: true, message: "Vui lòng nhập đầy đủ thông tin" },
            ]}
            width="md"
            name={["term", "id"]}
            label="Mã học kì"
            placeholder="Nhập mã học kì. Ví dụ: 20211"
            disabled={disabled}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            rules={[
              { required: true, message: "Vui lòng chọn đầy đủ thông tin !" },
            ]}
            name="avgPoint10"
            label="Điểm trung bình hệ 10"
            placeholder="Nhập điểm trung bình hệ 10"
          />
          <ProFormText
            width="md"
            rules={[
              { required: true, message: "Vui lòng chọn đầy đủ thông tin !" },
            ]}
            name="avgPoint4"
            label="Điểm trung bình hệ 4"
            placeholder="Nhập điểm trung bình hệ 4"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            rules={[
              { required: true, message: "Vui lòng chọn đầy đủ thông tin !" },
            ]}
            name="trainingPoint"
            label="Điểm rèn luyện"
            placeholder="Nhập điểm rèn luyện"
          />
          <ProFormText
            width="md"
            rules={[
              { required: true, message: "Vui lòng chọn đầy đủ thông tin !" },
            ]}
            name="creditsAcc"
            label="Tín chỉ tích lũy"
            placeholder="Nhập số tín chỉ tích lũy"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            rules={[
              { required: true, message: "Vui lòng chọn đầy đủ thông tin !" },
            ]}
            name="pointAcc10"
            label="Điểm trung bình tích lũy ( hệ 10 )"
            placeholder="Nhập điểm trung bình tích lũy ( hệ 10 )"
          />
          <ProFormText
            width="md"
            rules={[
              { required: true, message: "Vui lòng chọn đầy đủ thông tin !" },
            ]}
            name="pointAcc4"
            label="Điểm trung bình tích lũy ( hệ 4 )"
            placeholder="Nhập điểm trung bình tích lũy ( hệ 4 )"
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
