import {getUserObjectViaContext} from "../../../../hooks/User";
import {HandleRequestSSR} from "../../../api/Handler";
import React, {useLayoutEffect} from "react";
import MainProps from "../../../../interfaces/MainProps";
import ProcessForm from "../../../../components/process/form";
import {IListUser} from "../../../../interfaces/common/MainInterfaces";

interface IPageData {
    users: IListUser[];
    departmentId: string | number;
}

const CreateProcess = ({users, departmentId, showFailed, showSuccess, setSuccessData}: (IPageData & MainProps)) => {
    const formData = {department_id: departmentId};
    useLayoutEffect(() => {
        setSuccessData({
            title: "Process has been created",
            subTitle: "Click on the all department button to back to the departments page",
            buttonLink: `/admin/departments/${departmentId}`,
            buttonText: 'All Departments'
        });
    }, []);

    return (
        <ProcessForm users={users} formData={formData} showFailed={showFailed} showSuccess={showSuccess}/>
    )
}

export async function getServerSideProps(ctx: any) {
    const departmentId = ctx.query.id;
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
            users: users?.data,
            departmentId: departmentId
        }
    };
}

export default CreateProcess;