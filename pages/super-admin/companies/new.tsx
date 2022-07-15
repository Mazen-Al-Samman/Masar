import Breadcrumb from "../../../components/Breadcrumb";
import MainProps from "../../../interfaces/MainProps";
import React, { useLayoutEffect } from 'react'

const NewCompany = ({ setButtons }: MainProps) => {

    useLayoutEffect(() => {
        setButtons(['language', 'logout'])
    }, []);

    return (
        <>
            <Breadcrumb
                main={{
                    title: 'New Company',
                    link: '/companies/new'
                }}
                sub={[
                    {
                        title: 'All Companies',
                        link: '/companies/all'
                    }
                ]}></Breadcrumb>
        </>
    )
}

export default NewCompany;