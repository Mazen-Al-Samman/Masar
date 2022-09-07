import {v4 as uuidV4} from 'uuid';
import css from './styles/box.module.css';
import {useRouter} from "next/router";

interface BoxConfig {
    config: {
        mainText: string;
        items: BoxItems[];
        button?: IButton;
    }
}

interface IButton {
    text: string;
    onClick: () => {};
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

const TextBox = ({config}: BoxConfig) => {
    const {mainText, items, button} = config;
    const router = useRouter();
    return (
        <div style={styles.main}>
            <div className="d-flex justify-content-between">
                <p style={styles.p}>{mainText}</p>
                {
                    button &&
                    <p className="pointer" onClick={button.onClick}>{button.text}</p>
                }
            </div>
            <div style={styles.inner.div} className={css.scroll}>
                {
                    items.length ? items.map(item => {
                            return (
                                <div key={uuidV4()} style={{cursor: 'pointer'}} onClick={() => {
                                    item.href ? router.push(item.href) : '';
                                }}>
                                    <p style={styles.inner.p}>{item.title}</p>
                                    <span style={styles.inner.span}>{item.desc}</span>
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
export default TextBox;