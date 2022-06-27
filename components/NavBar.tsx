import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { NavButton, SearchBox } from './CommonComponents';
import { Container, Row, Col } from 'react-bootstrap';
import Cookies from 'universal-cookie';

function NavBar(props: { lang: string; translation: { [x: string]: any; }; }) {
    const lang = props.lang;
    const translation = props.translation[lang];
    const cookies = new Cookies();
    const list = [
        {
            'title': 'English',
            'type': 'button',
            'onClick': function () {
                cookies.set('language', 'en', { path: '/' });
                window.location.reload()
            }
        },
        {
            'title': 'عربي',
            'type': 'button',
            'onClick': function () {
                cookies.set('language', 'ar', { path: '/' });
                window.location.reload()
            }
        }
    ];

    return (
        <Container fluid className={`${styles.nav} ${styles['font-' + lang]}`} dir={lang == 'ar' ? 'rtl' : 'ltr'}>
            <Row>
                <Col lg={12} sm={12} className="d-flex mt-2 justify-content-between">
                    <div className='d-flex justify-content-start'>
                        <img src={`/img/logo-${lang}.svg`} alt="Masar Logo" className={styles.masarLogo} width={99} height={61} />
                        <ul className={`${styles.navList} ${styles.mt3}`}>
                            <li className={styles.active}><Link href="/">{translation.home}</Link></li>
                            <li><Link href="/">{translation.departments}</Link></li>
                            <li><Link href="/">{translation.risk}</Link></li>
                            <li><Link href="/">{translation.auditing}</Link></li>
                            <li><Link href="/">{translation.strategy}</Link></li>
                            <li><Link href="/">{translation.users}</Link></li>
                        </ul>
                    </div>

                    <div className="mt-2">
                        <SearchBox styles={styles} translation={translation} lang={lang}></SearchBox>
                        {/* <NavButton source='/icons/notification.svg' alt='Notifcation Icon' width={24} height={24} styles={styles} items={list}></NavButton> */}
                        <NavButton source='/icons/translate.svg' alt='Translation Icon' width={24} height={24} styles={styles} items={list}></NavButton>
                        {/* <NavButton source='/icons/logout.svg' alt='Logout Icon' width={24} height={24} styles={styles}></NavButton> */}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default NavBar; 