export default async function getPromotions(query?: string) {
    
    const response = await fetch(
      `https://swdev-backend.vercel.app/api/v1/promotions?${query}`,
      
      //`https://localhost:5000/api/v1/campgrounds?${query}`,
      { cache: 'no-store' }
    )
  
    if (response.status.toString().slice(0, 1)[0] === '4') {
      return null
    }
  
    if (response.status === 400) return null
  
    if (!response.ok) {
      throw new Error('fecthing promotions failed')
    }
  
    return response.json()
  }