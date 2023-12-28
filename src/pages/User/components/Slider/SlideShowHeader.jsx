import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
export function SlideShowHeader({ listImg }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          dynamicBullets: true,
        }}
        grabCursor={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className='w-full h-[40vh] lg:h-[60vh] xl:h-[70vh]'
      >
        {listImg?.map((item) => (
          <SwiperSlide key={item.url} className='flex items-center justify-center'>
            <img src={item.url} alt='img' className='w-full h-full object-cover block' loading='lazy' />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
