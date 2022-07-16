import Breadcrumb from "../../../components/Breadcrumb";
import MainProps from "../../../interfaces/MainProps";
import React, {useLayoutEffect} from 'react'
import Image from 'next/image';
import Text from "../../../components/form/Text";
import RadioList from "../../../components/form/RadioList";
import Phone from "../../../components/form/Phone";
import TextArea from "../../../components/form/TextArea";

const NewCompany = ({setButtons}: MainProps) => {

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

            {/* Page Header */}
            <div style={{marginTop: '40px', display: 'flex', justifyContent: 'left'}}>
                <Image src={`/icons/company.svg`} alt="Comapny Icon" width={56} height={56}/>
                <div style={{marginLeft: '24px', marginTop: '17px'}}>
                    <h1 style={{fontSize: '20px', fontWeight: '700'}}>Company Details</h1>
                    <p style={{color: '#365158', fontSize: '14px'}}>Please fill the information below</p>
                </div>
            </div>

            <form style={{marginTop: '40px', marginBottom: '50px'}}>
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

                <div style={{marginTop: '32px'}}>
                    <Phone id="phone" name="phone" placeHolder="123456789" label="Phone Number" list={
                        [
                            {
                                title: 'Jordan (+962)',
                                isChecked: true,
                                flag: 'jordan',
                                code: '00962'
                            },
                            {
                                title: 'Iraq (+972)',
                                isChecked: false,
                                flag: 'iraq',
                                code: '00972'
                            },
                            {
                                title: 'UAE (+98)',
                                isChecked: false,
                                flag: 'uae',
                                code: '0098'
                            },
                            {
                                title: 'Qatar (+12)',
                                isChecked: false,
                                flag: 'qatar',
                                code: '0012'
                            },
                            {
                                title: 'Saudi Arabia (+673)',
                                isChecked: false,
                                flag: 'saudi',
                                code: '00673'
                            },
                            {
                                title: 'Kuwait (+34)',
                                isChecked: false,
                                flag: 'kuwait',
                                code: '0034'
                            },
                            {
                                title: 'Yemen (+967)',
                                isChecked: false,
                                flag: 'jordan',
                                code: '00967'
                            },
                            {
                                title: 'Syria (+963)',
                                isChecked: false,
                                flag: 'jordan',
                                code: '00963'
                            },
                        ]
                    }></Phone>

                    <RadioList id="sector" name="sector" placeHolder="Select" label="Sector" list={
                        [
                            {
                                title: 'Banking',
                                isChecked: true
                            },
                            {
                                title: 'Financial Services',
                                isChecked: false
                            },
                            {
                                title: 'Education',
                                isChecked: false
                            },
                            {
                                title: 'Real Estates',
                                isChecked: false
                            },
                            {
                                title: 'Hospitality & Tourism',
                                isChecked: false
                            },
                            {
                                title: 'Public Sector',
                                isChecked: false
                            }
                        ]
                    }></RadioList>
                </div>

                <div style={{marginTop: '32px'}}>
                    <RadioList id="numOfEmployees" name="numOfEmployees" placeHolder="Select"
                               label="Number Of Employees" list={
                        [
                            {
                                title: '1-10 Employees',
                                isChecked: true
                            },
                            {
                                title: '11-50 Employees',
                                isChecked: false
                            },
                            {
                                title: '+50 Employee',
                                isChecked: false
                            }
                        ]
                    }></RadioList>

                    <RadioList id="annualRevenue" name="annualRevenue" placeHolder="Select" label="Annual Revenue"
                               list={
                                   [
                                       {
                                           title: '1-10 Employees',
                                           isChecked: true
                                       },
                                       {
                                           title: '11-50 Employees',
                                           isChecked: false
                                       },
                                       {
                                           title: '+50 Employee',
                                           isChecked: false
                                       }
                                   ]
                               }></RadioList>
                </div>

                <div style={{marginTop: '32px'}}>
                    <TextArea id="description" name="description" placeHolder="example"
                              label="Company Description"></TextArea>
                </div>

                <button style={{
                    backgroundColor: '#04252E',
                    width: '149px',
                    height: '54px',
                    borderRadius: '8px',
                    color: 'white',
                    marginTop: '62px',
                    display: 'flex', justifyContent: 'center', padding: '12px 16px', fontSize: '16px'
                }}>
                    <p>Next</p>
                    <p style={{marginLeft: '12px', marginTop: '3px'}}>
                        <Image src={`/icons/right-arrow.svg`} width={20} height={20}></Image>
                    </p>
                </button>
            </form>
        </>
    )
}

export default NewCompany;