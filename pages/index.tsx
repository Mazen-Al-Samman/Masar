import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar';
import translation from '../common/translation';

interface IProps {
  language: "ar" | "en";
}

const Home: NextPage<IProps> = ({ language }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossOrigin="anonymous"
        />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500&display=swap" rel="stylesheet" />
      </Head>

      <main>
        {/* <NavBar translation={translation} lang={language}></NavBar> */}
      </main>
    </div>
  )
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const { req } = ctx;
  console.log(req.cookies);
  return {
    props: {
      language: req.cookies.language ?? 'ar'
    }
  }
}

export default Home
