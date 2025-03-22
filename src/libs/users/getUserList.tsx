export default async function getUserList() { 
    const response = await fetch(`https://swdev-backend.vercel.app/api/v1/auth/record`, {
      method: 'GET',
      cache: 'no-store',
    }) //bad practice to hardcode the url
  
    if (!response.ok) {
      throw new Error("Cannot fetch user's profile")
    }
  
    return await response.json()
  }