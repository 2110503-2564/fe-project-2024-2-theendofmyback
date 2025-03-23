export default async function createCampground(
    token:string, 
    name:string, address:string, tel:string, 
    price:number, capacity:number, description:string, image:string 
  ) {
    const response = await fetch(
      `https://swdev-backend.vercel.app/api/v1/campgrounds`,
      {
        method: 'POST',
        
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name:name, 
            address:address, 
            tel:tel, 
            price:price, 
            capacity:capacity, 
            description:description, 
            image:image 
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
    alert("Create Campground successfully!");
    return await response.json()
  }