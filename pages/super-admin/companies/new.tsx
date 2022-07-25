import Breadcrumb from "../../../components/Breadcrumb";
import MainProps from "../../../interfaces/MainProps";
import React, {useLayoutEffect, useState} from 'react'
import Image from 'next/image';
import Text from "../../../components/form/Text";
import RadioList, {RadioListConfig} from "../../../components/form/RadioList";
import Phone from "../../../components/form/Phone";
import TextArea from "../../../components/form/TextArea";
import {HandleRequestSSR} from "../../api/Handler";
import {countries} from "../../../public/assets/countries";

export interface newCompanyConfig {
    number_of_employees: RadioListConfig,
    revenue: RadioListConfig,
    sector: RadioListConfig
}

const NewCompany = ({setButtons, data, lang}: MainProps) => {
    const [next, setNext] = useState(false);
    useLayoutEffect(() => {
        setButtons(['language', 'logout'])
    }, []);

    const nextPage = (event: any) => {
        event.preventDefault();
        setNext(true);
        window.scrollTo(0, 0)
    }

    const previousPage = (event: any) => {
        event.preventDefault();
        setNext(false);
        window.scrollTo(0, 0)
    }

    const prepareCountries = (): RadioListConfig => {
        const data = countries.map((country) => {
            // @ts-ignore
            const title: string = country[`title_${lang}`];
            const id: string = country.id;
            return {
                id: id,
                title: title
            }
        });

        return {
            title: 'Country',
            data: data
        }
    }

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

            <form style={{marginBottom: '50px'}}>
                {
                    !next &&
                    <div id={`step1`}>
                        {/* Page Header */}
                        <div style={{marginTop: '40px', display: 'flex', justifyContent: 'left'}}>
                            <Image src={`/icons/company.svg`} alt="Company Icon" width={56} height={56}/>
                            <div style={{marginLeft: '24px', marginTop: '17px'}}>
                                <h1 style={{fontSize: '20px', fontWeight: '700'}}>Company Details</h1>
                                <p style={{color: '#365158', fontSize: '14px'}}>Please fill the information below</p>
                            </div>
                        </div>

                        <div style={{marginTop: '40px'}}>
                            <Text id="company-name" name="company-name" placeHolder="example"
                                  label="Company Name" width={348} height={48}></Text>
                            <RadioList id="country" name="country" placeHolder="Select" label="Country"
                                       list={prepareCountries()}></RadioList>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <Text id="city" name="city" placeHolder="example" label="City" width={348}
                                  height={48}></Text>
                            <Text id="address" name="address" placeHolder="example" label="Address" width={348}
                                  height={48}></Text>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <Phone lang={lang} id="phone" name="phone" placeHolder="123456789" label="Phone Number"
                                   list={countries}></Phone>
                            <RadioList id="sector" name="sector" placeHolder="Select" label="Sector"
                                       list={data['sector']}></RadioList>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <RadioList id="number_of_employees" name="number_of_employees" placeHolder="Select"
                                       label="Number Of Employees" list={data['number_of_employees']}></RadioList>

                            <RadioList id="annualRevenue" name="annualRevenue" placeHolder="Select"
                                       label="Annual Revenue"
                                       list={data['revenue']}></RadioList>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <TextArea id="description" name="description" placeHolder="example"
                                      label="Company Description"></TextArea>
                        </div>

                        <button onClick={nextPage} style={{
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
                    </div>
                }

                {
                    next &&
                    <div id={`step2`}>
                        {/* Page Header */}
                        <div style={{marginTop: '40px', display: 'flex', justifyContent: 'left'}}>
                            <Image src={`/icons/manager.svg`} alt="Manager Icon" width={56} height={56}/>
                            <div style={{marginLeft: '24px', marginTop: '17px'}}>
                                <h1 style={{fontSize: '20px', fontWeight: '700'}}>Manager Details</h1>
                                <p style={{color: '#365158', fontSize: '14px'}}>Please fill the information below</p>
                            </div>
                        </div>

                        <div style={{marginTop: '40px'}}>
                            <Text id="manager-name" name="manager-name" placeHolder="example"
                                  label="Manager Name" width={348} height={48}></Text>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <Text id="manager-email" name="manager-email" placeHolder="john.doe@example.com"
                                  label="Email" width={348} height={48}></Text>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <Text id="manager-position" name="manager-position" placeHolder="example"
                                  label="Position" width={348} height={48}></Text>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <Phone lang={lang} id="phone" name="phone" placeHolder="123456789" label="Phone Number"
                                   list={countries}></Phone>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'left'}}>
                            <button onClick={previousPage} style={{
                                backgroundColor: '#04252E',
                                width: '100px',
                                height: '54px',
                                borderRadius: '8px',
                                color: 'white',
                                marginTop: '48px',
                                marginBottom: '100px',
                                display: 'flex', justifyContent: 'center', padding: '12px 16px', fontSize: '16px'
                            }}>
                                <p style={{marginTop: '-3px', transform: 'rotate(180deg)'}}>
                                    <Image src={`/icons/right-arrow.svg`} width={20} height={20}></Image>
                                </p>
                            </button>

                            <button style={{
                                backgroundColor: '#04252E',
                                width: '149px',
                                height: '54px',
                                borderRadius: '8px',
                                color: 'white',
                                marginTop: '48px',
                                marginBottom: '100px',
                                marginLeft: '20px',
                                display: 'flex', justifyContent: 'center', padding: '12px 16px', fontSize: '16px'
                            }}>
                                <p>Done</p>
                                <p style={{marginLeft: '12px', marginTop: '3px'}}>
                                    <Image src={`/icons/right-arrow.svg`} width={20} height={20}></Image>
                                </p>
                            </button>
                        </div>
                    </div>
                }
            </form>
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    const newCompanyFilterRequest = HandleRequestSSR({
        url: '/company/get-form-attributes',
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    });

    const [filter] = await Promise.all([
        newCompanyFilterRequest
    ]);

    return {
        props: {
            data: filter.data,
        }
    };
}

export default NewCompany;