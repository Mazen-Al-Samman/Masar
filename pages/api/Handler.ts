import axios, {AxiosRequestHeaders} from "axios";

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
        const {language, auth_key} = context.req.cookies;
        headers['x-api-key'] = auth_key;
        headers['Accept-Language'] = language ?? 'en';
    }

    url = BaseUrl + url;
    return axios({
        method,
        url,
        headers,
        data,
    });
}

export default {
    HandleRequestSSR,
    HandleRequestClient
};