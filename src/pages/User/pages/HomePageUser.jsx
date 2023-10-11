import { Image } from "antd";
import React from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Rectangle from "../../../assets/img/Rectangle.png";
import sodophonghoc from "../../../assets/img/sodophonghoc.png";
import "../../../assets/styles/swiperCard.css";
import { DefaultLayoutPage } from "../components/Layout/DefaultLayoutPage";
import { SlideShowHeader } from "../components/Slider";

export const urlImage = [
  {
    url: "https://scontent.fhan14-4.fna.fbcdn.net/v/t1.6435-9/131347998_3428657813868913_1006378787087488705_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=qlvAFM5gzdMAX_3EIjF&_nc_ht=scontent.fhan14-4.fna&oh=00_AfDqRGpOMtCSkEji6CVniv5xkFXIgtig-N_gBm94Pcza5g&oe=65477FE9",
  },
  {
    url: "https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/131136764_3428658380535523_510642696984158301_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=7q45Zl1YNGgAX-JUC69&_nc_ht=scontent.fhan14-1.fna&oh=00_AfBVLpLGYEgT1i3giyXagSu2O-wX4fILgR0IIyOfx3t1MQ&oe=65476E2C",
  },
  {
    url: "https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/130937425_3428658040535557_909591053144213835_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=0ObHUvCJgOkAX8Yzq31&_nc_ht=scontent.fhan14-1.fna&oh=00_AfAUluWz_iVEA0fXhnghvXMbGF9WN2CiWVc0_YuFuJdNbg&oe=65479E6A",
  },
  {
    url: "https://scontent.fhan14-2.fna.fbcdn.net/v/t1.6435-9/130869122_3428657637202264_6325668044581649991_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=psYQyvdw8bEAX-1KV1e&_nc_ht=scontent.fhan14-2.fna&oh=00_AfDk2UTHNj3hmTHsmQL5b4jt_g_Og_xng-V2IIpNe5DNUA&oe=65477B30",
  },
  {
    url: "https://scontent.fhan14-4.fna.fbcdn.net/v/t1.6435-9/131096310_3428657650535596_1023497078651759515_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=qztcU7LKtvMAX_b7uN_&_nc_ht=scontent.fhan14-4.fna&oh=00_AfC-AyiES45WuyK9jDuYzdKsbgj1GfZHUhVC4Jeh3o0VMg&oe=65479345",
  },
  {
    url: "https://scontent.fhan14-2.fna.fbcdn.net/v/t1.6435-9/131309743_3428657920535569_884575675311236315_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=5u0MSXaCddQAX_BPOdM&_nc_ht=scontent.fhan14-2.fna&oh=00_AfDNeliWb1sFEP6PNI_YoWjrGo3Bbl3VrxDU7NQXMBYLOw&oe=65476A0B",
  },
  {
    url: "https://scontent.fhan14-4.fna.fbcdn.net/v/t1.6435-9/131101199_3428658837202144_3645628304395689718_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=atRiY2EfVAQAX8m8D2_&_nc_oc=AQnYxNMZaKyiqNVGC46p-K53D8a11MH3IF5KcZL5oFoG8TBypVgMMhjhUmkzPhCRwgE&_nc_ht=scontent.fhan14-4.fna&oh=00_AfD0upTlOBiwdVAArvqMAHx7YSmNP-S_KFcud0Wc2iCtJQ&oe=65478B72",
  },
  {
    url: "https://scontent.fhan14-4.fna.fbcdn.net/v/t1.6435-9/131380209_3428658693868825_1984893662992132057_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=WJ1ovxgTT0sAX9cqppY&_nc_ht=scontent.fhan14-4.fna&oh=00_AfAQIuXSlAnKhJz58yMKgyQLtgTIDlpLCmapbKtfgZfFEg&oe=65477433",
  },
  {
    url: "https://scontent.fhan14-2.fna.fbcdn.net/v/t1.6435-9/131474642_3428658627202165_177982761341398460_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=y3C2tb9zNuAAX8j9riq&_nc_ht=scontent.fhan14-2.fna&oh=00_AfDwd60LMUD4vvNh7g7N6t2jxvldbuW4ehrnB98nV__2XA&oe=654784DB",
  },
  {
    url: "https://scontent.fhan14-2.fna.fbcdn.net/v/t1.6435-9/130581824_3428658103868884_1659542715058452538_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=sOi48IAFsdoAX9A_Uid&_nc_ht=scontent.fhan14-2.fna&oh=00_AfBLjhCiE8iHqZljJ9_0Hrtx9yjrf86CLXH8WNRv4ncyGw&oe=65476E79",
  },
  {
    url: "https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/131136764_3428658380535523_510642696984158301_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=7q45Zl1YNGgAX-JUC69&_nc_ht=scontent.fhan14-1.fna&oh=00_AfBVLpLGYEgT1i3giyXagSu2O-wX4fILgR0IIyOfx3t1MQ&oe=65476E2C",
  },
];

