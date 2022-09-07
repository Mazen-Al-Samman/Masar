import MainProps from "../../../interfaces/MainProps";
import {HandleRequestSSR} from "../../api/Handler";
import {getUserAttribute, getUserObjectViaContext} from "../../../hooks/User";
import DepartmentForm from "../../../components/departments/actions/Form";
import {useLayoutEffect} from "react";
import {IListUser} from "../../../interfaces/common/MainInterfaces";

interface IPageData {
    users: IListUser[];
}

const NewDepartment = ({setSuccessData, showSuccess, users, showFailed}: (MainProps & IPageData)) => {

    useLayoutEffect(() => {
        setSuccessData({
            title: "Your department has been created",
            subTitle: "You can view your all departments by going to Departments page.",
            buttonLink: '/admin/departments',
            buttonText: 'All Departments'
        });
    }, []);

    const company_id = getUserAttribute('company_id', 0);
    return (
        <DepartmentForm showFailed={showFailed}
                        showSuccess={showSuccess}
                        users={users}
                        formData={{company_id}}
                        url="/department"
                        method="post"
        />
    );
}

export async function getServerSideProps(ctx: any) {
    const userData = getUserObjectViaContext(ctx);
    const companyUsers = HandleRequestSSR({
        url: `/user/get-users-list?company_id=${userData?.company_id}`,
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
            users: users?.data,
        }
    };
}

export default NewDepartment;