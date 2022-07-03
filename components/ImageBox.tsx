import Image from "next/image";

interface BoxConfig {
    config: {
        mainText: string,
        image: string,
        subText: string
    }
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
            display: 'flex',
            justifyContent: 'center'
        },
        p: {
            textAlign: 'center',
            fontSize: '16px',
        }
    }
}

const ImageBox = ({config}: BoxConfig) => {
    const {mainText, subText, image} = config;
    console.log(mainText);
    return (
        <div style={styles.main}>
            <p style={styles.p}>{mainText}</p>
            <div style={styles.inner.div}>
                <Image src={image} width={170} height={170} alt={subText}></Image>
            </div>
            <p style={styles.inner.p}>{subText}</p>
        </div>
    )
};
export default ImageBox;