import {HandleRequestSSR} from "../../api/Handler";
import DepartmentMainData from "../../../components/departments/DepartmentMainData";
import {Col, Container, Row} from "react-bootstrap";
import Box from "../../../components/Box";
import {useTheme} from "../../../hooks/theme";
import {useRouter} from "next/router";
import {IKpiStatus, IListUser, IKpiStatusDetails, IChart, IDepartment} from "../../../interfaces/common/MainInterfaces";
import {getObjectKeyArray} from "../../../hooks/helpers";

interface IPageData {
    view: IDepartmentProps;
}

export interface IDepartmentProps {
    department: IDepartment;
    process: ISingleProcess[];
    users: IListUser[];
    totalKPIStatus: IKpiStatus[];
    totalKPIStatusDetails: IKpiStatusDetails[];
    totalRiskCategory: IChart[];
    totalRiskRating: IChart[];
}

interface ISingleProcess {
    id: number | string;
    title: string;
    owner: string;
}

const View = ({view}: IPageData) => {
    console.log(view)
    const {
        department,
        process,
        users,
        totalKPIStatus,
        totalKPIStatusDetails,
        totalRiskCategory,
        totalRiskRating
    } = view;
    const {translation, lang} = useTheme();

    const rating = {
        labels: getObjectKeyArray(totalRiskRating ?? [], 'rating_title'),
        percents: getObjectKeyArray(totalRiskRating ?? [], 'percentage'),
        counts: getObjectKeyArray(totalRiskRating ?? [], 'counts')
    };

    const category = {
        labels: getObjectKeyArray(totalRiskCategory ?? [], 'rating_title'),
        percents: getObjectKeyArray(totalRiskCategory ?? [], 'percentage'),
        counts: getObjectKeyArray(totalRiskCategory ?? [], 'counts')
    };

    const kpiStatus = {
        labels: getObjectKeyArray(totalKPIStatus ?? [], 'grp'),
        percents: getObjectKeyArray(totalKPIStatus ?? [], 'count'),
    };

    const router = useRouter();

    const prepareProcesses = () => {
        let result: any[] = [];
        process?.forEach((item) => {
            result.push({title: item.title, desc: item.owner, href: `/admin/process/${item.id}`});
        });
        return result;
    }

    const prepareUsers = () => {
        let result: any[] = [];
        users?.forEach((item) => {
            result.push({title: item.username, desc: item.position, href: `/admin/users/${item.id}`});
        });
        return result;
    }

    return (
        <>
            <DepartmentMainData data={department} usersCount={users.length}></DepartmentMainData>
            <Container className="mb-5">
                <Row>
                    <Col style={{padding: 0}} className="px-3 px-lg-0" sm={12} md={12} lg={6}>
                        <Box height='349px' type='text' config={
                            {
                                mainText: `All Processes (${process.length})`,
                                items: [
                                    ...prepareProcesses()
                                ],
                                button: {
                                    text: '+ New',
                                    onClick: function () {
                                        return router.push(`/admin/process/new/${department.id}`);
                                    }
                                }
                            }
                        }></Box>
                    </Col>

                    <Col className="px-3 mt-lg-0 mt-3" sm={12} md={12} lg={3}>
                        <Box height='349px' type='iconsList' config={
                            {
                                mainText: `Users  (${users.length})`,
                                items: [
                                    ...prepareUsers()
                                ],
                            }
                        }></Box>
                    </Col>

                    <Col sm={12} md={12} lg={3} className="mt-3 mt-lg-0 px-3 px-lg-0">
                        <Box height='349px' type='image' config={
                            {
                                mainText: translation.totalControlsAssessment,
                                subText: translation.none,
                                image: '/icons/none.svg',
                                lang: lang
                            }
                        }></Box>
                    </Col>

                    <Col sm={12} md={12} lg={6} className="mt-3 p-0 px-3 px-lg-0">
                        <Box height='349px' type='pieChart' config={{
                            mainText: translation.totalKpiStatus,
                            series: kpiStatus.percents,
                            labels: kpiStatus.labels,
                            colors: ['#715AFF', '#1D2D44', '#009FB7'],
                            lang: lang,
                        }}></Box>
                    </Col>

                    <Col sm={12} md={12} lg={6} className="mt-3 px-3 px-lg-0 ps-lg-3">
                        <Box height='349px' type='kpiStatusDetails' config={
                            {
                                mainText: 'Total KPI Status Details',
                                items: [...totalKPIStatusDetails]
                            }
                        }></Box>
                    </Col>

                    <Col className="mt-3 p-0 px-3 px-lg-0" sm={12} md={12} lg={7}>
                        {/* Total Risk Rating */}
                        <Box height='349px' type='columnChart' config={
                            {
                                mainText: translation.totalRiskRating,
                                colors: ['#5CE5BD', '#3A9177', '#FFCE20', '#ED5858', '#AD4040'],
                                percents: rating.percents,
                                categories: rating.labels,
                                data: rating.counts,
                                lang: lang,
                            }
                        }></Box>
                    </Col>

                    <Col sm={12} md={12} lg={5} className="mt-3 px-3 px-lg-0 ps-lg-3">
                        <Box height='349px' type='pieChart' config={{
                            mainText: translation.totalRiskCategory,
                            series: category.counts,
                            labels: category.labels,
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
    let departmentId = ctx.query.id;
    if (!departmentId) return [];

    const departmentMainData = HandleRequestSSR({
        url: `/department/${departmentId}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    });

    const [departmentView] = await Promise.all([
        departmentMainData
    ]);

    return {
        props: {
            // @ts-ignore
            view: departmentView.data,
        }
    };
}

export default View;