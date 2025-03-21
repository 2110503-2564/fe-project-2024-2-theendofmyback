"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PromotionCard from "./PromotionCard";

const mockPromotions = [
    {
      _id: "67bd907379db2d1502b32995",
      name: "Discount 200",
      campground: "67bd6dfcd3e3272696f5243d",
      description: "Get 200 off on your next booking!",
      discount: 200,
    },
    {
      _id: "67bd908479db2d1502b32996",
      name: "Weekend Special",
      campground: "67bd6dfcd3e3272696f5243e",
      description: "Enjoy a 15% discount on weekend stays!",
      discount: 15, // 15% discount
    },
    {
      _id: "67bd909579db2d1502b32997",
      name: "New Year Offer",
      campground: "67bd6dfcd3e3272696f5243f",
      description: "Save 500 when booking for the New Year celebration!",
      discount: 500,
    },
    {
      _id: "67bd90a679db2d1502b32998",
      name: "Early Bird Deal",
      campground: "67bd6dfcd3e3272696f52440",
      description: "Book 2 weeks in advance and get 10% off!",
      discount: 10, // 10% discount
    },
  ];
  

export default function PromotionSlider() {
  return (
    <div className="w-full px-10 my-10">
        <h2 className="text-[25px] mx-5 bg-emerald-100  w-fit px-5 py-2 rounded-3xl"> Promotion  </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={5}
        slidesPerView={3}
        navigation 
        pagination={{ clickable: true }}
        className="py-5"
      >
        {mockPromotions.map((promotion) => (
          <SwiperSlide key={promotion._id}>
            <PromotionCard mockPromotions={promotion}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
