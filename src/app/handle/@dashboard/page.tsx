"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import getMe from "@/libs/users/getMe";
import Prof from "./Profile";
import CreateCamp from "./CreateCamp";
import UpdateCamp from "./UpdateCamp";
import UpdatePromotion from "./UpdatePromotion";
import CreatePromotion from "./CreatePromotion";


const mockCamp = {
  id: "1",
  name: "Sample Camp",
  address: "123 Camp Street",
  tel: "123-456-7890",
  price: 200,
  capacity: 50,
  description: "A peaceful camp located in the mountains.",
  image: "https://example.com/camp-image.jpg",
};

const mockPromotion = {
  id: "1",
  title: "Summer Sale",
  discount: 20,
  description: "Get 20% off for all bookings in summer.",
  image: "https://example.com/promotion-image.jpg",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user.token) {
    return redirect("/login");
  }

  const profile = await getMe(session.user.token);
  
  console.log("Profile:", profile);
  return (
    <div>
      {!(profile.data.role === "admin") ? 
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-gray-700">You do not have access to this page.</p>
      </div>
      :<div>
        <Prof profile={profile} />
        <CreateCamp profile={profile} token={session.user.token}/>
        <UpdateCamp profile={profile} token={session.user.token}/>
        <CreatePromotion profile={profile} token={session.user.token}/>
        <UpdatePromotion profile={profile} token={session.user.token} />
      </div>
      }
    </div>
  );
}
