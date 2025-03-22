"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import styles from './banner.module.css';
import getMe from "@/libs/users/getMe";
import getBookings from "@/libs/bookings/getBookings";

const Info = () => {

    const { data: session } = useSession();
    const [expanded] = useState(true);

    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("/img/avatar-1.png");
    const [isEditing, setIsEditing] = useState(false);
    const [bookingData, setBookingData] = useState<any[]>([]);

    useEffect(() => {
        if (session?.user?.token) {
            const fetchUserData = async () => {
                try {
                    const response = await getMe(session.user.token);
                    setName(response.data.name);
                    setTel(response.data.tel);
                    setAddress(response.data.address);
                    setEmail(response.data.email);
                    setPicture(response.data.picture);
                    console.log("User Data:", response);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserData();
        }
    }, [session]);

    useEffect(() => {
        if (session?.user?.token) {
            const fetchBookingData = async () => {
                try {
                    const bookingResponse = await getBookings(session.user.token);
                    const sortedBookingData = bookingResponse.data.sort((a: any, b: any) => new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime());
                    setBookingData(sortedBookingData);
                    console.log("Booking Data:", sortedBookingData);
                } catch (error) {
                    console.error('Error fetching booking data:', error);
                }
            };

            fetchBookingData();
        }
    }, [session]);

    return (
        <div className="flex w-full flex-col">
            {session ? (
                <>
                    <div className="flex items-center space-x-3">
                        <img
                            src={picture || "/img/avatar-1.png"} 
                            alt="User Avatar"
                            className="w-10 h-10 rounded-md"
                        />
                        <div
                            className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
                        >
                            <div className="flex">
                                <div className="leading-4">
                                    <h4 className="font-semibold">{name || "User"}</h4>
                                    <span className="text-xs text-gray-600">
                                        {email || "user@gmail.com"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Link href={`/account/${session.user?._id}`}>
                            <MoreVertical size={20} />
                        </Link>
                    </div>
                    <div className="mt-3 text-xs text-green-500">
                        <Link href="/api/auth/signout">
                            Sign-Out of {name || "User"}
                        </Link>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <Link href="/api/auth/signin">
                        <button className={styles.SignButton}>
                            sign in
                        </button>
                    </Link>
                    <div className="mt-3 text-xs text-green-500">
                        <Link href="/api/auth/signup">
                            do not have an account? Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Info;
