import styles from '../styles/Home.module.css';
import Link from 'next/link';
import {NavButton, SearchBox} from './CommonComponents';
import {Container, Row, Col} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

function NavBar(props: { lang: string; translation: { [x: string]: any; }; buttons: string[] }) {
    const {lang, translation, buttons} = props;
    const cookies = new Cookies();
    const superAdminHeader = [
        {
            'title': translation.home,
            'url': '/'
        },
        {
            'title': translation.allCompanies,
            'url': '/'
        },
        // {
        //     'title': translation.aboutUs,
        //     'url': '/'
        // },
        {
            'title': translation.contact,
            'url': '/'
        },
    ];

    const adminHeader = [
        {
            'title': translation.departments,
            'url': '/'
        },
        {
            'title': translation.risk,
            'url': '/'
        },
        {
            'title': translation.auditing,
            'url': '/'
        },
        {
            'title': translation.strategy,
            'url': '/'
        },
        {
            'title': translation.users,
            'url': '/'
        },
    ];

    const [shownList, setShownList] = useState<string>('');
    // const [buttons, setButtons] = useState(['filter', 'search', 'language']);
    const handleShowList = (listName: string) => {
        if (shownList == listName) {
            setShownList('')
            return
        }
        setShownList(listName)
    }
    return (
        <Container fluid className={`${styles.nav}`}>
            <Row>
                <Col lg={12} sm={12} className="d-flex mt-2 justify-content-between">
                    <div className='d-flex justify-content-start'>
                        <img src={`/img/logo-${lang}.svg`} alt="Masar Logo" className={styles.masarLogo} width={99}
                             height={61}/>
                        <ul className={`${styles.navList} ${styles.mt3}`}>
                            {
                                superAdminHeader.map(item => {
                                    return <li key={uuidv4()}><Link href={item.url}>{item.title}</Link></li>;
                                })
                            }
                        </ul>
                    </div>

                    <div className="mt-2">
                        {
                            buttons.includes('search') &&
                            <SearchBox styles={styles} translation={translation} lang={lang}></SearchBox>
                        }

                        {
                            buttons.includes('profile') &&
                            <NavButton onShowList={(name: string) => handleShowList(name)} shownList={shownList}
                                       listName={'notifications'} source='/icons/notification.svg'
                                       alt='Notifcation Icon' width={24} height={24} styles={styles} hasList={true}
                                       squareWidth={'232px'} items={[
                                {
                                    'title': translation.profile,
                                    'type': 'box',
                                    'icon': 'profile.svg',
                                    'onClick': function () {
                                        alert('Profile');
                                    }
                                },
                                {
                                    'title': translation.notification,
                                    'type': 'box',
                                    'icon': 'notifications.svg',
                                    'onClick': function () {
                                        alert('Notification');
                                    }
                                },
                                {
                                    'title': translation.contact,
                                    'type': 'box',
                                    'icon': 'contact.svg',
                                    'onClick': function () {
                                        alert('Contact Us');
                                    }
                                }
                            ]} lang={lang}></NavButton>}

                        {
                            buttons.includes('language') &&
                            <NavButton onShowList={(name: string) => handleShowList(name)} shownList={shownList}
                                       listName={'language'} source='/icons/translate.svg' alt='Translation Icon'
                                       width={24} height={24} styles={styles} squareWidth={'168px'} items={[
                                {
                                    'title': 'English',
                                    'type': 'button',
                                    'onClick': function () {
                                        cookies.set('language', 'en', {path: '/'});
                                        window.location.reload()
                                    }
                                },
                                {
                                    'title': 'عربي',
                                    'type': 'button',
                                    'onClick': function () {
                                        cookies.set('language', 'ar', {path: '/'});
                                        window.location.reload()
                                    }
                                }
                            ]} hasList={true} lang={lang}></NavButton>
                        }

                        {
                            buttons.includes('logout') &&
                            <NavButton onShowList={(name: string) => handleShowList(name)} shownList={shownList}
                                       listName={'logout'} source='/icons/logout.svg' alt='Logout Icon' width={24}
                                       height={24} styles={styles} squareWidth={'229px'} items={[
                                {
                                    'title': translation.logoutMsg,
                                    'type': 'text',
                                },
                                {
                                    'title': translation.logout,
                                    'type': 'button',
                                    'color': '#ED5858',
                                    'onClick': function () {
                                        cookies.remove('auth_key', {path: '/'});
                                        window.location.reload()
                                    }
                                }
                            ]} hasList={true} lang={lang}></NavButton>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default NavBar;