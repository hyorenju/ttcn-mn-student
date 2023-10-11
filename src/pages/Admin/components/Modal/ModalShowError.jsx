import { Image, Modal } from 'antd';
import React from 'react';
export const ModalShowError = ({ open, setOpen, dataError }) => {
  const handleClickOk = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        width={750}
        maskClosable={false}
        title={<h1 className='text-red-500 text-lg italic font-semibold'>{dataError?.title}</h1>}
        open={open}
        onOk={handleClickOk}
        okText='Đã hiểu'
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <p className='text-red-500 italic font-semibold mb-4'>{dataError?.content}</p>
        <Image src={dataError?.img} alt='' className='w-full h-full object-cover' />
      </Modal>
    </>
  );
};
