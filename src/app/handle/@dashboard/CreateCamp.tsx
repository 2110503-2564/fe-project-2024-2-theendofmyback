"use client"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import getMe from "@/libs/users/getMe";
import { useState } from "react";
import createCampground from "@/libs/campgrounds/createCampground";

interface Camp {
    name: string;
    address: string;
    tel: string;
    price: number;
    capacity: number;
    description: string;
    image: string;
}

interface Profile {
    data: {
        name: string;
        email: string;
        tel: string;
        createdAt: string;
        role: string;
    };
}



export default function CreateCamp({ profile, token }: { profile: Profile, token:string }) {
    const [campData, setCampData] = useState<Camp>({
        name: "NewCampground",
        address: "Add Address Here",
        tel: "012345678",
        price: 10,
        capacity: 4,
        description: "This is description",
        image: "/img/default-camp.jpg",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCampData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "capacity" ? Number(value) : value,
        }));
    };

    const addCamp = async () => {
        console.log(campData)
        const { name, address, tel, price, capacity, description, image } = campData;

        try {
            const response = await createCampground(token, name, address, tel, price, capacity, description, image)
            console.log("Camp created successfully:", response);
            
        } catch (error) {
            console.error("Error creating camp:", error);
        }
    };

    return (
        <main className="m-5 p-5">
        <form
            onSubmit={(e) => {
                e.preventDefault();
                addCamp();
            }}
            className="mt-6 space-y-6"
        >
            <div className="text-2xl text-green-700 font-semibold">Create New Camp</div>

            <div className="flex flex-col w-1/2 mx-auto space-y-4">
                <div>
                    <label htmlFor="name" className="block text-gray-700">Camp Name (unique field) </label>
                    <input
                        type="text"
                        required
                        id="name"
                        name="name"
                        placeholder="Camp Name"
                        value={campData.name}
                        onChange={handleChange}
                        className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        required
                        id="address"
                        name="address"
                        placeholder="Camp Address"
                        value={campData.address}
                        onChange={handleChange}
                        className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="tel" className="block text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        required
                        id="tel"
                        name="tel"
                        placeholder="Phone Number"
                        value={campData.tel}
                        onChange={handleChange}
                        className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        required
                        id="price"
                        name="price"
                        min={0}
                        placeholder="Price"
                        value={campData.price || ""}
                        onChange={handleChange}
                        className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="capacity" className="block text-gray-700">Capacity</label>
                    <input
                        type="number"
                        required
                        id="capacity"
                        name="capacity"
                        min={0}
                        placeholder="Capacity"
                        value={campData.capacity || ""}
                        onChange={handleChange}
                        className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700">Description</label>
                    <input
                        type="text"
                        required
                        id="description"
                        name="description"
                        placeholder="Camp Description"
                        value={campData.description}
                        onChange={handleChange}
                        className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        required
                        id="image"
                        name="image"
                        placeholder="Image URL"
                        value={campData.image}
                        onChange={handleChange}
                        className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm"
                    />
                </div>
                <img src={campData.image} className="w-44">
                </img>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out"
                    >
                        Add New Camp
                    </button>
                </div>
            </div>
        </form>
    </main>
    );
}
