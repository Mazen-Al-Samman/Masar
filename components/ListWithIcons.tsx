import {v4 as uuidV4} from 'uuid';
import css from './styles/box.module.css';
import {useRouter} from "next/router";

interface BoxConfig {
    config: {
        mainText: string,
        items: BoxItems[]
    }
}

interface BoxItems {
    title: string;
    desc: string;
    href?: string;
}


const styles = {
    main: {
        padding: '32px',
    },
    p: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#04252E',
        fontStyle: 'normal',
        letterSpacing: '0.5px',
        margin: 0
    },
    inner: {
        div: {
            marginTop: '30px',
            height: '250px',
            overflow: 'auto'
        },
        p: {
            fontWeight: '700',
            fontSize: '16px',
            letterSpacing: '0.5px',
            fontStyle: 'normal',
            margin: 0
        },
        span: {
            fontWeight: '400',
            fontSize: '12px',
            letterSpacing: '0.5px',
            fontStyle: 'normal',
            color: '#365158',
            margin: 0
        },
        hr: {
            border: '1px solid #E6E9EA',
        }
    }
}
const colors = ['#009FB7', '#FE9158', '#715AFF', '#034732', '#009FB7', '#E3D7FF', '#C33149', '#CFE8EF', '#715AFF', '#FE9158', '#1D2D44', '#AEF78E', '#443850'];
const ListWithIcons = ({config}: BoxConfig) => {
    const router = useRouter();
    const {mainText, items} = config;
    return (
        <div style={styles.main}>
            <p style={styles.p}>{mainText}</p>
            <div style={styles.inner.div} className={css.scroll}>
                {
                    items.length ? items.map((item, idx) => {
                            const matches = item.title?.match(/\b(\w)/g);
                            const slug = matches?.join('').substring(0, 2).toUpperCase();
                            return (
                                <div key={uuidV4()}>
                                    <div className="d-flex justify-content-start pointer" style={{gap: '10px'}} onClick={() => {
                                        item.href ? router.push(item.href) : '';
                                    }}>
                                        <div className="mt-1 d-flex justify-content-center align-items-center text-white"
                                             style={{
                                                 width: '40px',
                                                 height: '40px',
                                                 backgroundColor: `${colors[idx % 10]}`,
                                                 borderRadius: '50px',
                                                 fontSize: '16px',
                                                 fontWeight: '700'
                                             }}>
                                            {slug}
                                        </div>
                                        <div>
                                            <p style={styles.inner.p}>{item.title}</p>
                                            <span style={styles.inner.span}>{item.desc}</span>
                                        </div>
                                    </div>
                                    <hr style={styles.inner.hr}/>
                                </div>
                            )
                        }) :
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <p>No Data</p>
                        </div>
                }
            </div>
        </div>
    )
};
export default ListWithIcons;