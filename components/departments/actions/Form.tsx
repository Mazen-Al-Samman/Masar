import React, {useState} from "react";
import {pageProps} from "../../../interfaces/MainProps";
import {Col, Container, Row} from "react-bootstrap";
import Image from "next/image";
import Text from "../../../components/form/Text";
import {HandleRequestClient} from "../../../pages/api/Handler";
import {getToken} from "../../../hooks/User";
import SearchableRadioList from "../../../components/form/SearchableRadioList";
import {useTheme} from "../../../hooks/theme";
import {IDepartmentForm} from "../../../interfaces/common/IForms";
import {IDepartmentValidations} from "../../../interfaces/common/IFormsValidation";
import {IListUser} from "../../../interfaces/common/MainInterfaces";

interface IPageData {
    users: IListUser[];
    formData: IDepartmentForm;
    method: "put" | "post";
    url: string;
}

const DepartmentForm = ({showSuccess, users, showFailed, formData, method, url}: (pageProps & IPageData)) => {
    const [form, setForm] = useState<IDepartmentForm>(formData);
    const [validation, setValidation] = useState<IDepartmentValidations>({});
    const {lang} = useTheme();

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
            url: url,
            // @ts-ignore
            method: method,
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
    const clearErrors = (key: IDepartmentValidations) => {
        let errorObj = {...validation};
        // @ts-ignore
        delete errorObj[`${key}`];
        setValidation(errorObj);
    }
    return (
        <>
            <Container>
                <Row>
                    <form style={{marginBottom: '50px', letterSpacing: '1px'}}>
                        <div>
                            {/* Page Header */}
                            <div style={{display: 'flex', justifyContent: 'left'}} className="mb-5">
                                <Image src={`/icons/department.svg`} alt="Manager Icon" width={56} height={56}/>
                                <div style={{marginLeft: '24px', marginTop: '17px'}}>
                                    <h1 style={{fontSize: '20px', fontWeight: '700'}}>Department Details</h1>
                                    <p style={{color: '#365158', fontSize: '14px'}}>Please fill the information
                                        below</p>
                                </div>
                            </div>

                            <Col lg={4} sm={12} md={12}>
                                <Text id="title_en" name="title_en" placeHolder="example"
                                      label="English Name" width={`100%`} height={48}
                                      validation={validation.title_en} onChange={prepareObject}
                                      value={form.title_en}
                                      onFocus={clearErrors}></Text>
                            </Col>

                            <Col lg={4} sm={12} md={12} className="mt-5">
                                <Text id="title_en" name="title_ar" placeHolder="example"
                                      label="Arabic Name" width={`100%`} height={48}
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
                                        <Image src={`/icons/right-arrow.svg`} width={20} height={20}></Image>
                                    </p>
                                </button>
                            </div>
                        </div>
                    </form>
                </Row>
            </Container>
        </>
    )
}

export default DepartmentForm;