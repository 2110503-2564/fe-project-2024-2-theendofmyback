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
    <div className="p-4 w-full bg-white hover:bg-green-50 rounded-xl shadow-md transition duration-300">
      <div className="flex items-center justify-between border-b pb-3 mb-3">
        <p className="text-xl font-semibold text-green-700">{bookingData.campground}</p>
        <div className="flex items-center space-x-2">
          <Pen className="w-8 p-2 text-white bg-green-500 rounded-lg hover:bg-green-600 cursor-pointer transition duration-200" />
          {confirmDelete ? (
            <div className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition duration-200" onClick={() => setConfirmDelete(false)}>
              <p className="text-sm font-semibold">Confirm</p>
              <Trash2 className="w-5" />
            </div>
          ) : (
            <Trash2 className="w-8 p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 cursor-pointer transition duration-200" onClick={() => setConfirmDelete(true)} />
          )}
        </div>
      </div>

      <div className="bg-green-50 p-3 rounded-lg flex flex-col md:flex-row items-center md:items-start">
        <img src="/img/mountain-view.jpg" className="w-full md:w-40 h-auto rounded-lg object-cover" alt="Mountain View" />
        <div className="mt-3 md:mt-0 md:ml-5 w-full text-green-900">
          <p className="text-sm bg-green-200 px-3 py-1 w-fit rounded-full">
            {`${Math.ceil(
              (new Date(bookingData.checkOutDate).getTime() - new Date(bookingData.checkInDate).getTime()) / (1000 * 60 * 60 * 24)
            )} days`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm">
            <div className="flex flex-col">
              <span className="font-medium">Check-In:</span>
              <span className="bg-green-100 px-2 py-1 rounded-md">{new Date(bookingData.checkInDate).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Check-Out:</span>
              <span className="bg-green-100 px-2 py-1 rounded-md">{new Date(bookingData.checkOutDate).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-col sm:col-span-2">
              <span className="font-medium">Booking At:</span>
              <span className="bg-green-100 px-2 py-1 rounded-md">{new Date(bookingData.bookingAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}