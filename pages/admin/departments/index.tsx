import {useLayoutEffect} from "react";
import MainProps from "../../../interfaces/MainProps";
import {HandleRequestSSR} from "../../api/Handler";
import {getUserObjectViaContext} from "../../../hooks/User";
import {Col, Container, Row} from "react-bootstrap";
import Details from "../../../components/companies/Details";
import {useRouter} from "next/router";
import {v4 as uuidV4} from 'uuid';

interface IPageData {
    data: IDepartmentConfig[]
}

export interface IDepartmentConfig {
    company?: string;
    company_id?: string;
    id?: string;
    owner?: string;
    owner_id?: string;
    title?: string;
}

const Departments = ({setButtons, data}: (MainProps & IPageData)) => {
    const router = useRouter();
    const redirectTo = (url: string) => {
        return router.push(url);
    }

    useLayoutEffect(() => {
        setButtons(['profile', 'language', 'logout']);
    }, []);
    return (
        <Container>
            <Row>
                <Col onClick={() => redirectTo(`departments/new`)} lg={6} md={12} sm={12} className="mb-4 pointer">
                    <Details type={`new`} data={{title: 'Add new department'}}></Details>
                </Col>
                {
                    data && data.map((department: IDepartmentConfig) => {
                        const {title, owner, id} = department;
                        return (
                            <Col onClick={() => redirectTo(`/admin/departments/${id}`)} key={uuidV4()} lg={6} md={12} sm={12} className="mb-4 pointer">
                                <Details type={`department`} data={{title, owner, id}}></Details>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}


export async function getServerSideProps(ctx: any) {
    const userData = getUserObjectViaContext(ctx);
    const departmentsReq = HandleRequestSSR({
        url: `/department?companyId=${userData?.company_id}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const [departments] = await Promise.all([
        departmentsReq
    ]);

    if (departments?.data?.redirect) {
        return {
            redirect: {
                permanent: false,
                destination: departments?.data?.to || "/",
            }
        }
    }

    return {
        props: {
            data: departments?.data,
        }
    };
}

export default Departments;