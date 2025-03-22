"use client";
import CampgroundCard from "@/components/CampgroundCard";
import { useState } from "react";
import { Search } from "lucide-react";

export default function Campground() {
    const [searchTerm, setSearchTerm] = useState("");

    const mockCampgrounds = [
        {
            _id: "67bd6dfcd3e3272696f5243d",
            name: "Mountain View Camp",
            address: "123 Forest Road, Rocky Hills",
            tel: "555-1234",
            price: 25,
            capacity: 60,
            description: "A beautiful campsite with a breathtaking mountain view.",
            image: "img/mountain-view.jpg"
        },
        {
            _id: "67bd6dfcd3e3272696f5243e",
            name: "Lakeside Retreat",
            address: "456 River Lane, Serene Lake",
            tel: "555-5678",
            price: 30,
            capacity: 50,
            description: "A peaceful campsite by the lake, perfect for fishing and kayaking.",
            image: "img/lakeside.jpg"
        },
        {
            _id: "67bd6dfcd3e3272696f5243f",
            name: "Forest Haven",
            address: "789 Pinewood Trail, Green Forest",
            tel: "555-9101",
            price: 20,
            capacity: 40,
            description: "A secluded campsite surrounded by lush greenery and hiking trails.",
            image: "img/forest-haven.jpg"
        }
    ];

    const filteredCampgrounds = mockCampgrounds.filter(campground => 
        campground.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
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

            <div className="p-6 space-y-6 ">
                {filteredCampgrounds.map(campground => (
                    <CampgroundCard 
                        key={campground._id}
                        id={campground._id}
                        name={campground.name}
                        description={campground.description}
                        Location={campground.address}
                        image={campground.image}
                    />
                ))}
            </div>
        </div>
    );
}
