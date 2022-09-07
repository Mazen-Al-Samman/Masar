import {v4 as uuidV4} from 'uuid';
import css from './styles/box.module.css';
import {IKpiStatusDetails} from "../interfaces/common/MainInterfaces";

interface BoxConfig {
    config: {
        mainText: string,
        items: IKpiStatusDetails[]
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
const colors = ['#715AFF', '#1D2D44', '#009FB7', '#009FB7', '#FE9158', '#715AFF', '#034732', '#009FB7', '#E3D7FF', '#C33149', '#CFE8EF', '#715AFF', '#FE9158', '#1D2D44', '#AEF78E', '#443850'];
const TextWithIcons = ({config}: BoxConfig) => {
    const {mainText, items} = config;
    return (
        <div style={styles.main}>
            <p style={styles.p}>{mainText}</p>
            <div style={styles.inner.div} className={css.scroll}>
                {
                    items.length ?
                        items.map((item, idx) => {
                            const color = colors[parseInt(item.status_id.toString()) - 1];
                            return (
                                <div key={uuidV4()}>
                                    <div className="d-flex justify-content-start" style={{gap: '10px'}}>
                                        <div
                                            className="d-flex justify-content-center align-items-center me-2 text-white"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                backgroundColor: color,
                                                borderRadius: '50px',
                                                fontSize: '16px',
                                                fontWeight: '700'
                                            }}>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="mt-2" style={styles.inner.p}>{item.kpi_status}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div key={uuidV4()}
                                             className="d-flex flex-nowrap justify-content-start px-2 gap-3 align-items-start mt-3">
                                            <div style={{
                                                minHeight: '9px',
                                                minWidth: '9px',
                                                backgroundColor: color,
                                                borderRadius: '50px',
                                                marginTop: '0.3rem',
                                            }}></div>
                                            <p className="font-14 font-weight-600 mb-0">Target KPI</p>
                                        </div>
                                        <p className="grey-text font-12 font-weight-400 ms-2 mt-2">{item.target}</p>
                                        <p className="font-14 font-weight-600 ms-2 mb-0">Actual KPI</p>
                                        <p className="grey-text font-12 font-weight-400 ms-2 mt-2">{item.actual}</p>
                                        <p className="font-14 font-weight-600 ms-2 mb-0">Note</p>
                                        <p className="grey-text font-12 font-weight-400 ms-2 mt-2">{item.note}</p>
                                        <p className="font-14 font-weight-600 ms-2 mb-0">Strategic Goal</p>
                                        <p className="grey-text font-12 font-weight-400 ms-2 mt-2">{item.kpi_strategic_goal}</p>
                                    </div>
                                    <hr style={styles.inner.hr}/>
                                </div>
                            )
                        })
                        :
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <p>No Data</p>
                        </div>
                }
            </div>
        </div>
    )
};
export default TextWithIcons;