'use client';

import { ChatBubbleBottomCenterTextIcon, StarIcon } from '@heroicons/react/24/solid'; 
import ReviewCard from "@/components/ReviewCard";
import { useEffect, useState } from "react";
import getReview from '@/libs/reviews/getReviews';
import getCampgrounds from '@/libs/campgrounds/getCampgrounds';
import { useSession } from 'next-auth/react';
import createReview from '@/libs/reviews/createReviews';

export default function Review() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviews, setReviews] = useState<any[]>([]);  
    const [title, setTitle] = useState(""); 
    const [campground, setCampground] = useState("");
    const [allCampgorund, setAllCampgorund] = useState<any[]>([]);
    const [enableCreate, setEnableCreate] = useState(false)
    const { data: session } = useSession()

        useEffect(() => {
            const fetchPromotions = async () => {
                try {
                    const reviewData = (await getReview("")).data
                    reviewData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    const allCamp = (await getCampgrounds("")).data
                    console.log(allCamp)
                    setAllCampgorund(allCamp)

                    setReviews(reviewData)
    
                } catch (error) {
                    console.error('Error fetching promotion data:', error);
                }
            };
    
            fetchPromotions();
        }, []);
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const form = e.target as HTMLFormElement;
        const textarea = form.elements.namedItem("textarea") as HTMLTextAreaElement; // กำหนดประเภท textarea
    
        const newReview = {
            _id: String(reviews.length + 1),  
            title: title, 
            text: textarea.value, 
            rating: rating,
            campground: campground,  
            createdAt: new Date().toISOString(),  
        };

        createReview(
              session?.user?.token || '',
              title, textarea.value ,campground || '',rating*4 //idk why*4 but yeah
        ).then(
            () => {
                alert('Create reviews successfully.')
              window.location.reload();
            }
        );
    };
    

    return (
        <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-gradient-to-t from-lime-100 to-green-200">
             
            <div className="flex justify-center my-6">
            <h2 className="text-4xl text-center bg-gradient-to-r from-green-400 to-lime-600 text-white w-fit mx-auto px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-2">
                    ⭐ <span className="drop-shadow-md">Reviews</span> ⭐
            </h2>
                    <button
                        onClick={() => setEnableCreate(!enableCreate)}
                        className={`mx-4 px-2 py-2 rounded-3xl font-bold text-white transition-all duration-300 ${
                            enableCreate ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-lime-600'
                        }`}
                    >
                        {enableCreate ? 'x' : 'Create Review'}
                    </button>
            </div>

            {
                enableCreate? (
                    <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-lg w-[90%] max-w-lg absolue">
                <h1 className="text-center text-gray-700 text-xl font-bold mb-4">Send Review</h1>
                
                <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = (index + 1) * 0.5;
                        return (
                            <button
                                key={ratingValue}
                                className={`text-3xl ${ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                                onClick={() => setRating(ratingValue)}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                <StarIcon className="w-8 h-8" />
                            </button>
                        );
                    })}
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            name="title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="Review Title" 
                            className="bg-gray-100 text-gray-600 w-full p-3 border border-gray-300 rounded-lg placeholder:text-gray-500"
                        />
                    </div>

                    <div className="mb-4">
                        <select
                            name="campground"
                            value={campground}
                            onChange={(e) => setCampground(e.target.value)}
                            className="bg-gray-100 text-gray-600 w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="" disabled>Select Campground</option>
                            {allCampgorund.map((camp) => (
                                <option key={camp._id} value={camp._id}>
                                    {camp.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <textarea name="textarea" placeholder="Your feedback..." className="bg-gray-100 text-gray-600 w-full h-28 placeholder:text-gray-500 border border-gray-300 rounded-lg p-3 resize-none outline-none focus:border-gray-500"></textarea>
                    
                    <button type="submit" className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg mt-4 w-full transition-all duration-300 hover:bg-green-600">
                        Submit Review
                    </button>
                </form>
            </div>
                )
                : <div></div>
            }
            
            
            
            <div className="w-full px-10 my-10">
               

                

                <div className="flex flex-wrap gap-6 justify-center mt-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="w-full sm:w-[80%] md:w-1/2 lg:w-1/3 flex justify-center p-3">
                            <div className="bg-white shadow-xl rounded-xl border border-gray-300 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative">
                                <div className="absolute top-5 right-5 text-lime-400">
                                    <ChatBubbleBottomCenterTextIcon className="w-10 h-10" />
                                </div>
                                <ReviewCard reviews={review} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    
            
        </div>
    );
}
