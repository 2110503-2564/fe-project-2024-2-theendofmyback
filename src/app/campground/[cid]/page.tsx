import ReviewCard from "@/components/ReviewCard";
import ReviewSlider from "@/components/ReviewSlider";
import PromotionCard from "@/components/PromotionCard";
import PromotionSlider from "@/components/PromotionSlider";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import getCampground from "@/libs/campgrounds/getCampground";
import getReview from "@/libs/reviews/getReviews";

interface Review {
    _id: string;
    title: string;
    text: string;
    rating: number;
    campground: string;
    user: string;
    createdAt: string;
}

interface Promotion {
    _id: string;
    name: string;
    campground: string;
    description: string;
    discount: number;
}

export default async function CampgroundPage({params} : { params: {cid:string}}) {
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

    /*const campInfo = {
        Name: "The LaBaLaKe Camp",
        Address: "123 Forest Road, Rocky Hills",
        Tel: "555-1234",
        Price: "25",
        Capacity: "60",
        Description: "A lakeside camp with outdoor activities",
        picture: "/img/lakeside.jpg"
      };*/

    
    const campInfo:Campground =(await getCampground(params.cid)).data;
    if (campInfo.image[0] !== '/') {
        campInfo.image = '/' + campInfo.image;
    }

    const queryReview = `?campground=${params.cid}`;
    let allReviews: Review[] = [];

    try {
        const response = await getReview(queryReview);
        if (response && response.data) {
            allReviews = response.data; 
        } else {
            console.error("Unexpected response format:", response);
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
    } 
    

    return(
        <div className="bg-white w-full p-5"> 
            <Link href={'/campground'}>
                <div>
                    <ArrowLeft className="w-6 h-6 text-black" />
                </div>
            </Link> 
            <div className="px-10 mt-9 w-full flex flex-row items-center justify-between">
                <h2 className="px-2 my-2 font-bold text-[30px] font-sans">{campInfo.name}</h2>
                <button className="bg-orange-300 hover:bg-orange-400 text-white px-6 py-4 rounded-3xl m-2 font-bold text-lg text-[30px]">
                    Book
                </button>
            </div>

            <div className="px-10 w-full flex flex-col">
                <div className="flex flex-row items-center bg-green-100 w-fit p-2 my-1 rounded-3xl">
                    <img src={"/img/cedt-coin.png"} className="w-10 inline-block" />
                    <h2 className="text-green-700 px-2 font-bold text-[25px] font-sans">{campInfo.price}</h2>
                </div>
                <img src={campInfo.image} className="my-10 w-full h-[300px] object-cover" ></img>
                
                <p className="my-2 font-medium text-[20px] font-sans">{campInfo.description}</p>    
                <div className="flex flex-row bg-slate-200 w-fit p-2 my-2 rounded-lg font-medium relative group">
                    <img src="/img/location-icon.png" alt="location" className="w-6 h-6 inline-block" />
                    <p className="px-2">{campInfo.address}</p>  

                    <div className="absolute bottom-11 left-2 z-10 hidden group-hover:block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-xs dark:bg-gray-700">
                        Address
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                
                <div className="flex flex-row bg-slate-200 w-fit p-2 my-2 rounded-lg font-medium relative group">
                    <img src="/img/tel-icon.png" alt="location" className="w-6 h-6 inline-block" />
                    <p className="px-2">{campInfo.tel}</p>  

                    <div className="absolute bottom-11 left-2 z-10 hidden group-hover:block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-xs dark:bg-gray-700">
                        Contact
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
            
                <div className="flex flex-row bg-slate-200 w-fit p-2 my-2 rounded-lg font-medium relative group">
                    <p className="px-2">Capacity: {campInfo.capacity}</p>      
                    <div className="absolute bottom-11 left-2 z-10 hidden group-hover:block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-xs dark:bg-gray-700">
                        capacity
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
            </div>

            <div className="w-full border-t-2 border-gray-300 my-8"></div>
            <div>
                <ReviewSlider allReviews = {allReviews}/>
                <div className="w-full border-t-2 border-gray-300 my-8"></div>
                <PromotionSlider />
            </div>

        </div>
    );
}