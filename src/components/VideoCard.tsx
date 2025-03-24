'use client'
import { VlogPlayer } from './VlogPlayer';
import { useState, useRef ,useEffect} from "react"
import { Rating } from '@mui/material';
import { useWindowsListener } from "@/hooks/useWindowsListener";
import Link from "next/link";

export function VideoCard() {

    const videoRef = useRef<HTMLVideoElement>(null);

    const [playing, setPlaying] = useState(true);
    const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

    useWindowsListener('pointermove', (e) => {
        setPointerPosition({ x: (e as PointerEvent).clientX, y: (e as PointerEvent).clientY });
    });

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => console.log("Autoplay blocked:", error));
        }
    }, []);

    return (
        
        <div className="bg-white py-20 w-full ">
            <div className="container mx-auto flex flex-col items-center">
                <div className="flex justify-start items-center w-full py-1 pl-4">
                <video 
                        ref={videoRef}
                        className="w-[40%] h-auto rounded-lg object-cover ml-10"
                        src="/video/campgroundvid.mp4"
                        autoPlay loop muted playsInline>
                    </video>
                    <div className="ml-20 text-white max-w-sm">
                        <h3 className="mt-4 text-3xl font-semibold font-playfair text-emerald-700">
                            Book Your Perfect Camp 🌿🏕️
                        </h3>
                        <p className="mt-4 py-2 text-xl text-emerald-500">
                            "Escape to nature, unwind under the stars, and explore scenic trails. 
                            Find your perfect retreat in the heart of the wilderness!"
                        </p>
                        <Link href="/campground">
                            <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">
                                Book Now!
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
