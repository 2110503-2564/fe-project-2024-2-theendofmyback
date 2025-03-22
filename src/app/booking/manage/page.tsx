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
        <div className="bg-white w-full flex flex-col  px-2 py-10 ">
        <Link href="/booking">
                <div className="absolute top-0 left-0 flex justify-start relative"> 
                <GoBackButton name="Booking" />
                </div>
            </Link>            
            <div className=" w-full flex flex-col  px-2 py-10 items-center">
            <h1 className="text-[40px] font-extrabold">Your Booking</h1>
            

            {bookingData.length === 0 ? (
                <div className="m-10"><Loader /></div>
            ) : null}
            <div className="flex flex-col w-4/5 items-center">
                {bookingData.map((booking) => (
                    <BookingCard key={booking._id} bookingData={booking} />
                ))}
            </div>
            </div>
        </div>

  );
}