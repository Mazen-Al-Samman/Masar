import MainProps from '../../../interfaces/MainProps';
import translation from "../../../common/translation";
import Box from "../../../components/Box";
import CompanyMainData from "../../../components/companies/CompanyMainData";
import {HandleRequestSSR} from "../../api/Handler";
import {Col, Container, Row} from "react-bootstrap";
import CompanyAttributes from "../../../components/companies/CompanyAttributes";

interface PageData {
    view: CompanyView
}

export interface CompanyView {
    id: string
    logo: string
    title: string
    description: string
    phone_number: string
    country: string
    city: string
    revenue: string
    revenue_id: string
    sector: string
    sector_id: string
    manager: string
    manager_id: string
    number_of_employees: string
    number_of_employees_id: string
    totalKPIStatus: string
    totalControlsAssessment: string
    totalRiskRating: string
    totalRiskCategory: string
    numberOfUsers: string
    numberOfDepartments: string
}

const View = ({lang, view}: (MainProps & PageData)) => {
    console.log(view)
    const translate = translation[lang];
    return (
        <>
            <CompanyMainData data={view}></CompanyMainData>
            <CompanyAttributes data={view}></CompanyAttributes>
            <Container>
                <Row>
                    <Col sm={12} md={12} lg={4}>
                        <Box height='349px' type='text' config={
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
                                    },
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
                    </Col>

                    {/* Total KPI Status */}
                    <Col sm={12} md={12} lg={4}>
                        <Box height='349px' type='pieChart' config={{
                            mainText: translate.totalKpiStatus,
                            series: [5, 2, 3],
                            labels: [translate.achieved, translate.overAchieved, translate.notAchieved],
                            colors: ['#715AFF', '#1D2D44', '#009FB7'],
                            lang: lang,
                        }}></Box>
                    </Col>

                    {/* Total KPI Timeliness */}
                    <Col sm={12} md={12} lg={4}>
                        <Box height='349px' type='image' config={
                            {
                                mainText: translate.totalControlsAssessment,
                                subText: translate.none,
                                image: '/icons/none.svg',
                                lang: lang,
                                iconDescItems: [
                                    {
                                        title: translate.adequate,
                                        color: '#5CE5BD'
                                    },
                                    {
                                        title: translate.needsImprovement,
                                        color: '#000000'
                                    },
                                    {
                                        title: translate.none,
                                        color: '#ED5858'
                                    }
                                ]
                            }
                        }></Box>
                    </Col>

                </Row>
                <Row style={{marginTop: '24px'}}>
                    <Col sm={12} md={12} lg={7}>
                        {/* Total Risk Rating */}
                        <Box height='349px' type='columnChart' config={
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
                    </Col>

                    <Col sm={12} md={12} lg={5}>
                        <Box height='349px' type='pieChart' config={{
                            mainText: translate.totalRiskCategory,
                            series: [31, 16, 25, 6, 22, 16, 16, 22, 31, 31],
                            labels: [translate.strategic, translate.operational, translate.technology, translate.financial, translate.strategic, translate.operational, translate.technology, translate.financial, translate.strategic, translate.operational],
                            colors: ['#034732', '#009FB7', '#E3D7FF', '#C33149', '#CFE8EF', '#715AFF', '#FE9158', '#1D2D44', '#AEF78E', '#443850'],
                            lang: lang,
                        }}></Box>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    let companyId = ctx.query.id;
    if (!companyId) return [];

    const companyMainData = HandleRequestSSR({
        url: `/company/view?id=${companyId}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    });

    const [companyView] = await Promise.all([
        companyMainData
    ]);

    return {
        props: {
            view: companyView.data,
        }
    };
}

export default View;