import Breadcrumb from "../../../components/Breadcrumb";
import MainProps from "../../../interfaces/MainProps";
import React, {useLayoutEffect, useState} from 'react'
import Image from 'next/image';
import Text from "../../../components/form/Text";
import RadioList, {RadioListConfig} from "../../../components/form/RadioList";
import Phone from "../../../components/form/Phone";
import TextArea from "../../../components/form/TextArea";
import {HandleRequestClient, HandleRequestSSR} from "../../api/Handler";
import {countries} from "../../../public/assets/countries";

export interface newCompanyConfig {
    number_of_employees: RadioListConfig,
    revenue: RadioListConfig,
    sector: RadioListConfig
}

interface Validation {
    title_en?: string,
    title_ar?: string,
    country?: string,
    sector?: string,
    number_of_employees_id?: string,
    revenue_id?: string,
    description_en?: string,
    description_ar?: string,
    sector_id?: string,
    phone_number?: string,
    manager_name?: string,
    manager_phone_number?: string,
    manager_position?: string,
    manager_email?: string
}

interface Company {
    title_en?: string,
    title_ar?: string,
    description_en?: string,
    description_ar?: string,
    phone_number?: string,
    country?: string,
    city?: string,
    revenue_id?: string,
    sector_id?: string,
    number_of_employees_id?: string
}

interface Manager {
    username?: string,
    email?: string,
    position?: string,
    phone_number?: string,
}

const NewCompany = ({setButtons, data, lang, token}: MainProps) => {
    const [validation, setValidation] = useState<Validation>({})
    const [company, setCompany] = useState<Company>({})
    const [manager, setManager] = useState<Manager>({})
    const companyAttributes = [
        "title_en",
        "title_ar",
        "description_en",
        "description_ar",
        "phone_number",
        "country",
        "city",
        "revenue_id",
        "sector_id",
        "number_of_employees_id",
    ]
    // const [values, setValue] =
    const [next, setNext] = useState(false);
    useLayoutEffect(() => {
        setButtons(['language', 'logout'])
    }, []);

    // Move to the Manager Form
    const nextPage = (event: any) => {
        event.preventDefault();
        setNext(true);
        window.scrollTo(0, 0)
    }

    // Back to the Company form
    const previousPage = (event: any) => {
        event && event.preventDefault();
        setNext(false);
        window.scrollTo(0, 0)
    }

    // This function will check if there is any company field error, and back to the company details form.
    const validateAttributes = (errors: object) => {
        setValidation(errors);
        const errorsAttributes = Object.keys(errors);
        const companyErrors = errorsAttributes.filter(value => companyAttributes.includes(value));
        if (companyErrors.length) previousPage(null);
    }

    // Clear validation errors
    const clearErrors = (key: Validation) => {
        let errorObj = {...validation};
        // @ts-ignore
        delete errorObj[`${key}`];
        setValidation(errorObj);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Send a request to the API via the handler function.
        const request = HandleRequestClient({
            url: '/company/create-or-update',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': lang,
                'x-api-key': token,
            },
            data: {
                company,
                manager
            },
            successCallBack: function () {
                alert("Hello world!")
            },
            failedCallBack: validateAttributes,
        });
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

            <form style={{marginBottom: '50px', letterSpacing: '1px'}}>
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
                            <Text id="title-en" name="title_en" placeHolder="example"
                                  label="English Title" width={348} height={48} validation={validation.title_en}
                                  onFocus={clearErrors}></Text>

                            <Text id="title-ar" name="title_ar" placeHolder="example"
                                  label="Arabic Title" width={348} height={48} validation={validation.title_ar}
                                  onFocus={clearErrors}></Text>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <Text id="city" name="city" placeHolder="example" label="City" width={348}
                                  height={48}></Text>
                            <Text id="address" name="address" placeHolder="example" label="Address" width={348}
                                  height={48}></Text>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <Phone lang={lang} id="phone" name="phone_number" placeHolder="123456789"
                                   label="Phone Number"
                                   list={countries} validation={validation.phone_number} onFocus={clearErrors}></Phone>
                            <RadioList id="sector" name="sector_id" placeHolder="Select" label="Sector"
                                       list={data['sector']} validation={validation.sector_id}
                                       onFocus={clearErrors}></RadioList>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <RadioList id="number_of_employees" name="number_of_employees_id" placeHolder="Select"
                                       label="Number Of Employees" list={data['number_of_employees']}
                                       validation={validation.number_of_employees_id} onFocus={clearErrors}></RadioList>

                            <RadioList id="annualRevenue" name="revenue_id" placeHolder="Select"
                                       label="Annual Revenue"
                                       list={data['revenue']} validation={validation.revenue_id}
                                       onFocus={clearErrors}></RadioList>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <RadioList id="country" name="country" placeHolder="Select" label="Country"
                                       list={prepareCountries()} validation={validation.country}
                                       onFocus={clearErrors}></RadioList>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <TextArea id="description_ar" name="description_ar" placeHolder="example"
                                      label="Arabic Description" validation={validation.description_ar} onFocus={clearErrors}></TextArea>

                            <TextArea id="description" name="description_en" placeHolder="example"
                                      label="English Description" validation={validation.description_ar} onFocus={clearErrors}></TextArea>
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
                                  label="Manager Name" width={348} height={48}
                                  validation={validation.manager_name} onFocus={clearErrors}></Text>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <Text id="manager-email" name="manager-email" placeHolder="john.doe@example.com"
                                  label="Email" width={348} height={48} validation={validation.manager_email}
                                  onFocus={clearErrors}></Text>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <Text id="manager-position" name="manager-position" placeHolder="example"
                                  label="Position" width={348} height={48}
                                  validation={validation.manager_position} onFocus={clearErrors}></Text>
                        </div>

                        <div style={{marginTop: '32px'}}>
                            <Phone lang={lang} id="phone" name="phone" placeHolder="123456789" label="Phone Number"
                                   list={countries} validation={validation.manager_phone_number}></Phone>
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

                            <button onClick={handleSubmit} style={{
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