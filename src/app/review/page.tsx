'use client';

import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid'; // Import the pin icon
import ReviewCard from "@/components/ReviewCard";

const mockReviews = [
  {
    _id: "1",
    title: "Great Experience!",
    text: "Loved the atmosphere and activities. Will definitely come back!",
    rating: 8,
    user: "John Doe",
    campground: "LaBaLaKe Camp",
    createdAt: "2025-02-25",
  },
  {
    _id: "2",
    title: "Nice Place",
    text: "The lake view is amazing!",
    rating: 10,
    user: "Alice Smith",
    campground: "LaBaLaKe Camp",
    createdAt: "2025-02-26",
  },
  {
    _id: "3",
    title: "Could be better",
    text: "It was good but too crowded.",
    rating: 6,
    user: "Michael Johnson",
    campground: "LaBaLaKe Camp",
    createdAt: "2025-02-27",
  },
  {
    _id: "4",
    title: "Fantastic!",
    text: "Great food, friendly staff.",
    rating: 10,
    user: "Sarah Lee",
    campground: "LaBaLaKe Camp",
    createdAt: "2025-02-28",
  },
];

export default function Review() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-gradient-to-t from-lime-100 to-tea-200">
    <div className="w-full px-10 my-10">
      {/* Header */}
      <h2 className="text-3xl text-center bg-gradient-to-r from-lime-300 to-lime-500 text-white w-fit mx-auto px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
        ⭐ <span className="drop-shadow-md">Reviews</span> ⭐
      </h2>

      {/* Review Container */}
      <div className="flex flex-wrap gap-6 justify-center mt-6">
        {mockReviews.map((review) => (
          <div key={review._id} className="w-full sm:w-[80%] md:w-1/2 lg:w-1/3 flex justify-center p-3">
            <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl relative">
              {/* Pin Icon */}
              <div className=" top-5 right-5 text-lime-300">
                <ChatBubbleBottomCenterTextIcon className=" w-9 h-10" />
              </div>

              {/* Review Card */}
              <ReviewCard mockReviews={review} />
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
