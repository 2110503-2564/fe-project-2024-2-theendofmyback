import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import getMe from "@/libs/users/getMe";

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

  return (
    <main className="bg-slate-100 m-5 p-5">
      <div className="text-2xl">{profile.data.name}</div>
      <table className="table-auto border-separate border-spacing-2">
        <tbody>
          <tr><td>Email</td><td>{profile.data.email}</td></tr>
          <tr><td>Tel</td><td>{profile.data.tel}</td></tr>
          <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
        </tbody>
      </table>

      {profile.data.role === "admin" ? (
        <form action={addCamp}>
          <div className="text-xl text-blue-700">Create Camp </div>
          
          <div className='flex items-center w-1/2 my-2'>
            <label className='w-auto block text-gray-700 pr-4' htmlFor="name">Camp Name</label>
            <input type='text' required id='name' name='name' placeholder='Camp Name' className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />
          </div>
          
          <div className='flex items-center w-1/2 my-2'>
            <label className='w-auto block text-gray-700 pr-4' htmlFor="address">Address</label>
            <input type='text' required id='address' name='address' placeholder='Camp Address' className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />
          </div>
          
          <div className='flex items-center w-1/2 my-2'>
            <label className='w-auto block text-gray-700 pr-4' htmlFor="tel">Tel</label>
            <input type='text' required id='tel' name='tel' placeholder='Phone Number' className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />
          </div>
          
          <div className='flex items-center w-1/2 my-2'>
            <label className='w-auto block text-gray-700 pr-4' htmlFor="price">Price</label>
            <input type='number' required id='price' name='price' placeholder='Price' className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />
          </div>

          <div className='flex items-center w-1/2 my-2'>
            <label className='w-auto block text-gray-700 pr-4' htmlFor="seats">Seats</label>
            <input type='number' required id='seats' name='seats' placeholder='4' min={0} max={50} className='bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400' />
          </div>
          
          <div className='flex items-center w-1/2 my-2'>
            <label className='w-auto block text-gray-700 pr-4' htmlFor="desc">Description</label>
            <input type='text' required id='desc' name='desc' placeholder='Camp Description' className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />
          </div>
          
          <div className='flex items-center w-1/2 my-2'>
            <label className='w-auto block text-gray-700 pr-4' htmlFor="picture">Picture</label>
            <input type='text' required id='picture' name='picture' placeholder='URL' className='bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400' />
          </div>

          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded'>
            Add New Camp
          </button>
        </form>
      ) : null}
    </main>
  );
}
