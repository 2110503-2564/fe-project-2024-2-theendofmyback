'use client';
import { useState, useEffect } from 'react';

export default function AccountPage() {
    const mockUser = {
        name: 'criossant brioche',
        tel: '1231231231',
        address: 'floor19, build4',
        email: 'user@example.com',
        picture: '/img/avatar-1.png',
    };

    const [name, setName] = useState(mockUser.name);
    const [tel, setTel] = useState(mockUser.tel); 
    const [address, setAddress] = useState(mockUser.address);
    const [email, setEmail] = useState(mockUser.email)
    const [picture, setPicture] = useState(mockUser.picture);

    const [isEditing, setIsEditing] = useState(false); 

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTel(event.target.value);
    };

    const handleAddressChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAddress(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({
            name,
            tel,
            address,
        });
    }

    const profileImages = [
        '/img/avatar-1.png',
        '/img/avatar-2.png',
        '/img/avatar-3.png',
        '/img/avatar-4.png',
    ];


    

    useEffect(() => {
        //for fetch api later
    }, []);

    return (
        <div className="justify-items-center w-4/5 h-full m-4 rounded-lg items-center">
            <h1 className="font-semibold my-2">Account Information</h1>
            <div className="w-full flex flex-row justify-between gap-6 mb-6 border-2 border-gray-300 rounded-lg p-4">
                <div className="w-full flex flex-row gap-6">
                <img src={picture} alt="profile-display" className="w-40" />
                <div>
                    <p>Email: {email}</p>
                    <p>Name: {name}</p>
                    <p>Contact Number: {tel}</p>
                    <p>Address: {address}</p>
                </div>
                </div>
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-slate-400 text-white rounded p-2 h-10 hover:border-1 hover:border-gray-600 hover:bg-slate-700"
                >
                        Edit
                </button>
            </div>

            {
                isEditing ? (
                    <div className='w-full flex flex-col gap-4 items-center'>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="bg-red-500 text-white rounded p-2 w-2/5"
                    >
                        Cancel
                    </button>
                    
                    <form className="w-full flex flex-col justify-start space-y-4" 
                        onSubmit={handleSubmit}>

                    <div className="gap-1 mt-2 flex flex-col justify-center">
                        <h2>choose your profile display: </h2>
                        <div className='flex flex-row gap-4'>
                            {profileImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`avatar-${index}`}
                                    className="w-20 cursor-pointer border-2 rounded-lg hover:border-green-500"
                                    onClick={(event) =>{ 
                                        event.preventDefault();
                                        const selectedImage = document.querySelector('.border-green-500');
                                        if (selectedImage) {
                                            selectedImage.classList.remove('border-green-500');
                                        }
                                        event.currentTarget.classList.add('border-green-500');
                                        setPicture(image);
                                    }
                                    }
                                />
                            ))}
                        </div>
                        </div>

                        <label className='flex flex-row gap-7'>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleNameChange}
                                className="border rounded p-2 w-full bg-gray-200"
                            />
                        </label>
                        <label className='flex flex-row gap-7'>
                            Contact Number:
                            <input
                                type="tel"
                                name="contactNumber"
                                value={tel}
                                onChange={handleTelChange}
                                className="border rounded p-2 w-full bg-gray-200"
                            />
                        </label>
                        <label className='flex flex-row gap-7'>
                            Address:
                            <textarea
                                name="address"
                                value={address}
                                onChange={handleAddressChange}
                                className="border rounded p-2 w-full bg-gray-200"
                                rows={3}
                            ></textarea>
                        </label>
                        <button type="submit" 
                        className="bg-green-500 text-white rounded p-2 mt-4 ">
                            Update
                        </button>
                    </form>

                    </div>
                ) : ''
                    
                
            }
            
        </div>
    );
}
