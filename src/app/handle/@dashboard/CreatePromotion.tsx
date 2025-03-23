"use client"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import { useState } from "react";
import { Promotion } from "../../../../interface";
import createPromotion from "@/libs/promotions/createPromotion";
interface Profile {
    data: {
        name: string;
        email: string;
        tel: string;
        createdAt: string;
        role: string;
    };
}

export default function CreatePromotion({ profile, token }: { profile: Profile, token:string }) {
    const [promotionData, setPromotionData] = useState<Promotion>({
        _id: "no use",
        id: "no use",
        name: "New Promotion",
        description: "this is a promotion",
        discount: 10,
        campground: "default campground",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPromotionData((prev) => ({
            ...prev,
            [name]: name === "discount" ? Number(value) : value,
        }));
    };

    
    const addPromotion = async () => {
        const { name, description, discount } = promotionData;
        try {
            const response = await createPromotion(token, name, description, discount)        
            console.log("Camp created successfully:", response);
        } catch (error) {
            console.error("Error creating camp:", error);
        }
    };

    return (
        <main className="m-8 p-8 bg-white rounded-xl shadow-xl">
            
                <form action={addPromotion} className="mt-6 space-y-6">
                    <div className="text-2xl text-green-700 font-semibold">Create New Promotion</div>

                    <div className="flex flex-col w-1/2 mx-auto space-y-4">
                    <div>
                    <div>
                        <label htmlFor="name" className="block text-teal-600 font-medium mb-2">Promotion Name (unique field)</label>
                        <input
                            type="text"
                            required
                            id="name"
                            name="name"
                            value={promotionData.name}
                            onChange={handleChange}
                            placeholder="Promotion Name"
                            className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="desc" className="block text-teal-600 font-medium mb-2">Description</label>
                        <input
                            type="text"
                            required
                            id="desc"
                            name="desc"
                            value={promotionData.description}
                            onChange={handleChange}
                            placeholder="Promotion Description"
                            className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="discount" className="block text-teal-600 font-medium mb-2">Discount</label>
                        <input
                            type="number"
                            required
                            id="discount"
                            name="discount"
                            value={promotionData.discount}
                            onChange={handleChange}
                            placeholder="Discount Percentage"
                            className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                        />
                    </div>
                </div>


                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out"
                            >
                                Add New Promotion
                            </button>
                        </div>
                    </div>
                </form>
            
        </main>
    );
}