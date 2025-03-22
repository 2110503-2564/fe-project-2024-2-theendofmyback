'use client';

import { useState, useEffect } from 'react';
import DateReserve from '@/components/DateReserve';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image'
import Link from 'next/link';

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

  const [dateCheckIn, setDateCheckIn] = useState<Dayjs | null>(null);
  const [dateCheckOut, setDateCheckOut] = useState<Dayjs | null>(null);
  const [selectedCampground, setSelectedCampground] = useState(campgrounds[0]);
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

  useEffect(() => {
    const selected = campgrounds.find((camp) => camp.id === selectedCampground.id);
    if (selected) {
      setSelectedCampground(selected);
    }
  }, [selectedCampground.id]);

  return (
    <div className="flex flex-col p-8 mx-auto bg-white rounded-lg shadow-lg">
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

      <div className="border-t-2 border-b-2 py-4 mb-6">
        <h2 className="font-semibold text-lg text-green-600">Your Information</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 border text-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="tel"
            placeholder="Enter your contact number"
            className="w-full p-3 border font-bold text-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
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
            {selectedCampground.promotions.map((promo) => (
              <option key={promo.id} value={promo.name}>
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
