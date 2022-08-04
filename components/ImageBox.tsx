import Image from "next/image";
import { v4 as uuidV4 } from 'uuid';

interface BoxConfig {
    config: {
        mainText: string,
        image: string,
        subText: string,
        lang: string,
        iconDescItems: []
    }
}

const styles = {
    main: {
        padding: '32px',
        fontWeight: 'bold'
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
            display: 'flex',
        },
        p: {
            textAlign: "center",
            fontSize: '16px',
        },
        colorSpan: {
            width: '12px',
            height: '12px',
            borderRadius: '12px',
            marginTop: '2px',
            marginInlineEnd: '15px'
        },
        sideText: {
            fontSize: '12px'
        }
    }
}

const ImageBox = ({config}: BoxConfig) => {
    const {mainText, subText, image, lang, iconDescItems} = config;
    return (
        <div style={styles.main}>
            <p style={styles.p}>{mainText}</p>
            <div style={styles.inner.div}>
                <div>
                    <Image src={image} width={190} height={190} alt={subText}></Image>
                    <p style={styles.inner.p}>{subText}</p>
                </div>

                <div style={{marginTop: '35px'}}>
                    {
                        iconDescItems.map(item => {
                            return (
                                <div key={uuidV4()} style={{display: "flex", justifyContent: lang == 'ar' ? 'right' : 'left'}}>
                                    <p style={{...styles.inner.colorSpan, backgroundColor: item.color}}></p>
                                    <p style={styles.inner.sideText}>{item.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};
export default ImageBox;