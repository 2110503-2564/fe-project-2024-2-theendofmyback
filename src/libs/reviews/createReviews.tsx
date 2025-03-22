export default async function createReview(
    token: string, title:string, text:string , cid: string, rating:number
  ) {
    const response = await fetch(
      `https://swdev-backend.vercel.app/api/v1/reviews`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          text: text,
          campground: cid,
          rating: rating,
        }),
      }
    )

  
    if (response.status === 400) {
      alert((await response.json()).message)
    }
  
    if (!response.ok) {
      throw new Error('Creating reviews Failed') 
    }
  
    
  
    return await response.json()
  }