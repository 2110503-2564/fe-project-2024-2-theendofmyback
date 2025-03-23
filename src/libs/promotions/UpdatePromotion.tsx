export default async function updatePromotion
  ( token:string,
    id:string,
    name:string,
    description:string,
    discount: number,
  ) 
{
    const response = await fetch(
    `https://swdev-backend.vercel.app/api/v1/promotions/${id}`,
    {
      method: 'PUT',
      headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: name,
          description: description,
          discount: discount,
      }),
    }
    );

  if (response.status.toString().slice(0, 1)[0] === '4') return null;
  
  if (response.status === 500) return null;

  if (!response.ok) throw new Error('Cannot Update Promotions');

  return response.json();
}