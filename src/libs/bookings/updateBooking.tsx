export default async function updateBooking(
    token: string, bid: string,
    checkInDate: string, checkOutDate: string,
    promotion?: string
  ) {
    const response = await fetch(
      `https://swdev-backend.vercel.app/api/v1/bookings/${bid}`,
      {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,  
            ...(promotion ? { promotion } : {}),
        }),
      }
    )

    //console.log(response.json())
  
    if (response.status === 400) {
        alert((await response.json()).message)
        return await response.json()
      }
    
      if (!response.ok) {
        throw new Error('Updating Failed') 
      }
  
  
    return await response.json()
  }