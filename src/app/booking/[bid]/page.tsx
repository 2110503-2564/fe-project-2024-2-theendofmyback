'use client';

import { useState, useEffect } from 'react';
import DateReserve from '@/components/DateReserve';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import getCampground from '@/libs/campgrounds/getCampground';
import { useSession } from 'next-auth/react';
import Loader from "@/components/load";
import updateBooking from '@/libs/bookings/updateBooking';
import getBooking from '@/libs/bookings/getBooking';
import getPromotions from '@/libs/promotions/getPromotions';
import GoBackButton from "@/components/Gobackbutton";
import getUserList from '@/libs/users/getUserList';
import { Campground } from '../../../../interface';
import { Promotion } from '../../../../interface';
import { UserProfile } from '../../../../interface';
import Swal from 'sweetalert2';

export default function SingleBookingPage({ params }: { params: { bid: string } }) {
  const urlParams = useSearchParams();
  const cid = urlParams.get('id');
  console.log(cid);

  const [dateCheckIn, setDateCheckIn] = useState<Dayjs | null>(null);
  const [dateCheckOut, setDateCheckOut] = useState<Dayjs | null>(null);
  const [allPromotions, setAllPromotions] = useState<any[]>([]);
  const [promotion, setPromotion] = useState('');
  const [bookingData, setBookingData] = useState<any>(null);
  const [enableEdit, setEnableEdit] = useState(false);

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

  const [isLoading, setIsLoading] = useState(true);

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

        Swal.fire({
          title: "Check-in date cannot be later than check-out date!",
          icon: "warning",
          draggable: true
        });
        return;
      }
      if (diffInDays > 3) {
        Swal.fire({
          title: "The stay duration cannot exceed 3 days!",
          icon: "warning",
          draggable: true
        });
        return;
      }
    }
    updateBooking(
      session?.user?.token || '',
      params.bid || '',
      dateCheckIn ? dateCheckIn.toISOString() : '',
      dateCheckOut ? dateCheckOut.toISOString() : '',
      promotion ? promotion : ''
    ).then(
      () => {
        Swal.fire({
          title: "Booking updated successfully.",
          icon: "success",
          draggable: true
        });
        window.location.reload();
      }
    );
  };

  const { data: session } = useSession();

  useEffect(() => {
    if (!cid) return;
    (async () => {
      try {
        const campgroundData: Campground = (await getCampground(cid)).data;
        const bookingData = (await getBooking(session?.user?.token || "", params.bid)).data;
        setBookingData(bookingData);

        const response = await getUserList()
        const users = Array.isArray(response) ? response : response.data;
        const foundUser = users.find((u: any) => u._id === bookingData.user);

        if (!foundUser.tel) {
          foundUser.tel = 'none'
        }
        console.log(foundUser)
        setUserData(foundUser)
        const promotions = (await getPromotions("")).data;
        setAllPromotions(promotions);


        setSelectedCampground(campgroundData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching campground data:", error);
        setIsLoading(false);
      }
    })();
  }, [cid, session]);

  return (
    <div className="bg-gradient-to-bl from-emerald-50 to-emerald-300 min-h-screen p-5">
      <Link href="/booking/manage">
        <div className="flex justify-start p-4">
          <GoBackButton name="My Booking" />
        </div>
      </Link>

      {!selectedCampground._id ? (
        <div className="flex flex-col justify-center items-center p-10 mx-auto  w-full max-w-4xl">
          <div className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 p-8 rounded-xl shadow-2xl flex flex-col justify-center items-center">
            <div className="animate-spin-slow">
              <Loader />
            </div>
            <p className="mt-4 text-2xl text-white font-semibold">Please wait...</p>
          </div>
        </div>


      ) : (
        <div className="flex p-10 mx-auto bg-white rounded-lg shadow-lg w-full max-w-4xl">
          <div className="w-full">
            <div className="flex flex-row gap-6 mb-6 pt-4">
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

            <div className="border-t-2 border-b-2 py-4 mb-6">
              <h2 className="font-semibold text-lg text-green-600">Information</h2>
              <div className="flex gap-6">
                <div className="w-full p-3 border text-green-600 rounded-lg space-y-4">
                  <p>Name: {userData.name}</p>
                  <p>Email: {userData.email}</p>
                  <p>Tel: {userData.tel}</p>
                </div>
                <div className="w-full p-3 border text-green-600 rounded-lg space-y-4">
                  <p>Check In Date: {dayjs(bookingData.checkInDate).format('MMMM D, YYYY')}</p>
                  <p>Check Out Date: {dayjs(bookingData.checkOutDate).format('MMMM D, YYYY')}</p>
                  <p>Booking At: {dayjs(bookingData.BookingAt).format('MMMM D, YYYY')}</p>
                </div>
              </div>
            </div>

            {/* ปุ่ม Edit จะปรากฏเมื่อโหลดเสร็จ */}
            {!isLoading && (
              <button
                className="mb-5 bg-emerald-500 text-white font-bold p-3 rounded-xl hover:bg-emerald-600"
                onClick={() => setEnableEdit(!enableEdit)}
              >
                Edit
              </button>
            )}

            {enableEdit && (
              <form
                onSubmit={(event) => {
                  if (!dateCheckIn || !dateCheckOut || !promotion) {
                    event.preventDefault();
                  
                    const missingFields = [];
                    if (!dateCheckIn) missingFields.push("Check-in Date");
                    if (!dateCheckOut) missingFields.push("Check-out Date");
                    if (!promotion) missingFields.push("Promotion");
                  
                    Swal.fire({
                      icon: "warning",
                      title: "Oops...",
                      text: `Please fill in all required fields: ${missingFields.join(", ")}.`,
                    });
                    console.log("Missing fields:", missingFields);
                  } else {
                    handleSubmit(event);
                  }
                }}
              >
                <div className="space-y-4 mb-4">
                  <div className="font-bold text-green-600">Select Promotion:</div>
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
                    if (!dateCheckIn || !dateCheckOut) {
                      Swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "Please fill in all required fields: Check-in Date, Check-out Date, and confirm your information.",
                        footer: '<a href="#">Why do I have this issue?</a>'
                      });
                    }
                  }}
                  className="w-full p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg mt-4 hover:bg-green-600 transition-all"
                >
                  Book Camp
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
