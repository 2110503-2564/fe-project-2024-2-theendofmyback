export default async function register( name:string,
                                        email:string,password:string,
                                        address:string,tel:string,
                                        picture:string
  ) {
    const response = await fetch(`https://swdev-backend.vercel.app/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        tel: tel,
        email: email,
        password: password,
        role: 'user',
        address: address,
        picture: picture
      }),
    })
  

    if (!response.ok) throw new Error('Cannot register')
  
    return await response.json()
  }