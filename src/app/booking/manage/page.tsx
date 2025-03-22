'use client';
import BookingCard from "@/components/BookingCard";
import Link from "next/link";
import GoBackButton from "@/components/Gobackbutton";
import getBookings from "@/libs/bookings/getBookings";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "@/components/load";

export default function ManagePage() {

    const { data: session } = useSession();
    const [bookingData, setBookingData] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = (await getBookings(session?.user?.token || "", "")).data;
                console.log(response.data)
                response.sort((a, b) => new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime());
                setBookingData(response);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        if (session?.user?.token) {
            fetchBookings();
        }
    }, [session?.user?.token]);

    console.log("Booked Data:", bookingData)
    return (
        
        <div className="bg-white w-full flex flex-col">
        <div className="min-h-screen flex flex-col items-center px-4 bg-gradient-to-t from-transparent to-emerald-200">

               
            <div className=" w-full flex flex-col  px-2 py-10 items-center">
            <div className="flex flex-row gap-6 mb-6  pb-4">
            <h2 className="text-4xl text-center bg-gradient-to-r from-white to-white text-white w-fit mx-auto px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
            ✅  <span className="text-emerald-600 drop-shadow-md ">Your booking</span> ✅
            </h2>
            </div>
            
            
            {bookingData.length === 0 ? (
                <div className="m-10"><Loader /></div>
            ) : null}
            <div className="flex flex-col w-4/5 items-center gap-6">
                {bookingData.map((booking) => (
                    <BookingCard key={booking._id} bookingData={booking} />
                ))}
            </div>
            </div>
        </div>
        </div>
  );
}