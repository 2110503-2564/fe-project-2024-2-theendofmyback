export default async function updateMe(
    token: string,
    name: string, email: string,
    tel: string, address: string,
    picture: string
  ) {
    let updateData = {  name: name, 
                        email: email, 
                        tel: tel,  
                        address: address, 
                        picture: picture }

    console.log(updateData)
  
    const response = await fetch(`https://swdev-backend.vercel.app/api/v1/auth/profile`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
  
    if (response.status === 400) {
      alert((await response.json()).message)
      return await response.json()
    }
  
    if (!response.ok) {
      throw new Error("Cannot update")
    }
  
    return await response.json()
  }