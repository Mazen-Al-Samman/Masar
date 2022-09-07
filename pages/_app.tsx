import '../styles/globals.css'
import MainProps from '../interfaces/MainProps';
import Header from '../components/Header';
import styles from '../styles/Home.module.css'
import {useState} from 'react';
import Success from "../components/status/Success";
import Failed from "../components/status/Failed";
import dynamic from "next/dynamic";
import {useTheme} from "../hooks/theme";
import {defaultNavItems} from "../hooks/NavHelpers";
import AppContext from "../components/AppContext";
const NavBar = dynamic(() => import('../components/NavBar'), { ssr: false, });
import '/styles.css';

export interface ISingleNavItem {
    title: string,
    link: string
}

function MyApp({Component, pageProps, lang}: MainProps) {
    const theme = useTheme();
    const dir = theme.dir;
    const translation = theme.translation;
    const [buttons, setButtons] = useState(['language']);
    const [data, setData] = useState({});
    const [navList, setNavList] = useState<ISingleNavItem[]>([...defaultNavItems()]);
    const [showNav, setShowNav] = useState(true);
    const [padding, setPadding] = useState(true);
    const [filterConfig, setFilterConfig] = useState();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const [search, setSearch] = useState('');
    const [successData, setSuccessData] = useState({
        title: "Great, Your action has been done successfully!",
        subTitle: "Go to home page and have fun.",
        buttonLink: '/super-admin',
        buttonText: 'Home'
    });

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
                    search={search}
                    setSearch={setSearch}
                    list={navList}></NavBar>
            }
            <div style={{padding: `${padding ? '0' : '0'}`}}>
                {
                    !showSuccess && !showFailed &&
                    <AppContext.Provider value={{data, setData}}>
                        <Component
                            {...pageProps}
                            lang={lang}
                            setButtons={setButtons}
                            showNav={setShowNav}
                            setPadding={setPadding}
                            setFilter={setFilterConfig}
                            filters={filterConfig}
                            selected={selected}
                            setSelected={setSelected}
                            showSuccess={setShowSuccess}
                            showFailed={setShowFailed}
                            setSuccessData={setSuccessData}
                            search={search}
                        />
                    </AppContext.Provider>
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
    const auth_key = req?.cookies?.user;

    if (!auth_key && pathname != '/') {
        res?.writeHead(302, {Location: '/'});
        res?.end();
    } else if (auth_key && pathname == '/') {
        res?.writeHead(302, {Location: '/super-admin'});
        res?.end();
    }

    return {
        lang: language ?? 'en',
    }
};


export default MyApp
