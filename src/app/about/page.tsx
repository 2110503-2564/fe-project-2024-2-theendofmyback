'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Like from "./like";
import Switch from '@/components/mode';

export default function AboutUs() {

    const [isNightMode, setIsNightMode] = useState(false);


    const coversPhu = ['/img/phu.jpg', '/img/phu1.jpg', '/img/phu2.jpg'];
    const coversKwan = ['/img/kwan.jpg', '/img/kwan1.jpg', '/img/kwan2.jpg'];
    const coversNat = ['/img/nat.png', '/img/nat1.jpg', '/img/nat2.png'];
    const [indexN, setIndexN] = useState(0);
    const [indexP, setIndexP] = useState(0);
    const [indexK, setIndexK] = useState(0);


    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
    }


    return (
        <div className={`${isNightMode ? "min-h-screen flex flex-col items-center px-4 py-10 bg-gray-900" : "min-h-screen flex flex-col items-center px-4 py-10 bg-gradient-to-t from-teal-100 to-gra-900"}`}>
            <div className="items-center justify-center w-full h-full p-8 space-y-8">

                <motion.div
                    className={`w-full p-9 ${isNightMode ? 'bg-gray-700' : 'bg-emerald-400'} text-gray-800 text-center py-12 px-6 shadow-lg rounded-2xl`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-3xl text-white font-extrabold mb-4 tracking-tight text-emerald-70">Welcome to Our About Us Page</h1>
                    <h2 className="text-7xl font-semibold text-white mb-6">The end of my BACK</h2>
                    <div className="w-full flex justify-center items-center">
                        <Switch checked={isNightMode} onChange={toggleNightMode} />
                    </div>
                </motion.div>

                <div className="flex flex-row gap-6 items-center justify-center flex-wrap">
                    {/* Phu's Section */}
                    <motion.div
                        className="flex flex-col items-center justify-center w-80 bg-white rounded-xl shadow-md"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-full h-60 overflow-hidden rounded-t-xl bg-green-500 text-white shadow-lg" onClick={() => setIndexP((indexP + 1) % coversPhu.length)}>
                            <img src={coversPhu[indexP]} alt="Phu" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 text-center">
                            <h5 className="text-xl font-semibold text-green-900">PHU.tsx</h5>
                            <p className="text-base text-gray-600">CEDT-student</p>
                        </div>
                        <div className="p-6 pt-0">
                            <Like />
                        </div>
                    </motion.div>

                    {/* Kwan's Section */}
                    <motion.div
                        className="flex flex-col items-center justify-center w-80 bg-white rounded-xl shadow-md"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-full h-60 overflow-hidden rounded-t-xl bg-green-500 text-white shadow-lg" onClick={() => setIndexK((indexK + 1) % coversKwan.length)}>
                            <img src={coversKwan[indexK]} alt="Kwan" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 text-center">
                            <h5 className="text-xl font-semibold text-green-900">Kw@nn lnwza</h5>
                            <p className="text-base text-gray-600">CEDT-student</p>
                        </div>
                        <div className="p-6 pt-0">
                            <Like />
                        </div>
                    </motion.div>

                    {/* Nat's Section */}
                    <motion.div
                        className="flex flex-col items-center justify-center w-80 bg-white rounded-xl shadow-md"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-full h-60 overflow-hidden rounded-t-xl bg-green-500 text-white shadow-lg" onClick={() => setIndexN((indexN + 1) % coversNat.length)}>
                            <img src={coversNat[indexN]} alt="Nat" className="w-full h-full object-cover" />
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
                    className="w-full p-3 bg-white p-8 shadow-xl rounded-3xl mt-12 "
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



                <div className="w-5 pb-10"></div>
            </div>
        </div>
    );
}
