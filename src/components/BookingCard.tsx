"use client";
import { Pen, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface Booking {
  _id: string;
  user: string;
  campground: string;
  checkInDate: string;
  checkOutDate: string;
  bookingAt: string;
}

export default function BookingCard({ bookingData }: { bookingData: Booking }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="p-4 w-full bg-white  hover:bg-slate-100 rounded-lg m-2">
      <div className="flex flex-row items-center justify-between">
        <p className="text-[25px] font-bold">Mountain View</p>
        <div className="flex flex-row items-center">
          <Pen className="w-10 p-1 text-white mr-2 bg-green-400 rounded-lg hover:bg-emerald-600 cursor-pointer" />
          {
            confirmDelete? (
                <div className="flex flex-row items-center px-2  bg-red-400 rounded-lg hover:bg-red-600 cursor-pointer">
                <p className="text-white font-bold">Confirm</p>
                <Trash2
                    className="w-10 p-1 text-white"
                    onClick={() => setConfirmDelete(false)} //actual delete function
                />
            </div>
            )
            :(<Trash2
                className="w-10 p-1 text-white bg-red-400 rounded-lg hover:bg-red-600 cursor-pointer"
                onClick={() => setConfirmDelete(true)}
              />)
          }
          
          
        </div>
      </div>

      

      <div className="bg-slate-100 p-2 rounded-md flex flex-row items-center ">
        <img src="/img/mountain-view.jpg" className="w-30 rounded-md" alt="Mountain View" />
        <div className="mx-5">
          <div>
            <p className="text-md bg-teal-200 w-fit rounded-lg px-2">
              {`${Math.ceil(
                (new Date(bookingData.checkOutDate).getTime() - new Date(bookingData.checkInDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )} days`}
            </p>
          </div>
          <div className="flex flex-row items-center my-2">
            <p className="text-md">Check-In Date: </p>
            <p className="mx-2 text-md px-2 bg-slate-300 w-fit rounded-lg">
              {new Date(bookingData.checkInDate).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-row items-center my-2">
            <p className="text-md">Check-Out Date: </p>
            <p className="mx-2 text-md px-2 bg-slate-300 w-fit rounded-lg">
              {new Date(bookingData.checkOutDate).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-row items-center my-2">
            <p className="text-md">Booking At: </p>
            <p className="mx-2 text-md px-2 bg-slate-300 w-fit rounded-lg">
              {new Date(bookingData.bookingAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
