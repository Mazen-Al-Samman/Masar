import styles from './styles/box.module.css';
import TextBox from '../components/TextBox';
import ChartBox from '../components/ChartBox';

interface BoxConfig {
    width: string,
    height: string,
    type: string,
    config: any
}

const Box = ({ width, height, type, config }: BoxConfig) => {
    return (
        <div className={styles.box} style={{width: width, height: height, margin: '0 16px'}}>
            {renderBox(type, config)}
        </div>
    )
};

function renderBox(type: string, config: any) {
    switch (type) {
        case 'text':
            return <TextBox config={config}></TextBox>;
        case 'pieChart': return <ChartBox config={config}></ChartBox>
    }
}

export default Box;