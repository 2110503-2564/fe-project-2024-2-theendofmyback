
interface Camp {
  id: string;
  name: string;
  address: string;
  tel: string;
  price: number;
  capacity: number;
  description: string;
  image: string;
}

interface UpdateCampProps {
  profile: any;
  camp: {
    id: string;
    name: string;
    address: string;
    tel: string;
    price: number;
    capacity: number;
    description: string;
    image: string;
  }[];
}

export default async function updateCampground(camp: Camp) {
  const token = 'your_token_here'; 
  const response = await fetch(
    `https://swdev-backend.vercel.app/api/v1/campgrounds/${camp.id}`,
    {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(camp),
    }
  );

  if (response.status.toString().slice(0, 1)[0] === '4') return null;
  
  if (response.status === 500) return null;

  if (!response.ok) throw new Error('Cannot fetch campground data');

  return response.json();
}