'use client';

import { ChatBubbleBottomCenterTextIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/solid'; 
import ReviewCard from "@/components/ReviewCard";
import { useEffect, useState } from "react";
import getReview from '@/libs/reviews/getReviews';
import getCampgrounds from '@/libs/campgrounds/getCampgrounds';
import { useSession } from 'next-auth/react';
import createReview from '@/libs/reviews/createReviews';
import Loader from '@/components/load';
import Swal from 'sweetalert2';

export default function Review() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviews, setReviews] = useState<any[]>([]);  
    const [title, setTitle] = useState(""); 
    const [campground, setCampground] = useState("");
    const [allCampgrounds, setAllCampgrounds] = useState<any[]>([]);
    const [enableCreate, setEnableCreate] = useState(false);
    const [selectedCampground, setSelectedCampground] = useState("all");
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reviewData = (await getReview(""))?.data || [];
                reviewData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                const allCamps = (await getCampgrounds(""))?.data || [];
                setAllCampgrounds(allCamps);
                setReviews(reviewData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const textarea = form.elements.namedItem("textarea") as HTMLTextAreaElement;
        
        createReview(
            session?.user?.token || '',
            title, 
            textarea.value,
            campground || '',
            rating * 4
        ).then(() => {
            Swal.fire({
                      title: "Review created successfully!",
                      icon: "success",
                      draggable: true
                    });
            window.location.reload();
        });
    };

    const [filteredReviews, setFilteredReviews] = useState<any[]>([]);

    useEffect(() => {
        const filterReviews = () => {
            const filtered = selectedCampground === "all" 
                ? reviews 
                : reviews.filter(review => review.campground._id === selectedCampground);
            setFilteredReviews(filtered);
        };
        filterReviews();
    }, [selectedCampground, reviews]);

    return (
        <div className="min-h-screen flex flex-col items-center px-6 py-12 bg-gradient-to-t from-lime-100 to-teal-200">
            <div className="flex flex-col items-center w-full max-w-4xl mb-6">
                <h2 className="text-5xl bg-gradient-to-r from-white to-white text-emerald-700 px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
                    ⭐ Reviews ⭐
                </h2>
                <button
                    onClick={() => setEnableCreate(!enableCreate)}
                    className={`mt-4 px-6 py-3 rounded-full font-bold text-white transition-all duration-300 shadow-md flex items-center gap-2 ${
                        enableCreate ? 'bg-red-500 hover:bg-red-600' : 'bg-teal-500 hover:bg-lime-400'
                    }`}
                >
                    {enableCreate ? <XMarkIcon className="w-5 h-5" /> : '+ Create Review'}
                </button>
            </div>
            
            <div className="w-full max-w-lg mb-6">
                <select
                    value={selectedCampground}
                    onChange={(e) => setSelectedCampground(e.target.value)}
                    className="bg-gray-100 text-emerald-600 w-full p-3 border border-green-300 rounded-lg"
                >
                    <option value="all">All Reviews</option>
                    {allCampgrounds.map((camp) => (
                        <option key={camp._id} value={camp._id}>{camp.name}</option>
                    ))}
                </select>
            </div>

            {enableCreate && (
                 <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-lg w-full max-w-lg">
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
                         <input 
                             type="text" 
                             value={title} 
                             onChange={(e) => setTitle(e.target.value)} 
                             placeholder="Review Title" 
                             className="bg-gray-100 text-gray-600 w-full p-3 border border-gray-300 rounded-lg placeholder:text-gray-500 mb-3"
                         />
                         <select
                             value={campground}
                             onChange={(e) => setCampground(e.target.value)}
                             className="bg-gray-100 text-gray-600 w-full p-3 border border-gray-300 rounded-lg mb-3"
                         >
                             <option value="" disabled>Select Campground</option>
                             {allCampgrounds.map((camp) => (
                                 <option key={camp._id} value={camp._id}>{camp.name}</option>
                             ))}
                         </select>
                         <textarea name="textarea" placeholder="Your feedback..." className="bg-gray-100 text-gray-600 w-full h-28 border border-gray-300 rounded-lg p-3 resize-none outline-none focus:border-gray-500 mb-3"></textarea>
                         <button type="submit" className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg w-full transition-all duration-300 hover:bg-green-600">
                             Submit Review
                         </button>
                     </form>
                 </div>
             )}

            {filteredReviews.length === 0 ? (
                <div className="flex flex-col justify-center items-center p-10 mx-auto w-full max-w-4xl">
                    <div className="animate-spin-slow">
                        <Loader />
                    </div>
                    <p className="mt-4 text-2xl text-teal-700 font-semibold">Please wait...</p>
                </div>
            ) : 
                <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {filteredReviews.map((review) => (
                        <div className="bg-white shadow-xl rounded-xl border border-gray-300 p-6 w-full max-w-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl relative">
                        <div className="absolute top-4 right-4 text-lime-400">
                            <ChatBubbleBottomCenterTextIcon className="w-8 h-8" />
                        </div>
                        <ReviewCard reviews={review} />
                    </div>
                    ))}
                </div>
            }
        </div>
    );
}
