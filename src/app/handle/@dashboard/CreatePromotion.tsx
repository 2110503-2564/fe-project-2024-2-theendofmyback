
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import { useState } from "react";

interface Promotion {
    name: string;
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

const addPromotion = async (addPromotionForm: FormData) => {
    "use server";

    const promotion: Promotion = {
        name: addPromotionForm.get("name") as string,
        description: addPromotionForm.get("desc") as string,
        discount: Number(addPromotionForm.get("discount")),
        startDate: addPromotionForm.get("startDate") as string,
        endDate: addPromotionForm.get("endDate") as string,
        image: addPromotionForm.get("image") as string,
    };

    console.log("Adding promotion:", promotion);

    revalidateTag("Promotions");
    redirect("/Promotions");
};

export default function CreatePromotion({ profile }: { profile: Profile }) {

    return (
        <main className="m-5 p-5">
            {profile?.data.role === "admin" ? (
                <form action={addPromotion} className="mt-6 space-y-6">
                    <div className="text-2xl text-green-700 font-semibold">Create New Promotion</div>

                    <div className="flex flex-col w-1/2 mx-auto space-y-4">
                        {[ 
                            { id: "name", label: "Promotion Name", type: "text", placeholder: "Promotion Name" },
                            { id: "desc", label: "Description", type: "text", placeholder: "Promotion Description" },
                            { id: "discount", label: "Discount (%)", type: "number", placeholder: "Discount Percentage" },
                            { id: "startDate", label: "Start Date", type: "date", placeholder: "Start Date" },
                            { id: "endDate", label: "End Date", type: "date", placeholder: "End Date" },
                            { id: "image", label: "Image URL", type: "text", placeholder: "Image URL" },
                        ].map((field) => (
                            <div key={field.id}>
                                <label htmlFor={field.id} className="block text-gray-700">{field.label}</label>
                                <input
                                    type={field.type}
                                    required
                                    id={field.id}
                                    name={field.id}
                                    placeholder={field.placeholder}
                                    className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm"
                                />
                            </div>
                        ))}

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
            ) : null}
        </main>
    );
}
