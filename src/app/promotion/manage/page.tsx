'use client'
import PromotionList from "@/components/PromotionList"
import PromotionCard from "@/components/PromotionCard"
import Link from "next/link";
import GoBackButton from "@/components/Gobackbutton";

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
    <div className="bg-gradient-to-r from-blue-100 to-teal-300 w-full flex flex-col px-2 py-10">
      <Link href="/promotion">
        <div className="absolute top-0 left-0 flex justify-start relative p-4">
          <GoBackButton name="Promotion" />
        </div>
      </Link>
      <div className="w-full flex flex-col px-2 items-center">
        <h2 className="text-4xl text-center bg-gradient-to-r from-white to-white text-white w-fit mx-auto px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
          🎉 <span className="text-emerald-600 drop-shadow-md">Your Promotion</span> 🎉
        </h2>

        <div className="flex flex-wrap gap-8 justify-center mt-6">
          {mockPromotions.map((promotion) => (
            <div
              key={promotion._id}
              className="w-full sm:w-[80%] md:w-1/4 lg:w-1/3 flex justify-center p-6"
            >
              <div className=" bg-white shadow-lg rounded-xl border border-gray-200  transition-all duration-300 hover:scale-105 hover:shadow-xl 
                      flex flex-col items-center justify-center  w-80% h-full">
                <PromotionCard mockPromotions={promotion} />
              </div>
            </div>
          ))}
        </div>

        <div className = "p-4 text-emerald-800">
          *to use it click discount button on your coupon
        </div>
      </div>
    </div>
  )
}
