'use client';

import { useState, useEffect } from 'react';
import DateReserve from '@/components/DateReserve';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import getCampground from '@/libs/campgrounds/getCampground';
import { useSession } from 'next-auth/react';
import getMe from '@/libs/users/getMe';
import Loader from "@/components/load";
import SeeYoursButton from '@/components/seeYours';
import { useRouter } from 'next/navigation';
import createBooking from '@/libs/bookings/createBooking';
import getPromotions from '@/libs/promotions/getPromotions';
import { Campground, Promotion, UserProfile } from '../../../interface';



export default function BookingPage() {
  const urlParams = useSearchParams()
  const cid = urlParams.get('id')
  console.log(cid)

  const [dateCheckIn, setDateCheckIn] = useState<Dayjs | null>(null);
  const [dateCheckOut, setDateCheckOut] = useState<Dayjs | null>(null);
  const [allPromotions, setAllPromotions] = useState<any[]>([])
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

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {


    event.preventDefault();
    console.log({
      campground: selectedCampground.name,
      dateCheckIn,
      dateCheckOut,
      promotion
    });

    if (dateCheckIn && dateCheckOut) {
      const diffInDays = dayjs(dateCheckOut).diff(dayjs(dateCheckIn), 'day');
      if (dayjs(dateCheckIn).isAfter(dayjs(dateCheckOut))) {
        alert("Check-in date cannot be later than check-out date.");
        return;
      }
      if (diffInDays > 3) {
        alert("The stay duration cannot exceed 3 days.");
        return;
      }
    }
    console.log(session?.user?.token);
    createBooking(
      session?.user?.token || '',
      cid || '',
      dateCheckIn ? dateCheckIn.toISOString() : '',
      dateCheckOut ? dateCheckOut.toISOString() : '',
      promotion ? promotion : ''
    );
    router.push('/booking/manage');
  };

  const { data: session } = useSession()

  useEffect(() => {
    if (!cid) return;
    (async () => {
      try {
        const campgroundData: Campground = (await getCampground(cid)).data;
        const promotions = (await getPromotions("")).data
        setAllPromotions(promotions)
        console.log(promotions)

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
    <div className="relative min-h-screen">
      <Link href="/booking/manage">
        <div className="absolute top-4 right-4 p-6">
          <SeeYoursButton name="My Booking" />
        </div>
      </Link>
      <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-gradient-to-t from-tzeal-200 to-green-2x00">



        {!selectedCampground._id ? (
       <div className="flex flex-col justify-center items-center p-10 mx-auto  w-full max-w-4xl">
       <div className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 p-8 rounded-xl shadow-2xl flex flex-col justify-center items-center">
         <div className="animate-spin-slow">
           <Loader />
         </div>
         <p className="mt-4 text-2xl text-white font-semibold">Please wait...</p>
       </div>
     </div> )
          : (
            <div className="flex flex-row p-8 mx-auto bg-white rounded-lg shadow-lg relative">





              <div>
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
                      <p className="font-bold">Price: ${selectedCampground.price} / night</p>
                    </div>

                  </div>
                </div>

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
                    >
                        <option value="">-- Select Promotion --</option>
                        {allPromotions.map((promo) => (
                          <option key={promo._id} value={promo._id}>
                            {promo.name} - ${promo.discount} OFF
                          </option>
                        ))}
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

                  <button
                    type="submit"
                    onClick={() => {
                      const confirmInfoCheckbox = document.getElementById('confirmInfo') as HTMLInputElement;
                      if (!dateCheckIn || !dateCheckOut || !confirmInfoCheckbox.checked) {
                        alert("Please fill in all required fields: Check-in Date, Check-out Date, and confirm your information.");
                        return;
                      }
                    }}
                    className="w-full p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg mt-4 hover:bg-green-600 transition-all"
                  >
                    Book Camp
                  </button>
                </form>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}