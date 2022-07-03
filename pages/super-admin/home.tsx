import MainProps from '../../interfaces/MainProps';
import Box from '../../components/Box';

export default function Home({lang}: MainProps) {
    return (
        <>
            <div style={{padding: '0px 156px', display: 'flex', justifyContent: 'center'}}>
                {/* Companies */}
                <Box width='264px' height='349px' type='text' config={
                    {
                        mainText: 'Companies',
                        items: [
                            {
                                title: 'Financial Services',
                                desc: '12 Companies'
                            },
                            {
                                title: 'Education',
                                desc: '4 Companies'
                            },
                            {
                                title: 'Real Estates',
                                desc: '6 Companies'
                            }
                        ]
                    }
                }></Box>

                {/* Total KPI Status */}
                <Box width='408px' height='349px' type='pieChart' config={{
                    mainText: 'Total KPI Status',
                    series: [5, 2, 3],
                    labels: ['Achieved', 'Over Achieved', 'Not Achieved'],
                    colors: ['#715AFF', '#1D2D44', '#009FB7']
                }}></Box>

                {/* Total KPI Timeliness */}
                <Box width='408px' height='349px' type='pieChart' config={{
                    mainText: 'Total KPI Timeliness',
                    series: [4, 3, 3],
                    labels: ['On Schedule', 'Ahead of Schedule', 'Behind Schedule'],
                    colors: ['#715AFF', '#1D2D44', '#009FB7']
                }}></Box>

            </div>
            <div style={{padding: '0px 156px', display: 'flex', justifyContent: 'center', marginTop: '24px'}}>
                {/* Total Risk Rating */}
                <Box width='408px' height='349px' type='columnChart' config={
                    {
                        mainText: 'Total Risk Rating',
                        colors: ['#5CE5BD', '#3A9177', '#FFCE20', '#ED5858', '#AD4040'],
                        percents: ['50%', '70%', '100%', '30%', '10%'],
                        labels: ['11', '22', '33', '44', '55'],
                        categories: ['Very High', 'High', 'Medium', 'Low', 'Very Low'],
                        data: [4, 5, 8, 3, 2]
                    }
                }></Box>

                {/* Total KPI Timeliness */}
                <Box width='408px' height='349px' type='pieChart' config={{
                    mainText: 'Total Risk Category',
                    series: [31, 16, 25, 6, 22, 16, 16, 22, 31, 31],
                    labels: ['Strategic', 'Compliance', 'Operational', 'Technology', 'Financial', 'Compliance', 'Compliance', 'Financial', 'Strategic', 'Strategic'],
                    colors: ['#034732', '#009FB7', '#E3D7FF', '#C33149', '#CFE8EF', '#715AFF', '#FE9158', '#1D2D44', '#AEF78E', '#443850']
                }}></Box>

                <Box width='264px' height='349px' type='image' config={
                    {
                        mainText: 'Total Controls Assessment',
                        subText: 'None',
                        image: '/icons/none.svg',
                    }
                }></Box>
            </div>
        </>
    );
}