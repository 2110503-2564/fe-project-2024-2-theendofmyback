import Swal from "sweetalert2";

export default async function createPromotion(
    token:string, 
    name:string, description:string, discount:number
  ) {
    const response = await fetch(
      `https://swdev-backend.vercel.app/api/v1/promotions`,
      {
        method: 'POST',
        
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name:name, 
            campground:"67bd6dfcd3e3272696f5243d", //no use back still not fix backend
            description:description, 
            discount:discount
        }),
      }
    )
  
    if (response.status === 400) {
      alert((await response.json()).message)
      return await response.json()
    }
  
    if (!response.ok) {
      throw new Error('Booking Failed') 
    }

    Swal.fire({
            title: "Good job!",
            text: "Create Promotions successfully!",
            icon: "success"
          });
    return await response.json()
  }