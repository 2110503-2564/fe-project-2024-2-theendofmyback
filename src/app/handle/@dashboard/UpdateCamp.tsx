"use client";

import { useState, useEffect } from "react";
import updateCampground from "@/libs/campgrounds/UpdateCampground";
import getCampgrounds from "@/libs/campgrounds/getCampgrounds";
import deleteCampground from "@/libs/campgrounds/deleteCampground";
import { Profile, Camp } from "../../../../interface";

export default function UpdateCamp({ profile, token }: { profile: Profile, token: string }) {

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

    const handleDelete = (): void => {
        if (confirm("Are you aware that deleting campground will delete all its booking too")) {
            console.log(`Deleting campground with ID: ${formData.id}`);

            deleteCampground(
                token,
                formData.id
            ).then(
                () => {
                    console.log("Campground deleted successfully.");
                    window.location.reload();
                }
            )

        } else {
            console.log("Delete not confirmed yet.");
        }
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
        <main className="m-8 p-8 bg-white rounded-xl shadow-xl">

            

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="text-3xl text-teal-700 font-semibold text-center mb-8">- Update Camp Information -</div>

                {error && <p className="text-red-500">{error}</p>}

                <input type="hidden" name="id" value={formData.id} />
                <div className="flex flex-col w-2/3 mx-auto space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-teal-600 font-medium mb-2">Camp Name</label>
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
                            className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                        >
                            <option value="" disabled>Select a camp</option>
                            {campgrounds.map((campground) => (
                                <option key={campground.id} value={campground.id}>
                                    {campground.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex w-full space-x-6">
                        <div className="flex-1">
                            <label htmlFor="description" className="block text-teal-600 font-medium mb-2">Description</label>
                            <input
                                type="text"
                                required
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                            />
                        </div>

                        <div className="flex-1">
                            <label htmlFor="image" className="block text-teal-600 font-medium mb-2">Image URL</label>
                            <input
                                type="text"
                                required
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="flex w-full space-x-6">
                        <div className="flex-1">
                            <label htmlFor="address" className="block text-teal-600 font-medium mb-2">Address</label>
                            <input
                                type="text"
                                required
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                            />
                        </div>

                        <div className="flex-1">
                            <label htmlFor="tel" className="block text-teal-600 font-medium mb-2">Phone Number</label>
                            <input
                                type="text"
                                required
                                id="tel"
                                name="tel"
                                value={formData.tel}
                                onChange={handleChange}
                                className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex w-full space-x-6">
                        <div className="flex-1">
                            <label htmlFor="price" className="block text-teal-600 font-medium mb-2">Price</label>
                            <input
                                type="number"
                                required
                                id="price"
                                name="price"
                                value={formData.price.toString()}
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
                                value={formData.capacity.toString()}
                                onChange={handleChange}
                                className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center my-6">
                        <img src={formData.image} alt="Camp preview" className="w-44 h-44 object-cover rounded-lg" />
                    </div>

                    <div className="w-full text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out ${isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-700 text-white"
                                }`}
                        >
                            {isLoading ? "Updating..." : "Update Camp"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                if (formData.id) {
                                    if (confirm("Are you sure you want to delete this camp?")) {
                                        handleDelete();
                                    }
                                } else {
                                    alert("Please select a camp to delete.");
                                }
                            }}
                            disabled={isLoading}
                            className={`p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out ${isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-700 text-white"
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
