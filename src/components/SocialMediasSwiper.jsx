import React from "react";
import IG from "../assets/images/IG.png";
import TIKTOK from "../assets/images/TIKTOK.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";

const SocialMediasSwiper = () => {
  return (
    <div className="flex justify-center items-center w-full h-[125px] rounded-md">
      <Swiper
        modules={[Autoplay]}
        autoplay
        onAutoplayTimeLeft={2000}
        loop
        className="h-full"
      >
        <SwiperSlide className="h-full">
          <Link
            to=""
            className="flex flex-row-reverse justify-start items-center gap-2 w-full h-full bg-gradient-to-tr from-[#FFBE63] to-[#A742AA] rounded-md"
          >
            <img src={IG} className="w-32 h-32 object-scale-down" />
            <h3 className="text-2xl text-white font-bold">
              فۆلۆکردن لە ئێنستاگرام
            </h3>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Link
            to=""
            className="flex flex-row-reverse justify-start items-center gap-2 w-full h-full bg-gradient-to-tr from-[#E4004D] to-[#35BBBE] rounded-md"
          >
            <img src={TIKTOK} className="w-32 h-32 object-scale-down" />
            <h3 className="text-2xl text-white font-bold">
              فۆلۆکردن لە تیک تۆک
            </h3>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SocialMediasSwiper;
