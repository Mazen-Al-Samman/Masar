import {Col, Container, FormLabel, Row} from "react-bootstrap";
import Image from "next/image";
import React, {useLayoutEffect, useState} from "react";
import TextArea from "../../../components/form/TextArea";
import {HandleRequestClient} from "../../api/Handler";
import {getToken, getUserAttribute} from "../../../hooks/User";
import {useTheme} from "../../../hooks/theme";
import MainProps from "../../../interfaces/MainProps";
import Text from "../../../components/form/Text";

interface IForm {
    company_id?: string | number;
    vision_ar?: string;
    vision_en?: string;
    mission_ar?: string;
    mission_en?: string;
    values_ar?: string;
    values_en?: string;
    goals?: IGoal[];
}

interface IValidation {
    company_id?: string;
    vision_ar?: string;
    vision_en?: string;
    mission_ar?: string;
    mission_en?: string;
    values_ar?: string;
    values_en?: string;
}

interface IGoal {
    title_en?: string;
    title_ar?: string;
    description_ar?: string;
    description_en?: string;
}

const Create = ({showFailed, showSuccess, setSuccessData}: MainProps) => {
    const [validation, setValidation] = useState<IValidation>({});
    const [form, setForm] = useState<IForm>({});
    const [goals, setGoals] = useState<IGoal[]>([{}])
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

    const prepareGoal = (name: string, value: string) => {
        const nameArray = name.split('-');
        const [attribute, index] = nameArray;
        const goalsClone = [...goals];
        // @ts-ignore
        goalsClone[index][attribute] = value;
        setGoals(goalsClone);
    }

    const addGoal = () => {
        const goalsClone = [...goals];
        goalsClone.push({});
        setGoals(goalsClone);
    }

    const clearErrors = (name: 'email' | 'password') => {
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
        formClone.company_id = getUserAttribute('company_id', '') ?? '';
        formClone.goals = [...goals];
        return HandleRequestClient({
            url: '/strategy',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': lang,
                'x-api-key': getToken() ?? '',
            },
            data: {
                ...formClone
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

    return (
        <Container>
            <div style={{display: 'flex', justifyContent: 'left'}} className="mb-5">
                <Image src={`/icons/strategy.svg`} alt="Strategy Icon" width={75} height={75}/>
                <div style={{marginLeft: '24px', marginTop: '17px'}}>
                    <h1 style={{fontSize: '20px', fontWeight: '700'}}>Strategy Details</h1>
                    <p style={{color: '#365158', fontSize: '14px'}}>please fill the information below</p>
                </div>
            </div>

            <Row>
                <Col lg={4} sm={12} md={12}>
                    <TextArea id="vision_en" name="vision_en" placeHolder="example"
                              label="Vision <span class='text-secondary'>[English]</span>"
                              validation={validation.vision_en}
                              onChange={prepareObject} value={form.vision_en}
                              onFocus={clearErrors}></TextArea>
                </Col>

                <Col lg={4} sm={12} md={12} className="mt-lg-0 mt-4">
                    <TextArea id="vision_ar" name="vision_ar" placeHolder="example"
                              label="Vision <span class='text-secondary'>[Arabic]</span>"
                              validation={validation.vision_ar}
                              onChange={prepareObject} value={form.vision_ar}
                              onFocus={clearErrors}></TextArea>
                </Col>
            </Row>

            <Row>
                <Col lg={4} sm={12} md={12} className="mt-4">
                    <TextArea id="mission_en" name="mission_en" placeHolder="example"
                              label="Mission <span class='text-secondary'>[English]</span>"
                              validation={validation.mission_en}
                              onChange={prepareObject} value={form.mission_en}
                              onFocus={clearErrors}></TextArea>
                </Col>

                <Col lg={4} sm={12} md={12} className="mt-4">
                    <TextArea id="mission_ar" name="mission_ar" placeHolder="example"
                              label="Mission <span class='text-secondary'>[Arabic]</span>"
                              validation={validation.mission_ar}
                              onChange={prepareObject} value={form.mission_ar}
                              onFocus={clearErrors}></TextArea>
                </Col>
            </Row>

            <Row>
                <Col lg={4} sm={12} md={12} className="mt-4">
                    <TextArea id="values_en" name="values_en" placeHolder="example"
                              label="Values <span class='text-secondary'>[English]</span>"
                              validation={validation.values_en}
                              onChange={prepareObject} value={form.values_en}
                              onFocus={clearErrors}></TextArea>
                </Col>

                <Col lg={4} sm={12} md={12} className="mt-4">
                    <TextArea id="values_ar" name="values_ar" placeHolder="example"
                              label="Values <span class='text-secondary'>[Arabic]</span>"
                              validation={validation.values_ar}
                              onChange={prepareObject} value={form.values_ar}
                              onFocus={clearErrors}></TextArea>
                </Col>
            </Row>

            <div className="mt-5">
                <p className="mt-3" style={{fontSize: '16px', fontWeight: '600'}}>Strategic Goals</p>
                <FormLabel style={{fontSize: '12px', fontWeight: '600'}}>Title & Description</FormLabel>
                {
                    goals &&
                    goals?.map((goal, index) => {
                        return (
                            <div key={index} className="mb-4 text-center">
                                <Col lg={8} className="d-flex justify-content-center">
                                <span className="text-white mt-2 mb-2 d-flex align-items-center justify-content-center"
                                      style={{
                                          width: '48px',
                                          backgroundColor: '#04252E',
                                          borderRadius: '8px',
                                          height: '48px'
                                      }}>
                                    {index + 1}
                                </span>
                                </Col>

                                <div className="d-flex justify-content-start gap-2">
                                    <Col lg={4}>
                                        <Text id={`title_en-${index}`} name={`title_en-${index}`}
                                              placeHolder="English Title"
                                              value={goals[index]?.title_en}
                                              width={`100%`} height={48}
                                              onChange={prepareGoal}></Text>
                                    </Col>

                                    <Col lg={4}>
                                        <Text id={`title_ar-${index}`} name={`title_ar-${index}`}
                                              placeHolder="Arabic Title"
                                              value={goals[index]?.title_ar}
                                              width={`100%`} height={48}
                                              onChange={prepareGoal}></Text>
                                    </Col>
                                </div>

                                <div className="d-flex justify-content-start gap-2">
                                    <Col lg={4} className="mt-2">
                                        <TextArea id={`description_en-${index}`} name={`description_en-${index}`}
                                                  placeHolder="English Description"
                                                  onChange={prepareGoal} value={goals[index]?.description_en}
                                                  onFocus={clearErrors}></TextArea>
                                    </Col>

                                    <Col lg={4} className="mt-2">
                                        <TextArea id={`description_ar-${index}`} name={`description_ar-${index}`}
                                                  placeHolder="Arabic Description"
                                                  onChange={prepareGoal} value={goals[index]?.description_ar}
                                                  onFocus={clearErrors}></TextArea>
                                    </Col>
                                </div>
                            </div>
                        )
                    })
                }
                <p onClick={addGoal} className="text-decoration-underline"
                   style={{fontSize: '12px', marginTop: '-20px', cursor: 'pointer'}}>Add another goal</p>
            </div>

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
                    padding: '13px 16px',
                    fontSize: '16px'
                }}>
                    <p>Done</p>
                    <p style={{marginLeft: '12px', marginTop: '3px'}}>
                        <Image src={`/icons/true.svg`} width={20} height={20}></Image>
                    </p>
                </button>
            </div>
        </Container>
    )
}

export default Create;