"use strict";

import Vue from 'vue';
import axios from "axios";
import queryString from 'querystring'
import store from '../store/index'
import Cookies from 'js-cookie'

// application/x-www-from-urlencode mime
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function (data) {
//     return queryString.stringify(data)
// }]
// 添加请求拦截器
let config = {
    //判断当前开发环境，切换代理配置
    // baseURL: process.env.NODE_ENV === 'production' ? '/api/v1/' : '/api/',
    baseURL: '/api/v2/',
    headers: {
        'Cache-Control': 'no-cache'
    },
    timeout: 60 * 1000, // Timeout
    withCredentials: true, // Check cross-site Access-Control
};
const _axios = axios.create(config);
// 添加request拦截器 
_axios.interceptors.request.use(
    function (config) {
        let token = Cookies.get('token')
        if (token) {
            config.headers['Auth-Token'] = token;
        }
        return config
    },
    function (error) {
        Promise.reject(error)
    })

// /api/v1/consumer-user
const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'production' ? '/api/v1/consumer-user' : '/api/',
    baseURL: '/api/v2/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [(data) => queryString.stringify(data)]
})
Vue.prototype.$_http = instance;
const local = axios.create({
    baseURL: '/api/v2/', 
    // headers:{'Auth-Token':store.state.token === ''?'':store.state.token},
    timeout: 60 * 1000, // Timeout
    withCredentials: true, // Check cross-site Access-Control
})
Vue.prototype.$local = local;
_axios.interceptors.response.use(response => {
    return response;
}, error => {
    // logger and notification;
    // Notification.error({
    //     title: '错误',
    //     message: error.message
    // });
    return Promise.reject(error);
});

Plugin.install = function (Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        http: {
            get() {
                return _axios;
            }
        },
        $http: {
            get() {
                return _axios;
            }
        },
    });
};
Vue.use(Plugin)

export default _axios;