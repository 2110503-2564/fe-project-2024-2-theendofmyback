export default async function getReview(query?: string) {
    
    const response = await fetch(
      `https://swdev-backend.vercel.app/api/v1/reviews?${query}`,
      
      //`https://localhost:5000/api/v1/campgrounds?${query}`,
      { cache: 'no-store' }
    )
  
    if (response.status.toString().slice(0, 1)[0] === '4') {
      return null
    }
  
    if (response.status === 400) return null
  
    if (!response.ok) {
      throw new Error('fecthing reviews failed')
    }
  
    return response.json()
  }