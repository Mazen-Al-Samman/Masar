import styles from '../styles/Home.module.css';
import Link from 'next/link';
import {NavButton, SearchBox} from './CommonComponents';
import {Container, Row, Col} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

interface NavBarConfig {
    lang: string,
    translation: { [x: string]: any; },
    buttons: string[],
    token: string,
    filtersData?: object,
}

function NavBar({lang, translation, buttons, token, filtersData}: NavBarConfig) {
    const cookies = new Cookies();
    const superAdminHeader = [
        {
            'title': translation.home,
            'url': '/super-admin'
        },
        {
            'title': translation.allCompanies,
            'url': '/super-admin/companies'
        },
        {
            'title': translation.contact,
            'url': '/'
        },
    ];

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
                            <NavButton source='/icons/notification.svg'
                                       alt='Notification Icon' width={24} height={24} styles={styles} hasList={true}
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
                            ]} lang={lang}></NavButton>
                        }

                        {
                            buttons.includes('filter') &&
                            <NavButton
                                token={token}
                                source='/icons/filter.svg'
                                alt='Filter Icon'
                                width={24}
                                height={24}
                                styles={styles}
                                hasList={true}
                                squareWidth={'1120px'}
                                items={{'type': 'filter-box', 'data': filtersData}}
                                lang={lang}></NavButton>}

                        {
                            buttons.includes('language') &&
                            <NavButton
                                source='/icons/translate.svg'
                                alt='Translation Icon'
                                width={24}
                                height={24}
                                styles={styles}
                                squareWidth={'168px'}
                                items={[
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
                                ]}
                                hasList={true}
                                lang={lang}></NavButton>
                        }

                        {
                            buttons.includes('logout') &&
                            <NavButton
                                source='/icons/logout.svg'
                                alt='Logout Icon'
                                width={24}
                                height={24}
                                styles={styles}
                                squareWidth={'229px'}
                                items={[
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
                                ]}
                                hasList={true}
                                lang={lang}></NavButton>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default NavBar;