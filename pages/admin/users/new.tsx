import {Col, Container, Row} from "react-bootstrap";
import Image from "next/image";
import React, {useLayoutEffect, useState} from "react";
import Text from "../../../components/form/Text";
import SearchableRadioList from "../../../components/form/SearchableRadioList";
import {getToken, getUserAttribute, getUserObjectViaContext} from "../../../hooks/User";
import {HandleRequestClient, HandleRequestSSR} from "../../api/Handler";
import MainProps from "../../../interfaces/MainProps";
import {useTheme} from "../../../hooks/theme";
import {IDepartmentConfig} from "../departments";
import Phone from "../../../components/form/Phone";
import {countries} from "../../../public/assets/countries";
import {Country} from "../../super-admin/companies/new";

interface IPageData {
    departments: IDepartmentConfig[]
}

interface Form {
    username?: string;
    position?: string;
    companyId?: number | string | null;
    departmentId?: number;
    email?: string;
    phoneNumber?: string;
}

interface IValidation {
    username?: string;
    position?: string;
    companyId?: string;
    departmentId?: string;
    email?: string;
    phoneNumber?: string;
}

const UserForm = ({setSuccessData, showSuccess, showFailed, departments}: (MainProps & IPageData)) => {
    const {lang} = useTheme();
    const companyId = getUserAttribute("company_id", 0);
    const [form, setForm] = useState<Form>({companyId});
    const [validation, setValidation] = useState<IValidation>({});
    const [userCountry, setUserCountry] = useState<Country>({flag: 'jordan', code: '00962'});

    const formattedDepartments = () => {
        let deps: any[] = [];
        departments?.forEach((department) => {
            deps.push({username: department.title, id: department.id, position: department.owner});
        });
        return deps;
    }

    useLayoutEffect(() => {
        setSuccessData({
            title: "User has been created",
            subTitle: "Click on the users page to see all users.",
            buttonLink: `/admin/users`,
            buttonText: 'All Users'
        });
    }, []);

    // Set the input value.
    const prepareObject = (name: string, value: string) => {
        let dataStore = {...form};
        // @ts-ignore
        dataStore[`${name}`] = value;
        setForm(dataStore);
    }

    const handleError = () => {
        showFailed(true);
        return;
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        return HandleRequestClient({
            url: '/user/create-or-update',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': lang,
                'x-api-key': getToken() ?? '',
            },
            data: {
                ...form
            },
            successCallBack: function () {
                showSuccess(true);
            },
            failedCallBack: validateAttributes,
            errorFunction: handleError
        });
    }
    const validateAttributes = (errors: object) => {
        setValidation(errors);
    }

    // Clear validation errors
    const clearErrors = (key: IValidation) => {
        let errorObj = {...validation};
        // @ts-ignore
        delete errorObj[`${key}`];
        setValidation(errorObj);
    }

    return (
        <>
            <Container className="px-lg-5">
                <form style={{marginBottom: '50px', letterSpacing: '1px'}}>
                    {/* Page Header */}
                    <div style={{display: 'flex', justifyContent: 'left'}} className="mb-5">
                        <Image src={`/icons/employee.svg`} alt="Manager Icon" width={56} height={56}/>
                        <div style={{marginLeft: '24px', marginTop: '17px'}}>
                            <h1 style={{fontSize: '20px', fontWeight: '700'}}>User Details</h1>
                            <p style={{color: '#365158', fontSize: '14px'}}>please fill the information below</p>
                        </div>
                    </div>

                    <Row className="gx-5">
                        <Col lg={4} sm={12} md={12}>
                            <Text id="username" name="username" placeHolder="example"
                                  label="User Name" width={`100%`} height={48}
                                  validation={validation.username} onChange={prepareObject}
                                  value={form.username}
                                  onFocus={clearErrors}></Text>
                        </Col>

                        <Col lg={4} sm={12} md={12} className="mt-4 mt-lg-0">
                            <Text id="position" name="position" placeHolder="example"
                                  label="User Role" width={`100%`} height={48}
                                  validation={validation.position} onChange={prepareObject}
                                  value={form.position}
                                  onFocus={clearErrors}></Text>
                        </Col>
                    </Row>

                    <Row className="mt-4 mt-lg-5 gx-5">
                        <Col lg={4} sm={12} md={12}>
                            <SearchableRadioList id="departmentId"
                                                 name="departmentId"
                                                 onChange={prepareObject}
                                                 selected={`${form.departmentId}`}
                                                 placeHolder="Select"
                                                 label="User Department"
                                                 list={
                                                     formattedDepartments()
                                                 }
                                                 validation={validation.departmentId}
                                                 onFocus={clearErrors}></SearchableRadioList>
                        </Col>

                        <Col lg={4} sm={12} md={12} className="mt-4 mt-lg-0">
                            <Text id="email" name="email" placeHolder="example"
                                  label="User Email" width={`100%`} height={48}
                                  validation={validation.email} onChange={prepareObject}
                                  value={form.email}
                                  onFocus={clearErrors}></Text>
                        </Col>
                    </Row>

                    <Row className="mt-4 mt-lg-5 gx-5">
                        <Col lg={4} sm={12} md={12}>
                            <Phone lang={lang} id="phoneNumber" name="phoneNumber" placeHolder="123456789"
                                   label="User Phone Number"
                                   list={countries} validation={validation.phoneNumber}
                                   onChange={prepareObject} onFocus={clearErrors}
                                   country={userCountry} setCountry={setUserCountry}></Phone>
                        </Col>
                    </Row>

                    <div style={{display: 'flex', justifyContent: 'left'}}>
                        <button onClick={handleSubmit} className="mt-5" style={{
                            backgroundColor: '#04252E',
                            width: '149px',
                            height: '54px',
                            borderRadius: '8px',
                            color: 'white',
                            marginBottom: '100px',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '12px 16px',
                            fontSize: '16px'
                        }}>
                            <p>Done</p>
                            <p style={{marginLeft: '12px', marginTop: '3px'}}>
                                <Image src={`/icons/true.svg`} width={20} height={20}></Image>
                            </p>
                        </button>
                    </div>
                </form>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    const userData = getUserObjectViaContext(ctx)
    const departmentsReq = HandleRequestSSR({
        url: `/department?companyId=${userData?.company_id}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const [departments] = await Promise.all([
        departmentsReq
    ]);

    if (departments?.data?.redirect) {
        return {
            redirect: {
                permanent: false,
                destination: departments?.data?.to || "/",
            }
        }
    }

    return {
        props: {
            departments: departments?.data
        }
    };
}

export default UserForm;