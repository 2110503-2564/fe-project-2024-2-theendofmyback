'use client';
import { useEffect, useState } from 'react';
import getMe from '@/libs/users/getMe';
import { useSession } from 'next-auth/react';

export default function AccountPage() {
   
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("img/avatar-1.png");
    const [isEditing, setIsEditing] = useState(false);

    const { data: session } = useSession()
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (session && session.user.token) {
                    const response = await getMe(session.user.token);
                    setName(response.data.name);
                    setTel(response.data.tel);
                    setAddress(response.data.address);
                    setEmail(response.data.email);
                    setPicture(response.data.picture);
                    console.log(response);
                } else {
                    console.error('Session or token is null');
                    <div>Session or token is null</div>
                }
                
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [session]);
    


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({ name, tel, address });
    };

    const profileImages = [
        '/img/avatar-1.png',
        '/img/avatar-2.png',
        '/img/avatar-3.png',
        '/img/avatar-4.png',
    ];

    return (
        
        <div className="max-w-4xl mx-auto p-6 ">
        
        <div className='p-4'>
        <h2 className="p-6 text-3xl text-center bg-gradient-to-r from-emerald-300 to-lime-500 text-white w-fit mx-auto px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
  ⭐        <span className="drop-shadow-md">{name}'s Account</span> ⭐
        </h2>
        </div>

            <div className="relative bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 border border-gray-200">

                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img src={picture} alt="Profile" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-emerald-800">{name}</h2>
                    <p className="text-emerald-600">{email}</p>
                    <p className="text-emerald-700"><strong>Tel:</strong> {tel}</p>
                    <p className="text-emerald-700"><strong>Address:</strong> {address}</p>
                </div>

                <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-3 right-3 bg-green-600 text-white px-4 py-1 rounded-md shadow-md hover:bg-green-500 transition-all duration-300"
                >
                    Edit
                </button>
            </div>

            {isEditing && (
                <div className="mt-6 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="bg-red-500 text-white rounded px-4 py-2 mb-4 hover:bg-red-400 transition-all duration-300"
                    >
                        Cancel
                    </button>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <h2 className="font-semibold text-emerald-700">Choose your profile picture:</h2>
                            <div className="flex gap-4 mt-2">
                                {profileImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`avatar-${index}`}
                                        className={`w-20 cursor-pointer border-2 rounded-lg transition-all duration-300 ${
                                            picture === image ? 'border-green-500' : 'border-gray-200'
                                        } hover:border-green-400`}
                                        onClick={() => setPicture(image)}
                                    />
                                ))}
                            </div>
                        </div>

                        <label className="block">
                            <span className="text-gray-700">Name:</span>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-50 focus:ring focus:ring-green-200"
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Contact Number:</span>
                            <input
                                type="tel"
                                name="contactNumber"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-50 focus:ring focus:ring-green-200"
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Address:</span>
                            <textarea
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-50 focus:ring focus:ring-green-200"
                                rows={3}
                            ></textarea>
                        </label>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white rounded-md px-4 py-2 mt-2 hover:bg-green-500 transition-all duration-300"
                        >
                            Update
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
