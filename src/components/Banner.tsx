'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './banner.module.css';
import Image from 'next/image';
import Input from '@/components/search';
import Link from 'next/link';

export default function Banner() {
    const covers = ['/img/cover1.jpg', '/img/cover2.jpg', '/img/cover3.jpg'];
    const [index, setIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    return (
        <div className={styles.banner} onClick={() => setIndex((index + 1) % covers.length)}>
            <Image
                src={covers[index]}
                alt="cover"
                fill
                priority
                className={styles.bannerImage}
            />

            <div className={styles.bannerContent}>
                <p className={styles.subtitle}>Book your perfect campsite today!</p>
                <h1 className={styles.title}>CAMPGROUND BOOKING</h1>
                <p className={styles.slogan}>Escape to Nature</p>
                
                <Input value={inputValue} onChange={handleInputChange} />

                <Link href="/campground">
                    <button className={styles.bannerButton}>
                    Book Now!
                    </button>
                </Link>
            
            </div>
        </div>
    );
}