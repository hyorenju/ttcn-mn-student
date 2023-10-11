import {
  BankFilled,
  CalendarOutlined,
  DownloadOutlined,
  EyeOutlined,
  FolderFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useState } from "react";
import { ButtonCustom } from "../../../../components/Button";
import { ModalShowPreview } from "../Modal";
export function CardDocs({ data }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="p-2 md:p-4 xl:flex xl:justify-center xl:items-center">
      <div className="flex gap-4 md:gap-6 w-full">
        <figure className="w-[12rem] h-[10rem] md:w-[15rem] md:h-[12rem] rounded-lg bg-slate-100">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={data.urlImg}
            alt="img"
          />
        </figure>
        <div className="flex flex-col gap-2 md:gap-3 lg:gap-5">
          <h2 className="text-wrap primary-font md:text-xl lg:text-3xl line-clamp-1 lg:line-clamp-2 font-medium">
            {data.title}
          </h2>
          <div className="flex flex-col lg:flex-row lg:gap-8 lg:text-lg lg:items-center">
            <div className="flex gap-2 items-center">
              <FolderFilled />
              <p>{data.des}</p>
            </div>
            <div className="flex gap-2 items-center">
              <BankFilled />
              <p>{data.uni}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:items-center gap-4 lg:gap-8 lg:text-lg">
            <div className="flex gap-2 items-center">
              <Avatar
                className="flex items-center justify-center"
                shape="circle"
                size={30}
                icon={<UserOutlined />}
              />
              <p>{data.author}</p>
            </div>
            <div className="flex gap-2 items-center">
              <CalendarOutlined />
              <p>{data.date}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <ButtonCustom
              className="flex justify-center items-center"
              title="Xem trước"
              handleClick={() => setOpenModal(true)}
              icon={<EyeOutlined />}
            />
            <ButtonCustom
              className="flex justify-center items-center"
              title="Tải xuống"
              icon={<DownloadOutlined />}
            />
          </div>
        </div>
      </div>
      <ModalShowPreview
        title={data.title}
        open={openModal}
        setOpen={setOpenModal}
        okText="Tải xuống"
        handleClickOk={() => {}}
        maskClosable={false}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore earum
          nulla nesciunt vel quas tempora ratione provident, repellendus totam
          enim molestiae corporis saepe quidem dolores illo qui nobis,
          perferendis suscipit.
        </p>
      </ModalShowPreview>
    </div>
  );
}
