import axios from 'axios';
import { apiUrl } from '../config.json';
import LocalStorageService from './LocalStorage';
import jwtdecode from 'jwt-decode'
const endpoint = apiUrl + '/token/obtain'

export function login(user) {
   return axios.post(endpoint, {
        username: user.username,
        password: user.password
    })
}

export function getUser() {
    try {
        let token = LocalStorageService.getAccessToken()
        return jwtdecode(token)
    }catch(e){
        return null;
    }
}