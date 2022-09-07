import dynamic from "next/dynamic";
import {left, right} from "@popperjs/core";
import {isClientSide} from "../hooks/helpers";

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

interface BoxItems {
    config: chartConfig
}

interface chartConfig {
    series: number[],
    labels: string[],
    colors: string[],
    mainText: string,
    lang: string
}

const ChartBox = ({config}: BoxItems) => {
    const {series, colors, labels, mainText, lang} = config;
    const negative = (lang == 'ar') ? -1 : 1;
    const obj = {
        series: series,
        options: {
            labels: labels,
            dataLabels: {
                enabled: false
            },
            background: {
                enabled: false
            },
            stroke: {
                show: false,
            },
            legend: {
                show: true,
                fontSize: '12px',
                fontFamily: lang == 'ar' ? 'arabic' : 'Poppins',
                fontWeight: 600,
                position: (lang == 'ar') ? left : right,
                offsetY: (series.length > 3 ? -30 : 30),
                markers: {
                    offsetX: negative * -8,
                    offsetY: 2,
                },
                formatter: function (seriesName: string, opts: any) {
                    return `${opts.w.globals.series[opts.seriesIndex]} ${seriesName}`;
                }
            },
            colors: colors,
        },


    };

    return (
        <div style={{padding: '32px'}}>
            <p style={{fontStyle: 'normal', fontWeight: '700', fontSize: '20px', marginBottom: '42px'}}>{mainText}</p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {series.length > 0 ?
                    <Chart
                        options={obj.options}
                        series={obj.series}
                        type="pie"
                        height={"130%"}
                        width={"130%"}
                    /> :
                    <div className="d-flex justify-content-between gap-5">
                        <div className="p-5 d-flex justify-content-center align-items-center" style={{
                            height: '200px',
                            width: '200px',
                            borderRadius: '200px',
                            backgroundImage: 'linear-gradient(to right, #e1e1e1, #eee)',
                            fontSize: '25px',
                            fontWeight: '600',
                            color: '#04252E',
                            overflowX: 'hidden'
                        }}>
                        </div>

                        <div>
                            <p style={{width: '150px', height: '20px', backgroundImage: 'linear-gradient(to right, #e1e1e1, #eee)'}}></p>
                            <p style={{width: '150px', height: '20px', backgroundImage: 'linear-gradient(to right, #e1e1e1, #eee)'}}></p>
                            <p style={{width: '150px', height: '20px', backgroundImage: 'linear-gradient(to right, #e1e1e1, #eee)'}}></p>
                            <p style={{width: '150px', height: '20px', backgroundImage: 'linear-gradient(to right, #e1e1e1, #eee)'}}></p>
                            <p style={{width: '150px', height: '20px', backgroundImage: 'linear-gradient(to right, #e1e1e1, #eee)'}}></p>
                            <p style={{width: '150px', height: '20px', backgroundImage: 'linear-gradient(to right, #e1e1e1, #eee)'}}></p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ChartBox;