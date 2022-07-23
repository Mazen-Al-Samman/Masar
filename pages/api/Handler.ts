import axios, {AxiosRequestHeaders} from "axios";

const BaseUrl = 'https://masar-api.tech-inspire.com';

interface request {
    url: string,
    method: 'get' | 'post',
    headers: AxiosRequestHeaders,
    data?: object,
    successCallBack?: Function,
    failedCallBack?: Function,
    context?: any
}

const HandleRequest = ({url, method, headers, data, context}: request) => {
    if (context) {
        const {language, auth_key} = context.req.cookies;
        headers['x-api-key'] = auth_key;
        headers['Accept-Language'] = language;
    }

    url = BaseUrl + url;
    return axios({
        method,
        url,
        headers,
        data,
    });
}

export default HandleRequest;