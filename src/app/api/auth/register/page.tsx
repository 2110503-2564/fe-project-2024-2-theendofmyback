'use client'
import { useState } from "react";
import register from "@/libs/users/register";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

export default function Register() {
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("/img/avatar-1.png");
    const [password, setPassword] = useState("");

    const profileImages = [
        '/img/avatar-1.png',
        '/img/avatar-2.png',
        '/img/avatar-3.png',
        '/img/avatar-4.png',
    ];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            console.log("debug")
            const update = async () => {
                try {
                    console.log('User Details:', {
                        name,
                        email,
                        password,
                        address,
                        tel,
                        picture,
                    });
                    const response = await register(name,email,password,address,tel,picture)
                    console.log(response)

                    if (response?.success) {

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
                                title: "Signed up successfully"
                              });

                        const signInResponse = await signIn("credentials", {
                            redirect: false,
                            email,
                            password,
                        });
                        
            
                        if (signInResponse?.error) {
                            console.error("Auto-login failed:", signInResponse.error);
                            Swal.fire({
                                title: "Auto-login failed.!",
                                icon: "error",
                                draggable: true
                              });
                        } else {
                            window.location.href = "/";
                        }
                    }
                } catch (error) {
                    console.error('Error updating user data:', error);
                    Swal.fire({
                        title: "Cannot Register",
                        icon: "error",
                        draggable: true
                      });
                }
            }
    
            update();
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-green-200 to-green-2x00">
            <div className="flex flex-col mt-6 bg-white shadow-lg rounded-xl p-6 border border-gray-200 justify-center items-center w-1/2">
            <h1 className="font-bold my-4 text-2xl text-emerald-700">Register</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="border-2 p-4 rounded-lg">
                <h2 className="font-semibold text-emerald-700">Choose your profile picture:</h2>
                <div className="flex gap-4 mt-2">
                    {profileImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`avatar-${index}`}
                        className={`w-20 cursor-pointer border-2 rounded-lg transition-all duration-300 ${
                            picture === image ? 'border-green-500' : 'border-gray-200'
                        } hover:border-green-400`}
                        onClick={() => setPicture(image)}
                    />
                    ))}
                </div>
                </div>

                <label className="block">
                <span className="text-gray-700">Name:</span>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-50 focus:ring focus:ring-green-200"
                    required
                />
                </label>

                <label className="block">
                <span className="text-gray-700">Email:</span>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-50 focus:ring focus:ring-green-200"
                    required
                />
                </label>

                <label className="block">
                <span className="text-gray-700">Password:</span>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-50 focus:ring focus:ring-green-200"
                    required
                    minLength={8}
                    placeholder="Enter at least 8 characters"
                />
                </label>

                <label className="block">
                <span className="text-gray-700">Contact Number:</span>
                <input
                    type="tel"
                    name="contactNumber"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-50 focus:ring focus:ring-green-200"
                    required
                />
                </label>

                <label className="block">
                <span className="text-gray-700">Address:</span>
                <textarea
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-50 focus:ring focus:ring-green-200"
                    rows={3}
                    required
                ></textarea>
                </label>

                <button
                type="submit"
                className="w-full bg-green-600 text-white rounded-md px-4 py-2 mt-2 hover:bg-green-500 transition-all duration-300"
                
                >
                Sign Up
                </button>
            </form>
            </div>
        </div>
    );
}