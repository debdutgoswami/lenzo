import axios from "axios";
import LocalStorageService from "./LocalStorage";
import {
    apiUrl
} from '../config.json'
import {
    useHistory
} from 'react-router-dom'

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
        Promise.reject(error)
    }
);
//Add a response interceptor
axios_instance.interceptors.response.use((response) => {
        return response
    },
    function (error) {
        const originalRequest = error.config;
        console.log(error)
        console.log(originalRequest);
        let history = useHistory()

        if (error.response.status === 401 && originalRequest.url === endpoint) {
            history.push('/accounts');
            return Promise.reject(error);
        }

        if (error.response.status === 401) {
            originalRequest._retry = true;
            const refreshToken = localStorageService.getRefreshToken();
            return axios.post('http://localhost:8000/api/token/refresh', {
                    "refresh": refreshToken
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    if (res.status === 201) {
                        localStorageService.setToken(res.data);
                        axios_instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                        return axios(originalRequest);
                    }
                }).catch(ex => {
                    console.log(ex);
                })
        }
        return Promise.reject(error);
    });

export default axios_instance