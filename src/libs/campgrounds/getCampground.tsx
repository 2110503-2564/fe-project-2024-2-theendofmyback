export default async function getCampground(cid: string) {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/campgrounds/${cid}`
    )
  
    if (response.status.toString().slice(0, 1)[0] === '4') return null
    
    if (response.status === 500) return null;
  
    if (!response.ok) throw new Error('Cannot fetch campground data');
  
    return response.json()
  }