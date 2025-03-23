import { Rating } from "@mui/material";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import getUserList from "@/libs/users/getUserList";

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

export default function ReviewCard({ reviews }: { reviews: Review }) {
    let campgroundName = reviews.campground.name
    
    const [userData, setUserData] = useState<any>({
        _id: "",
        name: "Loading...",
        email: "",
        picture: "user-icon.png",
        tel: "",
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await getUserList()
                const users = Array.isArray(response) ? response : response.data;
                const foundUser = users.find((u: any) => u._id === reviews.user);
                if (!foundUser.picture) {
                    foundUser.picture = "/img/avatar-1.png";
                }
                setUserData(foundUser)
                console.log(foundUser)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        })();
    }, []);

    return (
        <div className="px-5 py-10 flex flex-col w-fit bg-white rounded-lg shadow-lg m-2 p-2">
            <Rating
                name="text-feedback"
                value={Math.ceil(reviews.rating / 2.0)}
                readOnly
                precision={0.5}
                emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />} 
                icon={<Star style={{ fill: "gold", opacity: 1 }} fontSize="inherit" />}  
                size="large"
                sx={{ fontSize: "2rem" }}
            />
            <h2 className="text-[25px] font-bold">{reviews.title}</h2>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <img src={userData.picture} className="w-6" alt="icon" />
                    <p className="text-[10px] px-2 text-gray-500">{userData.name}</p>
                </div>
                <p className="mx-2">on</p>
                <div className="mx-3 bg-slate-200 w-fit rounded-2xl px-2 flex flex-row items-center">
                    <img src="/img/camp-logo.png" className="w-6 rounded-full py-2" alt="icon" />
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
    );
}