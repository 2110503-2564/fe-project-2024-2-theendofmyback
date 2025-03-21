import Link from 'next/link';
import styles from './topmenu.module.css';

export default function TopMenuItem({ title, pageRef }: { title: string; pageRef: string }) {
    return (
        <Link href={pageRef} legacyBehavior>
            <a className={styles.itemcontainer}>{title}</a>
        </Link>
    );
}
