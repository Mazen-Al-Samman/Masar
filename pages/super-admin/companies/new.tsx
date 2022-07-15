import Breadcrumb from "../../../components/Breadcrumb";
import MainProps from "../../../interfaces/MainProps";
import React, { useLayoutEffect } from 'react'
import Image from 'next/image';
import Text from "../../../components/form/Text";
import RadioList from "../../../components/form/RadioList";

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

            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'left' }}>
                <Image src={`/icons/company.svg`} alt="Comapny Icon" width={56} height={56} />
                <div style={{ marginLeft: '24px', marginTop: '17px' }}>
                    <h1 style={{ fontSize: '20px', fontWeight: '700' }}>Company Details</h1>
                    <p style={{ color: '#365158', fontSize: '14px' }}>Please fill the information below</p>
                </div>
            </div>

            <form style={{ marginTop: '40px' }}>
                <div>
                    <Text id="company-name" name="company-name" placeHolder="example" label="Company Name"></Text>
                    <RadioList id="country" name="country" placeHolder="Select" label="Country" list={
                        [
                            {
                                title: 'Syria',
                                isChecked: true
                            },
                            {
                                title: 'Iraq',
                                isChecked: false
                            },
                            {
                                title: 'UAE',
                                isChecked: false
                            },
                            {
                                title: 'Qatar',
                                isChecked: false
                            },
                            {
                                title: 'Saudi Arabia',
                                isChecked: false
                            },
                            {
                                title: 'Kuwait',
                                isChecked: false
                            },
                            {
                                title: 'Yemen',
                                isChecked: false
                            },
                            {
                                title: 'Jordan',
                                isChecked: false
                            },
                        ]
                    }></RadioList>
                </div>

                <div style={{marginTop: '32px'}}>
                    <Text id="city" name="city" placeHolder="example" label="City"></Text>
                    <Text id="address" name="address" placeHolder="example" label="Address"></Text>
                </div>

            </form>
        </>
    )
}

export default NewCompany;