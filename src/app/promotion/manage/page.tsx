'use client'
import PromotionList from "@/components/PromotionList"
import PromotionCard from "@/components/PromotionCard"


export default function MyPromotion() {

  const mockPromotions = [
    {
      _id: "67bd907379db2d1502b32995",
      name: "Discount 200",
      campground: "67bd6dfcd3e3272696f5243d",
      description: "Get 200 off on your next booking!",
      discount: 200,
    },
    {
      _id: "67bd908479db2d1502b32996",
      name: "Weekend Special",
      campground: "67bd6dfcd3e3272696f5243e",
      description: "Enjoy a 15% discount on weekend stays!",
      discount: 15, // 15% discount
    },
    {
      _id: "67bd909579db2d1502b32997",
      name: "New Year Offer",
      campground: "67bd6dfcd3e3272696f5243f",
      description: "Save 500 when booking for the New Year celebration!",
      discount: 500,
    },
    {
      _id: "67bd90a679db2d1502b32998",
      name: "Early Bird Deal",
      campground: "67bd6dfcd3e3272696f52440",
      description: "Book 2 weeks in advance and get 10% off!",
      discount: 10, // 10% discount
    },
  ];



  return (
    <div className="bg-white w-full flex flex-col items-center px-2 py-10 ">
                <h1 className="text-[40px] font-extrabold">Your Promotion</h1>
                
                <div className="flex flex-col w-4/5 items-center">
                    {mockPromotions.map((promotion) => (
                        <PromotionCard mockPromotions={promotion} />
                    ))}
                </div>
            </div>
  )
}