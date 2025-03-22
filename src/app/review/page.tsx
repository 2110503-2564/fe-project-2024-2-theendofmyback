'use client';

import { ChatBubbleBottomCenterTextIcon, StarIcon } from '@heroicons/react/24/solid'; 
import ReviewCard from "@/components/ReviewCard";
import { useState } from "react";

const initialReviews = [
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
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviews, setReviews] = useState(initialReviews);  
    const [title, setTitle] = useState(""); 
    const [user, setUser] = useState(""); 
    const [campground, setCampground] = useState(""); 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const form = e.target as HTMLFormElement;
        const textarea = form.elements.namedItem("textarea") as HTMLTextAreaElement; // กำหนดประเภท textarea
    
        const newReview = {
            _id: String(reviews.length + 1),  
            title: title, 
            text: textarea.value, // ใช้ textarea.value แทน e.target.textarea.value
            rating: rating,
            user: user,  
            campground: campground,  
            createdAt: new Date().toISOString(),  
        };
    
        setReviews([...reviews, newReview]);  
        form.reset();  
        setRating(0);  
        setHover(0);  
        setTitle("");  
        setUser("");  
        setCampground("");  
    };
    

    return (
        <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-gradient-to-t from-green-100 to-lime-200">
            <div className="w-full px-10 my-10">
                <h2 className="text-4xl text-center bg-gradient-to-r from-green-400 to-lime-600 text-white w-fit mx-auto px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-2">
                    ⭐ <span className="drop-shadow-md">Reviews</span> ⭐
                </h2>

                <div className="flex flex-wrap gap-6 justify-center mt-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="w-full sm:w-[80%] md:w-1/2 lg:w-1/3 flex justify-center p-3">
                            <div className="bg-white shadow-xl rounded-xl border border-gray-300 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative">
                                <div className="absolute top-5 right-5 text-lime-400">
                                    <ChatBubbleBottomCenterTextIcon className="w-10 h-10" />
                                </div>
                                <ReviewCard mockReviews={review} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    
            <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-lg w-[90%] max-w-lg">
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
                        <input 
                            type="text" 
                            name="user" 
                            value={user} 
                            onChange={(e) => setUser(e.target.value)} 
                            placeholder="Your Name" 
                            className="bg-gray-100 text-gray-600 w-full p-3 border border-gray-300 rounded-lg placeholder:text-gray-500"
                        />
                    </div>

                    <div className="mb-4">
                        <input 
                            type="text" 
                            name="campground" 
                            value={campground} 
                            onChange={(e) => setCampground(e.target.value)} 
                            placeholder="Campground Name" 
                            className="bg-gray-100 text-gray-600 w-full p-3 border border-gray-300 rounded-lg placeholder:text-gray-500"
                        />
                    </div>

                    <textarea name="textarea" placeholder="Your feedback..." className="bg-gray-100 text-gray-600 w-full h-28 placeholder:text-gray-500 border border-gray-300 rounded-lg p-3 resize-none outline-none focus:border-gray-500"></textarea>
                    
                    <button type="submit" className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg mt-4 w-full transition-all duration-300 hover:bg-green-600">
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
}
