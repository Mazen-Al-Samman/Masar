import {Button, Col, Container, Modal} from "react-bootstrap";
import Image from "next/image";
import React, {useLayoutEffect, useState} from "react";
import TextArea from "../../../../components/form/TextArea";
import {HandleRequestClient, HandleRequestSSR} from "../../../api/Handler";
import {getToken} from "../../../../hooks/User";
import {useTheme} from "../../../../hooks/theme";
import MainProps from "../../../../interfaces/MainProps";
import RadioList from "../../../../components/form/RadioList";
import {useRouter} from "next/router";

interface IForm {
    process_id?: string;
    status_id?: string;
    strategic_goal_id?: string;
    note?: string;
    target?: string;
    actual?: string;
}

interface IPageData {
    kpi: IKpi;
}

interface IKpi {
    goals: IGoal[];
    statuses: IStatus[]
}

interface IGoal {
    title_en?: string;
    title_ar?: string;
    description_ar?: string;
    description_en?: string;
}

interface IStatus {
    id: number | string;
    title: string
}

const Create = ({kpi, showFailed, showSuccess, setSuccessData}: (MainProps & IPageData)) => {
    const [validation, setValidation] = useState<IForm>({});
    const [form, setForm] = useState<IForm>({});
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();
    const processId = router.query.id;
    const {lang} = useTheme();

    useLayoutEffect(() => {
        setSuccessData({
            title: "Strategy has been created successfully",
        });
    }, []);

    const prepareObject = (name: string, value: string) => {
        let dataStore = {...form};
        // @ts-ignore
        dataStore[`${name}`] = value;
        setForm(dataStore);
    }


    const clearErrors = (name: string) => {
        let errorObj = validation;
        // @ts-ignore
        errorObj[`${name}`] = null;
        setValidation(errorObj);
    }

    const handleError = () => {
        showFailed(true);
        return;
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formClone = {...form};
        // @ts-ignore
        formClone.process_id = processId;
        return HandleRequestClient({
            url: '/process/kpi',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': lang,
                'x-api-key': getToken() ?? '',
            },
            data: {
                ...formClone
            },
            successCallBack: () => setShowPopup(true),
            failedCallBack: validateAttributes,
            errorFunction: handleError
        });
    }

    const validateAttributes = (errors: object) => {
        setValidation(errors);
    }

    const closePopup = () => {
        return router.push(`/admin/process/${processId}`);
    }

    const addNew = () => {
        setForm({});
        setValidation({});
        setShowPopup(false);
    }

    return (
        <Container>
            <Modal show={showPopup}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Body className="text-center p-4" style={{fontSize: '18px', fontFamily: 'Poppins'}}>
                    <span style={{color: '#365158'}}>Do you want to create another</span>
                    <span className="d-block mt-2" style={{fontWeight: '500'}}>“Process KPI” ?</span>

                    <div className="d-flex justify-content-center mt-5 gap-4">
                        <Button onClick={closePopup} style={{
                            backgroundColor: '#fff',
                            border: '1px solid #E6E9EA',
                            width: '117px',
                            height: '52px',
                            fontWeight: '500',
                            color: '#04252E'
                        }}>
                            No, Thanks
                        </Button>

                        <Button onClick={addNew} style={{
                            backgroundColor: '#04252E',
                            border: 'none',
                            width: '117px',
                            height: '52px',
                            fontWeight: '500'
                        }}>
                            Add New
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            <div style={{display: 'flex', justifyContent: 'left'}} className="mb-5">
                <Image src={`/icons/kpi.svg`} alt="Strategy Icon" width={75} height={75}/>
                <div style={{marginLeft: '24px', marginTop: '17px'}}>
                    <h1 style={{fontSize: '20px', fontWeight: '700'}}>Process KPI Details</h1>
                    <p style={{color: '#365158', fontSize: '14px'}}>please fill the information below</p>
                </div>
            </div>

            <Col lg={8} sm={12}>
                <TextArea id="target" name="target" placeHolder="example"
                          label="Target KPI" validation={validation.target}
                          onChange={prepareObject} value={form.target ?? ''}
                          onFocus={clearErrors}></TextArea>
            </Col>

            <Col lg={4} sm={12} className="mt-5">
                <RadioList id="strategic_goal_id"
                           name="strategic_goal_id"
                           placeHolder="Select"
                           validation={validation.strategic_goal_id}
                           label="Strategic Goal"
                           selected={form.strategic_goal_id ?? `-1`}
                           list={
                               // @ts-ignore
                               {title: "Strategic Goal", data: kpi.goals}
                           }
                           onChange={prepareObject}
                           onFocus={clearErrors}></RadioList>
            </Col>

            <Col lg={8} sm={12} className="mt-5">
                <TextArea id="actual" name="actual" placeHolder="example"
                          label="Actual KPI" validation={validation.actual}
                          onChange={prepareObject} value={form.actual ?? ''}
                          onFocus={clearErrors}></TextArea>
            </Col>

            <Col lg={4} sm={12} className="mt-5">
                <RadioList id="status_id"
                           name="status_id"
                           placeHolder="Select"
                           validation={validation.status_id ?? ''}
                           label="Status"
                           selected={form.status_id ?? `-1`}
                           list={
                               // @ts-ignore
                               {title: "Status", data: kpi.statuses}
                           }
                           onChange={prepareObject}
                           onFocus={clearErrors}></RadioList>
            </Col>

            <Col lg={8} sm={12} className="mt-5">
                <TextArea id="note" name="note" placeHolder="example"
                          label="Note" validation={validation.note ?? ''}
                          onChange={prepareObject} value={form.note ?? ''}
                          onFocus={clearErrors}></TextArea>
            </Col>

            <div className="d-flex justify-content-left gap-3">
                <button onClick={handleSubmit} className="mt-5" style={{
                    backgroundColor: '#04252E',
                    width: '149px',
                    height: '52px',
                    borderRadius: '8px',
                    color: 'white',
                    marginBottom: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '13px 16px',
                    fontSize: '16px',
                    border: 'none',
                    fontWeight: '500',
                }}>
                    <p>Save</p>
                    <p style={{marginLeft: '12px', marginTop: '3px'}}>
                        <Image src={`/icons/true.svg`} width={20} height={20}></Image>
                    </p>
                </button>

                <button onClick={handleSubmit} className="mt-5" style={{
                    outline: 'none',
                    border: '1px solid #E6E9EA',
                    backgroundColor: '#fff',
                    height: '52px',
                    borderRadius: '8px',
                    marginBottom: '100px',
                    display: 'flex',
                    color: '#04252E',
                    justifyContent: 'center',
                    padding: '13px 22px',
                    fontSize: '16px',
                    fontWeight: '500',
                }}>
                    <p>Save & Continue to Risk</p>
                    <p style={{marginLeft: '12px'}}>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.0775 13.5774C13.752 13.9028 13.752 14.4305 14.0775 14.7559C14.4029 15.0814 14.9305 15.0814 15.256 14.7559L19.4226 10.5893C19.7481 10.2638 19.7481 9.73618 19.4226 9.41075L15.256 5.24408C14.9305 4.91864 14.4029 4.91864 14.0775 5.24408C13.752 5.56951 13.752 6.09715 14.0775 6.42259L16.8215 9.16667H2.16671C1.70647 9.16667 1.33337 9.53976 1.33337 10C1.33337 10.4602 1.70647 10.8333 2.16671 10.8333H16.8215L14.0775 13.5774Z"
                                fill="#04252E"/>
                        </svg>
                    </p>
                </button>
            </div>
        </Container>
    )
}

export async function getServerSideProps(ctx: any) {
    const kpiRequest = HandleRequestSSR({
        url: `/process/kpi`,
        method: 'get',
        headers: {},
        data: {},
        context: ctx
    });

    const [kpi] = await Promise.all([
        kpiRequest
    ]);

    return {
        props: {
            kpi: kpi?.data,
        }
    };
}

export default Create;