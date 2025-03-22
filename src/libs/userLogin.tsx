export default async function userLogin(userEmail:string,userPassword:string) {

    /*const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password: userPassword })
    });*/

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password: userPassword })
    });

    console.log(response);

    
    if (!response.ok) {
        throw new Error('Failed to login ka');
    } 

    return await response.json();
}