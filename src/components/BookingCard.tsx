"use client";
import { Pen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import deleteBooking from "@/libs/bookings/deleteBooking";
import { useSession } from "next-auth/react";
import Link from "next/link";
import getPromotions from "@/libs/promotions/getPromotions";
import getUserList from "@/libs/users/getUserList";
import { Booking , UserData} from "../../interface";

export default function BookingCard({ bookingData, isAdmin }: { bookingData: Booking, isAdmin:boolean }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { data: session } = useSession()
  
    useEffect(() => {
      (async () => {
        try {
          const response = await getUserList()
          const users = Array.isArray(response) ? response : response.data;
          const foundUser = users.find((u: any) => u._id === bookingData.user);
          console.log(foundUser)
          setUserData(foundUser)
          const promotions = (await getPromotions("")).data;
        } catch (error) {
          console.error("Error fetching", error);
        }
      })();
    }, [session]);

  const handleDelete = (): void => {
    if (confirmDelete) {
      console.log(`Deleting booking with ID: ${bookingData._id}`);
      setConfirmDelete(false);
      deleteBooking(
        session?.user?.token || '',
        bookingData._id
      ).then(
        () => {
          console.log("Booking deleted successfully.");
          window.location.reload();
        }
      )

    } else {
      console.log("Delete not confirmed yet.");
    }
  };

  return (
    <div className="p-4 w-full bg-white hover:bg-green-50 rounded-xl shadow-md transition duration-300">
      <div className="flex items-center justify-between border-b pb-3 mb-3">
        <p className="text-xl font-semibold text-green-700">{bookingData.campground.name}</p>
        <div className="flex items-center space-x-2">
            <Link href={`/booking/${bookingData._id}?id=${bookingData.campground._id}`}>
            <Pen className="w-8 p-2 text-white bg-green-500 rounded-lg hover:bg-green-600 cursor-pointer transition duration-200" />
            </Link>
          {confirmDelete ? (
            <div className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition duration-200" 
            
            onClick={() => handleDelete()}>
              <p className="text-sm font-semibold">Confirm</p>
              <Trash2 className="w-5" />
            </div>
          ) : (
            <Trash2 className="w-8 p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 cursor-pointer transition duration-200" onClick={() => setConfirmDelete(true)} />
          )}
        </div>
      </div>

      <div className="bg-green-50 p-3 rounded-lg flex flex-col md:flex-row items-center md:items-start">
        <img src={bookingData.campground.image} className="w-full md:w-40 h-auto rounded-lg object-cover" alt="Mountain View" />
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
            
            {
              isAdmin?(<>
                <div className="flex flex-col sm:col-span-1">
                  <span className="font-medium">Booking At:</span>
                  <span className="bg-green-100 px-2 py-1 rounded-md">{new Date(bookingData.bookingAt).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-col sm:col-span-1">
                  <span className="font-medium">Booking By:</span>
                  <span className="bg-green-100 px-2 py-1 rounded-md">
                    <span className="relative group">
                      {userData?.name || "Unknown"}
                        <div className="absolute left-0 mt-2 w-64 p-3 bg-white border border-gray-300 rounded-lg shadow-lg text-sm text-gray-700 hidden group-hover:block">
                        <div className="flex flex-row items-center space-x-3">
                          <img
                          src={userData?.picture || "/img/avatar-1.png"}
                          alt="User Profile"
                          className="w-12 h-12 p-1 border-2 border-green-500 rounded-full object-cover mb-2 shadow-md"
                          />
                          <div className="flex flex-col">
                          <p className="text-green-700 font-semibold"><strong>Name:</strong> {userData?.name || "N/A"}</p>
                            <p className="text-gray-400 text-[10px]">ID: {userData?._id || "N/A"}</p>
                          </div>
                        </div>
                        <p><strong>Email:</strong> {userData?.email || "N/A"}</p>
                        <p><strong>Tel:</strong> {userData?.tel || "N/A"}</p>
                        </div>
                    </span>
                  </span>
                </div>
                </>
              )
              : <div className="flex flex-col sm:col-span-2">
                  <span className="font-medium">Booking At:</span>
                  <span className="bg-green-100 px-2 py-1 rounded-md">{new Date(bookingData.bookingAt).toLocaleDateString()}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}