import styles from './styles/box.module.css';
import TextBox from '../components/TextBox';

interface BoxStyle {
    width: string,
    height: string
}

interface InnerBox {
    type: string
}

const Box = ({ width, height, type }: any) => {
    return (
        <div className={styles.box} style={{ width: width, height: height }}>
            {renderBox(type)}
        </div>
    )
};

function renderBox(type: string) {
    switch (type) {
        case 'text': return <TextBox mainText='Companies' items={[
            {
                title: 'Financial Services',
                desc: '12 Companies'
            },
            {
                title: 'Education',
                desc: '4 Companies'
            },
            {
                title: 'Real Estates',
                desc: '6 Companies'
            },
        ]}></TextBox>
    }
}
export default Box;