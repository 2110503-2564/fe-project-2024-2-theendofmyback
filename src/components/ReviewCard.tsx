import { Rating } from "@mui/material";
import { StarIcon } from "lucide-react";
import Link from "next/link";

export default function ReviewCard(){
    const mockReviews =  {
        _id: "67bd8e632189ebec0206ba2d",
        title: "Not what I expected",
        text: "The place was overcrowded, and the lake was not as clean as I hoped. The staff was friendly, but the facilities were not well-maintained.",
        rating: 2,
        campground: "67bd6dfcd3e3272696f5243d",
        user: "67bd7a3612afc095dad3b5f8",
        createdAt: "2025-02-15T08:45:30.890+00:00",
    };

    return (
        <div className="px-5 py-10 flex flex-col w-fit bg-white rounded-lg shadow-lg m-2 p-2">

           <Rating
                name="text-feedback"
                value={mockReviews.rating/2.0}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                size="large"
                sx={{ fontSize: "3rem" }}
                />
           
            <h2 className="text-[30px] font-bold">{mockReviews.title}</h2>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <img src="/img/user-icon.png " className="w-6" alt="icon"/>
                    <p className="px-2 text-gray-500">{mockReviews.user}</p>
                </div>
                <p className="mx-2">on</p>
                <Link href={`/campground/${mockReviews.campground}`}>
                    <div className="mx-3 bg-slate-200 w-fit rounded-2xl px-2 flex flex-row items-center">
                        <img src="/img/camp-logo.png" className="w-6 rounded-full py-2" alt="icon"/>
                        <p className="px-2 text-gray-500">{mockReviews.campground}</p>
                    </div>
                </Link>
            </div>       
            <div className="flex flex-col justify-center items-center max-w-[500px]">
                <p className="text-md my-3 py-3 px-6 border-2 border-gray-200 rounded-lg whitespace-normal break-words">
                    {mockReviews.text}
                </p>
            </div>    

            <div className="w-full flex justify-end">
                <p className="text-gray-500 text-sm text-right">{mockReviews.createdAt}</p>
            </div>
            

        </div>
    )
}