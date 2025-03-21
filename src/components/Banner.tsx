'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './banner.module.css';
import Image from 'next/image';
import Input from '@/components/search';

export default function Banner() {
    const covers = ['/img/cover1.jpg', '/img/cover2.jpg', '/img/cover3.jpg'];
    const [index, setIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.push(`/campground/booking}`);
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

                <button
                    className={styles.bannerButton}
                    onClick={handleButtonClick}
                >
                    Book Now!
                </button>
            </div>
        </div>
    );
}