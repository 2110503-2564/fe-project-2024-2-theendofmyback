export default async function getBooking(token: string, bid: string) {
  
    const response = await fetch(
      `https://swdev-backend.vercel.app/api/v1/bookings/${bid}`,
      {
        method: 'GET',
        headers: { authorization: `Bearer ${token}` },
        cache: 'no-store',
      }

      
    )

    //console.log(response)
    if (response.status === 429) {
        console.log('429')
    }
  
    if (!response.ok) {
      throw new Error('Cannot fetch bookings data')
    }

    //const data = await response.json(); // ✅ Await the JSON parsing
    //console.log("Parsed Data:", data); 
  
    return response.json()
  }