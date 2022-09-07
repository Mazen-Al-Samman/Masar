import {getUserObjectViaContext} from "../../../hooks/User";
import {HandleRequestSSR} from "../../api/Handler";
import {IDepartmentConfig} from "../departments";
import {Col, Container, Row} from "react-bootstrap";
import {v4 as uuidV4} from "uuid";
import Details from "../../../components/companies/Details";
import UserList from "../../../components/users/UserList";
import {useRouter} from "next/router";
import {IListUser} from "../../../interfaces/common/MainInterfaces";

interface IPageData {
    users: IListUser[];
    departments: IDepartmentConfig[]
}

const Index = ({users, departments}: IPageData) => {
    const router = useRouter();
    const redirectTo = (url?: string) => {
        return router.push(url ?? '/admin');
    }
    return (
        <Container className="mb-5">
            <Row>
                {
                    departments && departments.map((department: IDepartmentConfig) => {
                        const {title, owner, id} = department;
                        return (
                            <Col onClick={() => redirectTo(`/admin/users/department/${id}`)} key={uuidV4()} lg={6} md={12}
                                 sm={12} className="mb-4">
                                <Details type={`department`} data={{title, owner, id}}></Details>
                            </Col>
                        )
                    })
                }

                <Col lg={12}>
                    {
                        users &&
                        <UserList users={[...users]}></UserList>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export async function getServerSideProps(ctx: any) {
    const userData = getUserObjectViaContext(ctx)
    const departmentsReq = HandleRequestSSR({
        url: `/department?companyId=${userData?.company_id}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const companyRequest = HandleRequestSSR({
        url: `/user/get-users-list?company_id=${userData?.company_id}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const [users, departments] = await Promise.all([
        companyRequest, departmentsReq
    ]);

    if (users?.data?.redirect) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            }
        }
    }

    return {
        props: {
            users: users?.data,
            departments: departments?.data
        }
    };
}

export default Index;