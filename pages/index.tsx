import MainProps from "../interfaces/MainProps";
import React, {useLayoutEffect, useState} from "react";
import styles from './css/login.module.css';
import Text from "../components/form/Text";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const Login = ({showNav, setButtons}: MainProps) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://masar-api.tech-inspire.com/user/login',
            data: {
                email,
                password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    useLayoutEffect(() => {
        setButtons(['language'])
    }, []);
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', height: '78vh'}}>
            <div style={{width: '60%', display: 'flex', alignItems: 'center', height: '450px', justifyContent: 'center'}}>
                <form>
                    <p style={{fontSize: '24px', fontWeight: '700'}}>Let’s get you started !</p>
                    <label htmlFor="email"></label>
                    <div>
                        <Text type={'text'} id={`email`} name={`email`} placeHolder={`john.doe@example.com`} label={`Email Address`}
                              width={528} height={48} onChange={setEmail}></Text>
                    </div>

                    <div style={{marginTop: '24px'}}>
                        <Text type={'password'} id={`password`} name={`password`} placeHolder={`•••••••••••••••`} label={`Password`}
                              width={528}
                              height={48} onChange={setPassword}></Text>

                        <div style={{marginLeft: '405px', marginTop: '8px', fontSize: '14px', color: '#DC2626', fontWeight: '400'}}>
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

            <div style={{width: '30%', borderLeft: '2px solid #E6E9EA', marginTop: '-55px', height: '100vh'}}>
                <div style={{marginTop: '80px', marginLeft: '30%'}}>
                    <h1>Lorem ipsum dolor sit amet.</h1>
                    <Image src={`/img/login.svg`} width={568} height={600}></Image>
                </div>
            </div>
        </div>
    )
}

export default Login
