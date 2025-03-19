import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';

export default function TopMenu() {
    return (
        <div className={styles.menucontainer}>
            <div className={styles.logo}>
                <Image 
                    src='/img/logo.png' 
                    alt='logo' 
                    width={120} 
                    height={30} 
                    priority 
                />
            </div>

            <div className={styles.menuitems}>
                <TopMenuItem title='Destination' pageRef='/destination' />
                <TopMenuItem title='Bookings' pageRef='/bookings' />
                <TopMenuItem title='Activities' pageRef='/activities' />
            </div>

            <div className={styles.authbuttons}>
                <a href="/login" className={styles.login}>Log in</a>
                <a href="/signup" className={styles.signup}>Sign up</a>
            </div>
        </div>
    );
}
