export default async function createReserve(
    token: string, cid: string,
    checkInDate: string, checkOutDate: string,
    promotion?: string
  ) {
    const response = await fetch(
      `https://swdev-backend.vercel.app/api/v1/campgrounds/${cid}/bookings`,
      {
        method: 'POST',
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
    console.log(response)
    console.log(cid)
    console.log(token)
    console.log(checkInDate)
    console.log(checkOutDate)
    console.log(promotion)
  
    if (response.status === 400) {
      alert((await response.json()).message)
      return await response.json()
    }
  
    if (!response.ok) {
      throw new Error('Booking Failed') 
    }
  
    alert(
      'Create booking successfully.'
    )
  
    return await response.json()
  }