import axios, {AxiosRequestHeaders} from "axios";

const BaseUrl = 'https://masar-api.tech-inspire.com';

interface request {
    url: string,
    method: 'get' | 'post',
    headers: AxiosRequestHeaders,
    data: object,
    successCallBack: Function,
    failedCallBack: Function
}

const HandleRequest = ({url, method, headers, data, successCallBack, failedCallBack}: request) => {
    url = BaseUrl + url;
    return axios.request({
        url,
        method,
        headers,
        data
    }).then((response) => {
        let data = response.data;
        successCallBack(data);
    }).catch((error) => {
        let errors = error.response.data;
        failedCallBack(errors);
    })
}

export default HandleRequest;