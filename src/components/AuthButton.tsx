"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { LogIn, LogOut, MoreVertical } from "lucide-react";
import Sidebar, { SidebarItem } from "@/components/Sidebar";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
const AuthButton = () => {

    
    const { data: session } = useSession();
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="border-t flex w-full flex-col">
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
                        <MoreVertical size={20} />
                    </div>
                    <div className="mt-0">
                        <SidebarItem
                            icon={<LogOut size={20} />}
                            text="Log Out"
                            pageRef="/api/auth/signout"
                            active
                        />
                    </div>
                </>
            ) : (
                <SidebarItem
                    icon={<LogIn size={20} />}
                    text="Log In"
                    pageRef='/api/auth/signin'
                />
            )}
        </div>
    );
};

export default AuthButton;
