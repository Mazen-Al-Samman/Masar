import MainProps from "../interfaces/MainProps";
import React, {useState} from "react";
import Text from "../components/form/Text";
import Image from "next/image";
import {HandleRequestClient} from "./api/Handler";
import {Col, Container, Row} from "react-bootstrap";
import {IUserObject, login} from "../hooks/User";
import {useRouter} from "next/router";

interface Form {
    email?: string,
    password?: string
}

const Login = ({setButtons, setPadding, lang}: MainProps) => {
    const router = useRouter();
    const [form, setForm] = useState<Form>({});
    const [validation, setValidation] = useState({'email': null, 'password': null});

    // Clear validation errors
    const clearErrors = (name: 'email' | 'password') => {
        let errorObj = validation;
        errorObj[`${name}`] = null;
        setValidation(errorObj);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Send a request to the API via the handler function.
        HandleRequestClient({
            url: '/user/login',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': lang
            },
            data: {
                ...form
            },
            successCallBack: handleLogin,
            failedCallBack: setValidation,
        });
    }

    const prepareForm = (name: string, value: string) => {
        let formData = {...form};
        // @ts-ignore
        formData[`${name}`] = value;
        setForm(formData);
    }

    const handleLogin = (userData: IUserObject) => {
        const isLoggedIn = login(userData);
        if (isLoggedIn) {
            return router.push('/super-admin');
        }
        return;
    }

    React.useLayoutEffect(() => {
        setButtons(['language']);
        setPadding(false);
    }, []);

    return (
        <Container fluid className="px-5">
            <Row>
                <Col lg={8} sm={12} md={12} xs={12} className="d-flex justify-content-center">
                    <form>
                        <p style={{fontSize: '24px', fontWeight: '700'}}>Let’s get you started !</p>
                        <label htmlFor="email"></label>
                        <div>
                            <Text type={'text'} id={`email`} name={`email`} placeHolder={`john.doe@example.com`}
                                  label={`Email Address`}
                                  height={48} onChange={prepareForm}
                                  width={'100%'}
                                  onFocus={clearErrors}
                            ></Text>
                            <span style={{color: 'red', marginTop: '8px', display: 'block'}}>{validation.email}</span>
                        </div>

                        <div style={{marginTop: '24px'}}>
                            <Text type={'password'} id={`password`} name={`password`} placeHolder={`•••••••••••••••`}
                                  label={`Password`}
                                  width={'100%'}
                                  height={48} onChange={prepareForm}
                                  onFocus={clearErrors}
                            ></Text>
                            <span
                                style={{color: 'red', marginTop: '8px', display: 'block'}}>{validation.password}</span>
                        </div>

                        <button onClick={handleSubmit} style={{
                            backgroundColor: '#04252E',
                            width: '70%',
                            height: '48px',
                            borderRadius: '8px',
                            color: 'white',
                            textAlign: 'center',
                            marginTop: '20px'
                        }}>
                            Login
                        </button>
                    </form>
                </Col>

                <Col lg={4} sm={12} md={12} xs={12} style={{borderInlineStart: '1px solid #E6E9EA'}}
                     className="position-relative mt-5 mt-lg-0 px-5 d-flex align-items-center flex-column gap-1">
                    <div>
                        <h1 style={{fontSize: '64px', fontWeight: '700'}}>Lorem ipsum<br/> dolor sit <br/>amet.</h1>
                        <span style={{fontSize: '20px', fontWeight: '700'}}>- Masar</span>
                    </div>
                    <div>
                        <Image src={`/img/login.svg`} width={500}
                               style={{transform: `rotateY(${lang == 'ar' ? '180deg' : '0deg'})`}} height={500}></Image>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
