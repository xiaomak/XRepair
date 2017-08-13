import axios from 'axios';
import config from './config';
import UserStore from './../stores/UserStore';
import createHistory from 'history/createBrowserHistory';

const history = createHistory({
    forceRefresh: true
});

let _this = this;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://' + config.host;

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (UserStore.token) {
            config.headers.Authorization = UserStore.token;
            config.headers.method = 'OPTIONS';
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    history.push('/login',{from: history.location});
                    UserStore.cleanData();
                    break;
            }
        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    });

export default axios;