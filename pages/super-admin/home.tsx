import MainProps from '../../interfaces/MainProps';
import Box from '../../components/Box';
import translation from "../../common/translation";

export default function Home({lang}: MainProps) {
    const translate = translation[lang];
    return (
        <>
            <div style={{padding: '0px 156px', display: 'flex', justifyContent: 'center'}}>
                {/* Companies */}
                <Box width='264px' height='349px' type='text' config={
                    {
                        mainText: translate.companies,
                        items: [
                            {
                                title: translate.financialServices,
                                desc: `12 ${translate.companies}`
                            },
                            {
                                title: translate.education,
                                desc: `4 ${translate.companies}`
                            },
                            {
                                title: translate.realEstates,
                                desc: `6 ${translate.companies}`
                            }
                        ]
                    }
                }></Box>

                {/* Total KPI Status */}
                <Box width='408px' height='349px' type='pieChart' config={{
                    mainText: translate.totalKpiStatus,
                    series: [5, 2, 3],
                    labels: [translate.achieved, translate.overAchieved, translate.notAchieved],
                    colors: ['#715AFF', '#1D2D44', '#009FB7'],
                    lang: lang,
                }}></Box>

                {/* Total KPI Timeliness */}
                <Box width='408px' height='349px' type='pieChart' config={{
                    mainText: translate.totalKpiTimeliness,
                    series: [4, 3, 3],
                    labels: [translate.onSchedule, translate.aheadOfSchedule, translate.behindSchedule],
                    colors: ['#715AFF', '#1D2D44', '#009FB7'],
                    lang: lang,
                }}></Box>

            </div>
            <div style={{padding: '0px 156px', display: 'flex', justifyContent: 'center', marginTop: '24px'}}>
                {/* Total Risk Rating */}
                <Box width='408px' height='349px' type='columnChart' config={
                    {
                        mainText: translate.totalRiskRating,
                        colors: ['#5CE5BD', '#3A9177', '#FFCE20', '#ED5858', '#AD4040'],
                        percents: ['50%', '70%', '100%', '30%', '10%'],
                        labels: ['11', '22', '33', '44', '55'],
                        categories: [translate.veryHigh, translate.high, translate.medium, translate.low, translate.veryLow],
                        data: [4, 5, 8, 3, 2],
                        lang: lang,
                    }
                }></Box>

                {/* Total KPI Timeliness */}
                <Box width='408px' height='349px' type='pieChart' config={{
                    mainText: translate.totalRiskCategory,
                    series: [31, 16, 25, 6, 22, 16, 16, 22, 31, 31],
                    labels: [translate.strategic, translate.operational, translate.technology, translate.financial, translate.strategic, translate.operational, translate.technology, translate.financial, translate.strategic, translate.operational],
                    colors: ['#034732', '#009FB7', '#E3D7FF', '#C33149', '#CFE8EF', '#715AFF', '#FE9158', '#1D2D44', '#AEF78E', '#443850'],
                    lang: lang,
                }}></Box>

                <Box width='264px' height='349px' type='image' config={
                    {
                        mainText: translate.totalControlsAssessment,
                        subText: translate.none,
                        image: '/icons/none.svg',
                    }
                }></Box>
            </div>
        </>
    );
}