import '../styles/globals.css'
import MainProps from '../interfaces/MainProps';
import NavBar from '../components/NavBar';
import translations from '../common/translation';
import Header from '../components/Header';
import styles from '../styles/Home.module.css'
import {useState} from 'react';

const isBrowser = typeof window !== "undefined";

function MyApp({Component, pageProps, lang, token}: MainProps) {
    const dir = lang == 'en' ? 'ltr' : 'rtl';
    const translation = translations[lang];
    const [buttons, setButtons] = useState(['filter', 'search', 'language']);
    const [showNav, setShowNav] = useState(true);

    return (
        <main className={styles["font-" + lang]} dir={dir}>
            <Header></Header>
            {
                showNav &&
                <NavBar translation={translation} lang={lang} buttons={buttons}></NavBar>
            }
            <div style={{padding: '0 156px'}}>
                <Component {...pageProps} lang={lang} setButtons={setButtons} showNav={setShowNav}/>
            </div>
        </main>
    );
}

MyApp.getInitialProps = async (context: any) => {
    const {req, res, pathname} = context.ctx;
    const {language, auth_key} = req.cookies;

    if (!auth_key && pathname != '/') {
        res.writeHead(302, { Location: '/' });
        res.end();
    } else if (auth_key && pathname == '/') {
        res.writeHead(302, { Location: '/super-admin' });
        res.end();
    }

    return {
        lang: language ?? 'ar',
        token: auth_key ?? null,
    }
};


export default MyApp
