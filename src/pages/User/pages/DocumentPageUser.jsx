import { PlusOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ButtonCustom } from "../../../components/Button";
import { setOpenModal } from "../../../redux/Modal/modalLoginSlice";
import { CardDocs } from "../components/Card";
import { DefaultLayoutPage } from "../components/Layout/DefaultLayoutPage";
import { ModalFormDocs } from "../components/ModalForm";

function DocumentPageUser(props) {
  const dispatch = useDispatch();
  const token = Cookies.get("access_token");
  const [openModalForm, setOpenModalForm] = useState(false);
  const data = [
    {
      id: 1,
      title: "Bai 1 Word_formation_and_ Tiếng Anh chuyên ngành",
      des: "Môn Tiếng Anh",
      urlImg:
        "https://images.unsplash.com/photo-1691666350421-dbc697e4c6ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      uni: "Học viện Nông Nghiệp Việt Nam",
      author: "Tác giả",
      date: "Thời gian đăng tải",
    },
    {
      id: 2,
      title: "Bai 1 Word_formation_and_ Tiếng Anh chuyên ngành",
      des: "Môn Tiếng Anh",
      urlImg:
        "https://images.unsplash.com/photo-1691666350421-dbc697e4c6ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      uni: "Học viện Nông Nghiệp Việt Nam",
      author: "Tác giả",
      date: "Thời gian đăng tải",
    },
  ];
  const handleSubmitDosc = () => {
    if (token) {
    } else {
      dispatch(setOpenModal(true));
    }
  };
  return (
    <div>
      <DefaultLayoutPage>
        <div className="bg-white p-3 md:px-12 md:py-8 lg:px-20 lg:py-14 xl:px-40 xl:py-20 ">
          <div className="flex justify-between">
            <h2 className="pl-6 md:pl-8 xl:mb-6 border-l-8 border-primary-color uppercase text-primary-color font-semibold text:xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">
              Tài liệu học tập
            </h2>
            <ButtonCustom
              handleClick={() => setOpenModalForm(true)}
              title="Đăng tải tài liệu"
              icon={<PlusOutlined />}
              className="flex justify-center items-center"
            />
          </div>
          <div className="flex flex-col gap-7">
            {data.map((item) => (
              <CardDocs key={item.id} data={item} />
            ))}
          </div>
          <div className="mt-12">
            <Pagination
              total={85}
              size="large"
              defaultPageSize={20}
              defaultCurrent={1}
              responsive
            />
          </div>
        </div>
      </DefaultLayoutPage>
      <ModalFormDocs
        onFinish={handleSubmitDosc}
        title={"Đăng tải tài liệu của bạn"}
        maskClosable={false}
        destroyOnClose={false}
        textSubmit="Đăng tải"
        open={openModalForm}
        onOpenChange={(open) => {
          if (!open) {
            setOpenModalForm(false);
          }
        }}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ratione
          culpa unde repudiandae iure perspiciatis nam, fugiat maiores nihil
          obcaecati aut, rerum, mollitia suscipit beatae nemo? Sint ipsam quo
          ex?
        </p>
      </ModalFormDocs>
    </div>
  );
}

export default DocumentPageUser;
