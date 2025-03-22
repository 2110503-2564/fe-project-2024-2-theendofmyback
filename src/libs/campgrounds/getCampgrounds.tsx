export default async function getCampgrounds(query?: string) {
    if (!query?.includes('limit')) query += '&limit=1000'
    
    const response = await fetch(
      `https://swdev-backend.vercel.app/api/v1/campgrounds?${query}`,
      //`https://localhost:5000/api/v1/campgrounds?${query}`,
      { cache: 'no-store' }
    )
  
    if (response.status.toString().slice(0, 1)[0] === '4') {
      return null
    }
  
    if (response.status === 400) return null
  
    if (!response.ok) {
      throw new Error('fecthing campgrounds failed')
    }
  
    return response.json()
  }