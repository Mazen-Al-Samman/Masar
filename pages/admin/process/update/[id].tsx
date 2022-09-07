import {getUserObjectViaContext} from "../../../../hooks/User";
import {HandleRequestSSR} from "../../../api/Handler";
import React, {useLayoutEffect} from "react";
import MainProps from "../../../../interfaces/MainProps";
import ProcessForm from "../../../../components/process/form";
import {IProcessForm} from "../../../../interfaces/common/IForms";
import {IListUser} from "../../../../interfaces/common/MainInterfaces";

interface IPageData {
    users: IListUser[];
    formData: IProcessForm;
}

const UpdateProcess = ({users, showFailed, showSuccess, setSuccessData, formData}: (IPageData & MainProps)) => {
    useLayoutEffect(() => {
        setSuccessData({
            title: "Process has been updated",
            subTitle: "Click on the all department button to back to the departments page",
            buttonLink: `/admin/departments/${formData.department_id}`,
            buttonText: 'Department'
        });
    }, []);

    return (
        <ProcessForm action={"put"} users={users} formData={formData} showFailed={showFailed} showSuccess={showSuccess}/>
    )
}

export async function getServerSideProps(ctx: any) {
    const processId = ctx.query.id;
    const userData = getUserObjectViaContext(ctx);
    const companyUsers = HandleRequestSSR({
        url: `/user/get-users-list?company_id=${userData?.company_id}&process_id=${processId}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    });

    const processForm = HandleRequestSSR({
        url: `/process/update/${processId}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    });

    const [users, process] = await Promise.all([
        companyUsers, processForm
    ]);

    if (users?.data?.redirect || process?.data?.redirect) {
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
            formData: process?.data
        }
    };
}

export default UpdateProcess;