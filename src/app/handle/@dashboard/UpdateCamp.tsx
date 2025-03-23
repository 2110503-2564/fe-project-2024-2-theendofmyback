"use client";

import { useState, useEffect } from "react";
import updateCampground from "@/libs/campgrounds/UpdateCampground";
import getCampgrounds from "@/libs/campgrounds/getCampgrounds";

interface Camp {
    id: string;
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

export default function UpdateCamp({ profile, token }: { profile: Profile, token:string }) {
    const [formData, setFormData] = useState<Camp>({
        id: "",
        name: "",
        address: "",
        tel: "",
        price: 0,
        capacity: 0,
        description: "",
        image: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [campgrounds, setCamgrounds] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "price" || name === "capacity" ? parseFloat(value) : value,
        }));
    };

    useEffect(() => {
        const fetchCampgrounds = async () => {
            try {
                const response = await getCampgrounds("");
                setCamgrounds(response.data);
            } catch (err) {
                console.error("Failed to fetch campgrounds:", err);
            }
        };

        fetchCampgrounds();
    }, []);

    const fetchCampgroundsAfterSubmit = async () => {
        try {
            const response = await getCampgrounds("");
            setCamgrounds(response.data);
        } catch (err) {
            console.error("Failed to fetch campgrounds after submit:", err);
        }
    };

    useEffect(() => {
        if (!isLoading && !error) {
            fetchCampgroundsAfterSubmit();
        }
    }, [isLoading, error]);

    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            console.log("Form Data:", formData);
            
            const { id, name, address, tel, price, capacity, description, image } = formData;
            const response = await updateCampground(token, id, name, address, tel, price, capacity, description, image);
            //console.log("update reponse: ",response)
            alert("Update Campground successfully!");
            if (response.success) {
                setError("");
              }
        } catch (err) {
            setError("Failed to update camp. Please try again .");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="m-5 p-5">
            
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div className="text-2xl text-blue-700 font-semibold">Update Camp Information</div>

                    {error && <p className="text-red-500">{error}</p>}

                    <input type="hidden" name="id" value={formData.id} />
                    <div className="flex flex-col w-1/2 mx-auto space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700">Camp Name</label>
                            <select
                                id="name"
                                name="name"
                                value={formData.id}
                                onChange={(e) => {
                                    const selectedCampground = campgrounds.find(
                                        (campground) => campground.id === e.target.value
                                    );
                                    if (selectedCampground) {
                                        setFormData({
                                            ...selectedCampground,
                                            price: parseFloat(selectedCampground.price),
                                            capacity: parseFloat(selectedCampground.capacity),
                                        });
                                    }
                                }}
                                required
                                className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-blue-500 shadow-sm"
                            >
                                <option value="" disabled>Select a camp</option>
                                {campgrounds.map((campground) => (
                                    <option key={campground.id} value={campground.id}>
                                        {campground.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-gray-700">Address</label>
                            <input
                                type="text"
                                required
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-blue-500 shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="tel" className="block text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                required
                                id="tel"
                                name="tel"
                                value={formData.tel}
                                onChange={handleChange}
                                className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-blue-500 shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-gray-700">Price</label>
                            <input
                                type="number"
                                required
                                id="price"
                                name="price"
                                value={formData.price.toString()}
                                onChange={handleChange}
                                className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-blue-500 shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="capacity" className="block text-gray-700">Capacity</label>
                            <input
                                type="number"
                                required
                                id="capacity"
                                name="capacity"
                                value={formData.capacity.toString()}
                                onChange={handleChange}
                                className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-blue-500 shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-gray-700">Description</label>
                            <input
                                type="text"
                                required
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-blue-500 shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-gray-700">Image URL</label>
                            <input
                                type="text"
                                required
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-blue-500 shadow-sm"
                            />
                        </div>
                        <img src={formData.image} className="w-44"/>


                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out ${
                                isLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                        >
                            {isLoading ? "Updating..." : "Update Camp"}
                        </button>

                        <button
                            type="button"
                            
                            disabled={isLoading}
                            className={`p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out ${
                                isLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700 text-white"
                            }`}
                        >
                            {isLoading ? "Deleting..." : "Delete Camp"}
                        </button>
                    </div>
                    </div>
                </form>
            
        </main>
    );
}
