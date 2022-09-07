import dynamic from "next/dynamic";
import {right} from "@popperjs/core";
import {isClientSide} from "../hooks/helpers";

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

interface ChartConfig {
    config: ChartData
}

interface ChartData {
    colors: string[],
    percents: string[],
    labels: string[],
    categories: string[],
    data: number[],
    mainText: string,
    lang: string
}

const ColumnChartBox = ({config}: ChartConfig) => {
    const width = isClientSide() ? window.innerWidth : 0;
    const {mainText, colors, percents, labels, categories, data, lang} = config;
    const negative = (lang == 'ar') ? -1 : 1;

    const options = {
        chart: {
            offsetY: -40,
            toolbar: {
                show: false
            }
        },
        colors: colors,
        plotOptions: {
            bar: {
                columnWidth: '50',
                distributed: true,
                borderRadius: 5,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: width > 1300,
            position: right,
            fontSize: '12px',
            fontFamily: lang == 'ar' ? 'arabic' : 'poppins',
            fontWeight: 600,
            itemMargin: {
                vertical: 8,
            },
            markers: {
                shape: "circle",
                radius: 10,
                offsetY: 1,
                offsetX: negative * -10
            },
            formatter: function (seriesName: string, opts: any) {
                return `${percents[opts.seriesIndex]}% ${seriesName}`;
            }
        },
        grid: {
            borderColor: '#E6E9EA',
            strokeDashArray: 5,
        },
        xaxis: {
            categories: categories,
            labels: {
                show: false
            }
        },
    };

    const series = [
        {
            data: data
        },
    ];
    return (
        <div style={{padding: '32px'}}>
            <p style={{fontStyle: 'normal', fontWeight: '700', fontSize: '20px', marginBottom: '42px'}}>{mainText}</p>
            <div className="d-flex justify-content-center position-relative w-100">
                {data.length > 0 ?
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        width={width > 1300 ? "600" : "350"}
                        height={275}
                    /> :
                    <div style={{
                        transform: 'scaleY(-1)'
                    }}>
                        <div className="d-flex justify-content-between gap-5">
                            <div style={{
                                width: '100px',
                                height: '200px',
                                backgroundImage: 'linear-gradient(to right, #e1e1e1, #eee)',
                            }}></div>

                            <div style={{
                                width: '100px',
                                height: '165px',
                                backgroundImage: 'linear-gradient(to right, #e1e1e1, #eee)',
                            }}></div>

                            <div style={{
                                width: '100px',
                                height: '175px',
                                backgroundImage: 'linear-gradient(to right, #e1e1e1, #eee)',
                            }}></div>

                            <div style={{
                                width: '100px',
                                height: '215px',
                                backgroundImage: 'linear-gradient(to right, #e1e1e1, #eee)',
                            }}></div>

                            <div style={{
                                width: '100px',
                                height: '150px',
                                backgroundImage: 'linear-gradient(to right, #e1e1e1, #eee)',
                            }}></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default ColumnChartBox;