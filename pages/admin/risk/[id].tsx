import {HandleRequestClient, HandleRequestSSR} from "../../api/Handler";
import {Col, Container, Row} from "react-bootstrap";
import Image from "next/image";
import React, {useState} from "react";
import {getToken, getUserObjectViaContext} from "../../../hooks/User";
import MainProps from "../../../interfaces/MainProps";
import {useTheme} from "../../../hooks/theme";
import TextArea from "../../../components/form/TextArea";
import RadioList from "../../../components/form/RadioList";
import Text from "../../../components/form/Text";
import SearchableRadioList from "../../../components/form/SearchableRadioList";
import DatePicker from "../../../components/form/DatePicker";
import {ISingleUser} from "../../../components/form/Comment";

interface IPageData {
    fields: IFormFields,
    users: ISingleUser[],
    processId: string | number;
}

interface IFormFields {
    risk_category?: []
    risk_control_rating?: []
    risk_impact?: []
    risk_likelihood?: []
    risk_response?: []
}

interface IForm {
    process_id?: string | number;
    category_id?: string | number;
    likelihood_id?: string | number;
    impact_id?: string | number;
    control_rating_id?: string | number;
    control_owner_id?: string | number;
    response_id?: string | number;
    control_in_place_en?: string;
    control_in_place_ar?: string;
    description_ar?: string;
    description_en?: string;
    action_plan_ar?: string;
    action_plan_en?: string;
    action_due_date?: string;
}

interface IValidation {
    process_id?: string;
    category_id?: string;
    likelihood_id?: string;
    impact_id?: string;
    control_rating_id?: string;
    control_owner_id?: string;
    response_id?: string;
    control_in_place_en?: string;
    control_in_place_ar?: string;
    description_ar?: string;
    description_en?: string;
    action_plan_ar?: string;
    action_plan_en?: string;
    action_due_date?: string;
}

