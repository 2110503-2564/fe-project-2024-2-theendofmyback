"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PromotionCard from "@/components/PromotionCard";
import FlashSellCard from "./flashsale";
import Link from "next/link";
import SeeYoursButton from "@/components/seeYours";

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

export default function Promotion() {
    return (
        <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-gradient-to-t from-teal-100 to-tea-200">
            <Link href="/promotion/manage">
        <div className="absolute top-4 right-4 flex justify-center">
          <SeeYoursButton name="My Promotion" />
        </div>
      </Link>
            <div className="w-full px-10 my-10">
                {/* Header */}
                <h2 className="text-3xl text-center bg-gradient-to-r from-emerald-400 to-emerald-600 text-white w-fit mx-auto px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
                    🎉 <span className="drop-shadow-md">Promotion</span> 🎉
                </h2>
                
                {/* Card Container */}
                <div className="flex flex-wrap gap-8 justify-center mt-6">
                    {mockPromotions.map((promotion) => (
                        <div
                            key={promotion._id}
                            className="w-full sm:w-[80%] md:w-1/4 lg:w-1/3 flex justify-center p-6"
                        >
                            <div className=" bg-white shadow-lg rounded-xl border border-gray-200  transition-all duration-300 hover:scale-105 hover:shadow-xl 
              flex flex-col items-center justify-center  w-80% h-full">
                                <PromotionCard mockPromotions={promotion} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full bg-white p-8 shadow-xl rounded-3xl mt-12">
                    <div className="text-center text-2xl font-bold text-lime-400 mt-2">
                        Limited Time Offer
                    </div>
                    <div className="mt-3">
                        <FlashSellCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
