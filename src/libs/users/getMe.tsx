export default async function getMe(token: string) { 
    const response = await fetch(`https://swdev-backend.vercel.app/api/v1/auth/me`, {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` },
      cache: 'no-store',
    }) //bad practice to hardcode the url
  
    if (!response.ok) {
      throw new Error("Cannot fetch user's profile")
    }
  
    return await response.json()
  }