const Create = ({fields, users, processId, showSuccess, showFailed}: (IPageData & MainProps)) => {
    console.log(users)
    const {lang} = useTheme();
    const [form, setForm] = useState<IForm>({process_id: processId});
    const [validation, setValidation] = useState<IValidation>();

    const validateAttributes = (errors: object) => {
        setValidation(errors);
    }

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

    // Clear validation errors
    const clearErrors = (key: IForm) => {
        let errorObj = {...validation};
        // @ts-ignore
        delete errorObj[`${key}`];
        setValidation(errorObj);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        return HandleRequestClient({
            url: '/risk',
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
    return (
        <>
            <Container className="mb-5">
                <div style={{marginTop: '40px', display: 'flex', justifyContent: 'left'}}>
                    <Image src={`/icons/risk.svg`} alt="Risk Icon" width={56} height={56}/>
                    <div style={{marginLeft: '24px', marginTop: '17px'}}>
                        <h1 style={{fontSize: '20px', fontWeight: '700'}}>Risk Details</h1>
                        <p style={{color: '#365158', fontSize: '14px'}}>Please fill the information
                            below</p>
                    </div>
                </div>

                <form className="mt-4">
                    <Row>
                        <Col lg={4} sm={12} md={12}>
                            <TextArea id="description_ar" name="description_ar" placeHolder="example"
                                      label="Risk Description <span className='text-secondary'>[Arabic]</span>"
                                      validation={validation?.description_ar}
                                      onChange={prepareObject} value={form?.description_ar}
                                      onFocus={clearErrors}/>
                        </Col>

                        <Col lg={4} sm={12} md={12} className="mt-lg-0 mt-4">
                            <TextArea id="description_en" name="description_en" placeHolder="example"
                                      label="Risk Description <span className='text-secondary'>[English]</span>"
                                      validation={validation?.description_en}
                                      onChange={prepareObject} value={form?.description_en}
                                      onFocus={clearErrors}/>
                        </Col>
                    </Row>

                    <div className="mt-5">
                        <p style={{fontWeight: '600', fontSize: '20px'}}>Risk Identification</p>
                        <Row>
                            <Col lg={4} sm={12} md={12}>
                                <RadioList id="category_id"
                                           name="category_id"
                                           placeHolder="Select"
                                           label="Category"
                                           list={{title: "", data: fields?.risk_category ?? []}}
                                           validation={validation?.category_id}
                                           onChange={prepareObject}
                                           onFocus={clearErrors}/>
                            </Col>

                            <Col lg={4} sm={12} md={12} className="mt-lg-0 mt-4">
                                <RadioList id="likelihood_id"
                                           name="likelihood_id"
                                           placeHolder="Select"
                                           label="Likelihood"
                                           list={{title: "", data: fields?.risk_likelihood ?? []}}
                                           validation={validation?.likelihood_id}
                                           onChange={prepareObject}
                                           onFocus={clearErrors}/>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col lg={4} sm={12} md={12}>
                                <RadioList id="impact_id"
                                           name="impact_id"
                                           placeHolder="Select"
                                           label="Impact"
                                           list={{title: "", data: fields?.risk_impact ?? []}}
                                           validation={validation?.impact_id}
                                           onChange={prepareObject}
                                           onFocus={clearErrors}/>
                            </Col>

                            <Col lg={4} sm={12} md={12} className="mt-lg-0 mt-4">
                                <Text id="gross_rating" width={`100%`} name="gross_rating"
                                      placeHolder="Calculated by the system"
                                      label="Gross Rating" height={48}
                                      onFocus={clearErrors}/>
                            </Col>
                        </Row>
                    </div>

                    <div className="mt-5">
                        <p style={{fontWeight: '600', fontSize: '20px'}}>Control Assessment</p>
                        <Row>
                            <Col lg={4} sm={12} md={12}>
                                <TextArea id="control_in_place_ar" name="control_in_place_ar" placeHolder="example"
                                          label="Control in place <span className='text-secondary'>[Arabic]</span>"
                                          validation={validation?.control_in_place_ar}
                                          onChange={prepareObject} value={form?.control_in_place_ar}
                                          onFocus={clearErrors}/>
                            </Col>

                            <Col lg={4} sm={12} md={12} className="mt-lg-0 mt-4">
                                <TextArea id="control_in_place_en" name="control_in_place_en" placeHolder="example"
                                          label="Control in place <span className='text-secondary'>[English]</span>"
                                          validation={validation?.control_in_place_en}
                                          onChange={prepareObject} value={form?.control_in_place_en}
                                          onFocus={clearErrors}/>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col lg={4} sm={12} md={12}>
                                <RadioList id="control_rating_id"
                                           name="control_rating_id"
                                           placeHolder="Select"
                                           label="Control Rating"
                                           list={{title: "", data: fields.risk_control_rating ?? []}}
                                           validation={validation?.control_rating_id}
                                           onChange={prepareObject}
                                           onFocus={clearErrors}/>
                            </Col>

                            <Col lg={4} sm={12} md={12} className="mt-lg-0 mt-4">
                                <SearchableRadioList id="control_owner_id"
                                                     name="control_owner_id"
                                                     onChange={prepareObject}
                                                     selected={`${form.control_owner_id}`}
                                                     placeHolder="Name"
                                                     label="Control Owner"
                                                     list={users}
                                                     validation={validation?.control_owner_id}
                                                     onFocus={clearErrors}/>
                            </Col>
                        </Row>
                    </div>

                    <div className="mt-5">
                        <p style={{fontWeight: '600', fontSize: '20px'}}>Risk Assessment</p>
                        <Row>
                            <Col lg={4} sm={12} md={12}>
                                <Text id="Residual Risk Rating"
                                      width={`100%`}
                                      name="Residual Risk Rating"
                                      placeHolder="Calculated by the system"
                                      label="Residual Risk Rating" height={48}
                                      onFocus={clearErrors}/>
                            </Col>

                            <Col lg={4} className="mt-lg-0 mt-4">
                                <DatePicker
                                    name="action_due_date"
                                    value={form.action_due_date}
                                    label="Due Date"
                                    onChange={prepareObject}
                                    validation={validation?.action_due_date}
                                />
                            </Col>
                        </Row>
                    </div>

                    <div className="mt-5">
                        <p style={{fontWeight: '600', fontSize: '20px'}}>Control Assessment</p>
                        <Row>
                            <Col lg={4} sm={12} md={12}>
                                <RadioList id="response_id"
                                           name="response_id"
                                           onChange={prepareObject}
                                           selected={`${form.response_id}`}
                                           placeHolder="Select"
                                           label="Risk Response"
                                           list={{title: "", data: fields?.risk_response ?? []}}
                                           validation={validation?.response_id}
                                           onFocus={clearErrors}/>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col lg={4} sm={12} md={12}>
                                <TextArea id="action_plan_ar" name="action_plan_ar" placeHolder="example"
                                          label="Action Plan <span className='text-secondary'>[Arabic]</span>"
                                          validation={validation?.action_plan_ar}
                                          onChange={prepareObject} value={form?.action_plan_ar}
                                          onFocus={clearErrors}/>
                            </Col>

                            <Col lg={4} sm={12} md={12} className="mt-lg-0 mt-4">
                                <TextArea id="action_plan_en" name="action_plan_en" placeHolder="example"
                                          label="Action Plan <span className='text-secondary'>[English]</span>"
                                          validation={validation?.action_plan_en}
                                          onChange={prepareObject} value={form?.action_plan_en}
                                          onFocus={clearErrors}/>
                            </Col>
                        </Row>

                        <button
                            onClick={handleSubmit}
                            className="mt-5 d-flex justify-content-center align-items-center align-items-center submit-btn">
                            <span>Save</span>
                            <span style={{marginLeft: '12px', marginTop: '6px'}}>
                                <Image src={`/icons/true.svg`} width={20} height={20}></Image>
                            </span>
                        </button>
                    </div>
                </form>
            </Container>
        </>
    )
}

export async function getServerSideProps(ctx: any) {
    const processId = ctx.query.id;
    const userData = getUserObjectViaContext(ctx);
    const usersList = HandleRequestSSR({
        url: `/user/get-users-list?company_id=${userData?.company_id}&process_id=${processId}`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const formFields = HandleRequestSSR({
        url: `/risk/form`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    })

    const [fields] = await Promise.all([
        formFields
    ]);

    const [users] = await Promise.all([
        usersList
    ]);

    if (fields?.data?.redirect) {
        return {
            redirect: {
                permanent: false,
                destination: fields?.data?.to || "/",
            }
        }
    }

    if (users?.data?.redirect) {
        return {
            redirect: {
                permanent: false,
                destination: fields?.data?.to || "/",
            }
        }
    }

    return {
        props: {
            fields: fields?.data,
            users: users?.data,
            processId: processId
        }
    };
}

export default Create;