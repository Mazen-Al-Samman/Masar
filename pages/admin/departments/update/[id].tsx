import MainProps from "../../../../interfaces/MainProps";
import {HandleRequestSSR} from "../../../api/Handler";
import {getUserObjectViaContext} from "../../../../hooks/User";
import DepartmentForm from "../../../../components/departments/actions/Form";
import {useLayoutEffect} from "react";
import {IDepartmentForm} from "../../../../interfaces/common/IForms";
import {IListUser} from "../../../../interfaces/common/MainInterfaces";

interface IPageData {
    users: IListUser[];
    department: IDepartmentForm;
}

const NewDepartment = ({setSuccessData, showSuccess, users, showFailed, department}: (MainProps & IPageData)) => {

    useLayoutEffect(() => {
        setSuccessData({
            title: `${department.title_en?.toLocaleUpperCase()} has been updated`,
            subTitle: "You can view your department info via clicking on the button bellow.",
            buttonLink: `/admin/departments/${department.id}`,
            buttonText: `View ${department.title_en}`
        });
    }, []);

    return (
        <DepartmentForm showFailed={showFailed}
                        showSuccess={showSuccess}
                        users={users}
                        formData={{...department}}
                        url={`/department/${department.id}`}
                        method="put"
        />
    );
}

export async function getServerSideProps(ctx: any) {
    const userData = getUserObjectViaContext(ctx);
    const departmentId = ctx.query.id;
    const companyUsers = HandleRequestSSR({
        url: `/user/get-users-list?company_id=${userData?.company_id}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    });

    const DepartmentForm = HandleRequestSSR({
        url: `/department/update/${departmentId}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    });

    const [users] = await Promise.all([
        companyUsers
    ]);

    const [department] = await Promise.all([
        DepartmentForm
    ]);

    if (department?.data?.redirect) {
        return {
            redirect: {
                permanent: false,
                destination: department?.data?.to || "/",
            }
        }
    }

    return {
        props: {
            users: users?.data,
            department: department?.data
        }
    };
}

export default NewDepartment;