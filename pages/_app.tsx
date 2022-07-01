import '../styles/globals.css'
import MainProps from '../interfaces/MainProps';
import NavBar from '../components/NavBar';
import translations from '../common/translation';
import Header from '../components/Header';

function MyApp({ Component, pageProps, lang }: MainProps) {
  const dir = lang == 'en' ? 'ltr' : 'rtl';
  const translation = translations[lang];
  return (
    <div dir={dir}>
      <Header></Header>
      <NavBar translation={translation} lang={lang}></NavBar>
      <Component {...pageProps} lang={lang} />
    </div>
  );
}

MyApp.getInitialProps = async (context: any) => {
  const { req } = context.ctx;
  return {
    lang: req.cookies.language ?? 'ar'
  }
};

export default MyApp
