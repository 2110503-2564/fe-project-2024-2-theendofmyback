"use client";
import CampgroundCard from "@/components/CampgroundCard";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import getCampgrounds from "@/libs/campgrounds/getCampgrounds";
import Loader from "@/components/load";

export default function Campground() {
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

  const [campgrounds, setCampgrounds] = useState<CampgroundsJson | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filtering the campgrounds based on the search term
  const filteredCampgrounds = campgrounds?.data.filter(campground =>
    campground.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campground.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campground.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-gradient-to-t from-lime-100 to-tea-200">
      <div className="p-4">
        <h1 className="text-4xl text-center bg-gradient-to-r from-green-400 to-emerald-500 text-white w-fit mx-auto px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-3 hover:shadow-2xl transition-all ease-in-out duration-300">
          ⭐ <span className="drop-shadow-md">Campground</span> ⭐
        </h1>
      </div>

      <div className="w-full max-w-2xl flex items-center bg-white bg-opacity-80 rounded-3xl shadow-lg p-3 mb-6 backdrop-blur-xl">
        <Search className="text-gray-600" />
        <input
          type="text"
          placeholder="Search for a campground..."
          className="w-full p-3 outline-none bg-transparent text-gray-700 focus:ring-2 focus:ring-lime-400 transition duration-200 ease-in"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

    <div className="p-6 space-y-6">
      {campgrounds === null ? (
        <div><Loader /></div>
      ) : filteredCampgrounds?.length ? (
        filteredCampgrounds.map((campground) => (
        <CampgroundCard
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
  );
}
