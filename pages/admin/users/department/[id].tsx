import {getUserObjectViaContext} from "../../../../hooks/User";
import {HandleRequestSSR} from "../../../api/Handler";
import {IDepartmentProps} from "../../departments/[id]";
import DepartmentUserMainData from "../../../../components/departments/users/UserDepartments";
import UserList from "../../../../components/users/UserList";
import {Container, Row} from "react-bootstrap";
import {IListUser} from "../../../../interfaces/common/MainInterfaces";

interface IPageData {
    users: IListUser[];
    department: IDepartmentProps
}

const DepartmentUser = ({users, department}: IPageData) => {
    return (
        <>
            <DepartmentUserMainData data={department.department} usersCount={users.length}></DepartmentUserMainData>
            <Container>
                <Row>
                    <UserList height={`500px`} users={users}></UserList>
                </Row>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    let departmentId = ctx.query.id;
    const userData = getUserObjectViaContext(ctx)
    const departmentsReq = HandleRequestSSR({
        url: `/department/${departmentId}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const companyRequest = HandleRequestSSR({
        url: `/user/get-users-list?company_id=${userData?.company_id}&department_id=${departmentId}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const [users, departments] = await Promise.all([
        companyRequest, departmentsReq
    ]);

    if (departments?.data?.redirect) {
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
            department: departments?.data
        }
    };
}

export default DepartmentUser;