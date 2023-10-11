import {
  EnvironmentFilled,
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import GoogleMapReact from "google-map-react";
import React from "react";
import { PagePlugin } from "../../../../../components/PluginFacebook";

export function Footer(props) {
  return (
    <div>
      <footer className="flex w-full flex-col gap-6 md:flex-row justify-between p-4 md:p-6 lg:px-14 lg:py-8 border-b bg-[#005B30] text-white ">
        <div className="text-white">
          <h2 className="uppercase text-xl lg:text-2xl leading-tight mb-4">
            KHOA CÔNG NGHỆ THÔNG TIN - HỌC VIỆN NÔNG NGHIỆP VIỆT NAM
          </h2>
          <p className="mb-3 text-sm lg:text-xl">
            Địa chỉ: Văn phòng Khoa: P316, Tầng 3 Nhà Hành chính, Học viện Nông
            nghiệp Việt Nam
          </p>
          <p className="mb-3 text-sm lg:text-xl">
            Điện thoại: (024) 62617701 – Fax: (024) 38276554
          </p>
          <p className="mb-3 text-sm lg:text-xl">
            Email: cntt@vnua.edu.vn - Website: https://fita.vnua.edu.vn
          </p>
          <div className="flex gap-2 md:gap-3 text-white text-3xl lg:text-4xl">
            <FacebookOutlined className="hover:cursor-pointer hover:scale-105 active:scale-110 ease-in-out duration-200" />
            <TwitterOutlined className="hover:cursor-pointer hover:scale-105 active:scale-110 ease-in-out duration-200" />
            <LinkedinOutlined className="hover:cursor-pointer hover:scale-105 active:scale-110 ease-in-out duration-200" />
          </div>
        </div>
        <div>
          <PagePlugin />
        </div>
        <div className="w-[20.5rem] md:w-[23rem] h-[200px]">
          <GoogleMap />
        </div>
      </footer>
      <div className="flex bg-[#005B30] py-1">
        <p className="text-[12px] lg:text-sm mx-auto text-white opacity-60">
          Copyright © 2023 - All right reserved by ACME Industries Ltd
        </p>
      </div>
    </div>
  );
}

export const GoogleMap = () => {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const defaultProps = {
    center: {
      lat: 21.005153439531473,
      lng: 105.93163555024535,
    },
    // center: {
    //   lat: 10.99835602,
    //   lng: 77.01502627,
    // },
    zoom: 11,
  };
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBOJg4VGc2LHL8eZWmk_b41TZc47eU2sUU" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          // lat={59.955413}
          // lng={30.337844}
          lat={21.005153439531473}
          lng={105.93163555024535}
          text=<EnvironmentFilled className="text-red-600 text-2xl" />
        />
      </GoogleMapReact>
    </>
  );
};
