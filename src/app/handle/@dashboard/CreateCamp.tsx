"use client";
import { useState } from "react";
import createCampground from "@/libs/campgrounds/createCampground";
import { Profile, Camp } from "../../../../interface";

export default function CreateCamp({ profile, token }: { profile: Profile, token: string }) {
    const [campData, setCampData] = useState<Camp>({
        name: "NewCampground",
        address: "Add Address Here",
        tel: "012345678",
        price: 10,
        capacity: 4,
        description: "This is description",
        image: "/img/default-camp.jpg",
        id: "no use"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCampData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "capacity" ? Number(value) : value,
        }));
    };

    const addCamp = async () => {
        console.log(campData);
        const { name, address, tel, price, capacity, description, image } = campData;

        try {
            const response = await createCampground(token, name, address, tel, price, capacity, description, image);
            console.log("Camp created successfully:", response);
        } catch (error) {
            console.error("Error creating camp:", error);
        }
    };

    return (
        <main className="m-8 p-8 bg-white rounded-xl shadow-xl">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addCamp();
                }}
                className="mt-6 space-y-6"
            >
                <div className="text-3xl text-teal-700 font-bold text-center mb-8">
                    - Create New Camp -
                </div>

                <div className="grid grid-cols-2 gap-8">

                    <div className="flex flex-col space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-teal-600 font-medium mb-2">Camp Name (unique field)</label>
                            <input
                                type="text"
                                required
                                id="name"
                                name="name"
                                placeholder="Camp Name"
                                value={campData.name}
                                onChange={handleChange}
                                className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-teal-600 font-medium mb-2">Description</label>
                            <input
                                type="text"
                                required
                                id="description"
                                name="description"
                                placeholder="Camp Description"
                                value={campData.description}
                                onChange={handleChange}
                                className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                            />
                        </div>

                        
                    </div>
                    <div className="flex flex-col space-y-6">
                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <label htmlFor="tel" className="block text-teal-600 font-medium mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    required
                                    id="tel"
                                    name="tel"
                                    placeholder="Phone Number"
                                    value={campData.tel}
                                    onChange={handleChange}
                                    className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="address" className="block text-teal-600 font-medium mb-2">Address</label>
                                <input
                                    type="text"
                                    required
                                    id="address"
                                    name="address"
                                    placeholder="Camp Address"
                                    value={campData.address}
                                    onChange={handleChange}
                                    className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-6">
                            <div className="flex-1">
                                <label htmlFor="price" className="block text-teal-600 font-medium mb-2">Price</label>
                                <input
                                    type="number"
                                    required
                                    id="price"
                                    name="price"
                                    min={0}
                                    placeholder="Price"
                                    value={campData.price || ""}
                                    onChange={handleChange}
                                    className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="capacity" className="block text-teal-600 font-medium mb-2">Capacity</label>
                                <input
                                    type="number"
                                    required
                                    id="capacity"
                                    name="capacity"
                                    min={0}
                                    placeholder="Capacity"
                                    value={campData.capacity || ""}
                                    onChange={handleChange}
                                    className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                            <label htmlFor="image" className="block text-teal-600 font-medium mb-2">Image URL</label>
                            <input
                                type="text"
                                required
                                id="image"
                                name="image"
                                placeholder="Image URL"
                                value={campData.image}
                                onChange={handleChange}
                                className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                            />
                        </div>

                <div className="flex justify-center my-6">
                    <img src={campData.image} alt="Camp preview" className="w-44 h-44 object-cover rounded-lg" />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg w-full transition duration-300 ease-in-out shadow-md"
                    >
                        Add New Camp
                    </button>
                </div>
            </form>
        </main>
    );
}
