'use client';

import BookingCard from "@/components/BookingCard";
import Link from "next/link";
import GoBackButton from "@/components/Gobackbutton";


export default function ManagePage() {

    const mockBookings = [
        {
            _id: "67bf2d872bb021e49823add4",
            user: "67bf18029a6366536b150330",
            campground: "67bd6dfcd3e3272696f5243d",
            checkInDate: "2025-02-26T00:00:00.000+00:00",
            checkOutDate: "2025-02-27T00:00:00.000+00:00",
            bookingAt: "2025-02-26T15:04:39.865+00:00"
        },
        {
            _id: "67c02a12fbb0a1e4a90abc22",
            user: "67c018fa3e6f4a127b2cd560",
            campground: "67bd6e89a1d3272696f52abc",
            checkInDate: "2025-03-01T00:00:00.000+00:00",
            checkOutDate: "2025-03-03T00:00:00.000+00:00",
            bookingAt: "2025-02-28T12:30:15.420+00:00"
        },
        {
            _id: "67c02b34b2c0f1e5d73ed789",
            user: "67bf19c05a7366536b156f42",
            campground: "67bd6e12b8d3272696f52def",
            checkInDate: "2025-04-10T00:00:00.000+00:00",
            checkOutDate: "2025-04-12T00:00:00.000+00:00",
            bookingAt: "2025-03-15T10:20:45.789+00:00"
        },
        {
            _id: "67c02d56c3d1a2e6c81ff671",
            user: "67bf1ac29b8366536b159037",
            campground: "67bd6e45c3d3272696f52f12",
            checkInDate: "2025-05-05T00:00:00.000+00:00",
            checkOutDate: "2025-05-07T00:00:00.000+00:00",
            bookingAt: "2025-04-20T18:45:30.560+00:00"
        },
        {
            _id: "67c02f89e4d3b3e7d92ff523",
            user: "67bf1bc34c9366536b15aabc",
            campground: "67bd6e78d4e3272696f53123",
            checkInDate: "2025-06-15T00:00:00.000+00:00",
            checkOutDate: "2025-06-18T00:00:00.000+00:00",
            bookingAt: "2025-06-01T14:10:22.350+00:00"
        }
    ];
    

    return (
        <div className="bg-white w-full flex flex-col  px-2 py-10 ">
        <Link href="/booking">
                <div className="absolute top-0 left-0 flex justify-start relative"> 
                <GoBackButton name="Booking" />
                </div>
            </Link>            
            <div className=" w-full flex flex-col  px-2 py-10 items-center">
            <h1 className="text-[40px] font-extrabold">Your Booking</h1>
            

            <div className="flex flex-col w-4/5 items-center">
                {mockBookings.map((booking) => (
                    <BookingCard key={booking._id} bookingData={booking} />
                ))}
            </div>
            </div>
        </div>

  );
}