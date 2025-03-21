import Banner from "@/components/Banner";
import Sidebar, { SidebarItem } from "@/components/Sidebar";
import { BarChart3, LayoutDashboard, LifeBuoy, Settings, UserCircle } from "lucide-react";
import FavCard from "@/components/favCard";

export default function Home() {
  return (
    <main>
      <Banner/>
      <div className="flex flex-row justify-between items-center p-4">
      <FavCard/>
      <FavCard/>
      <FavCard/>
      <FavCard/>
      </div>

    </main>
  );
}
