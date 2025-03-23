"use client";

import { useState, useEffect } from "react";
import updatePromotion from "@/libs/promotions/UpdatePromotion"; 
import getPromotions from "@/libs/promotions/getPromotions";
import deletePromotions from "@/libs/promotions/deletePromotion";
import { Profile } from "../../../../interface";
import Swal from "sweetalert2";

interface Promotion {
    id: string;
    name: string;
    description: string;
    discount: number;
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
            Swal.fire({
                                  title: "Good job!",
                                  text: "Update Promotion successfully",
                                  icon: "success"
                                });
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
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(`Deleting promotion with ID: ${formData.id}`);
      
            deletePromotions(token, formData.id)
              .then(() => {
                console.log("Promotion deleted successfully.");
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                }).then(() => {
                  window.location.reload();
                });
              })
              .catch((error) => {
                console.error("Error deleting promotion:", error);
                Swal.fire({
                  title: "Error!",
                  text: "Failed to delete the promotion.",
                  icon: "error"
                });
              });
          } else {
            console.log("Delete not confirmed yet.");
          }
        });
      };
      

    return (
        <main className="m-8 p-8 bg-white rounded-xl shadow-xl">
        
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="text-3xl text-teal-700 font-semibold text-center mb-8">- Update Promotion Information -</div>
    
                {error && <p className="text-red-500">{error}</p>}
                <input type="hidden" name="id" value={formData.id} />
    
                <div className="flex flex-col w-1/2 mx-auto space-y-4">
                    <div>
                        <label htmlFor="promotion" className="block text-teal-600 font-medium mb-2">Select Promotion</label>
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
                            className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
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
    
                    <div>
                        <label htmlFor="discount" className="block text-teal-600 font-medium mb-2">Discount Percentage</label>
                        <input
                            type="number"
                            required
                            id="discount"
                            name="discount"
                            value={formData.discount.toString()}
                            onChange={handleChange}
                            className="bg-white border-2 border-emerald-300 rounded-lg w-full p-4 focus:outline-none focus:border-emerald-500 shadow-sm"
                        />
                    </div>
                
                    <div className="text-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out ${
                            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        }`}
                    >
                        {isLoading ? "Updating..." : "Update Promotion"}
                    </button>
    
                    <button
    type="button"
    disabled={isLoading}
    onClick={handleDelete}
    className={`p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out ${
      isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-700 text-white"
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
