
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import getMe from "@/libs/users/getMe";
import { useState } from "react";


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

const addCamp = async (addCampForm: FormData) => {
    "use server";

    const camp: Camp = {
        name: addCampForm.get("name") as string,
        address: addCampForm.get("address") as string,
        tel: addCampForm.get("tel") as string,
        price: Number(addCampForm.get("price")),
        capacity: Number(addCampForm.get("imageCap")), 
        description: addCampForm.get("desc") as string,
        image: addCampForm.get("picture") as string,
    };

    console.log("Adding camp:", camp);

    revalidateTag("Camps");
    redirect("/Camp");
};

export default function CreateCamp({ profile }: { profile: Profile }) {

    return (
        <main className="m-5 p-5">
            {profile?.data.role === "admin" ? (
                <form action={addCamp} className="mt-6 space-y-6">
                    <div className="text-2xl text-green-700 font-semibold">Create New Camp</div>

                    <div className="flex flex-col w-1/2 mx-auto space-y-4">
                        {[
                            { id: "name", label: "Camp Name", type: "text", placeholder: "Camp Name" },
                            { id: "address", label: "Address", type: "text", placeholder: "Camp Address" },
                            { id: "tel", label: "Phone Number", type: "text", placeholder: "Phone Number" },
                            { id: "price", label: "Price", type: "number", placeholder: "Price" },
                            { id: "desc", label: "Description", type: "text", placeholder: "Camp Description" },
                            { id: "picture", label: "Image URL", type: "text", placeholder: "Image URL" },
                            { id: "imageCap", label: "Image Capacity", type: "number", placeholder: "Capacity" },
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
                                Add New Camp
                            </button>
                        </div>
                    </div>
                </form>
            ) : null}
        </main>
    );
}
function localRevalidateTag(arg0: string) {
    throw new Error("Function not implemented.");
}

