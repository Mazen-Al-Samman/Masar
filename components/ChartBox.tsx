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
    mainText: string
}

const ChartBox = ({config}: BoxItems) => {
    const {series, colors, labels, mainText} = config;
    const obj = {
        series: series,
        options: {
            chart: {
                width: '10px',
                offsetX: -40,
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
                horizontalAlign: 'center',
                verticalAlign: 'center',
                fontSize: '12px',
                fontFamily: 'Poppins',
                fontWeight: 600,
                offsetX: -2,
                offsetY: -4,
                itemMargin: {
                    vertical: 8,
                },
                markers: {
                    offsetX: -15,
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
            <p style={{fontStyle: 'normal', fontWeight: '900', fontSize: '20px', marginBottom: '42px'}}>{mainText}</p>
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
    );
}

export default ChartBox;