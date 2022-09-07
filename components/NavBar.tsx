import styles from '../styles/Home.module.css';
import Link from 'next/link';
import {NavButton, SearchBox} from './CommonComponents';
import {Container, Row, Col} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {v4 as uuidV4} from 'uuid';
import {ISingleNavItem} from "../pages/_app";
import {isLoggedIn} from "../hooks/User";
import {isClientSide} from "../hooks/helpers";

interface NavBarConfig {
    lang: string,
    translation: { [x: string]: any; },
    buttons: string[],
    filtersData?: object,
    selected?: string[],
    setSelected?: Function,
    search: string,
    setSearch: Function,
    list: ISingleNavItem[]
}

function NavBar({
                    lang,
                    translation,
                    buttons,
                    filtersData,
                    selected,
                    setSelected,
                    search,
                    setSearch,
                    list
                }: NavBarConfig) {
    const cookies = new Cookies();

    return (
        <div className={`${styles.nav}`}>
            <Container>
                <Row className="h-100">
                    <Col lg={8} md={12} sm={12}
                         className="d-flex justify-content-lg-start justify-content-center align-items-center">
                        <img src={`/img/logo-${lang}.svg`} alt="Masar Logo" className={styles.masarLogo} width={99}
                             height={61}/>
                        <ul className={`${styles.navList} ${styles.mt3} d-lg-flex d-none`}>
                            {
                                list && list.map(item => {
                                    return <li key={uuidV4()}><Link href={item.link}>{item.title}</Link></li>;
                                })
                            }
                        </ul>
                    </Col>

                    <Col lg={4} md={12} xs={12} sm={12} className="d-lg-flex justify-content-end align-items-center d-none">
                        {
                            buttons.includes('search') &&
                            <SearchBox styles={styles} placeholder={translation.search} search={search}
                                       setSearch={setSearch} lang={lang}></SearchBox>
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
                                source='/icons/filter.svg'
                                alt='Filter Icon'
                                width={24}
                                height={24}
                                styles={styles}
                                hasList={true}
                                squareWidth={'1120px'}
                                items={{'type': 'filter-box', 'data': filtersData}}
                                selected={selected}
                                setSelected={setSelected}
                                lang={lang}></NavButton>
                        }

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
                            isClientSide() && isLoggedIn() &&
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
                                            cookies.remove('user', {path: '/'});
                                            window.location.reload()
                                        }
                                    }
                                ]}
                                hasList={true}
                                lang={lang}></NavButton>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default NavBar;