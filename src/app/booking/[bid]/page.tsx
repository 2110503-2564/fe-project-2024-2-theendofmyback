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
    <div className="flex flex-col p-10 w-full h-fit bg-gray-100">
      <div className="flex flex-row gap-6 mb-6 border-2 border-gray-300 rounded-lg p-4">
    <img
          src={selectedCampground.image}
          alt={selectedCampground.name}
           className="rounded-lg w-[300px] object-cover"
    />

    <div className="w-full flex flex-col justify-start space-y-4">
      <h2 className="text-3xl font-semibold font-serif text-black">{selectedCampground.name}</h2>
      <p> details: </p>
      <div className='border-2 border-gray-300 p-2 rounded-lg w-full'>
        <p className="text-black">{selectedCampground.description}</p>
        <p className="text-black">Address: {selectedCampground.address}</p>
        <p className="text-black">Tel: {selectedCampground.tel}</p>
        <p className="text-black">Price: ${selectedCampground.price} / night</p>
      </div>
    </div>
  </div>
  
      <div className='border-2 border-gray-300 p-4 rounded-lg w-full'>
        <h2 className='font-bold text-md my-2'>Your Informatioin</h2>
        <p>name: </p>
        <p>contact number: </p>
      </div>

      <form onSubmit={handleSubmit}>
        
        <hr className="my-6 border-gray-300 border-2" />
    
        <div className="space-y-2 mb-4">
          <div className="text-black">Select Promotion: </div>
          <select
            value={promotion}
            onChange={(e) => setPromotion(e.target.value)}
            className="w-full p-3 bg-gray-300 text-black rounded-lg"
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

        <hr className="my-6 border-gray-300 border-2" />

        <div className="flex flex-row justify-center">
          <div className='mx-4'>
          <div className="text-black">Check-in Date</div>
          <DateReserve value={dateCheckIn} onChange={(newValue) => setDateCheckIn(newValue)} />
          </div>

          <div className='mx-4'>
          <div className="text-black">Check-out Date</div>
          <DateReserve value={dateCheckOut} onChange={(newValue) => setDateCheckOut(newValue)} />
          </div>
        </div>

        <hr className="my-6 border-gray-300 border-2" />

        <Link href="/booking/manage">
        <button type="submit" className="w-full p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg mt-4">
          Book Camp
        </button>
        </Link>

      </form>
      
    </div>
  );
}
