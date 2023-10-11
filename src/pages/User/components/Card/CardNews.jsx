import { CalendarOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { ButtonCustom } from "../../../../components/Button";

export function CardNews({ data }) {
  return (
    <div className="p-3 border bg-[#f3f5f7] hover:bg-white rounded-2xl hover:border hover:border-primary-color hover:drop-shadow-2xl active:scale-95 overflow-hidden hover:cursor-pointer ease-in-out duration-200">
      <div className="md:p-4 flex flex-row xl:flex-col gap-4 sm:gap-6">
        <figure className="flex-1 xl:h-56">
          <img
            loading="lazy"
            className="w-full h-full object-cover rounded-md"
            src={data.img}
            alt="news"
          />
        </figure>
        <div className="flex flex-col gap-1 md:gap-2 flex-1">
          <h2 className="text-base md:text-lg xl:text-2xl text-black line-clamp-2 leading-normal font-medium ">
            {data.title}
          </h2>
          <p className="text-sm xl:text-base line-clamp-3 xl:line-clamp-4 text-primary-color leading-normal">
            {data.describe}
          </p>
          <div className="flex-col flex gap-3 xl:items-center xl:flex-row xl:justify-between">
            <Space size={10}>
              <CalendarOutlined className="text-sm xl:text-lg text-primary-color" />
              <p className="text-[12px] xl:text-sm italic">{data.date}</p>
            </Space>
            <ButtonCustom title="Xem chi tiết" type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