// Lịch sử phát triển
export const SelectionHistory = ({ listImg }) => {
  return (
    <section className="p-4 md:p-8 lg:p-8 xl:p-16 flex flex-col md:flex-row gap-10 bg-white items-center overflow-hidden">
      <div className="text-primary-color flex-1">
        <h2 className="text-center md:text-left text-xl lg:text-2xl xl:text-3xl leading-normal font-bold mb-2">
          Lịch sử phát triển
        </h2>
        <p className="text-sm xl:text-xl leading-normal font-normal break-words">
          Khoa Công nghệ thông tin mới được thành lập từ 10/10/2005 theo QĐ số
          839/QĐ – NNI của Hiệu trưởng, gồm 5 Bộ môn với 70 CBCNV và gần 600
          sinh viên. Tuy vậy, Chương trình đào tạo đại học ngành Tin học đã được
          triển khai từ 25/1/2002 theo QĐ số 439/ QĐ/BGD&ĐT-ĐH của Bộ trưởng Bộ
          giáo dục và Đào tạo nhằm đáp ứng yêu cầu đào tạo nhân lực CNTT cho
          công cuộc Công nghiệp hóa, hiện đại hóa đất nước nói chung và cho lĩnh
          vực Hiện đại hóa Nông nghiệp nói riêng. Khoa hiện nay bao gồm 5 bộ môn
          (Công nghệ phần mềm, Khoa học máy tính, Toán, Toán-Tin ứng dụng, Vật
          lý), trong đó có một số bộ môn của Khoa đã có bề dày truyền thống như
          các Bộ môn Toán và Vật lý được thành lập từ ngày thành lập trường, và
          bộ môn CNPM và KHMT được phát triển từ Trung tâm Tin học thành lập từ
          đầu những năm 1980.
        </p>
      </div>
      <div className="flex-1">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="w-[240px] h-[170px] sm:w-[400px] sm:h-[300px] md:w-[300px] md:h-[330px] lg:w-[350px] lg:h-[275px] xl:w-[530px] xl:h-[400px] overflow-hidden"
        >
          {listImg.map((item) => (
            <SwiperSlide key={item.url}>
              <img
                className="w-full h-full object-cover"
                src={item.url}
                alt="thumail"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
// Cơ sở vật chất
export const SelectionInfrastructure = () => {
  return (
    <section className="flex flex-col-reverse p-4 xl:p-16 md:flex-row gap-4 md:gap-6 lg:gap-8 xl:gap-10 bg-white items-center">
      <div className="p-4 md:p-8 lg:p-12 xl:p-16 flex-1">
        <Image src={sodophonghoc} alt="Sơ đồ phòng học" />
      </div>
      <div className="flex-1 text-primary-color">
        <h2 className="text-center text-xl md:text-left lg:text-xl xl:text-3xl leading-normal mb-2 font-bold">
          Cơ sở vật chất
        </h2>
        <p className="text-sm xl:text-xl leading-normal font-normal break-words">
          Hệ thống giảng đường trung tâm của Học viện Nông nghiệp Việt Nam đều
          được trang bị máy chiếu projector. Hệ thống phòng thực hành máy tính
          của khoa CNTT gồm có 05 phòng được trang bị thiết bị máy tính hiện
          đại, màn hình cỡ lớn hoặc projector, kết nối mạng Internet thông qua
          hệ thống mạng nội bộ của trường để đáp ứng nhu cầu học tập của sinh
          viên trong toàn trường.
        </p>
      </div>
    </section>
  );
};
// Nghiên cứu khoa học
export const SelectionStudy = () => {
  return (
    <div className="p-4 xl:py-16 xl:px-32 bg-white overflow-hidden">
      <h2 className="text-xl text-center text-primary-color xl:text-5xl font-semibold mb-6 xl:mb-12">
        Các công trình nghiên cứu khoa học
      </h2>
      <p className="text-sm mb-3 text-primary-color xl:text-xl leading-normal">
        Các công trình NCKH trong lĩnh vực CNTT và CNTT ứng dụng cũng đã được
        thực hiện ngay từ những thời kỳ đầu tiên. Trong giai đoạn 1999-2005, các
        thầy cô cùng các em sinh viên trong Khoa đã thực hiện nhiều đề tài NCKH
        có tính ứng dụng cao, đóng góp vào sự nghiệp NCKH của nhà trường. Khoa
        đã xây dựng và ứng dụng thành công nhiều phần mềm trong nhiều lĩnh vực
        của nông nghiệp như quy hoạch sử dụng đất, GIS, viễn thám, sinh học,
        kinh tế, quản lý giáo dục.
      </p>
      <p className="text-sm mb-3 text-primary-color xl:text-xl leading-normal">
        Trong giai đoạn 2006-2010, bên cạnh việc nâng cao chất lượng đào tạo
        nhân lực CNTT cho đất nước, Khoa CNTT đã xây dựng được định hướng NCKH
        của mình: Chú trọng các lĩnh vực Tin Sinh học, ứng dụng công nghệ GIS,
        viễn thám và mô hình mô phỏng trong quản lý và quy hoạch tài nguyên,
        thiết kế các phần mềm xử lý thống kê, tối ưu hóa và các công cụ phát
        triển kiểm thử phần mềm, phát triển các cổng thông tin điện tử phục vụ
        đào tạo và dịch vụ, xây dựng các hệ thống thông tin, các hệ cơ sở dữ
        liệu chuẩn và hệ hỗ trợ ra quyết định, các ứng dụng của Toán, Tin học và
        Vật lý trong sinh học và nông nghiệp và quản lý thông tin, phát triển và
        ứng dụng các phương pháp tính toán khoa học.
      </p>
      <p className="text-sm mb-3 text-primary-color xl:text-xl leading-normal">
        Trong giai đoạn 2010-2019, các thầy cô cùng các em sinh viên trong Khoa
        đã thực hiện nhiều đề tài NCKH có tính ứng dụng cao, đóng góp vào sự
        nghiệp NCKH của nhà trường. Khoa đã xây dựng và ứng dụng thành công
        nhiều phần mềm trong nhiều lĩnh vực của nông nghiệp như quy hoạch sử
        dụng đất, GIS, viễn thám, sinh học, kinh tế, quản lý giáo dục.
      </p>
      <p className="text-sm mb-3 text-primary-color xl:text-xl leading-normal">
        Trong giai đoạn tiếp theo, bên cạnh việc nâng cao chất lượng đào tạo
        nhân lực CNTT cho đất nước, Khoa CNTT đã xây dựng được định hướng NCKH
        của mình: Chú trọng các lĩnh vực Tin Sinh học, Xử lý ảnh, Trí tuệ nhân
        tạo, ứng dụng công nghệ GIS, viễn thám và mô hình mô phỏng trong quản lý
        và quy hoạch tài nguyên, thiết kế các phần mềm xử lý thống kê, tối ưu
        hóa và các công cụ phát triển kiểm thử phần mềm, phát triển các cổng
        thông tin điện tử phục vụ đào tạo và dịch vụ, xây dựng các hệ thống
        thông tin, các hệ cơ sở dữ liệu chuẩn và hệ hỗ trợ ra quyết định, các
        ứng dụng của Toán, Tin học và Vật lý trong sinh học và nông nghiệp và
        quản lý thông tin, phát triển và ứng dụng các phương pháp tính toán khoa
        học.
      </p>
      <p className="text-sm mb-3 text-primary-color xl:text-xl leading-normal">
        Từ năm 2018, Khoa thành lập nhóm Nghiên cứu mạnh “Ứng dụng Công nghệ
        thông tin trong nông nghiệp” và đã đạt những thành tựu bước đầu, góp
        phần thúc đẩy tinh thần NCKH của các thành viên trong nhóm, tạo ra nhiều
        sản phẩm ứng dụng trong lĩnh vực Nông nghiệp.
      </p>
    </div>
  );
};
// Ảnh gần footer :))
const ThumnailHomePageUser = () => {
  return (
    <div className="w-full h-[80px] sm:h-[90px] md:h-[100px] lg:h-[150px] xl:h-[200px]">
      <img
        className="w-full h-full object-cover"
        src={Rectangle}
        alt="selection"
      />
    </div>
  );
};
export const TargetOf = () => {
  return (
    <div className="p-4 xl:p-16 xl:flex-row flex-col flex gap-16 bg-slate-100 w-full">
      <div className="bg-[#00c04d] flex gap-4 items-center rounded-full flex-1">
        <div className="w-[8rem] h-[8rem] xl:w-[15rem] xl:h-[15rem]">
          <img
            className="w-full h-full object-cover rounded-full border-8"
            src="https://media.istockphoto.com/id/926799886/vi/anh/h%C3%ACnh-b%C3%B3ng-c%E1%BB%A7a-ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-trong-v%C4%83n-ph%C3%B2ng-v%C3%A0-%C4%91%E1%BB%93-h%E1%BB%8Da-th%C3%B4ng-tin-c%E1%BB%A7a-c%C3%B4ng-ty.jpg?s=612x612&w=0&k=20&c=ZmmMoB_RbIjumEP6urHdxP4sA2gJTh8_Z3dcX8CKUUs="
            alt="img"
          />
        </div>
        <div className="w-[55%]">
          <h2 className="lg:text-2xl text-white capitalize font-medium mb-2">
            Tầm nhìn
          </h2>
          <p className="text-sm md:text-base text-white line-clamp-2 md:line-clamp-3 xl:line-clamp-4">
            Phấn đấu trở thành một trung tâm đào tạo nhân lực công nghệ thông
            tin có uy tín cao trong nước. Phấn đấu trở thành một trung tâm
            nghiên cứu ứng dụng và phát triển công nghệ thông tin, đặc biệt
            trong lĩnh vực nông nghiệp và quản lý tài nguyên.
          </p>
        </div>
      </div>
      <div className="bg-primary-color flex gap-4 items-center rounded-full flex-1 justify-end">
        <div className="w-[55%] lg:pl-4 xl:pl-0">
          <h2 className="lg:text-2xl text-white capitalize font-medium mb-2">
            Sứ mệnh
          </h2>
          <p className="text-sm md:text-base text-white line-clamp-2 md:line-clamp-3 xl:line-clamp-4">
            Là đơn vị có vai trò quan trọng của Học viện Nông nghiệp Việt Nam,
            đảm bảo đạt chất lượng cao trong đào tạo, khoa học công nghệ làm tốt
            vai trò tư vấn và cung cấp các giải pháp công nghệ thông tin.
          </p>
        </div>
        <div className="w-[8rem] h-[8rem] xl:w-[15rem] xl:h-[15rem]">
          <img
            className="w-full h-full object-cover rounded-full border-8"
            src="https://media.istockphoto.com/id/926799886/vi/anh/h%C3%ACnh-b%C3%B3ng-c%E1%BB%A7a-ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-trong-v%C4%83n-ph%C3%B2ng-v%C3%A0-%C4%91%E1%BB%93-h%E1%BB%8Da-th%C3%B4ng-tin-c%E1%BB%A7a-c%C3%B4ng-ty.jpg?s=612x612&w=0&k=20&c=ZmmMoB_RbIjumEP6urHdxP4sA2gJTh8_Z3dcX8CKUUs="
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};
export default function HomePageUser(props) {
  return (
    <DefaultLayoutPage titleHeader="Khoa công nghệ thông tin">
      <SlideShowHeader listImg={urlImage} />
      <SelectionHistory listImg={urlImage} />
      <SelectionInfrastructure />
      <ThumnailHomePageUser />
      <SelectionStudy />
      <TargetOf />
    </DefaultLayoutPage>
  );
}
