import {pageProps} from "../../interfaces/MainProps";
import React, {useState} from "react";
import {useTheme} from "../../hooks/theme";
import {HandleRequestClient} from "../../pages/api/Handler";
import {getToken} from "../../hooks/User";
import {Col, Container, Row} from "react-bootstrap";
import Image from "next/image";
import Text from "../form/Text";
import SearchableRadioList from "../form/SearchableRadioList";
import TextArea from "../form/TextArea";
import {IProcessForm} from "../../interfaces/common/IForms";
import {IProcessValidation} from "../../interfaces/common/IFormsValidation";
import {IListUser} from "../../interfaces/common/MainInterfaces";

interface IPageData {
    users: IListUser[];
    formData: IProcessForm;
    action?: string;
}

const FIRST_STEP_ATTRIBUTES = ['owner_id', 'title_ar', 'title_en'];
const ProcessForm = ({users, showFailed, showSuccess, formData, action = "post"}: (IPageData & pageProps)) => {
    const [form, setForm] = useState<IProcessForm>(formData);
    const [validation, setValidation] = useState<IProcessValidation>({});
    const [next, setNext] = useState(false);
    const {lang} = useTheme();

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

    const handleNextPrevious = () => {
        setNext(!next);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        return HandleRequestClient({
            url: `/process/${formData.id ?? ''}`,
            // @ts-ignore
            method: action,
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

    const clearErrors = (key: IProcessForm) => {
        let errorObj = {...validation};
        // @ts-ignore
        delete errorObj[`${key}`];
        setValidation(errorObj);
    }

    const validateAttributes = (errors: object) => {
        setValidation(errors);
        const errorsAttributes = Object.keys(errors);
        const firstStepErrors = errorsAttributes.filter(value => FIRST_STEP_ATTRIBUTES.includes(value));
        if (firstStepErrors.length) setNext(false);
    }

    return (
        <Container>
            <div style={{display: 'flex', justifyContent: 'left'}} className="mb-5">
                <Image src={`/icons/process.svg`} alt="Manager Icon" width={60} height={60}/>
                <div style={{marginLeft: '24px', marginTop: '17px'}}>
                    <h1 style={{fontSize: '20px', fontWeight: '700'}}>Process Details</h1>
                    <p style={{color: '#365158', fontSize: '14px'}}>please fill the information below</p>
                </div>
            </div>

            <form style={{marginBottom: '50px', letterSpacing: '1px'}}>
                {
                    !next ?
                        <div>
                            <Col lg={4} sm={12} md={12}>
                                <Text id="title_en" name="title_en" placeHolder="example"
                                      label="Process Name <span className='text-secondary'>[English]</span>"
                                      width={`100%`} height={48}
                                      validation={validation.title_en} onChange={prepareObject}
                                      value={form.title_en}
                                      onFocus={clearErrors}></Text>
                            </Col>

                            <Col lg={4} sm={12} md={12} className="mt-5">
                                <Text id="title_ar" name="title_ar" placeHolder="example"
                                      label="Process Name <span className='text-secondary'>[Arabic]</span>"
                                      width={`100%`} height={48}
                                      validation={validation.title_ar} onChange={prepareObject}
                                      value={form.title_ar}
                                      onFocus={clearErrors}></Text>
                            </Col>

                            <Col lg={4} sm={12} md={12} className="mt-5">
                                <SearchableRadioList id="sector"
                                                     name="owner_id"
                                                     onChange={prepareObject}
                                                     selected={`${form.owner_id}`}
                                                     placeHolder="Select"
                                                     label="Department Owner"
                                                     list={
                                                         users
                                                     }
                                                     validation={validation.owner_id}
                                                     onFocus={clearErrors}></SearchableRadioList>
                            </Col>

                            <div style={{display: 'flex', justifyContent: 'left'}}>
                                <button
                                    onClick={handleNextPrevious}
                                    className="mt-5 d-flex justify-content-center align-items-center align-items-center submit-btn">
                                    <span>Next</span>
                                    <span style={{marginLeft: '12px', marginTop: '6px'}}>
                                <Image src={`/icons/right-arrow.svg`} width={20} height={20}></Image>
                                    </span>
                                </button>
                            </div>
                        </div> :
                        <div>
                            <Row>
                                <Col lg={4}>
                                    <TextArea id="narrative_en" name="narrative_en" placeHolder="example"
                                              label="Process Narrative <span class='text-secondary'>[English]</span>"
                                              validation={validation.narrative_en}
                                              onChange={prepareObject} value={form.narrative_en}
                                              onFocus={clearErrors}></TextArea>
                                </Col>

                                <Col lg={4} className="mt-lg-0 mt-5">
                                    <TextArea id="narrative_ar" name="narrative_ar" placeHolder="example"
                                              label="Process Narrative <span class='text-secondary'>[Arabic]</span>"
                                              validation={validation.narrative_ar}
                                              onChange={prepareObject} value={form.narrative_ar}
                                              onFocus={clearErrors}></TextArea>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={4} className="mt-5">
                                    <TextArea id="policy_en" name="policy_en" placeHolder="example"
                                              label="Process Policy <span class='text-secondary'>[English]</span>"
                                              validation={validation.policy_en}
                                              onChange={prepareObject} value={form.policy_en}
                                              onFocus={clearErrors}></TextArea>
                                </Col>

                                <Col lg={4} className="mt-5">
                                    <TextArea id="policy_ar" name="policy_ar" placeHolder="example"
                                              label="Process Policy <span class='text-secondary'>[Arabic]</span>"
                                              validation={validation.policy_ar}
                                              onChange={prepareObject} value={form.policy_ar}
                                              onFocus={clearErrors}></TextArea>
                                </Col>
                            </Row>

                            <Row className="mt-5 gap-5">
                                <Col lg={1} xs={3} sm={3} md={3}>
                                    <button
                                        onClick={handleNextPrevious}
                                        className="mt-5 d-flex justify-content-center align-items-center align-items-center submit-btn">
                                        <p className="mt-2" style={{transform: 'rotate(180deg)'}}>
                                            <Image src={`/icons/right-arrow.svg`} width={20} height={20}></Image>
                                        </p>
                                    </button>
                                </Col>
                                <Col lg={3} xs={5}>
                                    <button
                                        onClick={handleSubmit}
                                        className="mt-5 d-flex justify-content-center align-items-center align-items-center submit-btn">
                                        <span>Done</span>
                                        <span style={{marginLeft: '12px', marginTop: '6px'}}>
                                            <Image src={`/icons/true.svg`} width={20} height={20}></Image>
                                        </span>
                                    </button>
                                </Col>
                            </Row>
                        </div>
                }
            </form>
        </Container>
    )
}
export default ProcessForm;