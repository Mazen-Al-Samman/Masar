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
    const [buttons, setButtons] = useState(['search', 'language', !token ? '' : 'logout]']);
    const [showNav, setShowNav] = useState(true);
    const [padding, setPadding] = useState(true);
    const [filterConfig, setFilterConfig] = useState();

    return (
        <main className={styles["font-" + lang]} dir={dir}>
            <Header lang={lang}></Header>
            {
                showNav &&
                <NavBar filtersData={filterConfig} translation={translation} lang={lang} buttons={buttons} token={token}></NavBar>
            }
            <div style={{padding: `${padding ? '0 156px' : '0'}`}}>
                <Component
                    {...pageProps}
                    lang={lang}
                    setButtons={setButtons}
                    showNav={setShowNav}
                    setPadding={setPadding}
                    setFilter={setFilterConfig}
                    filters={filterConfig}
                    token={token}/>
            </div>
        </main>
    );
}

MyApp.getInitialProps = async (context: any) => {
    const {req, res, pathname} = context.ctx;
    const {language, auth_key} = req.cookies;

    if (!auth_key && pathname != '/') {
        res.writeHead(302, {Location: '/'});
        res.end();
    } else if (auth_key && pathname == '/') {
        res.writeHead(302, {Location: '/super-admin'});
        res.end();
    }

    return {
        lang: language ?? 'ar',
        token: auth_key ?? null,
    }
};


export default MyApp
