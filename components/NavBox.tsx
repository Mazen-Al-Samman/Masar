import styles from '../styles/Home.module.css';
import Image from 'next/image';
export default function NavBox(props: {text: string, icon: string, onClick: any}) {
    return (
        <div onClick={props.onClick} className={styles.box}>
            <Image className={styles.searchIcon} src={`/icons/${props.icon}`} alt="Search Icon" width={28} height={28} />
            <span>{props.text}</span>
        </div>
    )
}