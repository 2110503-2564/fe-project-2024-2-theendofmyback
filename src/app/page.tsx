"use client";

import Banner from "@/components/Banner";
import FavCard from "@/components/favCard";
import { useEffect, useState } from "react";
import CampgroundHomeCard from "@/components/CampgroundHomeCard";
import Link from "next/link";
import PromotionHomeCard from "@/components/PromotionHomeCard";
import SeeAll from "@/components/seeAll";

export default function Home() {
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExplosion(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative">
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
        <h1 className="text-4xl font-bold text-green-600">Campground</h1>
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
        <Link href="/campground">
        <SeeAll />
        </Link>
      </div>
      <div className={`flex justify-center items-center space-x-12 p-4 transition-all duration-500 ${showExplosion ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <PromotionHomeCard />
        <PromotionHomeCard />
        <PromotionHomeCard />
        <PromotionHomeCard />
      </div>
    </main>
  );
}