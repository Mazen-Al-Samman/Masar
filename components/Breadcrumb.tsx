import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import styles from './styles/breadcrumb.module.css';

interface Link {
    title: string,
    link: string
}

interface Links {
    main: Link,
    sub: Link[]
}

const Breadcrumb = ({ main, sub }: Links) => {
    return (
        <ul className={`${styles.list}`}>
            {
                sub.map((item) => {
                    return <li key={uuidv4()}>
                        <Link href={item.link}>{item.title}</Link>
                        <span>/</span>
                    </li>
                })
            }

            <li className={`${styles.main}`} key={uuidv4()}>
                <Link href={main.link}>{main.title}</Link>
            </li>
        </ul>
    )
}

export default Breadcrumb;