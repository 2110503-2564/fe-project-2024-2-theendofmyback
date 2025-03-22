"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import styles from './banner.module.css';

const Info = () => {

    const { data: session } = useSession();
    const [expanded] = useState(true);

    return (
        <div className="flex w-full flex-col">
            
            {session ? (
                <>
                    <div className="flex items-center space-x-3">
                        <img
                            src="https://ui-avatars.com/api/?background=bbf7d0&color=065f46&bold=true"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-md"
                        />
                        
                        <div
                        className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
                        >
                        <div className="flex ">
                            <div className="leading-4">
                                <h4 className="font-semibold">{session.user?.name || "User"}</h4>
                                <span className="text-xs text-gray-600">
                                    {session.user?.email || "No Email"}
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
                        Sign-Out of {session.user?.name}
                        </Link>
                    </div>
                </>
            ) : (
                <div className="text-center ">
                <Link href="/api/auth/signin">
                    <button className={styles.SignButton}>
                        sign in
                    </button>
                </Link>
                
                <div className="mt-3 text-xs text-green-500">
                        <Link href="/api/auth/signup">
                        do not have an acount?  Sign Up
                        </Link>
                </div>
                </div>
            )}
        </div>
    );
};

export default Info;
