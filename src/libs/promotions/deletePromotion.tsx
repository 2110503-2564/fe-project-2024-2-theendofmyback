export default async function deletePromotions(token: string, id: string) {
    const response = await fetch(
      `https://swdev-backend.vercel.app/api/v1/promotions/${id}`,
      {
        method: 'DELETE',
        headers: { authorization: `Bearer ${token}` },
      }
    )
  
    if (response.status.toString().slice(0, 1)[0] === '4') {
      alert((await response.json()).message)
      return null
    }
  
    if (response.status === 500) return null
    
  
    if (!response.ok) throw new Error('Delete failed')

  
    alert('Delete campground successfully.' )
  
    return await response.json()
}