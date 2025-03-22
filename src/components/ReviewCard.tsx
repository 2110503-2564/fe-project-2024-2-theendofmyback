
import getCampground from "@/libs/campgrounds/getCampground";
import { Rating } from "@mui/material";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Review {
    _id: string;
    title: string;
    text: string;
    rating: number;
    campground: string;
    user: string;
    createdAt: string;
}

interface Campground {
    _id: string;
    name: string;
    address: string;
    tel: string;
    price: number;
    capacity: number;
    description: string;
    image: string;
  }

export default function ReviewCard({reviews}: { reviews: Review }){
    //console.log(reviews);
    
    const [campgroundName, setCampgroundName] = useState<string>("Loading...");
    useEffect (() => { 
        (async () => {
            try {
                const campgroundData: Campground = await getCampground(reviews.campground._id);
                setCampgroundName(campgroundData.data.name); 
    
            } catch (error) {
                console.error("Error fetching campground data:", error);
            }
        })();
    }, []);

    
    /*const mockReviews =  {
        _id: "67bd8e632189ebec0206ba2d",
        title: "Not what I expected",
        text: "The place was overcrowded, and the lake was not as clean as I hoped. The staff was friendly, but the facilities were not well-maintained.",
        rating: 2,
        campground: "67bd6dfcd3e3272696f5243d",
        user: "67bd7a3612afc095dad3b5f8",
        createdAt: "2025-02-15T08:45:30.890+00:00",
    };*/

    return (
        <div className="px-5 py-10 flex flex-col w-fit bg-white rounded-lg shadow-lg m-2 p-2">
           <Rating
                name="text-feedback"
                value={reviews.rating/2.0}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                size="large"
                sx={{ fontSize: "2rem" }}
                />
           
            <h2 className="text-[25px] font-bold">{reviews.title}</h2>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <img src="/img/user-icon.png " className="w-6" alt="icon"/>
                    <p className="text-[10px] px-2 text-gray-500">{reviews.user}</p>
                </div>
                <p className="mx-2">on</p>
                
                    <div className="mx-3 bg-slate-200 w-fit rounded-2xl px-2 flex flex-row items-center">
                        <img src="/img/camp-logo.png" className="w-6 rounded-full py-2" alt="icon"/>
                        <p className="text-[10px] px-2 text-gray-500">{campgroundName}</p>
                    </div>
                
            </div>       
            <div className="flex flex-col justify-center items-center max-w-[500px]">
                <p className="text-md my-3 py-3 px-6 border-2 border-gray-200 rounded-lg whitespace-normal break-words">
                    {reviews.text}
                </p>
            </div>    

            <div className="w-full flex justify-end">
                <p className="text-gray-500 text-sm text-right">{reviews.createdAt}</p>
            </div>
            

        </div>
    )
}