'use client';
import Like from "./like";

export default function AboutUs() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-6">
    <div className="w-full bg-green-400 text-gray-800 text-center py-8 px-6 shadow-md rounded-xl">
        <h1 className="text-4xl text-white font-extrabold mb-4 tracking-tight color-green-700">Welcome to Our About Us Page</h1>
        <h2 className="text-xl font-semibold text-green-800 mb-6">The end of my BACK</h2>
    </div>

            <div className="flex flex-row items-center justify-center w-full h-full space-x-6">
                <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-6">
                    <div className="relative mx-4 -mt-6 h-60 overflow-hidden rounded-xl bg-green-500 bg-clip-border text-white shadow-lg shadow-green-500/40 bg-gradient-to-r from-green-400 to-green-500 p-2">
                        <img
                            src="/img/phu.jpg"
                            alt="Description of image"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-green-900 antialiased">
                            PHU.tsx
                        </h5>
                        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                            CEDT-student
                        </p>
                    </div>
                    <div className="p-6 pt-0">
                        <Like />
                    </div>
                </div>
                <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-6">
                    <div className="relative mx-4 -mt-6 h-60 overflow-hidden rounded-xl bg-green-500 bg-clip-border text-white shadow-lg shadow-green-500/40 bg-gradient-to-r from-green-400 to-green-500 p-2">
                        <img
                            src="/img/kwan.jpg"
                            alt="Description of image"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-green-900 antialiased">
                            Kw@nn lnwza
                        </h5>
                        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                            CEDT-student
                        </p>
                    </div>
                    <div className="p-6 pt-0">
                        <Like />
                    </div>
                </div>
                <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-6">
                    <div className="relative mx-4 -mt-6 h-60 overflow-hidden rounded-xl bg-green-500 bg-clip-border text-white shadow-lg shadow-green-500/40 bg-gradient-to-r from-green-400 to-green-500 p-2">
                        <img
                            src="/img/nat.png"
                            alt="Description of image"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-green-900 antialiased">
                            Natzazahahahihi
                        </h5>
                        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                            CEDT-student
                        </p>
                    </div>
                    <div className="p-6 pt-0">
                        <Like />
                    </div>
                </div>
            </div>
        </div>
    );
}
