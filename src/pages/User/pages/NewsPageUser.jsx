import { Pagination } from "antd";
import React from "react";
import { CardNews } from "../components/Card";
import { DefaultLayoutPage } from "../components/Layout/DefaultLayoutPage";
import { SlideShowHeader } from "../components/Slider/SlideShowHeader";
import { urlImage } from "./HomePageUser";

export const listNews = [
  {
    id: 1,
    title:
      "Công đoàn khoa Công nghệ Thông tin tổ chức chuyến nghỉ mát hè 2023 và thăm Quê Bác",
    describe:
      "Nằm trong chuỗi các hoạt động chăm lo đời sống tinh thần cho CBVC và NLĐ khoa Công nghệ Thông tin, được sự nhất trí của Ban chủ nhiệm khoa, BCH Công đoàn Khoa đã tổ chức chuyến nghỉ mát hè 3 ngày 2 đêm (Từ 19/07/2023 đến 21/07/2023) tại Bãi biển Cửa Lò, Nghệ An với sự tham gia đông đảo của CBVC trong khoa và gia...",
    img: "https://fita.vnua.edu.vn/wp-content/uploads/2023/07/Untitled-500x267.jpg",
    date: "Posted on Jul 26, 2023",
  },
  {
    id: 2,
    title:
      "Công đoàn khoa Công nghệ Thông tin tổ chức chuyến nghỉ mát hè 2023 và thăm Quê Bác",
    describe:
      "Nằm trong chuỗi các hoạt động chăm lo đời sống tinh thần cho CBVC và NLĐ khoa Công nghệ Thông tin, được sự nhất trí của Ban chủ nhiệm khoa, BCH Công đoàn Khoa đã tổ chức chuyến nghỉ mát hè 3 ngày 2 đêm (Từ 19/07/2023 đến 21/07/2023) tại Bãi biển Cửa Lò, Nghệ An với sự tham gia đông đảo của CBVC trong khoa và gia...",
    img: "https://fita.vnua.edu.vn/wp-content/uploads/2023/07/Untitled-500x267.jpg",
    date: "Posted on Jul 26, 2023",
  },
  {
    id: 3,
    title:
      "Công đoàn khoa Công nghệ Thông tin tổ chức chuyến nghỉ mát hè 2023 và thăm Quê Bác",
    describe:
      "Nằm trong chuỗi các hoạt động chăm lo đời sống tinh thần cho CBVC và NLĐ khoa Công nghệ Thông tin, được sự nhất trí của Ban chủ nhiệm khoa, BCH Công đoàn Khoa đã tổ chức chuyến nghỉ mát hè 3 ngày 2 đêm (Từ 19/07/2023 đến 21/07/2023) tại Bãi biển Cửa Lò, Nghệ An với sự tham gia đông đảo của CBVC trong khoa và gia...",
    img: "https://fita.vnua.edu.vn/wp-content/uploads/2023/07/Untitled-500x267.jpg",
    date: "Posted on Jul 26, 2023",
  },
  {
    id: 4,
    title:
      "Công đoàn khoa Công nghệ Thông tin tổ chức chuyến nghỉ mát hè 2023 và thăm Quê Bác",
    describe:
      "Nằm trong chuỗi các hoạt động chăm lo đời sống tinh thần cho CBVC và NLĐ khoa Công nghệ Thông tin, được sự nhất trí của Ban chủ nhiệm khoa, BCH Công đoàn Khoa đã tổ chức chuyến nghỉ mát hè 3 ngày 2 đêm (Từ 19/07/2023 đến 21/07/2023) tại Bãi biển Cửa Lò, Nghệ An với sự tham gia đông đảo của CBVC trong khoa và gia...",
    img: "https://fita.vnua.edu.vn/wp-content/uploads/2023/07/Untitled-500x267.jpg",
    date: "Posted on Jul 26, 2023",
  },
  {
    id: 5,
    title:
      "Công đoàn khoa Công nghệ Thông tin tổ chức chuyến nghỉ mát hè 2023 và thăm Quê Bác",
    describe:
      "Nằm trong chuỗi các hoạt động chăm lo đời sống tinh thần cho CBVC và NLĐ khoa Công nghệ Thông tin, được sự nhất trí của Ban chủ nhiệm khoa, BCH Công đoàn Khoa đã tổ chức chuyến nghỉ mát hè 3 ngày 2 đêm (Từ 19/07/2023 đến 21/07/2023) tại Bãi biển Cửa Lò, Nghệ An với sự tham gia đông đảo của CBVC trong khoa và gia...",
    img: "https://fita.vnua.edu.vn/wp-content/uploads/2023/07/Untitled-500x267.jpg",
    date: "Posted on Jul 26, 2023",
  },
  {
    id: 6,
    title:
      "Công đoàn khoa Công nghệ Thông tin tổ chức chuyến nghỉ mát hè 2023 và thăm Quê Bác",
    describe:
      "Nằm trong chuỗi các hoạt động chăm lo đời sống tinh thần cho CBVC và NLĐ khoa Công nghệ Thông tin, được sự nhất trí của Ban chủ nhiệm khoa, BCH Công đoàn Khoa đã tổ chức chuyến nghỉ mát hè 3 ngày 2 đêm (Từ 19/07/2023 đến 21/07/2023) tại Bãi biển Cửa Lò, Nghệ An với sự tham gia đông đảo của CBVC trong khoa và gia...",
    img: "https://fita.vnua.edu.vn/wp-content/uploads/2023/07/Untitled-500x267.jpg",
    date: "Posted on Jul 26, 2023",
  },
];
export const ListNewsAcademy = () => {
  return (
    <section className="bg-white py-4 md:py-8 lg:py-10 xl:py-12">
      <div className="p-4 w-full md:w-[90%] mx-auto">
        <h2 className="pl-6 md:pl-8 xl:mb-6 border-l-8 border-primary-color uppercase text-primay-color font-semibold text:xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">
          Tin tức học viện
        </h2>
        <section className="grid xl:gap-y-16 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-8 md:gap-10">
          {listNews.map((item) => (
            <CardNews key={item.id} data={item} />
          ))}
        </section>
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
    </section>
  );
};

