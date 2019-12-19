require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'
import * as $ from 'jquery';
const BASE_API_MAP = {
    APP: process.env.api
};

const DEV_TOKEN = 'sessionId=40d259fe9765927a8c3a72ee8bd54b15dfdfe840b34daf777c508f4aed0f215be95ada8862e0e90d42344b4811c5369ff014317eaa0e6004e26d15d2693d89ef3843b021d52088882a40cf8272e3e1baca9681217f71363c7697df34115c0aaf55b8f863038389922a1a2e4a988c5e0599e4e47d425469c9c81fd0606125d75d256e1e707da3cf6ac8e1382413e0b1b8bff7116f8b7381be58279b9ffa24174091340cc163ee94ca2a0671c3d6f87497225a4cd7216848da39ddcd54730d8f88deab91eb62d082762743cc8f4e61bbd03a19ac9a1ae91faa041fa4d2066b4686_1458'

class RequestBase {
    constructor() {
        this.url = '';
        this.ok = true;
    }
    get(urlWithoutDomain, param, baseApi = '') {
        const params = $.param(param)
        baseApi = baseApi
            ? baseApi
            : 'APP';
        this.url = BASE_API_MAP[baseApi] + urlWithoutDomain + (params
            ? '?' + params
            : '');
        return this.sendReq('get')
    }
    post(urlWithoutDomain, data, baseApi) {
        baseApi = baseApi
            ? baseApi
            : 'APP';
        this.url = BASE_API_MAP[baseApi] + urlWithoutDomain;
        return this.sendReq('post', data);
    }
    delete(urlWithoutDomain, data, baseApi) {
        baseApi = baseApi
            ? baseApi
            : 'APP';
        this.url = BASE_API_MAP[baseApi] + urlWithoutDomain;
        return this.sendReq('delete', data);
    }
    upload() { }
    put(urlWithoutDomain, data, baseApi) {
        baseApi = baseApi
            ? baseApi
            : 'APP';
        this.url = BASE_API_MAP[baseApi] + urlWithoutDomain;
        return this.sendReq('put', data);
    }
    update() { }
    httpReq(reqMethod, headers, data = {}) {
        switch (reqMethod) {
            case 'get':
                return fetch(this.url, {
                    method: "GET",
                    credentials: 'include',
                    headers,
                }).then((data) => this.handleErrors(data)).then(data => data.json()).then(res => this.handleRes(res))
            case 'post':
                return fetch(this.url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers
                    },
                    body: JSON.stringify(data)
                }).then((data) => this.handleErrors(data)).then(data => data.json()).then(res => this.handleRes(res))
            case 'delete':
                return fetch(this.url, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers
                    },
                    body: JSON.stringify(data)
                }).then((data) => this.handleErrors(data)).then(data => data.json()).then(res => this.handleRes(res))
            case 'put':
                console.log('put request')
                return fetch(this.url, {
                    method: "PUT",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers,
                    },
                    body: JSON.stringify(data)
                }).then((data) => this.handleErrors(data)).then(data => data.json()).then(res => this.handleRes(res))
            default:
                return
        }
    }
    handleRes(res) {
        if (!this.ok) {
            throw res
        }
        return res
    }
    handleErrors(response) {
        if (response.ok || response.status >= 200 && response.status < 300) {
            this.ok = true
        } else {
            this.ok = false
        }
        if (response.status == 401) {
            location.href = "http://home.dp.jpushoa.com/login/jiguang/?next=http://databench.dp.jpushoa.com"
        }
        return response
    }
    sendReq(reqMethod, data) {
        if (!this.url) {
            console.log('url is null')
            return;
        }
        let headers = {};
        // this.createAuthorizationHeader(headers);
        return this.httpReq(reqMethod, headers, data);
    }
    createAuthorizationHeader(headers) {
        let authToken = (this.getCookie('SESSION_ID') ? 'sessionId=' + this.getCookie('SESSION_ID') : '') || (this.getCookie('sessionid') ? 'sessionId=' + this.getCookie('sessionid') : '') || 'sessionId=test';
        if (process.env.env == 'dev') {
            authToken = DEV_TOKEN
        }
        headers.Authorization = authToken
    }
    getCookie(name) {
        let cookies = document
            .cookie
            .split('; ');
        let arr = [];
        for (let i = 0, len = cookies.length; i < len; i++) {
            arr = cookies[i].split('=');
            if (arr[0] === name) {
                return decodeURI(arr[1]);
            }
        }
        return '';
    };
}

export default RequestBase
