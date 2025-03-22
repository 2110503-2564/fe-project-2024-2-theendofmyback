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
    <div className="bg-white w-full flex flex-col  px-2 py-10  ">
      <Link href="/promotion">
                <div className="absolute top-0 left-0 flex justify-start relative"> 
                <GoBackButton name="Promotion" />
                </div>
            </Link> 
            <div className=" w-full flex flex-col  px-2 py-10 items-center">
                <h1 className="text-[40px] font-extrabold items-center">Your Promotion</h1>
                
                <div className="flex flex-col w-4/5 items-center px-2 py-2 ">
                    {mockPromotions.map((promotion) => (
                      <div className="px-2 py-2 ">
                        <PromotionCard mockPromotions={promotion} />
                      </div>
                    ))}
                </div>
            </div></div>
  )
}