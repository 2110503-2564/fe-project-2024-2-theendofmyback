"use client";

import { useState, useEffect } from "react";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import updateCampground from "@/libs/campgrounds/UpdateCampground";

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

export default function UpdateCamp({ profile, camp }: { profile: Profile; camp: Camp }) {
    const [formData, setFormData] = useState<Camp>(camp);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setFormData(camp);
    }, [camp]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await updateCampground(formData);
            revalidateTag("Camps");
            redirect("/Camp");
        } catch (err) {
            setError("Failed to update camp. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="m-5 p-5">
            {profile?.data.role === "admin" ? (
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div className="text-2xl text-blue-700 font-semibold">Update Camp Information</div>

                    {error && <p className="text-red-500">{error}</p>}

                    <input type="hidden" name="id" value={formData.id} />

                    <div className="flex flex-col w-1/2 mx-auto space-y-4">
                        {[
                            { id: "name", label: "Camp Name", type: "text", value: formData.name },
                            { id: "address", label: "Address", type: "text", value: formData.address },
                            { id: "tel", label: "Phone Number", type: "text", value: formData.tel },
                            { id: "price", label: "Price", type: "number", value: formData.price.toString() },
                            { id: "desc", label: "Description", type: "text", value: formData.description },
                            { id: "picture", label: "Image URL", type: "text", value: formData.image },
                            { id: "capacity", label: "Capacity", type: "number", value: formData.capacity.toString() },
                        ].map((field) => (
                            <div key={field.id}>
                                <label htmlFor={field.id} className="block text-gray-700">{field.label}</label>
                                <input
                                    type={field.type}
                                    required
                                    id={field.id}
                                    name={field.id}
                                    value={field.value}
                                    onChange={handleChange}
                                    className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-blue-500 shadow-sm"
                                />
                            </div>
                        ))}

                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out ${isLoading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                    }`}
                            >
                                {isLoading ? "Updating..." : "Update Camp"}
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out ${isLoading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-red-600 hover:bg-red-700 text-white"
                                    }`}
                            >
                                {isLoading ? "Deleting..." : "Delete Camp"}
                            </button>
                        </div>
                    </div>
                </form>
            ) : null}
        </main>
    );
}
