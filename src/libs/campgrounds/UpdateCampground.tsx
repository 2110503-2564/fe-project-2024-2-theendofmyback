export default async function updateCampground(
  token: string,
  id: string,
  name: string,
  address: string,
  tel: string,
  price: number,
  capacity: number,
  description: string,
  image: string
) {

  const response = await fetch(
    `https://swdev-backend.vercel.app/api/v1/campgrounds/${id}`,
    {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        address: address,
        tel: tel,
        price: price,
        capacity: capacity,
        description: description,
        image: image
      }),
    }
  );

  if (response.status.toString().slice(0, 1)[0] === '4') return null;
  
  if (response.status === 500) return null;

  if (!response.ok) throw new Error('Cannot Update Campground');

  return response.json();
}