import {v4 as uuidv4} from 'uuid';
import {main} from "@popperjs/core";

interface BoxConfig {
    config: {
        mainText: string,
        items: BoxItems[]
    }
}

interface BoxItems {
    title: string,
    desc: string
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
    const {mainText, items} = config;
    console.log(mainText);
    return (
        <div style={styles.main}>
            <p style={styles.p}>{mainText}</p>
            <div style={styles.inner.div}>
                {
                    items.map(item => {
                        return (
                            <div key={uuidv4()}>
                                <p style={styles.inner.p}>{item.title}</p>
                                <span style={styles.inner.span}>{item.desc}</span>
                                <hr style={styles.inner.hr}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};
export default TextBox;