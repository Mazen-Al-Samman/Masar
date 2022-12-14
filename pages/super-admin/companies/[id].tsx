import MainProps from '../../../interfaces/MainProps';
import Box from "../../../components/Box";
import CompanyMainData from "../../../components/companies/CompanyMainData";
import {HandleRequestSSR} from "../../api/Handler";
import {Col, Container, Row} from "react-bootstrap";
import CompanyAttributes from "../../../components/companies/CompanyAttributes";
import {useLayoutEffect} from "react";
import {useTheme} from "../../../hooks/theme";

interface PageData {
    view: CompanyView
}

interface Manager {
    name: string,
    position: string,
    email: string,
    phone_number: string
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
    manager: Manager
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

const View = ({lang, view, setButtons}: (MainProps & PageData)) => {
    const {translation} = useTheme();
    useLayoutEffect(() => {
        setButtons(['search', 'language', 'logout']);
    }, []);

    return (
        <>
            <CompanyMainData data={view}></CompanyMainData>
            <CompanyAttributes data={view}></CompanyAttributes>
            <Container>
                <Row>
                    <Col style={{padding: 0}} sm={12} md={12} lg={4}>
                        <Box height='349px' type='text' config={
                            {
                                mainText: 'Manager Details',
                                items: [
                                    {
                                        title: view.manager.name,
                                        desc: view.manager.position
                                    },
                                    {
                                        title: 'Email',
                                        desc: view.manager.email
                                    },
                                    {
                                        title: 'Phone Number',
                                        desc: view.manager.phone_number
                                    },
                                ]
                            }
                        }></Box>
                    </Col>

                    {/* Total KPI Status */}
                    <Col sm={12} md={12} lg={4} className="mt-3 mt-lg-0">
                        <Box height='349px' type='pieChart' config={{
                            mainText: translation.totalKpiStatus,
                            series: [5, 2, 3],
                            labels: [translation.achieved, translation.overAchieved, translation.notAchieved],
                            colors: ['#715AFF', '#1D2D44', '#009FB7'],
                            lang: lang,
                        }}></Box>
                    </Col>

                    {/* Total KPI Timeliness */}
                    <Col sm={12} md={12} lg={4} className="mt-3 mt-lg-0 p-lg-0">
                        <Box height='349px' type='image' config={
                            {
                                mainText: translation.totalControlsAssessment,
                                subText: translation.none,
                                image: '/icons/none.svg',
                                lang: lang,
                                iconDescItems: [
                                    {
                                        title: translation.adequate,
                                        color: '#5CE5BD'
                                    },
                                    {
                                        title: translation.needsImprovement,
                                        color: '#000000'
                                    },
                                    {
                                        title: translation.none,
                                        color: '#ED5858'
                                    }
                                ]
                            }
                        }></Box>
                    </Col>

                </Row>
                <Row className="gx-4 mt-3">
                    <Col style={{paddingInlineStart: 0}} sm={12} md={12} lg={7}>
                        {/* Total Risk Rating */}
                        <Box height='349px' type='columnChart' config={
                            {
                                mainText: translation.totalRiskRating,
                                colors: ['#5CE5BD', '#3A9177', '#FFCE20', '#ED5858', '#AD4040'],
                                percents: ['50%', '70%', '100%', '30%', '10%'],
                                labels: ['11', '22', '33', '44', '55'],
                                categories: [translation.veryHigh, translation.high, translation.medium, translation.low, translation.veryLow],
                                data: [4, 5, 8, 3, 2],
                                lang: lang,
                            }
                        }></Box>
                    </Col>

                    <Col sm={12} md={12} lg={5} className="mt-3 mt-lg-0 p-lg-0">
                        <Box height='349px' type='pieChart' config={{
                            mainText: translation.totalRiskCategory,
                            series: [31, 16, 25, 6, 22, 16, 16, 22, 31, 31],
                            labels: [translation.strategic, translation.operational, translation.technology, translation.financial, translation.strategic, translation.operational, translation.technology, translation.financial, translation.strategic, translation.operational],
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
            // @ts-ignore
            view: companyView.data,
        }
    };
}

export default View;