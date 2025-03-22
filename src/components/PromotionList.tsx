'use client'

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removePromotion } from "@/redux/feature/promotionSlice"; // Use removePromotion action

export default function PromotionList() {

    const promotions = useAppSelector(state => state.promotionSlice.promotionItems); // Get promotions from the store
    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            {
                promotions.length > 0 ?
                    promotions.map((promotion) => (
                        <div
                            className="bg-emerald-200 rounded px-5 mx-5 py-2 my-2"
                            key={promotion._id} // Use _id for unique key
                        >
                            <div className="text-xl font-bold">{promotion.name}</div>
                            <div className="text-xl">{promotion.description}</div>
                            <div className="text-xl">Discount: {promotion.discount}%</div>
                            <div
                                className="block rounded-md bg-[#fa616b] px-3 py-2 text-white shadow-sm hover:bg-[#a23c48] w-full mt-3"
                                onClick={() =>
                                    dispatch(removePromotion(promotion._id)) // Dispatch removePromotion action
                                }
                            >
                                Remove Promotion
                            </div>
                        </div>
                    ))
                    :
                    <div className="text-center font-bold text-3xl mt-5">No Active Promotions</div>
            }
        </>
    )
}
