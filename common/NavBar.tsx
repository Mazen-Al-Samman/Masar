import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';

function NavBar(props: { lang: string; translation: { [x: string]: any; }; }) {
    const lang = props.lang;
    const translation = props.translation[lang];
    const languageClass = `font-${lang}`;
    return (
        <Container fluid className={`${styles.nav} ${styles[languageClass]}`} dir={lang == 'ar' ? 'rtl' : 'ltr'}>
            <Row>
                <Col lg={8} sm={12} className="d-flex mt-2 justify-content-start">
                    <img src={`/img/logo-${lang}.svg`} alt="Masar Logo" className={styles.masarLogo} width={99} height={61} />
                    <ul className={`${styles.navList} ${styles.mt3}`}>
                        <li className={styles.active}><Link href="/">{translation.home}</Link></li>
                        <li><Link href="/">{translation.allCompanies}</Link></li>
                        <li><Link href="/">{translation.aboutUs}</Link></li>
                        <li><Link href="/">{translation.contact}</Link></li>
                    </ul>
                </Col>
                <Col lg={4} sm={12} className="mt-3 d-flex justify-content-end">
                    <div className={`${styles.searchBox} ${styles['searchBox-' + lang]} ${styles[languageClass]}`}>
                        <Image className={styles.searchIcon} src="/icons/search.svg" alt="Search Icon" width={20} height={20} />
                        <input type="search" placeholder={translation.search} />
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