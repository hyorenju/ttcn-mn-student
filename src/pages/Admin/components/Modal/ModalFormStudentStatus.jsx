import { adminStatusApi } from "@/API/admin/adminStatusApi";
import { ButtonCustom } from "@/components/Button";
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useQuery } from "@tanstack/react-query";
import { Space } from "antd";
import React from "react";
export function ModalFormStudentStatus({
  open,
  dataStudent,
  onChangeClickOpen,
}) {
  const { data } = useQuery({
    queryKey: ["statusList"],
    queryFn: async () => adminStatusApi.getAllStatus({ page: 1, size: 100 }),
  });
  const optionSelected = data?.data?.items.map((item) => {
    return { label: item.name, value: item.id };
  });
  const handleClickSubmit = (props) => {
    props.submit();
  };
  const handleUpdateStudentStatus = () => {};
  const handleCreateStudentStatus = () => {};
  const handleClickCancel = () => {
    onChangeClickOpen(false);
  };
  return (
    <div>
      <ModalForm
        width={740}
        title={
          dataStudent.id
            ? "Sửa thông tin tình trạng sinh viên"
            : "Thêm tình trạng sinh viên"
        }
        initialValues={dataStudent}
        modalProps={{
          maskClosable: false,
          destroyOnClose: true,
        }}
        submitter={{
          render: (props) => [
            <Space>
              <ButtonCustom
                type="primary"
                handleClick={() => handleClickSubmit(props)}
                title={dataStudent.id ? "Cập nhật" : "Tạo mới"}
                loading={
                  dataStudent.id
                    ? handleUpdateStudentStatus.isLoading
                    : handleCreateStudentStatus.isLoading
                }
              />
              <ButtonCustom title="Hủy" handleClick={handleClickCancel} />
            </Space>,
          ],
        }}
        open={open}
        onFinish={(values) => {
          if (dataStudent.id) {
            handleUpdateStudentStatus.mutate(values);
          } else {
            handleCreateStudentStatus.mutate(values);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="surname"
            label="Họ Đệm"
            placeholder="Nhập họ đệm sinh viên"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="lastName"
            label="Tên"
            placeholder="Nhập tên sinh viên"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="studentId"
            label="Mã sinh viên"
            placeholder="Nhâp mã sinh viên"
          />
          <ProFormSelect
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="status"
            label="Tình trạng"
            placeholder="Chọn tình trạng"
            mode="single"
            options={optionSelected}
          />
          <ProFormDatePicker
            width="md"
            name="time"
            label="Thời gian"
            placeholder="Chọn thời gian"
            fieldProps={{
              format: "DD/MM/YYYY",
            }}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTextArea
            width="md"
            name="note"
            label="Ghi chú"
            placeholder="Ghi chú sinh viên"
          />
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
