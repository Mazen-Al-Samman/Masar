import {Col, Container, Row} from "react-bootstrap";
import {getUserObjectViaContext} from "../../../../hooks/User";
import {HandleRequestSSR} from "../../../api/Handler";
import {IRisk} from "../index";
import {useTheme} from "../../../../hooks/theme";
import {useRouter} from "next/router";
import {getObjectKeyArray} from "../../../../hooks/helpers";
import Box from "../../../../components/Box";
import {v4 as uuidV4} from "uuid";
import Details from "../../../../components/companies/Details";
import TopHeader from "../../../../components/common/TopHeader";

interface IPageData {
    risk: IRisk;
}

const ProcessView = ({risk}: IPageData) => {
    const {translation, lang} = useTheme();
    const router = useRouter();
    const redirectTo = (url: string) => {
        return router.push(url);
    }

    const rating = {
        labels: getObjectKeyArray(risk.rating_chart ?? [], 'rating_title'),
        percents: getObjectKeyArray(risk.rating_chart ?? [], 'percentage'),
        counts: getObjectKeyArray(risk.rating_chart ?? [], 'counts')
    };

    const category = {
        labels: getObjectKeyArray(risk.category_chart ?? [], 'rating_title'),
        percents: getObjectKeyArray(risk.category_chart ?? [], 'percentage'),
        counts: getObjectKeyArray(risk.category_chart ?? [], 'counts')
    };
    return (
        <Container>
            <Row className="mt-3 gx-3 m-0 p-0">
                <Col lg={12} className="mt-3">
                    <TopHeader
                        mainTitle={risk.process?.title}
                        subTitle={`Owner: ${risk.process?.owner}`}
                        icon={{
                            path: '/icons/risk.svg',
                            width: 150,
                            height: 150,
                        }}
                    ></TopHeader>
                </Col>
            </Row>

            <Row className="mt-3 gx-3 m-0 p-0">
                <Col sm={12} md={12} lg={7}>
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

                <Col sm={12} md={12} lg={5} className="mt-lg-0 mt-3">
                    <Box height='349px' type='pieChart' config={{
                        mainText: translation.totalRiskCategory,
                        series: category.counts,
                        labels: category.labels,
                        colors: ['#034732', '#009FB7', '#E3D7FF', '#C33149', '#CFE8EF', '#715AFF', '#FE9158', '#1D2D44', '#AEF78E', '#443850'],
                        lang: lang,
                    }}></Box>
                </Col>

                <Row className="mt-3 m-0 p-0">
                    {
                        risk.processes && risk.processes?.map((process) => {
                            const {title, owner, id} = process;
                            return (
                                <Col onClick={() => redirectTo(`/admin/risk/department/${id}`)} key={uuidV4()} lg={6}
                                     md={12} sm={12} className="mb-3 px-2">
                                    <Details type={`process`} data={{title, owner, id}}></Details>
                                </Col>
                            )
                        })
                    }
                </Row>

                <Row className="mb-5 m-0 scroll">
                    <div className="p-4" style={{
                        boxShadow: '0 20px 50px rgba(4, 37, 46, 0.08)',
                        borderRadius: '12px',
                    }}>
                        <p style={{fontSize: '20px', fontWeight: '700'}}>Risk Details</p>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="table-responsive">
                                <table className="table table-bordered table-rounded">
                                    <thead className="table-header text-center">
                                    <th colSpan={2}>Risk Information</th>
                                    <th colSpan={4}>Risk Identification</th>
                                    <th colSpan={3}>Control Assessment</th>
                                    <th>Risk Assessment</th>
                                    <th colSpan={3}>Risk Mitigation</th>
                                    <th>Edit, Delete</th>
                                    </thead>
                                    <tbody>
                                    <tr className="table-body">
                                        <td>id</td>
                                        <td>Risk Description</td>
                                        <td>Category</td>
                                        <td>Likelihood</td>
                                        <td>Impact</td>
                                        <td>Gross Rating</td>
                                        <td>Control in place</td>
                                        <td>Control Rating</td>
                                        <td>Control Owner</td>
                                        <td>Residual Risk Rating</td>
                                        <td>Risk Response</td>
                                        <td>Action Plan</td>
                                        <td>Due Date</td>
                                        <td></td>
                                    </tr>

                                    {
                                        risk.risks?.length && risk.risks?.map(risk => {
                                            return (
                                                <tr key={uuidV4()} className="normal-rows">
                                                    <td>{risk.id}</td>
                                                    <td>{risk.description}</td>
                                                    <td>{risk.category}</td>
                                                    <td>{risk.likelihood}</td>
                                                    <td>{risk.impact}</td>
                                                    <td>Gross Rating</td>
                                                    <td>{risk.control_in_place}</td>
                                                    <td>{risk.controlRating}</td>
                                                    <td>{risk.controlOwner}</td>
                                                    <td>Residual Risk Rating</td>
                                                    <td>{risk.response}</td>
                                                    <td>{risk.action_plan}</td>
                                                    <td>{risk.action_due_date}</td>
                                                    <td></td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Row>
            </Row>
        </Container>
    );
}

export async function getServerSideProps(ctx: any) {
    const processId = ctx.query.id;
    const userData = getUserObjectViaContext(ctx);
    const companyRiskReq = HandleRequestSSR({
        url: `/risk?companyId=${userData?.company_id}&processId=${processId}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const [Risk] = await Promise.all([
        companyRiskReq
    ]);

    if (Risk?.data?.redirect) {
        return {
            redirect: {
                permanent: false,
                destination: Risk?.data?.to || "/",
            }
        }
    }

    return {
        props: {
            risk: Risk?.data,
        }
    };
}

export default ProcessView;