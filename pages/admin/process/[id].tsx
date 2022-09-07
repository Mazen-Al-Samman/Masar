import {HandleRequestSSR} from "../../api/Handler";
import {Col, Container, Row} from "react-bootstrap";
import Breadcrumb from "../../../components/Breadcrumb";
import TopHeader from "../../../components/common/TopHeader";
import Box from "../../../components/Box";
import {useTheme} from "../../../hooks/theme";
import Parser from "html-react-parser";
import {generateSlug, getObjectKeyArray} from "../../../hooks/helpers";
import {getUserObjectViaContext} from "../../../hooks/User";
import {useState} from "react";
import CommentBox, {ISingleUser} from "../../../components/form/Comment";
import {useRouter} from "next/router";
import {v4 as uuidV4} from "uuid";
import {IChart, IKpiStatus, IKpiStatusDetails} from "../../../interfaces/common/MainInterfaces";

interface IPageData {
    process: IProcessData;
    users: ISingleUser[];
}

interface IProcessData {
    id: string | number;
    title: string;
    narrative: string;
    policy: string;
    department: string;
    department_id: string | number;
    owner: string;
    owner_id: string | number;
    kpi_status: IKpiStatus[];
    kpi_status_details: IKpiStatusDetails[];
    risk_rating: IChart[];
    risk_category: IChart[];
    comments: IComment[];
}

interface IComment {
    content: string;
    id: string | number;
    owner: string;
    owner_id: string | number;
    updated_at: string;
}

