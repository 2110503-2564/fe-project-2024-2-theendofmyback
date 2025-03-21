"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewCard from "./ReviewCard"; // Assuming ReviewCard is your review component

const mockReviews = [
  {
    _id: "1",
    title: "Great Experience!",
    text: "Loved the atmosphere and activities. Will definitely come back!",
    rating: 8,
    user: "John Doe",
    campground: "LaBaLaKe Camp",
    createdAt: "2025-02-25",
  },
  {
    _id: "2",
    title: "Nice Place",
    text: "The lake view is amazing!",
    rating: 10,
    user: "Alice Smith",
    campground: "LaBaLaKe Camp",
    createdAt: "2025-02-26",
  },
  {
    _id: "3",
    title: "Could be better",
    text: "It was good but too crowded.",
    rating: 6,
    user: "Michael Johnson",
    campground: "LaBaLaKe Camp",
    createdAt: "2025-02-27",
  },
  {
    _id: "4",
    title: "Fantastic!",
    text: "Great food, friendly staff.",
    rating: 10,
    user: "Sarah Lee",
    campground: "LaBaLaKe Camp",
    createdAt: "2025-02-28",
  },
];

export default function ReviewSlider() {
  return (
    <div className="w-full px-10 my-10">
        <h2 className="text-[25px] mx-5 bg-lime-100  w-fit px-5 py-2 rounded-3xl"> Reviews </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={5}
        slidesPerView={3}
        navigation 
        pagination={{ clickable: true }}
        className="py-5"
      >
        {mockReviews.map((review) => (
          <SwiperSlide key={review._id}>
            <ReviewCard mockReviews={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
