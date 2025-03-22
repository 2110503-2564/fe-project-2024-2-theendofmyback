'use client';

import { useState, useEffect } from 'react';
import DateReserve from '@/components/DateReserve';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import getCampground from '@/libs/campgrounds/getCampground';
import { useSession } from 'next-auth/react';
import getMe from '@/libs/users/getMe';
import Loader from "@/components/load";

interface Campground {
  _id: string;
  name: string;
  address: string;
  tel: string;
  price: number;
  capacity: number;
  description: string;
  image: string;
  promotions?: Promotion[];
}
interface Promotion {
  _id: string;
  name: string;
  campground: string;
  description: string;
  discount: number;
}

interface UserProfile {
  name: string;
  email: string;
  tel: string;
  address: string;
  picture: string;
}



const campgrounds = [
  {
    id: '67bd6dfcd3e3272696f5243d',
    name: 'Mountain View Camp',
    address: '123 Forest Road, Rocky Hills',
    tel: '555-1234',
    price: 25,
    capacity: 60,
    description: 'A beautiful campsite with a breathtaking mountain view.',
    image: '/img/cover1.jpg',
    promotions: [
      { id: '1', name: 'Discount 200', discount: 200 },
      { id: '2', name: 'Online Discount', discount: 100 }
    ]
  },
  {
    id: '67bd7bb482dcce4043ef0333',
    name: 'City View Camp',
    address: '456 City Road, Urban Hills',
    tel: '555-5678',
    price: 30,
    capacity: 50,
    description: 'A peaceful campsite with a stunning city view.',
    image: '/img/cover1.jpg',
    promotions: [
      { id: '3', name: 'Weekend Special', discount: 150 }
    ]
  }
];

export default function BookingPage() {
  const urlParams = useSearchParams()
  const cid = urlParams.get('id')
  console.log(cid)

  const [dateCheckIn, setDateCheckIn] = useState<Dayjs | null>(null);
  const [dateCheckOut, setDateCheckOut] = useState<Dayjs | null>(null);
  const [selectedCampground, setSelectedCampground] = useState<Campground>({
    _id: '',
    name: '',
    address: '',
    tel: '',
    price: 0,
    capacity: 0,
    description: '',
    image: '',
    promotions: []
  });
  
  const [userData, setUserData] = useState<UserProfile>({
    name: 'Loading...',
    email: 'Loading...',
    tel: 'Loading...',
    address: 'Loading...',
    picture: '/img/avatar-1.png', 
  });
  
  const [promotion, setPromotion] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      campground: selectedCampground.name,
      dateCheckIn,
      dateCheckOut,
      promotion
    });
  };

  const { data: session } = useSession()
  
  useEffect (() => { 
    if (!cid) return;
          (async () => {
              try {
                  const campgroundData: Campground = (await getCampground(cid)).data;

                  if (session && session.user.token) {
                    const response = await getMe(session.user.token);
                    //console.log(response.data);
                    setUserData(response.data);
                  }

                  console.log(campgroundData);
                  setSelectedCampground(campgroundData);
      
              } catch (error) {
                  console.error("Error fetching campground data:", error);
              }
          })();
      }, [cid, session]);
  
      console.log(userData);

  return (
    <div className="flex flex-col p-8 mx-auto bg-white rounded-lg shadow-lg">
      {!selectedCampground._id ? (
        <div className='flex flew-row justify-center justify-items-center p-10'>
          <Loader />
          <p className="text-emerald-600">Loading...</p>
        </div>
      ) : (
      
      <div className="flex flex-row gap-6 mb-6  pb-4">
        <Image
          src={selectedCampground.image}
          alt={selectedCampground.name}
          className="rounded-lg w-[300px] h-[200px] object-cover"
          width={300}
          height={200}
        />

        <div className="w-full flex flex-col justify-start space-y-4">
          <h2 className="text-3xl font-bold text-emerald-700">{selectedCampground.name}</h2>
          <p className="text-emerald-600">{selectedCampground.description}</p>
          <div className="text-emerald-500">
            <p>Address: {selectedCampground.address}</p>
            <p>Tel: {selectedCampground.tel}</p>
            <p>Price: ${selectedCampground.price} / night</p>
          </div>
        </div>
      </div>
      )}

      <div className="border-t-2 border-b-2 py-4 mb-6">
        
        <h2 className="font-semibold text-lg text-green-600">Your Information</h2>
        <div className="w-full p-3 border text-green-600 rounded-lg space-y-4">
          <p >Your Name: {userData.name}</p>
          <p >Your Email: {userData.email}</p>
          <p >Your Tel: {userData.tel}</p>
        </div>

        <div className="flex items-center space-x-2 mb-4 my-4 mx-4">
          <input
            type="checkbox"
            id="confirmInfo"
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            required
          />
          <label htmlFor="confirmInfo" className="text-green-600">
            I confirm that the above information is correct.
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="space-y-2 mb-4">
          <div className="font-bold text-green-600">Select Promotion: </div>
          <select
            value={promotion}
            onChange={(e) => setPromotion(e.target.value)}
            className="w-full p-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">-- Select Promotion --</option>
            {/*selectedCampground.promotions.map((promo) => (
              <option key={promo.id} value={promo.name}>
                {promo.name} - ${promo.discount} OFF
              </option>
            ))*/}
          </select>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="flex flex-row justify-center gap-6 mb-6">
          <div className="w-1/2">
            <div className="font-bold text-green-600">Check-in Date</div>
            <DateReserve value={dateCheckIn} onChange={(newValue) => setDateCheckIn(newValue)} />
          </div>

          <div className="w-1/2">
            <div className="font-bold text-green-600">Check-out Date</div>
            <DateReserve value={dateCheckOut} onChange={(newValue) => setDateCheckOut(newValue)} />
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <Link href="/booking/manage">
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg mt-4 hover:bg-green-600 transition-all"
          >
            Book Camp
          </button>
        </Link>
      </form>
    </div>
  );
}