const re = /<mention>(.*?)<\/mention>/g;
const ProcessView = ({process, users}: IPageData) => {
    console.log(process)
    const router = useRouter();
    const {translation, lang} = useTheme();
    const [comment, setComment] = useState('');

    const rating = {
        labels: getObjectKeyArray(process.risk_rating ?? [], 'rating_title'),
        percents: getObjectKeyArray(process.risk_rating ?? [], 'percentage'),
        counts: getObjectKeyArray(process.risk_rating ?? [], 'counts')
    };

    const category = {
        labels: getObjectKeyArray(process.risk_category ?? [], 'rating_title'),
        percents: getObjectKeyArray(process.risk_category ?? [], 'percentage'),
        counts: getObjectKeyArray(process.risk_category ?? [], 'counts')
    };

    const kpiStatus = {
        labels: getObjectKeyArray(process.kpi_status ?? [], 'grp'),
        percents: getObjectKeyArray(process.kpi_status ?? [], 'count'),
    };

    const prepareKpiStatusDetails = () => {
        let items: any[] = [];
        process?.kpi_status_details?.forEach(item => {
            items.push({title: item.kpi_status, desc: [item.note]})
        });
        return items;
    }

    // TODO: Handle comment function
    const handleChangeComment = (name: 'comment', value: string) => {

    }

    const handleCommentMentions = (comment: string) => {
        return comment.replace(re, matched => {
            const cleanMention = matched.replace(/<\/?mention>/g, '');
            const mentionData = cleanMention.split(':');
            return `<a style="font-weight:500; color: #000" href='${`/admin/users/${mentionData[0]}`}'>${mentionData[1]}</a>`
        });
    }

    return (
        <Container>
            <Breadcrumb
                main={{
                    title: process.title,
                    link: `/admin/process/${process.id}`
                }} sub={[{
                title: process.department,
                link: `/admin/departments/${process.department_id}`
            }]}/>

            <Col lg={12} className="mt-3"
                 style={{boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)', borderRadius: '12px'}}>
                <div
                    className="d-flex flex-wrap justify-content-lg-start justify-content-center align-items-center gap-5 p-4">
                    <a className="p-3" href="#policy">Policy</a>
                    <a className="p-3" href="#flowchart">Flowchart</a>
                    <a className="p-3" href="#narrative">Narrative</a>
                    <a className="p-3" href="#kpi">KPI</a>
                    <a className="p-3" href="#risk">Risk</a>
                </div>
            </Col>

            <Col lg={12} className="mt-3">
                <TopHeader
                    mainTitle={process.title}
                    subTitle={`Owner: ${process.owner}`}
                    icon={{
                        path: '/icons/process.svg',
                        width: 150,
                        height: 150,
                        style: {marginTop: '-10px !important'}
                    }}
                    buttons={[
                        {
                            text: '+ KPI',
                            onClick: () => {
                                return router.push(`/admin/process/kpi/${process.department_id}`);
                            }
                        },
                        {
                            icon: '/icons/edit.svg',
                            onClick: () => {
                                return router.push(`/admin/process/update/${process.id}`)
                            }
                        },
                        {
                            icon: '/icons/print.svg'
                        },
                        {
                            icon: '/icons/delete.svg',
                            styles: {backgroundColor: '#FDEEEE'}
                        }
                    ]}
                ></TopHeader>
            </Col>

            <Col log={12} id="policy" className="mt-3 p-4" style={{
                boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
                borderRadius: '12px',
                backgroundColor: '#fff'
            }}>
                <p style={{fontSize: '20px', fontWeight: '700'}}>Process Policy</p>
                <p className="mt-2 w-100 text-wrap">
                    {Parser(process.policy.replaceAll("\n", "<br/>"))}
                </p>
            </Col>

            <Col lg={12} id="flowchart"
                 className="p-5 mt-3 d-flex justify-content-center flex-column text-center align-items-center"
                 style={{
                     boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
                     borderRadius: '12px',
                     backgroundColor: '#fff'
                 }}>
                <h3>FLOWCHART</h3>
                <h1 style={{backgroundColor: 'grey', letterSpacing: '2px', borderRadius: '40px', fontSize: '20px'}}
                    className="p-2 w-25 mt-5 text-center text-light">SOON</h1>
            </Col>


            <Col id="narrative" lg={12} className="p-4 mt-3" style={{
                boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
                borderRadius: '12px',
                backgroundColor: '#fff'
            }}>
                <p style={{fontSize: '20px', fontWeight: '700'}}>Process Narrative</p>
                <p className="mt-2 w-100 text-wrap">
                    {Parser(process.narrative.replaceAll("\n", "<br/>"))}
                </p>
            </Col>

            <Row id="kpi" className="mt-3 gx-3">
                <Col sm={12} md={12} lg={6}>
                    <Box height='349px' type='pieChart' config={{
                        mainText: translation.totalKpiStatus,
                        series: kpiStatus.percents,
                        labels: kpiStatus.labels,
                        colors: ['#715AFF', '#1D2D44', '#009FB7'],
                        lang: lang,
                    }}></Box>
                </Col>

                <Col sm={12} md={12} lg={6} className="mt-lg-0 mt-3">
                    <Box height='349px' type='kpiStatusDetails' config={
                        {
                            mainText: 'Total KPI Status Details',
                            items: [...process.kpi_status_details]
                        }
                    }></Box>
                </Col>
            </Row>

            <Row className="mt-3 gx-3">
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
            </Row>

            <Col id="narrative" lg={12} className="p-4 mt-3" style={{
                boxShadow: '0px 20px 50px rgba(4, 37, 46, 0.08)',
                borderRadius: '12px',
                backgroundColor: '#fff'
            }}>
                <p className="mb-4" style={{fontSize: '20px', fontWeight: '700'}}>Comments</p>
                <div className="mt-2 w-100 text-wrap">
                    {
                        process.comments?.map((comment, index) => {
                            return (
                                <div key={uuidV4()} className="mb-5">
                                    <div className="d-flex justify-content-start align-items-center gap-3">
                                        <p
                                            className="d-flex justify-content-center align-items-center text-white"
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                fontSize: '13px',
                                                backgroundColor: 'red',
                                                borderRadius: '50px',
                                                fontWeight: 'bold'
                                            }}>
                                            {generateSlug(comment.owner)}
                                        </p>
                                        <p style={{fontWeight: '500'}}>{comment.owner}</p>
                                        <p style={{color: '#365158', letterSpacing: '1px'}}>{comment.updated_at}</p>
                                    </div>
                                    <p className="px-5" style={{fontWeight: '400', color: '#67727E'}}>
                                        {Parser(handleCommentMentions(comment.content))}
                                    </p>
                                </div>
                            );
                        })
                    }
                </div>

                <div className="d-flex justify-content-start">
                    <CommentBox id="comment" name="comment" placeHolder="Add a comment..." label=""
                                onChange={handleChangeComment} usersList={[...users]}></CommentBox>
                </div>
            </Col>
        </Container>
    )
}

export async function getServerSideProps(ctx: any) {
    let processId = ctx.query.id;
    const ProcessReq = HandleRequestSSR({
        url: `/process/${processId}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const [process] = await Promise.all([
        ProcessReq
    ]);

    if (process?.data?.redirect) {
        return {
            redirect: {
                permanent: false,
                destination: process?.data?.to || "/",
            }
        }
    }

    const departmentId = process?.data?.department_id;
    const userData = getUserObjectViaContext(ctx);
    const companyUsers = HandleRequestSSR({
        url: `/user/get-users-list?company_id=${userData?.company_id}&department_id=${departmentId}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const [users] = await Promise.all([
        companyUsers
    ]);

    if (users?.data?.redirect) {
        return {
            redirect: {
                permanent: false,
                destination: users?.data?.to || "/",
            }
        }
    }

    return {
        props: {
            process: process?.data,
            users: users?.data
        }
    };
}

export default ProcessView;