// 'use client';

// import { useState, useEffect } from 'react';
// import DateReserve from '@/components/DateReserve';
// import dayjs, { Dayjs } from 'dayjs';
// import Image from 'next/image'



// // ข้อมูลแคมป์และโปรโมชั่น
// const campgrounds = [
//   {
//     id: '67bd6dfcd3e3272696f5243d',
//     name: 'Mountain View Camp',
//     address: '123 Forest Road, Rocky Hills',
//     tel: '555-1234',
//     price: 25,
//     capacity: 60,
//     description: 'A beautiful campsite with a breathtaking mountain view.',
//     image: 'mountain-view.jpg',
//     promotions: [
//       { id: '1', name: 'Discount 200', discount: 200 },
//       { id: '2', name: 'Online Discount', discount: 100 }
//     ]
//   },
//   {
//     id: '67bd7bb482dcce4043ef0333',
//     name: 'City View Camp',
//     address: '456 City Road, Urban Hills',
//     tel: '555-5678',
//     price: 30,
//     capacity: 50,
//     description: 'A peaceful campsite with a stunning city view.',
//     image: 'city-view.jpg',
//     promotions: [
//       { id: '3', name: 'Weekend Special', discount: 150 }
//     ]
//   }
// ];

// export default function BookingPage() {

