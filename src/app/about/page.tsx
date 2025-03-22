'use client';
import { motion } from 'framer-motion';
import Like from "./like";

export default function AboutUs() {
    return (
        <div className=" items-center justify-center w-full h-full p-4 space-y-8">
            <motion.div 
                className="w-full p-9 bg-emerald-400 text-gray-800 text-center py-12 px-6 shadow-lg rounded-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-3xl text-white font-extrabold mb-4 tracking-tight text-emerald-70">Welcome to Our About Us Page</h1>
                <h2 className="text-7xl font-semibold text-white mb-6">The end of my BACK</h2>
            </motion.div>

            <div className="flex flex-row gap-6 items-center justify-center">
                <motion.div 
                    className="flex flex-col items-center justify-center w-80 bg-white rounded-xl shadow-md"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="w-full h-60 overflow-hidden rounded-t-xl bg-green-500 text-white shadow-lg">
                        <img src="/img/phu.jpg" alt="Phu" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 text-center">
                        <h5 className="text-xl font-semibold text-green-900">PHU.tsx</h5>
                        <p className="text-base text-gray-600">CEDT-student</p>
                    </div>
                    <div className="p-6 pt-0">
                        <Like />
                    </div>
                </motion.div>

                <motion.div 
                    className="flex flex-col items-center justify-center w-80 bg-white rounded-xl shadow-md"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="w-full h-60 overflow-hidden rounded-t-xl bg-green-500 text-white shadow-lg">
                        <img src="/img/kwan.jpg" alt="Kwan" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 text-center">
                        <h5 className="text-xl font-semibold text-green-900">Kw@nn lnwza</h5>
                        <p className="text-base text-gray-600">CEDT-student</p>
                    </div>
                    <div className="p-6 pt-0">
                        <Like />
                    </div>
                </motion.div>

                <motion.div 
                    className="flex flex-col items-center justify-center w-80 bg-white rounded-xl shadow-md"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="w-full h-60 overflow-hidden rounded-t-xl bg-green-500 text-white shadow-lg">
                        <img src="/img/nat.png" alt="Nat" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 text-center">
                         <h5 className="text-xl font-semibold text-green-900">Natzazahahahihi</h5>
                        <p className="text-base text-gray-600">CEDT-student</p>
                    </div>
                    <div className="p-6 pt-0">
                        <Like />
                    </div>
                </motion.div>
            </div>

            <motion.div 
                className="w-full bg-white p-8 shadow-xl rounded-3xl mt-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h3 className="text-3xl text-center font-semibold text-green-800 mb-4">About Our Group</h3>
                <p className="text-lg text-center text-green-700">
                    We are a passionate team of CEDT students working together to create innovative projects and solutions. Our mission is to explore new technologies, collaborate on exciting ideas, and make a positive impact in the tech community.
                </p>
            </motion.div>

            <motion.div 
                className="w-full p-3 bg-white p-8 shadow-xl rounded-3xl mt-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h3 className="text-3xl text-center font-semibold text-green-800 mb-4">Contact Us</h3>
                <p className="text-xl text-center text-green-700 mb-6">Feel free to reach out to us for collaboration, inquiries, or just to say hello!</p>
                <div className="flex justify-center space-x-6">
                    <a href="mailto:nattarat.kwan@gmail.com" className="text-green-500 hover:text-green-700 transition duration-300">Kwan Email</a>
                    <a href="mailto:titiporn02468@gmail.com" className="text-green-500 hover:text-green-700 transition duration-300">Phu Email</a>
                    <a href="mailto:nat.n.dragon@gmail.com" className="text-green-500 hover:text-green-700 transition duration-300">Nat Email</a>
                </div>
            </motion.div>

            <div className="w-5">

            </div>
        </div>
    );
}
