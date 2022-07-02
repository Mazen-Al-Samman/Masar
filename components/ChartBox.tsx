import dynamic from "next/dynamic";
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const ChartBox = () => {
    const obj = {
        series: [5, 2, 3],
        options: {
            chart: {
                width: '100%',
                offsetX: -12,
                dropShadow: {
                    enabled: true,
                    enabledOnSeries: undefined,
                    top: 0,
                    left: 5,
                    blur: 5,
                    color: '#04252e14',
                }
            },
            labels: ['Achieved', 'Over Achieved', 'Not Achieved'],
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
                offsetX: -32,
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
            colors: ['#715AFF', '#1D2D44', '#009FB7'],
        },


    };
    return (
        <div style={{ padding: '32px' }}>
            <p style={{ fontStyle: 'normal', fontWeight: '900', fontSize: '20px', marginBottom: '42px' }}>Total KPI Status</p>
            {(typeof window !== 'undefined') &&
                <Chart
                    options={obj.options}
                    series={obj.series}
                    type="pie"
                    width={350}
                />
            }
        </div>
    );
}

export default ChartBox;