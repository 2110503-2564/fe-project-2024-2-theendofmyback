import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar, { SidebarItem } from "@/components/Sidebar";
import { BarChart3, Book, Home, LayoutDashboard, LifeBuoy, Newspaper, Settings, User, UserCircle } from "lucide-react";
import SessionProviderWrapper from "@/components/SessionProviderWrapper ";
import { Suspense } from "react";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campground Booking",
  description: "the end of my back",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProviderWrapper> 
        <div className="flex h-screen w-full">
          
          <Sidebar>
        
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Home" pageRef = '/'/>
        <SidebarItem icon={<Home size={20} />} text="Campground" pageRef = '/campground' />
        <SidebarItem icon={<Book size={20} />} text="Booking" pageRef = '/booking/manage' />
        <SidebarItem icon={<Newspaper size={20} />} text="Promotion" pageRef = '/promotion' />
        <SidebarItem icon={<BarChart3 size={20} />} text="Review"  pageRef = '/review'/>
        
        <hr className="my-3" />
        
        <SidebarItem icon={<UserCircle size={20} />} text="User" pageRef = '/account/1' />
        <SidebarItem icon={<LifeBuoy size={20} />} text="AboutUs" pageRef = '/about' />
          
          </Sidebar>

          <main className="flex-1 bg-gray-100 overflow-auto ">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
          </main>
        </div>
      </SessionProviderWrapper> 
      </body>
    </html>
  );
}
