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
import MapCard from "@/components/map";
import getCampgrounds from "@/libs/campgrounds/getCampgrounds";
import Loader from "@/components/load";

export default function Home() {

  interface CampgroundsJson {
    success: boolean;
    count: number;
    pagination?: {
      next?: {
        page: number;
        limit: number;
      };
    };
    data: Campground[];
  }

  
  interface Campground {
    _id: string;
    name: string;
    address: string;
    tel: string;
    price: number;
    capacity: number;
    description: string;
    image: string;
  }

  
  
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExplosion(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const [campgrounds, setCampgrounds] = useState<CampgroundsJson | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCampgrounds = campgrounds?.data.filter(campground =>
    campground.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campground.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campground.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
      const fetchCampground = async () => {
        let queryString = "";
  
        try {
          const campgroundList = await getCampgrounds(queryString);
          setCampgrounds(campgroundList);
        } catch (error) {
          console.error("Error fetching campgrounds:", error);
        }
      };
  
      fetchCampground();
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
      <div className="min-h-screen fitems-center px-4 py-10 bg-gradient-to-t from-green-100 to-transparent">

        <div className="h-[300px]"></div>
        <hr className="my-3" />
        <div className="flex justify-between items-center mx-20 mt-10">
          <h1 className="text-4xl font-bold text-green-600 ">Campground</h1>
          <Link href="/campground">
            <SeeAll />
          </Link>
        </div>
        <div className={`flex justify-center items-center space-x-4 p-4 transition-all duration-500 ${showExplosion ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
  <div className="p-6 flex flex-row space-x-6 items-center">
    {campgrounds === null ? (
      <div><Loader /></div>
    ) : filteredCampgrounds?.slice(0, 3).length ? (
      filteredCampgrounds.slice(0, 3).map((campground) => (
        <CampgroundHomeCard
          key={campground._id}
          id={campground._id}
          name={campground.name}
          description={campground.description}
          location={campground.address}
          image={campground.image}
        />
      ))
    ) : (
      <p className="text-gray-500 text-center">No campgrounds found.</p>
    )}
  </div>
</div>




        <hr className="my-3  " />
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

        <hr className="my-3" />
        <div className="flex justify-between items-center mx-20 mt-10" />

        <h2 className="text-3xl text-center bg-gradient-to-r from-green-400 to-teal-600 text-white w-fit mx-auto px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-2">
          ⭐ <span className="drop-shadow-md">Map</span> ⭐
        </h2>

        <div className="flex justify-center items-center mx-20 mt-10">
  <div className="border-4 border-white p-4 rounded-lg bg-white shadow-lg">
    <MapCard />
  </div>
</div>

        <div className="flex justify-between items-center mx-20 mt-10" />

      </div>

    </main>
  );
}