import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';

function NavBar() {
    return (
        <Container fluid className={styles.nav}>
            <Row>
                <Col lg={8} sm={12} className="d-flex mt-2 justify-content-start">
                <img src="/img/masar-logo.svg" alt="Masar Logo" className={styles.masarLogo} width={99} height={61} />
                    <ul className={`${styles.navList} ${styles.mt3}`}>
                        <li className={styles.active}><Link href="/">Home</Link></li>
                        <li><Link href="/">All Companies</Link></li>
                        <li><Link href="/">About Us</Link></li>
                        <li><Link href="/">Contact Us</Link></li>
                    </ul>
                </Col>
                <Col lg={4} sm={12} className="mt-3 d-flex justify-content-end">
                    <div className={styles.searchBox}>
                        <Image className={styles.searchIcon} src="/icons/search.svg" alt="Search Icon" width={20} height={20} />
                        <input type="search" placeholder='Search for companies' />
                    </div>

                    <div className={styles.translationBtn}>
                        <Image src="/icons/translate.svg" alt="Translation Icon" width={24} height={24} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default NavBar; 