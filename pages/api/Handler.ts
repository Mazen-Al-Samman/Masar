import axios, {AxiosRequestHeaders} from "axios";
import {getTokenFromObject} from "../../hooks/User";

const BaseUrl = 'https://masar-api.tech-inspire.com';

interface request {
    url: string,
    method: 'get' | 'post',
    headers: AxiosRequestHeaders,
    data?: object,
    successCallBack?: Function,
    failedCallBack?: Function,
    context?: any,
    errorFunction?: Function
}

export const HandleRequestClient = ({
                                        url,
                                        method,
                                        headers,
                                        data,
                                        successCallBack,
                                        failedCallBack,
                                        errorFunction
                                    }: request) => {
    url = BaseUrl + url;
    return axios({
        method,
        url,
        headers,
        data,
    }).then((response => {
        const data = response.data;
        successCallBack && successCallBack(data);
    })).catch((error) => {
        const errors = error.response;
        switch (errors.status) {
            case 500:
                errorFunction && errorFunction();
                break
            case 401:
                window.location.href = '/';
                break;
            default:
                failedCallBack && failedCallBack(errors.data);
        }
    })
}

export const HandleRequestSSR = ({url, method, headers, data, context}: request) => {
    if (context) {
        const {language, user} = context.req.cookies;
        headers['x-api-key'] = getTokenFromObject(user);
        headers['Accept-Language'] = language ?? 'en';
    }

    url = BaseUrl + url;
    return axios({
        method,
        url,
        headers,
        data,
    }).catch((error) => {
        const errors = error.response;
        switch (errors.status) {
            case 401:
                context.res.setHeader("Set-Cookie", [`auth_key=''; Max-Age=0; path=/`]);
                return {
                    data: {
                        redirect: true,
                        to: "/",
                    }
                };
            case 403:
                return {
                    data: {
                        redirect: true,
                        to: "/admin",
                    }
                };
        }
    })
}

export default {
    HandleRequestSSR,
    HandleRequestClient
};