import axios from "axios";
import LocalStorageService from "./LocalStorage";
import {
    apiUrl
} from '../config.json'

let endpoint = '/token/refresh'
// LocalstorageService
const localStorageService = LocalStorageService.getService();
// Add a request interceptor
const axios_instance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

axios_instance.interceptors.request.use(
    config => {
        const token = localStorageService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);
//Add a response interceptor
axios_instance.interceptors.response.use((response) => {
        return response
    },function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && originalRequest.url === endpoint) {
            return Promise.reject(error);
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorageService.getRefreshToken();
            return axios_instance.post('/token/refresh', {
                "refresh": refreshToken
            }).then(res => {
                if (res.status === 200) {
                    localStorageService.setToken(res.data);
                    axios_instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                    return axios(originalRequest);
                }
            })
        }
        return Promise.reject(error);
    }
);

export default axios_instance