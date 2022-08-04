import '../styles/globals.css'
import MainProps from '../interfaces/MainProps';
import NavBar from '../components/NavBar';
import translations from '../common/translation';
import Header from '../components/Header';
import styles from '../styles/Home.module.css'
import {useState} from 'react';
import Success from "../components/status/Success";
import Failed from "../components/status/Failed";

const isBrowser = typeof window !== "undefined";

function MyApp({Component, pageProps, lang, token}: MainProps) {
    const dir = lang == 'en' ? 'ltr' : 'rtl';
    const translation = translations[lang];
    const [buttons, setButtons] = useState(['search', 'language', !token ? '' : 'logout]']);
    const [showNav, setShowNav] = useState(true);
    const [padding, setPadding] = useState(true);
    const [filterConfig, setFilterConfig] = useState();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const [successData, setSuccessData] = useState({
        title: "Great, Your action has been done successfully!",
        subTitle: "Go to home page and have fun.",
        buttonLink: '/super-admin',
        buttonText: 'Home'
    })

    // State for selected filters to be shared between components
    const [selected, setSelected] = useState([]);

    return (
        <main className={styles["font-" + lang]} dir={dir}>
            <Header lang={lang}></Header>
            {
                showNav &&
                <NavBar
                    filtersData={filterConfig}
                    translation={translation}
                    lang={lang}
                    buttons={buttons}
                    selected={selected}
                    setSelected={setSelected}
                    token={token}></NavBar>
            }
            <div style={{padding: `${padding ? '0 156px' : '0'}`}}>
                {
                    !showSuccess && !showFailed &&
                    <Component
                        {...pageProps}
                        lang={lang}
                        setButtons={setButtons}
                        showNav={setShowNav}
                        setPadding={setPadding}
                        setFilter={setFilterConfig}
                        filters={filterConfig}
                        token={token}
                        selected={selected}
                        setSelected={setSelected}
                        showSuccess={setShowSuccess}
                        showFailed={setShowFailed}
                        setSuccessData={setSuccessData}
                    />
                }
                {
                    showSuccess &&
                    <Success {...successData} showSuccess={setShowSuccess}></Success>
                }
                {
                    showFailed &&
                    <Failed showFailed={setShowFailed}></Failed>
                }
            </div>
        </main>
    );
}

MyApp.getInitialProps = async (context: any) => {
    const {req, res, pathname} = context?.ctx;
    const language = req?.cookies?.language;
    const auth_key = req?.cookies?.auth_key;

    if (!auth_key && pathname != '/') {
        res?.writeHead(302, {Location: '/'});
        res?.end();
    } else if (auth_key && pathname == '/') {
        res?.writeHead(302, {Location: '/super-admin'});
        res?.end();
    }

    return {
        lang: language ?? 'en',
        token: auth_key ?? null,
    }
};


export default MyApp
