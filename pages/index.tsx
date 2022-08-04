import MainProps from "../interfaces/MainProps";
import React, {useLayoutEffect, useState} from "react";
import Text from "../components/form/Text";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Cookies from "universal-cookie";
import {HandleRequestClient} from "./api/Handler";

interface userObject {
    auth_key: string
}

interface Form {
    email?: string,
    password?: string
}

const Login = ({setButtons, setPadding, lang}: MainProps) => {
    const cookies = new Cookies();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
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
        const request = HandleRequestClient({
            url: '/user/login',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': lang
            },
            data: {
                ...form
            },
            successCallBack: login,
            failedCallBack: setValidation,
        });
    }

    const prepareForm = (name: string, value: string) => {
        let formData = {...form};
        // @ts-ignore
        formData[`${name}`] = value;
        setForm(formData);
    }

    const login = (userData: userObject) => {
        if (typeof window !== "undefined") {
            cookies.set('auth_key', userData.auth_key, {path: '/'});
            window.location.href = '/super-admin';
        }
    }

    useLayoutEffect(() => {
        setButtons(['language']);
        setPadding(false);
    }, []);
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', height: '78vh'}}>
            <div style={{
                width: '70%',
                display: 'flex',
                alignItems: 'center',
                height: '450px',
                justifyContent: 'center',
            }}>
                <form>
                    <p style={{fontSize: '24px', fontWeight: '700'}}>Let’s get you started !</p>
                    <label htmlFor="email"></label>
                    <div>
                        <Text type={'text'} id={`email`} name={`email`} placeHolder={`john.doe@example.com`}
                              label={`Email Address`}
                              width={528} height={48} onChange={prepareForm}
                              onFocus={clearErrors}
                        ></Text>
                        <span style={{color: 'red', marginTop: '8px', display: 'block'}}>{validation.email}</span>
                    </div>

                    <div style={{marginTop: '24px'}}>
                        <Text type={'password'} id={`password`} name={`password`} placeHolder={`•••••••••••••••`}
                              label={`Password`}
                              width={528}
                              height={48} onChange={prepareForm}
                              onFocus={clearErrors}
                        ></Text>
                        <span style={{color: 'red', marginTop: '8px', display: 'block'}}>{validation.password}</span>

                        <div style={{
                            marginLeft: '405px',
                            marginTop: '8px',
                            fontSize: '14px',
                            color: '#DC2626',
                            fontWeight: '400'
                        }}>
                            <Link href={`#`}>Forgot Password?</Link>
                        </div>
                    </div>

                    <button onClick={handleSubmit} style={{
                        backgroundColor: '#04252E',
                        width: '528px',
                        height: '48px',
                        borderRadius: '8px',
                        color: 'white',
                        textAlign: 'center',
                        marginTop: '20px'
                    }}>
                        Login
                    </button>
                </form>
            </div>

            <div style={{
                width: '40%',
                borderLeft: `${lang == 'en' ? '2px solid #E6E9EA' : 'none'}`,
                borderRight: `${lang == 'ar' ? '2px solid #E6E9EA' : 'none'}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                marginTop: '-50px',
                position: 'relative'
            }}>
                <div style={{width: '100%'}}>
                    <div style={{marginInlineStart: '10%', position: 'absolute', top: '16%'}}>
                        <h1 style={{fontSize: '64px', fontWeight: '700'}}>Lorem ipsum<br/> dolor sit <br/>amet.</h1>
                        <span style={{fontSize: '20px', fontWeight: '700'}}>- Masar</span>
                    </div>
                    <div style={{
                        position: 'absolute',
                        bottom: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%'
                    }}>
                        <Image src={`/img/login.svg`} width={500}
                               style={{transform: `rotateY(${lang == 'ar' ? '180deg' : '0deg'})`}} height={500}></Image>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
