import dynamic from "next/dynamic";

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
            chart: {
                width: '10px',
                horizontal: 'center'
            },
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
                verticalAlign: 'center' ?? undefined,
                fontSize: '12px',
                fontFamily: lang == 'ar' ? 'arabic' : 'Poppins',
                fontWeight: 600,
                offsetX: negative * 10,
                offsetY: (series.length > 3 ? -30 : 0),
                itemMargin: {
                    vertical: 8,
                },
                position: (lang == 'ar') ? 'left' : 'right',
                markers: {
                    offsetX: negative * -15,
                    offsetY: 1.1,
                },
                formatter: function (seriesName: string, opts: any) {
                    return [opts.w.globals.series[opts.seriesIndex] + " " + seriesName]
                }
            },
            colors: colors,
        },


    };

    return (
        <div style={{padding: '32px'}}>
            <p style={{fontStyle: 'normal', fontWeight: '700', fontSize: '20px', marginBottom: '42px'}}>{mainText}</p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {(typeof window !== 'undefined') &&
                    <Chart
                        options={obj.options}
                        series={obj.series}
                        type="pie"
                        height={160}
                        width={408}
                    />
                }
            </div>
        </div>
    );
}

export default ChartBox;