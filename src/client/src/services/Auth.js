import axios from 'axios';
import axios_instance from "./axios";
import { apiUrl } from '../config';
import LocalStorageService from './LocalStorage';
import jwtdecode from 'jwt-decode'

export function login(user) {
    const endpoint = apiUrl + '/token/obtain'
    return axios.post(endpoint, {
        username: user.username,
        password: user.password
    })
}

export function logout() {
    const endpoint = '/logout'
    return axios_instance.post(endpoint);
}

export function getUser() {
    try {
        axios_instance.get('/token/is_active').catch((err) => {
            console.log(err)
            return null
        })
        let token = LocalStorageService.getAccessToken()
        return jwtdecode(token)
    }catch(e){
        return null;
    }
}