export const ListNewsRecruitment = () => {
  return (
    <section className="bg-white py-4 md:py-8 lg:py-10 xl:py-12">
      <div className="p-4 w-full md:w-[90%] mx-auto">
        <h2 className="pl-6 md:pl-8 xl:mb-6 border-l-8 border-primary-color uppercase text-primary-color font-semibold text:xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">
          Tin tức sinh viên
        </h2>
        <section className="grid xl:gap-y-16 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-8 md:gap-10">
          {listNews.map((item) => (
            <CardNews key={item.id} data={item} />
          ))}
        </section>
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
    </section>
  );
};

export const ListNewsInternship = () => {
  return (
    <section className="bg-white py-4 md:py-8 lg:py-10 xl:py-12">
      <div className="p-4 w-full md:w-[90%] mx-auto">
        <h2 className="pl-6 md:pl-8 xl:mb-6 border-l-8 border-primary-color uppercase text-primary-color font-semibold text:xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">
          Tin tuyển dụng
        </h2>
        <section className="grid xl:gap-y-16 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-8 md:gap-10">
          {listNews.map((item) => (
            <CardNews key={item.id} data={item} />
          ))}
        </section>
        <div className="mt-12">
          <Pagination
            total={85}
            pageSizeOptions={[10, 20, 25]}
            defaultPageSize={10}
            defaultCurrent={1}
            responsive
          />
        </div>
      </div>
    </section>
  );
};
export default function NewsPageUser(props) {
  return (
    <div>
      <DefaultLayoutPage>
        <SlideShowHeader listImg={urlImage} />
        <ListNewsAcademy />
        <ListNewsRecruitment />
        <ListNewsInternship />
        {/* <SkeletonCardNews /> */}
      </DefaultLayoutPage>
    </div>
  );
}