//   const [dateCheckIn, setDateCheckIn] = useState<Dayjs | null>(null);
//   const [dateCheckOut, setDateCheckOut] = useState<Dayjs | null>(null);
//   const [selectedCampground, setSelectedCampground] = useState(campgrounds[0]);
//   const [promotion, setPromotion] = useState('');
//   const [nameLastname, setNameLastname] = useState('');
//   const [contactNumber, setContactNumber] = useState('');

  
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log({
//       nameLastname,
//       contactNumber,
//       campground: selectedCampground.name,
//       dateCheckIn,
//       dateCheckOut,
//       promotion
//     });
//   };

//   useEffect(() => {
//     // ใช้ข้อมูลแคมป์ที่ถูกเลือก
//     const selected = campgrounds.find((camp) => camp.id === selectedCampground.id);
//     if (selected) {
//       setSelectedCampground(selected);
//     }
//   }, [selectedCampground.id]);

//   return (
//     <div className="flex flex-col p-6 w-full h-full bg-gray-100">
//       <Image
//         src="/img/cover1.jpg" // ใช้เส้นทางจากโฟลเดอร์ public
//         alt="Cover Image"
//         width={600}  // กำหนดขนาดรูปภาพ
//         height={400} // กำหนดขนาดรูปภาพ
//         className="rounded-lg" // ใช้ class สำหรับสไตล์
//       />


//       {/* Display Campground Information */}
//       <div className="mb-6">
//         {/* <img
//           src={selectedCampground.image}
//           alt={selectedCampground.name}
//           className="w-full h-64 object-cover rounded-lg mb-4"
//         /> */}
//         <h2 className="text-3xl font-semibold">{selectedCampground.name}</h2>
//         <p>{selectedCampground.description}</p>
//         <p>Address: {selectedCampground.address}</p>
//         <p>Tel: {selectedCampground.tel}</p>
//         <p>Price: ${selectedCampground.price} / night</p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         {/* Name Field */}
//         <div className="space-y-2 mb-4">
//           <div>Name</div>
//           <input
//             id="nameLastname"
//             type="text"
//             value={nameLastname}
//             onChange={(e) => setNameLastname(e.target.value)}
//             className="w-full p-3 bg-gray-800 text-white rounded-lg"
//             placeholder="Your Name"
//             required
//           />
//         </div>

//         {/* Contact Number */}
//         <div className="space-y-2 mb-4">
//           <div>Contact Number</div>
//           <input
//             id="contactNumber"
//             type="text"
//             value={contactNumber}
//             onChange={(e) => setContactNumber(e.target.value)}
//             className="w-full p-3 bg-gray-800 text-white rounded-lg"
//             placeholder="Your Contact Number"
//             required
//           />
//         </div>

//         {/* Promotion Dropdown */}
//         <div className="space-y-2 mb-4">
//           <div>Select Promotion</div>
//           <select
//             value={promotion}
//             onChange={(e) => setPromotion(e.target.value)}
//             className="w-full p-3 bg-gray-800 text-white rounded-lg"
//             required
//           >
//             <option value="">-- Select Promotion --</option>
//             {selectedCampground.promotions.map((promo) => (
//               <option key={promo.id} value={promo.name}>
//                 {promo.name} - ${promo.discount} OFF
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Date Picker (Check-in and Check-out Dates) */}
//         <div className="space-y-2 mb-4">
//           <div>Check-in Date</div>
//           <DateReserve value={dateCheckIn} onChange={(newValue) => setDateCheckIn(newValue)} />

//           <div>Check-out Date</div>
//           <DateReserve value={dateCheckOut} onChange={(newValue) => setDateCheckOut(newValue)} />
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="w-full p-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold rounded-lg mt-4">
//           Book Venue
//         </button>
//       </form>
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import DateReserve from '@/components/DateReserve';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image'

// ข้อมูลแคมป์และโปรโมชั่น
const campgrounds = [
  {
    id: '67bd6dfcd3e3272696f5243d',
    name: 'Mountain View Camp',
    address: '123 Forest Road, Rocky Hills',
    tel: '555-1234',
    price: 25,
    capacity: 60,
    description: 'A beautiful campsite with a breathtaking mountain view.',
    image: 'mountain-view.jpg',
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
    image: 'city-view.jpg',
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
  const [nameLastname, setNameLastname] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      nameLastname,
      contactNumber,
      campground: selectedCampground.name,
      dateCheckIn,
      dateCheckOut,
      promotion
    });
  };

  useEffect(() => {
    // ใช้ข้อมูลแคมป์ที่ถูกเลือก
    const selected = campgrounds.find((camp) => camp.id === selectedCampground.id);
    if (selected) {
      setSelectedCampground(selected);
    }
  }, [selectedCampground.id]);

  return (
    <div className="flex flex-col p-6 w-full h-full bg-gray-100">
  <div className="flex flex-row gap-6 mb-6">
    {/* Image */}
    <Image
      src="/img/cover1.jpg" // ใช้เส้นทางจากโฟลเดอร์ public
      alt="Cover Image"
      width={600}  // กำหนดขนาดรูปภาพ
      height={400} // กำหนดขนาดรูปภาพ
      className="rounded-lg" // ใช้ class สำหรับสไตล์
    />

    {/* Display Campground Information */}
    <div className="flex flex-col justify-start space-y-4">
      <h2 className="text-3xl font-semibold text-black">{selectedCampground.name}</h2>
      <p className="text-black">{selectedCampground.description}</p>
      <p className="text-black">Address: {selectedCampground.address}</p>
      <p className="text-black">Tel: {selectedCampground.tel}</p>
      <p className="text-black">Price: ${selectedCampground.price} / night</p>
    </div>
  </div>

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="space-y-2 mb-4">
          <div className="text-black">Name</div>
          <input
            id="nameLastname"
            type="text"
            value={nameLastname}
            onChange={(e) => setNameLastname(e.target.value)}
            className="w-full p-3 bg-gray-800 text-black rounded-lg"
            placeholder="Your Name"
            required
          />
        </div>

        {/* Contact Number */}
        <div className="space-y-2 mb-4">
          <div className="text-black">Contact Number</div>
          <input
            id="contactNumber"
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full p-3 bg-gray-800 text-black rounded-lg"
            placeholder="Your Contact Number"
            required
          />
        </div>

        {/* Promotion Dropdown */}
        <div className="space-y-2 mb-4">
          <div className="text-black">Select Promotion</div>
          <select
            value={promotion}
            onChange={(e) => setPromotion(e.target.value)}
            className="w-full p-3 bg-gray-800 text-black rounded-lg"
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

        {/* Date Picker (Check-in and Check-out Dates) */}
        <div className="space-y-2 mb-4">
          <div className="text-black">Check-in Date</div>
          <DateReserve value={dateCheckIn} onChange={(newValue) => setDateCheckIn(newValue)} />

          <div className="text-black">Check-out Date</div>
          <DateReserve value={dateCheckOut} onChange={(newValue) => setDateCheckOut(newValue)} />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full p-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold rounded-lg mt-4">
          Book Venue
        </button>
      </form>
    </div>
  );
}
