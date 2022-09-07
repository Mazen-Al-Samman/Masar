import styles from './styles/box.module.css';
import TextBox from '../components/TextBox';
import ChartBox from '../components/ChartBox';
import ColumnChartBox from "./ColumnChartBox";
import ImageBox from "./ImageBox";
import ListWithIcons from "./ListWithIcons";
import TextWithIcons from "./TextWithIcons";
import KpiStatusDetails from "./KpiStatusDetails";

interface BoxConfig {
    width?: string,
    height?: string,
    type: "text" | "iconsList" | "pieChart" | "columnChart" | "image" | "iconsTextList" | "kpiStatusDetails",
    config: any
}

const Box = ({width, height, type, config}: BoxConfig) => {
    return (
        <div className={styles.box} style={{width, height}}>
            {renderBox(type, config)}
        </div>
    )
};

function renderBox(type: string, config: any) {
    switch (type) {
        case 'text':
            return <TextBox config={config}></TextBox>;
        case 'iconsList':
            return <ListWithIcons config={config}></ListWithIcons>;
        case 'pieChart':
            return <ChartBox config={config}></ChartBox>
        case 'columnChart':
            return <ColumnChartBox config={config}></ColumnChartBox>
        case 'image':
            return <ImageBox config={config}></ImageBox>
        case 'iconsTextList':
            return <TextWithIcons config={config}></TextWithIcons>
        case 'kpiStatusDetails':
            return <KpiStatusDetails config={config}></KpiStatusDetails>
    }
}

export default Box;