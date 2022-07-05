import dynamic from "next/dynamic";

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
    const {mainText, colors, percents, labels, categories, data, lang} = config;
    const negative = (lang == 'ar') ? -1 : 1;
    const options = {
        chart: {
            offsetY: -40,
            type: 'bar',
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
            show: true,
            position: 'right',
            offsetX: -30,
            offsetY: -3,
            fontSize: '12px',
            fontFamily: 'Poppins',
            fontWeight: 600,
            itemMargin: {
                vertical: 12,
            },
            markers: {
                shape: "circle",
                radius: 10,
                offsetY: 1,
                offsetX: negative * -10
            },
            formatter: function (seriesName: string, opts: any) {
                return [percents[opts.seriesIndex] + " " + seriesName]
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
        labels: labels
    };

    const series = [
        {
            data: data
        },
    ];
    return (
        <div style={{padding: '32px'}}>
            <p style={{fontStyle: 'normal', fontWeight: '900', fontSize: '20px', marginBottom: '42px'}}>{mainText}</p>
            {(typeof window !== 'undefined') &&
                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    width={610}
                    height={275}
                />
            }
        </div>
    )
}
export default ColumnChartBox;