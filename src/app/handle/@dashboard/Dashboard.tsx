import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import getMe from "@/libs/users/getMe";
import { useState } from "react";

interface Camp {
  name: string;
  address: string;
  tel: string;
  price: number;
  capacity: number;
  description: string;
  image: string;
}

const addCamp = async (addCampForm: FormData) => {
  "use server";

  const camp: Camp = {
    name: addCampForm.get("name") as string,
    address: addCampForm.get("address") as string,
    tel: addCampForm.get("tel") as string,
    price: Number(addCampForm.get("price")),
    capacity: Number(addCampForm.get("seats")),
    description: addCampForm.get("desc") as string,
    image: addCampForm.get("picture") as string,
  };

  console.log(camp);

  revalidateTag('Camps');
  redirect('/Camp');
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) {
    return null;
  }

  const profile = await getMe(session.user.token);
  const createdAt = new Date(profile.data.createdAt);

  const [isEditing, setIsEditing] = useState(false);
  const [editingCamp, setEditingCamp] = useState<Camp | null>(null);

  const handleEdit = (camp: Camp) => {
    setIsEditing(true);
    setEditingCamp(camp); 
  };

  return (
    <main className=" m-5 p-5">
      <div className="text-3xl font-semibold text-green-700">{profile.data.name}</div>
      <table className="table-auto border-separate border-spacing-4 mt-5">
        <tbody>
          <tr><td className="font-medium text-gray-600">Email</td><td>{profile.data.email}</td></tr>
          <tr><td className="font-medium text-gray-600">Tel</td><td>{profile.data.tel}</td></tr>
          <tr><td className="font-medium text-gray-600">Member Since</td><td>{createdAt.toLocaleDateString()}</td></tr>
        </tbody>
      </table>

      {profile.data.role === "admin" ? (
        <form action={addCamp} className="mt-6 space-y-6">
          <div className="text-2xl text-green-700 font-semibold">Create New Camp</div>

          <div className="flex flex-col w-1/2 mx-auto space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">Camp Name</label>
              <input type="text" required id="name" name="name" placeholder="Camp Name" className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm" />
            </div>

            <div>
              <label htmlFor="address" className="block text-gray-700">Address</label>
              <input type="text" required id="address" name="address" placeholder="Camp Address" className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm" />
            </div>

            <div>
              <label htmlFor="tel" className="block text-gray-700">Phone Number</label>
              <input type="text" required id="tel" name="tel" placeholder="Phone Number" className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm" />
            </div>

            <div>
              <label htmlFor="price" className="block text-gray-700">Price</label>
              <input type="number" required id="price" name="price" placeholder="Price" className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm" />
            </div>


            <div>
              <label htmlFor="desc" className="block text-gray-700">Description</label>
              <input type="text" required id="desc" name="desc" placeholder="Camp Description" className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm" />
            </div>

            <div>
              <label htmlFor="picture" className="block text-gray-700">Image URL</label>
              <input type="text" required id="picture" name="picture" placeholder="Image URL" className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm" />
            </div>

            <div>
              <label htmlFor="imageCap" className="block text-gray-700">Image Capacity</label>
              <input type="number" required id="imageCap" name="imageCap" placeholder="imageCap" className="bg-white border-2 border-gray-300 rounded w-full p-3 focus:outline-none focus:border-green-500 shadow-sm" />
            </div>


            <div className="text-center">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg w-full mt-4 transition duration-300 ease-in-out">
                Add New Camp
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </main>
  );
}
