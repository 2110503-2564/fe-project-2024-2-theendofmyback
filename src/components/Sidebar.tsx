'use client'
import { MoreVertical, ChevronLast, ChevronFirst, LayoutDashboard, BarChart3, UserCircle, Settings, LifeBuoy } from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { AuthOptions } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignButton from "./SignButtom";
import Info from "./info";

interface SidebarProps {
    children: ReactNode;
}

interface SidebarContextProps {
    expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);



export default function Sidebar({ children }: SidebarProps) {

    //const session = await getServerSession(authOptions)
    const [expanded, setExpanded] = useState(false);

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img 
                        src='/img/logo.png'
                        className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
                        alt="Logo"
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3 ">
                        {children}
                    </ul>
                </SidebarContext.Provider>

                
                <div className="border-t flex p-3">
                    
                    <div
                        className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
                    >
                        <Info/>
                    </div>
                </div>
            </nav>
        </aside>
    );
}

interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
    pageRef: string;
}

export function SidebarItem({ icon, text, active, alert, pageRef }: SidebarItemProps) {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("SidebarItem must be used within a Sidebar");
    }
    const { expanded } = context;

    return (
        <li
            className={`
                z-20
                relative flex items-center py-2 px-3 my-1
                font-medium rounded-md cursor-pointer
                transition-colors group
                ${active
                    ? "bg-gradient-to-tr from-lime-200 to-lime-100 text-lime-800 z-20 "
                    : "hover:bg-lime-50 text-gray-600 "
                }
            `}
        >
            <Link href={pageRef} className="flex items-center w-full">
                {icon}
                <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                    {text}
                </span>
            </Link>

            {alert && (
                <div
                    className={`absolute right-2 z-20 w-2 h-2 rounded bg-lime-400 ${expanded ? "" : "top-2"}`}
                />
            )}

            {!expanded && (
                <div
                    className="
                        z-20
                        absolute left-full rounded-md px-2 py-1 ml-6
                        bg-lime-200 text-lime-800 text-sm
                        invisible opacity-20 -translate-x-3 transition-all w-full
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                    "
                >
                    {text}
                </div>
            )}
        </li>
    );
}