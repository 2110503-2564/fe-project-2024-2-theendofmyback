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
import { useEffect, useState } from "react";
import getPromotions from "@/libs/promotions/getPromotions";
import Loader from "@/components/load";

export default function Promotion() {

    const [promotions, setPromotions] = useState<any[]>([])

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const promotionData = (await getPromotions("")).data
                console.log(promotionData)
                setPromotions(promotionData)

            } catch (error) {
                console.error('Error fetching promotion data:', error);
            }
        };

        fetchPromotions();
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-100 to-teal-300 w-full flex flex-col px-2 py-12">
            
        {/* <Link href="/promotion/manage">
        <div className="top-4 right-0 flex justify-end p-4 pt-2 text-3xl font-bold">
        <SeeYoursButton name="My Promotion" />
        </div>
        </Link> */}

            
            <div className="w-full px-10 my-0  p-1">
                {/* Header */}
                <h2 className="text-4xl text-center bg-gradient-to-r from-white to-white text-white w-fit mx-auto px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
                    🎉 <span className="text-emerald-600 drop-shadow-md">Promotion</span> 🎉
                </h2>
                
                {/* Card Container */}
                {promotions.length === 0 && (
                    <div className="m-10 justify-items-center"><Loader /></div>
                    
                )}
                <div className="flex flex-wrap gap-20 justify-center mt-6">
                    {promotions.map((promotion) => (
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