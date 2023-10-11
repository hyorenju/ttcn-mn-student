import { FormOutlined, MailOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useState } from "react";
import contact from "../../../../../assets/img/contact.png";

export function Contact(props) {
  const { TextArea } = Input;
  const [emailValue, setEmailValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const onChangeTextArea = (e) => {
    setTextAreaValue(e.target.value);
  };
  const onChangeInputEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const onChangeInputTitle = (e) => {
    setTitleValue(e.target.value);
  };

  return (
    <>
      <section className={`relative w-full `}>
        <img
          src={contact}
          alt="contact"
          className="absolute w-full h-full object-cover brightness-75"
        />
        <div className="w-full p-4 md:p-6 lg:p-10 xl:p-20 flex items-center justify-center">
          <div className="hidden md:block lg:flex-1"></div>
          <div className="flex-1 z-50">
            <h1 className="text-xl md:text:3xl xl:text-4xl text-center lg:text-left max-w-[650px] text-white uppercase font-bold">
              Nơi tiếp nhận phản hồi
            </h1>
            <p className="max-w-[650px] text-white mb-5 text-sm lg:text-xl xl:text-2xl mt-2 md:mt-3 lg:mt-4">
              Có điều gì thắc mắc hay đóng góp ý kiến cá nhân hãy gửi cho chúng
              tôi bạn sẽ nhận được giải đáp sớm nhất. Xin cảm ơn !
            </p>
            <div className="flex-col xl:flex-row flex gap-3">
              <div className="flex gap-2 md:gap-3 lg:gap-4 xl:gap-5 flex-col flex-1">
                <Input
                  prefix={<MailOutlined className="mr-2 text-primary-color" />}
                  placeholder="Email của bạn"
                  value={emailValue}
                  onChange={onChangeInputEmail}
                  className="w-full md:h-12"
                />
                <Input
                  prefix={<FormOutlined className="mr-2 text-primary-color" />}
                  placeholder="Tiêu đề"
                  value={titleValue}
                  onChange={onChangeInputTitle}
                  className="w-full md:h-12"
                />
                <TextArea
                  value={textAreaValue}
                  maxLength={300}
                  className="w-full"
                  style={{
                    height: 150,
                  }}
                  onChange={onChangeTextArea}
                  placeholder="Nội dung"
                />
              </div>
              <button className="flex-3 px-6 py-4 bg-primary-color rounded-xl text-white hover:scale-105 active:scale-110 ease-in-out duration-300 max-h-[55px]">
                Gửi đến chúng tôi
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
