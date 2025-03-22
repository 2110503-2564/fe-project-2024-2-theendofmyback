"use client";

import Banner from "@/components/Banner";
import FavCard from "@/components/favCard";
import { useEffect, useState } from "react";
import CampgroundHomeCard from "@/components/CampgroundHomeCard";
import Link from "next/link";
import PromotionHomeCard from "@/components/PromotionHomeCard";
import SeeAll from "@/components/seeAll";
import Switch from "@/components/mode";
import PromotionCard from "@/components/PromotionCard";
import GameComponent from "@/components/game";

export default function Home() {
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExplosion(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
    }
  ];

  return (
    <main className="relative ">
      <div className="mx-auto transform">
        <Banner />
      
      
      <div className="flex justify-between items-center mx-20 mt-10">
        
      </div>
      <div className={`z-20 absolute top-[80%] left-1/2 transform -translate-x-1/2  flex justify-center items-center space-x-12 p-4 transition-all duration-500 ${showExplosion ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <FavCard />
        <FavCard />
        <FavCard />
        
      </div>
      </div>
      
      <div className="h-[300px]"></div>
      <hr className="my-3" />
      <div className="flex justify-between items-center mx-20 mt-10">
        <h1 className="text-4xl font-bold text-green-600 ">Campground</h1>
        <Link href="/campground">
        <SeeAll />
        </Link>
      </div>
      <div className={`flex justify-center items-center space-x-12 p-4 transition-all duration-500 ${showExplosion ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <CampgroundHomeCard />
        <CampgroundHomeCard />
        <CampgroundHomeCard />
      </div>
      
      <hr className="my-3" />
      <div className="flex justify-between items-center mx-20 mt-10">
        <h1 className="text-4xl font-bold text-green-600">Promotion</h1>
        <Link href="/promotion">
        <SeeAll />
        </Link>
      </div>
      <div className={`flex justify-center items-center space-x-12 p-4 transition-all duration-500 ${showExplosion ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <PromotionCard mockPromotions={mockPromotions[0]} />
        <PromotionCard mockPromotions={mockPromotions[1]} />
      </div>

    </main>
  );
}