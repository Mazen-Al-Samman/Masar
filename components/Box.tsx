import styles from './styles/box.module.css';
import TextBox from '../components/TextBox';
import ChartBox from '../components/ChartBox';
import ColumnChartBox from "./ColumnChartBox";
import ImageBox from "./ImageBox";

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
        case 'text': return <TextBox config={config}></TextBox>;
        case 'pieChart': return <ChartBox config={config}></ChartBox>
        case 'columnChart': return <ColumnChartBox config={config}></ColumnChartBox>
        case 'image': return <ImageBox config={config}></ImageBox>
    }
}

export default Box;