import React, { useRef, useState } from "react";
import "./Home.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Home() {
  return (
    <>
      <div className="hm-container">
        <div className="sub-container">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide><img src="" alt="slider image" /></SwiperSlide>
            <SwiperSlide><img src="" alt="slider image" /></SwiperSlide>
            <SwiperSlide><img src="" alt="slider image" /></SwiperSlide>
            <SwiperSlide><img src="" alt="slider image" /></SwiperSlide>
            <SwiperSlide><img src="" alt="slider image" /></SwiperSlide>
            <SwiperSlide><img src="" alt="slider image" /></SwiperSlide>
            
          </Swiper>
        </div>
      </div>
    </>
  );
}
