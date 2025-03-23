"use client";

import { useState, useEffect } from "react";
import updatePromotion from "@/libs/promotions/UpdatePromotion"; 
import getPromotions from "@/libs/promotions/getPromotions";
import deletePromotions from "@/libs/promotions/deletePromotion";


interface Promotion {
    id: string;
    name: string;
    description: string;
    discount: number;
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

export default function UpdatePromotion({ profile, token }: { profile: Profile, token:string }) {
    const [formData, setFormData] = useState<Promotion>({
        id: "",
        name: "",
        description: "",
        discount: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [promotions, setPromotions] = useState<Promotion[]>([]);

    useEffect(() => {
            const fetchPromotions = async () => {
                try {
                    const response = await getPromotions("");
                    setPromotions(response.data);
                } catch (err) {
                    console.error("Failed to fetch campgrounds:", err);
                }
            };
    
            fetchPromotions();
        }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "discount" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { id, name, description, discount } = formData;
            const response = await updatePromotion(token, id, name, description, discount);
            console.log("update reponse: ",response)
            alert("Update Promotions successfully!");
            if (response.success) setError("");
            
        } catch (err) {
            setError("Failed to update promotion. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPromotionsAfterSubmit = async () => {
        try {
            const response = await getPromotions("");
            setPromotions(response.data);
        } catch (err) {
            console.error("Failed to fetch promotions after submit:", err);
        }
    };

    useEffect(() => {
        if (!isLoading && !error) {
            fetchPromotionsAfterSubmit();
        }
    }, [isLoading, error]);

    const handleDelete = (): void => {
            if (confirm("Are you SURE sure SURE SURE to delete this promotion")) {
              console.log(`Deleting promotion with ID: ${formData.id}`);
              
              deletePromotions(
                token,
                formData.id
              ).then(
                () => {
                  console.log("Promotion deleted successfully.");
                  window.location.reload();
                }
              )
        
            } else {
              console.log("Delete not confirmed yet.");
            }
        }

    return (
        <main className="m-5 p-5">
        
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="text-2xl text-blue-700 font-semibold">Update Promotion Information</div>
    
                {error && <p className="text-red-500">{error}</p>}
                <input type="hidden" name="id" value={formData.id} />
    
                <div className="flex flex-col w-1/2 mx-auto space-y-4">
                    <div>
                        <label htmlFor="promotion" className="block text-gray-700">Select Promotion</label>
                        <select
                            id="promotion"
                            name="promotion"
                            value={formData.id}
                            onChange={(e) => {
                                const selectedPromotion = promotions.find(promo => promo.id === e.target.value);
                                if (selectedPromotion) {
                                    setFormData({
                                        id: selectedPromotion.id,
                                        name: selectedPromotion.name,
                                        description: selectedPromotion.description,
                                        discount: selectedPromotion.discount,
                                    });
                                }
                            }}
                            className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-blue-500 shadow-sm"
                        >
                            <option value="" disabled>Select a promotion</option>
                            {promotions.map((promotion) => (
                                <option key={promotion.id} value={promotion.id}>
                                    {promotion.name} - {promotion.discount}
                                </option>
                            ))}
                        </select>
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
                        <label htmlFor="discount" className="block text-gray-700">Discount Percentage</label>
                        <input
                            type="number"
                            required
                            id="discount"
                            name="discount"
                            value={formData.discount.toString()}
                            onChange={handleChange}
                            className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-blue-500 shadow-sm"
                        />
                    </div>
                
                    <div className="text-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out ${
                            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    >
                        {isLoading ? "Updating..." : "Update Promotion"}
                    </button>
    
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => {
                            if (formData.id) {
                                if (confirm("Are you sure you want to delete this promotion?")) {
                                    handleDelete();
                                }
                            } else {
                                alert("Please select a promotion to delete.");
                            }
                        }}
                        className={`p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out ${
                            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                    >
                        {isLoading ? "Deleting..." : "Delete Promotion"}
                    </button>
                </div>
                </div>
    
            </form>
        
    </main>
    
    
    )
}
