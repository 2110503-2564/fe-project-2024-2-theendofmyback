"use client";

import { useState, useEffect } from "react";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import updatePromotion from "@/libs/promotions/UpdatePromotion"; 

interface Promotion {
    id: string;
    title: string;
    description: string;
    discount: number;
    startDate: string;
    endDate: string;
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

export default function UpdatePromotion({ profile, promotion }: { profile: Profile; promotion: Promotion }) {
    const [formData, setFormData] = useState<Promotion>(promotion);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setFormData(promotion);
    }, [promotion]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await updatePromotion(formData);
            revalidateTag("Promotions");
            redirect("/Promotions");
        } catch (err) {
            setError("Failed to update promotion. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="m-5 p-5">
            {profile?.data.role === "admin" ? (
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div className="text-2xl text-blue-700 font-semibold">Update Promotion Information</div>

                    {error && <p className="text-red-500">{error}</p>}

                    <input type="hidden" name="id" value={formData.id} />

                    <div className="flex flex-col w-1/2 mx-auto space-y-4">
                        {[ 
                            { id: "title", label: "Promotion Title", type: "text", value: formData.title },
                            { id: "description", label: "Description", type: "text", value: formData.description },
                            { id: "discount", label: "Discount Percentage", type: "number", value: formData.discount.toString() },
                            { id: "startDate", label: "Start Date", type: "date", value: formData.startDate },
                            { id: "endDate", label: "End Date", type: "date", value: formData.endDate },
                            { id: "image", label: "Image URL", type: "text", value: formData.image },
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
                                {isLoading ? "Updating..." : "Update Promotion"}
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out ${isLoading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-red-600 hover:bg-red-700 text-white"
                                    }`}
                            >
                                {isLoading ? "Deleting..." : "Delete Promotion"}
                            </button>
                        </div>
                    </div>
                </form>
            ) : null}
        </main>
    );
}
