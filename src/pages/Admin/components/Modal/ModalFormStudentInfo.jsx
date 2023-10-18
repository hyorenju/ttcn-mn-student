import { adminMajorApi } from "@/API/admin/adminMajorApi";
import { adminStudentApi } from "@/API/admin/adminStudentApi";
import { ButtonCustom } from "@/components/Button";
import { notificationSuccess } from "@/components/Notification";
import { addStudent, updateStudent } from "@/redux/Student/studentSilce";
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Space, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
export function ModalFormStudentInfo({
  openForm,
  onChangeClickOpen,
  dataStudent,
  onSuccess,
  disabled,
}) {
  const dispatch = useDispatch();
  const { data } = useQuery({
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    queryKey: ["majorList"],
    queryFn: async () => await adminMajorApi.getAllMajor({ page: 1, size: 10 }),
  });
  const optionMajor = data?.data?.items.map((e) => {
    return { label: e.name, value: e.id };
  });
  const handleCreateStudent = useMutation({
    mutationFn: async (values) => await adminStudentApi.createStudent(values),
    onSuccess: (data) => {
      if (data && data.success) {
        dispatch(addStudent(data.data));
        notificationSuccess("Tạo sinh viên thành công");
        onSuccess();
      } else if (data?.error?.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          data?.error.errorDetailList?.forEach((e) =>
            message.error(e.message, 2)
          );
        }
      } else if (data?.error?.code === 500)
        return message.error(data.error.message);
    },
    onError: (data) => console.log(data),
  });

  const handleUpdateStudent = useMutation({
    mutationFn: async (values) => await adminStudentApi.updateStudent(values),
    onSuccess: (data) => {
      if (data && data?.success) {
        dispatch(updateStudent(data.data));
        notificationSuccess(
          `Cập nhật sinh viên ${dataStudent.surname} ${dataStudent.lastName} thành công`
        );
        onSuccess();
      } else if (data?.error.code === 2) {
        // eslint-disable-next-line no-lone-blocks
        {
          data?.error.errorDetailList?.forEach((e) =>
            message.error(e.message, 2)
          );
        }
      }
    },
    onError: (data) => console.log(data),
  });
  const handleClickSubmit = (props) => {
    props.submit();
  };
  const handleClickCancel = (props) => {
    onSuccess();
  };
  return (
    <div>
      <ModalForm
        width={1100}
        title={dataStudent.id ? "Sửa thông tin sinh viên" : "Thêm sinh viên"}
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
                    ? handleUpdateStudent.isLoading
                    : handleCreateStudent.isLoading
                }
              />
              <ButtonCustom title="Hủy" handleClick={handleClickCancel} />
            </Space>,
          ],
        }}
        open={openForm}
        onFinish={(values) => {
          if (dataStudent.id) {
            handleUpdateStudent.mutate(values);
          } else {
            handleCreateStudent.mutate(values);
          }
        }}
        onOpenChange={onChangeClickOpen}
      >
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="surname"
            label="Họ đệm"
            placeholder="Nhập họ đệm sinh viên"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="lastName"
            label="Tên"
            placeholder="Nhập tên sinh viên"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="id"
            label="Mã sinh viên"
            placeholder="Nhâp mã sinh viên"
            disabled={disabled}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="phoneNumber"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
          />
          <ProFormDatePicker
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="dob"
            label="Ngày sinh"
            placeholder="Chọn ngày sinh"
            fieldProps={{
              format: "DD/MM/YYYY",
            }}
          />
          <ProFormRadio.Group
            width="md"
            rules={[{ required: true, message: "Không được để trống" }]}
            name="gender"
            label="Giới tính"
            options={[
              { label: "Nam", value: "Nam" },
              { label: "Nữ", value: "Nữ" },
              { label: "Khác", value: "Khác" },
            ]}
            placeholder="Chọn giới tính"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="email"
            label="Email"
            placeholder="Nhập email"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name={["course", "id"]}
            label="Khóa"
            placeholder="Nhập khóa học"
          />
          <ProFormSelect
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name={["major", "id"]}
            label="Ngành"
            placeholder="Chọn ngành"
            options={optionMajor}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name={["aclass", "id"]}
            label="Lớp"
            placeholder="Nhập lớp học"
          />
          <ProFormText
            rules={[{ required: true, message: "Không được để trống" }]}
            width="md"
            name="homeTown"
            label="Quê quán"
            placeholder="Nhập quê quán"
          />
          <ProFormText
            width="md"
            name="residence"
            label="Nơi ở hiện tại"
            placeholder="Nhập nơi ở hiện tại của sinh viên"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="fatherName"
            label="Họ và tên bố"
            placeholder="Nhập họ tên bố "
          />
          <ProFormText
            width="md"
            name="fatherPhoneNumber"
            label="Nhập số điện thoại bố"
            placeholder="Nhập số điện thoại bố"
          />
          <ProFormText
            width="md"
            name="motherName"
            label="Họ và tên mẹ"
            placeholder="Nhập họ tên mẹ"
          />
          <ProForm.Group>
            <ProFormText
              width="md"
              name="motherPhoneNumber"
              label="Nhập số điện thoại mẹ"
              placeholder="Nhập số điện thoại mẹ"
            />
            <ProFormText
              width="md"
              name="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
            />
          </ProForm.Group>
        </ProForm.Group>
      </ModalForm>
    </div>
  );
}
