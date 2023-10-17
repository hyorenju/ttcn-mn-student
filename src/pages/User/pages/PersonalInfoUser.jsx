import {
  AreaChartOutlined,
  FileImageOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Drawer, Space, Upload } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { adminStatistic } from "../../../API/admin/adminStatistic";
import { ButtonCustom } from "../../../components/Button";
import {
  notificationError,
  notificationSuccess,
} from "../../../components/Notification";
import { ChartColumnBasic, ChartLiquid } from "../../Admin/components/Chart";
import { FormInfoUser } from "../components/Form/FormInfoUser";
import { DefaultLayoutPage } from "../components/Layout/DefaultLayoutPage";
import { ModalEditPhoneNumber } from "../components/ModalForm";

function PersonalInfoUser() {
  const dataStudentLocal = JSON.parse(localStorage.getItem("info_student"));
  const [openModalFormPhoneNumber, setOpenModalFormPhoneNumber] =
    useState(false);
  const [openDrawerPoint, setOpenDrawerPoint] = useState(false);
  const [loadingBtnUpload, setLoadingBtnUpload] = useState(false);
  const token = Cookies.get("access_token");
  const { data } = useQuery({
    queryKey: ["getDataPoint"],
    queryFn: async () =>
      await adminStatistic.getDataPoint(dataStudentLocal?.id),
  });
  const props = {
    name: "file",
    multiple: false,
    action: `https://student-manager-a9966b285f24.herokuapp.com/student/avatar`,
    showUploadList: false,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    beforeUpload: (file) => {
      const isSize = file.size / 1024 / 1024 < 2;
      const isPNG = file.type === "image/jpeg" || "image/png";
      if (!isPNG) {
        notificationError(`${file.name} không phải định dạng ảnh`);
        return false;
      }
      if (!isSize) {
        notificationError(`${file.name} không được vượt quá 2MB`);
        return false;
      }
      return true;
    },
    onChange(info) {
      const { response, status } = info.file;
      if (response && response?.success === true) {
        localStorage.setItem("info_student", JSON.stringify(response.data));
        notificationSuccess(`Upload ${info.file.name} thành công`);
      } else if (response?.success === false) {
        notificationError(`Upload ${info.file.name} thất bại`);
      }
      if (status === "done") {
        setLoadingBtnUpload(false);
      } else if (status === "uploading") {
        setLoadingBtnUpload(true);
      }
    },
  };
  const handleOpenChange = (open) => {
    if (!open) {
      setOpenModalFormPhoneNumber(false);
    }
  };
  const handleClickUpdatePhoneNumber = () => {
    setOpenModalFormPhoneNumber(true);
  };
  const handleClickShowPoint = () => {
    setOpenDrawerPoint(true);
  };
  return (
    <>
      <DefaultLayoutPage>
        <section className="p-4 bg-white">
          <h1 className="lg:ml-10 xl:ml-20 pl-6 xl:pl-8 xl:mb-12 border-l-8 border-primary-color uppercase text-primary-color font-semibold text:xl lg:text-3xl xl:text-4xl mb-4">
            Thông tin cá nhân
          </h1>
          <div className="py-8">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-[30%] flex flex-col items-center h-[350px] lg:h-[600px] gap-9 pb-8 md:pb-0 border-b-2 border-primary-color md:border-r-2 md:border-b-0">
                <Avatar
                  size={{
                    xs: 150,
                    sm: 150,
                    md: 150,
                    lg: 150,
                    xl: 170,
                    xxl: 200,
                  }}
                  icon={<UserOutlined />}
                  src={
                    <img src={dataStudentLocal?.avatar} alt="avatar_student" />
                  }
                />
                <Space direction="vertical" size={20}>
                  <Upload {...props}>
                    <ButtonCustom
                      loading={loadingBtnUpload}
                      title="Đổi ảnh đại diện"
                      icon={<FileImageOutlined />}
                    />
                  </Upload>
                  <ButtonCustom
                    title="Cập nhật số điện thoại"
                    icon={<PhoneOutlined />}
                    handleClick={handleClickUpdatePhoneNumber}
                  />
                  <ButtonCustom
                    handleClick={handleClickShowPoint}
                    title={"Điểm học tập"}
                    icon={<AreaChartOutlined />}
                  />
                </Space>
              </div>
              <div className="w-[70%] flex justify-center lg:px-16">
                <FormInfoUser />
              </div>
            </div>
          </div>
        </section>
        <ModalEditPhoneNumber
          open={openModalFormPhoneNumber}
          onOpenChange={handleOpenChange}
        />
      </DefaultLayoutPage>
      <Drawer
        extra={<h1 className="text-black font-medium text-xl">Điểm học tập</h1>}
        width={1400}
        open={openDrawerPoint}
        onClose={() => setOpenDrawerPoint(false)}
        placement="left"
      >
        {data && (
          <>
            <div className="flex gap-20 w-[70vw] mb-20">
              <div className="flex-1">
                <figure>
                  <ChartColumnBasic data={data.data.avgPoint4List} />
                </figure>
                <figcaption className="text-center italic mt-4">
                  Điểm học tập hệ 4
                </figcaption>
              </div>
              <div className="flex-1">
                <figure>
                  <ChartColumnBasic data={data.data.avgPoint10List} />
                </figure>
                <figcaption className="text-center italic mt-4">
                  Điểm học tập hệ 10
                </figcaption>
              </div>
            </div>
            <div className="flex gap-20 w-[70vw]">
              <div className="flex-1">
                <figure>
                  <ChartColumnBasic data={data.data.trainingPointList} />
                </figure>
                <figcaption className="text-center italic mt-4">
                  Điểm rèn luyện
                </figcaption>
              </div>
              <div className="flex-1">
                <figure>
                  <ChartLiquid data={data.data} />
                </figure>
                <figcaption className="text-center italic">
                  Số tín chỉ tích lũy
                </figcaption>
              </div>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}

export default PersonalInfoUser;
