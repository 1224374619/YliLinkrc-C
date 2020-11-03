"use strict";

import Vue from 'vue';
import axios from "axios";
import queryString from 'querystring'
import store from '../store/index'
import Cookies from 'js-cookie'
import router from '../router/index.js'
import {
    Notification
} from 'element-ui';

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
// http response 拦截器
_axios.interceptors.response.use(
    response => {
        let token = response.headers['auth-token']
        if (token === undefined) {
            Cookies.set("token", '');
        } else {
            Cookies.set("token", response.headers['auth-token']);
        }
        return response;
    },
    error => {
        if (error.response.status === 403) {
            // Notification.error({
            //     title: '错误',
            //     message: '登录超时，请登录'
            // });
            router.replace('/login');
        } else if (error.response.status === 404) {
            Notification.error({
                title: "错误",
                message: "页面丢失，请重新加载"
            });
        } else {
            Notification.error({
                title: "错误",
                message: error.response.data.message
            });
        }
        return Promise.reject(error);
    }
);
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
// // http response 拦截器
// _axios.interceptors.response.use(
//     response => {
//         let token = Cookies.get('token')
//         if (token) {
//             Message({
//                 showClose: true,
//                 message: '登录超时，请重新登录',
//                 type: 'error'
//             });

//         }
//         return response;
//     },
//     error => {
//         if (error.response.status === 403) {
//             Message.error({
//                 title: '错误',
//                 message: '登陆超时，请重新登录'
//             });
//             router.replace('/login');
//         }else {
//             Message.error({
//                 title: '错误',
//                 message: error.response.data.message
//             });
//         }

//         return Promise.reject(error);
//     }
// );

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
local.interceptors.response.use(response => {
    // let token = response.headers['auth-token']
    // Cookies.set("token", token);
    return response;
}, error => {
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