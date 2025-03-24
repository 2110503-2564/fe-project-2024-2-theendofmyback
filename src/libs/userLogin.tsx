import Swal from "sweetalert2";

export default async function userLogin(userEmail:string,userPassword:string) {

    /*const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password: userPassword })
    });*/

    const baseURL = process.env.NEXT_PUBLIC_API_URL; // ตรวจสอบค่าตัวแปรนี้

console.log("Base URL:", baseURL); // เช็กว่ามีค่า undefined หรือไม่

fetch(`${baseURL}/api/v1/auth/login`)
  .then(res => res.json())
  .then(data => console.log("Response:", data))
  .catch(err => console.error("Fetch error:", err));


    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password: userPassword })
    });

    console.log(response);

    
    if (!response.ok) {
        throw new Error('Failed to login ka');
    } 

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully"
      });

    return await response.json();
}